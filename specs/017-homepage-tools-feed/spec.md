# Feature Specification: Centralized Tools Page with Platform Filtering

**Feature Branch**: `017-homepage-tools-feed`  
**Created**: 2024-12-05  
**Updated**: 2024-12-08  
**Status**: Draft  
**Input**: User description: "Crear una página /tools con todas las herramientas, filtrable por plataforma. Homepage mantiene las tarjetas de plataformas pero enlaza a /tools?platform=X en lugar de /platform. Se eliminan las páginas de plataforma individuales."

---

## Clarifications

### Session 2024-12-08

- Q: ¿Qué debe mostrar la página principal (homepage) ahora? → A: Mantener las tarjetas de plataformas actuales, solo cambiar el enlace destino a `/tools?platform=X`
- Q: ¿Qué debe pasar con las páginas de plataforma existentes (`/tiktok`, `/instagram`, etc.)? → A: 301 redirect permanente de `/platform` a `/tools?platform=X` para mantener SEO y enlaces existentes
- Q: ¿Qué filtros de ordenamiento (sort) debe tener la página `/tools`? → A: Featured, Newest, Popular, Alphabetical
- Q: ¿Cómo deben mostrarse los filtros de plataforma en la página `/tools` en desktop? → A: Sidebar fijo a la izquierda con scroll independiente
- Q: ¿Debe haber un límite de herramientas mostradas inicialmente, o cargar todas las 100+ herramientas de una vez? → A: Infinite scroll (cargar más al llegar al final)

---

## Overview

Create a new centralized `/tools` page that displays ALL available tools with filtering capabilities by platform, sort order, and search. The homepage will retain its current visual design (platform cards grid) but clicking a platform card will navigate to `/tools?platform=X` instead of the individual platform page (`/platform`). Individual platform hub pages (`/tiktok`, `/instagram`, etc.) will be deprecated.

### Current State vs Proposed State

| Current                                | Proposed                                       |
| -------------------------------------- | ---------------------------------------------- |
| Platform cards link to `/platform`     | Platform cards link to `/tools?platform=X`     |
| Individual platform hub pages exist    | Platform hub pages deprecated/removed          |
| Tools scattered across platform pages  | All tools centralized at `/tools`              |
| No global tools filtering page         | `/tools` page with filter/sort/search          |
| Users navigate: Home → Platform → Tool | Users navigate: Home → Tools (filtered) → Tool |

---

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Browse All Tools (Priority: P1)

A user wants to see all available tools across all platforms. They navigate to `/tools` and see a comprehensive list of all tools with filtering and search capabilities.

**Why this priority**: Centralizing tool discovery in one location reduces cognitive load and navigation complexity.

