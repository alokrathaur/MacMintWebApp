# MacMint Website

The official modern website for **MacMint** — a native, privacy-focused macOS storage cleaner and system optimization utility.

## 🎨 Tech Stack & Architecture

- **Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) customized with the MacMint design tokens (Deep Emerald Teal `#087F73`, Fresh Mint `#4FD1B5`, Pale Mint `#B8F2DF`)
- **Hero 3D**: [Three.js](https://threejs.org/) rendering the real MacMint logo squircle with subtle depth, soft lighting, and digital clutter dissolution
- **Data Visualization**: [D3.js](https://d3js.org/) + SVG interactive radial Sunburst Map with drill-down exploration and breadcrumb navigation
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Static site built for [GitHub Pages](https://pages.github.com/) with automated GitHub Actions CI/CD

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd website
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```
Generates a fast, production-optimized static bundle in `website/dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Configuration

All site metadata, links, pricing, version, and support channels are centralized in:
`website/src/config/site.ts`

- **Change App Version**: Update `SITE_CONFIG.appVersion`
- **Change Download URL**: Update `SITE_CONFIG.downloadUrl`
- **Change Support Email**: Update `SITE_CONFIG.supportEmail`
- **Change Contact on X**: Update `SITE_CONFIG.xUrl`
- **Change Pricing**: Update `SITE_CONFIG.pricing`

---

## 📖 Adding New Guides

Guide content is defined declaratively in `website/src/content/guidesData.ts`. Simply add a new key to `GUIDES` with:
- `slug`
- `title`
- `category`
- `readTime`
- `summary`
- `screenshot`
- `toc`
- `steps`
- `warnings`
- `tips`
- `related`

The route `/guides/[slug]` will automatically resolve and render the guide.

---

## 🌐 GitHub Pages Deployment & Custom Domain

1. **Automated Deployment**: Any push to `main` with changes in `website/**` automatically runs `.github/workflows/deploy.yml` and publishes to GitHub Pages.
2. **Custom Domain**: To bind `macmint.com`, add a `CNAME` file to `website/public/CNAME` or configure it in repository **Settings > Pages > Custom domain**.

---

## 📄 License

MIT License. Designed with care for macOS. Built by [LegendPrix AI](https://legendPrixAi.lol).
