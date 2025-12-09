#!/usr/bin/env node
/**
 * Migration Script: Populate Tool Metadata
 * Feature: 017-homepage-tools-feed
 * 
 * Adds dateAdded, popularity, featured, and tags to all tools in lib/tools-index.ts
 * 
 * Population Strategy:
 * - dateAdded: Use git commit date of tool file OR "2024-01-01" for legacy
 * - popularity: Platform-based scoring (TikTok/Instagram: 85-95, Niche: 60-75)
 * - featured: Top 20 most-used tools (prioritize content generators)
 * - tags: Extract from name/description (lowercase keywords)
 */

import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// ============================================================================
// Configuration
// ============================================================================

const TOOLS_INDEX_PATH = path.join(process.cwd(), 'lib/tools-index.ts');
const FALLBACK_DATE = '2024-01-01'; // For tools without git history

// Platform popularity scores
const PLATFORM_POPULARITY = {
    tiktok: { min: 85, max: 95 },
    instagram: { min: 85, max: 95 },
    twitter: { min: 80, max: 90 },
    youtube: { min: 80, max: 90 },
    snapchat: { min: 75, max: 85 },
    facebook: { min: 70, max: 80 },
    linkedin: { min: 70, max: 80 },
    reddit: { min: 70, max: 80 },
    discord: { min: 65, max: 75 },
    twitch: { min: 65, max: 75 },
    elevenlabs: { min: 60, max: 70 },
    suno: { min: 60, max: 70 },
    // Niche platforms
    default: { min: 50, max: 65 }
};

// Top 20 featured tools (most popular/useful)
const FEATURED_TOOL_IDS = [
    'tiktok-script-writer',
    'tiktok-video-ideas',
    'tiktok-hook-generator',
    'tiktok-hashtag-generator',
    'instagram-bio-generator',
    'instagram-caption-generator',
    'instagram-reel-script',
    'twitter-bio-generator',
    'twitter-tweet-generator',
    'twitter-thread-maker',
    'youtube-title-generator',
    'youtube-description-generator',
    'youtube-script-generator',
    'snapchat-caption-generator',
    'snapchat-story-ideas',
    'reddit-post-generator',
    'discord-announcement-generator',
    'twitch-stream-title-generator',
    'suno-lyric-generator',
    'elevenlabs-voice-script-writer'
];

// ============================================================================
// Utilities
// ============================================================================

/**
 * Get git commit date for a file
 */
function getGitCommitDate(filePath) {
    try {
        const cmd = `git log -1 --format=%cI -- "${filePath}"`;
        const result = execSync(cmd, { encoding: 'utf8' }).trim();
        if (result) {
            return result.split('T')[0]; // Extract YYYY-MM-DD
        }
    } catch (error) {
        console.warn(`Could not get git date for ${filePath}:`, error.message);
    }
    return FALLBACK_DATE;
}

/**
 * Generate random popularity score for platform
 */
function getPopularityScore(platform) {
    const range = PLATFORM_POPULARITY[platform] || PLATFORM_POPULARITY.default;
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

/**
 * Extract tags from tool name/description
 */
function generateTags(name, description) {
    const text = `${name} ${description}`.toLowerCase();
    const commonWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'for', 'with', 'from', 'to', 'of', 'in', 'on',
        'create', 'generate', 'get', 'make', 'find', 'your', 'that', 'will', 'can', 'free'
    ]);

    // Extract meaningful words (3+ chars, not common)
    const words = text
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 3 && !commonWords.has(w))
        .slice(0, 5); // Max 5 tags

    return [...new Set(words)]; // Deduplicate
}

/**
 * Parse existing tools from lib/tools-index.ts
 */
function parseExistingTools(content) {
    const tools = [];
    const toolRegex = /{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?platform:\s*"([^"]+)"[\s\S]*?href:\s*"([^"]+)"[\s\S]*?}/g;

    let match;
    while ((match = toolRegex.exec(content)) !== null) {
        const [fullMatch, id, platform, href] = match;
        tools.push({
            id,
            platform,
            href,
            startIndex: match.index,
            endIndex: match.index + fullMatch.length,
            originalText: fullMatch
        });
    }

    return tools;
}

/**
 * Add metadata fields to a tool object string
 */
function addMetadataToTool(toolText, id, platform, href) {
    // Check if metadata already exists
    if (toolText.includes('dateAdded:') || toolText.includes('popularity:')) {
        console.log(`  ⏭️  ${id} - Already has metadata, skipping`);
        return toolText;
    }

    // Extract name and description for tag generation
    const nameMatch = toolText.match(/name:\s*"([^"]+)"/);
    const descMatch = toolText.match(/description:\s*"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : '';
    const description = descMatch ? descMatch[1] : '';

    // Get file path for git date
    const filePath = path.join(process.cwd(), 'app', href.slice(1), 'page.tsx');
    const dateAdded = getGitCommitDate(filePath);
    const popularity = getPopularityScore(platform);
    const featured = FEATURED_TOOL_IDS.includes(id);
    const tags = generateTags(name, description);

    // Add fields before closing brace
    const metadata = `
        dateAdded: "${dateAdded}",
        popularity: ${popularity},
        featured: ${featured},
        tags: [${tags.map(t => `"${t}"`).join(', ')}],`;

    const updatedText = toolText.replace(/(\s*)(},?)$/, `${metadata}\n$1$2`);

    console.log(`  ✅ ${id} - Added metadata (popularity: ${popularity}, featured: ${featured})`);

    return updatedText;
}

// ============================================================================
// Main Migration
// ============================================================================

async function main() {
    console.log('🚀 Starting tool metadata population...\n');

    // Read file
    if (!fs.existsSync(TOOLS_INDEX_PATH)) {
        console.error(`❌ File not found: ${TOOLS_INDEX_PATH}`);
        process.exit(1);
    }

    let content = fs.readFileSync(TOOLS_INDEX_PATH, 'utf8');

    // Parse tools
    const tools = parseExistingTools(content);
    console.log(`📊 Found ${tools.length} tools\n`);

    // Update each tool (reverse order to preserve indices)
    let updatedCount = 0;
    for (let i = tools.length - 1; i >= 0; i--) {
        const tool = tools[i];
        const updatedTool = addMetadataToTool(
            tool.originalText,
            tool.id,
            tool.platform,
            tool.href
        );

        if (updatedTool !== tool.originalText) {
            content = content.substring(0, tool.startIndex) +
                updatedTool +
                content.substring(tool.endIndex);
            updatedCount++;
        }
    }

    // Backup original file
    const backupPath = `${TOOLS_INDEX_PATH}.backup`;
    fs.copyFileSync(TOOLS_INDEX_PATH, backupPath);
    console.log(`\n💾 Backup created: ${backupPath}`);

    // Write updated file
    fs.writeFileSync(TOOLS_INDEX_PATH, content, 'utf8');

    console.log(`\n✅ Migration complete!`);
    console.log(`   Updated: ${updatedCount}/${tools.length} tools`);
    console.log(`   File: ${TOOLS_INDEX_PATH}`);

    console.log(`\n📝 Next steps:`);
    console.log(`   1. Review the changes in lib/tools-index.ts`);
    console.log(`   2. Adjust any popularity scores or featured flags manually if needed`);
    console.log(`   3. Delete backup file: ${backupPath}`);
    console.log(`   4. Commit changes`);
}

main().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
