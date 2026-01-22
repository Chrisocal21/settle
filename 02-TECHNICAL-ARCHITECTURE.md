# Settle: Technical Architecture

> Stack, structure, and implementation guide

---

## 1. Technology Stack

### Core Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Framework** | React 18+ | Component model fits card UI, huge ecosystem |
| **Language** | TypeScript | Type safety prevents bugs, better Copilot suggestions |
| **State** | Zustand | Simple, fast, works offline, no boilerplate |
| **Styling** | Tailwind CSS | Rapid prototyping, consistent design system |
| **Build** | Vite | Fast dev server, optimized builds |
| **Hosting** | Vercel or Cloudflare Pages | Free tier, instant deploys, edge CDN |
| **PWA** | Vite PWA Plugin | Offline support, installable |

### Why This Stack?

1. **React + TypeScript:** Industry standard, Copilot excels at it
2. **Zustand over Redux:** Less boilerplate, easier to understand, perfect for game state
3. **Tailwind over CSS:** Faster iteration, no context-switching
4. **Vite over CRA:** 10x faster builds, modern defaults
5. **Vercel/Cloudflare:** Zero-config deploys, free SSL, global CDN

---

## 2. Project Structure

```
settle/
├── public/
│   ├── icons/                  # PWA icons (192, 512) - TODO
│   ├── sounds/                 # Audio files - TODO
│   └── manifest.json           # PWA manifest - TODO
│
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Grid.tsx        # ✅ 30×30 grid with drag-drop
│   │   │   ├── Tile.tsx        # ✅ Tiles with cards, tiers
│   │   │   ├── Hand.tsx        # ✅ Player's building cards
│   │   │   ├── CardModal.tsx   # ✅ Trading card detail view
│   │   │   ├── ResourceBar.tsx # ✅ Resource display panel
│   │   │   └── Connection.tsx  # TODO: Resource flow lines
│   │   │
│   │   ├── ui/                 # TODO: Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   └── screens/            # TODO: Game screens
│   │       ├── MainMenu.tsx
│   │       ├── GameScreen.tsx
│   │       └── Settings.tsx
│   │
│   ├── game/                   # TODO: Game logic modules
│   │   ├── engine.ts           # Core game loop
│   │   ├── resources.ts        # Resource flow calculations
│   │   ├── connections.ts      # Connection pathfinding
│   │   └── production.ts       # Production calculations
│   │
│   ├── modes/                  # TODO: Game mode implementations
│   │   ├── survival.ts
│   │   ├── builder.ts
│   │   └── puzzle.ts
│   │
│   ├── data/                   # TODO: Card & level data
│   │   ├── cards/              
│   │   └── puzzles/
│   │
│   ├── store/
│   │   ├── gameStore.ts        # ✅ Complete game state
│   │   ├── progressStore.ts    # TODO: Meta-progression
│   │   └── settingsStore.ts    # TODO: User preferences
│   │
│   ├── types/
│   │   └── game.ts             # ✅ All TypeScript interfaces
│   │
│   ├── hooks/                  # TODO: Custom React hooks
│   │   ├── useGame.ts
│   │   └── useDrag.ts
│   │
│   ├── utils/                  # TODO: Utilities
│   │   ├── storage.ts
│   │   └── pathfinding.ts
│   │
│   ├── App.tsx                 # ✅ Root with gesture support
│   ├── main.tsx                # ✅ Entry point
│   ├── index.css               # ✅ Tailwind + custom styles
│   └── vite-env.d.ts           # ✅ Vite types
│
├── index.html                  # ✅
├── package.json                # ✅
├── tsconfig.json               # ✅
├── tsconfig.node.json          # ✅
├── vite.config.ts              # ✅
├── tailwind.config.js          # ✅ Custom game colors
├── postcss.config.js           # ✅
└── README.md                   # ✅ Updated

✅ = Implemented
TODO = Planned for future phases
```

---

## 3. State Management

### Current Implementation Status

**✅ Phases 0-2 Complete** - Core systems operational:

#### Implemented Features
1. **Grid System** (30×30 tiles)
   - Scrollable fullscreen view
   - Terrain generation (randomized)
   - Coordinate display on each tile
   - Drag-and-drop support
   - Tile selection with visual feedback

