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

async function addLanguageAttribute() {
    if (!DATABASE_ID) {
        console.error("❌ APPWRITE_DATABASE_ID not found in .env.local");
        return;
    }

    try {
        // 1. Try to create the language attribute
        console.log("📝 Creating 'language' attribute...");
        try {
            await databases.createStringAttribute(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                "language",
                10, // Size: "en", "es", "pt", etc.
                false, // Not required (for existing documents)
                "en" // Default value
            );
            console.log("✅ Attribute 'language' created");

            // Wait for attribute to be ready
            console.log("⏳ Waiting for attribute to be available (15 seconds)...");
            await new Promise(resolve => setTimeout(resolve, 15000));
        } catch (error) {
            if (error.code === 409) {
                console.log("⚠️ Attribute 'language' already exists");
            } else {
                throw error;
            }
        }

        // 2. Fetch all tools and update those without language
        console.log("\n📋 Fetching all tools...");
        let offset = 0;
        let hasMore = true;
        let updated = 0;
        let skipped = 0;

        while (hasMore) {
            const response = await databases.listDocuments(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                [
                    Query.limit(100),
                    Query.offset(offset)
                ]
            );

            for (const tool of response.documents) {
                // Check if tool doesn't have language or it's empty
                if (!tool.language || tool.language === "") {
                    try {
                        await databases.updateDocument(
                            DATABASE_ID,
                            TOOLS_COLLECTION_ID,
                            tool.$id,
                            { language: "en" }
                        );
                        console.log(`✅ Updated: ${tool.name} -> language: "en"`);
                        updated++;
                    } catch (err) {
                        console.error(`❌ Failed to update ${tool.name}:`, err.message);
                    }
                } else {
                    console.log(`⏭️ Skipped: ${tool.name} (already has language: "${tool.language}")`);
                    skipped++;
                }
            }

            hasMore = response.documents.length === 100;
            offset += 100;
        }

        console.log("\n🎉 Done!");
        console.log(`   Updated: ${updated} tools`);
        console.log(`   Skipped: ${skipped} tools`);

    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// Also create an index for language filtering
async function createLanguageIndex() {
    if (!DATABASE_ID) return;

    try {
        console.log("\n📇 Creating language index...");
        await databases.createIndex(
            DATABASE_ID,
            TOOLS_COLLECTION_ID,
            "language_idx",
            "key",
            ["language"],
            ["ASC"]
        );
        console.log("✅ Index 'language_idx' created");
    } catch (error) {
        if (error.code === 409) {
            console.log("⚠️ Index 'language_idx' already exists");
        } else {
            console.error("❌ Failed to create index:", error.message);
        }
    }
}

async function main() {
    await addLanguageAttribute();
    await createLanguageIndex();
}

main();
