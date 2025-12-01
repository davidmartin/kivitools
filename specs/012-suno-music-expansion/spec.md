# Feature Specification: Suno AI Music Tools Expansion

**Feature Branch**: `012-suno-music-expansion`  
**Created**: November 30, 2025  
**Status**: Draft  
**Input**: User description: "Expand Suno AI Music platform with additional tools: Song Prompt Generator (optimized prompts for Suno/Udio), Lyrics Rewriter (transform existing lyrics), Music Style Descriptor (describe styles for AI prompts), and Song Title Generator. Target the growing AI music generation market."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Generate Optimized Music Prompts (Priority: P1)

A user wants to create music using Suno or Udio but struggles to write effective prompts. They describe the song they want (mood, genre, instruments, tempo) and the system generates optimized prompts formatted specifically for AI music generators.

**Why this priority**: "Suno prompt generator" and "AI music prompt" are rapidly growing search terms. This is the core differentiator for users of AI music platforms who need better prompts.

**Independent Test**: Can be fully tested by entering desired song characteristics and generating prompts. Users get immediately usable prompts they can paste into Suno/Udio.

**Acceptance Scenarios**:

1. **Given** a user on the Song Prompt Generator page, **When** they select genre (Pop), mood (Uplifting), tempo (Fast), and instruments (Guitar, Drums, Synth), **Then** the system generates 5 optimized prompts formatted for Suno
2. **Given** a user wants a prompt for Udio, **When** they select "Udio" as target platform, **Then** prompts are formatted with Udio-specific syntax and best practices
3. **Given** a user provides vague input like "sad song", **When** they generate, **Then** the system expands this into detailed, specific prompts with suggested instruments and styles
4. **Given** a user wants prompts in Spanish, **When** they select Spanish output, **Then** prompts include Spanish lyrics direction and culturally relevant genre suggestions (reggaeton, bachata, etc.)

---

### User Story 2 - Generate Creative Song Titles (Priority: P1)

A musician or content creator needs catchy song titles for their AI-generated or original music. They provide the song's theme, mood, or a brief description and receive multiple creative title options.

**Why this priority**: Song titles are needed by every music creator. High volume of searches for "song name generator" and "music title ideas". Quick wins for user engagement.

**Independent Test**: Can be tested by entering a theme/mood and generating titles. Users get ready-to-use titles instantly.

**Acceptance Scenarios**:

1. **Given** a user on the Song Title Generator page, **When** they enter theme "heartbreak" and style "indie rock", **Then** the system generates 10 creative, unique song titles
2. **Given** a user wants titles for a specific genre, **When** they select "Hip-Hop/Rap", **Then** titles reflect genre-appropriate naming conventions (wordplay, slang, references)
3. **Given** a user wants bilingual options, **When** they request English and Spanish, **Then** system provides titles in both languages plus Spanglish options

---

### User Story 3 - Rewrite Existing Lyrics (Priority: P2)

A user has lyrics (their own or wants to transform existing ones) and wants to rewrite them in a different style, mood, or theme while maintaining the structure. The system transforms lyrics while preserving rhyme schemes and syllable counts.

**Why this priority**: Addresses users who want to adapt, improve, or transform existing content. Differentiated from pure generation tools.

**Independent Test**: Can be tested by pasting lyrics and selecting transformation style. Users see their lyrics transformed while maintaining singability.

**Acceptance Scenarios**:

1. **Given** a user on the Lyrics Rewriter page, **When** they paste original lyrics and select "Make it sadder", **Then** the system returns rewritten lyrics with the same structure but melancholic tone
2. **Given** a user wants to change genre from country to pop, **When** they select "Pop" transformation, **Then** lyrics are rewritten with pop conventions while maintaining verse/chorus structure
3. **Given** a user pastes lyrics with a specific rhyme scheme (ABAB), **When** transformed, **Then** the output maintains the same rhyme scheme
4. **Given** lyrics contain profanity, **When** user selects "Clean version", **Then** system replaces inappropriate words with suitable alternatives

---

