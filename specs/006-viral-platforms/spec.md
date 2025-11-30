# Feature Specification: New Viral Platforms

**Feature Branch**: `006-viral-platforms`  
**Created**: November 28, 2025  
**Status**: Draft  
**Input**: User description: "nuevas plataformas virales"

## Overview

Add support for new viral/trending platforms that are currently missing from KiviTools. This feature will expand the platform coverage to include emerging and popular digital platforms that content creators, marketers, and users are actively using.

### Proposed New Platforms

Based on current trends and gaps in the existing 18 platforms, the following viral platforms are recommended:

1. **Bluesky** - Decentralized Twitter alternative gaining massive adoption
2. **Lemon8** - ByteDance's lifestyle content platform (TikTok's sister app)
3. **Kick** - Streaming platform rivaling Twitch with creator-friendly policies
4. **Telegram** - Messaging platform with channels and groups for content creators
5. **BeReal** - Authentic photo-sharing app popular with Gen Z

<<<<<<< HEAD
<<<<<<< HEAD
## User Scenarios & Testing _(mandatory)_
=======
## User Scenarios & Testing *(mandatory)*
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======
## User Scenarios & Testing _(mandatory)_
>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)

### User Story 1 - Bluesky Content Creator (Priority: P1)

A content creator wants to establish their presence on Bluesky as the platform grows. They need tools to generate engaging posts, optimize their profile, and understand the platform's unique culture (no algorithmic feed, chronological timeline, decentralized identity).

**Why this priority**: Bluesky is the fastest-growing Twitter alternative (10M+ users), with many creators migrating. Highest immediate demand.

**Independent Test**: Can be fully tested by generating a Bluesky post about any topic and delivering value as a standalone post generation tool.

**Acceptance Scenarios**:

1. **Given** a user on the Bluesky tools page, **When** they enter a topic and tone, **Then** they receive 5 optimized posts under 300 characters each
2. **Given** a user wanting a bio, **When** they provide their niche and style, **Then** they receive a bio under 256 characters optimized for Bluesky's community
3. **Given** a user seeking thread ideas, **When** they enter a topic, **Then** they receive a structured thread (post + replies) suitable for Bluesky's format

---

### User Story 2 - Lemon8 Lifestyle Creator (Priority: P2)

A lifestyle/aesthetic content creator wants to grow on Lemon8, a platform combining Instagram's visual focus with Pinterest's discovery features. They need help with captions, hashtag research, and content ideas that match the platform's aesthetic-focused audience.

**Why this priority**: Lemon8 is ByteDance's fastest-growing app, especially popular for lifestyle, beauty, and travel content. Second priority due to niche audience but high growth potential.

**Independent Test**: Can be tested by generating a Lemon8 caption with aesthetic formatting and hashtags that follow platform conventions.

**Acceptance Scenarios**:

1. **Given** a Lemon8 user, **When** they provide a photo topic and aesthetic style, **Then** they receive a formatted caption with bullet points, emojis, and relevant hashtags
2. **Given** a creator wanting post ideas, **When** they enter their niche (beauty, travel, food, fashion), **Then** they receive 5-10 content ideas with title suggestions
3. **Given** a new user, **When** they want to set up their profile, **Then** they receive a bio optimized for Lemon8's discovery algorithm

---

### User Story 3 - Kick Streamer (Priority: P3)

A streamer wants to expand to Kick (the Twitch competitor) and needs tools to create stream titles, chat commands, panel descriptions, and announcements. The platform has different culture and policies than Twitch.

