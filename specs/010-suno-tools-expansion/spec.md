# Feature Specification: Suno Tools Expansion

**Feature Branch**: `010-suno-tools-expansion`  
**Created**: November 30, 2025  
**Status**: Draft  
**Input**: User description: "Quiero crear mas tools para la plataforma de suno"

## Overview

Expand the Suno AI music platform tools from the current 3 tools to 8 tools, providing creators with comprehensive AI-powered assistance for their music creation workflow on Suno.

### Current Suno Tools

1. **Lyric Generator** - Creates song lyrics based on theme, genre, and mood
2. **Music Prompt Generator** - Generates prompts to use in Suno AI
3. **Song Description Generator** - Creates descriptions for sharing songs

### Proposed New Tools

1. **Song Title Generator** - Generate catchy, memorable song titles
2. **Album Name Generator** - Create cohesive album/EP names
3. **Song Tag Generator** - Generate optimal tags for discoverability
4. **Cover Art Prompt Generator** - Create prompts for AI art generators (for album covers)
5. **Remix Idea Generator** - Suggest creative remix concepts and variations

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Song Title Generator (Priority: P1)

A Suno creator has composed a great track but struggles to find the perfect title. They want catchy, memorable titles that match their song's vibe and genre.

**Why this priority**: Song titles are the first thing listeners see - a compelling title can dramatically increase plays and shares. This is a quick-win tool that fills an obvious gap.

**Independent Test**: User enters a song theme/description and genre, receives 10 creative title options they can copy and use immediately.

**Acceptance Scenarios**:

1. **Given** a user on the Song Title Generator page, **When** they enter "a song about late night drives through the city" and select "Synthwave" genre, **Then** they receive 10 unique, creative song title suggestions matching that vibe
2. **Given** a user has generated titles, **When** they click "Copy" on any title, **Then** the title is copied to their clipboard with confirmation
3. **Given** a user wants different options, **When** they click "Generate Again", **Then** 10 new unique titles are generated
4. **Given** a user selects Spanish as output language, **When** they generate titles, **Then** titles are provided in Spanish

---

### User Story 2 - Song Tag Generator (Priority: P1)

A Suno creator wants their music to be discovered by the right audience. They need relevant, strategic tags that will improve their song's visibility in Suno's discovery features.

**Why this priority**: Tags directly impact discoverability on Suno. Many creators don't know which tags work best - this tool provides immediate value for getting more listeners.

**Independent Test**: User provides song details and receives optimized tags that they can directly paste into Suno.

**Acceptance Scenarios**:

1. **Given** a user on the Song Tag Generator page, **When** they enter song theme "summer beach party vibes" and genre "House", **Then** they receive 15-20 relevant tags optimized for Suno
2. **Given** tags are generated, **When** user clicks "Copy All", **Then** all tags are copied as comma-separated values ready to paste
3. **Given** different moods/vibes are selected, **When** generating tags, **Then** tags reflect the specific mood accurately

---

### User Story 3 - Album Name Generator (Priority: P2)

A Suno creator is releasing a collection of tracks and needs a cohesive album or EP name that ties their songs together and sounds professional.

**Why this priority**: Important for creators releasing multiple tracks, but less frequent use case than single-song tools.

**Independent Test**: User describes their album concept and receives creative album name suggestions.

**Acceptance Scenarios**:

1. **Given** a user on the Album Name Generator page, **When** they describe their album as "5 songs about heartbreak and moving on, indie pop style", **Then** they receive 10 album name suggestions that capture that theme
2. **Given** a user selects "EP" as the release type, **When** they generate names, **Then** suggestions are appropriate for shorter releases
3. **Given** generated names exist, **When** user clicks copy on any name, **Then** it's copied to clipboard

---

### User Story 4 - Cover Art Prompt Generator (Priority: P2)

A Suno creator needs album/single cover art but isn't sure how to describe what they want to AI image generators like Midjourney, DALL-E, or Stable Diffusion.

**Why this priority**: Visual presentation is crucial for music sharing. This bridges the gap between music and visual content creation.

**Independent Test**: User describes their song/album and receives detailed prompts they can paste into image generators.

**Acceptance Scenarios**:

