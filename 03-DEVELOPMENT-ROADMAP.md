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

## Phase 0: Project Setup
**Time: 1-2 hours**

### Tasks

- [ ] Create GitHub repository
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install core dependencies
- [ ] Configure Tailwind CSS
- [ ] Set up ESLint + Prettier
- [ ] Configure VS Code workspace
- [ ] Create folder structure
- [ ] Deploy "Hello World" to Vercel
- [ ] Verify deployment pipeline works

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
✅ Empty app deployed to `settle-game.vercel.app` (or similar)

### Definition of Done
- [ ] App loads at public URL
- [ ] No console errors
- [ ] Vercel auto-deploys on git push
- [ ] README updated with deployment URL

### Blockers
None - this is the starting point

---

## Phase 1: Core Grid System
**Time: 1 week**

### Goals
- Render a grid of tiles
- Tiles can be revealed/hidden
- Basic terrain types
- Click to interact

### Tasks

- [ ] Create `Tile` component with states (hidden, revealed, occupied)
- [ ] Create `Grid` component that renders NxN tiles
- [ ] Implement terrain types (plains, forest, mountain, water, fertile)
- [ ] Add terrain icons/colors
- [ ] Click to reveal hidden tiles
- [ ] Mobile touch support
- [ ] Grid scales responsively

### Key Files

```
src/
├── components/game/Grid.tsx
├── components/game/Tile.tsx
├── game/grid.ts
├── types/grid.ts
└── data/terrain.ts
```

### Types

```typescript
// src/types/grid.ts

type TerrainType = 'plains' | 'forest' | 'mountain' | 'water' | 'fertile';
type TileState = 'hidden' | 'revealed' | 'occupied';

interface Tile {
  position: { x: number; y: number };
  terrain: TerrainType;
  state: TileState;
  card?: PlacedCard;
}

interface Grid {
  width: number;
  height: number;
  tiles: Tile[][];
}
```

### Deliverable
✅ Playable grid where you can click to reveal terrain

### Definition of Done
- [ ] 6×6 grid renders without layout issues
- [ ] All terrain types display correctly
- [ ] Click reveals tiles (desktop)
- [ ] Touch reveals tiles (mobile - test on real device)
- [ ] No React warnings in console
- [ ] Grid responsive on 320px to 1920px widths
- [ ] Passes to friend for "click test" - should be intuitive

### Blockers
- Cannot start Phase 2 until grid state management is solid
- Must test on actual mobile device before proceeding

---

## Phase 2: Card System
**Time: 1 week**

### Goals
- Define card data structure
- Render card components
- Implement card hand
- Drag and drop cards onto grid

### Tasks

- [ ] Define `CardDefinition` type
- [ ] Create 10 starter cards (2 per category)
- [ ] Create `Card` component with visual design
- [ ] Create `CardHand` component
- [ ] Implement drag-and-drop (mouse + touch)
- [ ] Validate placement rules
- [ ] Visual feedback for valid/invalid placement
- [ ] Place card on grid

### Starter Cards

| Card | Category | Tier | Inputs | Outputs |
|------|----------|------|--------|---------|
| Well | Survival | 1 | - | Water |
| Farm | Survival | 1 | Water | Food |
| Campfire | Power | 1 | Wood | Heat/Light |
| Windmill | Power | 1 | - | Power |
| Lumber Mill | Extraction | 1 | - | Wood |
| Quarry | Extraction | 1 | Power | Stone |
| Smelter | Processing | 1 | Ore, Power | Iron |
| Sawmill | Processing | 1 | Wood | Lumber |
| Tent | Civilization | 1 | - | +1 Pop Cap |
| House | Civilization | 1 | Lumber, Stone | +4 Pop Cap |

### Key Files

### Definition of Done
- [ ] Can drag card from hand with mouse
- [ ] Can drag card from hand with touch (test on real device)
- [ ] Invalid placement shows red indicator
- [ ] Valid placement shows green indicator
- [ ] Card snaps to grid on release
- [ ] Card returns to hand if dropped outside grid
- [ ] Placement rules enforced (e.g., well near water)
- [ ] "Feel" of drag is smooth (< 16ms frame time)

### Blockers
- Requires Phase 1 grid to be complete
- Touch drag is complex - budget extra time if first time implementing

```
src/
├── components/game/Card.tsx
├── components/game/CardHand.tsx
├── game/cards.ts
├── types/cards.ts
├── data/cards/starter.json
└── hooks/useDrag.ts
```

### Deliverable
✅ Drag cards from hand onto grid with placement validation

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
