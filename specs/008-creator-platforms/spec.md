# Feature Specification: Creator & Commerce Platforms

**Feature Branch**: `008-creator-platforms`  
**Created**: November 30, 2025  
**Status**: Draft  
**Input**: User description: "quiero hacer estas plataformas: Medium, Etsy, OnlyFans, Patreon"

## Overview

Add support for 4 creator economy and commerce platforms that serve content creators, writers, artists, and entrepreneurs. These platforms represent the monetization side of the creator economy, complementing the existing social media tools.

### New Platforms

1. **Medium** - Long-form writing and blogging platform for thought leaders and writers
2. **Etsy** - Handmade/vintage ecommerce marketplace for artisans and small businesses
3. **OnlyFans** - Subscription-based content platform for exclusive creator content
4. **Patreon** - Membership platform for creators to build paid communities

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Medium Writer (Priority: P1)

A writer or thought leader wants to establish their presence on Medium. They need help creating compelling article titles, engaging hooks/introductions, and SEO-optimized descriptions that drive reads and follows. Medium's algorithm favors engaging content that keeps readers on the platform.

**Why this priority**: Medium has 100M+ monthly readers and is the go-to platform for writers wanting to build authority. Highest demand from professionals, marketers, and thought leaders.

**Independent Test**: Can be fully tested by generating a Medium article title and introduction for any topic, delivering immediate value as a standalone writing tool.

**Acceptance Scenarios**:

1. **Given** a user on the Medium tools page, **When** they enter an article topic and tone, **Then** they receive 5 compelling headline options optimized for Medium's feed
2. **Given** a writer needing an intro, **When** they provide their article topic and key points, **Then** they receive an engaging hook paragraph (100-200 words) designed to reduce bounce rate
3. **Given** a user wanting profile optimization, **When** they describe their expertise, **Then** they receive a bio (160 chars max) optimized for Medium's author cards

---

### User Story 2 - Etsy Seller (Priority: P2)

An artisan or small business owner wants to improve their Etsy shop performance. They need help writing product titles that rank in search, compelling descriptions that convert browsers to buyers, and shop announcements that build brand loyalty.

**Why this priority**: Etsy has 96M+ active buyers and is the primary marketplace for handmade goods. Second priority due to direct revenue impact for sellers and high search intent from Etsy users.

**Independent Test**: Can be tested by generating an Etsy product title and description for any handmade item, with SEO keywords included.

**Acceptance Scenarios**:

1. **Given** an Etsy seller, **When** they describe their product, **Then** they receive 5 SEO-optimized titles (140 chars max) with relevant keywords
2. **Given** a seller needing a description, **When** they provide product details, **Then** they receive a formatted description with features, materials, and care instructions
3. **Given** a shop owner, **When** they describe their brand, **Then** they receive a shop announcement (5000 chars max) introducing their story

---

### User Story 3 - OnlyFans Creator (Priority: P3)

A content creator on OnlyFans wants to grow their subscriber base and increase engagement. They need help writing enticing post captions, bio descriptions that convert profile visitors to subscribers, and promotional messages for social media that don't violate platform guidelines.

**Why this priority**: OnlyFans has 3M+ creators and is the largest subscription content platform. Third priority due to niche audience but high creator demand for marketing tools.

**Independent Test**: Can be tested by generating an OnlyFans bio and promotional caption that is engaging but platform-safe.

**Acceptance Scenarios**:

1. **Given** an OnlyFans creator, **When** they describe their content niche, **Then** they receive 5 bio options (1000 chars max) that tease content and encourage subscriptions
2. **Given** a creator posting content, **When** they describe their post, **Then** they receive a caption that builds anticipation and encourages engagement
3. **Given** a creator promoting on social media, **When** they need cross-platform promo, **Then** they receive platform-safe promotional text that hints at exclusive content

---

### User Story 4 - Patreon Creator (Priority: P4)

A creator wants to launch or grow their Patreon membership. They need help crafting tier descriptions that clearly communicate value, about pages that tell their story compellingly, and post announcements that keep patrons engaged.

**Why this priority**: Patreon has 250K+ active creators and is essential for sustainable creator income. Fourth priority due to smaller user base but critical for serious creators building communities.

**Independent Test**: Can be tested by generating Patreon tier descriptions for different membership levels.

**Acceptance Scenarios**:

1. **Given** a Patreon creator, **When** they describe their content and benefits, **Then** they receive tier descriptions for 3 membership levels with clear value propositions
2. **Given** a creator setting up their page, **When** they describe their work, **Then** they receive an about section (unlimited) that tells their story and explains their mission
3. **Given** a creator posting updates, **When** they describe their announcement, **Then** they receive a formatted patron post with engaging copy

