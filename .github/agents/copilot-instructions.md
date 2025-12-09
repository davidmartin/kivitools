# kivitools Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-25

## Active Technologies
- TypeScript 5.x, Next.js 16.0.1 + @heroui/react v3.0.0-beta.1, Tailwind CSS v4 (002-multi-language-expansion)
- localStorage (language preference persistence) (002-multi-language-expansion)
- TypeScript 5.x, Next.js 16.0.1 with App Router + @heroui/react v3.0.0-beta.1, DeepSeek API (existing), Tailwind CSS v4 (003-auto-video-social)
- Session-based (no persistent storage for MVP), Appwrite for history logging (existing) (003-auto-video-social)
- TypeScript 5.x, Next.js 16.0.1, React 19 + @heroui/react v3.0.0-beta.1, Tailwind CSS v4, @iconify/reac (004-cookie-policy)
- localStorage (cookie preferences), Cookie técnica (consent flag) (004-cookie-policy)
- TypeScript 5.x, React 19.2.0, Next.js 16.0.1 + @heroui/react v3.0.0-beta.1, @heroui/styles, Tailwind CSS v4 (005-aeo-optimization)
- N/A (structured data is rendered server-side, no database changes) (005-aeo-optimization)
- TypeScript 5.x, Next.js 16.0.1 + @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API (006-viral-platforms)
- Appwrite (generation logs) (006-viral-platforms)
- TypeScript 5.x, Next.js 16.0.1 with App Router + @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API (deepseek-chat model) (008-creator-platforms)
- Appwrite (generation logs), Cloudflare Turnstile (bot protection) (008-creator-platforms)
- Static data in `lib/blog-data.ts` (existing pattern) (009-blog-posts-expansion)
- Appwrite (logging only - no persistent user data) (010-suno-tools-expansion)
- TypeScript 5.x with Next.js 16.0.1 App Router + @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API (013-onlyfans-creator-tools)
- Appwrite (generation logging, analytics) (013-onlyfans-creator-tools)
- TypeScript 5.x with Next.js 16.0.1 (App Router) + @heroui/react v3.0.0-beta.1, Tailwind CSS v4, OpenAI SDK (for DeepSeek API) (014-deepseek-platform)
- Appwrite (generation logs only - no persistent user data) (014-deepseek-platform)
- N/A (static content only, no database changes) (014-deepseek-platform)
- TypeScript 5.x (Next.js 16.0.1) + Next.js App Router, existing blog infrastructure (015-deepseek-blog-seo)
- Static data in `lib/blog-data.ts` (BlogPost array) (015-deepseek-blog-seo)
- TypeScript 5.x (Next.js 16.0.1 with App Router) + @heroui/react v3.0.0-beta.1, appwrite SDK, DeepSeek/OpenRouter API (016-hero-tool-search)
- Appwrite - existing "tools" collection with fields: name, description, platform, slug, author_name, author_id, status, inputs, prompt_template (016-hero-tool-search)
- TypeScript 5.x / Next.js 16.0.1 + @heroui/react v3.0.0-beta.1, Tailwind CSS v4 (017-homepage-tools-feed)
- N/A (client-side filtering of static tool index) (017-homepage-tools-feed)
- TypeScript 5.x with Next.js 16.0.1 (App Router) + @heroui/react v3.0.0-beta.1, React 19, Tailwind CSS v4, next-intl or custom i18n (017-homepage-tools-feed)
- Client-side filtering/sorting (tools data from `lib/tools-index.ts`), URL state via query params (017-homepage-tools-feed)

- TypeScript 5.x with Next.js 16.0.1 + @heroui/react v3.0.0-beta.1, Tailwind CSS v4, DeepSeek API (001-platform-seo-expansion)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x with Next.js 16.0.1: Follow standard conventions

## Recent Changes
- 017-homepage-tools-feed: Added TypeScript 5.x with Next.js 16.0.1 (App Router) + @heroui/react v3.0.0-beta.1, React 19, Tailwind CSS v4, next-intl or custom i18n
- 017-homepage-tools-feed: Added TypeScript 5.x / Next.js 16.0.1 + @heroui/react v3.0.0-beta.1, Tailwind CSS v4
- 016-hero-tool-search: Added TypeScript 5.x (Next.js 16.0.1 with App Router) + @heroui/react v3.0.0-beta.1, appwrite SDK, DeepSeek/OpenRouter API


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
