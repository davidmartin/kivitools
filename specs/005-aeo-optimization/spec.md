# Feature Specification: AEO Optimization

**Feature Branch**: `005-aeo-optimization`  
**Created**: November 27, 2025  
**Status**: Draft  
**Input**: User description: "Quiero optimizar el AEO de todo"

## Overview

Answer Engine Optimization (AEO) focuses on optimizing content so AI assistants (ChatGPT, Claude, Perplexity, Google SGE, Bing Chat) and voice assistants (Siri, Alexa, Google Assistant) can understand, extract, and cite KiviTools as a source when answering user queries about social media tools.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI Assistant Discovery (Priority: P1)

A user asks an AI assistant like ChatGPT, Claude, or Perplexity: "What's the best free TikTok script generator?" The AI responds with a direct answer that mentions or links to KiviTools as a recommended resource.

**Why this priority**: This is the primary goal of AEO - getting AI assistants to recommend KiviTools when users ask about social media content tools. This drives significant traffic and brand awareness.

**Independent Test**: Can be tested by querying AI assistants about "free TikTok tools" or similar queries and tracking citations/mentions of KiviTools over time.

**Acceptance Scenarios**:

1. **Given** KiviTools pages have structured data and clear answer-focused content, **When** an AI assistant processes the page, **Then** it can extract tool name, purpose, and key features accurately
2. **Given** the homepage has clear summaries of all tools, **When** a user asks "what tools does KiviTools offer", **Then** AI assistants can provide a complete, accurate list

---

### User Story 2 - Google Featured Snippets (Priority: P1)

A user searches Google for "how to write a TikTok script" and sees a featured snippet (position zero) from KiviTools that directly answers their question with step-by-step instructions.

**Why this priority**: Featured snippets significantly increase click-through rates and visibility. Google's AI Overview and traditional snippets pull from well-structured content.

**Independent Test**: Can be tested by searching target keywords and checking if KiviTools appears in featured snippets, People Also Ask, or AI Overview sections.

**Acceptance Scenarios**:

1. **Given** a tool page has HowTo structured data, **When** Google indexes the page, **Then** step-by-step instructions may appear as a featured snippet
2. **Given** FAQ sections have proper schema markup, **When** users search related questions, **Then** the FAQ answer may appear in People Also Ask or featured snippets

---

### User Story 3 - Voice Search Answers (Priority: P2)

A user asks their voice assistant: "Hey Google, how do I generate hashtags for TikTok?" The assistant reads aloud a clear, concise answer that optionally mentions KiviTools.

**Why this priority**: Voice search is growing, and optimizing for voice means providing concise, natural language answers that assistants can read aloud.

**Independent Test**: Can be tested by asking voice assistants questions about social media tools and tracking response content.

**Acceptance Scenarios**:

1. **Given** tool pages have Speakable schema markup on key content, **When** voice assistants process the page, **Then** they can identify which content is suitable for text-to-speech
2. **Given** FAQ answers are written in natural, conversational language, **When** voice assistants need to answer questions, **Then** the answers sound natural when spoken

---

### User Story 4 - Perplexity/AI Search Citation (Priority: P2)

A user searches on Perplexity.ai for "best free AI tools for Instagram content" and sees KiviTools cited as a source in the AI-generated response with a link to the site.

**Why this priority**: AI-powered search engines like Perplexity cite their sources. Well-structured, authoritative content increases the chance of being cited.

**Independent Test**: Can be tested by performing searches on Perplexity and similar AI search tools and tracking KiviTools citations.

**Acceptance Scenarios**:

1. **Given** pages have clear meta descriptions and structured data, **When** AI search engines crawl KiviTools, **Then** they can accurately summarize what each tool does
2. **Given** the site has an llms.txt file, **When** AI systems crawl the site, **Then** they understand the site structure and content priorities

---

### User Story 5 - Rich Results in Search (Priority: P3)

A user searches for "TikTok coin calculator" and sees KiviTools in search results with enhanced display including star ratings, price (free), and quick tool description.

**Why this priority**: Rich results increase click-through rates from traditional search by making listings more visually appealing and informative.

**Independent Test**: Can be tested using Google's Rich Results Test tool to validate structured data and by checking search results for enhanced displays.

**Acceptance Scenarios**:

1. **Given** tool pages have SoftwareApplication schema with ratings, **When** Google displays search results, **Then** the listing shows star ratings and "Free" pricing
2. **Given** all pages pass Rich Results validation, **When** Google indexes the site, **Then** no structured data errors appear in Search Console

