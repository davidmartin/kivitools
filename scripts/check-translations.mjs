import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractKeys(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = /"([^"]+)":\s*["`]/g;
    const matches = content.matchAll(regex);
    return new Set([...matches].map(m => m[1]));
}

function getAllKeysFromLocale(localePath) {
    const keys = new Set();
    const files = fs.readdirSync(localePath);

    for (const file of files) {
        const filePath = path.join(localePath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && file.endsWith('.ts') && file !== 'index.ts') {
            const fileKeys = extractKeys(filePath);
            fileKeys.forEach(k => keys.add(k));
        }
    }
    return keys;
}

const localesPath = path.join(__dirname, '../lib/locales');
const languages = ['es', 'en', 'pt', 'fr', 'de', 'it'];

const enKeys = getAllKeysFromLocale(path.join(localesPath, 'en'));
console.log('Total English keys: ' + enKeys.size);

for (const lang of languages) {
    if (lang === 'en') continue;

    const langKeys = getAllKeysFromLocale(path.join(localesPath, lang));
    const missing = [...enKeys].filter(k => langKeys.has(k) === false);
    const extra = [...langKeys].filter(k => enKeys.has(k) === false);

    console.log('\n=== ' + lang.toUpperCase() + ' ===');
    console.log('Keys: ' + langKeys.size + ', Missing: ' + missing.length + ', Extra: ' + extra.length);

    if (missing.length > 0 && missing.length <= 50) {
        console.log('Missing keys:');
        missing.forEach(k => console.log('  - ' + k));
    } else if (missing.length > 50) {
        console.log('Missing keys (first 50 of ' + missing.length + '):');
        missing.slice(0, 50).forEach(k => console.log('  - ' + k));
    }
}
