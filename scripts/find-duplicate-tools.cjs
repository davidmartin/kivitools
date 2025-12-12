/**
 * Script to find duplicate tools in Appwrite
 * Run: node scripts/find-duplicate-tools.cjs
 */

const { Client, Databases, Query } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = 'tools';

async function findDuplicates() {
    console.log('🔍 Fetching all tools from Appwrite...\n');

    // Get all remaining tools
    let allTools = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(100),
            Query.offset(offset)
        ]);

        allTools = allTools.concat(result.documents);
        offset += 100;

        if (result.documents.length < 100) {
            hasMore = false;
        }
    }

    console.log('Total tools:', allTools.length);
    console.log('\n🔍 Checking for duplicates by NAME...\n');

    // Group by name
    const byName = {};
    for (const tool of allTools) {
        const name = tool.name;
        if (!byName[name]) {
            byName[name] = [];
        }
        byName[name].push({
            id: tool.$id,
            slug: tool.slug,
            platform: tool.platform,
            createdAt: tool.$createdAt
        });
    }

    // Find duplicates by name
    let nameDuplicates = [];
    for (const [name, tools] of Object.entries(byName)) {
        if (tools.length > 1) {
            console.log('❌ DUPLICATE NAME:', name);
            tools.forEach(t => console.log('   -', t.platform + '/' + t.slug, '(ID:', t.id, ', Created:', t.createdAt + ')'));
            nameDuplicates.push({ name, tools });
        }
    }

    console.log('\n🔍 Checking for duplicates by SLUG...\n');

    // Group by slug
    const bySlug = {};
    for (const tool of allTools) {
        const slug = tool.slug;
        if (!bySlug[slug]) {
            bySlug[slug] = [];
        }
        bySlug[slug].push({
            id: tool.$id,
            name: tool.name,
            platform: tool.platform,
            createdAt: tool.$createdAt
        });
    }

    // Find duplicates by slug
    let slugDuplicates = [];
    for (const [slug, tools] of Object.entries(bySlug)) {
        if (tools.length > 1) {
            console.log('❌ DUPLICATE SLUG:', slug);
            tools.forEach(t => console.log('   -', t.name, '(platform:', t.platform + ', ID:', t.id + ')'));
            slugDuplicates.push({ slug, tools });
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log('   Total tools:', allTools.length);
    console.log('   Unique names:', Object.keys(byName).length);
    console.log('   Duplicate names:', nameDuplicates.length);
    console.log('   Unique slugs:', Object.keys(bySlug).length);
    console.log('   Duplicate slugs:', slugDuplicates.length);
    console.log('='.repeat(60));

    // List all platforms
    const platforms = {};
    for (const tool of allTools) {
        if (!platforms[tool.platform]) {
            platforms[tool.platform] = 0;
        }
        platforms[tool.platform]++;
    }

    console.log('\n📁 TOOLS BY PLATFORM:');
    Object.entries(platforms).sort((a, b) => b[1] - a[1]).forEach(([p, count]) => {
        console.log('   ' + p + ': ' + count);
    });

    return { nameDuplicates, slugDuplicates };
}

findDuplicates().catch(console.error);
