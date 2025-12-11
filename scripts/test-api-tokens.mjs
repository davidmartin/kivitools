#!/usr/bin/env node
/**
 * Test API Token System
 * Run: node scripts/test-api-tokens.mjs
 */

import { Client, Databases, ID, Query } from "node-appwrite";
import crypto from "crypto";
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

const TEST_USER_ID = "test-user-api-" + Date.now();

function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

async function createTestToken() {
    const plainToken = generateToken();
    const hashedToken = hashToken(plainToken);

    console.log("📝 Creating test token...");
    console.log("   Plain token:", plainToken);
    console.log("   Hashed token:", hashedToken);

    try {
        const doc = await databases.createDocument(
            DATABASE_ID,
            API_TOKENS_COLLECTION,
            ID.unique(),
            {
                userId: TEST_USER_ID,
                token: hashedToken,
                name: "Test Token",
                createdAt: new Date().toISOString(),
                lastUsedAt: null,
                isActive: true
            }
        );
        console.log("✅ Token created in database:", doc.$id);
        return { plainToken, docId: doc.$id };
    } catch (error) {
        console.error("❌ Error creating token:", error.message);
        throw error;
    }
}

async function createTestUsage() {
    const today = new Date().toISOString().split("T")[0];

    console.log("\n📝 Creating test usage record...");

    try {
        const doc = await databases.createDocument(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            ID.unique(),
            {
                userId: TEST_USER_ID,
                date: today,
                requestCount: 0,
                dailyLimit: 20,
                lastRequestAt: null,
                renewedAt: new Date().toISOString()
            }
        );
        console.log("✅ Usage record created:", doc.$id);
        return doc.$id;
    } catch (error) {
        console.error("❌ Error creating usage:", error.message);
        throw error;
    }
}

async function testApiCall(token) {
    console.log("\n🧪 Testing API call...");

    const url = "http://localhost:3000/api/v1/tools/tiktok/video-ideas";
    const body = {
        topic: "cooking tips",
        count: 3,
        language: "en"
    };

    console.log("   URL:", url);
    console.log("   Body:", JSON.stringify(body));

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log("   Status:", response.status);
        console.log("   Response:", JSON.stringify(data, null, 2));

        return { status: response.status, data };
    } catch (error) {
        console.error("❌ API call failed:", error.message);
        return { status: 500, error: error.message };
    }
}

async function cleanupTestData(tokenDocId, usageDocId) {
    console.log("\n🧹 Cleaning up test data...");

    try {
        await databases.deleteDocument(DATABASE_ID, API_TOKENS_COLLECTION, tokenDocId);
        console.log("   ✓ Deleted token document");
    } catch (e) {
        console.log("   ⚠️ Could not delete token:", e.message);
    }

    try {
        // Find and delete usage record
        const result = await databases.listDocuments(
            DATABASE_ID,
            API_USAGE_COLLECTION,
            [Query.equal("userId", TEST_USER_ID)]
        );
        for (const doc of result.documents) {
            await databases.deleteDocument(DATABASE_ID, API_USAGE_COLLECTION, doc.$id);
            console.log("   ✓ Deleted usage document");
        }
    } catch (e) {
        console.log("   ⚠️ Could not delete usage:", e.message);
    }
}

async function main() {
    console.log("🚀 Testing API Token System\n");
    console.log("Database:", DATABASE_ID);
    console.log("Test User ID:", TEST_USER_ID);
    console.log("");

    let tokenDocId, usageDocId;

    try {
        // 1. Create test token
        const { plainToken, docId } = await createTestToken();
        tokenDocId = docId;

        // 2. Create usage record
        usageDocId = await createTestUsage();

        // 3. Test API call
        const apiResult = await testApiCall(plainToken);

        // 4. Verify the result
        if (apiResult.status === 200 && apiResult.data.success) {
            console.log("\n✅ API TOKEN SYSTEM WORKS!");
            console.log("   Generated ideas:", apiResult.data.result.length || "N/A");
            console.log("   Remaining requests:", apiResult.data.usage?.remaining);
        } else {
            console.log("\n❌ API call did not succeed as expected");
            console.log("   Status:", apiResult.status);
            console.log("   Error:", apiResult.data?.error || "Unknown");
        }

    } catch (error) {
        console.error("\n❌ Test failed:", error);
    } finally {
        // 5. Cleanup
        if (tokenDocId) {
            await cleanupTestData(tokenDocId, null);
        }
    }

    console.log("\n🏁 Test complete!");
}

main();
