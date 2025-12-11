#!/usr/bin/env node
/**
 * Fix API collections - Add missing attributes
 * Run: node scripts/fix-api-collections.mjs
 */

import { Client, Databases } from "node-appwrite";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";

const API_TOKENS_COLLECTION = "api_tokens";
const API_USAGE_COLLECTION = "api_usage";

async function fixApiTokensCollection() {
    console.log("🔧 Fixing api_tokens collection...");

    // Add isActive as optional (not required) - Appwrite doesn't allow defaults on required
    try {
        await databases.createBooleanAttribute(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            "isActive",
            false // NOT required, so we can set default
        );
        console.log("  ✓ Added isActive attribute (optional)");
    } catch (error) {
        if (error.code === 409) {
            console.log("  ⚠️ isActive already exists");
        } else {
            console.error("  ❌ Error:", error.message);
        }
    }
}

async function fixApiUsageCollection() {
    console.log("\n🔧 Fixing api_usage collection...");

    // Add requestCount as optional with default 0
    try {
        await databases.createIntegerAttribute(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            "requestCount",
            false, // NOT required
            0,     // min
            100000, // max
            0      // default
        );
        console.log("  ✓ Added requestCount attribute");
    } catch (error) {
        if (error.code === 409) {
            console.log("  ⚠️ requestCount already exists");
        } else {
            console.error("  ❌ Error:", error.message);
        }
    }

    // Add dailyLimit as optional with default 20
    try {
        await databases.createIntegerAttribute(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            "dailyLimit",
            false, // NOT required
            0,     // min
            100000, // max
            20     // default = 20 requests per day
        );
        console.log("  ✓ Added dailyLimit attribute");
    } catch (error) {
        if (error.code === 409) {
            console.log("  ⚠️ dailyLimit already exists");
        } else {
            console.error("  ❌ Error:", error.message);
        }
    }
}

async function main() {
    console.log("🚀 Fixing API Collections\n");

    try {
        await fixApiTokensCollection();
        await fixApiUsageCollection();

        console.log("\n✅ API collections fixed!");
    } catch (error) {
        console.error("\n❌ Fix failed:", error);
        process.exit(1);
    }
}

main();