### User Story 4 - Describe Music Styles for AI (Priority: P2)

A user wants to use AI music generators but doesn't know how to describe the style they want. They select reference artists, songs, or genres and the system generates detailed style descriptions optimized for AI music prompts.

**Why this priority**: Helps users who know what they like but can't articulate it for AI systems. Bridges the gap between musical preference and prompt engineering.

**Independent Test**: Can be tested by selecting reference artists/songs and generating style descriptions. Output can be directly used in Suno/Udio.

**Acceptance Scenarios**:

1. **Given** a user on the Music Style Descriptor page, **When** they enter "sounds like The Weeknd meets Daft Punk", **Then** the system generates detailed style descriptions including synth types, vocal processing, drum patterns, and production techniques
2. **Given** a user selects multiple reference genres, **When** they combine "Jazz" and "Electronic", **Then** the system describes the fusion style with specific elements from each
3. **Given** a user wants to describe a specific era's sound, **When** they select "80s synthwave", **Then** the description includes era-appropriate instruments, production techniques, and sonic characteristics

---

### Edge Cases

- What happens when user pastes copyrighted lyrics for rewriting? → System transforms them significantly (not a copy) and adds disclaimer about original ownership
- What happens when user requests prompts for explicit content? → AI guardrails prevent generating prompts for explicit/offensive music
- How does system handle unknown artists in style reference? → System provides best-effort description and suggests similar known artists
- What happens when lyrics rewrite produces poor rhymes? → System includes quality score and offers to regenerate specific sections
- What happens when user requests extremely niche genre? → System provides closest mainstream equivalent with explanation

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST integrate new tools into existing Suno platform section
- **FR-002**: Song Prompt Generator MUST support both Suno and Udio as target platforms with platform-specific formatting
- **FR-003**: Song Prompt Generator MUST accept inputs: genre (required), mood (required), tempo (optional), instruments (optional), vocal style (optional)
- **FR-004**: Song Prompt Generator MUST generate 5 unique prompt variations per request
- **FR-005**: Song Title Generator MUST accept theme/mood input and generate 10 creative titles
- **FR-006**: Song Title Generator MUST support genre-specific naming conventions
- **FR-007**: Lyrics Rewriter MUST preserve original structure (verse count, rhyme scheme, syllable approximation)
- **FR-008**: Lyrics Rewriter MUST support transformation modes: mood change, genre change, clean version, language translation
- **FR-009**: Music Style Descriptor MUST accept artist names, song references, or genre combinations as input
- **FR-010**: Music Style Descriptor MUST output descriptions usable as AI music prompts
- **FR-011**: All tools MUST include Turnstile bot verification before generation
- **FR-012**: All tools MUST support English and Spanish output languages
- **FR-013**: All generated content MUST be copyable with one click
- **FR-014**: All tools MUST log generations to Appwrite for analytics
- **FR-015**: All tools MUST follow the standard 8-section page structure
- **FR-016**: System MUST add Spanish URL aliases for all new tools

### Key Entities

- **Music Prompt**: Generated text optimized for AI music platforms with properties: target platform, genre, mood, instruments, formatting
- **Song Title**: Creative title suggestion with properties: title text, genre appropriateness, language
- **Lyrics Transform**: Original and transformed lyrics with properties: original text, transformation type, output text, structure preservation metrics
- **Style Description**: Detailed musical style description with properties: reference inputs, description text, technical details

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can generate music prompts within 5 seconds of clicking generate
- **SC-002**: Song Prompt Generator produces prompts that work directly in Suno/Udio without modification
- **SC-003**: Lyrics Rewriter maintains at least 80% structural similarity to original (verse count, rhyme scheme)
- **SC-004**: All 4 new tools are accessible via both English and Spanish URLs
- **SC-005**: Tools integrate seamlessly with existing Suno platform page
- **SC-006**: 95% of generation requests complete successfully without errors
- **SC-007**: Generated prompts cover requested genre and mood characteristics
- **SC-008**: Song titles are unique and not direct copies of existing songs
