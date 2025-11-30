# Feature Specification: Blog Posts Expansion

**Feature Branch**: `009-blog-posts-expansion`  
**Created**: 2025-11-30  
**Status**: Draft  
**Input**: User description: "Quiero añadir varios post al blog para atraer a gente que los blogs sean extensos pero utiles, que se parezca el texto a un humano, que tengan palabras clave, que enlacen con las tools que tenemos en la web y que se SEO friendly"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Discover Tools Through Blog Content (Priority: P1)

A user searching on Google for content creation tips (e.g., "cómo crecer en TikTok 2025", "trucos para Instagram", "cómo hacer hilos de Twitter virales") finds a KiviTools blog post in the search results. The post provides genuine, actionable value while naturally introducing relevant KiviTools that solve the reader's problem, leading them to try the free tools.

**Why this priority**: This is the primary goal - attracting organic traffic through valuable content that converts readers into tool users. Blog posts act as the top of the funnel for user acquisition.

**Independent Test**: Can be tested by publishing a single blog post, verifying it's indexed by Google, checking it ranks for target keywords, and measuring click-through to linked tools.

**Acceptance Scenarios**:

1. **Given** a user searches "cómo hacer videos virales en TikTok", **When** they find and read our blog post, **Then** they discover relevant TikTok tools linked naturally within the content
2. **Given** a reader is engaged with blog content, **When** they encounter a tool recommendation, **Then** the CTA feels helpful rather than pushy and provides a clear next step
3. **Given** a blog post is published, **When** Google crawls it, **Then** the post contains proper meta tags, structured data, and keyword optimization for SEO

---

### User Story 2 - Browse Related Content (Priority: P2)

A user who lands on one blog post from search finds other relevant articles through internal linking and related posts sections. This increases time on site, builds authority, and exposes users to more tools.

**Why this priority**: Internal linking improves SEO authority and user engagement, creating a content ecosystem that keeps users discovering more value.

**Independent Test**: Can be tested by verifying each blog post links to at least 2-3 other blog posts and that related posts section shows relevant content.

**Acceptance Scenarios**:

1. **Given** a user is reading a TikTok-related blog post, **When** they reach the end, **Then** they see related blog posts about TikTok or similar platforms
2. **Given** a blog post discusses a topic, **When** there's relevant content elsewhere, **Then** internal links connect them naturally within the body text

---

### User Story 3 - Share Valuable Content (Priority: P3)

A user who finds a blog post genuinely helpful wants to share it with their audience or community, amplifying reach organically through social proof.

**Why this priority**: Social sharing extends reach beyond SEO and creates backlinks that improve domain authority.

**Independent Test**: Can be tested by verifying share buttons work, Open Graph tags display correctly on social platforms, and content is formatted for easy sharing.

**Acceptance Scenarios**:

1. **Given** a user wants to share a blog post, **When** they share on Twitter/X, **Then** the post displays with an attractive preview (title, description, image)
2. **Given** the blog content is valuable, **When** readers share it, **Then** the shared content maintains formatting and readability

---

### Edge Cases

- What happens when a linked tool is deprecated or removed? Internal links should be audited periodically
- How does the blog handle users with different language preferences? All blog posts will be created in both Spanish and English (bilingual), totaling 12 posts (6 topics × 2 languages)
- What happens when Google updates algorithm? Content should follow white-hat SEO practices for long-term stability
- What happens when content becomes outdated? Each post will be reviewed and updated every 6 months to maintain freshness and SEO relevance

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Each blog post MUST be at least 1,500 words to provide substantial value and improve SEO ranking
- **FR-002**: Blog posts MUST use natural, conversational language that reads like human writing (not AI-generated "corporate speak")
- **FR-003**: Each blog post MUST include 5-10 target keywords naturally distributed throughout the content
- **FR-004**: Each blog post MUST include at least 3 internal links to relevant KiviTools
- **FR-005**: Each blog post MUST have multiple CTAs: a subtle CTA after the introduction, contextual tool mentions mid-article, and a prominent CTA section at the end
- **FR-006**: Blog posts MUST include proper HTML semantic structure (h1, h2, h3 hierarchy)
- **FR-007**: Each blog post MUST have SEO-optimized meta title (under 60 characters) and meta description (under 160 characters)
- **FR-008**: Blog posts MUST include structured data (JSON-LD) for Article schema
- **FR-009**: Content tone MUST be informal, witty, and relatable (following KiviTools brand voice)
- **FR-010**: Each blog post MUST link to at least 2 other blog posts (internal linking strategy)
- **FR-011**: Blog posts MUST display related posts at the end as a grid of 3 visual cards with title, excerpt preview, and platform badge
- **FR-012**: Blog posts MUST be mobile-friendly with scannable formatting (short paragraphs, bullet points, subheadings)
- **FR-012a**: Each blog post MUST include relevant tags for categorization and discovery
- **FR-013**: Each blog post MUST have localized URL slugs as aliases (e.g., `/blog/twitter-guide-2025` for English, `/blog/guia-twitter-2025` for Spanish) following the same rewrite pattern used for tools in `next.config.ts`
- **FR-014**: Blog posts MUST include proper hreflang tags linking English and Spanish versions for SEO

