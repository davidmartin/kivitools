#!/usr/bin/env node

/**
 * Script to update the 'tools' collection in Appwrite
 * Adds the 'language' attribute for multi-language support
 * 
 * Run: node scripts/update-tools-collection.mjs
 */

import { Client, Databases } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools";

async function updateToolsCollection() {
    if (!DATABASE_ID) {
        console.error("❌ APPWRITE_DATABASE_ID not found in .env.local");
        return;
    }

    try {
        console.log("📦 Updating 'tools' collection with new attributes...\n");

        // 1. Add 'language' attribute
        try {
            await databases.createStringAttribute(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                "language",
                10,    // size (en, es, fr, de, it, pt)
                false, // required (false for backward compatibility)
                "en"   // default value
            );
            console.log("✅ Attribute 'language' created");
        } catch (error) {
            if (error.code === 409) {
                console.log("⚠️ Attribute 'language' already exists");
            } else {
                console.error("❌ Failed to create attribute 'language':", error.message);
            }
        }

        // Wait for attribute to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 2. Add 'icon' attribute for tool icon (emoji)
        try {
            await databases.createStringAttribute(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                "icon",
                10,    // size (emoji characters)
                false, // required
                "🛠️"   // default value
            );
            console.log("✅ Attribute 'icon' created");
        } catch (error) {
            if (error.code === 409) {
                console.log("⚠️ Attribute 'icon' already exists");
            } else {
                console.error("❌ Failed to create attribute 'icon':", error.message);
            }
        }

        // Wait for attribute to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 3. Create index for language + platform + status
        try {
            await databases.createIndex(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                "language_platform_status_idx",
                "key",
                ["language", "platform", "status"],
                ["ASC", "ASC", "ASC"]
            );
            console.log("✅ Index 'language_platform_status_idx' created");
        } catch (error) {
            if (error.code === 409) {
                console.log("⚠️ Index 'language_platform_status_idx' already exists");
            } else {
                console.error("❌ Failed to create index:", error.message);
            }
        }

        // Wait for index to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 4. Create index for slug (for URL lookups)
        try {
            await databases.createIndex(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                "slug_idx",
                "key",
                ["slug"],
                ["ASC"]
            );
            console.log("✅ Index 'slug_idx' created");
        } catch (error) {
            if (error.code === 409) {
                console.log("⚠️ Index 'slug_idx' already exists");
            } else {
                console.error("❌ Failed to create index:", error.message);
            }
        }

        console.log("\n🎉 Tools collection update complete!");
        console.log("\n📋 Current collection schema:");
        console.log("   - name (string, 255)");
        console.log("   - description (string, 1000)");
        console.log("   - platform (string, 50)");
        console.log("   - inputs (string, 2000) - JSON");
        console.log("   - prompt_template (string, 2000)");
        console.log("   - status (string, 20) - pending/approved/rejected");
        console.log("   - author_name (string, 255)");
        console.log("   - author_id (string, 255)");
        console.log("   - slug (string, 255)");
        console.log("   - language (string, 10) - NEW: en/es/fr/de/it/pt");
        console.log("   - icon (string, 10) - NEW: emoji icon");

    } catch (error) {
        console.error("❌ Update failed:", error);
    }
}

updateToolsCollection();
