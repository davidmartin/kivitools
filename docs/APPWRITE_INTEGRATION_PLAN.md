# Appwrite Integration Plan

## APIs to Update (30 Functional Tools)

### TikTok (9 tools - script-writer already done ✅)

- [x] script-writer ✅
- [ ] video-ideas
- [ ] hook-generator
- [ ] hashtag-generator
- [ ] username-generator
- [ ] shop-name-generator
- [ ] engagement-calculator
- [ ] money-calculator
- [ ] coins-calculator

### Instagram (3 tools)

- [ ] bio-generator
- [ ] caption-generator
- [ ] reel-script

### Twitter (3 tools)

- [ ] bio-generator
- [ ] tweet-generator
- [ ] thread-maker

### Snapchat (3 tools)

- [ ] caption-generator
- [ ] story-ideas
- [ ] lens-ideas

### YouTube (3 tools)

- [ ] title-generator
- [ ] description-generator
- [ ] script-generator

### Reddit (3 tools)

- [ ] post-generator
- [ ] comment-generator
- [ ] ama-questions

### Discord (3 tools)

- [ ] announcement-generator
- [ ] event-description
- [ ] welcome-message

### Twitch (3 tools)

- [ ] stream-title
- [ ] panel-description
- [ ] chat-command

## Integration Pattern

Each API route needs:

1. **Import Statement**:

```typescript
import { saveGenerationLog, getUserIpFromRequest } from "@/lib/appwrite";
```

2. **After Successful Generation** (before returning response):

```typescript
await saveGenerationLog({
  platform: "tiktok", // or instagram, twitter, etc.
  tool: "script-writer", // tool name
  requestData: body,
  responseData: { [key]: generatedContent },
  userIp: getUserIpFromRequest(request),
  language: language || "en",
});
```

## APIs to DELETE (8 fake TikTok tools)

These API routes should be removed as the tools no longer exist:

- [ ] tiktok/transcript-generator/route.ts
- [ ] tiktok/video-downloader/route.ts
- [ ] tiktok/mp3-downloader/route.ts
- [ ] tiktok/thumbnail-downloader/route.ts
- [ ] tiktok/profile-viewer/route.ts
- [ ] tiktok/profile-analytics/route.ts
- [ ] tiktok/username-checker/route.ts
- [ ] tiktok/voice-generator/route.ts
