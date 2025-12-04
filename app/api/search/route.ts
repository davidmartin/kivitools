import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, Query } from "node-appwrite";
import type { CommunityToolResult, SearchAPIResponse } from "@/types/search";

// Appwrite Configuration
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";
const TOOLS_COLLECTION_ID = "tools";

/**
 * GET /api/search?q=query&limit=10
 * 
 * Searches community tools in Appwrite database.
 * Only returns approved/published tools.
 */
export async function GET(request: NextRequest): Promise<NextResponse<SearchAPIResponse>> {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.trim() || "";
        const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 20);

        // Validate query
        if (query.length < 2) {
            return NextResponse.json({
                success: true,
                results: [],
                total: 0,
            });
        }

        // Check if Appwrite is configured
        if (!DATABASE_ID || !process.env.APPWRITE_PROJECT_ID) {
            console.warn("Appwrite not configured, returning empty results");
            return NextResponse.json({
                success: true,
                results: [],
                total: 0,
            });
        }

        // Search community tools
        // Appwrite doesn't have full-text search, so we use contains queries
        // We search in name and description fields
        const queryLower = query.toLowerCase();

        const response = await databases.listDocuments(
            DATABASE_ID,
            TOOLS_COLLECTION_ID,
            [
                // Only approved/published tools
                Query.equal("status", ["approved", "published"]),
                // Limit results
                Query.limit(limit),
                // Order by newest first (optional)
                Query.orderDesc("$createdAt"),
            ]
        );

        // Client-side filtering for search relevance
        // (Appwrite doesn't support LIKE queries well)
        const filteredResults: CommunityToolResult[] = response.documents
            .filter((doc) => {
                const name = (doc.name || "").toLowerCase();
                const description = (doc.description || "").toLowerCase();
                const platform = (doc.platform || "").toLowerCase();

                // Check if query matches name, description, or platform
                return (
                    name.includes(queryLower) ||
                    description.includes(queryLower) ||
                    platform.includes(queryLower)
                );
            })
            .map((doc) => ({
                id: doc.$id,
                name: doc.name,
                description: doc.description,
                platform: doc.platform,
                slug: doc.slug,
                authorName: doc.author_name,
                authorId: doc.author_id,
            }));

        return NextResponse.json({
            success: true,
            results: filteredResults,
            total: filteredResults.length,
        });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to search tools. Please try again.",
            },
            { status: 500 }
        );
    }
}
