# Turnstile Implementation Pattern

## ✅ COMPLETED: TikTok Script Writer (Example Reference)

The TikTok Script Writer has been fully updated with Turnstile bot protection. Use it as a reference for all other tools.

## 📋 Implementation Checklist for Each Tool

### Frontend Changes (Tool Page):

1. **Add import**:

```tsx
import TurnstileWidget from "@/app/components/turnstile-widget";
```

2. **Add state**:

```tsx
const [turnstileToken, setTurnstileToken] = useState<string>("");
```

3. **Update API call** to include token:

```tsx
body: JSON.stringify({
  // ... existing fields
  turnstileToken,
}),
```

4. **Add validation** in submit handler:

```tsx
if (!turnstileToken) {
  setError(t("turnstile.failed"));
  return;
}
```

5. **Add Turnstile widget** before generate button:

```tsx
{
  !result && (
    <TurnstileWidget
      onSuccess={setTurnstileToken}
      onError={() => setError(t("turnstile.error"))}
    />
  );
}
```

6. **Disable button** when token not ready:

```tsx
<Button
  onClick={handleGenerate}
  isDisabled={isLoading || !turnstileToken}
  // ... rest of props
>
```

7. **Reset token** in "Use Again" handler:

```tsx
const handleUseAgain = () => {
  // ... existing resets
  setTurnstileToken("");
};
```

### Backend Changes (API Route):

1. **Add import**:

```tsx
import { verifyTurnstileToken } from "@/lib/turnstile";
```

2. **Extract token** from request:

```tsx
const { /* ...existing fields */, turnstileToken } = body;
```

3. **Verify token** before processing:

```tsx
// Verify Turnstile token first
if (!turnstileToken) {
  return NextResponse.json(
    {
      success: false,
      error: "Bot verification required",
    } as YourResponseType,
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
    } as YourResponseType,
    { status: 403 }
  );
}
```

### Type Changes:

All request types now extend `BaseToolRequest` which includes the `turnstileToken` field:

```tsx
export interface YourToolRequest extends BaseToolRequest {
  // ... your tool specific fields
}
```

## 🔄 Remaining Tools to Update (28)

### TikTok (8 tools)

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

## 🚀 Mass Update Strategy

Due to the large number of files (58 files total: 29 pages + 29 API routes), we can:

1. **Script-based approach**: Create a script to automatically update all files
2. **Manual approach**: Update each tool individually with copy-paste pattern
3. **Hybrid approach**: Update critical/high-traffic tools first, then batch the rest

## 📊 Priority Order

**High Priority (Update First)**:

- TikTok tools (most popular platform)
- Instagram tools
- Twitter tools

**Medium Priority**:

- YouTube tools
- Snapchat tools

**Low Priority**:

- Reddit, Discord, Twitch tools

## ⚠️ Important Notes

- Test each tool after implementation
- Ensure environment variables are set up
- Monitor Turnstile dashboard for verification stats
- Keep the TikTok Script Writer as reference implementation
