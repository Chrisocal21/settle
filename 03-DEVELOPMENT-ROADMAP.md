# Settle: Development Roadmap

> From zero to playable, phase by phase

---

## Overview

This roadmap breaks development into manageable phases. Each phase results in something playable/testable. Total estimated time: **8-12 weeks** for MVP, working evenings/weekends.

```
Phase 0: Setup (Day 1)
    ↓
Phase 1: Core Grid (Week 1-2)
    ↓
Phase 2: Card System (Week 2-3)
    ↓
Phase 3: Resource Flow (Week 3-4)
    ↓
Phase 4: Game Loop (Week 4-5)
    ↓
Phase 5: Survival Mode (Week 5-6)
    ↓
Phase 6: Polish & PWA (Week 6-7)
    ↓
Phase 7: Additional Modes (Week 8+)
    ↓
Phase 8: Launch Prep (Week 9-10)
```

---

## Phase 0: Project Setup ✅ COMPLETE
**Time: 1-2 hours** | **Actual: 1 hour**

### Tasks

- [x] Create GitHub repository
- [x] Initialize Vite + React + TypeScript project
- [x] Install core dependencies
- [x] Configure Tailwind CSS
- [x] Set up ESLint + Prettier (deferred)
- [x] Configure VS Code workspace
- [x] Create folder structure
- [ ] Deploy "Hello World" to Vercel (deferred to Phase 6)
- [x] Verify local development works

### Commands

```bash
# Create project
npm create vite@latest settle -- --template react-ts
cd settle

# Install dependencies
npm install zustand immer
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint prettier eslint-config-prettier
npm install -D @types/node

# Initialize Tailwind
npx tailwindcss init -p

# Initialize Git
git init
git add .
git commit -m "Initial setup"

# Connect to GitHub and deploy
# (Follow Vercel dashboard)
```

### Deliverable
✅ Local development environment running with Vite HMR

### Definition of Done
- [x] App loads at localhost:5173
- [x] No console errors
- [x] Hot module replacement works
- [x] TypeScript compilation working
- [x] Tailwind CSS configured with custom theme colors

### What Was Built
- Complete Vite + React 18 + TypeScript setup
- Tailwind CSS with custom game color palette (cream, nature, survival, power, etc.)
- Zustand state management configured
- Project structure: src/components, src/store, src/types
- Type definitions in game.ts (Position, Tile, PlacedCard, ResourceType, etc.)

### Blockers
None - this is the starting point

---

## Phase 1: Core Grid System ✅ COMPLETE (Enhanced)
**Time: 1 week** | **Actual: 3 hours**

### Goals
- Render a grid of tiles ✅
- Tiles can be revealed/hidden ✅ (all revealed for world map)
- Basic terrain types ✅ (removed for clean aesthetic)
- Click to interact ✅
- **BONUS:** Fullscreen grid with mobile gestures ✅
- **BONUS:** Drag-and-drop card system ✅
- **BONUS:** 3-tier resource nodes ✅
- **BONUS:** Trading card modals ✅

### Tasks

- [x] Create `Tile` component with states (hidden, revealed, occupied)
- [x] Create `Grid` component that renders 30x30 tiles
- [x] Implement terrain generation (randomized, all revealed)
- [x] Add drag-and-drop support for tile interactions
- [x] Implement tile selection and highlighting
- [x] Add coordinate display on each tile
- [x] Add terrain icons/colors (removed for clean grid aesthetic)
- [x] Click to reveal hidden tiles (switched to fully revealed world map)
- [x] Mobile touch support (with swipe gestures for menus)
- [x] Grid scales responsively (fullscreen design)
- [x] **BONUS:** Implement resource node generation with tiers
- [x] **BONUS:** Add trading card-style modals
- [x] **BONUS:** Floating menu buttons with slide-in panels

### Key Files

```
src/
├── components/game/
│   ├── Grid.tsx         # 30x30 grid with drag-drop, tile selection
│   ├── Tile.tsx         # Individual tile with card display, tier indicators
│   ├── Hand.tsx         # Player's building cards
│   ├── ResourceBar.tsx  # Resource display panel
│   └── CardModal.tsx    # Trading card-style detail view
├── store/gameStore.ts   # Zustand state management
├── types/game.ts        # All TypeScript interfaces
├── App.tsx              # Main app with gesture support
└── index.css            # Tailwind + custom styles
```