2. **Resource Node Generation**
   - 3-Tier rarity system (Common/Uncommon/Rare)
   - Auto-placement on map initialization
   - 5 water sources, 4 iron ore, 4 coal, 3 stone
   - Stationary nodes (cannot be moved)
   - Tier affects yield: 100%/150%/200%

3. **Card System**
   - 7 building types (Miner, Smelter, Foundry, Constructor, Power Plant, Conveyor, Splitter)
   - Drag-and-drop from hand to grid
   - Cards movable between tiles
   - Placement validation (no overlap)
   - Resource nodes upgradeable to Miners

4. **UI/UX System**
   - Floating action buttons (💎 Resources, 🏗️ Buildings)
   - Slide-in panels with smooth animations
   - Mobile gesture support (swipe up/down)
   - Trading card-style modals
   - Backdrop blur effects

5. **State Management**
   - Zustand store with all game state
   - TypeScript interfaces for type safety
   - Immutable state updates
   - Grid and card synchronization

### Complete Type Definitions Reference

Copy these to your project for full type safety:

```typescript
// src/types/game.ts - Implemented types

// ============= Position & Grid =============

export interface Position {
  x: number;
  y: number;
}

export type TerrainType = 
  | 'plains' 
  | 'forest' 
  | 'mountain' 
  | 'water' 
  | 'fertile';

export type TileState = 'hidden' | 'revealed' | 'occupied';

export interface Tile {
  position: Position;
  terrain: TerrainType;
  state: TileState;
  cardId?: string;
}

// ============= Resources =============

export type ResourceType = 
  | 'water'
  | 'food'
  | 'wood'
  | 'stone'
  | 'coal'
  | 'iron_ore'
  | 'iron_bars'
  | 'power'
  | 'lumber'
  | 'bricks'
  | 'tools';

export interface ResourceFlow {
  resource: ResourceType;
  amount: number;
  rate: number; // per second
}

export interface ResourceCost {
  resource: ResourceType;
  amount: number;
}

export type ResourceInventory = Record<ResourceType, number>;

// ============= Cards =============

export type CardCategory = 
  | 'nature'
  | 'survival'
  | 'power'
  | 'extraction'
  | 'processing'
  | 'civilization'
  | 'utility';

export interface CardDefinition {
  id: string;
  name: string;
  category: CardCategory;
  tier: number;
  cost: ResourceCost[];
  inputs: ResourceFlow[];
  outputs: ResourceFlow[];
  description: string;
  flavorText?: string;
  placementRules?: PlacementRule[];
}

export interface PlacedCard {
  instanceId: string;
  definitionId: string;
  position: Position;
}

export interface PlacementRule {
  type: 'terrain' | 'adjacent_to' | 'not_adjacent_to' | 'any';
  target?: TerrainType | string;
}

// ============= Game State =============

export type GameMode = 'survival' | 'builder' | 'puzzle' | 'campaign';

export interface GameConfig {
  mode: GameMode;
  gridWidth?: number;
  gridHeight?: number;
  difficulty?: 'easy' | 'normal' | 'hard';
  seed?: string;
}

// ============= Events =============

export interface GameEvent {
  id: string;
  type: 'drought' | 'storm' | 'disease' | 'discovery';
  severity: number;
  duration: number;
  effects: Record<string, number>;
}
```

### Game State (Zustand)

```typescript
// src/store/gameStore.ts

interface GameState {
  // Grid
  grid: Tile[][];
  gridSize: { width: number; height: number };
  
  // Cards
  hand: Card[];
  deck: Card[];
  placedCards: PlacedCard[];
  
  // Resources
  resources: Record<ResourceType, number>;
  production: Record<ResourceType, number>; // per second
  consumption: Record<ResourceType, number>; // per second
  
  // Population
  population: number;
  maxPopulation: number;
  happiness: number;
  
  // Game state
  mode: GameMode;
  turn: number;
  time: number; // seconds elapsed
  isPaused: boolean;
  isGameOver: boolean;
  
  // Actions
  placeTile: (card: Card, position: Position) => void;
  removeTile: (position: Position) => void;
  drawCard: () => void;
  gatherResource: (position: Position) => void;
  tick: (deltaTime: number) => void;
  startGame: (mode: GameMode, config?: GameConfig) => void;
  endGame: () => void;
}
```

