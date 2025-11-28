# Stage 2: UI/UX Design System

This folder contains the design artifacts for the Zygote Series platform.

## Contents

### 1. Tokens (`/tokens`)
- **Colors:** Defined in `colors.js`. Primary is Royal Navy Blue (`#003049`), Secondary is Aqua (`#27E6D4`).
- **Typography:** Defined in `typography.js`. Uses Inter for UI, Merriweather for reading.
- **Tailwind:** `tailwind.extend.js` contains the configuration object to be merged into the main project's `tailwind.config.js`.

### 2. Mockups (`/mocks`)
React components that represent the high-fidelity design of key screens.
- `LandingPage.tsx`: Marketing front.
- `Dashboard.tsx`: Student progress view.
- `AdminImport.tsx`: Bulk data entry UI.

### 3. Components (`/components`)
Reusable UI elements following the design spec.
- `Button.tsx`: Primary/Secondary/Outline variants.

### 4. Specifications (`/spec`)
- `FIGMA_SPEC.json`: Layout grids, spacing, and component dimensions.
- `ANIMATIONS.md`: Guidelines for Framer Motion implementation.

## How to Use
1. Copy `tokens/tailwind.extend.js` content into your `web` or `admin` `tailwind.config.js`.
2. Use the Mock components as reference for building the actual pages in Next.js.