### Types Implemented

```typescript
// src/types/game.ts

type TerrainType = 'plains' | 'forest' | 'mountain' | 'water' | 'fertile';
type TileState = 'hidden' | 'revealed' | 'occupied';

interface Tile {
  position: { x: number; y: number };
  terrain: TerrainType;
  state: TileState;
  cardId?: string;
}

interface PlacedCard {
  instanceId: string;
  definitionId: string;
  position: Position;
  isStationary?: boolean;
  tier?: number; // 1-3 for resource quality
}
```

### Deliverable
✅ **Fully functional grid with resource nodes and building system**

### Definition of Done
- [x] 30×30 grid renders without layout issues
- [x] Fullscreen design with scrollable overflow
- [x] Resource nodes display with tier indicators (1-3 stars)
- [x] Click opens trading card modal with details
- [x] Touch gestures work (swipe up/down for menus)
- [x] No React warnings in console
- [x] Grid responsive on all screen sizes
- [x] Drag-and-drop working for card placement
- [x] Visual feedback for tile selection

### What Was Actually Built
1. **Grid System**: 30x30 scrollable grid with coordinate display
2. **Resource Nodes**: Auto-generated with 3-tier rarity system
   - Tier 1 (Common): 50% spawn rate, 100% yield, gray border
   - Tier 2 (Uncommon): 35% spawn rate, 150% yield, blue border
   - Tier 3 (Rare): 15% spawn rate, 200% yield, gold border
3. **Resource Types**: Water sources, iron ore, coal, stone quarries
4. **UI/UX Enhancements**:
   - Floating action buttons (💎 resources, 🏭 buildings)
   - Slide-in panels for resources and hand
   - Mobile gesture support (swipe up/down)
   - Touch-optimized drag-and-drop
5. **Trading Card System**: Pokemon/Magic-style modals with:
   - Gradient borders matching card tier
   - Card art section with emoji
   - Stats display (Tier, Yield percentage)
   - Upgrade button for resource nodes
   - 3 upgrade slots for future expansions

### Blockers
- Cannot start Phase 2 until grid state management is solid
- Must test on actual mobile device before proceeding

---

## Phase 2: Card System ✅ COMPLETE (Enhanced)
**Time: 1 week** | **Actual: 2 hours**

### Goals
- Define card data structure ✅
- Render card components ✅
- Implement card hand ✅
- Drag and drop cards onto grid ✅
- **BONUS:** Trading card modal system ✅
- **BONUS:** Resource node upgrade system ✅

### Tasks

- [x] Define `CardDefinition` type
- [x] Create initial building cards (7 types)
- [x] Create `Card` component with visual design
- [x] Create `Hand` component with drag support
- [x] Implement drag-and-drop (mouse + touch)
- [x] Validate placement rules (no overlap)
- [x] Visual feedback for valid/invalid placement (ring highlights)
- [x] Place card on grid
- [x] **BONUS:** Implement CardModal for detailed view
- [x] **BONUS:** Add upgrade system for resource nodes

### Implemented Cards

| Card | Category | Visual | Function |
|------|----------|--------|----------|
| Miner | Extraction | ⛏️ | Extracts resources from deposits |
| Smelter | Processing | 🔥 | Processes ore into refined materials |
| Foundry | Processing | 🏭 | Advanced metalworking facility |
| Constructor | Manufacturing | �️ | Assembles components |
| Power Plant | Utility | ⚡ | Generates electricity |
| Conveyor | Logistics | ➡️ | Transports materials between buildings |
| Splitter | Logistics | ⚡ | Divides resource flow |

### Resource Nodes (Auto-generated)

| Node | Visual | Tiers | Purpose |
|------|--------|-------|---------|
| Water Source | 💧 | 1-3 | Provides water resources |
| Iron Ore Deposit | ⛏️ | 1-3 | Iron ore extraction |
| Coal Deposit | 🪨 | 1-3 | Fuel for smelters |
| Stone Quarry | 🗿 | 1-3 | Construction materials |

