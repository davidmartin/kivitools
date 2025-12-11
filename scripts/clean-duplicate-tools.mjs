#!/usr/bin/env node

/**
 * Script to clean duplicate tools from Appwrite
 * Finds tools with the same platform + slug + language and keeps only the most recent one
 * 
 * Run: node scripts/clean-duplicate-tools.mjs
 */

import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools";

async function cleanDuplicates() {
    if (!DATABASE_ID) {
        console.error("❌ APPWRITE_DATABASE_ID not found in .env.local");
        return;
    }

    console.log("🔍 Scanning for duplicate tools in Appwrite...\n");
    console.log(`📋 Database ID: ${DATABASE_ID}`);
    console.log(`📚 Collection: ${TOOLS_COLLECTION_ID}\n`);
    console.log("-".repeat(50));

    try {
        // Fetch all tools
        console.log("\n📥 Fetching all tools from database...");
        let allTools = [];
        let offset = 0;
        const limit = 100;

        while (true) {
            const response = await databases.listDocuments(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                [
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            );

            allTools = allTools.concat(response.documents);
            console.log(`   📦 Loaded ${allTools.length} tools...`);

            if (response.documents.length < limit) {
                break;
            }
            offset += limit;
        }

        console.log(`\n✅ Total tools loaded: ${allTools.length}\n`);
        console.log("=".repeat(50));

        // Group by platform + slug + language
        const grouped = {};

        for (const tool of allTools) {
            const key = `${tool.platform}|${tool.slug}|${tool.language}`;

            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(tool);
        }

        // Find duplicates
        const duplicates = Object.entries(grouped).filter(([_, tools]) => tools.length > 1);

        console.log(`\n📊 Analysis Results:`);
        console.log(`   🔑 Unique combinations: ${Object.keys(grouped).length}`);
        console.log(`   ⚠️  Duplicated combinations: ${duplicates.length}`);
        console.log(`   🗑️  Tools to delete: ${duplicates.reduce((sum, [_, tools]) => sum + tools.length - 1, 0)}\n`);

        if (duplicates.length === 0) {
            console.log("✅ No duplicates found! Database is clean.\n");
            return;
        }

        console.log("=".repeat(50));
        console.log("\n🔍 Duplicate Tools Found:\n");

        let deleted = 0;
        let kept = 0;
        let errors = 0;

        for (const [key, tools] of duplicates) {
            const [platform, slug, language] = key.split("|");

            console.log(`\n📦 [${platform.toUpperCase()}] ${slug} (${language.toUpperCase()})`);
            console.log(`   Found ${tools.length} duplicates:`);

            // Sort by $createdAt descending (most recent first)
            tools.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

            // Keep the most recent one
            const toKeep = tools[0];
            const toDelete = tools.slice(1);

            console.log(`   ✅ KEEP: ${toKeep.$id} (created: ${new Date(toKeep.$createdAt).toLocaleString()})`);
            kept++;

            // Delete the rest
            for (const tool of toDelete) {
                try {
                    await databases.deleteDocument(
                        DATABASE_ID,
                        TOOLS_COLLECTION_ID,
                        tool.$id
                    );
                    console.log(`   🗑️  DELETED: ${tool.$id} (created: ${new Date(tool.$createdAt).toLocaleString()})`);
                    deleted++;

                    // Small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 100));
                } catch (error) {
                    console.error(`   ❌ ERROR deleting ${tool.$id}: ${error.message}`);
                    errors++;
                }
            }
        }

        console.log("\n" + "=".repeat(50));
        console.log(`\n📊 Cleanup Summary:`);
        console.log(`   ✅ Kept: ${kept} tools`);
        console.log(`   🗑️  Deleted: ${deleted} duplicates`);
        console.log(`   ❌ Errors: ${errors}`);
        console.log("=".repeat(50));

        if (errors > 0) {
            console.log("\n⚠️  Cleanup completed with errors. Check logs above.");
        } else {
            console.log("\n🎉 Database cleanup complete! All duplicates removed.");
        }

    } catch (error) {
        console.error("\n❌ Fatal error:", error.message);
        console.error(error);
    }
}

cleanDuplicates();