**Independent Test**: User can navigate to `/tools` and see all tools as a scrollable feed.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/tools`, **When** page loads, **Then** they see the first batch of tools (e.g., 20-30 tools) displayed as cards in a feed layout
2. **Given** a user on `/tools`, **When** they scroll to the bottom of the current batch, **Then** more tools automatically load (infinite scroll pattern)
3. **Given** a user viewing a tool card, **When** they click on it, **Then** they navigate to that tool's page
4. **Given** a user scrolling through multiple batches, **When** all tools are loaded, **Then** a "No more tools" indicator appears

---

### User Story 2 - Filter Tools by Platform from Homepage (Priority: P1)

A user on the homepage clicks a TikTok platform card and lands on `/tools?platform=tiktok` with only TikTok tools visible.

**Why this priority**: This is the primary navigation path from homepage to tools, preserving the familiar platform-centric mental model while centralizing tools.

**Independent Test**: User can click any platform card on homepage and see filtered tools on `/tools` page.

**Acceptance Scenarios**:

1. **Given** a user on the homepage, **When** they click the "TikTok" platform card, **Then** they navigate to `/tools?platform=tiktok`
2. **Given** a user on `/tools?platform=tiktok`, **When** page loads, **Then** only TikTok tools appear in the feed
3. **Given** a user on `/tools?platform=tiktok`, **When** they click "All" or clear filter, **Then** they see all tools and URL becomes `/tools`

---

### User Story 3 - Sort Tools by Criteria (Priority: P2)

A user on `/tools` wants to see the newest tools or the most popular ones first.

**Why this priority**: Sorting provides different views of the same content, enhancing discoverability of new features.

**Independent Test**: User can change sort order on `/tools` and see tools reorder accordingly.

**Acceptance Scenarios**:

1. **Given** a user on `/tools`, **When** they select "Newest" sort, **Then** tools are ordered by date added (newest first)
2. **Given** a user on `/tools`, **When** they select "Popular" sort, **Then** tools are ordered by usage/popularity metrics
3. **Given** a user on `/tools`, **When** they select "Alphabetical" sort, **Then** tools are ordered alphabetically by name (A-Z)
4. **Given** a user on `/tools` with default view, **When** page loads, **Then** "Featured" sort is active (curated selection first)

---

### User Story 4 - Search Tools from Tools Page (Priority: P2)

A user on `/tools` knows what they're looking for and wants to search directly.

**Why this priority**: Complements browsing with direct search for power users.

**Independent Test**: User can type in search bar on `/tools` and see matching tools in the feed.

**Acceptance Scenarios**:

1. **Given** a user on `/tools`, **When** they type "bio" in the search bar, **Then** the feed filters to show only tools with "bio" in name/description
2. **Given** a user searching, **When** results appear, **Then** the search term is highlighted in matching tools
3. **Given** a user with an active search, **When** they clear the search, **Then** all tools reappear

---

### User Story 5 - Platform Filter on Tools Page (Priority: P1)

A user on `/tools` wants to manually filter by platform without going through homepage.

**Why this priority**: Direct access to platform filtering on the tools page itself is essential for usability.

**Independent Test**: User can select platform filter on `/tools` page and see URL/results update.

**Acceptance Scenarios**:

1. **Given** a user on desktop `/tools`, **When** page loads, **Then** they see a fixed sidebar on the left with all platforms listed
2. **Given** a user on `/tools`, **When** they click a platform in the sidebar, **Then** only tools from that platform appear and URL updates to `/tools?platform=X`
3. **Given** a user on `/tools` with filter active, **When** they click "All platforms" in sidebar, **Then** filter clears and all tools appear
4. **Given** the sidebar with 28+ platforms, **When** content exceeds viewport height, **Then** sidebar scrolls independently from the tools feed

---

### Edge Cases

- What happens when a platform has no tools yet? → Show platform card on homepage but clicking shows empty state on `/tools?platform=X` with message
- How does the feed handle 100+ tools performance-wise? → Infinite scroll loads tools in batches (20-30 at a time) to optimize initial load
- What happens on mobile with platform filters? → Filters become horizontal scrolling chips above the tools feed
- What if user navigates with filters then goes back? → URL state (query params) restores filters on page load
- What if search returns no results on `/tools`? → Show friendly empty state with suggestions
- What happens to existing `/platform` URLs? → Implement 301 permanent redirects from `/platform` to `/tools?platform=X` to preserve SEO and external links
- What about deep links to platform pages from external sites? → 301 redirects handle these automatically, preserving traffic and SEO value
- What happens when infinite scroll reaches the end? → Display "No more tools" indicator or "You've reached the end" message
- How does infinite scroll work with filters active? → Batches load filtered results; changing filter resets scroll position to top

---

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST create a new `/tools` page displaying tools as a scrollable card feed with infinite scroll (loading batches of 20-30 tools)
- **FR-002**: System MUST provide filter controls on `/tools` for sorting (Featured, Newest, Popular, Alphabetical)
- **FR-003**: System MUST allow filtering by platform via fixed sidebar (desktop) with independent scroll, or horizontal chips (mobile) on `/tools` page
- **FR-004**: System MUST update homepage platform cards to link to `/tools?platform=X` instead of `/platform`
- **FR-005**: Each tool card on `/tools` MUST display: platform icon, tool name, short description, and platform badge (entire card is clickable to navigate to tool page)
- **FR-006**: System MUST maintain search functionality on `/tools` page for filtering tools by name/description
- **FR-007**: System MUST update URL query parameters when filters/sorts change for shareability and bookmarkability
- **FR-008**: System MUST work responsively on mobile, tablet, and desktop
- **FR-009**: System MUST preserve dark mode support for all new components
- **FR-010**: System MUST maintain SEO metadata and JSON-LD structured data for `/tools` page
- **FR-011**: System MUST support bilingual display (tool names/descriptions from translations)
- **FR-012**: System MUST implement 301 permanent redirects from all `/platform` URLs to `/tools?platform=X` to preserve SEO and handle legacy links

### Key Entities

- **Tools Page (`/tools`)**: New centralized page showing all tools with filter/sort/search capabilities
- **Tool Card**: Visual representation of a tool with icon, name, description, platform badge, action button
- **Filter State**: Current active filters (platform, sort order, search query) stored in URL query params
- **Platform Filter UI**: Fixed sidebar on desktop (left side, independent scroll) or horizontal chips on mobile for selecting platforms
- **Homepage Platform Cards**: Existing cards that now link to `/tools?platform=X`

---

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can access any tool within 2 clicks from homepage (Homepage → Tools page filtered → Tool)
- **SC-002**: `/tools` page initial load (first batch of 30 tools) time to first meaningful paint remains under 2 seconds
- **SC-003**: All 100+ tools are discoverable from `/tools` page via infinite scroll or search
- **SC-004**: Filter operations on `/tools` complete in under 300ms (perceived instant)
- **SC-005**: Mobile users can filter by platform with 1 tap (platform chips visible on `/tools`)
- **SC-006**: `/tools` page maintains Core Web Vitals scores (LCP, FID, CLS) comparable to current pages
- **SC-007**: Homepage platform cards successfully navigate to `/tools?platform=X` with correct filtering applied
- **SC-008**: Infinite scroll loads next batch within 500ms when user reaches bottom threshold

---

## Assumptions

1. **Tool popularity data**: We'll use a static "featured" list initially. Analytics-based popularity can be added later.
2. **Infinite scroll implementation**: Load tools in batches of 20-30. First batch loads on page mount, subsequent batches trigger when user scrolls near bottom (e.g., 80% scroll threshold).
3. **Sort options**: "Featured" = manually curated order, "Newest" = by date added (newest first), "Popular" = static/analytics-based list, "Alphabetical" = A-Z by tool name.
4. **Platform filters on mobile**: Will use horizontal scrolling platform chips instead of a drawer for simplicity. Desktop uses fixed sidebar with independent scroll.
5. **Homepage unchanged visually**: Homepage keeps current platform cards design, only href changes to `/tools?platform=X`.
6. **Platform hub pages deprecated with redirects**: Individual `/platform` pages will have 301 redirects to `/tools?platform=X` to preserve SEO authority and external links.
7. **Navigation menu**: Top navigation dropdown for platforms will link to `/tools?platform=X` instead of `/platform`.
8. **Filter/search reset scroll**: Applying a filter or search resets infinite scroll to show first batch from top.

---

## Out of Scope

- User favorites/bookmarks (requires authentication persistence)
- Usage analytics integration for "Popular" sorting (static list initially)
- Tool ratings or reviews
- Personalized recommendations based on user history
- Redesigning homepage layout (only updating links from platform cards)
- Creating new platform hub pages (they will be deprecated)