**Why this priority**: Kick is growing rapidly as streamers seek better revenue splits (95/5 vs Twitch's 50/50). Third priority due to overlap with existing Twitch tools but different platform culture.

**Independent Test**: Can be tested by generating Kick-optimized stream titles that follow platform conventions.

**Acceptance Scenarios**:

1. **Given** a Kick streamer, **When** they enter their game/activity, **Then** they receive 5-8 catchy stream titles optimized for Kick's audience
2. **Given** a streamer setting up their channel, **When** they provide info about their content, **Then** they receive panel descriptions, bio, and chat rules
3. **Given** a streamer planning content, **When** they describe their stream idea, **Then** they receive a stream plan with segments and engagement tactics

---

### User Story 4 - Telegram Channel Manager (Priority: P4)

A content creator or community manager wants to grow their Telegram channel or group. They need tools for announcements, welcome messages, channel descriptions, and post formatting that works with Telegram's markdown support.

**Why this priority**: Telegram has 900M+ users and is essential for crypto, tech, and news communities. Fourth priority due to B2B focus but large potential user base.

**Independent Test**: Can be tested by generating a Telegram channel announcement with proper formatting.

**Acceptance Scenarios**:

1. **Given** a channel manager, **When** they want to post an announcement, **Then** they receive formatted content with bold, italic, and link support
2. **Given** a new channel owner, **When** they describe their channel's purpose, **Then** they receive a channel description and welcome message
3. **Given** a group admin, **When** they need rules, **Then** they receive community guidelines formatted for Telegram

---

### User Story 5 - BeReal User (Priority: P5)

A casual user wants to make their BeReal posts more interesting with better captions, bio ideas, and RealMoji suggestions. The focus is on authenticity and humor.

**Why this priority**: BeReal is popular with Gen Z but has limited monetization for creators. Fifth priority due to casual use case but valuable for brand consistency.

**Independent Test**: Can be tested by generating a witty, authentic BeReal caption.

**Acceptance Scenarios**:

1. **Given** a BeReal user, **When** they describe their photo moment, **Then** they receive 3-5 witty, authentic captions under 500 characters
2. **Given** a user setting up their profile, **When** they describe themselves, **Then** they receive a casual, authentic bio
3. **Given** a user wanting RealMoji ideas, **When** they describe a friend's BeReal, **Then** they receive creative reaction suggestions

---

### Edge Cases

- What happens when a platform's character limits change? The system should validate output length against current known limits.
- How does the system handle platform-specific formatting (Telegram markdown, Lemon8 bullet points)? Include formatting guides in prompts.
- What happens if a user enters content violating platform ToS (e.g., crypto promotions on Lemon8)? Display appropriate disclaimers.

<<<<<<< HEAD
<<<<<<< HEAD
## Requirements _(mandatory)_
=======
## Requirements *(mandatory)*
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======
## Requirements _(mandatory)_
>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)

### Functional Requirements

- **FR-001**: System MUST support at minimum 3 new platforms (Bluesky, Lemon8, Kick) in this release
- **FR-002**: Each platform MUST have at minimum 3 tools following the standard tool structure
- **FR-003**: System MUST generate content respecting each platform's character limits (Bluesky: 300, Lemon8: 2200, Kick: varies, Telegram: 4096, BeReal: 500)
- **FR-004**: System MUST include platform-specific formatting (Telegram markdown, Lemon8 bullet points/emojis)
<<<<<<< HEAD
<<<<<<< HEAD
- **FR-005**: System MUST support all 6 UI languages (en, es, pt, fr, de, it) for translations and output
=======
- **FR-005**: System MUST support both English and Spanish output languages for all tools
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======
- **FR-005**: System MUST support all 6 UI languages (en, es, pt, fr, de, it) for translations and output
>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)
- **FR-006**: Each tool MUST include Turnstile bot verification before generation
- **FR-007**: All generations MUST be logged to Appwrite for analytics
- **FR-008**: Each platform MUST have a hub page with all available tools
- **FR-009**: Navigation MUST be updated to include new platforms with dropdown menus
- **FR-010**: Each tool page MUST include all 8 standard sections (header, form, results, features, hero, how-it-works, FAQ, related tools)
- **FR-011**: Spanish URL aliases MUST be created for all new tools
- **FR-012**: Platform logos MUST be added to `/public/platforms/` and registered in `platform-logo.tsx`
- **FR-013**: SEO metadata MUST be generated for all new pages including JSON-LD schemas

### Tool Specifications by Platform

**Bluesky (3 tools minimum)**:
<<<<<<< HEAD
<<<<<<< HEAD

