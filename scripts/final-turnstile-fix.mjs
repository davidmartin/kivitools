#!/usr/bin/env node

/**
 * Final fix script for Turnstile implementation
 * Fixes JSX structure and Button component issues
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DIR = path.join(__dirname, "..", "app", "(tools)");

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;

  // Fix: TurnstileWidget and Button should both be in the same conditional with proper structure
  // Pattern: {!result && (<TurnstileWidget.../><Button.../>)}
  
  // Replace onClick with onPress for Hero UI Button
  content = content.replace(/onClick=\{handle(Generate|Submit)\}/g, "onPress={handle$1}");

  // Fix the structure where Turnstile and Button are in wrong order/structure
  // Find patterns like:
  // {!result && (
  //   <TurnstileWidget.../>
  //   <Button.../>
  // )}
  
  const turnstileButtonPattern = /(\{![\w]+ && \(\s*<TurnstileWidget[^>]*>\s*<\/TurnstileWidget>\s*)(<Button)/g;
  content = content.replace(turnstileButtonPattern, "$1\n              $2");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    return true;
  }

  return false;
}

function walkDirectory(dir) {
  let fixed = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixed += walkDirectory(fullPath);
    } else if (entry.name === "page.tsx") {
      if (fixFile(fullPath)) {
        console.log(`✅ Fixed: ${fullPath.replace(TOOLS_DIR, "")}`);
        fixed++;
      }
    }
  }

  return fixed;
}

console.log("🔧 Final Turnstile fixes...\n");

const fixedCount = walkDirectory(TOOLS_DIR);

console.log(`\n✅ Fixed ${fixedCount} files`);
console.log("\nPlease run: npm run build");
