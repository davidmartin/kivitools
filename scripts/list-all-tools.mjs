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

async function getToolStats() {
    const result = await databases.listDocuments(DATABASE_ID, 'tools', [
        Query.equal('language', 'en'),
        Query.equal('status', 'approved'),
        Query.limit(500)
    ]);

    const platforms = {};
    result.documents.forEach(tool => {
        const p = tool.platform;
        if (!platforms[p]) platforms[p] = [];
        platforms[p].push(tool.slug);
    });

    console.log('\n📊 CURRENT TOOLS BY PLATFORM:\n');
    Object.keys(platforms).sort().forEach(platform => {
        console.log(`\n🔷 ${platform.toUpperCase()} (${platforms[platform].length} tools):`);
        platforms[platform].forEach(tool => console.log(`   - ${tool}`));
    });

    console.log(`\n\n📈 TOTAL: ${result.documents.length} tools across ${Object.keys(platforms).length} platforms`);
}

getToolStats().catch(console.error);
