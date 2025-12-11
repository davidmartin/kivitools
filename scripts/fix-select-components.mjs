#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const FILES = [
  'app/(legal)/contact-us/page.tsx',
  'app/(tools)/[platform]/[toolId]/page.tsx',
  'app/(tools)/facebook/page-bio/page.tsx',
  'app/(tools)/facebook/ad-copy/page.tsx',
  'app/(tools)/facebook/post-generator/page.tsx',
  'app/(tools)/spotify/playlist-name/page.tsx',
  'app/(tools)/spotify/playlist-description/page.tsx',
  'app/(tools)/spotify/artist-bio/page.tsx',
];

async function fixFile(filePath) {
  const fullPath = path.join(rootDir, filePath);
  console.log(`\n📝 Fixing: ${filePath}`);
  
  let content = await fs.readFile(fullPath, 'utf-8');
  
  // Replace SelectItem with ListBox.Item
  content = content.replace(/<SelectItem /g, '<ListBox.Item ');
  content = content.replace(/<\/SelectItem>/g, '</ListBox.Item>');
  
  // Replace value prop with id prop for ListBox.Item
  content = content.replace(/(<ListBox\.Item[^>]*)\svalue="([^"]+)"/g, '$1');
  
  await fs.writeFile(fullPath, content, 'utf-8');
  console.log(`  ✅ Fixed SelectItem → ListBox.Item`);
}

async function main() {
  console.log('🚀 Fixing Select components...\n');
  
  for (const file of FILES) {
    try {
      await fixFile(file);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n✅ All files fixed!');
}

main().catch(console.error);
