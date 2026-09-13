# Data Flow — MacMint Web App

```text
Visitor loads getmacmint.store
              │
              ├──► site.ts populates pricing, version, download links
              ├──► storage-demo.json populates D3 Sunburst hierarchy
              ├──► Three.js initializes WebGL context & animates logo squircle
              │
              ▼
User clicks "Buy License" -> Redirected to Dodo Payments secure hosted checkout
              │
              ▼
User clicks "Download MacMint" -> Direct download of MacMint.dmg from releases
```