### Key Files

```
src/
├── components/game/
│   ├── Card.tsx         # (N/A - cards shown in Hand)
│   ├── Hand.tsx         # Card hand with drag support
│   ├── CardModal.tsx    # Trading card detail view
│   ├── Tile.tsx         # Shows placed cards
│   └── Grid.tsx         # Handles drop events
├── store/gameStore.ts   # Card placement logic
├── types/game.ts        # CardDefinition, PlacedCard
└── data/               # (Future: card database)
```

### Trading Card Modal Features
- **Gradient borders** matching card type/tier
- **Tier badges** (Common/Uncommon/Rare) with star ratings
- **Stats display**: Tier level and Yield/Efficiency percentage
- **Card art section** with emoji and holographic overlay
- **Upgrade slots**: 3 empty slots for future upgrades
- **Resource nodes**: Special "Place Miner Here" upgrade button
- **Click-anywhere-to-close** with backdrop blur

### Deliverable
✅ Functional card system with drag-and-drop placement and trading card modals

### Definition of Done
- [x] Can drag card from hand with mouse
- [x] Can drag card from hand with touch
- [x] Invalid placement prevented (occupied tiles)
- [x] Visual feedback for tile selection (green ring)
- [x] Card snaps to grid on release
- [x] Cards movable between tiles after placement
- [x] Placement rules enforced (resource nodes immovable)
- [x] Drag interaction smooth and responsive
- [x] Trading card modal opens on click
- [x] Modal shows tier information and stats
- [x] Resource node upgrade system functional

---

## Phase 3: Resource Flow System
**Time: 1 week**

### Goals
- Resources as first-class concept
- Visual connections between cards
- Resources flow from outputs to inputs
- Display resource counts

### Tasks

- [ ] Define resource types
- [ ] Create `ResourceBar` component (top of screen)
- [ ] Implement connection detection (adjacent cards)
- [ ] Create `Connection` component (visual lines)
- [ ] Animate resource flow along connections
- [ ] Calculate net production/consumption
- [ ] Display +/- rates per resource

