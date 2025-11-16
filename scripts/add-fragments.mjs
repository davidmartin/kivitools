#!/usr/bin/env node

/**
 * Add React Fragment wrapper around Turnstile + Button
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

    // Pattern: {!variable && (\n  <TurnstileWidget.../>\n  <Button.../>)\n)}
    // Replace with Fragment wrapper

    const pattern = /(\{![\w]+ && \(\s*)\n(\s+<TurnstileWidget[\s\S]*?\/>\s*\n\s+<Button[\s\S]*?<\/Button>\s*\n)(\s+\)\})/g;

    content = content.replace(pattern, (match, before, middle, after) => {
        return `${before}\n              <>\n${middle}              </>\n${after}`;
    });

    // Also fix onClick to onPress for handleUseAgain
    content = content.replace(/onClick=\{handleUseAgain\}/g, "onPress={handleUseAgain}");

    // Fix onClick to onPress for handleCopy
    content = content.replace(/onClick=\{handleCopy}/g, "onPress={handleCopy}");

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

console.log("🔧 Adding Fragment wrappers...\n");

const fixedCount = walkDirectory(TOOLS_DIR);

console.log(`\n✅ Fixed ${fixedCount} files`);