- Post Generator - Generate posts under 300 chars
- Bio Generator - Profile bio under 256 chars
- Thread Composer - Multi-post threads with replies

**Lemon8 (3 tools minimum)**:

=======
=======

>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)
- Post Generator - Generate posts under 300 chars
- Bio Generator - Profile bio under 256 chars
- Thread Composer - Multi-post threads with replies

**Lemon8 (3 tools minimum)**:
<<<<<<< HEAD
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======

>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)
- Caption Generator - Aesthetic captions with formatting
- Content Ideas Generator - Post ideas by niche
- Profile Bio Generator - Discovery-optimized bios

**Kick (3 tools minimum)**:
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======

>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)
- Stream Title Generator - Catchy titles for streams
- Bio Generator - Channel bio and about section
- Chat Rules Generator - Community guidelines

**Telegram (3 tools - if included)**:
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======

>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)
- Announcement Generator - Formatted channel posts
- Channel Description Generator - Channel/group descriptions
- Welcome Message Generator - New member greetings

**BeReal (3 tools - if included)**:
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======

>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)
- Caption Generator - Authentic, witty captions
- Bio Generator - Casual profile bios
- RealMoji Suggestions - Reaction ideas for friends

### Key Entities

- **Platform**: Represents a supported digital platform (name, logo, color scheme, tools array)
- **Tool**: Represents a content generation tool (platform, slug, inputs, outputs, character limits)
- **Generation**: Records each AI content generation (platform, tool, input, output, language, timestamp)

<<<<<<< HEAD
<<<<<<< HEAD
## Success Criteria _(mandatory)_
=======
## Success Criteria *(mandatory)*
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======
## Success Criteria _(mandatory)_
>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)

### Measurable Outcomes

- **SC-001**: Users can generate content for each new platform in under 5 seconds
- **SC-002**: All generated content respects platform-specific character limits 100% of the time
- **SC-003**: New platforms contribute at least 10% of total tool usage within 30 days of launch
- **SC-004**: Users successfully complete content generation on first attempt 90% of the time
- **SC-005**: Each platform achieves at least 100 unique users within the first week
<<<<<<< HEAD
<<<<<<< HEAD
- **SC-006**: All 6 language versions (en, es, pt, fr, de, it) of all tools function correctly
=======
- **SC-006**: Both English and Spanish versions of all tools function correctly
>>>>>>> 7de53d3 (spec(006): Add viral platforms specification and implementation plan)
=======
- **SC-006**: All 6 language versions (en, es, pt, fr, de, it) of all tools function correctly
>>>>>>> 0bbfe39 (Add SVG logos for new platforms and update specifications)
- **SC-007**: All new pages achieve Lighthouse SEO score of 90+
- **SC-008**: Spanish URL aliases work correctly with no 404 errors

## Platform Integration Checklist (per platform)

For each new platform, the following 10-step integration must be completed:

1. [ ] Platform hub page (`app/(tools)/[platform]/page.tsx`)
2. [ ] Navigation header (`app/components/navigation.tsx`)
3. [ ] Translations (`lib/translations.ts`) - including `"nav.[platform]"` in both ES and EN
4. [ ] SEO metadata (`lib/seo-metadata.ts`)
5. [ ] Tool selector (`app/components/tool-selector.tsx`)
6. [ ] Platform logo (`app/components/platform-logo.tsx` + `/public/platforms/`)
7. [ ] Home page (`app/page.tsx` - platforms array)
8. [ ] Spanish URL rewrites (`next.config.ts`)
9. [ ] Routes documentation (`docs/RUTAS_ALIAS.md`)
10. [ ] PRD update (`PRD.md`)

## Assumptions

- Bluesky's API remains open and character limits stay at 300 characters
- Lemon8 continues to grow and remains relevant in the US/EU markets
- Kick maintains its current growth trajectory as a Twitch alternative
- Platform logos can be sourced or created without trademark issues
- DeepSeek API can handle the additional platform-specific prompts without significant cost increase