1. **Given** a user on the Cover Art Prompt Generator page, **When** they enter song title "Neon Dreams", genre "Synthwave", and mood "Nostalgic", **Then** they receive 3-5 detailed art prompts suitable for AI image generators
2. **Given** prompts are generated, **When** user selects target platform "Midjourney", **Then** prompts include Midjourney-specific formatting and parameters
3. **Given** a user copies a prompt, **When** they paste it into an AI image generator, **Then** the prompt produces relevant, high-quality results

---

### User Story 5 - Remix Idea Generator (Priority: P3)

A Suno creator has a popular track and wants to create remixes or variations but lacks creative direction for how to reimagine the song.

**Why this priority**: Valuable for extending content lifecycle, but more advanced use case for experienced creators.

**Independent Test**: User inputs original song details and receives creative remix concepts with specific suggestions.

**Acceptance Scenarios**:

1. **Given** a user on the Remix Idea Generator page, **When** they describe their original song as "upbeat pop song about summer love", **Then** they receive 5-7 unique remix concepts with genre shifts and production suggestions
2. **Given** remix ideas are generated, **When** each idea is displayed, **Then** it includes: target genre, tempo change suggestion, key elements to keep, and new elements to add
3. **Given** a user wants a specific type of remix, **When** they select "Genre Flip" style, **Then** suggestions focus on dramatic genre changes

---

### Edge Cases

- What happens when user enters very short or vague descriptions? System generates based on available info with a note suggesting more detail for better results.
- How does system handle profanity or inappropriate content requests? System generates family-friendly alternatives or returns an error for explicit content requests.
- What if Suno-specific terminology changes? Tag suggestions use current best practices but remain adaptable.
- How to handle multiple languages in one request? System defaults to the selected output language for consistency.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Each tool MUST generate content in both English and Spanish based on user selection
- **FR-002**: All tools MUST include Turnstile bot verification before generation
- **FR-003**: All generated content MUST be logged to Appwrite for analytics
- **FR-004**: Each result item MUST have an individual copy button
- **FR-005**: Results with multiple items MUST have a "Copy All" button
- **FR-006**: Each tool MUST include a "Generate Again" / "Use Again" button that resets the form and Turnstile
- **FR-007**: Song Title Generator MUST generate 10 unique titles per request
- **FR-008**: Song Tag Generator MUST generate 15-20 relevant tags per request
- **FR-009**: Album Name Generator MUST generate 10 album name suggestions
- **FR-010**: Cover Art Prompt Generator MUST generate 3-5 detailed prompts with AI generator-specific formatting options
- **FR-011**: Remix Idea Generator MUST generate 5-7 detailed remix concepts
- **FR-012**: All tools MUST follow the standard 8-section page structure (header, form, results, features, hero, how-it-works, FAQ, related tools)
- **FR-013**: All tools MUST have Spanish URL aliases configured in next.config.ts
- **FR-014**: All tools MUST have complete translations in both ES and EN

### Key Entities

- **Song/Track**: Theme, genre, mood, language - the source material being described
- **Generated Content**: Titles, tags, names, prompts, ideas - the AI-generated output
- **User Session**: Turnstile token, generation requests, copy actions - interaction tracking

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can complete any tool's generation flow in under 30 seconds (excluding AI response time)
- **SC-002**: Each tool generates relevant, usable content that requires no editing for basic use
- **SC-003**: 90% of generated song titles are unique and not generic
- **SC-004**: Generated tags include a mix of broad discovery tags and specific niche tags
- **SC-005**: Cover art prompts, when used in image generators, produce relevant visuals 80% of the time
- **SC-006**: All 5 new tools are accessible from the Suno platform hub page
- **SC-007**: Both English and Spanish URLs work for all tools (e.g., /suno/song-title-generator and /suno/generador-titulos-canciones)
- **SC-008**: All tools pass accessibility requirements (keyboard navigation, screen reader compatible)

## Assumptions

- Users are familiar with Suno AI and its basic workflow
- The DeepSeek API can generate music-specific creative content effectively
- 10 titles/names and 15-20 tags are sufficient quantities per generation
- Cover art prompts will be used with external AI image generators (not integrated)
- Remix ideas are conceptual suggestions, not actual audio modifications
