"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";

// Tool input field configuration
// Supports both old format (name) and new format (id/label)
export interface ToolInput {
    id?: string;      // New format uses id
    name?: string;    // Old format uses name (fallback for id)
    label?: string;   // New format uses label
    type: "text" | "textarea" | "select" | "number" | "language";
    placeholder?: string;
    options?: string | string[]; // Comma separated string or array for select type
    required?: boolean;
}

// Tool document from Appwrite
export interface AppwriteTool {
    $id: string;
    $createdAt: string;
    name: string;
    description: string;
    platform: string;
    slug: string;
    language: string;
    icon: string;
    inputs: string; // JSON string of ToolInput[]
    prompt_template: string;
    status: "pending" | "approved" | "rejected";
    author_name: string;
    author_id: string;
}

// Parsed tool with inputs as array
export interface ParsedTool extends Omit<AppwriteTool, "inputs"> {
    inputs: ToolInput[];
}

// Context value type
interface ToolsContextType {
    tools: ParsedTool[];
    loading: boolean;
    error: string | null;
    refreshTools: () => Promise<void>;
    getToolsByPlatform: (platform: string, language?: string) => ParsedTool[];
    getToolBySlugAndId: (slugWithId: string) => ParsedTool | undefined;
    getToolById: (id: string) => ParsedTool | undefined;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

// Parse tool inputs from JSON string
function parseToolInputs(inputsJson: string): ToolInput[] {
    try {
        const parsed = JSON.parse(inputsJson);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Parse a single AppwriteTool to ParsedTool
function parseTool(tool: AppwriteTool): ParsedTool {
    return {
        ...tool,
        inputs: parseToolInputs(tool.inputs),
    };
}

// Extract $id from slug-$id format
function extractIdFromSlug(slugWithId: string): string | null {
    // Format: "script-generator-abc123xyz" -> extract "abc123xyz"
    // The $id is the last part after the last occurrence of the slug pattern
    const parts = slugWithId.split("-");
    if (parts.length < 2) return null;
    
    // The $id is typically the last segment
    // But we need to be careful with slugs that have multiple hyphens
    // We'll match against known tools to find the correct split
    return parts[parts.length - 1] || null;
}

export function ToolsProvider({ children }: { children: React.ReactNode }) {
    const [tools, setTools] = useState<ParsedTool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTools = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
            if (!databaseId) {
                console.warn("Appwrite database ID not configured");
                setTools([]);
                return;
            }

            // Fetch all approved tools with pagination
            const allTools: ParsedTool[] = [];
            let offset = 0;
            const limit = 100;
            let hasMore = true;

            while (hasMore) {
                const response = await databases.listDocuments(
                    databaseId,
                    "tools",
                    [
                        Query.equal("status", "approved"),
                        Query.limit(limit),
                        Query.offset(offset),
                        Query.orderDesc("$createdAt"),
                    ]
                );

                const parsedTools = response.documents.map((doc) => 
                    parseTool(doc as unknown as AppwriteTool)
                );

                allTools.push(...parsedTools);
                
                hasMore = response.documents.length === limit;
                offset += limit;
            }

            setTools(allTools);
            console.log(`✅ Loaded ${allTools.length} tools from Appwrite`);
        } catch (err) {
            console.error("Failed to fetch tools:", err);
            setError("Failed to load tools");
            setTools([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch on mount
    useEffect(() => {
        fetchTools();
    }, [fetchTools]);

    // Get tools filtered by platform and optionally language
    const getToolsByPlatform = useCallback(
        (platform: string, language?: string): ParsedTool[] => {
            return tools.filter((tool) => {
                const matchesPlatform = tool.platform === platform;
                const matchesLanguage = language ? tool.language === language : true;
                return matchesPlatform && matchesLanguage;
            });
        },
        [tools]
    );

    // Get tool by slug-$id format (for URL routing)
    const getToolBySlugAndId = useCallback(
        (slugWithId: string): ParsedTool | undefined => {
            // Try to find tool where slug-$id matches
            return tools.find((tool) => {
                const expectedFormat = `${tool.slug}-${tool.$id}`;
                return expectedFormat === slugWithId || tool.$id === slugWithId;
            });
        },
        [tools]
    );

    // Get tool by $id only
    const getToolById = useCallback(
        (id: string): ParsedTool | undefined => {
            return tools.find((tool) => tool.$id === id);
        },
        [tools]
    );

    const value: ToolsContextType = {
        tools,
        loading,
        error,
        refreshTools: fetchTools,
        getToolsByPlatform,
        getToolBySlugAndId,
        getToolById,
    };

    return (
        <ToolsContext.Provider value={value}>
            {children}
        </ToolsContext.Provider>
    );
}

export function useTools(): ToolsContextType {
    const context = useContext(ToolsContext);
    if (context === undefined) {
        throw new Error("useTools must be used within a ToolsProvider");
    }
    return context;
}

export default ToolsContext;
