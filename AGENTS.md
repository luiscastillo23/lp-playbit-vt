# AGENTS.md — AI Coding Agent Guidelines for PLAYBIT (`/ 2026`)

This file provides context, architectural constraints, design system tokens, and implementation rules for AI coding agents working on the **PLAYBIT** handheld gaming console web application.

---

## 1. Project Overview & Domain Context

**PLAYBIT** is a flagship product showcase and interactive web experience for the **PLAYBIT MK-I (`/ 2026`)** pocket-sized retro-futuristic gaming console.

- **Aesthetic Direction**: Teenage Engineering & Braun industrial functionalism meets 4th-generation pocket console hardware.
- **Core Visual Signature**:
  - Warm concrete/studio radial backdrop (`#CEC8C2` → `#B8B0A9`).
  - Tactile, pure-CSS skeuomorphic hardware rendering (`#FBF8F3` warm bone polycarbonate shell + `#F85E10` Signal Orange anodized accents).
  - Asymmetric 12-column Swiss editorial grids with stretched `Orbitron` display watermarks (`PLAY`, `MORE`, `PLAYBIT`) and technical monospace metadata (`/ 2026`).
- **Strict Anti-Bloat Rule**: Never introduce generic dark-mode cyberpunk neon gradients, stock gaming illustrations, or external 3D/WebGL model loaders unless explicitly asked. Hardware illustrations and interactive bays must preserve the crisp, layered CSS skeuomorphic aesthetic established in `ConsoleShowcase.tsx`.

---

## 2. Tech Stack & Commands

- **Framework**: React 18 + TypeScript (`~5.6.2`)
- **Build Tool**: Vite 5 (`vite.config.ts`)
- **Styling**: Tailwind CSS 3.4 (`tailwind.config.js` + `src/styles/globals.css`)
- **Utilities**: `clsx`, `tailwind-merge`, `lucide-react`

### Standard Commands

| Action | Command | Notes |
| :--- | :--- | :--- |
| **Install dependencies** | `pnpm install` (or `npm install`) | Keep lockfiles consistent |
| **Start dev server** | `pnpm run dev` | Runs on `0.0.0.0:3000` (or `5173` locally) |
| **Typecheck & Build** | `pnpm run build` | Runs `tsc -b && vite build` — must pass with `0` errors |
| **Preview production** | `pnpm run preview` | Serves production bundle on port `4173` |
| **Docker Up / Down** | `pnpm run docker:up` / `pnpm run docker:down` | Containerized execution via `docker-compose.yml` |

---

## 3. Directory Structure & Modularity Rules

```text
src/
├── main.tsx                        # Application entry point
├── App.tsx                         # Top-level page composition & section routing
├── config/
│   └── siteConfig.ts               # Single source of truth for copy, nav items, specs, and SKUs
├── styles/
│   └── globals.css                 # Tailwind directives, radial canvas background, stretched display classes
├── components/
│   ├── layout/                     # Structural wrappers (Header, HeroContainer, SectionContainer, Footer)
│   └── ui/                         # Reusable atomic primitives (Button, Typography, Badge, SpecTable)
└── features/
    ├── landing/                    # HeroSection, ConsoleShowcase, BackgroundWatermark
    ├── anatomy/                    # (Planned) Interactive exploded hardware view & hotspots
    ├── games/                      # (Planned) Cartridge ecosystem & live console screen previewer
    ├── specs/                      # (Planned) Swiss engineering datasheet & benchmark matrix
    └── store/                      # (Planned) Colorway configurator & bundle selector
```

### Architectural Principles for Agents
1. **Centralized Content (`src/config/siteConfig.ts`)**:
   - Do not hardcode marketing copy, specification strings, cartridge metadata, or bundle prices inside JSX components. Export strongly-typed configuration objects from `src/config/siteConfig.ts` (or dedicated domain data files under `src/config/`).
2. **Feature-Scoped Components (`src/features/*`)**:
   - Group complex domain sections (e.g., `ConsoleShowcase`, `HardwareAnatomy`, `GameLibrary`, `SpecMatrix`, `StoreConfigurator`) inside `src/features/<domain>/`.
   - Keep atomic UI primitives (`Button`, `DisplayText`, `SectionHeader`, `HotspotPin`) inside `src/components/ui/`.
3. **Pure-CSS Hardware Fidelity**:
   - When extending `ConsoleShowcase.tsx` (such as adding live screen gameplay loops, power LED states, interactive D-pad/A/B button presses, or colorway themes), preserve the layered DOM structure, realistic multi-stop gradients, and specular `inset` box shadows.

---

## 4. Design System & Token Reference