### Persistence Strategy

```typescript
// src/utils/storage.ts

const STORAGE_KEYS = {
  CURRENT_GAME: 'settle_current_game',
  PROGRESS: 'settle_progress',
  SETTINGS: 'settle_settings',
  HIGH_SCORES: 'settle_high_scores',
};

// Auto-save on state change (debounced)
gameStore.subscribe(
  (state) => saveToLocalStorage(STORAGE_KEYS.CURRENT_GAME, state),
  { debounce: 1000 }
);

// Load on app start
const loadGame = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
  if (saved) {
    gameStore.setState(JSON.parse(saved));
  }
};
```

---

## 4. Core Systems

### Game Loop

```typescript
// src/game/engine.ts

class GameEngine {
  private lastTime: number = 0;
  private accumulator: number = 0;
  private readonly TICK_RATE = 1000 / 10; // 10 updates per second
  
  start() {
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }
  
  private loop(currentTime: number) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (!gameStore.getState().isPaused) {
      this.accumulator += deltaTime;
      
      while (this.accumulator >= this.TICK_RATE) {
        this.update(this.TICK_RATE / 1000);
        this.accumulator -= this.TICK_RATE;
      }
    }
    
    requestAnimationFrame(this.loop.bind(this));
  }
  
  private update(dt: number) {
    // 1. Calculate production
    const production = calculateProduction(gameStore.getState());
    
    // 2. Calculate consumption
    const consumption = calculateConsumption(gameStore.getState());
    
    // 3. Update resources
    gameStore.getState().tick(dt);
    
    // 4. Check win/lose conditions
    checkGameConditions();
    
    // 5. Process events (survival mode)
    processEvents(dt);
  }
}
```

### Card Definitions

```typescript
// src/game/cards.ts

interface CardDefinition {
  id: string;
  name: string;
  category: CardCategory;
  tier: number;
  cost: ResourceCost[];
  inputs: ResourceFlow[];
  outputs: ResourceFlow[];
  placementRules: PlacementRule[];
  description: string;
  flavorText?: string;
}

const CARDS: Record<string, CardDefinition> = {
  well: {
    id: 'well',
    name: 'Well',
    category: 'survival',
    tier: 1,
    cost: [{ resource: 'wood', amount: 2 }],
    inputs: [],
    outputs: [{ resource: 'water', amount: 1, rate: 1 }],
    placementRules: [{ type: 'adjacent_to', terrain: 'water' }],
    description: 'Produces water when placed near a water source.',
    flavorText: 'The foundation of life.',
  },
  
  farm: {
    id: 'farm',
    name: 'Farm',
    category: 'survival',
    tier: 1,
    cost: [{ resource: 'wood', amount: 3 }],
    inputs: [{ resource: 'water', amount: 1, rate: 0.5 }],
    outputs: [{ resource: 'food', amount: 2, rate: 1 }],
    placementRules: [{ type: 'terrain', terrain: 'fertile' }],
    description: 'Grows food. Requires water input.',
  },
  
  // ... more cards
};
```

### Connection System

```typescript
// src/game/connections.ts

interface Connection {
  from: Position;
  to: Position;
  resourceType: ResourceType;
  capacity: number;
  currentFlow: number;
}

function findValidConnections(
  placedCards: PlacedCard[],
  grid: Tile[][]
): Connection[] {
  const connections: Connection[] = [];
  
  for (const card of placedCards) {
    const outputs = card.definition.outputs;
    
    for (const output of outputs) {
      // Find adjacent cards that need this resource
      const neighbors = getAdjacentCards(card.position, placedCards);
      
      for (const neighbor of neighbors) {
        const matchingInput = neighbor.definition.inputs.find(
          (input) => input.resource === output.resource
        );
        
        if (matchingInput) {
          connections.push({
            from: card.position,
            to: neighbor.position,
            resourceType: output.resource,
            capacity: Math.min(output.rate, matchingInput.rate),
            currentFlow: 0,
          });
        }
      }
    }
  }
  
  return connections;
}
```

---

## 5. PWA Configuration

### Vite Config

```typescript
// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: 'Settle',
        short_name: 'Settle',
        description: 'Build civilization one card at a time',
        theme_color: '#F5F0E6',
        background_color: '#F5F0E6',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
          },
        ],
      },
    }),
  ],
});
```

