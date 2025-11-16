import { Client, Databases, ID } from "node-appwrite";

// Appwrite Client Configuration
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

// Database and Collection IDs
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID || "";

// Type for Generation Log
export interface GenerationLog {
    platform: string;
    tool: string;
    requestData: any;
    responseData: any;
    userId?: string;
    userIp?: string;
    language?: string;
    timestamp?: string;
}

/**
 * Save a generation log to Appwrite database
 */
export async function saveGenerationLog(log: GenerationLog): Promise<void> {
    try {
        // Skip if Appwrite is not configured
        if (!DATABASE_ID || !COLLECTION_ID || !process.env.APPWRITE_PROJECT_ID) {
            console.warn("Appwrite not configured, skipping log save");
            return;
        }

        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                platform: log.platform,
                tool: log.tool,
                requestData: JSON.stringify(log.requestData),
                responseData: JSON.stringify(log.responseData),
                userId: log.userId || "anonymous",
                userIp: log.userIp || "unknown",
                language: log.language || "en",
                timestamp: log.timestamp || new Date().toISOString(),
            }
        );

        console.log(`✅ Generation logged: ${log.platform}/${log.tool}`);
    } catch (error) {
        // Log error but don't break the main flow
        console.error("❌ Error saving to Appwrite:", error);
    }
}

/**
 * Get user IP from request headers
 */
export function getUserIpFromRequest(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    return "unknown";
}

export { databases, DATABASE_ID, COLLECTION_ID };
