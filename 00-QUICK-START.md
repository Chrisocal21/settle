# Settle: Quick Start Guide

> Get from zero to running code in 30 minutes

**🎯 Current Build Status:** Phase 3 (75% Complete) - Resource Flow & Storage  
**🎮 Playable:** Yes! Core production loop working  
**📱 Mobile:** Fully responsive with touch gestures

---

## What You're Building

A factory-building game where you:
1. **Place miners** on resource nodes (iron, coal, stone, water)
2. **Collect resources** by clicking miners (manual collection)
3. **Build storage** buildings to auto-collect from adjacent miners
4. **Create connections** (Shift+Click) to transport resources between buildings
5. **Process materials** in smelters/foundries (iron ore → iron bars)
6. **Manage inventory** with a 1000-capacity player backpack

**Next Steps:** Population mechanics, tech tree, win/lose conditions

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js 20+** installed ([download](https://nodejs.org/))
- [ ] **VS Code** installed ([download](https://code.visualstudio.com/))
- [ ] **Git** installed ([download](https://git-scm.com/))
- [ ] **GitHub account** created ([signup](https://github.com/))
- [ ] **Vercel account** created ([signup](https://vercel.com/) - use GitHub login)

Verify Node installation:
```bash
node --version  # Should show v20.x.x or higher
npm --version   # Should show 10.x.x or higher
```

---

## Step 1: Create the Project (5 minutes)

Open terminal and run:

```bash
# Create new Vite + React + TypeScript project
npm create vite@latest settle -- --template react-ts

# Enter the project
cd settle

# Install dependencies
npm install

# Test that it works
npm run dev
```

Open http://localhost:5173 - you should see the Vite + React starter page.

**Stop the dev server** (Ctrl+C) and continue.

---

## Step 2: Install Game Dependencies (2 minutes)

```bash
# State management
npm install zustand

# Utility
npm install immer uuid
npm install -D @types/uuid

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Step 3: Configure Tailwind (3 minutes)

Replace `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Game colors
        'cream': '#F5F0E6',
        'cream-dark': '#E8E0D0',
        'nature': '#27AE60',
        'survival': '#F39C12',
        'power': '#3498DB',
        'extraction': '#E67E22',
        'processing': '#E74C3C',
        'civilization': '#9B59B6',
        'utility': '#95A5A6',
      },
    },
  },
  plugins: [],
}
```

Replace `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  @apply bg-cream text-gray-800;
  font-family: system-ui, -apple-system, sans-serif;
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
}
```

---

## Step 4: Set Up Folder Structure (2 minutes)

```bash
# Create folders
mkdir -p src/components/game
mkdir -p src/components/ui
mkdir -p src/components/screens
mkdir -p src/game
mkdir -p src/store
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/data
```

Your structure should look like:
```
src/
├── components/
│   ├── game/
│   ├── ui/
│   └── screens/
├── game/
├── store/
├── hooks/
├── types/
├── data/
├── App.tsx
├── main.tsx
└── index.css
```

---

## Step 5: Create Core Types (5 minutes)

Create `src/types/game.ts`:

```typescript
// Position on the grid
export interface Position {
  x: number;
  y: number;
}

// Terrain types
export type TerrainType = 
  | 'plains' 
  | 'forest' 
  | 'mountain' 
  | 'water' 
  | 'fertile';

// Tile states
export type TileState = 'hidden' | 'revealed' | 'occupied';

// A single tile on the grid
export interface Tile {
  position: Position;
  terrain: TerrainType;
  state: TileState;
  cardId?: string;
}

// Resource types
export type ResourceType = 
  | 'water'
  | 'food'
  | 'wood'
  | 'stone'
  | 'coal'
  | 'iron_ore'
  | 'iron_bars'
  | 'power';

// Card categories
export type CardCategory = 
  | 'nature'
  | 'survival'
  | 'power'
  | 'extraction'
  | 'processing'
  | 'civilization'
  | 'utility';

// Resource flow (input or output)
export interface ResourceFlow {
  resource: ResourceType;
  amount: number;
  rate: number; // per second
}

// Card cost
export interface ResourceCost {
  resource: ResourceType;
  amount: number;
}

// Card definition
export interface CardDefinition {
  id: string;
  name: string;
  category: CardCategory;
  tier: number;
  cost: ResourceCost[];
  inputs: ResourceFlow[];
  outputs: ResourceFlow[];
  description: string;
}

// Placed card instance
export interface PlacedCard {
  instanceId: string;
  definitionId: string;
  position: Position;
}

// Game mode
export type GameMode = 'survival' | 'builder' | 'puzzle' | 'campaign';
```

---

## Step 6: Create Game Store (5 minutes)

Create `src/store/gameStore.ts`:

```typescript
import { create } from 'zustand';
import { Tile, PlacedCard, ResourceType, GameMode, Position } from '../types/game';

interface GameState {
  // Grid
  grid: Tile[][];
  gridSize: { width: number; height: number };
  
  // Resources
  resources: Record<ResourceType, number>;
  
  // Population
  population: number;
  maxPopulation: number;
  
  // Cards
  hand: string[]; // card definition IDs
  placedCards: PlacedCard[];
  
  // Game state
  mode: GameMode;
  turn: number;
  isPaused: boolean;
  isGameOver: boolean;
  
  // Actions
  initGame: (mode: GameMode, width?: number, height?: number) => void;
  revealTile: (position: Position) => void;
  addResource: (resource: ResourceType, amount: number) => void;
  placeCard: (cardId: string, position: Position) => void;
  tick: () => void;
}

const createInitialGrid = (width: number, height: number): Tile[][] => {
  const terrainTypes: Array<'plains' | 'forest' | 'mountain' | 'water' | 'fertile'> = [
    'plains', 'plains', 'plains', 'forest', 'forest', 'mountain', 'water', 'fertile'
  ];
  
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      position: { x, y },
      terrain: terrainTypes[Math.floor(Math.random() * terrainTypes.length)],
      state: 'hidden' as const,
    }))
  );
};

const initialResources: Record<ResourceType, number> = {
  water: 0,
  food: 10,
  wood: 20,
  stone: 10,
  coal: 0,
  iron_ore: 0,
  iron_bars: 0,
  power: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  grid: [],
  gridSize: { width: 6, height: 6 },
  resources: { ...initialResources },
  population: 1,
  maxPopulation: 2,
  hand: ['well', 'farm', 'tent', 'lumber_mill'],
  placedCards: [],
  mode: 'survival',
  turn: 0,
  isPaused: false,
  isGameOver: false,

  initGame: (mode, width = 6, height = 6) => {
    set({
      grid: createInitialGrid(width, height),
      gridSize: { width, height },
      resources: { ...initialResources },
      population: 1,
      maxPopulation: 2,
      hand: ['well', 'farm', 'tent', 'lumber_mill'],
      placedCards: [],
      mode,
      turn: 0,
      isPaused: false,
      isGameOver: false,
    });
  },

  revealTile: (position) => {
    set((state) => {
      const newGrid = state.grid.map((row) =>
        row.map((tile) =>
          tile.position.x === position.x && tile.position.y === position.y
            ? { ...tile, state: 'revealed' as const }
            : tile
        )
      );
      return { grid: newGrid };
    });
  },

  addResource: (resource, amount) => {
    set((state) => ({
      resources: {
        ...state.resources,
        [resource]: state.resources[resource] + amount,
      },
    }));
  },

  placeCard: (cardId, position) => {
    const state = get();
    const newCard: PlacedCard = {
      instanceId: `${cardId}-${Date.now()}`,
      definitionId: cardId,
      position,
    };
    
    set({
      placedCards: [...state.placedCards, newCard],
      grid: state.grid.map((row) =>
        row.map((tile) =>
          tile.position.x === position.x && tile.position.y === position.y
            ? { ...tile, state: 'occupied' as const, cardId: newCard.instanceId }
            : tile
        )
      ),
    });
  },

  tick: () => {
    set((state) => ({
      turn: state.turn + 1,
    }));
  },
}));
```

---

## Step 7: Create Basic Components (5 minutes)

Create `src/components/game/Tile.tsx`:

```tsx
import { Tile as TileType } from '../../types/game';
import { useGameStore } from '../../store/gameStore';

