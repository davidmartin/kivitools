# Research: OnlyFans Creator AI Tools

**Feature**: 013-onlyfans-creator-tools  
**Date**: November 30, 2025  
**Status**: Complete

## Research Questions Resolved

### 1. OnlyFans Platform Character Limits

**Decision**: Bio limit is approximately 1000 characters, but optimal bios are 150-300 characters for readability.

**Rationale**: While OnlyFans technically allows longer bios, research shows that successful creator bios are concise and scannable. We'll target 150 characters per FR-003 to ensure bios are punchy and effective.

**Alternatives Considered**:

- 1000 char limit (full platform allowance) - Rejected: Too long, less engaging
- 500 char limit (medium) - Rejected: Still verbose for profile scanning

### 2. Content Moderation Approach

**Decision**: Use explicit system prompt instructions in DeepSeek calls to prevent adult content generation.

**Rationale**: DeepSeek respects system-level instructions. By including clear guardrails in the prompt ("Generate professional marketing content only. Do not include explicit, sexual, or adult content."), we ensure compliance without additional filtering layers.

**Implementation Pattern**:

```
System prompt prefix:
"You are a professional marketing assistant for content creators.
Generate engaging, professional content that focuses on personality,
value proposition, and subscriber benefits.
IMPORTANT: Do NOT generate explicit, sexual, or adult content.
Keep all language professional and platform-appropriate."
```

**Alternatives Considered**:

- Post-generation content filtering - Rejected: Adds latency, complexity
- External moderation API - Rejected: Additional cost, latency
- Word blacklist filtering - Rejected: Easy to circumvent, false positives

### 3. Existing OnlyFans Platform Setup

**Decision**: OnlyFans platform folder already exists at `app/(tools)/onlyfans/` with basic structure.

**Rationale**: The platform was partially set up previously. We need to:

- Verify and update platform hub page
- Add 4 new tools to the existing structure
- Ensure all 10 integration points are complete

**Files to verify**:

- `app/(tools)/onlyfans/page.tsx` - May exist, needs verification
- Navigation entry - Check if already present
- Platform logo - Check if already exists

### 4. Spanish URL Aliases Pattern

**Decision**: Follow established naming convention for Spanish URLs.

**Tool URL Mappings**:
| English | Spanish |
|---------|---------|
| `/onlyfans/bio-generator` | `/onlyfans/generador-bio` |
| `/onlyfans/caption-generator` | `/onlyfans/generador-subtitulos` |
| `/onlyfans/ppv-message-generator` | `/onlyfans/generador-mensajes-ppv` |
| `/onlyfans/welcome-message-generator` | `/onlyfans/generador-mensaje-bienvenida` |

**Rationale**: Follows existing patterns in `docs/RUTAS_ALIAS.md` and `next.config.ts`.

### 5. DeepSeek Generation Functions

**Decision**: Create 4 new functions in `lib/deepseek.ts` following existing patterns.

**Function Signatures**:

```typescript
generateOnlyFansBio(params: { niche: string; personality?: string; unique?: string; tone: string; language: string }): Promise<string[]>

generateOnlyFansCaption(params: { description: string; tone: string; length?: string; includeCTA?: boolean; language: string }): Promise<string[]>

generateOnlyFansPPVMessage(params: { content: string; pricePoint?: string; urgency?: string; language: string }): Promise<string[]>

generateOnlyFansWelcomeMessage(params: { personality: string; contentType: string; tier?: string; encourageDMs?: boolean; language: string }): Promise<string[]>
```

**Rationale**: Follows established patterns from other platform tools (TikTok, Instagram, etc.).

### 6. Platform Color Scheme

**Decision**: Use pink color scheme for OnlyFans (same as Instagram).

**Rationale**: OnlyFans brand uses blue, but pink aligns better with creator economy positioning and avoids confusion with Twitter/Bluesky blue. Pink colors:

- `bg-pink-100`, `text-pink-600` (light mode)
- `dark:bg-pink-900/30`, `dark:text-pink-400` (dark mode)

**Alternatives Considered**:

- Blue (OnlyFans brand) - Rejected: Conflicts with Twitter/Bluesky
- Purple - Rejected: Used for TikTok/Suno/Twitch
- Teal/Cyan - Considered but pink fits creator niche better

## Dependencies Identified

1. **DeepSeek API**: Already integrated, no changes needed
2. **Appwrite**: Already integrated for logging
3. **Turnstile**: Already integrated for bot verification
4. **HeroUI v3**: Already in use project-wide

## Risk Assessment

| Risk                             | Likelihood | Impact | Mitigation                                       |
| -------------------------------- | ---------- | ------ | ------------------------------------------------ |
| Content moderation bypass        | Low        | High   | Multiple prompt guardrails, clear instructions   |
| Character limit exceeded         | Low        | Low    | Client-side validation + AI prompt constraints   |
| SEO competition (adult keywords) | Medium     | Medium | Focus on professional/marketing angle            |
| Platform ToS concerns            | Low        | High   | Clear professional positioning, no adult content |

## Conclusion

All research questions resolved. Feature is ready for Phase 1 design (data-model.md, contracts/, quickstart.md).

**Key Implementation Notes**:

1. Content moderation is critical - every AI prompt must include guardrails
2. Platform may already be partially set up - verify before creating new files
3. Pink color scheme for visual consistency with creator economy tools
4. Spanish URLs follow established `generador-*` pattern