### Resource Types (MVP)
### Definition of Done
- [ ] Resource bar shows all resource counts
- [ ] Counts update in real-time
- [ ] Visual lines connect adjacent cards
- [ ] Animation shows flow direction
- [ ] Production rates displayed (+2/s, etc.)
- [ ] Consumption shown with negative numbers
- [ ] No performance issues with 10+ connections
- [ ] Works on mobile (test animations don't lag)

### Blockers
- Requires Phase 2 card placement to be working
- Connection algorithm must be efficient (test with many cards)


| Resource | Icon | Category |
|----------|------|----------|
| Water | 💧 | Basic |
| Food | 🌾 | Basic |
| Wood | 🪵 | Basic |
| Stone | 🪨 | Basic |
| Power | ⚡ | Basic |
| Iron Ore | ⛏️ | Raw |
| Iron | 🔩 | Processed |
| Lumber | 📦 | Processed |

### Key Files

```
src/
├── components/game/ResourceBar.tsx
├── components/game/Connection.tsx
├── game/resources.ts
├── game/connections.ts
├── game/production.ts
└── types/resources.ts
```

### Deliverable
✅ Place connected cards, see resources flow visually

---

## Phase 4: Game Loop & Manual Gathering
**Time: 1 week**

### Goals
- Time-based game loop (ticks)
- Manual resource gathering (early game)
### Definition of Done
- [ ] Game ticks at consistent rate (10 tps)
- [ ] Resources accumulate each tick
- [ ] Manual gathering adds resources on click
- [ ] Gathering has visual/audio feedback
- [ ] Game continues running in background
- [ ] Pause button works (freezes ticks)
- [ ] State persists across page refresh
- [ ] No memory leaks after 5 minutes running
- [ ] Performance: stable 60fps on mid-tier phone

### Blockers
- Requires Phase 3 resource system complete
- Must resolve any performance issues before Phase 5

- Transition from manual to automated
- Basic game state management

### Tasks

- [ ] Implement game engine with tick system
- [ ] Manual gathering: click terrain to get resources
- [ ] Gathering has cooldown
- [ ] Resources accumulate over time from cards
- [ ] Population system basics
- [ ] Turn counter / time elapsed
- [ ] Pause/resume functionality
- [ ] Auto-save to localStorage

### Game Loop (10 ticks/second)

```
Each tick:
1. Calculate all card outputs
2. Flow resources through connections
3. Calculate consumption (population needs)
4. Update resource totals
5. Check for shortages
6. Update population happiness
7. Auto-save (debounced)
```

### Key Files

```
src/
├── game/engine.ts
├── game/gathering.ts
├── game/population.ts
├── store/gameStore.ts
└── hooks/useGame.ts
```

### Deliverable
✅ Functional game loop with manual gathering → automation progression

---

## Phase 5: Survival Mode (MVP Complete)
### Definition of Done
- [ ] Can play from start to game over
- [ ] Game over triggers correctly
- [ ] Final score calculated and displayed
- [ ] Can restart and play again
- [ ] No way to "break" the game state
- [ ] Friend can play for 10+ minutes without confusion
- [ ] Fun to play (subjective but critical!)
- [ ] Balance feels fair (not too easy/hard)

### User Acceptance Test
**Give to 2-3 people:**
1. Can they figure out how to play without instructions?
2. Do they play for 5+ minutes?
3. Do they understand why they lost?
4. Do they want to try again?

**If any answer is "no", fix before Phase 6.**

### Blockers
- ALL previous phases must be solid
- This is the "can I ship this?" checkpoint

**Time: 1 week**

### Goals
- Complete playable game mode
- Win/lose conditions
- Difficulty scaling
- Game over screen
- High score tracking

### Tasks

- [ ] Population needs: food, water per person
- [ ] Population grows when needs met
- [ ] Population declines when needs unmet
- [ ] Game over when population = 0
- [ ] Seasonal events (optional: winter = less food)
- [ ] Random events (drought, storm) (optional for MVP)
- [ ] Score calculation
- [ ] Game over screen with stats
- [ ] High score leaderboard (local)
- [ ] New game / restart flow

### Win Condition
- None (endless survival)
- Score = population × turns survived

### Lose Condition
- Population reaches 0

### Key Files
### Definition of Done
- [ ] Lighthouse PWA score > 90
- [ ] Installs on iOS Safari
- [ ] Installs on Android Chrome
- [ ] Works with airplane mode enabled
- [ ] Service worker updates on new deployment
- [ ] All assets cached for offline
- [ ] Tutorial completes in < 2 minutes
- [ ] No janky animations (test on old phone)
- [ ] Sounds can be muted
- [ ] Error states handled gracefully

### PWA Checklist (Critical)
- [ ] `manifest.json` complete and valid
- [ ] Icons: 192×192 and 512×512
- [ ] Service worker registered
- [ ] HTTPS enabled (Vercel does this automatically)
- [ ] Viewport meta tag configured
- [ ] Theme color matches app
- [ ] Tested install flow on iOS and Android

### Blockers
- Requires MVP from Phase 5 to be stable
- Don't add polish if core game has bugs


```
src/
├── modes/survival.ts
├── game/events.ts
├── game/scoring.ts
├── components/screens/GameOver.tsx
└── store/progressStore.ts
```

### Deliverable
✅ **Complete MVP** - Playable survival mode from start to game over

---

## Phase 6: Polish & PWA
**Time: 1 week**

### Goals
- Installable PWA
- Works fully offline
- Responsive design
- Audio feedback
- Visual polish

### Tasks

- [ ] Configure Vite PWA plugin
- [ ] Create app icons (192, 512)
- [ ] Test offline functionality
- [ ] Service worker caching
- [ ] Add to home screen prompt
- [ ] Mobile-first responsive layout
- [ ] Touch optimization
- [ ] Add sound effects (placement, production, alerts)
- [ ] Add subtle animations
- [ ] Loading states
- [ ] Error boundaries
- [ ] Tutorial / first-time user experience

### PWA Checklist

- [ ] manifest.json complete
- [ ] Service worker registered
- [ ] Offline page works
- [ ] Icons all sizes
- [ ] Theme color set
- [ ] Lighthouse PWA score > 90

### Key Files

```
src/
├── hooks/useAudio.ts
├── hooks/useOffline.ts
├── components/ui/Tutorial.tsx
├── components/ui/LoadingScreen.tsx
public/
├── manifest.json
├── icons/
└── sounds/
```

### Deliverable
✅ Polished, installable PWA that works on airplane mode

---

## Phase 7: Additional Game Modes
**Time: 2-3 weeks**

### Builder Mode (Week 1)

- [ ] Sandbox with no fail state
- [ ] Unlimited/slow resource generation
- [ ] All cards available
- [ ] Save/load settlements
- [ ] No pressure, pure creativity

### Puzzle Mode (Week 2)

- [ ] Level data structure
- [ ] Create 10 tutorial puzzles
- [ ] Limited cards, specific goals
- [ ] Star rating system
- [ ] Level select screen
- [ ] Progress tracking

### Campaign Mode (Future)

- [ ] Scenario data structure
- [ ] Story/dialogue system
- [ ] Branching choices
- [ ] 25-35 scenarios across 5 acts
- [ ] Persistent unlocks

### Key Files

```
src/
├── modes/builder.ts
├── modes/puzzle.ts
├── modes/campaign.ts
├── data/puzzles/
├── data/campaign/
└── components/screens/LevelSelect.tsx
```

### Deliverable
✅ 3 playable modes with distinct experiences

---

## Phase 8: Launch Preparation
**Time: 1 week**

### Tasks

- [ ] Final bug fixes
- [ ] Performance optimization
- [ ] Lighthouse audit (target: all 90+)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Write README
- [ ] Create landing page / preview
- [ ] Social sharing meta tags
- [ ] Analytics setup (optional)
- [ ] Feedback mechanism

### Launch Checklist

- [ ] Domain configured (if custom)
- [ ] SSL working
- [ ] No console errors
- [ ] Works on: Chrome, Firefox, Safari, Edge
- [ ] Works on: iOS Safari, Android Chrome
- [ ] Works offline
- [ ] Installable as PWA
- [ ] Performance acceptable on mid-tier phones

### Marketing (Optional)

- [ ] Gameplay GIF/video
- [ ] Screenshots
- [ ] Post to r/webdev, r/indiegaming
- [ ] Tweet/post on socials
- [ ] Submit to PWA directories

### Deliverable
✅ **Public launch** of Settle

---

## Post-Launch Roadmap

### Version 1.1 (Month 2)
- More cards (20 → 40)
- More puzzle levels (10 → 30)
- Balance adjustments based on feedback
- Bug fixes

### Version 1.2 (Month 3)
- Campaign mode Act 1
- Achievements system
- Daily challenges

### Version 1.3 (Month 4+)
- Cloud save (optional account)
- Leaderboards
- Settlement sharing
- Community puzzles

---

## Time Estimates Summary

| Phase | Estimated Time | Cumulative |
|-------|----------------|------------|
| 0: Setup | 2 hours | Day 1 |
| 1: Grid | 1 week | Week 1 |
| 2: Cards | 1 week | Week 2 |
| 3: Resources | 1 week | Week 3 |
| 4: Game Loop | 1 week | Week 4 |
| 5: Survival Mode | 1 week | Week 5 |
| 6: Polish & PWA | 1 week | Week 6 |
| **MVP Complete** | | **~6 weeks** |
| 7: More Modes | 2-3 weeks | Week 8-9 |
| 8: Launch | 1 week | Week 10 |
| **Full Launch** | | **~10 weeks** |

---

## Progress Tracking Template

Copy this to track your progress:

```markdown
## My Progress

### Phase 0: Setup
- [x] Create GitHub repo
- [ ] Initialize project
- [ ] Deploy to Vercel
Started: ___  Completed: ___

### Phase 1: Grid
- [ ] Tile component
- [ ] Grid component
- [ ] Terrain types
- [ ] Click to reveal
Started: ___  Completed: ___

(... continue for each phase)
```

---

## Document Info

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Chris + Claude  
**Status:** Ready to Execute
