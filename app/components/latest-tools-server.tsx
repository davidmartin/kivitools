import { Client, Databases, Query } from "node-appwrite";
import LatestToolsClient from "./latest-tools-client";

interface Tool {
    $id: string;
    name: string;
    description: string;
    platform: string;
    slug: string;
    language: string;
    status: "pending" | "approved" | "rejected";
}

// Server-side data fetching for latest tools
async function getLatestTools(language: string = "en"): Promise<Tool[]> {
    try {
        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
            .setProject(process.env.APPWRITE_PROJECT_ID || "")
            .setKey(process.env.APPWRITE_API_KEY || "");

        const databases = new Databases(client);
        
        const response = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            "tools",
            [
                Query.equal("status", "approved"),
                Query.equal("language", language),
                Query.orderDesc("$createdAt"),
                Query.limit(6)
            ]
        );
        
        return response.documents as unknown as Tool[];
    } catch (error) {
        console.error("Failed to fetch latest tools:", error);
        return [];
    }
}

interface LatestToolsServerProps {
    language?: string;
}

export default async function LatestToolsServer({ language = "en" }: LatestToolsServerProps) {
    // Fetch tools on server
    const tools = await getLatestTools(language);
    
    // Pass pre-fetched data to client component for interactivity
    return <LatestToolsClient initialTools={tools} />;
}