interface TileProps {
  tile: TileType;
}

const terrainEmoji: Record<string, string> = {
  plains: '🟩',
  forest: '🌲',
  mountain: '🏔️',
  water: '💧',
  fertile: '🌾',
};

const terrainColors: Record<string, string> = {
  plains: 'bg-green-200',
  forest: 'bg-green-600',
  mountain: 'bg-gray-400',
  water: 'bg-blue-400',
  fertile: 'bg-yellow-200',
};

export function Tile({ tile }: TileProps) {
  const revealTile = useGameStore((state) => state.revealTile);
  const addResource = useGameStore((state) => state.addResource);

  const handleClick = () => {
    if (tile.state === 'hidden') {
      revealTile(tile.position);
    } else if (tile.state === 'revealed') {
      // Manual gathering
      if (tile.terrain === 'forest') addResource('wood', 1);
      if (tile.terrain === 'water') addResource('water', 1);
      if (tile.terrain === 'mountain') addResource('stone', 1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-12 h-12 sm:w-14 sm:h-14
        flex items-center justify-center
        border border-gray-300 rounded
        transition-all duration-200
        ${tile.state === 'hidden' 
          ? 'bg-gray-500 hover:bg-gray-400' 
          : terrainColors[tile.terrain]
        }
        ${tile.state === 'occupied' ? 'ring-2 ring-purple-500' : ''}
        active:scale-95
      `}
    >
      {tile.state === 'hidden' ? '?' : terrainEmoji[tile.terrain]}
    </button>
  );
}
```

Create `src/components/game/Grid.tsx`:

```tsx
import { useGameStore } from '../../store/gameStore';
import { Tile } from './Tile';

export function Grid() {
  const grid = useGameStore((state) => state.grid);

  if (grid.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 p-4">
      {grid.map((row, y) => (
        <div key={y} className="flex gap-1">
          {row.map((tile) => (
            <Tile key={`${tile.position.x}-${tile.position.y}`} tile={tile} />
          ))}
        </div>
      ))}
    </div>
  );
}
```

Create `src/components/game/ResourceBar.tsx`:

```tsx
import { useGameStore } from '../../store/gameStore';

const resourceEmoji: Record<string, string> = {
  water: '💧',
  food: '🌾',
  wood: '🪵',
  stone: '🪨',
  power: '⚡',
};

export function ResourceBar() {
  const resources = useGameStore((state) => state.resources);
  const population = useGameStore((state) => state.population);
  const maxPopulation = useGameStore((state) => state.maxPopulation);

  return (
    <div className="flex flex-wrap gap-3 p-3 bg-cream-dark rounded-lg">
      <div className="flex items-center gap-1 font-semibold">
        👥 {population}/{maxPopulation}
      </div>
      {Object.entries(resourceEmoji).map(([key, emoji]) => (
        <div key={key} className="flex items-center gap-1">
          {emoji} {Math.floor(resources[key as keyof typeof resources])}
        </div>
      ))}
    </div>
  );
}
```

---

## Step 8: Update App.tsx (2 minutes)

Replace `src/App.tsx`:

```tsx
import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { Grid } from './components/game/Grid';
import { ResourceBar } from './components/game/ResourceBar';

function App() {
  const initGame = useGameStore((state) => state.initGame);
  const turn = useGameStore((state) => state.turn);

  useEffect(() => {
    initGame('survival');
  }, [initGame]);

  return (
    <div className="min-h-screen bg-cream p-4">
      <header className="max-w-lg mx-auto mb-4">
        <h1 className="text-2xl font-bold text-center mb-2">🏛️ Settle</h1>
        <ResourceBar />
        <p className="text-center text-sm text-gray-600 mt-2">
          Turn: {turn} | Tap hidden tiles to explore, tap resources to gather
        </p>
      </header>
      
      <main className="flex justify-center">
        <Grid />
      </main>
      
      <footer className="text-center mt-4 text-sm text-gray-500">
        Phase 1: Basic Grid ✓
      </footer>
    </div>
  );
}

export default App;
```

---

## Step 9: Test It (1 minute)

```bash
npm run dev
```

Open http://localhost:5173

You should see:
- A 6×6 grid of hidden tiles
- Resource bar at the top
- Click tiles to reveal terrain
- Click revealed tiles to gather resources

🎉 **You have a working prototype!**

---

## Step 10: Deploy to Vercel (3 minutes)

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial game prototype"

# Create GitHub repository (via github.com or gh cli)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/settle.git
git branch -M main
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

Your game is now live at `https://settle-xxx.vercel.app`!

---

## What's Next?

You've completed Phase 0 + Phase 1 basics. Continue with:

1. **Add drag-and-drop cards** (Phase 2)
2. **Implement resource flow** (Phase 3)
3. **Create game loop** (Phase 4)
4. **Add survival mechanics** (Phase 5)

See `03-DEVELOPMENT-ROADMAP.md` for detailed next steps.

---

## Troubleshooting

### "Module not found" errors
```bash
npm install  # Reinstall dependencies
```

### Tailwind styles not working
Check that `tailwind.config.js` has the correct `content` paths.

### TypeScript errors
```bash
npm run build  # See all errors
```

### Port 5173 in use
```bash
npm run dev -- --port 3000
```

---

## Document Info

**Version:** 1.0  
**Last Updated:** January 2026  
**Purpose:** Get started in 30 minutes