---

### Edge Cases

- What happens when generated content sounds too promotional or spammy? The AI should maintain authenticity and avoid clickbait patterns.
- How does the system handle platform-specific terminology (e.g., "patrons" for Patreon, "subscribers" for OnlyFans)? Prompts should use correct platform vocabulary.
- What happens if OnlyFans promotional content is too explicit for cross-posting? Content should be platform-safe and focus on SFW marketing angles.
- How does the system handle different Etsy categories (jewelry, clothing, digital downloads)? Templates should adapt to product type.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST support all 4 new platforms (Medium, Etsy, OnlyFans, Patreon) with complete tool suites
- **FR-002**: Each platform MUST have exactly 3 tools following the standard tool structure
- **FR-003**: System MUST generate content respecting each platform's character limits (Medium bio: 160, Etsy title: 140, OnlyFans bio: 1000, Patreon about: unlimited, recommended 500-1500 words)
- **FR-004**: System MUST include platform-specific formatting (Medium markdown, Etsy SEO keywords, Patreon tier structure)
- **FR-005**: System MUST support all 6 UI languages (en, es, pt, fr, de, it) for translations and output
- **FR-006**: Each tool MUST include Turnstile bot verification before generation
- **FR-007**: All generations MUST be logged to Appwrite for analytics
- **FR-008**: Each platform MUST have a hub page with all available tools
- **FR-009**: Navigation MUST be updated to include new platforms with dropdown menus
- **FR-010**: Each tool page MUST include all 8 standard sections (header, form, results, features, hero, how-it-works, FAQ, related tools)
- **FR-011**: Spanish URL aliases MUST be created for all new tools
- **FR-012**: Platform logos MUST be added to `/public/platforms/` and registered in `platform-logo.tsx`
- **FR-013**: SEO metadata MUST be generated for all new pages including JSON-LD schemas
- **FR-014**: OnlyFans tools MUST generate content that is safe for all audiences (SFW marketing focus)
- **FR-015**: Etsy tools MUST include SEO keyword suggestions in generated content

### Tool Specifications by Platform

**Medium (3 tools)**:

- Article Title Generator - Headlines optimized for Medium's feed (5 options)
- Article Intro Generator - Engaging hook paragraphs (100-200 words)
- Bio Generator - Author profile bio (160 chars max)

**Etsy (3 tools)**:

- Product Title Generator - SEO-optimized titles with keywords (140 chars)
- Product Description Generator - Formatted descriptions with features/materials
- Shop Announcement Generator - Brand story and announcements (5000 chars)

**OnlyFans (3 tools)**:

- Bio Generator - Profile bios that convert visitors (1000 chars)
- Post Caption Generator - Engaging content captions
- Promo Generator - Cross-platform promotional text (SFW)

**Patreon (3 tools)**:

- Tier Description Generator - Membership tier copy (3 tiers)
- About Page Generator - Creator story and mission
- Post Generator - Patron update announcements

### Key Entities

- **Platform**: Represents a supported digital platform (name, logo, color scheme, tools array)
- **Tool**: Represents a content generation tool (platform, slug, inputs, outputs, character limits)
- **Generation**: Records each AI content generation (platform, tool, input, output, language, timestamp)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can generate content for each new platform in under 5 seconds
- **SC-002**: All generated content respects platform-specific character limits 100% of the time
- **SC-003**: New platforms contribute at least 5% of total tool usage within 30 days of launch
- **SC-004**: Users successfully complete content generation on first attempt 90% of the time
- **SC-005**: Each platform achieves at least 50 unique users within the first week
- **SC-006**: All 6 language versions (en, es, pt, fr, de, it) of all tools function correctly
- **SC-007**: All new pages achieve Lighthouse SEO score of 90+
- **SC-008**: Spanish URL aliases work correctly with no 404 errors
- **SC-009**: OnlyFans promotional content passes SFW content guidelines 100% of the time
- **SC-010**: Etsy product titles include at least 3 relevant SEO keywords

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

## Home Page Updates

In addition to adding platforms to the platforms array, the following home page data updates are required:

- **FR-016**: Update stats section platform count to reflect actual number of platforms (currently shows "9")
- **FR-017**: Ensure all 4 new platforms appear in the platforms grid with correct colors and icons

## Assumptions

- Medium's character limits and formatting remain consistent with current specifications
- Etsy SEO best practices remain focused on keyword-rich titles and detailed descriptions
- OnlyFans allows promotional content that doesn't explicitly describe adult content
- Patreon tier structure (typically 3-5 tiers) remains the standard for most creators
- Platform logos can be sourced or created without trademark issues
- DeepSeek API can handle the additional platform-specific prompts without significant cost increase
