#!/usr/bin/env node

/**
 * Fix script to add missing turnstileToken state and fix syntax errors
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DIR = path.join(__dirname, "..", "app", "(tools)");

function fixPageFile(filePath) {
    let content = fs.readFileSync(filePath, "utf-8");
    let modified = false;

    // Check if file needs turnstileToken but doesn't have state
    if (content.includes("turnstileToken") && !content.includes("const [turnstileToken, setTurnstileToken]")) {
        // Find the last useState declaration
        const useStateRegex = /const \[(\w+), set\w+\] = useState[^;]+;/g;
        const matches = [...content.matchAll(useStateRegex)];

        if (matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            const insertPos = lastMatch.index + lastMatch[0].length;

            content =
                content.substring(0, insertPos) +
                '\n  const [turnstileToken, setTurnstileToken] = useState<string>("");' +
                content.substring(insertPos);

            modified = true;
        }
    }

    // Fix malformed JSON.stringify with extra comma
    content = content.replace(/,\s*,\s*turnstileToken,/g, ",\n          turnstileToken,");
    content = content.replace(/language,\s*,/g, "language,");

    if (modified || content !== fs.readFileSync(filePath, "utf-8")) {
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
            if (fixPageFile(fullPath)) {
                console.log(`✅ Fixed: ${fullPath.replace(TOOLS_DIR, "")}`);
                fixed++;
            }
        }
    }

    return fixed;
}

console.log("🔧 Fixing Turnstile implementation issues...\n");

const fixedCount = walkDirectory(TOOLS_DIR);

console.log(`\n✅ Fixed ${fixedCount} files`);
