/**
 * Search Utilities
 * Feature: 016-hero-tool-search
 *
 * Provides search functionality for official tools using client-side matching.
 * Community tool search is handled via API (see /api/search endpoint).
 */

import { SearchResult, OfficialTool, CommunityToolResult } from "@/types/search";
import { OFFICIAL_TOOLS, PLATFORM_METADATA } from "@/lib/tools-index";

/**
 * Debounce function for search input.
 * Delays execution until user stops typing.
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    waitMs: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, waitMs);
    };
}

/**
 * Calculate relevance score for a tool based on query match.
 *
 * Scoring rules (from research.md):
 * - Exact name match: 100 points
 * - Name contains query: 80 points
 * - Description contains query: 60 points
 * - Platform match: 40 points
 * - Official tools get +10 bonus
 */
export function calculateRelevanceScore(
    query: string,
    name: string,
    description: string,
    platform: string,
    isOfficial: boolean
): number {
    const normalizedQuery = query.toLowerCase().trim();
    const normalizedName = name.toLowerCase();
    const normalizedDescription = description.toLowerCase();
    const normalizedPlatform = platform.toLowerCase();

    let score = 0;

    // Exact name match
    if (normalizedName === normalizedQuery) {
        score += 100;
    }
    // Name starts with query
    else if (normalizedName.startsWith(normalizedQuery)) {
        score += 90;
    }
    // Name contains query as word
    else if (normalizedName.includes(` ${normalizedQuery}`) || normalizedName.includes(`${normalizedQuery} `)) {
        score += 85;
    }
    // Name contains query
    else if (normalizedName.includes(normalizedQuery)) {
        score += 80;
    }

    // Description contains query
    if (normalizedDescription.includes(normalizedQuery)) {
        score += 60;
    }

    // Platform exact match
    if (normalizedPlatform === normalizedQuery) {
        score += 40;
    }
    // Platform contains query
    else if (normalizedPlatform.includes(normalizedQuery)) {
        score += 20;
    }

    // Official tool bonus
    if (isOfficial) {
        score += 10;
    }

    return score;
}

/**
 * Search official tools by query.
 * Performs client-side search on the static tools index.
 *
 * @param query - Search query (min 2 chars)
 * @param t - Translation function to get localized names/descriptions
 * @param limit - Maximum results to return (default: 10)
 * @returns Array of matching SearchResult objects sorted by relevance
 */
export function searchOfficialTools(
    query: string,
    t: (key: string) => string,
    limit: number = 10
): SearchResult[] {
    const normalizedQuery = query.toLowerCase().trim();

    // Minimum query length check
    if (normalizedQuery.length < 2) {
        return [];
    }

    const results: SearchResult[] = [];

    for (const tool of OFFICIAL_TOOLS) {
        // Get localized name and description
        const localizedName = t(tool.nameKey) || tool.name;
        const localizedDescription = t(tool.descriptionKey) || tool.description;

        // Check if query matches any searchable field
        const matchesName = localizedName.toLowerCase().includes(normalizedQuery);
        const matchesDescription = localizedDescription.toLowerCase().includes(normalizedQuery);
        const matchesPlatform = tool.platform.toLowerCase().includes(normalizedQuery);
        const matchesId = tool.id.toLowerCase().includes(normalizedQuery);

        // Also check the English fallback for broader matches
        const matchesEnglishName = tool.name.toLowerCase().includes(normalizedQuery);
        const matchesEnglishDesc = tool.description.toLowerCase().includes(normalizedQuery);

        if (matchesName || matchesDescription || matchesPlatform || matchesId || matchesEnglishName || matchesEnglishDesc) {
            const relevanceScore = calculateRelevanceScore(
                query,
                localizedName,
                localizedDescription,
                tool.platform,
                true // isOfficial
            );

            results.push({
                id: tool.id,
                name: localizedName,
                description: localizedDescription,
                platform: tool.platform,
                href: tool.href,
                type: "official",
                icon: tool.icon,
                relevanceScore,
            });
        }
    }

    // Sort by relevance score (highest first) and limit results
    return results
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);
}

/**
 * Convert community tool API result to SearchResult format.
 */
export function communityToolToSearchResult(
    tool: CommunityToolResult
): SearchResult {
    const platformMeta = PLATFORM_METADATA[tool.platform] || PLATFORM_METADATA.general;

    return {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        platform: tool.platform,
        href: `/tool/${tool.slug}`,
        type: "community",
        icon: platformMeta.icon,
        authorName: tool.authorName,
        relevanceScore: 0, // Will be calculated by API
    };
}

