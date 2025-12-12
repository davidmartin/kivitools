#!/usr/bin/env node

/**
 * Script to audit Suno tools quality in Appwrite
 * Checks: description, inputs, and prompt_template quality
 * 
 * Run: node scripts/audit-suno-tools.mjs
 */

import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

async function auditSunoTools() {
    console.log("\n📊 SUNO TOOLS QUALITY AUDIT\n");
    console.log("=".repeat(70));

    const result = await databases.listDocuments(DATABASE_ID, "tools", [
        Query.equal("platform", "suno"),
        Query.equal("language", "en"),
        Query.limit(50)
    ]);

    console.log(`\nFound ${result.documents.length} Suno tools (EN)\n`);

    let goodTools = 0;
    let badTools = 0;
    const toolsToFix = [];

    for (const tool of result.documents) {
        const issues = [];

        // Check description quality
        if (!tool.description) {
            issues.push("❌ Missing description");
        } else if (tool.description.includes("Generate amazing") || tool.description.includes("Free and easy")) {
            issues.push(`❌ Generic description`);
        } else if (tool.description.length < 50) {
            issues.push("❌ Description too short");
        }

        // Check inputs quality
        let inputs = [];
        try {
            inputs = typeof tool.inputs === "string" ? JSON.parse(tool.inputs) : tool.inputs || [];
        } catch (e) {
            inputs = [];
        }

        const hasGenericInputs = inputs.some(i =>
            (i.id === "topic" && i.label === "Topic") ||
            (i.id === "tone" && i.label === "Tone" && i.options && i.options.includes("Professional"))
        );

        if (!inputs || inputs.length === 0) {
            issues.push("❌ Missing inputs");
        } else if (hasGenericInputs) {
            issues.push("❌ Generic inputs (topic/tone pattern)");
        } else if (inputs.length < 2) {
            issues.push(`⚠️  Only ${inputs.length} input(s)`);
        }

        // Check prompt quality
        if (!tool.prompt_template) {
            issues.push("❌ Missing prompt template");
        } else if (
            tool.prompt_template.includes("Generate high-quality") ||
            tool.prompt_template.includes("expert Suno content creator") ||
            tool.prompt_template.includes("expert suno content creator")
        ) {
            issues.push("❌ Generic prompt template");
        } else if (tool.prompt_template.length < 200) {
            issues.push(`⚠️  Prompt too short (${tool.prompt_template.length} chars)`);
        }

        console.log("");
        if (issues.length > 0) {
            console.log(`🔴 ${tool.name} (${tool.slug})`);
            issues.forEach(i => console.log(`   ${i}`));
            badTools++;
            toolsToFix.push({
                id: tool.$id,
                name: tool.name,
                slug: tool.slug,
                issues: issues
            });
        } else {
            console.log(`🟢 ${tool.name} (${tool.slug}) - PASS`);
            goodTools++;
        }
    }

    console.log("");
    console.log("=".repeat(70));
    console.log("📊 SUMMARY:");
    console.log(`   ✅ Good tools: ${goodTools}`);
    console.log(`   ❌ Needs fixing: ${badTools}`);
    console.log(`   📈 Quality score: ${Math.round((goodTools / (goodTools + badTools)) * 100)}%`);
    console.log("=".repeat(70));

    if (toolsToFix.length > 0) {
        console.log("\n🔧 TOOLS THAT NEED FIXING:\n");
        toolsToFix.forEach((t, i) => {
            console.log(`${i + 1}. ${t.name} (${t.slug}) - ID: ${t.id}`);
        });
    }
}

auditSunoTools().catch(console.error);
