#!/usr/bin/env node

/**
 * Script para convertir elementos HTML nativos a componentes HeroUI v3
 * Procesa archivos TSX y reemplaza <input>, <textarea>, <select> por sus equivalentes HeroUI
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Archivos a procesar
const FILES_TO_FIX = [
  'app/(tools)/facebook/page-bio/page.tsx',
  'app/(tools)/facebook/ad-copy/page.tsx',
  'app/(tools)/facebook/post-generator/page.tsx',
  'app/(tools)/spotify/playlist-name/page.tsx',
  'app/(tools)/spotify/playlist-description/page.tsx',
  'app/(tools)/spotify/artist-bio/page.tsx',
];

async function fixFile(filePath) {
  const fullPath = path.join(rootDir, filePath);
  console.log(`\n📝 Processing: ${filePath}`);
  
  let content = await fs.readFile(fullPath, 'utf-8');
  let modified = false;

  // 1. Fix imports - Add Input, Select, SelectItem, TextArea if not present
  const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+"@heroui\/react";/);
  if (importMatch) {
    const imports = importMatch[1].split(',').map(i => i.trim());
    const neededImports = ['Input', 'Select', 'SelectItem', 'TextArea'];
    const missingImports = neededImports.filter(i => !imports.includes(i));
    
    if (missingImports.length > 0) {
      const allImports = [...imports, ...missingImports].join(', ');
      content = content.replace(
        /import\s+{[^}]+}\s+from\s+"@heroui\/react";/,
        `import { ${allImports} } from "@heroui/react";`
      );
      modified = true;
      console.log(`  ✅ Added imports: ${missingImports.join(', ')}`);
    }
  }

  // 2. Replace <input type="text"> with <Input>
  const textInputRegex = /<input\s+([^>]*type="text"[^>]*|[^>]*(?!type=)[^>]*)>/g;
  let inputMatches = 0;
  content = content.replace(textInputRegex, (match) => {
    // Extract attributes
    const idMatch = match.match(/id="([^"]+)"/);
    const valueMatch = match.match(/value={([^}]+)}/);
    const onChangeMatch = match.match(/onChange={(e) => ([^}]+)}/);
    const placeholderMatch = match.match(/placeholder={([^}]+)}/);
    const disabledMatch = match.match(/disabled={([^}]+)}/);

    if (!valueMatch || !onChangeMatch) return match;

    inputMatches++;
    return `<Input
                ${idMatch ? `id="${idMatch[1]}"` : ''}
                type="text"
                value={${valueMatch[1]}}
                onChange={(e) => ${onChangeMatch[1]}}
                ${placeholderMatch ? `placeholder={${placeholderMatch[1]}}` : ''}
                ${disabledMatch ? `isDisabled={${disabledMatch[1]}}` : ''}
                classNames={{
                  input: "bg-surface text-foreground",
                  inputWrapper: "border-border"
                }}
              />`;
  });
  
  if (inputMatches > 0) {
    modified = true;
    console.log(`  ✅ Replaced ${inputMatches} <input> elements`);
  }

  // 3. Replace <textarea> with <TextArea>
  const textareaRegex = /<textarea\s+([^>]*)>([^<]*)<\/textarea>/g;
  let textareaMatches = 0;
  content = content.replace(textareaRegex, (match, attrs) => {
    const valueMatch = attrs.match(/value={([^}]+)}/);
    const onChangeMatch = attrs.match(/onChange={(e) => ([^}]+)}/);
    const placeholderMatch = attrs.match(/placeholder={([^}]+)}/);
    const rowsMatch = attrs.match(/rows={(\d+)}/);
    const disabledMatch = attrs.match(/disabled={([^}]+)}/);

    if (!valueMatch || !onChangeMatch) return match;

    textareaMatches++;
    return `<TextArea
                value={${valueMatch[1]}}
                onChange={(e) => ${onChangeMatch[1]}}
                ${placeholderMatch ? `placeholder={${placeholderMatch[1]}}` : ''}
                ${rowsMatch ? `minRows={${rowsMatch[1]}}` : 'minRows={3}'}
                ${disabledMatch ? `isDisabled={${disabledMatch[1]}}` : ''}
                classNames={{
                  input: "bg-surface text-foreground",
                  inputWrapper: "border-border"
                }}
              />`;
  });

  if (textareaMatches > 0) {
    modified = true;
    console.log(`  ✅ Replaced ${textareaMatches} <textarea> elements`);
  }

  // 4. Replace <select> with <Select>
  // This is more complex due to <option> children
  const selectRegex = /<select\s+([^>]*)>([\s\S]*?)<\/select>/g;
  let selectMatches = 0;
  content = content.replace(selectRegex, (match, attrs, options) => {
    const valueMatch = attrs.match(/value={([^}]+)}/);
    const onChangeMatch = attrs.match(/onChange={(e) => ([^}]+)}/);
    const disabledMatch = attrs.match(/disabled={([^}]+)}/);

    if (!valueMatch || !onChangeMatch) return match;

    // Extract options
    const optionRegex = /<option\s+(?:value="([^"]+)"|value={([^}]+)})[^>]*>([\s\S]*?)<\/option>/g;
    let optionsArray = [];
    let optionMatch;
    while ((optionMatch = optionRegex.exec(options)) !== null) {
      const value = optionMatch[1] || optionMatch[2];
      const label = optionMatch[3].trim();
      optionsArray.push({ value, label });
    }

    if (optionsArray.length === 0) return match;

    // Convert onChange to use selection
    const setterMatch = onChangeMatch[1].match(/set\w+\(\s*e\.target\.value\s*\)/);
    let onSelectionChange = '';
    if (setterMatch) {
      const setter = setterMatch[0].match(/set\w+/)[0];
      onSelectionChange = `onSelectionChange={(keys) => ${setter}(Array.from(keys)[0] as string)}`;
    } else {
      onSelectionChange = `onChange={(e) => ${onChangeMatch[1]}}`;
    }

    selectMatches++;
    const selectItems = optionsArray.map(opt => {
      const cleanLabel = opt.label.replace(/{t\("([^"]+)"\)}/, '$1');
      return `                <SelectItem key="${opt.value}" value="${opt.value}">${opt.label}</SelectItem>`;
    }).join('\n');

    return `<Select
                selectedKeys={${valueMatch[1]} ? [${valueMatch[1]}] : []}
                ${onSelectionChange}
                ${disabledMatch ? `isDisabled={${disabledMatch[1]}}` : ''}
                classNames={{
                  trigger: "bg-surface border-border",
                  value: "text-foreground"
                }}
              >
${selectItems}
              </Select>`;
  });

  if (selectMatches > 0) {
    modified = true;
    console.log(`  ✅ Replaced ${selectMatches} <select> elements`);
  }

  // Write back if modified
  if (modified) {
    await fs.writeFile(fullPath, content, 'utf-8');
    console.log(`  💾 File saved`);
  } else {
    console.log(`  ⏭️  No changes needed`);
  }
}

async function main() {
  console.log('🚀 Starting HeroUI v3 component migration...\n');
  console.log(`Processing ${FILES_TO_FIX.length} files:\n`);

  for (const file of FILES_TO_FIX) {
    try {
      await fixFile(file);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log('\n✅ Migration complete!');
}

main().catch(console.error);