### Offline Detection

```typescript
// src/hooks/useOffline.ts

import { useState, useEffect } from 'react';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOffline;
}
```

---

## 6. Performance Considerations

### Optimization Strategies

1. **Memoization**
   ```typescript
   // Memoize expensive calculations
   const production = useMemo(
     () => calculateProduction(placedCards, connections),
     [placedCards, connections]
   );
   ```

2. **Virtual Grid (for large grids)**
   ```typescript
   // Only render visible tiles
   const visibleTiles = useMemo(
     () => getVisibleTiles(grid, viewport),
     [grid, viewport]
   );
   ```

3. **Debounced Saves**
   ```typescript
   // Don't save on every state change
   const debouncedSave = useDebouncedCallback(saveGame, 1000);
   ```

4. **Web Workers (future)**
   ```typescript
   // Offload pathfinding to worker
   const pathWorker = new Worker('/workers/pathfinding.js');
   ```

### Target Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Frame Rate | 60fps | DevTools |
| Memory Usage | < 100MB | DevTools |
| Bundle Size | < 200KB gzip | Build output |

---

## 7. Testing Strategy

### Unit Tests (Vitest)

```typescript
// tests/game/production.test.ts

import { describe, it, expect } from 'vitest';
import { calculateProduction } from '@/game/production';

describe('Production System', () => {
  it('calculates basic farm output', () => {
    const state = createMockState({
      placedCards: [mockFarm({ hasWaterInput: true })],
    });
    
    const production = calculateProduction(state);
    
    expect(production.food).toBe(2);
  });
  
  it('returns zero when input missing', () => {
    const state = createMockState({
      placedCards: [mockFarm({ hasWaterInput: false })],
    });
    
    const production = calculateProduction(state);
    
    expect(production.food).toBe(0);
  });
});
```

### Component Tests (React Testing Library)

```typescript
// tests/components/Card.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@/components/game/Card';

describe('Card Component', () => {
  it('renders card name', () => {
    render(<Card card={mockWellCard} />);
    expect(screen.getByText('Well')).toBeInTheDocument();
  });
  
  it('calls onDragStart when dragged', () => {
    const onDragStart = vi.fn();
    render(<Card card={mockWellCard} onDragStart={onDragStart} />);
    
    fireEvent.dragStart(screen.getByRole('article'));
    
    expect(onDragStart).toHaveBeenCalledWith(mockWellCard);
  });
});
```

### E2E Tests (Playwright - Future)

```typescript
// e2e/survival-mode.spec.ts

import { test, expect } from '@playwright/test';

test('complete a basic survival game', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Survival Mode');
  
  // Place a well
  await page.dragAndDrop('[data-card="well"]', '[data-tile="2,3"]');
  
  // Verify water production
  await expect(page.locator('[data-resource="water"]')).toContainText('+1');
});
```

---

## 8. Deployment

### Vercel (Recommended)

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache" }
      ]
    }
  ]
}
```

### Cloudflare Pages (Alternative)

```toml
# wrangler.toml (if using Cloudflare)
name = "settle-game"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 9. Environment Setup

### Required Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Runtime |
| npm | 10+ | Package manager |
| VS Code | Latest | Editor |
| Git | Latest | Version control |

