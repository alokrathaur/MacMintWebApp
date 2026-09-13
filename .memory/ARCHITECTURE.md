# Architecture — MacMint Web App

## System Architecture Overview
```text
┌─────────────────────────────────────────────────────────────┐
│                 Browser Client (Desktop / Mobile)           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vite / React 18 Single Page App        │
├─────────────────────────────────────────────────────────────┤
│  Router / Page Views:                                       │
│   - HomePage (HeroLogo3D, SunburstMap, PricingSection)      │
│   - FeaturesPage, DownloadPage, ActivatePage, GuidesPage    │
├─────────────────────────────────────────────────────────────┤
│  Interactive Engines:                                       │
│   - Three.js Canvas (WebGL 3D squircle rendering)           │
│   - D3.js Hierarchy (Radial Sunburst partition layout)      │
├─────────────────────────────────────────────────────────────┤
│  Declarative Data Stores:                                   │
│   - src/config/site.ts (Metadata, pricing, links)           │
│   - src/content/guidesData.ts (Article definitions)         │
│   - src/data/storage-demo.json (Disk space hierarchy)       │
└─────────────────────────────────────────────────────────────┘
```
