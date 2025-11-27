/**
 * AEO Schema Batch Update Script
 * 
 * This script adds AEO structured data schemas (SoftwareApplication, HowTo, FAQ, Speakable)
 * to all tool page layout.tsx files that don't already have them.
 * 
 * Usage: node scripts/add-aeo-schemas.mjs
 * 
 * The script:
 * 1. Scans all tool directories under app/(tools)/[platform]/[tool]/
 * 2. Checks if layout.tsx exists and needs AEO schemas
 * 3. Updates layout.tsx with JSON-LD schema scripts
 * 4. Reports which files were updated
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Platforms to scan
const PLATFORMS = [
  'tiktok', 'instagram', 'youtube', 'twitter', 'snapchat', 'reddit',
  'discord', 'twitch', 'linkedin', 'pinterest', 'facebook', 'threads',
  'suno', 'elevenlabs', 'spotify', 'amazon', 'forocoches'
];

// Skip these (already updated manually or special cases)
const SKIP_TOOLS = new Set([
  'tiktok/script-writer',
  'tiktok/video-ideas',
  'tiktok/hook-generator',
  'tiktok/hashtag-generator',
  'instagram/bio-generator',
  'instagram/caption-generator',
  'youtube/title-generator',
  'twitter/bio-generator',
]);

/**
 * Check if a layout file already has AEO schemas
 */
function hasAeoSchemas(content) {
  return content.includes('generateHowToJsonLd') || 
         content.includes('generateSpeakableJsonLd') ||
         content.includes('lib/aeo');
}

/**
 * Extract tool info from existing layout file
 */
function extractToolInfo(content, platform, toolSlug) {
  const toolNameMatch = content.match(/toolName:\s*["']([^"']+)["']/);
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const descriptionMatch = content.match(/description:\s*["']([^"']+)["']/);
  const englishSlugMatch = content.match(/englishSlug:\s*["']([^"']+)["']/);

  return {
    toolName: toolNameMatch ? toolNameMatch[1] : formatToolName(toolSlug),
    title: titleMatch ? titleMatch[1] : `${formatToolName(toolSlug)} - KiviTools`,
    description: descriptionMatch ? descriptionMatch[1] : `Free ${formatToolName(toolSlug)} tool for ${platform}.`,
    englishSlug: englishSlugMatch ? englishSlugMatch[1] : toolSlug,
    platform,
  };
}

/**
 * Format tool slug to readable name
 */
function formatToolName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate generic HowTo steps based on tool type
 */
function generateGenericSteps(toolName, platform) {
  return [
    { title: 'Enter Your Details', description: `Provide the necessary information for your ${platform} content.` },
    { title: 'Customize Options', description: 'Select your preferred style, tone, or other customization options.' },
    { title: 'Generate and Copy', description: `Click generate to create your ${toolName.toLowerCase()}, then copy the result.` },
  ];
}

/**
 * Generate generic FAQ questions based on tool type
 */
function generateGenericFaqs(toolName, platform) {
  return [
    { question: `Is the ${toolName} free?`, answer: 'Yes, completely free with no signup required. Generate unlimited content.' },
    { question: 'What languages are supported?', answer: 'We support English, Spanish, Portuguese, French, German, and Italian.' },
    { question: `How does the ${toolName} work?`, answer: `Our AI analyzes your input and generates optimized ${platform} content based on best practices.` },
    { question: 'Can I use this for business?', answer: 'Absolutely! All generated content is yours to use for personal or commercial purposes.' },
    { question: 'How often can I generate content?', answer: 'There are no limits - generate as much content as you need, completely free.' },
  ];
}

/**
 * Generate updated layout content with AEO schemas
 */