---

### Edge Cases

- What happens when content is available in multiple languages? Each language version should have independent structured data with proper hreflang.
- How does system handle tools without FAQs? HowTo and SoftwareApplication schemas should still be present; FAQ schema is optional.
- What happens when AI assistants misinterpret content? Monitor AI responses and adjust content clarity if misinterpretations occur.
- How does system handle platform pages vs individual tool pages? Platform hub pages should have CollectionPage schema; tool pages should have SoftwareApplication + HowTo.

## Requirements *(mandatory)*

### Functional Requirements

#### Structured Data / Schema Markup

- **FR-001**: System MUST include SoftwareApplication schema on all tool pages with name, description, applicationCategory, offers (free), and aggregateRating
- **FR-002**: System MUST include HowTo schema on tool pages with step-by-step instructions for using each tool
- **FR-003**: System MUST include FAQPage schema on pages with FAQ sections (minimum 5 Q&A pairs per tool)
- **FR-004**: System MUST include BreadcrumbList schema on all pages for navigation hierarchy
- **FR-005**: System MUST include Organization schema on the homepage and about pages
- **FR-006**: System MUST include WebSite schema with SearchAction for site-wide search functionality
- **FR-007**: System MUST include Speakable schema to identify content suitable for voice assistants

#### AI/LLM Discoverability

- **FR-008**: System MUST provide an llms.txt file at the root domain that describes the site purpose, main tools, and content structure for AI crawlers
- **FR-009**: System MUST provide an llms-full.txt file with comprehensive tool descriptions and instructions
- **FR-010**: System MUST ensure meta descriptions are under 160 characters and start with actionable language
- **FR-011**: System MUST include clear, one-sentence "what is" definitions at the top of each tool page

#### Content Optimization for Answer Engines

- **FR-012**: Each tool page MUST include a "What is [Tool Name]?" section that can be extracted as a direct answer
- **FR-013**: Each tool page MUST include numbered steps explaining how to use the tool
- **FR-014**: FAQ answers MUST be concise (40-60 words ideal) and written in natural, conversational language
- **FR-015**: System MUST include comparison content where appropriate (e.g., "KiviTools vs [alternative]")

#### Voice Search Optimization

- **FR-016**: Key content sections MUST be marked with Speakable schema for voice assistant extraction
- **FR-017**: Primary headings and answers MUST use natural language suitable for text-to-speech

#### Technical Requirements

- **FR-018**: All structured data MUST validate without errors in Google's Rich Results Test
- **FR-019**: All structured data MUST validate without errors in Schema.org validator
- **FR-020**: System MUST include consistent structured data across all supported languages (en, es, pt, fr, de, it)

### Key Entities

- **Tool Page**: Individual tool with name, description, how-to steps, FAQs, and ratings. Has SoftwareApplication, HowTo, and FAQPage schemas.
- **Platform Hub Page**: Collection page for a platform (e.g., /tiktok). Has CollectionPage schema with list of tools.
- **Homepage**: Main entry point with WebSite, Organization, and SoftwareApplication (for the suite) schemas.
- **llms.txt**: Machine-readable file describing site content for AI systems (similar to robots.txt but for LLMs).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of tool pages pass Google Rich Results Test without errors within 2 weeks of deployment
- **SC-002**: 100% of structured data validates against Schema.org validator without warnings
- **SC-003**: Featured snippet appearances for target keywords increase by 25% within 3 months (baseline measured before deployment)
- **SC-004**: AI assistant citations/mentions of KiviTools increase measurably within 6 months (tracked via brand monitoring tools)
- **SC-005**: Organic search click-through rate improves by 15% for pages with rich results (measured via Search Console)
- **SC-006**: Voice search compatibility confirmed by testing with at least 3 voice assistants (Google, Siri, Alexa)
- **SC-007**: llms.txt file is accessible and correctly parsed by AI crawlers (verified via manual testing)
- **SC-008**: All 6 supported languages have complete, equivalent structured data (no missing schemas in any language)

## Assumptions

- The project currently has basic SEO implemented (meta tags, sitemap, robots.txt) which will be extended for AEO.
- FAQPage schema is already implemented on some pages but needs standardization and expansion.
- Tool pages already have "How It Works" sections that can be converted to proper HowTo schema.
- Content tone guidelines (comedic/fun) will be maintained even when optimizing for answer engines.
- No new visual design changes are required; AEO is primarily about structured data and content organization.
