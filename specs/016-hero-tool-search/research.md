# Research: Hero Tool Search with Auto-Create

**Feature**: 016-hero-tool-search  
**Date**: 2024-12-04

## Research Tasks Completed

### 1. Official Tools Indexing Strategy

**Question**: How to efficiently index ~200+ official tools across 28 platforms for client-side search?

**Decision**: Create static `lib/tools-index.ts` that exports a pre-built array of all official tools

**Rationale**:

- Official tools are defined in each platform's `page.tsx` as `const tools = [...]`
- These change infrequently (only when new tools are added)
- Static index can be imported client-side for instant search without API calls
- Tools index can be generated from existing definitions at build time or manually maintained

**Alternatives Considered**:

- API route that reads from platform pages → Rejected: Too complex, unnecessary server round-trip
- Database mirroring → Rejected: Overkill, duplicates source of truth
- Dynamic import of all platform pages → Rejected: Heavy bundle, complex

### 2. Combined Search Algorithm

**Question**: How to combine and rank results from official (static) and community (Appwrite) tools?

**Decision**: Hybrid search with client-side official + API for community

**Rationale**:

1. **Official tools**: Client-side fuzzy search on static index (instant, no API)
2. **Community tools**: Appwrite Query with `contains` on name/description
3. **Merge**: Combine results, sort by relevance score
4. **Relevance scoring**:
   - Exact name match: 100 points
   - Name starts with query: 80 points
   - Name contains query: 60 points
   - Description contains query: 40 points
   - Official tools get +10 bonus (prioritize verified content)

**Alternatives Considered**:

- Server-side only search → Rejected: Adds latency for official tools
- Client-side only with cached community tools → Rejected: Stale data, memory issues
- Full-text search engine (Algolia, Meilisearch) → Rejected: Overkill for current scale

### 3. Debounce & UX Pattern

**Question**: Best practices for real-time search UX in React?

**Decision**: Use `useDeferredValue` + debounced API calls

**Rationale**:

- `useDeferredValue` for official tools search (React 18 feature, instant UI)
- 300ms debounce for community tools API call (per FR-002)
- Show "Searching..." skeleton during community fetch
- Display official results immediately while community loads

**Alternatives Considered**:

- `lodash.debounce` only → Rejected: Less smooth UI, delays even local search
- `useTransition` → Considered: Good for low-priority updates, but `useDeferredValue` better fits search pattern

### 4. Auto-Create Tool Generation

**Question**: How to generate tool configuration from user's search query?

**Decision**: Use AI to generate name, description, and prompt template from search query

**Rationale**:

- User searches "emoji to text converter"
- AI generates:
  - `name`: "Emoji to Text Converter"
  - `description`: "Transform emoji sequences into readable text descriptions"
  - `prompt_template`: Full prompt with `{{input}}` placeholder
- Platform: Infer from query or default to "general"
- Pre-populate builder page, user can edit before saving

**Alternatives Considered**:

- Simple template with query as name → Rejected: Poor quality, user has to write everything
- Fully automatic creation without preview → Rejected: No quality control, spam risk

### 5. Search Context Preservation (Auth Flow)

**Question**: How to preserve search query when redirecting to login?

**Decision**: Use URL search params + sessionStorage

**Rationale**:

- Store `?createTool=emoji+converter` in URL when redirecting to login
- After login, check for param and redirect to builder with query
- sessionStorage as backup for complex data

**Alternatives Considered**:

- Cookie → Rejected: Overkill, potential GDPR concerns
- localStorage → Considered: Similar to sessionStorage, but persists longer than needed
- Server-side session → Rejected: Adds complexity, we're using Appwrite auth

### 6. Community Tools Visibility Rules

**Question**: How to implement approved + user's pending tools visibility?

**Decision**: Compound Appwrite query with OR conditions

**Rationale**:

- If user logged in: `Query.or([Query.equal("status", "approved"), Query.equal("author_id", userId)])`
- If user not logged in: `Query.equal("status", "approved")`
- This matches FR-003 clarification

**Implementation Note**: Appwrite SDK supports OR queries via `Query.or()`

## Key Decisions Summary

| Decision              | Choice                             | Impact                         |
| --------------------- | ---------------------------------- | ------------------------------ |
| Official tools source | Static index file                  | Fast client-side search        |
| Community search      | Appwrite API with Query            | Real-time, respects visibility |
| Search merge          | Client-side with relevance scoring | Unified results                |
| Debounce              | 300ms for API, instant for local   | Per FR-002                     |
| Auto-create           | AI-generated config → builder      | Quality + user control         |
| Auth context          | URL params + sessionStorage        | Simple, reliable               |

## Dependencies Verified

- `@heroui/react` Input component: ✅ Supports controlled input, events
- `appwrite` Query.or: ✅ Available in SDK
- `useDeferredValue`: ✅ React 18+ (Next.js 16 uses React 19)
- DeepSeek/OpenRouter: ✅ Existing integration in `lib/deepseek.ts`
