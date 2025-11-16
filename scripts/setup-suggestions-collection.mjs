import { Client, Databases, ID } from "node-appwrite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";

async function setupSuggestionsCollection() {
    console.log("🚀 Setting up Suggestions Collection...");

    try {
        // Create suggestions collection
        const SUGGESTIONS_COLLECTION_ID = "tool-suggestions";

        console.log("Creating suggestions collection...");

        const collection = await databases.createCollection(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "Tool Suggestions",
            ["read(\"any\")", "write(\"any\")"], // Public read/write for submissions
        );

        console.log("✅ Suggestions collection created:", collection.$id);

        // Create attributes
        console.log("Creating attributes...");

        // Name
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "name",
            255,
            true
        );
        console.log("✅ name attribute created");

        // Email
        await databases.createEmailAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "email",
            true
        );
        console.log("✅ email attribute created");

        // Platform
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "platform",
            50,
            true
        );
        console.log("✅ platform attribute created");

        // Tool Name
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "toolName",
            255,
            true
        );
        console.log("✅ toolName attribute created");

        // Tool Purpose
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "toolPurpose",
            2000,
            true
        );
        console.log("✅ toolPurpose attribute created");

        // Additional Info
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "additionalInfo",
            2000,
            false
        );
        console.log("✅ additionalInfo attribute created");

        // Language
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "language",
            5,
            true
        );
        console.log("✅ language attribute created");

        // User IP
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "userIp",
            45,
            false
        );
        console.log("✅ userIp attribute created");

        // Status (new, under-review, approved, rejected, implemented)
        await databases.createStringAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "status",
            20,
            true
        );
        console.log("✅ status attribute created");

        // Created At
        await databases.createDatetimeAttribute(
            DATABASE_ID,
            SUGGESTIONS_COLLECTION_ID,
            "createdAt",
            true
        );
        console.log("✅ createdAt attribute created");

        console.log("\n✅ Suggestions collection setup complete!");
        console.log("\nAdd this to your .env.local:");
        console.log(`APPWRITE_SUGGESTIONS_COLLECTION_ID=${SUGGESTIONS_COLLECTION_ID}`);

    } catch (error) {
        console.error("❌ Error setting up suggestions collection:", error.message);
        if (error.response) {
            console.error("Response:", error.response);
        }
    }
}

setupSuggestionsCollection();
