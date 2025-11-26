# Quickstart: TikTok Video Prompt Generator

**Feature**: 003-auto-video-social  
**Estimated Time**: 2-3 hours

## Prerequisites

- [x] Next.js 16.0.1 with App Router (existing)
- [x] HeroUI v3 Beta (existing)
- [x] DeepSeek API key (existing in .env.local)
- [x] Appwrite auth (existing)
- [x] Translations structure (existing)

## Implementation Order

### Phase 1: API Routes (30 min)

1. **Create prompt generation API** (`app/api/admin/video-generator/prompt/route.ts`)

   - Add `generateVeo2Prompt()` to `lib/deepseek.ts`
   - Create POST endpoint with admin auth check
   - Return structured Veo 2 prompt

2. **Create caption generation API** (`app/api/admin/video-generator/caption/route.ts`)
   - Add `generateTikTokCaption()` to `lib/deepseek.ts`
   - Create POST endpoint with admin auth check
   - Return caption, hashtags, and tool URL

### Phase 2: Translations (20 min)

Add video generator keys to `admin.ts` in all locale folders:

- `lib/locales/en/admin.ts`
- `lib/locales/es/admin.ts`
- `lib/locales/pt/admin.ts`
- `lib/locales/fr/admin.ts`
- `lib/locales/de/admin.ts`
- `lib/locales/it/admin.ts`

Keys needed (~25):

- Title, subtitle
- Step labels (1-4)
- Form labels and placeholders
- Button texts
- Success/error messages

### Phase 3: Admin Page (60 min)

Create `app/admin/video-generator/page.tsx`:

1. **Layout**: Full-page admin layout with step indicator
2. **Tool Selector**: Dropdown with all tools from PLATFORM_TOOLS
3. **Prompt Section**: Display generated prompt with copy button
4. **Video Upload**: File input with preview
5. **Caption Section**: Editable textarea with copy button
6. **Publish Section**: Download video + copy caption buttons

HeroUI components to use:

- `Button` - all actions
- `Card` - section containers
- `Select` / `Popover` - tool dropdown (custom, HeroUI Select may be limited)
- `TextArea` - caption editing
- `Chip` - step indicator
- `Alert` - error messages

### Phase 4: Testing (30 min)

1. Test admin auth (non-admin should see access denied)
2. Test tool selection (all platforms should show)
3. Test prompt generation (< 5s)
4. Test video upload validation
5. Test caption generation (< 5s)
6. Test copy buttons
7. Test video download
8. Test dark mode
9. Test all translations (switch languages)

## File Checklist

```
[ ] lib/deepseek.ts
    - [ ] generateVeo2Prompt() function
    - [ ] generateTikTokCaption() function

[ ] app/api/admin/video-generator/prompt/route.ts
    - [ ] POST handler with auth check

[ ] app/api/admin/video-generator/caption/route.ts
    - [ ] POST handler with auth check

[ ] lib/locales/en/admin.ts
    - [ ] admin.videoGenerator.* keys (~25 keys)

[ ] lib/locales/es/admin.ts
    - [ ] admin.videoGenerator.* keys (~25 keys)

[ ] lib/locales/pt/admin.ts
    - [ ] admin.videoGenerator.* keys (~25 keys)

[ ] lib/locales/fr/admin.ts
    - [ ] admin.videoGenerator.* keys (~25 keys)

[ ] lib/locales/de/admin.ts
    - [ ] admin.videoGenerator.* keys (~25 keys)

[ ] lib/locales/it/admin.ts
    - [ ] admin.videoGenerator.* keys (~25 keys)

[ ] app/admin/video-generator/page.tsx
    - [ ] Admin auth check
    - [ ] Tool selector
    - [ ] Prompt generation & display
    - [ ] Video upload & preview
    - [ ] Caption generation & editing
    - [ ] Copy & download buttons
    - [ ] Dark mode support
```

## Key Patterns

### Admin Auth Check (from existing admin page)

```typescript
const { user, loading: authLoading } = useAuth();

if (!user?.labels?.includes("admin")) {
  return <AccessDenied />;
}
```

### Tool List Generation

```typescript
import { PLATFORM_TOOLS } from "@/app/components/tool-selector";

const allTools = Object.entries(PLATFORM_TOOLS)
  .flatMap(([platform, tools]) =>
    tools.map((tool) => ({
      platform,
      name: tool.name,
      href: tool.href,
      slug: tool.href.split("/").pop()!,
    }))
  )
  .filter((tool) => tool.slug); // Remove empty
```

### Copy to Clipboard

```typescript
const handleCopy = async (text: string, successKey: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Show success toast/alert
  } catch {
    // Show error
  }
};
```

### Video File Validation

```typescript
const validateVideo = (file: File): { valid: boolean; error?: string } => {
  if (!file.type.includes("mp4")) {
    return {
      valid: false,
      error: t("admin.videoGenerator.error.invalidFormat"),
    };
  }
  if (file.size > 100 * 1024 * 1024) {
    return { valid: false, error: t("admin.videoGenerator.error.tooLarge") };
  }
  return { valid: true };
};
```

## Success Criteria

- [ ] Admin can select any tool from dropdown
- [ ] Prompt generates in < 5 seconds
- [ ] Video preview shows after upload
- [ ] Caption generates in < 5 seconds
- [ ] Caption is editable
- [ ] Copy buttons work for prompt and caption
- [ ] Video can be downloaded
- [ ] All text uses translations
- [ ] Dark mode looks correct
- [ ] Non-admins see access denied
