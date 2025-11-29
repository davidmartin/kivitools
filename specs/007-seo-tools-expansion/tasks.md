# Tasks: SEO Tools Expansion Strategy

**Input**: Design documents from `/specs/007-seo-tools-expansion/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: Not requested in feature specification - manual QA per tool.

**Organization**: Tasks are grouped by user story phases from spec.md (P1, P2, P3) enabling independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story/phase this task belongs to (US1=Phase1, US2=Phase2, US3=Phase3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and foundational platform setup

- [ ] T001 Verify development environment is ready (npm install, npm run dev works)
- [ ] T002 Review existing tool patterns in app/(tools)/tiktok/engagement-calculator/page.tsx and app/(tools)/tiktok/username-generator/page.tsx

---

## Phase 2: Foundational (New Platform Hubs)

**Purpose**: Create new platform hubs that MUST exist before tools can be added to them

**⚠️ CRITICAL**: New platform tools cannot be created until their hub exists

### Podcast Platform Hub

- [ ] T003 [P] Create Podcast platform hub page in app/(tools)/podcast/page.tsx
- [ ] T004 [P] Create Podcast platform layout in app/(tools)/podcast/layout.tsx
- [ ] T005 [P] Add Podcast translations (nav.podcast, podcast.page.*) to lib/locales/en/ and lib/locales/es/
- [ ] T006 Add Podcast to navigation in app/components/navigation.tsx
- [ ] T007 [P] Add Podcast to seo-metadata.ts (platformColors, platformNames) in lib/seo-metadata.ts
- [ ] T008 [P] Add Podcast to tool-selector.tsx in app/components/tool-selector.tsx
- [ ] T009 [P] Add Podcast to home page platforms array in app/page.tsx
- [ ] T010 [P] Create Podcast logo placeholder in public/platforms/podcast.svg
- [ ] T010b [P] Add Podcast to platform-logo.tsx in app/components/platform-logo.tsx

### Email Platform Hub

- [ ] T011 [P] Create Email platform hub page in app/(tools)/email/page.tsx
- [ ] T012 [P] Create Email platform layout in app/(tools)/email/layout.tsx
- [ ] T013 [P] Add Email translations (nav.email, email.page.*) to lib/locales/en/ and lib/locales/es/
- [ ] T014 Add Email to navigation in app/components/navigation.tsx
- [ ] T015 [P] Add Email to seo-metadata.ts (platformColors, platformNames) in lib/seo-metadata.ts
- [ ] T016 [P] Add Email to tool-selector.tsx in app/components/tool-selector.tsx
- [ ] T017 [P] Add Email to home page platforms array in app/page.tsx
- [ ] T018 [P] Create Email logo placeholder in public/platforms/email.svg
- [ ] T018b [P] Add Email to platform-logo.tsx in app/components/platform-logo.tsx

### Dating Platform Hub

- [ ] T019 [P] Create Dating platform hub page in app/(tools)/dating/page.tsx
- [ ] T020 [P] Create Dating platform layout in app/(tools)/dating/layout.tsx
- [ ] T021 [P] Add Dating translations (nav.dating, dating.page.*) to lib/locales/en/ and lib/locales/es/
- [ ] T022 Add Dating to navigation in app/components/navigation.tsx
- [ ] T023 [P] Add Dating to seo-metadata.ts (platformColors, platformNames) in lib/seo-metadata.ts
- [ ] T024 [P] Add Dating to tool-selector.tsx in app/components/tool-selector.tsx
- [ ] T025 [P] Add Dating to home page platforms array in app/page.tsx
- [ ] T026 [P] Create Dating logo placeholder in public/platforms/dating.svg
- [ ] T026b [P] Add Dating to platform-logo.tsx in app/components/platform-logo.tsx

**Checkpoint**: All 3 new platform hubs (Podcast, Email, Dating) ready - Phase 1 tools can now be implemented

---

## Phase 3: User Story 1 - Quick Wins Tools (Priority: P1) 🎯 MVP

**Goal**: 9 high-impact, low-effort tools for maximum SEO value

**Independent Test**: Each tool loads, generates/calculates, and both EN/ES URLs work

### Tool 1: Instagram Engagement Calculator (Calculator - No AI)

- [ ] T027 [P] [US1] Create Instagram Engagement Calculator page in app/(tools)/instagram/engagement-calculator/page.tsx
- [ ] T028 [P] [US1] Add Instagram Engagement Calculator translations to lib/locales/en/instagram.ts and lib/locales/es/instagram.ts
- [ ] T029 [US1] Add Spanish URL rewrite for Instagram Engagement Calculator in next.config.ts
- [ ] T030 [US1] Document Instagram Engagement Calculator routes in docs/RUTAS_ALIAS.md

### Tool 2: YouTube Channel Name Generator (AI)

- [ ] T031 [P] [US1] Create YouTube Channel Name Generator page in app/(tools)/youtube/channel-name-generator/page.tsx
- [ ] T032 [P] [US1] Create YouTube Channel Name Generator API route in app/api/tools/youtube/channel-name-generator/route.ts
- [ ] T033 [P] [US1] Add generateYouTubeChannelNames function to lib/deepseek.ts
- [ ] T034 [P] [US1] Add YouTube Channel Name Generator translations to lib/locales/en/youtube.ts and lib/locales/es/youtube.ts
- [ ] T035 [US1] Add Spanish URL rewrite for YouTube Channel Name Generator in next.config.ts
- [ ] T036 [US1] Document YouTube Channel Name Generator routes in docs/RUTAS_ALIAS.md

### Tool 3: Podcast Name Generator (AI - New Platform)

- [ ] T037 [P] [US1] Create Podcast Name Generator page in app/(tools)/podcast/name-generator/page.tsx
- [ ] T038 [P] [US1] Create Podcast Name Generator API route in app/api/tools/podcast/name-generator/route.ts
- [ ] T039 [P] [US1] Add generatePodcastNames function to lib/deepseek.ts
- [ ] T040 [P] [US1] Add Podcast Name Generator translations to lib/locales/en/podcast.ts and lib/locales/es/podcast.ts
- [ ] T041 [US1] Add Spanish URL rewrite for Podcast Name Generator in next.config.ts
- [ ] T042 [US1] Document Podcast Name Generator routes in docs/RUTAS_ALIAS.md

### Tool 4: Discord Server Name Generator (AI)

- [ ] T043 [P] [US1] Create Discord Server Name Generator page in app/(tools)/discord/server-name-generator/page.tsx
- [ ] T044 [P] [US1] Create Discord Server Name Generator API route in app/api/tools/discord/server-name-generator/route.ts
- [ ] T045 [P] [US1] Add generateDiscordServerNames function to lib/deepseek.ts
- [ ] T046 [P] [US1] Add Discord Server Name Generator translations to lib/locales/en/discord.ts and lib/locales/es/discord.ts
- [ ] T047 [US1] Add Spanish URL rewrite for Discord Server Name Generator in next.config.ts
- [ ] T048 [US1] Document Discord Server Name Generator routes in docs/RUTAS_ALIAS.md

### Tool 5: Twitch Username Generator (AI)

- [ ] T049 [P] [US1] Create Twitch Username Generator page in app/(tools)/twitch/username-generator/page.tsx
- [ ] T050 [P] [US1] Create Twitch Username Generator API route in app/api/tools/twitch/username-generator/route.ts
- [ ] T051 [P] [US1] Add generateTwitchUsernames function to lib/deepseek.ts
- [ ] T052 [P] [US1] Add Twitch Username Generator translations to lib/locales/en/twitch.ts and lib/locales/es/twitch.ts
- [ ] T053 [US1] Add Spanish URL rewrite for Twitch Username Generator in next.config.ts
- [ ] T054 [US1] Document Twitch Username Generator routes in docs/RUTAS_ALIAS.md

### Tool 6: Email Subject Line Generator (AI - New Platform)

- [ ] T055 [P] [US1] Create Email Subject Line Generator page in app/(tools)/email/subject-line-generator/page.tsx
- [ ] T056 [P] [US1] Create Email Subject Line Generator API route in app/api/tools/email/subject-line-generator/route.ts
- [ ] T057 [P] [US1] Add generateEmailSubjectLines function to lib/deepseek.ts
- [ ] T058 [P] [US1] Add Email Subject Line Generator translations to lib/locales/en/email.ts and lib/locales/es/email.ts
- [ ] T059 [US1] Add Spanish URL rewrite for Email Subject Line Generator in next.config.ts
- [ ] T060 [US1] Document Email Subject Line Generator routes in docs/RUTAS_ALIAS.md

### Tool 7: Tinder Bio Generator (AI - New Platform)

- [ ] T061 [P] [US1] Create Tinder Bio Generator page in app/(tools)/dating/tinder-bio-generator/page.tsx
- [ ] T062 [P] [US1] Create Tinder Bio Generator API route in app/api/tools/dating/tinder-bio-generator/route.ts
- [ ] T063 [P] [US1] Add generateTinderBio function to lib/deepseek.ts
- [ ] T064 [P] [US1] Add Tinder Bio Generator translations to lib/locales/en/dating.ts and lib/locales/es/dating.ts
- [ ] T065 [US1] Add Spanish URL rewrite for Tinder Bio Generator in next.config.ts
- [ ] T066 [US1] Document Tinder Bio Generator routes in docs/RUTAS_ALIAS.md

### Tool 8: YouTube Channel Description Generator (AI)

- [ ] T067 [P] [US1] Create YouTube Channel Description Generator page in app/(tools)/youtube/channel-description-generator/page.tsx
- [ ] T068 [P] [US1] Create YouTube Channel Description Generator API route in app/api/tools/youtube/channel-description-generator/route.ts
- [ ] T069 [P] [US1] Add generateYouTubeChannelDescription function to lib/deepseek.ts
- [ ] T070 [P] [US1] Add YouTube Channel Description Generator translations to lib/locales/en/youtube.ts and lib/locales/es/youtube.ts
- [ ] T071 [US1] Add Spanish URL rewrite for YouTube Channel Description Generator in next.config.ts
- [ ] T072 [US1] Document YouTube Channel Description Generator routes in docs/RUTAS_ALIAS.md

### Tool 9: LinkedIn Summary Generator (AI)

- [ ] T073 [P] [US1] Create LinkedIn Summary Generator page in app/(tools)/linkedin/summary-generator/page.tsx
- [ ] T074 [P] [US1] Create LinkedIn Summary Generator API route in app/api/tools/linkedin/summary-generator/route.ts
- [ ] T075 [P] [US1] Add generateLinkedInSummary function to lib/deepseek.ts
- [ ] T076 [P] [US1] Add LinkedIn Summary Generator translations to lib/locales/en/linkedin.ts and lib/locales/es/linkedin.ts
- [ ] T077 [US1] Add Spanish URL rewrite for LinkedIn Summary Generator in next.config.ts
- [ ] T078 [US1] Document LinkedIn Summary Generator routes in docs/RUTAS_ALIAS.md

**Checkpoint**: Phase 1 complete - 9 new tools ready, test all EN/ES URLs, verify mobile and dark mode

---

## Phase 4: User Story 2 - Medium Expansion Tools (Priority: P2)

**Goal**: 10 additional tools including calculators and expanding new platforms

**Independent Test**: Each tool loads, generates/calculates, and both EN/ES URLs work

### New Platform Hub: GitHub

- [ ] T079 [P] [US2] Create GitHub platform hub page in app/(tools)/github/page.tsx
- [ ] T080 [P] [US2] Create GitHub platform layout in app/(tools)/github/layout.tsx
- [ ] T081 [P] [US2] Add GitHub translations (nav.github, github.page.*) to lib/locales/en/ and lib/locales/es/
- [ ] T082 [US2] Add GitHub to navigation in app/components/navigation.tsx
- [ ] T083 [P] [US2] Add GitHub to seo-metadata.ts in lib/seo-metadata.ts
- [ ] T084 [P] [US2] Add GitHub to tool-selector.tsx in app/components/tool-selector.tsx
- [ ] T085 [P] [US2] Add GitHub to home page platforms array in app/page.tsx
- [ ] T086 [P] [US2] Create GitHub logo placeholder in public/platforms/github.svg
- [ ] T086b [P] [US2] Add GitHub to platform-logo.tsx in app/components/platform-logo.tsx

### New Platform Hub: Gaming

- [ ] T087 [P] [US2] Create Gaming platform hub page in app/(tools)/gaming/page.tsx
- [ ] T088 [P] [US2] Create Gaming platform layout in app/(tools)/gaming/layout.tsx
- [ ] T089 [P] [US2] Add Gaming translations (nav.gaming, gaming.page.*) to lib/locales/en/ and lib/locales/es/
- [ ] T090 [US2] Add Gaming to navigation in app/components/navigation.tsx
- [ ] T091 [P] [US2] Add Gaming to seo-metadata.ts in lib/seo-metadata.ts
- [ ] T092 [P] [US2] Add Gaming to tool-selector.tsx in app/components/tool-selector.tsx
- [ ] T093 [P] [US2] Add Gaming to home page platforms array in app/page.tsx
- [ ] T094 [P] [US2] Create Gaming logo placeholder in public/platforms/gaming.svg
- [ ] T094b [P] [US2] Add Gaming to platform-logo.tsx in app/components/platform-logo.tsx

### Tool 10: YouTube Earnings Calculator (Calculator - No AI)

- [ ] T095 [P] [US2] Create YouTube Earnings Calculator page in app/(tools)/youtube/earnings-calculator/page.tsx
- [ ] T096 [P] [US2] Add YouTube Earnings Calculator translations to lib/locales/en/youtube.ts and lib/locales/es/youtube.ts
- [ ] T097 [US2] Add Spanish URL rewrite for YouTube Earnings Calculator in next.config.ts
- [ ] T098 [US2] Document YouTube Earnings Calculator routes in docs/RUTAS_ALIAS.md

### Tool 11: Spotify Streams Calculator (Calculator - No AI)

- [ ] T099 [P] [US2] Create Spotify Streams Calculator page in app/(tools)/spotify/streams-calculator/page.tsx
- [ ] T100 [P] [US2] Add Spotify Streams Calculator translations to lib/locales/en/spotify.ts and lib/locales/es/spotify.ts
- [ ] T101 [US2] Add Spanish URL rewrite for Spotify Streams Calculator in next.config.ts
- [ ] T102 [US2] Document Spotify Streams Calculator routes in docs/RUTAS_ALIAS.md

### Tool 12: Twitch Sub Calculator (Calculator - No AI)

- [ ] T103 [P] [US2] Create Twitch Sub Calculator page in app/(tools)/twitch/sub-calculator/page.tsx
- [ ] T104 [P] [US2] Add Twitch Sub Calculator translations to lib/locales/en/twitch.ts and lib/locales/es/twitch.ts
- [ ] T105 [US2] Add Spanish URL rewrite for Twitch Sub Calculator in next.config.ts
- [ ] T106 [US2] Document Twitch Sub Calculator routes in docs/RUTAS_ALIAS.md

### Tool 13: Podcast Episode Title Generator (AI)

- [ ] T107 [P] [US2] Create Podcast Episode Title Generator page in app/(tools)/podcast/episode-title-generator/page.tsx
- [ ] T108 [P] [US2] Create Podcast Episode Title Generator API route in app/api/tools/podcast/episode-title-generator/route.ts
- [ ] T109 [P] [US2] Add generatePodcastEpisodeTitles function to lib/deepseek.ts
- [ ] T110 [P] [US2] Add Podcast Episode Title Generator translations to lib/locales/en/podcast.ts and lib/locales/es/podcast.ts
- [ ] T111 [US2] Add Spanish URL rewrite for Podcast Episode Title Generator in next.config.ts
- [ ] T112 [US2] Document Podcast Episode Title Generator routes in docs/RUTAS_ALIAS.md

### Tool 14: Podcast Description Generator (AI)

- [ ] T113 [P] [US2] Create Podcast Description Generator page in app/(tools)/podcast/description-generator/page.tsx
- [ ] T114 [P] [US2] Create Podcast Description Generator API route in app/api/tools/podcast/description-generator/route.ts
- [ ] T115 [P] [US2] Add generatePodcastDescription function to lib/deepseek.ts
- [ ] T116 [P] [US2] Add Podcast Description Generator translations to lib/locales/en/podcast.ts and lib/locales/es/podcast.ts
- [ ] T117 [US2] Add Spanish URL rewrite for Podcast Description Generator in next.config.ts
- [ ] T118 [US2] Document Podcast Description Generator routes in docs/RUTAS_ALIAS.md

### Tool 15: Show Notes Generator (AI)

- [ ] T119 [P] [US2] Create Show Notes Generator page in app/(tools)/podcast/show-notes-generator/page.tsx
- [ ] T120 [P] [US2] Create Show Notes Generator API route in app/api/tools/podcast/show-notes-generator/route.ts
- [ ] T121 [P] [US2] Add generatePodcastShowNotes function to lib/deepseek.ts
- [ ] T122 [P] [US2] Add Show Notes Generator translations to lib/locales/en/podcast.ts and lib/locales/es/podcast.ts
- [ ] T123 [US2] Add Spanish URL rewrite for Show Notes Generator in next.config.ts
- [ ] T124 [US2] Document Show Notes Generator routes in docs/RUTAS_ALIAS.md

### Tool 16: Cold Email Generator (AI)

- [ ] T125 [P] [US2] Create Cold Email Generator page in app/(tools)/email/cold-email-generator/page.tsx
- [ ] T126 [P] [US2] Create Cold Email Generator API route in app/api/tools/email/cold-email-generator/route.ts
- [ ] T127 [P] [US2] Add generateColdEmail function to lib/deepseek.ts
- [ ] T128 [P] [US2] Add Cold Email Generator translations to lib/locales/en/email.ts and lib/locales/es/email.ts
- [ ] T129 [US2] Add Spanish URL rewrite for Cold Email Generator in next.config.ts
- [ ] T130 [US2] Document Cold Email Generator routes in docs/RUTAS_ALIAS.md

### Tool 17: Newsletter Name Generator (AI)

- [ ] T131 [P] [US2] Create Newsletter Name Generator page in app/(tools)/email/newsletter-name-generator/page.tsx
- [ ] T132 [P] [US2] Create Newsletter Name Generator API route in app/api/tools/email/newsletter-name-generator/route.ts
- [ ] T133 [P] [US2] Add generateNewsletterNames function to lib/deepseek.ts
- [ ] T134 [P] [US2] Add Newsletter Name Generator translations to lib/locales/en/email.ts and lib/locales/es/email.ts
- [ ] T135 [US2] Add Spanish URL rewrite for Newsletter Name Generator in next.config.ts
- [ ] T136 [US2] Document Newsletter Name Generator routes in docs/RUTAS_ALIAS.md

### Tool 18: GitHub Profile README Generator (AI)

- [ ] T137 [P] [US2] Create GitHub Profile README Generator page in app/(tools)/github/readme-generator/page.tsx
- [ ] T138 [P] [US2] Create GitHub Profile README Generator API route in app/api/tools/github/readme-generator/route.ts
- [ ] T139 [P] [US2] Add generateGitHubReadme function to lib/deepseek.ts
- [ ] T140 [P] [US2] Add GitHub Profile README Generator translations to lib/locales/en/github.ts and lib/locales/es/github.ts
- [ ] T141 [US2] Add Spanish URL rewrite for GitHub Profile README Generator in next.config.ts
- [ ] T142 [US2] Document GitHub Profile README Generator routes in docs/RUTAS_ALIAS.md

### Tool 19: Gamertag Generator (AI)

- [ ] T143 [P] [US2] Create Gamertag Generator page in app/(tools)/gaming/gamertag-generator/page.tsx
- [ ] T144 [P] [US2] Create Gamertag Generator API route in app/api/tools/gaming/gamertag-generator/route.ts
- [ ] T145 [P] [US2] Add generateGamertags function to lib/deepseek.ts
- [ ] T146 [P] [US2] Add Gamertag Generator translations to lib/locales/en/gaming.ts and lib/locales/es/gaming.ts
- [ ] T147 [US2] Add Spanish URL rewrite for Gamertag Generator in next.config.ts
- [ ] T148 [US2] Document Gamertag Generator routes in docs/RUTAS_ALIAS.md

**Checkpoint**: Phase 2 complete - 10 more tools (19 total), 2 new platform hubs (GitHub, Gaming)

---

## Phase 5: User Story 3 - New Platforms Expansion (Priority: P3)

**Goal**: 8 tools for 6 new platforms to maximize SEO coverage

**Independent Test**: Each tool loads, generates/calculates, and both EN/ES URLs work

### New Platform Hubs (6 platforms)

- [ ] T149 [P] [US3] Create Medium platform hub (page.tsx, layout.tsx) in app/(tools)/medium/
- [ ] T150 [P] [US3] Create Etsy platform hub (page.tsx, layout.tsx) in app/(tools)/etsy/
- [ ] T151 [P] [US3] Create OnlyFans platform hub (page.tsx, layout.tsx) in app/(tools)/onlyfans/
- [ ] T152 [P] [US3] Create Patreon platform hub (page.tsx, layout.tsx) in app/(tools)/patreon/
- [ ] T153 [P] [US3] Create Fiverr platform hub (page.tsx, layout.tsx) in app/(tools)/fiverr/
- [ ] T154 [P] [US3] Create Substack platform hub (page.tsx, layout.tsx) in app/(tools)/substack/
- [ ] T155 [US3] Add all 6 new platforms to navigation in app/components/navigation.tsx
- [ ] T156 [P] [US3] Add all 6 new platforms to seo-metadata.ts in lib/seo-metadata.ts
- [ ] T157 [P] [US3] Add all 6 new platforms to tool-selector.tsx in app/components/tool-selector.tsx
- [ ] T158 [P] [US3] Add all 6 new platforms to home page in app/page.tsx
- [ ] T159 [P] [US3] Add translations for all 6 new platforms to lib/locales/en/ and lib/locales/es/
- [ ] T160 [P] [US3] Create logo placeholders for all 6 new platforms in public/platforms/
- [ ] T160b [P] [US3] Add all 6 new platforms to platform-logo.tsx in app/components/platform-logo.tsx

### Tool 20: Medium Article Title Generator (AI)

- [ ] T161 [P] [US3] Create Medium Article Title Generator page in app/(tools)/medium/article-title-generator/page.tsx
- [ ] T162 [P] [US3] Create Medium Article Title Generator API route in app/api/tools/medium/article-title-generator/route.ts
- [ ] T163 [P] [US3] Add generateMediumArticleTitles function to lib/deepseek.ts
- [ ] T164 [P] [US3] Add Medium Article Title Generator translations to lib/locales/en/medium.ts and lib/locales/es/medium.ts
- [ ] T165 [US3] Add Spanish URL rewrite for Medium Article Title Generator in next.config.ts
- [ ] T166 [US3] Document Medium Article Title Generator routes in docs/RUTAS_ALIAS.md

### Tool 21: Etsy Product Description Generator (AI)

- [ ] T167 [P] [US3] Create Etsy Product Description Generator page in app/(tools)/etsy/product-description-generator/page.tsx
- [ ] T168 [P] [US3] Create Etsy Product Description Generator API route in app/api/tools/etsy/product-description-generator/route.ts
- [ ] T169 [P] [US3] Add generateEtsyProductDescription function to lib/deepseek.ts
- [ ] T170 [P] [US3] Add Etsy Product Description Generator translations to lib/locales/en/etsy.ts and lib/locales/es/etsy.ts
- [ ] T171 [US3] Add Spanish URL rewrite for Etsy Product Description Generator in next.config.ts
- [ ] T172 [US3] Document Etsy Product Description Generator routes in docs/RUTAS_ALIAS.md

### Tool 22: OnlyFans Bio Generator (AI)

- [ ] T173 [P] [US3] Create OnlyFans Bio Generator page in app/(tools)/onlyfans/bio-generator/page.tsx
- [ ] T174 [P] [US3] Create OnlyFans Bio Generator API route in app/api/tools/onlyfans/bio-generator/route.ts
- [ ] T175 [P] [US3] Add generateOnlyFansBio function to lib/deepseek.ts
- [ ] T176 [P] [US3] Add OnlyFans Bio Generator translations to lib/locales/en/onlyfans.ts and lib/locales/es/onlyfans.ts
- [ ] T177 [US3] Add Spanish URL rewrite for OnlyFans Bio Generator in next.config.ts
- [ ] T178 [US3] Document OnlyFans Bio Generator routes in docs/RUTAS_ALIAS.md

### Tool 23: Patreon Tier Description Generator (AI)

- [ ] T179 [P] [US3] Create Patreon Tier Description Generator page in app/(tools)/patreon/tier-description-generator/page.tsx
- [ ] T180 [P] [US3] Create Patreon Tier Description Generator API route in app/api/tools/patreon/tier-description-generator/route.ts
- [ ] T181 [P] [US3] Add generatePatreonTierDescription function to lib/deepseek.ts
- [ ] T182 [P] [US3] Add Patreon Tier Description Generator translations to lib/locales/en/patreon.ts and lib/locales/es/patreon.ts
- [ ] T183 [US3] Add Spanish URL rewrite for Patreon Tier Description Generator in next.config.ts
- [ ] T184 [US3] Document Patreon Tier Description Generator routes in docs/RUTAS_ALIAS.md

### Tool 24: Fiverr Gig Description Generator (AI)

- [ ] T185 [P] [US3] Create Fiverr Gig Description Generator page in app/(tools)/fiverr/gig-description-generator/page.tsx
- [ ] T186 [P] [US3] Create Fiverr Gig Description Generator API route in app/api/tools/fiverr/gig-description-generator/route.ts
- [ ] T187 [P] [US3] Add generateFiverrGigDescription function to lib/deepseek.ts
- [ ] T188 [P] [US3] Add Fiverr Gig Description Generator translations to lib/locales/en/fiverr.ts and lib/locales/es/fiverr.ts
- [ ] T189 [US3] Add Spanish URL rewrite for Fiverr Gig Description Generator in next.config.ts
- [ ] T190 [US3] Document Fiverr Gig Description Generator routes in docs/RUTAS_ALIAS.md

### Tool 25: Substack Welcome Email Generator (AI)

- [ ] T191 [P] [US3] Create Substack Welcome Email Generator page in app/(tools)/substack/welcome-email-generator/page.tsx
- [ ] T192 [P] [US3] Create Substack Welcome Email Generator API route in app/api/tools/substack/welcome-email-generator/route.ts
- [ ] T193 [P] [US3] Add generateSubstackWelcomeEmail function to lib/deepseek.ts
- [ ] T194 [P] [US3] Add Substack Welcome Email Generator translations to lib/locales/en/substack.ts and lib/locales/es/substack.ts
- [ ] T195 [US3] Add Spanish URL rewrite for Substack Welcome Email Generator in next.config.ts
- [ ] T196 [US3] Document Substack Welcome Email Generator routes in docs/RUTAS_ALIAS.md

### Tool 26: Dating App Bio Generator (AI)

- [ ] T197 [P] [US3] Create Dating App Bio Generator page in app/(tools)/dating/bio-generator/page.tsx
- [ ] T198 [P] [US3] Create Dating App Bio Generator API route in app/api/tools/dating/bio-generator/route.ts
- [ ] T199 [P] [US3] Add generateDatingBio function to lib/deepseek.ts
- [ ] T200 [P] [US3] Add Dating App Bio Generator translations to lib/locales/en/dating.ts and lib/locales/es/dating.ts
- [ ] T201 [US3] Add Spanish URL rewrite for Dating App Bio Generator in next.config.ts
- [ ] T202 [US3] Document Dating App Bio Generator routes in docs/RUTAS_ALIAS.md

### Tool 27: Portfolio Bio Generator (AI)

- [ ] T203 [P] [US3] Create Portfolio Bio Generator page in app/(tools)/general/portfolio-bio-generator/page.tsx (or suitable location)
- [ ] T204 [P] [US3] Create Portfolio Bio Generator API route in app/api/tools/general/portfolio-bio-generator/route.ts
- [ ] T205 [P] [US3] Add generatePortfolioBio function to lib/deepseek.ts
- [ ] T206 [P] [US3] Add Portfolio Bio Generator translations to lib/locales/en/general.ts and lib/locales/es/general.ts
- [ ] T207 [US3] Add Spanish URL rewrite for Portfolio Bio Generator in next.config.ts
- [ ] T208 [US3] Document Portfolio Bio Generator routes in docs/RUTAS_ALIAS.md

**Checkpoint**: Phase 3 complete - 8 more tools (27 total), 6 new platform hubs

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality assurance and documentation

- [ ] T209 [P] Update PRD.md with all new tools status
- [ ] T210 [P] Run npm run build to verify all pages compile
- [ ] T211 Verify all tools have related-tools sections populated
- [ ] T212 [P] Run Lighthouse audits on sample tools (Performance >90, SEO >95)
- [ ] T213 [P] Test all Spanish URL rewrites work correctly
- [ ] T214 [P] Test dark mode on all new tools
- [ ] T215 [P] Test mobile responsiveness on all new tools
- [ ] T216 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS Phase 3 tools for new platforms
- **User Story 1 (Phase 3)**: Depends on Foundational for new platform tools; existing platform tools can start after Setup
- **User Story 2 (Phase 4)**: Can start after Phase 3 for new platform hubs (GitHub, Gaming)
- **User Story 3 (Phase 5)**: Can start after Phase 4 or in parallel if different developers
- **Polish (Phase 6)**: Depends on all tools being complete

### User Story Dependencies

- **User Story 1 (P1)**: Calculator tool (Instagram) has NO dependencies. AI tools for new platforms (Podcast, Email, Dating) need Phase 2 hubs first. AI tools for existing platforms (YouTube, Discord, Twitch, LinkedIn) can start immediately.
- **User Story 2 (P2)**: New platform hubs (GitHub, Gaming) must be created first. All tools can then proceed.
- **User Story 3 (P3)**: 6 new platform hubs must be created first. All tools can then proceed.

### Within Each Tool

1. Platform hub must exist (if new platform)
2. Page component + API route can be parallel [P]
3. DeepSeek function can be parallel [P]
4. Translations can be parallel [P]
5. URL rewrite (depends on page existing)
6. Documentation (depends on page existing)

### Parallel Opportunities

**Phase 2 (all parallel)**: All 3 platform hubs can be created simultaneously by 3 different people.

**Phase 3 (within each tool)**: 
```bash
# Example: YouTube Channel Name Generator - all [P] tasks together
T031: Create page
T032: Create API route
T033: Add DeepSeek function
T034: Add translations
```

**Across tools**: All 9 Phase 3 tools can be worked on in parallel (assuming Phase 2 hubs done).

---

## Implementation Strategy

### MVP First (Phase 3 Only - 9 Tools)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Platform hubs Podcast, Email, Dating (T003-T026)
3. Complete Phase 3: All 9 tools (T027-T078)
4. **STOP and VALIDATE**: Test all tools, URLs, mobile, dark mode
5. Deploy - this is a viable MVP with significant SEO value

### Incremental Delivery

After MVP:
1. Add Phase 4 tools (10 more) → Deploy
2. Add Phase 5 tools (8 more) → Deploy
3. Each phase adds SEO keywords without breaking existing tools

### Parallel Team Strategy (3+ developers)

1. Team completes Phase 1-2 together
2. Once Phase 2 done:
   - Dev A: Tools for existing platforms (Instagram, YouTube, Discord, Twitch, LinkedIn)
   - Dev B: Tools for new platforms (Podcast, Email, Dating)
   - Dev C: Phase 4 platform hubs (GitHub, Gaming) + Phase 4 tools

---

## Summary

| Phase | Tasks | Tools | Description |
|-------|-------|-------|-------------|
| 1 | T001-T002 | 0 | Setup |
| 2 | T003-T026b | 0 | 3 new platform hubs (Podcast, Email, Dating) + platform-logo.tsx |
| 3 | T027-T078 | 9 | Quick Wins - MVP tools |
| 4 | T079-T094b | 10 | Medium expansion + 2 hubs (GitHub, Gaming) + platform-logo.tsx |
| 5 | T149-T208 | 8 | New platforms + 6 hubs + platform-logo.tsx |
| 6 | T209-T216 | 0 | Polish |

**Total**: 222 tasks (216 + 6 platform-logo.tsx updates), 27 new tools, 11 new platform hubs

---

## Notes

- [P] tasks = different files, safe to run in parallel
- [US1/US2/US3] = User Story phase mapping
- Calculator tools = no API route needed (client-side only)
- AI tools = page + API route + DeepSeek function
- All tools need: translations (ES/EN), Spanish URL rewrite, route documentation
- Commit after each tool or logical group
- Test both EN and ES URLs for every tool before marking complete
