#!/usr/bin/env node

import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

async function checkAllSunoInputs() {
    const result = await databases.listDocuments(DATABASE_ID, "tools", [
        Query.equal("platform", "suno"),
        Query.equal("language", "en"),
        Query.limit(50)
    ]);

    console.log("=== CHECKING ALL SUNO TOOLS (EN) FOR SPANISH TEXT ===\n");

    for (const doc of result.documents) {
        console.log("Tool:", doc.name, "(" + doc.slug + ")");
        try {
            const inputs = typeof doc.inputs === 'string' ? JSON.parse(doc.inputs) : doc.inputs;
            let hasSpanish = false;

            for (const i of inputs) {
                const text = (i.label || "") + " " + (i.placeholder || "");
                // Check for Spanish text patterns
                if (text.match(/[áéíóúñ¿¡]|Selecciona|Ej:|Tema|Estilo|Idioma|Opcional|Concepto|letra|canción|música/i)) {
                    console.log("  ⚠️  Spanish in:", i.id);
                    console.log("      Label:", i.label);
                    if (i.placeholder) console.log("      Placeholder:", i.placeholder.substring(0, 50));
                    hasSpanish = true;
                }
            }

            if (!hasSpanish) {
                console.log("  ✅ All English");
            }
        } catch (e) {
            console.log("  ❌ Error parsing inputs:", e.message);
        }
        console.log("");
    }
}

checkAllSunoInputs().catch(console.error);
