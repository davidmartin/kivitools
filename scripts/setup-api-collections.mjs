#!/usr/bin/env node
/**
 * Setup Appwrite collections for API Token System
 * Run: node scripts/setup-api-collections.mjs
 */

import { Client, Databases, ID } from "node-appwrite";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";

// Collection IDs
const API_TOKENS_COLLECTION = "api_tokens";
const API_USAGE_COLLECTION = "api_usage";

async function createApiTokensCollection() {
    console.log("📦 Creating api_tokens collection...");

    try {
        await databases.createCollection(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            "API Tokens",
            [
                // Permissions: Only authenticated users can read their own tokens
            ]
        );
        console.log("✅ api_tokens collection created");
    } catch (error) {
        if (error.code === 409) {
            console.log("⚠️ api_tokens collection already exists");
        } else {
            throw error;
        }
    }

    // Create attributes
    const tokenAttributes = [
        { key: "userId", type: "string", size: 100, required: true },
        { key: "token", type: "string", size: 64, required: true },
        { key: "name", type: "string", size: 100, required: false },
        { key: "createdAt", type: "datetime", required: true },
        { key: "lastUsedAt", type: "datetime", required: false },
        { key: "isActive", type: "boolean", required: true }
    ];

    for (const attr of tokenAttributes) {
        try {
            if (attr.type === "string") {
                await databases.createStringAttribute(
                    DATABASE_ID,
                    API_TOKENS_COLLECTION,
                    attr.key,
                    attr.size,
                    attr.required
                );
            } else if (attr.type === "datetime") {
                await databases.createDatetimeAttribute(
                    DATABASE_ID,
                    API_TOKENS_COLLECTION,
                    attr.key,
                    attr.required
                );
            } else if (attr.type === "boolean") {
                await databases.createBooleanAttribute(
                    DATABASE_ID,
                    API_TOKENS_COLLECTION,
                    attr.key,
                    attr.required,
                    true // default value
                );
            }
            console.log(`  ✓ Attribute: ${attr.key}`);
        } catch (error) {
            if (error.code === 409) {
                console.log(`  ⚠️ Attribute ${attr.key} already exists`);
            } else {
                console.error(`  ❌ Error creating ${attr.key}:`, error.message);
            }
        }
    }

    // Create indexes
    try {
        await databases.createIndex(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            "idx_userId",
            "key",
            ["userId"]
        );
        console.log("  ✓ Index: idx_userId");
    } catch (error) {
        if (error.code === 409) {
            console.log("  ⚠️ Index idx_userId already exists");
        }
    }

    try {
        await databases.createIndex(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            "idx_token",
            "unique",
            ["token"]
        );
        console.log("  ✓ Index: idx_token (unique)");
    } catch (error) {
        if (error.code === 409) {
            console.log("  ⚠️ Index idx_token already exists");
        }
    }
}

async function createApiUsageCollection() {
    console.log("\n📦 Creating api_usage collection...");

    try {
        await databases.createCollection(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            "API Usage"
        );
        console.log("✅ api_usage collection created");
    } catch (error) {
        if (error.code === 409) {
            console.log("⚠️ api_usage collection already exists");
        } else {
            throw error;
        }
    }

    // Create attributes
    const usageAttributes = [
        { key: "userId", type: "string", size: 100, required: true },
        { key: "date", type: "string", size: 10, required: true }, // YYYY-MM-DD
        { key: "requestCount", type: "integer", required: true, min: 0, max: 10000 },
        { key: "dailyLimit", type: "integer", required: true, min: 0, max: 10000 },
        { key: "lastRequestAt", type: "datetime", required: false },
        { key: "renewedAt", type: "datetime", required: false }
    ];

    for (const attr of usageAttributes) {
        try {
            if (attr.type === "string") {
                await databases.createStringAttribute(
                    DATABASE_ID,
                    API_USAGE_COLLECTION,
                    attr.key,
                    attr.size,
                    attr.required
                );
            } else if (attr.type === "datetime") {
                await databases.createDatetimeAttribute(
                    DATABASE_ID,
                    API_USAGE_COLLECTION,
                    attr.key,
                    attr.required
                );
            } else if (attr.type === "integer") {
                await databases.createIntegerAttribute(
                    DATABASE_ID,
                    API_USAGE_COLLECTION,
                    attr.key,
                    attr.required,
                    attr.min,
                    attr.max,
                    0 // default value
                );
            }
            console.log(`  ✓ Attribute: ${attr.key}`);
        } catch (error) {
            if (error.code === 409) {
                console.log(`  ⚠️ Attribute ${attr.key} already exists`);
            } else {
                console.error(`  ❌ Error creating ${attr.key}:`, error.message);
            }
        }
    }

    // Create indexes
    try {
        await databases.createIndex(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            "idx_userId_date",
            "unique",
            ["userId", "date"]
        );
        console.log("  ✓ Index: idx_userId_date (unique)");
    } catch (error) {
        if (error.code === 409) {
            console.log("  ⚠️ Index idx_userId_date already exists");
        }
    }
}

async function main() {
    console.log("🚀 Setting up API Token System Collections\n");
    console.log(`Database ID: ${DATABASE_ID}`);
    console.log(`Project ID: ${process.env.APPWRITE_PROJECT_ID}\n`);

    if (!DATABASE_ID || !process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
        console.error("❌ Missing required environment variables:");
        console.error("   - APPWRITE_DATABASE_ID");
        console.error("   - APPWRITE_PROJECT_ID");
        console.error("   - APPWRITE_API_KEY");
        process.exit(1);
    }

    try {
        await createApiTokensCollection();
        await createApiUsageCollection();

        console.log("\n✅ API Token System collections setup complete!");
        console.log("\nCollection IDs to use:");
        console.log(`  - API_TOKENS_COLLECTION = "${API_TOKENS_COLLECTION}"`);
        console.log(`  - API_USAGE_COLLECTION = "${API_USAGE_COLLECTION}"`);
    } catch (error) {
        console.error("\n❌ Setup failed:", error);
        process.exit(1);
    }
}

main();