/**
 * Merge and sort official + community results.
 * Official tools with higher scores appear first.
 */
export function mergeSearchResults(
    officialResults: SearchResult[],
    communityResults: SearchResult[],
    limit: number = 10
): SearchResult[] {
    // Combine all results
    const combined = [...officialResults, ...communityResults];

    // Sort by relevance score (official tools get +10 bonus already applied)
    combined.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Return limited results
    return combined.slice(0, limit);
}

/**
 * Check if results are "few" (less than threshold).
 * Used to determine prominent vs subtle CTA display.
 */
export function areFewResults(
    resultsCount: number,
    threshold: number = 3
): boolean {
    return resultsCount < threshold;
}

/**
 * Get platform metadata for a tool.
 */
export function getPlatformMetadata(platform: string): {
    name: string;
    icon: string;
    color: string;
} {
    return PLATFORM_METADATA[platform] || PLATFORM_METADATA.general;
}

/**
 * Highlight matching text in a string.
 * Returns HTML string with <mark> tags around matches.
 */
export function highlightMatch(text: string, query: string): string {
    if (!query || query.length < 2) {
        return text;
    }

    const normalizedQuery = query.toLowerCase();
    const normalizedText = text.toLowerCase();
    const startIndex = normalizedText.indexOf(normalizedQuery);

    if (startIndex === -1) {
        return text;
    }

    const endIndex = startIndex + query.length;
    return (
        text.substring(0, startIndex) +
        '<mark class="bg-accent/30 text-foreground rounded px-0.5">' +
        text.substring(startIndex, endIndex) +
        "</mark>" +
        text.substring(endIndex)
    );
}

/**
 * Generate builder URL with query params for auto-create.
 */
export function getBuilderUrlWithQuery(query: string, platform?: string): string {
    const params = new URLSearchParams();
    params.set("query", query);
    if (platform) {
        params.set("platform", platform);
    }
    return `/builder?${params.toString()}`;
}

/**
 * Search community tools via API.
 * Fetches from /api/search endpoint.
 *
 * @param query - Search query (min 2 chars)
 * @param limit - Maximum results to return (default: 5)
 * @returns Promise resolving to array of SearchResult objects
 */
export async function searchCommunityTools(
    query: string,
    limit: number = 5
): Promise<SearchResult[]> {
    const normalizedQuery = query.trim();

    // Minimum query length check
    if (normalizedQuery.length < 2) {
        return [];
    }

    try {
        const params = new URLSearchParams({
            q: normalizedQuery,
            limit: String(limit),
        });

        const response = await fetch(`/api/search?${params.toString()}`);

        if (!response.ok) {
            console.error("Community search API error:", response.status);
            return [];
        }

        const data = await response.json();

        if (!data.success || !data.results) {
            return [];
        }

        // Convert to SearchResult format with relevance scoring
        return data.results.map((tool: CommunityToolResult) => {
            const result = communityToolToSearchResult(tool);

            // Calculate relevance score for community results
            result.relevanceScore = calculateRelevanceScore(
                query,
                tool.name,
                tool.description,
                tool.platform,
                false // isOfficial
            );

            return result;
        });
    } catch (error) {
        console.error("Community search error:", error);
        return [];
    }
}

/**
 * Storage keys for recent searches.
 */
const RECENT_SEARCHES_KEY = "kivi_recent_searches";
const MAX_RECENT_SEARCHES = 5;

/**
 * Get recent searches from localStorage.
 */
export function getRecentSearches(): string[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // Ignore localStorage errors
    }

    return [];
}

/**
 * Save a search query to recent searches.
 */
export function saveRecentSearch(query: string): void {
    if (typeof window === "undefined" || !query || query.length < 2) {
        return;
    }

    try {
        const recent = getRecentSearches();

        // Remove if already exists
        const filtered = recent.filter((s) => s.toLowerCase() !== query.toLowerCase());

        // Add to beginning
        filtered.unshift(query);

        // Limit to max
        const limited = filtered.slice(0, MAX_RECENT_SEARCHES);

        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limited));
    } catch {
        // Ignore localStorage errors
    }
}

/**
 * Clear recent searches from localStorage.
 */
export function clearRecentSearches(): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
        // Ignore localStorage errors
    }
}