### VS Code Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "github.copilot",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag"
  ]
}
```

### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 10. Accessibility Guidelines

### Minimum Requirements

| Feature | Implementation | Priority |
|---------|----------------|----------|
| **Keyboard Navigation** | Tab through cards, Enter to place | High |
| **Screen Reader** | ARIA labels on all interactive elements | High |
| **Focus Indicators** | Visible outline on focused elements | High |
| **Color Contrast** | WCAG AA (4.5:1 for text) | High |
| **Touch Targets** | Min 44×44px tap targets | High |
| **Reduce Motion** | Respect `prefers-reduced-motion` | Medium |

### Implementation Examples

```typescript
// Card component with accessibility
export function Card({ card }: CardProps) {
  return (
    <button
      role="button"
      aria-label={`${card.name}. Costs: ${card.cost.map(c => `${c.amount} ${c.resource}`).join(', ')}`}
      aria-describedby={`card-desc-${card.id}`}
      tabIndex={0}
      className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardSelect(card);
        }
      }}
    >
      {/* Card content */}
      <span id={`card-desc-${card.id}`} className="sr-only">
        {card.description}
      </span>
    </button>
  );
}

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationDuration = prefersReducedMotion ? 0 : 300;
```

### Color Contrast Check

Use this CSS for high-contrast mode:

```css
/* Ensure text readability */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid currentColor;
  }
  
  .text-gray-500 {
    color: #000;
  }
}
```

---

## 11. Mobile Testing Matrix

### Required Device/Browser Coverage

| Platform | Browser | Versions | Priority |
|----------|---------|----------|----------|
| **iOS** | Safari | 15+, 16+ | Critical |
| **iOS** | Chrome | Latest | Medium |
| **Android** | Chrome | Latest 2 | Critical |
| **Android** | Firefox | Latest | Low |
| **Desktop** | Chrome | Latest | Critical |
| **Desktop** | Firefox | Latest | High |
| **Desktop** | Safari | Latest | Medium |
| **Desktop** | Edge | Latest | Medium |

### Touch Gesture Checklist

- [ ] **Tap** - Select tile, click button
- [ ] **Long press** - Card details (optional)
- [ ] **Drag** - Move cards from hand to grid
- [ ] **Pinch zoom** - Disabled (breaks game layout)
- [ ] **Scroll** - Resource bar, card hand
- [ ] **Two-finger scroll** - Map pan (if implemented)

### Responsive Breakpoints

```css
/* Mobile first approach */
.grid { 
  /* Base: 320px+ */
  grid-template-columns: repeat(4, 1fr);
}

@media (min-width: 480px) {
  /* Large phone */
  .grid { grid-template-columns: repeat(6, 1fr); }
}

@media (min-width: 768px) {
  /* Tablet */
  .grid { grid-template-columns: repeat(8, 1fr); }
}

