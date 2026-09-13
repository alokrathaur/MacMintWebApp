# Project Metadata — MacMint Web App

- **Project Name**: MacMint Web App
- **Domain**: `https://getmacmint.store` (GitHub Pages with custom CNAME).
- **Description**: Official website, product showcase, interactive demo, and checkout portal for MacMint macOS cleaner.
- **Technology Stack**:
  - React 18, TypeScript, Vite.
  - Tailwind CSS with custom MacMint palette (Emerald Teal `#087F73`, Fresh Mint `#4FD1B5`, Pale Mint `#B8F2DF`).
  - Three.js (interactive 3D MacMint squircle logo with lighting and particle dissolution).
  - D3.js + SVG (interactive radial Sunburst disk space visualizer with drill-down exploration).
  - Lucide React icons.
- **Repository Structure**:
  - `src/components/hero/`: `Hero.tsx`, `HeroLogo3D.tsx` (Three.js WebGL canvas).
  - `src/components/sunburst/`: `SunburstMap.tsx` (D3.js visualization).
  - `src/components/features/`: `ProductOverview.tsx`, `ProductShowcase.tsx`, `TrustAndWorkflow.tsx`.
  - `src/components/pricing/`: `PricingSection.tsx` (toggle yearly/lifetime with checkout links).
  - `src/config/site.ts`: Central source of truth for version, URLs, support email, and pricing.
  - `src/content/guidesData.ts`: Declarative guide / SEO blog posts.
  - `src/pages/`: `HomePage`, `FeaturesPage`, `PricingPage`, `DownloadPage`, `ActivatePage`, `GuidesPage`, `SingleGuidePage`, `AboutPage`, `TermsPage`, `PrivacyPage`, `FAQPage`, `SupportPage`.
- **Status**: Production Live.
