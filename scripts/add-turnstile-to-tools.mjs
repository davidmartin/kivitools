#!/usr/bin/env node

/**
 * Script to automatically add Turnstile bot protection to all tool pages
 * Run with: node scripts/add-turnstile-to-tools.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All tools organized by platform
const TOOLS = {
  tiktok: [
    "video-ideas",
    "hook-generator",
    "hashtag-generator",
    "username-generator",
    "shop-name-generator",
    "engagement-calculator",
    "money-calculator",
    "coins-calculator",
  ],
  instagram: ["bio-generator", "caption-generator", "reel-script"],
  twitter: ["bio-generator", "tweet-generator", "thread-maker"],
  snapchat: ["caption-generator", "story-ideas", "lens-ideas"],
  youtube: ["title-generator", "description-generator", "script-generator"],
  reddit: ["post-generator", "comment-generator", "ama-questions"],
  discord: ["announcement-generator", "event-description", "welcome-message"],
  twitch: ["stream-title", "panel-description", "chat-command"],
};

function updatePageFile(platform, tool) {
  const filePath = path.join(
    __dirname,
    "..",
    "app",
    "(tools)",
    platform,
    tool,
    "page.tsx"
  );

  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // Skip if already has Turnstile
  if (content.includes("TurnstileWidget")) {
    console.log(`⏭️  ${platform}/${tool} - Already has Turnstile`);
    return true;
  }

  // 1. Add import
  if (!content.includes('import TurnstileWidget from "@/app/components/turnstile-widget";')) {
    content = content.replace(
      'import ToolSelector from "@/app/components/tool-selector";',
      'import ToolSelector from "@/app/components/tool-selector";\nimport TurnstileWidget from "@/app/components/turnstile-widget";'
    );
  }

  // 2. Add state variable - look for useState declarations
  const stateRegex = /const \[(\w+), set\1\] = useState\(/g;
  const lastStateMatch = [...content.matchAll(stateRegex)].pop();

  if (lastStateMatch && !content.includes("turnstileToken")) {
    const insertPosition = lastStateMatch.index + lastStateMatch[0].length;
    // Find the end of this useState line (look for semicolon)
    const afterStateMatch = content.substring(insertPosition);
    const semicolonPos = afterStateMatch.indexOf(";");

    if (semicolonPos !== -1) {
      const fullInsertPos = insertPosition + semicolonPos + 1;
      content =
        content.substring(0, fullInsertPos) +
        '\n  const [turnstileToken, setTurnstileToken] = useState<string>("");' +
        content.substring(fullInsertPos);
    }
  }

  // 3. Add token to API call body
  content = content.replace(
    /body: JSON\.stringify\(\{([^}]+)\}\),/,
    (match, bodyContent) => {
      if (!bodyContent.includes("turnstileToken")) {
        return `body: JSON.stringify({${bodyContent},\n          turnstileToken,\n        }),`;
      }
      return match;
    }
  );

  // 4. Add token validation in handleGenerate/handleSubmit
  const generateFunctionRegex = /(const handle(?:Generate|Submit) = async \(\) => \{[\s\S]*?)(setIsLoading\(true\);)/;
  content = content.replace(generateFunctionRegex, (match, beforeLoading, loadingLine) => {
    if (match.includes("if (!turnstileToken)")) {
      return match; // Already has validation
    }

    return `${beforeLoading}
    if (!turnstileToken) {
      setError(t("turnstile.failed"));
      return;
    }

    ${loadingLine}`;
  });

  // 5. Reset token in handleUseAgain
  content = content.replace(
    /(const handleUseAgain = \(\) => \{[\s\S]*?)(};)/,
    (match, functionBody, closing) => {
      if (match.includes('setTurnstileToken("")')) {
        return match;
      }
      return `${functionBody}    setTurnstileToken("");\n  ${closing}`;
    }
  );

  // 6. Add Turnstile widget before generate button
  // Look for the generate button pattern
  const buttonPattern = /(\{![\w]+ && \([\s\S]*?<Button[\s\S]*?onClick=\{handle(?:Generate|Submit)\})/;
  content = content.replace(buttonPattern, (match) => {
    if (match.includes("<TurnstileWidget")) {
      return match;
    }

    // Add Turnstile widget before the button
    const insertPos = match.indexOf("<Button");
    return (
      match.substring(0, insertPos) +
      `<TurnstileWidget
                onSuccess={setTurnstileToken}
                onError={() => setError(t("turnstile.error"))}
              />
              ` +
      match.substring(insertPos)
    );
  });

  // 7. Update button disabled state
  content = content.replace(
    /isDisabled=\{isLoading\}/g,
    "isDisabled={isLoading || !turnstileToken}"
  );

  // Write updated content
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ ${platform}/${tool} - Page updated`);
  return true;
}

function updateApiRoute(platform, tool) {
  const filePath = path.join(
    __dirname,
    "..",
    "app",
    "api",
    "tools",
    platform,
    tool,
    "route.ts"
  );

  if (!fs.existsSync(filePath)) {
    console.log(`❌ API route not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // Skip if already has Turnstile
  if (content.includes("verifyTurnstileToken")) {
    console.log(`⏭️  ${platform}/${tool} - API already has Turnstile`);
    return true;
  }

  // 1. Add import
  if (!content.includes('import { verifyTurnstileToken } from "@/lib/turnstile";')) {
    content = content.replace(
      'import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";',
      'import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";\nimport { verifyTurnstileToken } from "@/lib/turnstile";'
    );
  }

  // 2. Extract turnstileToken from body
  content = content.replace(
    /const \{ ([^}]+) \} = body;/,
    (match, fields) => {
      if (!fields.includes("turnstileToken")) {
        return `const { ${fields}, turnstileToken } = body;`;
      }
      return match;
    }
  );

  // 3. Add verification logic after extracting body
  const verificationCode = `
        // Verify Turnstile token first
        if (!turnstileToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification required",
                },
                { status: 403 }
            );
        }

        const userIp = getUserIpFromRequest(request);
        const isValid = await verifyTurnstileToken(turnstileToken, userIp);

        if (!isValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Bot verification failed",
                },
                { status: 403 }
            );
        }
`;

  // Insert verification after body extraction
  content = content.replace(
    /(const \{ [^}]+ \} = body;)/,
    (match) => {
      if (content.includes("Verify Turnstile token first")) {
        return match;
      }
      return match + verificationCode;
    }
  );

  // Write updated content
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ ${platform}/${tool} - API route updated`);
  return true;
}

// Main execution
console.log("🔒 Adding Turnstile bot protection to all tools...\n");

let totalUpdated = 0;
let totalFailed = 0;

for (const [platform, tools] of Object.entries(TOOLS)) {
  console.log(`\n📱 ${platform.toUpperCase()}`);
  console.log("=".repeat(50));

  for (const tool of tools) {
    const pageSuccess = updatePageFile(platform, tool);
    const apiSuccess = updateApiRoute(platform, tool);

    if (pageSuccess && apiSuccess) {
      totalUpdated++;
    } else {
      totalFailed++;
    }
  }
}

console.log("\n" + "=".repeat(50));
console.log(`\n✅ Total updated: ${totalUpdated} tools`);
console.log(`❌ Total failed: ${totalFailed} tools`);
console.log("\n🎉 Turnstile protection implementation complete!");
console.log("\n📝 Next steps:");
console.log("1. Review changes with: git diff");
console.log("2. Test a few tools manually");
console.log("3. Set up Turnstile keys in .env.local");
console.log("4. Commit changes: git add . && git commit -m 'feat: Add Turnstile bot protection to all 29 tools'");
