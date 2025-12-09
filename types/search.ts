/**
 * Search Feature Type Definitions
 * Feature: 016-hero-tool-search
 *
 * Defines interfaces for the hero search bar that searches
 * official tools and community tools with auto-create capability.
 */

import { Tool, Platform } from "./index";

// ============================================================================
// Core Search Types
// ============================================================================

/**
 * Unified search result displayed in the dropdown.
 * Combines official and community tools into a single format.
 */
export interface SearchResult {
    id: string;
    name: string;
    description: string;
    platform: string;
    href: string;
    type: "official" | "community";
    icon?: string;
    authorName?: string;
    relevanceScore: number;
}

/**
 * Static official tool from the tools index.
 * Extends Tool with translation keys for i18n.
 */
export interface OfficialTool extends Tool {
    nameKey: string;          // Translation key for name
    descriptionKey: string;   // Translation key for description
}

/**
 * Community tool result from API search.
 * Created by users via the tool builder.
 */
export interface CommunityToolResult {
    id: string;
    name: string;
    description: string;
    platform: string;
    slug: string;
    authorName: string;
    authorId: string;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Response from GET /api/search endpoint.
 */
export interface SearchAPIResponse {
    success: boolean;
    results?: CommunityToolResult[];
    total?: number;
    error?: string;
}

// ============================================================================
// Auto-Create Types
// ============================================================================

/**
 * Request body for POST /api/tools/auto-create endpoint.
 */
export interface AutoCreateRequest {
    query: string;
    language: "en" | "es";
    suggestedPlatform?: string;
}

/**
 * Individual input field configuration for a tool.
 */
export interface ToolInput {
    id: string;
    label: string;
    type: "text" | "textarea" | "select" | "number";
    placeholder?: string;
    options?: string;
    required: boolean;
}

/**
 * AI-generated tool configuration.
 * Used to pre-fill the tool builder.
 */
export interface AutoCreateConfig {
    name: string;
    description: string;
    platform: string;
    promptTemplate: string;
    inputs: ToolInput[];
}

/**
 * Response from POST /api/tools/auto-create endpoint.
 */
export interface AutoCreateResponse {
    success: boolean;
    config?: AutoCreateConfig;
    error?: string;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Props for the HeroSearch component.
 */
export interface HeroSearchProps {
    className?: string;
    placeholder?: string;
    onNavigate?: (href: string) => void;
}

/**
 * Props for the SearchResultItem component.
 */
export interface SearchResultItemProps {
    result: SearchResult;
    isSelected: boolean;
    onClick: () => void;
}

/**
 * Props for the CreateToolCTA component.
 */
export interface CreateToolCTAProps {
    query: string;
    isProminent: boolean; // true when <3 results
    onClick: () => void;
}
