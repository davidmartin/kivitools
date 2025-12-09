#!/usr/bin/env node

/**
 * Script to convert nested translation objects to flat key format.
 * 
 * Converts from:
 * export const instagramHashtagGenerator = {
 *     title: "...",
 *     description: "...",
 *     form: { ... }
 * }
 * 
 * To:
 * export const instagramHashtagGenerator = {
 *     "instagramHashtagGenerator.title": "...",
 *     "instagramHashtagGenerator.description": "...",
 *     "instagramHashtagGenerator.form.topic": "...",
 * }
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.join(__dirname, '..', 'lib', 'locales');

// Files that need to be converted (have nested structure)
const NESTED_FILES_PATTERN = /export const (\w+) = \{[\s\n]*title:/;

function flattenObject(obj, prefix = '', result = {}) {
    for (const key in obj) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], newKey, result);
        } else {
            result[newKey] = obj[key];
        }
    }
    return result;
}

function convertNestedToFlat(content, exportName) {
    // Match the object content
    const objectMatch = content.match(new RegExp(`export const ${exportName} = (\\{[\\s\\S]*\\});`, 'm'));
    if (!objectMatch) {
        console.log(`  ⚠️ Could not find object for ${exportName}`);
        return content;
    }

    try {
        // We need to evaluate the object - but since it's TypeScript, let's parse manually
        const objectStr = objectMatch[1];

        // Convert to JSON-like format for parsing (this is a simplified approach)
        // We'll use regex to extract key-value pairs
        const result = {};

        // Find all key-value pairs (handles nested objects)
        const lines = objectStr.split('\n');
        const stack = [{ obj: result, prefix: exportName }];

        for (const line of lines) {
            const trimmed = line.trim();

            // Skip empty lines, opening/closing braces
            if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed === '},') continue;

            // Check for nested object start
            const nestedMatch = trimmed.match(/^(\w+):\s*\{$/);
            if (nestedMatch) {
                const key = nestedMatch[1];
                const current = stack[stack.length - 1];
                stack.push({ obj: result, prefix: `${current.prefix}.${key}` });
                continue;
            }

            // Check for closing brace (end of nested object)
            if (trimmed === '},') {
                stack.pop();
                continue;
            }

            // Match key-value pairs
            const kvMatch = trimmed.match(/^["']?(\w+)["']?:\s*["'](.+?)["'],?$/);
            if (kvMatch) {
                const key = kvMatch[1];
                const value = kvMatch[2];
                const current = stack[stack.length - 1];
                const fullKey = `${current.prefix}.${key}`;
                result[fullKey] = value;
            }
        }

        // Generate new object string
        const entries = Object.entries(result);
        const newObjectStr = `{\n${entries.map(([k, v]) => `    "${k}": "${v.replace(/"/g, '\\"')}",`).join('\n')}\n}`;

        return content.replace(objectMatch[0], `export const ${exportName} = ${newObjectStr};`);
    } catch (err) {
        console.log(`  ⚠️ Error processing ${exportName}: ${err.message}`);
        return content;
    }
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if file has nested structure
    const match = content.match(NESTED_FILES_PATTERN);
    if (!match) {
        return false;
    }

    const exportName = match[1];
    console.log(`  Converting ${exportName}...`);

    const newContent = convertNestedToFlat(content, exportName);

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        return true;
    }

    return false;
}

function walkDir(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath, callback);
        } else if (file.endsWith('.ts')) {
            callback(filePath);
        }
    }
}

console.log('🔄 Converting nested translation files to flat keys...\n');

let converted = 0;
let scanned = 0;

walkDir(LOCALES_DIR, (filePath) => {
    // Skip index files
    if (filePath.includes('index.ts')) return;

    scanned++;
    const relativePath = path.relative(LOCALES_DIR, filePath);

    if (processFile(filePath)) {
        console.log(`✅ Converted: ${relativePath}`);
        converted++;
    }
});

console.log(`\n📊 Summary: Scanned ${scanned} files, converted ${converted} files.`);
