# Architectural Decision Records (ADRs) — MacMint Web App

## ADR-001: Centralized Configuration in site.ts
- **Status**: ACCEPTED
- **Context**: Prevent broken links and inconsistent price displays across multiple pages.
- **Decision**: Export all pricing tiers, download links, version numbers, and support contacts from `src/config/site.ts`.
- **Consequences**: Changing price or releasing new app version requires editing a single line of code.

## ADR-002: Declarative Guides Array in TypeScript
- **Status**: ACCEPTED
- **Context**: Support SEO blog articles without requiring heavy headless CMS infrastructure or complex database queries.
- **Decision**: Define articles as structured objects in `src/content/guidesData.ts`.
- **Consequences**: Instant rendering, zero build friction, 100% static hosting compatibility.