### Blog Posts to Create

Based on available tools and SEO opportunities, the following posts should be created in **both Spanish and English** (12 total posts):

| Post Topic                                      | Primary Platform | Target Keywords (ES)                                | Target Keywords (EN)                                      | Primary Tool Link                  |
| ----------------------------------------------- | ---------------- | --------------------------------------------------- | --------------------------------------------------------- | ---------------------------------- |
| Complete guide to growing on Twitter/X in 2025  | Twitter          | crecer en twitter, tweets virales, hilos de twitter | twitter growth, viral tweets, twitter threads             | /twitter/thread-maker              |
| How to create an irresistible LinkedIn profile  | LinkedIn         | perfil linkedin, titular linkedin, bio profesional  | linkedin profile, linkedin headline, professional bio     | /linkedin/headline-generator       |
| Complete Twitch streaming setup guide           | Twitch           | streamer twitch, títulos stream, crecer en twitch   | twitch streamer, stream titles, channel growth            | /twitch/stream-title               |
| How to write Reddit posts that reach front page | Reddit           | reddit viral, post reddit, marketing en reddit      | reddit viral, reddit post, reddit marketing               | /reddit/post-generator             |
| Spotify playlist strategy for artists           | Spotify          | playlist spotify, promoción musical, bio de artista | spotify playlist, music promotion, artist bio             | /spotify/playlist-name             |
| Content calendar guide for social media         | General          | calendario contenido, planificación redes sociales  | content calendar, social media planning, posting schedule | /tiktok/content-calendar-generator |

### Key Entities

- **BlogPost**: Represents a blog article with slug, title, excerpt, content (HTML), date, author, readTime, platform, coverImage, tags, relatedTool (with name, link, CTA)
- **Platform**: Category for organizing blog content (tiktok, instagram, twitter, youtube, linkedin, twitch, reddit, spotify, general)
- **RelatedTool**: Reference to a KiviTools tool with call-to-action for conversion

## Clarifications

### Session 2025-11-30

- Q: Should blog posts be Spanish-only, bilingual, or mixed? → A: Bilingual - all posts in both Spanish and English (12 total posts)
- Q: What is the content update/freshness policy? → A: 6-month review cycle for each post
- Q: How many CTAs and where should they be placed? → A: Multiple CTAs - subtle after intro, contextual mid-article, prominent at end
- Q: What URL structure for bilingual posts? → A: Localized slug aliases (same pattern as tools) - e.g., `/blog/twitter-guide-2025` (EN) and `/blog/guia-twitter-2025` (ES) both serve localized content
- Q: How should related posts be displayed? → A: Card grid with 3 visual cards showing title, excerpt preview, and platform badge

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Each blog post achieves at least 500 organic visits within 60 days of publication
- **SC-002**: Blog posts maintain average time on page of at least 3 minutes (indicating engaged reading)
- **SC-003**: At least 10% of blog readers click through to a linked tool (conversion to tool usage)
- **SC-004**: Blog posts rank on first page of Google for at least 2 target keywords within 90 days
- **SC-005**: Total blog section contributes at least 30% of new user acquisition within 6 months
- **SC-006**: Each blog post passes Google's Core Web Vitals for mobile and desktop
- **SC-007**: Blog posts receive at least 5 social shares per month on average