@media (min-width: 1024px) {
  /* Desktop */
  .grid { grid-template-columns: repeat(10, 1fr); }
}
```

### Device-Specific Issues to Test

**iOS Safari:**
- [ ] Viewport height with address bar (use `100dvh`)
- [ ] Touch event `preventDefault()` required
- [ ] PWA add to home screen prompt
- [ ] No hover states (use `:active` instead)

**Android Chrome:**
- [ ] Pull-to-refresh interference
- [ ] Back button handling
- [ ] Dark mode detection
- [ ] Install banner timing

**Desktop:**
- [ ] Right-click context menu (disable if needed)
- [ ] Keyboard shortcuts don't conflict with browser
- [ ] Mouse hover states
- [ ] Window resize handling

---

## 12. Decision Log

### 2026-01-21: Chose Zustand over Redux
**Context:** Need state management for game state
**Decision:** Use Zustand
**Reasoning:**
  - Less boilerplate (no actions/reducers)
  - Better TypeScript support out of box
  - Simpler for single-developer project
  - Can add Redux DevTools if needed
**Trade-offs:**
  - Less community resources than Redux
  - Smaller ecosystem of middleware
**Status:** ✅ Implemented

### 2026-01-21: Fullscreen Grid Design
**Context:** Initial grid layout discussion
**Decision:** Made grid fullscreen with floating menus instead of traditional layout
**Reasoning:**
  - Maximizes playable space (30×30 grid needs room)
  - Better mobile experience (more content visible)
  - Modern UI pattern (like Google Maps, Figma)
  - Gesture-friendly (swipe to reveal panels)
**Trade-offs:**
  - Less immediately obvious where UI controls are
  - Requires onboarding hints for new users
**Status:** ✅ Implemented

### 2026-01-21: Removed Terrain Colors
**Context:** Grid visual design
**Decision:** Use uniform gray grid instead of terrain-colored tiles
**Reasoning:**
  - Cleaner, more factory-builder aesthetic
  - Reduces visual noise
  - Focus on cards/buildings, not terrain
  - Better contrast for card colors
**Trade-offs:**
  - Less visually interesting empty tiles
  - Terrain types no longer visible at a glance
**Status:** ✅ Implemented

### 2026-01-21: 3-Tier Resource System
**Context:** Making resource nodes interesting
**Decision:** Add Common/Uncommon/Rare tiers to resource nodes
**Reasoning:**
  - Adds strategic depth (hunt for rare nodes)
  - Visual variety on the map
  - Encourages exploration
  - Familiar system (like loot rarities)
**Implementation:**
  - Tier 1: 50% spawn, 100% yield, gray border
  - Tier 2: 35% spawn, 150% yield, blue border + ★★
  - Tier 3: 15% spawn, 200% yield, gold border + ★★★
**Status:** ✅ Implemented

### 2026-01-21: Trading Card Modal System
**Context:** How to show building details
**Decision:** Pokemon/Magic-style trading cards instead of simple tooltips
**Reasoning:**
  - More engaging and "game-like"
  - Room for stats, lore, upgrades
  - Fits card game theme
  - Mobile-friendly (big tap targets)
**Trade-offs:**
  - Takes up more screen space
  - Slower than hover tooltips
**Status:** ✅ Implemented with upgrade slots

### 2026-01-21: Conveyor System Planned
**Context:** How buildings connect
**Decision:** Use conveyor/splitter cards for resource flow (not auto-connect)
**Reasoning:**
  - More strategic gameplay (layout matters)
  - Visual representation of resource flow
  - Factorio-inspired mechanics
  - Adds puzzle element
**Status:** 🚧 Cards added, connections TODO Phase 3

---

## 13. Implementation Summary (Current Status)

### What's Working Now ✅

**Core Systems:**
- ✅ Vite + React 18 + TypeScript build system
- ✅ Tailwind CSS with custom game theme
- ✅ Zustand state management
- ✅ TypeScript type safety throughout

**Game Features:**
- ✅ 30×30 scrollable grid world
- ✅ 3-tier resource node generation (16 nodes total)
- ✅ 7 building types in hand
- ✅ Drag-and-drop card placement
- ✅ Trading card detail modals
- ✅ Resource node upgrade system
- ✅ Mobile gesture support (swipe menus)
- ✅ Floating UI buttons
- ✅ Resource bar display

**Technical Polish:**
- ✅ Smooth animations (slide-in panels, card hover)
- ✅ Backdrop blur effects
- ✅ Responsive design (mobile + desktop)
- ✅ TypeScript compilation with no errors
- ✅ Clean component architecture

### Next Steps (Phase 3) 🚧

**Critical Path:**
1. Implement resource flow logic
2. Add conveyor connection system
3. Production calculations per tick
4. Resource consumption mechanics
5. Visual connection lines between buildings
6. Power grid system

**Nice-to-Have:**
- Save/load system (localStorage)
- Sound effects
- Card unlock progression
- Tutorial system
- Settings panel

### Known Limitations

- No resource production yet (static display)
- Conveyors placed but don't connect
- No game loop/tick system
- No win/lose conditions
- No persistence (refresh loses state)
- Not deployed to production yet

---

## 14. Files Created (Phases 0-2)

```
✅ Configuration Files
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── .gitignore

✅ Source Files
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── types/game.ts
│   ├── store/gameStore.ts
│   └── components/game/
│       ├── Grid.tsx
│       ├── Tile.tsx
│       ├── Hand.tsx
│       ├── ResourceBar.tsx
│       └── CardModal.tsx

✅ Documentation
├── README.md (updated)
├── 00-QUICK-START.md
├── 01-GAME-DESIGN-DOCUMENT.md
├── 02-TECHNICAL-ARCHITECTURE.md (this file - updated)
├── 03-DEVELOPMENT-ROADMAP.md (updated)
├── 04-EXTERNAL-RESOURCES.md
├── 05-CARD-DATABASE.md
└── 06-TROUBLESHOOTING.md
```

**Total Lines of Code:** ~1,200 LOC (components + types + store)
**Development Time:** ~6 hours (Phases 0-2)
**Completion:** 25% of MVP (2 of 8 phases done)
  - Faster to implement and test
**Trade-offs:**
  - Less polished first impression
  - Will need to retrofit later
**Status:** Deferred to Phase 6
```

Keep this in a `DECISIONS.md` file or at the bottom of relevant docs.

---

## Document Info

**Version:** 1.1  
**Last Updated:** January 2026  
**Author:** Chris + Claude  
**Status:** Ready for Implementation
