import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

async function auditPlatform(platform) {
    const result = await databases.listDocuments(DATABASE_ID, "tools", [
        Query.equal("platform", platform),
        Query.equal("language", "en"),
        Query.limit(50),
    ]);

    console.log(`\n📊 ${platform.toUpperCase()} TOOLS AUDIT\n`);
    console.log(`Found: ${result.documents.length} tools\n`);

    let passed = 0;
    let failed = 0;

    for (const tool of result.documents) {
        const issues = [];

        // Check description quality
        const badDescPatterns = ["Generate amazing", "Generate high-quality", "Create amazing"];
        const hasGenericDesc = badDescPatterns.some((p) => tool.description?.includes(p));
        if (!tool.description || hasGenericDesc || tool.description.length < 50) {
            issues.push("❌ Generic/poor description");
        }

        // Check inputs quality
        let inputs = [];
        try {
            inputs = typeof tool.inputs === "string" ? JSON.parse(tool.inputs) : tool.inputs;
        } catch (e) {
            inputs = [];
        }
        const hasGenericInputs = inputs?.some(
            (i) => i.id === "topic" && i.label === "Topic"
        );
        if (hasGenericInputs || !inputs || inputs.length < 2) {
            issues.push("❌ Generic/minimal inputs");
        }

        // Check prompt quality
        const badPromptPatterns = ["Generate high-quality", "You are an expert"];
        const hasGenericPrompt = badPromptPatterns.some((p) => tool.prompt_template?.includes(p));
        if (!tool.prompt_template || hasGenericPrompt || tool.prompt_template.length < 200) {
            issues.push("❌ Generic/poor prompt");
        }

        if (issues.length > 0) {
            console.log(`🔴 ${tool.name} (${tool.slug})`);
            issues.forEach((i) => console.log(`   ${i}`));
            console.log(`   Description: ${tool.description?.substring(0, 80)}...`);
            console.log(`   Inputs: ${JSON.stringify(inputs?.map(i => i.id) || [])}`);
            console.log(`   Prompt length: ${tool.prompt_template?.length || 0} chars`);
            failed++;
        } else {
            console.log(`🟢 ${tool.name} (${tool.slug}) - OK`);
            passed++;
        }
    }

    console.log(
        `\n📈 SUMMARY: ${passed}/${passed + failed} tools passed (${Math.round(
            (passed / (passed + failed)) * 100
        )}%)`
    );

    return { passed, failed, tools: result.documents };
}

// Change platform here to audit different platforms
const platform = process.argv[2] || "whatsapp";
auditPlatform(platform).catch(console.error);
