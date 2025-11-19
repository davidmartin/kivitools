import { Client, Databases, Permission, Role } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools"; // We'll use this ID

async function setupToolsCollection() {
    if (!DATABASE_ID) {
        console.error("❌ APPWRITE_DATABASE_ID not found in .env.local");
        return;
    }

    try {
        console.log("Creating 'tools' collection...");

        // 1. Create Collection
        try {
            await databases.createCollection(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                "Community Tools",
                [
                    Permission.read(Role.any()),                // Public read
                    Permission.create(Role.users()),            // Users can create
                    Permission.update(Role.users()),            // Users can update (we'll restrict to owner via document permissions)
                    Permission.delete(Role.users()),            // Users can delete
                ]
            );
            console.log("✅ Collection created");
        } catch (error) {
            if (error.code === 409) {
                console.log("⚠️ Collection already exists");
            } else {
                throw error;
            }
        }

        // 2. Create Attributes
        const attributes = [
            { key: "name", type: "string", size: 255, required: true },
            { key: "description", type: "string", size: 1000, required: true },
            { key: "platform", type: "string", size: 50, required: true },
            { key: "inputs", type: "string", size: 2000, required: true }, // JSON string (Reduced to fit row limit)
            { key: "prompt_template", type: "string", size: 2000, required: true }, // Reduced to fit row limit
            { key: "status", type: "string", size: 20, required: false, default: "pending" },
            { key: "author_name", type: "string", size: 255, required: true },
            { key: "author_id", type: "string", size: 255, required: true },
            { key: "slug", type: "string", size: 255, required: true },
        ];

        for (const attr of attributes) {
            try {
                await databases.createStringAttribute(
                    DATABASE_ID,
                    TOOLS_COLLECTION_ID,
                    attr.key,
                    attr.size,
                    attr.required,
                    attr.default
                );
                console.log(`✅ Attribute '${attr.key}' created`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`⚠️ Attribute '${attr.key}' already exists`);
                } else {
                    console.error(`❌ Failed to create attribute '${attr.key}':`, error.message);
                }
            }
            // Wait a bit between attribute creations to avoid race conditions
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // 3. Create Index for Platform and Status (for filtering)
        try {
            await databases.createIndex(
                DATABASE_ID,
                TOOLS_COLLECTION_ID,
                "platform_status_idx",
                "key",
                ["platform", "status"],
                ["ASC", "ASC"]
            );
            console.log("✅ Index 'platform_status_idx' created");
        } catch (error) {
            if (error.code === 409) {
                console.log("⚠️ Index already exists");
            } else {
                console.error("❌ Failed to create index:", error.message);
            }
        }

        console.log("🎉 Tools collection setup complete!");

    } catch (error) {
        console.error("❌ Setup failed:", error);
    }
}

setupToolsCollection();
