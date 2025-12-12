#!/usr/bin/env node

/**
 * Script para auditar las tools en Appwrite
 * Revisa: descripciones, inputs, placeholders, etc.
 * 
 * Run: node scripts/audit-tools-data.mjs
 */

import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools";

async function auditTools() {
  console.log("\n" + "═".repeat(80));
  console.log("🔍 AUDITORÍA DE TOOLS EN APPWRITE");
  console.log("═".repeat(80) + "\n");

  // Obtener todas las tools (solo EN para evitar duplicados)
  const allTools = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      TOOLS_COLLECTION_ID,
      [
        Query.equal("language", "en"),
        Query.equal("status", "approved"),
        Query.limit(limit),
        Query.offset(offset)
      ]
    );

    allTools.push(...response.documents);

    if (response.documents.length < limit) break;
    offset += limit;
  }

  console.log(`📊 Total tools (EN): ${allTools.length}\n`);

  // Categorizar problemas
  const issues = {
    noDescription: [],
    shortDescription: [],
    noInputs: [],
    singleGenericInput: [],
    noPlaceholders: [],
    missingLabels: [],
    noPromptTemplate: [],
    perfectTools: []
  };

  for (const tool of allTools) {
    const problems = [];

    // 1. Revisar descripción
    if (!tool.description || tool.description.trim() === "") {
      issues.noDescription.push(tool);
      problems.push("NO_DESC");
    } else if (tool.description.length < 30) {
      issues.shortDescription.push(tool);
      problems.push("SHORT_DESC");
    }

    // 2. Revisar inputs
    let inputs = [];
    try {
      inputs = JSON.parse(tool.inputs || "[]");
    } catch (e) {
      inputs = [];
    }

    if (inputs.length === 0) {
      issues.noInputs.push(tool);
      problems.push("NO_INPUTS");
    } else if (inputs.length === 1 && inputs[0].name === "topic") {
      issues.singleGenericInput.push(tool);
      problems.push("GENERIC_INPUT");
    }

    // 3. Revisar placeholders en inputs
    const inputsWithoutPlaceholders = inputs.filter(i => !i.placeholder);
    if (inputsWithoutPlaceholders.length > 0 && inputs.length > 0) {
      issues.noPlaceholders.push(tool);
      problems.push("NO_PLACEHOLDERS");
    }

    // 4. Revisar labels
    const inputsWithoutLabels = inputs.filter(i => !i.label);
    if (inputsWithoutLabels.length > 0 && inputs.length > 0) {
      issues.missingLabels.push(tool);
      problems.push("NO_LABELS");
    }

    // 5. Revisar prompt template
    if (!tool.prompt_template || tool.prompt_template.trim() === "") {
      issues.noPromptTemplate.push(tool);
      problems.push("NO_PROMPT");
    }

    // Si no hay problemas, es perfecta
    if (problems.length === 0) {
      issues.perfectTools.push(tool);
    }
  }

  // Mostrar resumen
  console.log("═".repeat(80));
  console.log("📋 RESUMEN DE PROBLEMAS ENCONTRADOS");
  console.log("═".repeat(80) + "\n");

  console.log(`✅ Tools perfectas: ${issues.perfectTools.length}`);
  console.log(`❌ Sin descripción: ${issues.noDescription.length}`);
  console.log(`⚠️  Descripción corta (<30 chars): ${issues.shortDescription.length}`);
  console.log(`❌ Sin inputs: ${issues.noInputs.length}`);
  console.log(`⚠️  Solo input genérico (topic): ${issues.singleGenericInput.length}`);
  console.log(`⚠️  Inputs sin placeholders: ${issues.noPlaceholders.length}`);
  console.log(`❌ Inputs sin labels: ${issues.missingLabels.length}`);
  console.log(`❌ Sin prompt template: ${issues.noPromptTemplate.length}`);

  // Mostrar ejemplos de tools con solo input genérico
  if (issues.singleGenericInput.length > 0) {
    console.log("\n" + "─".repeat(80));
    console.log("⚠️  TOOLS CON SOLO INPUT GENÉRICO (topic) - Primeras 15:");
    console.log("─".repeat(80));
    
    for (const tool of issues.singleGenericInput.slice(0, 15)) {
      console.log(`   • ${tool.platform}/${tool.slug}: "${tool.name}"`);
      console.log(`     Descripción: ${tool.description?.substring(0, 60) || "N/A"}...`);
    }
  }

  // Mostrar ejemplos de tools sin placeholders
  if (issues.noPlaceholders.length > 0) {
    console.log("\n" + "─".repeat(80));
    console.log("⚠️  TOOLS SIN PLACEHOLDERS EN INPUTS - Primeras 10:");
    console.log("─".repeat(80));
    
    for (const tool of issues.noPlaceholders.slice(0, 10)) {
      let inputs = [];
      try {
        inputs = JSON.parse(tool.inputs || "[]");
      } catch (e) {}
      
      console.log(`   • ${tool.platform}/${tool.slug}`);
      console.log(`     Inputs: ${inputs.map(i => i.name).join(", ")}`);
    }
  }

  // Mostrar tools sin labels (CRÍTICO)
  if (issues.missingLabels.length > 0) {
    console.log("\n" + "─".repeat(80));
    console.log("❌ TOOLS SIN LABELS EN INPUTS (CRÍTICO) - Todas:");
    console.log("─".repeat(80));
    
    for (const tool of issues.missingLabels) {
      let inputs = [];
      try {
        inputs = JSON.parse(tool.inputs || "[]");
      } catch (e) {}
      
      const noLabelInputs = inputs.filter(i => !i.label);
      console.log(`   • ${tool.platform}/${tool.slug} - ${tool.$id}`);
      console.log(`     Inputs sin label: ${noLabelInputs.map(i => i.name || i.id || "unnamed").join(", ")}`);
      console.log(`     Full inputs: ${JSON.stringify(inputs)}`);
    }
  }

  // Mostrar tools perfectas por plataforma
  console.log("\n" + "─".repeat(80));
  console.log("✅ TOOLS PERFECTAS POR PLATAFORMA:");
  console.log("─".repeat(80));

  const perfectByPlatform = {};
  for (const tool of issues.perfectTools) {
    perfectByPlatform[tool.platform] = (perfectByPlatform[tool.platform] || 0) + 1;
  }

  for (const [platform, count] of Object.entries(perfectByPlatform).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${platform}: ${count}`);
  }

  // Mostrar ejemplo de tool perfecta
  if (issues.perfectTools.length > 0) {
    console.log("\n" + "─".repeat(80));
    console.log("📝 EJEMPLO DE TOOL PERFECTA:");
    console.log("─".repeat(80));

    const example = issues.perfectTools[0];
    let inputs = [];
    try {
      inputs = JSON.parse(example.inputs || "[]");
    } catch (e) {}

    console.log(`   Platform: ${example.platform}`);
    console.log(`   Slug: ${example.slug}`);
    console.log(`   Name: ${example.name}`);
    console.log(`   Description: ${example.description?.substring(0, 80)}...`);
    console.log(`   Inputs: ${JSON.stringify(inputs, null, 2).split("\n").map((l, i) => i === 0 ? l : "            " + l).join("\n")}`);
    console.log(`   Prompt Template: ${example.prompt_template?.substring(0, 100)}...`);
  }

  console.log("\n" + "═".repeat(80));
  console.log("🏁 AUDITORÍA COMPLETADA");
  console.log("═".repeat(80) + "\n");
}

auditTools().catch(console.error);
