#!/usr/bin/env node

import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

async function auditAllPlatforms() {
    console.log('\n📊 PLATFORM TOOLS AUDIT\n');
    
    // Get all tools in English
    const result = await databases.listDocuments(DATABASE_ID, 'tools', [
        Query.equal('language', 'en'),
        Query.equal('status', 'approved'),
        Query.limit(500)
    ]);
    
    const platformCounts = {};
    const platformTools = {};
    
    for (const tool of result.documents) {
        const platform = tool.platform;
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
        if (!platformTools[platform]) platformTools[platform] = [];
        platformTools[platform].push(tool.slug);
    }
    
    console.log('Total English tools:', result.total);
    console.log('\n=== TOOLS BY PLATFORM ===\n');
    
    // Sort by count descending
    const sorted = Object.entries(platformCounts).sort((a, b) => b[1] - a[1]);
    
    for (const [platform, count] of sorted) {
        console.log(`🔹 ${platform.toUpperCase()}: ${count} tools`);
        platformTools[platform].forEach(slug => console.log(`   - ${slug}`));
        console.log('');
    }
    
    // Identify platforms with few tools
    console.log('\n=== PLATFORMS NEEDING MORE TOOLS ===\n');
    const needMore = sorted.filter(([, count]) => count < 5);
    for (const [platform, count] of needMore) {
        console.log(`⚠️  ${platform}: only ${count} tool(s) - needs more!`);
    }
    
    // Suggest missing tools for popular platforms
    console.log('\n=== SUGGESTED NEW TOOLS ===\n');
    
    const suggestions = {
        'tiktok': ['sound-finder', 'analytics-calculator', 'follower-tracker', 'viral-predictor'],
        'instagram': ['story-ideas', 'reel-templates', 'engagement-calculator', 'follower-analyzer'],
        'twitter': ['tweet-scheduler-helper', 'viral-tweet-analyzer', 'follower-growth-tips'],
        'youtube': ['title-optimizer', 'seo-analyzer', 'thumbnail-ideas', 'script-outline'],
        'linkedin': ['post-optimizer', 'headline-generator', 'engagement-booster'],
        'ai-writing': ['grammar-checker', 'tone-adjuster', 'summary-generator', 'headline-writer'],
        'threads': ['post-ideas', 'hashtag-finder', 'engagement-tips'],
        'snapchat': ['story-planner', 'caption-generator', 'filter-ideas'],
        'discord': ['server-name-generator', 'bot-welcome-messages', 'channel-ideas'],
        'twitch': ['stream-title-generator', 'bio-writer', 'panel-ideas', 'chat-commands'],
    };
    
    for (const [platform, existing] of Object.entries(platformTools)) {
        const suggested = suggestions[platform];
        if (suggested) {
            const missing = suggested.filter(s => !existing.includes(s));
            if (missing.length > 0) {
                console.log(`${platform}: Consider adding: ${missing.join(', ')}`);
            }
        }
    }
}

auditAllPlatforms().catch(console.error);
