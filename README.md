# Settle - Game Documentation

> Build civilization one card at a time

---

## 📁 Document Index

| File | Purpose | Read When |
|------|---------|-----------|
| **[00-QUICK-START.md](./00-QUICK-START.md)** | Get running in 30 minutes | First! Start here. |
| **[01-GAME-DESIGN-DOCUMENT.md](./01-GAME-DESIGN-DOCUMENT.md)** | Full game vision, mechanics, modes | Understanding the game |
| **[02-TECHNICAL-ARCHITECTURE.md](./02-TECHNICAL-ARCHITECTURE.md)** | Stack, structure, code patterns | Building the code |
| **[03-DEVELOPMENT-ROADMAP.md](./03-DEVELOPMENT-ROADMAP.md)** | Phase-by-phase build plan | Planning your work |
| **[04-EXTERNAL-RESOURCES.md](./04-EXTERNAL-RESOURCES.md)** | Tools, libraries, assets, learning | Finding resources |
| **[05-CARD-DATABASE.md](./05-CARD-DATABASE.md)** | All 47 card definitions | Implementing cards |
| **[06-TROUBLESHOOTING.md](./06-TROUBLESHOOTING.md)** | Common errors and solutions | When things break |

---

## 🎮 What is Settle?

Settle is a browser-based, offline-capable card game where you build a civilization from scratch. It combines:

- **Manual gathering** → Tap resources to collect them
- **Card placement** → Build structures on a grid
- **Resource chains** → Connect outputs to inputs
- **Population growth** → Keep your people alive and happy

Think: Satisfactory meets card games, playable in your browser.

---

## 🚀 Quick Start

```bash
# Already set up! Run the dev server:
npm run dev

# Opens at http://localhost:5173
```

**Current Status:** ✅ Phases 0-2 Complete, Phase 3 In Progress (75%)

**What's Working:**
- ✅ Fullscreen grid-based world map (30×30 scrollable)
- ✅ Drag-and-drop card placement system
- ✅ 3-tier resource node generation (Common/Uncommon/Rare)
- ✅ Trading card-style detail modals
- ✅ Resource production with tier multipliers (1x/2x/3x)
- ✅ Storage system (Miners: 100, Storage buildings: 500/1000/2000)
- ✅ Manual resource collection (click miners to collect)
- ✅ Player inventory UI (1000 capacity popup modal)
- ✅ Auto-transfer to adjacent storage (at 80% capacity)
- ✅ Processing buildings (Smelters, Foundries) with recipes
- ✅ Drag-to-connect conveyor system (Shift+Click)
- ✅ Visual connection lines (green dashed SVG overlay)
- ✅ Game tick loop (1 second intervals)
- ✅ Mobile gesture support (swipe for menus)

**What's Next:**
- ⏳ Enhanced conveyor logic (speed variations, visual flow)
- ⏳ More processing recipes and building types
- ⏳ Population & survival mechanics
- ⏳ Building upgrades and tech tree
- ⏳ Win/lose conditions

See [00-QUICK-START.md](./00-QUICK-START.md) for setup and [03-DEVELOPMENT-ROADMAP.md](./03-DEVELOPMENT-ROADMAP.md) for detailed progress.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| State | Zustand |
| Styling | Tailwind CSS |
| Build | Vite |
| Hosting | Vercel / Cloudflare Pages |
| Offline | PWA (vite-plugin-pwa) |

---

## 🎯 Game Modes

1. **🏕️ Survival** - Keep population alive as long as possible
2. **🏗️ Builder** - Sandbox, no fail state, pure creativity
3. **🧩 Puzzle** - Solve challenges with limited cards
4. **🏆 Campaign** - Story-driven scenarios (future)

---

## 📅 Development Timeline

| Phase | Time | Deliverable |
|-------|------|-------------|
| 0: Setup | Day 1 | Project deployed |
| 1: Grid | Week 1 | Clickable terrain |
| 2: Cards | Week 2 | Drag-and-drop cards |
| 3: Resources | Week 3 | Flow visualization |
| 4: Game Loop | Week 4 | Ticking production |
| 5: Survival | Week 5 | **Playable MVP** |
| 6: Polish | Week 6 | PWA + audio |
| 7: Modes | Week 7-8 | Builder + Puzzle |
| 8: Launch | Week 9 | Public release |

---

## 📦 Card Categories

| Category | Cards | Purpose |
|----------|-------|---------|
| 🌲 Nature | 5 | Terrain, starting resources |
| 🏕️ Survival | 8 | Food, water, shelter |
| ⚡ Power | 6 | Energy generation |
| ⛏️ Extraction | 6 | Raw material gathering |
| 🔨 Processing | 8 | Refining resources |
| 🏛️ Civilization | 8 | Population, victory |
| 🔧 Utility | 6 | Logistics, boosters |

Total: **47 cards** defined

---

## ✅ Is This Doable?

**Yes.** This project is specifically designed for:

- ✅ VS Code + Copilot workflow
- ✅ Single developer
- ✅ Evenings/weekends (8-12 weeks)
- ✅ Free hosting (Vercel/Cloudflare)
- ✅ No backend required
- ✅ Offline-first PWA

The scope is deliberately constrained. Start with survival mode, expand from there.

---

## 📝 License

MIT License - Do whatever you want with it.

---

## 🤝 Created With

- Game concept: Chris
- Documentation: Claude
- Date: January 2026

Good luck building! 🏛️