Always use the configured Tailwind tokens from `tailwind.config.js` or the exact industrial hex codes documented in `README.md`:

### Colors
- **Canvas Background**: `bg-canvas-light` (`#CEC8C2`) / `bg-canvas` (`#C4BDB7`) with radial gradient in `globals.css`
- **Primary Signal Orange**: `text-accent` / `bg-accent` (`#F85E10`), hover `#e04f06`, gradient stops `#FF7124` → `#F85E10` → `#C84304`
- **Console Shell Ivory**: `#FBF8F3` → `#F2ECE1` → `#E5DDD0` (`bg-console-cream`)
- **Primary Carbon Ink**: `text-ink-primary` (`#181615`)
- **Secondary Slate Copy**: `text-ink-secondary` (`#4A4643`)
- **Muted Technical Ink**: `text-ink-muted` (`#3A3633`)
- **Background Watermark**: `text-watermark` (`#B5AEA8` / `#C4BEB8`)

### Typography
- **`font-display` (`Orbitron`)**: Used exclusively for oversized background watermarks (`PLAYBIT`) and stretched hero anchors (`PLAY`, `MORE`) paired with `.font-display-stretched` or `.font-display-stretched-right`.
- **`font-headline` (`Plus Jakarta Sans` / `Space Grotesk`)**: Uppercase editorial headers, `tracking-tight`, `leading-[1.08]`.
- **`font-mono` (`Space Mono`)**: Index markers (`/ 2026`, `01 // ANATOMY`), hardware tolerances, FPS counters, and prices.
- **`font-sans` (`Plus Jakarta Sans`)**: Body descriptions and UI labels.

---

## 5. Roadmap & Section Implementation Guidelines

When asked to expand the landing page into the full website described in `README.md`, implement sections in alignment with the 4 navigation pillars (`Console`, `Games`, `Specs`, `Store`):

1. **Navigation & State Synchronization (`Header.tsx`)**:
   - Clicking `Console`, `Games`, `Specs`, or `Store` in the top pill navigation should smoothly scroll to or switch the active section and update the active orange pill state.
2. **Interactive Console Screen (`ConsoleShowcase.tsx`)**:
   - The 3.5" OLED screen container (`h-[47%] rounded-[22px]`) can accept an optional `activeGame` or `screenMode` prop (`'off' | 'boot' | 'gameplay' | 'synth'`) so clicking games in the `#games` section or pressing buttons on the console visually updates the screen in real time.
3. **Interactive Hardware Anatomy (`#console-anatomy`)**:
   - Highlight the 5 hardware layers (Gorilla Glass Lens, 3.5" 120Hz OLED, CNC Polycarbonate Unibody, ALPS Tactile Matrix, 4,200 mAh Li-Po + FPGA Mainboard) with numbered monospace hotspots (`01`–`05`).
4. **Game Library & Cartridge Bay (`#games`)**:
   - Present the launch titles (*CHRONO DRIFT '86*, *ORBITAL VANGUARD*, *DUNGEON SYNTHESIS*, *POCKET LABS SYNTH*) as physical micro-cartridge cards with frame-rate badges (`60 FPS`, `120Hz BFI`), genre tags, and a "Load Cartridge" action that previews the title on the console screen.
5. **Engineering Datasheet (`#specs`)**:
   - Format the `PLAYBIT MK-I // HARDWARE DATASHEET (REV 2026.04)` as a high-contrast Swiss technical grid with bordered cells, monospace keys, and interactive benchmark comparisons.
6. **Edition Configurator & Store (`#store`)**:
   - Support live colorway switching (**01 / Signal Orange & Bone**, **02 / Stealth Graphite & Acid Yellow**, **03 / Translucent Smoke & Cobalt**) and bundle selection (**Core Unit `$199`**, **Collector's Pack `$269`**, **Studio DevKit `$349`**) with an interactive pre-order drawer/modal (never use `window.alert`).

---

## 6. Code Quality & Verification Checklist

Before completing any task, agents must verify:
- [ ] **TypeScript Strictness**: No implicit `any`, unused variables, or broken imports (`pnpm run build` passes cleanly).
- [ ] **Responsive Integrity**: Layouts must remain balanced across mobile (`<640px`), tablet (`768px–1024px`), and widescreen (`1600px`) viewports without horizontal overflow.
- [ ] **Interactive Restraint**: No `window.alert`, `window.confirm`, or `window.open` calls; use in-page drawers, modals, or inline status banners.
- [ ] **Visual Consistency**: All new cards, tables, and controls match the warm studio concrete surface, thin subtle borders (`border-black/10` or `border-white/50`), and Signal Orange (`#F85E10`) accents.
