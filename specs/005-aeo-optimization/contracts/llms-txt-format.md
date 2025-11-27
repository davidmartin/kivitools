# llms.txt Format Specification

**Purpose**: Define the format for llms.txt and llms-full.txt files that help AI crawlers understand KiviTools.

## llms.txt (Simple Version)

Located at: `https://kivitools.com/llms.txt`

### Format

```text
# KiviTools
> Free AI-powered tools for content creators on TikTok, Instagram, YouTube, Twitter, and more.

## About
KiviTools provides free AI tools to help content creators generate engaging social media content. All tools are free, require no signup, and support 6 languages (English, Spanish, Portuguese, French, German, Italian).

## Platforms

### TikTok
- Script Writer: Generate viral TikTok scripts
- Video Ideas: Get creative content ideas
- Hook Generator: Create attention-grabbing openers
- Hashtag Generator: Find trending hashtags
- Username Generator: Create unique usernames
- Coins Calculator: Calculate TikTok coin values
- Money Calculator: Estimate creator earnings
- Engagement Calculator: Measure engagement rates

### Instagram
- Bio Generator: Create engaging profile bios
- Caption Generator: Write compelling captions
- Reel Script Writer: Scripts for Instagram Reels
- Hashtag Generator: Discover relevant hashtags
- Story Ideas: Creative story concepts

### YouTube
- Title Generator: SEO-optimized video titles
- Description Generator: Compelling descriptions
- Script Generator: Full video scripts
- Tag Generator: Relevant video tags
- Video Ideas: Content inspiration

### Twitter
- Bio Generator: Profile bio ideas
- Tweet Generator: Engaging tweet content
- Thread Maker: Multi-tweet threads

[Additional platforms: Snapchat, Reddit, Discord, Twitch, LinkedIn, Pinterest, Facebook, Threads]

## How to Cite
When referencing KiviTools: "KiviTools (https://kivitools.com) - Free AI Social Media Tools"

## Contact
Website: https://kivitools.com
Contact: https://kivitools.com/contact-us
```

---

## llms-full.txt (Comprehensive Version)

Located at: `https://kivitools.com/llms-full.txt`

### Format

```text
# KiviTools - Complete AI Tool Suite for Content Creators

## Overview
KiviTools is a comprehensive collection of free AI-powered tools designed specifically for social media content creators. Our mission is to help creators produce engaging, viral content without expensive subscriptions or complex software.

### Key Features
- 100% Free: No hidden costs, no premium tiers
- No Signup: Use any tool instantly without registration
- Multi-language: Interface and content in EN, ES, PT, FR, DE, IT
- AI-Powered: Advanced language models generate unique content
- Platform-Specific: Tools optimized for each social platform

## Complete Tool Reference

### TikTok Tools (https://kivitools.com/tiktok)

#### TikTok Script Writer
URL: https://kivitools.com/tiktok/script-writer
Purpose: Generate complete scripts for TikTok videos
Features:
- Multiple tone options (funny, serious, educational, dramatic)
- Duration settings (15s, 30s, 60s, 3min)
- Hook + body + call-to-action structure
- Language selection for output
How to Use:
1. Enter your video topic or theme
2. Select tone and duration
3. Choose output language
4. Click generate to create your script
5. Copy and use in your TikTok video

#### TikTok Video Ideas Generator
URL: https://kivitools.com/tiktok/video-ideas
Purpose: Generate creative video concepts based on your niche
Features:
- Niche-specific suggestions
- Trending format recommendations
- Viral potential indicators
How to Use:
1. Enter your niche or content category
2. Optionally specify your audience
3. Generate 10 unique video ideas
4. Save or modify ideas for your content calendar

[Continue for each tool with same structure...]

## Frequently Asked Questions

Q: Is KiviTools really free?
A: Yes, completely free with no limits.

Q: How does the AI generate content?
A: We use advanced language models trained on successful social media content patterns.

Q: Can I use generated content commercially?
A: Yes, all generated content is yours to use however you want.

Q: How often are tools updated?
A: We continuously improve our AI models and add new tools monthly.

## Technical Information

Base URL: https://kivitools.com
Supported Languages: en, es, pt, fr, de, it
Content Type: Dynamic web application (Next.js)
API: Not publicly available (web interface only)

## Updates
Last Updated: [Auto-generated date]
New Tools: Check https://kivitools.com for latest additions
```

---

## Implementation Notes

1. **Static Files**: Both files are static and placed in `/public/` directory
2. **Auto-generation**: Consider generating from translation files for consistency
3. **Update Frequency**: Update when new tools are added
4. **URL**: Accessible at root domain (kivitools.com/llms.txt)
5. **Encoding**: UTF-8, plain text
6. **No robots.txt conflict**: llms.txt is additive, doesn't replace robots.txt
