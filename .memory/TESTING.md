# Testing Guide — MacMint Web App

## Local Development & Build
```bash
cd MacMintWebApp
npm install
npm run dev      # http://localhost:5173
npm run build    # Generates dist/ bundle
npm run preview  # Previews production bundle
```

## Verification Checklist
1. Verify 3D squircle logo rotates and responds to mouse hover in Hero section.
2. Click arcs on Sunburst Map -> Verify view zooms into folder and updates breadcrumbs.
3. Toggle pricing switch -> Verify prices switch between Yearly and Lifetime.
4. Open `/guides/how-to-clean-mac-storage` -> Verify article renders cleanly.