function generateUpdatedLayout(originalContent, toolInfo) {
  const { toolName, description, englishSlug, platform } = toolInfo;
  
  // Check if it already has the imports we need
  const hasGenerateToolJsonLd = originalContent.includes('generateToolJsonLd');
  
  // Build import statement
  let newImports = '';
  if (!hasGenerateToolJsonLd) {
    newImports = `import { generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo-metadata";\n`;
  } else {
    // Just add the missing imports
    newImports = originalContent.match(/import \{[^}]+\} from ["']@\/lib\/seo-metadata["'];?/)?.[0] || '';
    if (!newImports.includes('generateFaqJsonLd')) {
      newImports = newImports.replace(
        'generateToolMetadata',
        'generateToolMetadata, generateToolJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd'
      );
    }
  }
  
  // Replace the old import
  let updatedContent = originalContent.replace(
    /import \{[^}]+\} from ["']@\/lib\/seo-metadata["'];?/,
    newImports
  );
  
  // Add AEO imports after seo-metadata import
  if (!originalContent.includes('lib/aeo')) {
    updatedContent = updatedContent.replace(
      /(import \{[^}]+\} from ["']@\/lib\/seo-metadata["'];?)/,
      `$1\nimport { generateHowToJsonLd } from "@/lib/aeo/howto-generator";\nimport { generateSpeakableJsonLd } from "@/lib/aeo/speakable-generator";`
    );
  }
  
  // Find where to insert the schema constants (after metadata export)
  const metadataEndIndex = updatedContent.indexOf('});', updatedContent.indexOf('export const metadata')) + 3;
  
  const steps = generateGenericSteps(toolName, platform);
  const faqs = generateGenericFaqs(toolName, platform);
  
  const schemaConstants = `

const toolJsonLd = generateToolJsonLd({
  platform: "${platform}",
  toolName: "${toolName}",
  title: "${toolName}",
  description: "${description.replace(/"/g, '\\"')}",
  englishSlug: "${englishSlug}",
  language: "en",
});

const breadcrumbJsonLd = generateBreadcrumbJsonLd({
  platform: "${platform}",
  toolName: "${toolName}",
  englishSlug: "${englishSlug}",
});

const howToJsonLd = generateHowToJsonLd({
  toolName: "${toolName}",
  description: "${description.replace(/"/g, '\\"')}",
  steps: [
    { title: "${steps[0].title}", description: "${steps[0].description.replace(/"/g, '\\"')}" },
    { title: "${steps[1].title}", description: "${steps[1].description.replace(/"/g, '\\"')}" },
    { title: "${steps[2].title}", description: "${steps[2].description.replace(/"/g, '\\"')}" },
  ],
  language: "en",
});

const faqJsonLd = generateFaqJsonLd([
  { question: "${faqs[0].question}", answer: "${faqs[0].answer.replace(/"/g, '\\"')}" },
  { question: "${faqs[1].question}", answer: "${faqs[1].answer.replace(/"/g, '\\"')}" },
  { question: "${faqs[2].question}", answer: "${faqs[2].answer.replace(/"/g, '\\"')}" },
  { question: "${faqs[3].question}", answer: "${faqs[3].answer.replace(/"/g, '\\"')}" },
  { question: "${faqs[4].question}", answer: "${faqs[4].answer.replace(/"/g, '\\"')}" },
], "en");

const speakableJsonLd = generateSpeakableJsonLd({
  pageName: "${toolName}",
  url: "https://kivitools.com/${platform}/${englishSlug}",
});`;

  // Insert schema constants
  updatedContent = updatedContent.slice(0, metadataEndIndex) + schemaConstants + updatedContent.slice(metadataEndIndex);
  
  // Update the Layout component to include JSON-LD scripts
  updatedContent = updatedContent.replace(
    /export default function Layout\(\{ children \}: \{ children: React\.ReactNode \}\) \{\s*return <>\{children\}<\/>;?\s*\}/,
    `export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      {children}
    </>
  );
}`
  );
  
  return updatedContent;
}

/**
 * Main script execution
 */
function main() {
  console.log('🚀 AEO Schema Batch Update Script\n');
  
  const toolsDir = join(ROOT_DIR, 'app', '(tools)');
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  const updatedFiles = [];
  const skippedFiles = [];
  const errorFiles = [];
  
  for (const platform of PLATFORMS) {
    const platformDir = join(toolsDir, platform);
    
    if (!existsSync(platformDir)) {
      console.log(`⚠️  Platform directory not found: ${platform}`);
      continue;
    }
    
    // Get all subdirectories (tools) in platform
    const entries = readdirSync(platformDir);
    
    for (const entry of entries) {
      const toolPath = join(platformDir, entry);
      
      // Skip if not a directory
      if (!statSync(toolPath).isDirectory()) continue;
      
      // Skip if it's the dynamic route folder
      if (entry.startsWith('[')) continue;
      
      const toolKey = `${platform}/${entry}`;
      
      // Check if we should skip this tool
      if (SKIP_TOOLS.has(toolKey)) {
        skipped++;
        skippedFiles.push(toolKey);
        continue;
      }
      
      const layoutPath = join(toolPath, 'layout.tsx');
      
      // Check if layout.tsx exists
      if (!existsSync(layoutPath)) {
        console.log(`⚠️  No layout.tsx found: ${toolKey}`);
        continue;
      }
      
      try {
        const content = readFileSync(layoutPath, 'utf-8');
        
        // Skip if already has AEO schemas
        if (hasAeoSchemas(content)) {
          skipped++;
          skippedFiles.push(toolKey);
          continue;
        }
        
        // Extract tool info and generate updated content
        const toolInfo = extractToolInfo(content, platform, entry);
        const updatedContent = generateUpdatedLayout(content, toolInfo);
        
        // Write updated content
        writeFileSync(layoutPath, updatedContent, 'utf-8');
        updated++;
        updatedFiles.push(toolKey);
        console.log(`✅ Updated: ${toolKey}`);
        
      } catch (err) {
        errors++;
        errorFiles.push({ tool: toolKey, error: err.message });
        console.log(`❌ Error processing ${toolKey}: ${err.message}`);
      }
    }
  }
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Updated: ${updated} files`);
  console.log(`   Skipped: ${skipped} files (already have AEO or in skip list)`);
  console.log(`   Errors:  ${errors} files`);
  
  if (updatedFiles.length > 0) {
    console.log('\n✅ Updated files:');
    updatedFiles.forEach(f => console.log(`   - ${f}`));
  }
  
  if (errorFiles.length > 0) {
    console.log('\n❌ Files with errors:');
    errorFiles.forEach(f => console.log(`   - ${f.tool}: ${f.error}`));
  }
  
  console.log('\n🎉 Done!');
}

main();
