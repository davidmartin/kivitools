# Research: TikTok Video Prompt Generator & Publisher

**Feature**: 003-auto-video-social  
**Date**: 2025-11-26

## Research Tasks

### 1. Veo 2 Prompt Best Practices

**Decision**: Use structured prompts with scene descriptions, visual style, and duration guidance.

**Rationale**: Veo 2 (AI Studio: aistudio.google.com/prompts/new_video) generates 8-second clips. Effective prompts include:

- Clear visual style (cinematic, animated, minimalist)
- Scene-by-scene description
- Text overlay instructions (though Veo 2 may not render text perfectly)
- Aspect ratio specification (9:16 for TikTok vertical)
- Camera movement suggestions (pan, zoom, static)

**Alternatives Considered**:

- Single-line prompts: Too vague, inconsistent results
- Multiple video concatenation: Adds complexity, out of scope

**Prompt Template Structure**:

```
[STYLE]: [visual style - modern, minimalist, tech, vibrant]
[ASPECT]: 9:16 vertical format for TikTok
[DURATION]: 8 seconds
[SCENE]: [detailed scene description]
[CAMERA]: [camera movement - slow zoom, pan, static]
[TEXT]: [text overlay suggestion - note: may need post-editing]
[MOOD]: [emotional tone - exciting, professional, fun]
```

### 2. Tool Data Access

**Decision**: Use existing PLATFORM_TOOLS from `app/components/tool-selector.tsx` for tool listing.

**Rationale**:

- Already contains all tools organized by platform
- Has `name` (translation key) and `href` (URL)
- Can extract tool info from href structure

**Data Available per Tool**:

- Name (via translation key)
- Platform (from PLATFORM_TOOLS key)
- URL path (href)
- Description (via `{toolKey}.description` translation)

**Implementation**:

```typescript
// Convert PLATFORM_TOOLS to flat list for selector
const allTools = Object.entries(PLATFORM_TOOLS).flatMap(([platform, tools]) =>
  tools.map((tool) => ({
    platform,
    name: tool.name,
    href: tool.href,
    slug: tool.href.split("/").pop(),
  }))
);
```

### 3. Video Upload Approach

**Decision**: Client-side preview only, no server upload for MVP.

**Rationale**:

- Videos are temporary (user downloads and uploads to TikTok manually)
- No need for persistent storage
- Simplifies implementation (no file upload API needed)
- User just needs to see preview before downloading

**Implementation**:

- Use `<input type="file" accept="video/mp4">`
- Create object URL with `URL.createObjectURL(file)`
- Display in `<video>` element for preview
- Provide download via same object URL

### 4. TikTok Caption Best Practices

**Decision**: AI-generated captions with hook, description, CTA, hashtags, and URL.

**Rationale**: TikTok captions that perform well include:

- Hook in first 2-3 words (emoji + attention grabber)
- Brief value proposition (what the tool does)
- Clear CTA (try it free, link in bio)
- 5-10 relevant hashtags (mix of trending and niche)
- Tool URL

**Caption Structure**:

```
[HOOK] 🔥 [attention-grabbing statement]
[DESCRIPTION] [1-2 sentences about the tool]
[CTA] [call to action]
[URL] 🔗 kivitools.com/[platform]/[tool]
[HASHTAGS] #hashtag1 #hashtag2 ...
```

**Hashtag Categories**:

- Platform-specific: #tiktok #instagram #youtube
- Tool-specific: #aitools #contentcreator #socialmedia
- Trending: Research current trends (manual consideration)

### 5. Admin Authentication

**Decision**: Reuse existing admin auth pattern from `/app/admin/page.tsx`.

**Rationale**:

- Already has admin label check (`user.labels.includes("admin")`)
- Uses Appwrite auth via `useAuth()` hook
- Shows access denied for non-admins
- Redirects unauthenticated users to login

**Implementation**:

```typescript
const { user, loading: authLoading } = useAuth();

// Check admin access
if (!user?.labels?.includes("admin")) {
  return <AccessDenied />;
}
```

### 6. Translation Structure

**Decision**: Add new keys to existing `admin.ts` locale files.

**Rationale**:

- Keeps admin-related translations together
- Already have `admin.ts` in each locale folder
- Follows flat key structure with `admin.videoGenerator.*` prefix

**New Keys Required** (added to each locale's `admin.ts`):

```typescript
// Video Generator translations
"admin.videoGenerator.title": "...",
"admin.videoGenerator.subtitle": "...",
"admin.videoGenerator.selectTool": "...",
"admin.videoGenerator.selectToolPlaceholder": "...",
"admin.videoGenerator.generatePrompt": "...",
"admin.videoGenerator.promptGenerated": "...",
"admin.videoGenerator.copyPrompt": "...",
"admin.videoGenerator.uploadVideo": "...",
"admin.videoGenerator.uploadVideoHint": "...",
"admin.videoGenerator.generateCaption": "...",
"admin.videoGenerator.captionGenerated": "...",
"admin.videoGenerator.copyCaption": "...",
"admin.videoGenerator.downloadVideo": "...",
"admin.videoGenerator.readyToPublish": "...",
"admin.videoGenerator.step1": "...",
"admin.videoGenerator.step2": "...",
"admin.videoGenerator.step3": "...",
"admin.videoGenerator.step4": "...",
```

## Resolved Clarifications

All clarifications from spec have been resolved:

| Item                    | Resolution                             |
| ----------------------- | -------------------------------------- |
| Video generation method | Veo 2 (AI Studio) - manual generation  |
| Target platform         | TikTok only                            |
| Publishing method       | Manual (copy caption + download video) |
| Caption editing         | Yes, editable before finalizing        |
| Storage                 | Client-side only, no server storage    |
| Tool data source        | PLATFORM_TOOLS from tool-selector.tsx  |
| Auth                    | Existing admin label check             |
