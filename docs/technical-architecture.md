# SETTLE — Technical Architecture

## Overview

This document provides the technical foundation for building Settle. Reference the starrupture-planner repo for React Flow patterns.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | React | 19.x | UI components |
| Language | TypeScript | 5.8+ | Type safety |
| Build Tool | Vite | 7.x | Fast dev/build |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| UI Components | DaisyUI | 5.x | Pre-built component themes |
| Flow Graph | React Flow | 12.x | Interactive node canvas |
| Auto-Layout | Dagre | 0.8.5 | Automatic node positioning |
| State | Zustand | — | Reactive state management |
| Testing | Vitest | 3.x | Unit tests |
| AI Integration | OpenAI API | — | Worker dialogue generation |

---

## Project Structure

```
settle/
├── assets/
│   └── icons/
│       ├── buildings/      # Node type icons
│       ├── resources/      # Resource icons (ore, food, energy, etc.)
│       ├── cards/          # Card artwork/frames
│       └── terrain/        # Terrain type icons
├── src/
│   ├── components/
│   │   ├── board/          # Main game board (map view)
│   │   ├── factory/        # Factory builder (React Flow canvas)
│   │   ├── cards/          # Card components & deck displays
│   │   ├── nodes/          # Custom node types for React Flow
│   │   ├── edges/          # Custom animated edge components
│   │   ├── ui/             # Reusable UI (buttons, modals, panels)
│   │   ├── hud/            # Game HUD (resources, turn info, scores)
│   │   ├── workers/        # Worker management UI
│   │   └── trade/          # Trading interface
│   ├── state/              # Game state management
│   │   ├── gameState.ts    # Core game logic
│   │   ├── deckState.ts    # Deck/card management
│   │   ├── flowState.ts    # React Flow nodes/edges state
│   │   ├── workerState.ts  # Worker management
│   │   ├── resourceState.ts # Resource tracking
│   │   └── tradeState.ts   # Trading system
│   ├── data/
│   │   ├── nodes.json      # Building/node definitions
│   │   ├── cards/
│   │   │   ├── location.json   # Location deck
│   │   │   ├── standard.json   # Standard deck
│   │   │   ├── chance.json     # Chance deck
│   │   │   └── wildcards.json  # Wildcard pool
│   │   ├── courses.json    # Course card definitions
│   │   ├── resources.json  # Resource types & flow rates
│   │   ├── buildings.json  # Building definitions
│   │   └── workers.json    # Worker templates
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions
│   │   ├── flowCalculations.ts  # Production flow math
│   │   ├── cardLogic.ts         # Card resolution
│   │   └── workerAI.ts          # Worker dialogue generation
│   ├── services/
│   │   ├── openai.ts       # AI integration for workers
│   │   └── multiplayer.ts  # Real-time/async multiplayer
│   └── App.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## Layout Components

### Main Layout (Toggle Between Screens)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Turn Info | Player | Resources Summary | [TOGGLE]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    SCREEN CONTENT                           │
│                                                             │
│           (Map View OR Factory View)                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Action Log | Notifications | Help                  │
└─────────────────────────────────────────────────────────────┘
```

### Map Screen Layout

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├───────────────┬─────────────────────────────┬───────────────┤
│               │                             │               │
│   LEFT PANEL  │       MAIN MAP              │  RIGHT PANEL  │
│               │                             │               │
│  • Card Decks │   Territory View            │  • Selected   │
│  • Draw Piles │   (Your Empire)             │    Tile Info  │
│  • Hand       │                             │  • Worker     │
│  • Discard    │                             │    Panel      │
│               │                             │  • Actions    │
│               │                             │               │
├───────────────┴─────────────────────────────┴───────────────┤
│  FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Factory Screen Layout

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    REACT FLOW CANVAS                        │
│                                                             │
│    ┌───┐      ┌───┐      ┌───┐                             │
│    │ A │─────▶│ B │─────▶│ C │                             │
│    └───┘      └───┘      └───┘                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Building Palette | Minimap                         │
└─────────────────────────────────────────────────────────────┘
```

---

## React Flow Customization

### Custom Node Types

```typescript
// ExtractorNode — Pulls raw resources
interface ExtractorNodeData {
  type: 'extractor';
  resourceType: 'ore' | 'wood' | 'food' | 'water' | 'stone';
  terrain: string;
  depleted: number; // 0-100, percentage remaining
  outputRate: number;
}

// ProcessorNode — Transforms inputs to outputs
interface ProcessorNodeData {
  type: 'processor';
  processorType: 'smelter' | 'sawmill' | 'kitchen' | 'brickworks';
  inputs: ResourceInput[];
  outputs: ResourceOutput[];
  energyRequired: number;
  isActive: boolean;
}

// StorageNode — Buffers resources
interface StorageNodeData {
  type: 'storage';
  capacity: number;
  currentAmount: number;
  resourceType: string;
}

// CloudInventoryNode — Pushes to empire
interface CloudInventoryNodeData {
  type: 'cloudInventory';
  connectedResources: string[];
}

// EnergyNode — Provides power
interface EnergyNodeData {
  type: 'energy';
  energyType: 'firePit' | 'pelletBurner' | 'coalFurnace' | 'waterMill';
  outputRate: number;
  fuelLevel: number;
}

// HousingNode — Worker housing
interface HousingNodeData {
  type: 'housing';
  housingType: 'basicShelter' | 'workerQuarters' | 'skilledHousing' | 'specialistQuarters';
  capacity: number;
  occupants: Worker[];
}
```

### Custom Edge Types

```typescript
// ResourceEdge — Animated flow showing resource type + rate
interface ResourceEdgeData {
  resourceType: string;
  flowRate: number;
  isActive: boolean;
  color: string;
}

// EnergyEdge — Power connection
interface EnergyEdgeData {
  energyRate: number;
  isActive: boolean;
}

// BlockedEdge — Shows broken/insufficient connections
interface BlockedEdgeData {
  reason: 'depleted' | 'noPower' | 'noStorage' | 'damaged';
}
```

---

## State Management

### Core Game State

```typescript
interface GameState {
  // Game info
  gameId: string;
  phase: 'setup' | 'playing' | 'ended';
  turn: number;
  currentPlayer: string;
  
  // Course
  course: CourseCard;
  
  // Map
  map: MapState;
  territories: Territory[];
  
  // Players
  players: Player[];
  
  // Decks
  decks: {
    location: Card[];
    standard: Card[];
    chance: Card[];
    discards: {
      location: Card[];
      standard: Card[];
      chance: Card[];
    };
  };
  
  // Wildcards (earned)
  wildcardPool: WildCard[];
  
  // Turn state
  flippedThisTurn: boolean;
  actionsRemaining: number;
}
```

### Player State

```typescript
interface Player {
  id: string;
  name: string;
  
  // Resources
  resources: ResourceInventory;
  
  // Territory
  territories: Territory[];
  
  // Workers
  workers: Worker[];
  
  // Buildings (on factory canvas)
  factoryNodes: FactoryNode[];
  factoryEdges: FactoryEdge[];
  
  // Cards in hand
  wildcards: WildCard[];
  skipCards: number;
  
  // Status
  isAlive: boolean;
  turnOrder: number;
}
```

### Worker State

```typescript
interface Worker {
  id: string;
  name: string;
  
  // Grade
  grade: 'laborer' | 'skilled' | 'specialist' | 'leader';
  
  // Personality (procedural)
  personality: {
    trait: 'grumpy' | 'optimistic' | 'nervous' | 'stoic' | 'chatty' | 'quiet';
    dialogueStyle: 'blunt' | 'friendly' | 'formal';
    quirks: string[];
  };
  
  // Status
  state: 'happy' | 'content' | 'restless' | 'hungry' | 'leaving';
  loyalty: number; // 0-100
  turnsEmployed: number;
  
  // Assignment
  assignedBuilding: string | null;
  
  // Dialogue history
  conversationHistory: ConversationEntry[];
  secretsRevealed: string[];
}
```

---

## Data Schemas

### Card Schema

```typescript
interface Card {
  id: string;
  deck: 'location' | 'standard' | 'chance';
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'veryRare';
  
  // Type-specific
  type: CardType;
  
  // Effects
  effects: CardEffect[];
  
  // Art
  artPrompt: string;
  artPath: string;
  
  // Flavor
  flavorText?: string;
}

type CardType = 
  | { kind: 'terrain'; terrain: TerrainType }
  | { kind: 'resource'; resource: ResourceType }
  | { kind: 'hazard'; hazardType: HazardType }
  | { kind: 'event'; eventType: EventType }
  | { kind: 'chaos'; outcome: 'positive' | 'negative' | 'variable' };
```

### Building Schema

```typescript
interface Building {
  id: string;
  name: string;
  category: 'extractor' | 'processor' | 'advanced' | 'housing' | 'storage' | 'energy';
  
  // Requirements
  cost: ResourceCost[];
  terrainRequired?: TerrainType[];
  
  // Production
  inputs?: ResourceInput[];
  outputs?: ResourceOutput[];
  energyRequired?: number;
  
  // Capacity
  capacity?: number;
  workerSlots?: number;
  
  // Visuals
  icon: string;
  nodeColor: string;
}
```

### Course Schema

```typescript
interface CourseCard {
  id: string;
  name: string;
  difficulty: 'beginner' | 'moderate' | 'hard' | 'wildcard';
  
  // Terrain distribution
  terrainWeights: Record<TerrainType, number>;
  
  // Resource availability
  resourceAbundance: Record<ResourceType, 'scarce' | 'normal' | 'abundant'>;
  
  // Hazard tendencies
  hazardWeights: Record<HazardType, number>;
  
  // Special rules
  specialRules?: CourseRule[];
  
  // Description
  description: string;
  flavorText: string;
  
  // Art
  artPrompt: string;
  artPath: string;
}
```

---

## AI Integration (Worker Dialogue)

### Worker Dialogue System

```typescript
interface WorkerDialogueRequest {
  worker: Worker;
  playerState: PlayerState;
  gameState: GameState;
  prompt: string; // What the player said
}

interface WorkerDialogueResponse {
  message: string;
  mood: 'positive' | 'neutral' | 'negative';
  hint?: GameHint;
  reward?: WildCard;
}

// Example prompts for OpenAI
const workerSystemPrompt = `
You are a worker in a frontier settlement survival game.

Your personality: {{personality.trait}}, {{personality.dialogueStyle}}
Your grade: {{grade}}
Your loyalty: {{loyalty}}/100
Your mood: {{state}}

Respond in character. Keep responses short (1-3 sentences).
If loyalty is high (70+), you may share hints or rewards.
If loyalty is low, be cold and unhelpful.

Never break character. Never mention you're an AI.
`;
```

---

## Multiplayer Architecture

### Real-Time (WebSocket)

```typescript
interface GameRoom {
  roomId: string;
  players: Player[];
  gameState: GameState;
  
  // Events
  onPlayerJoin: (player: Player) => void;
  onPlayerLeave: (playerId: string) => void;
  onTurnAction: (action: GameAction) => void;
  onTrade: (trade: TradeProposal) => void;
}
```

### Async (Database)

```typescript
interface AsyncGame {
  gameId: string;
  players: Player[];
  gameState: GameState;
  
  // Turn tracking
  currentTurn: string; // Player ID
  turnDeadline: Date;
  
  // History
  actionLog: GameAction[];
  
  // Notifications
  pendingNotifications: Notification[];
}
```

---

## Key Features to Implement

### Phase 1: Core Foundation
- [ ] React Flow canvas with basic nodes
- [ ] Resource system (raw → refined → advanced)
- [ ] Building placement and connections
- [ ] Energy system
- [ ] Basic turn structure

### Phase 2: Cards & Territory
- [ ] Card deck system
- [ ] Card flipping mechanics
- [ ] Territory expansion
- [ ] Map view
- [ ] Screen toggle

### Phase 3: Workers
- [ ] Worker generation
- [ ] Worker states and needs
- [ ] Basic dialogue system
- [ ] Housing requirements
- [ ] Worker death/departure

### Phase 4: Multiplayer
- [ ] Real-time game rooms
- [ ] Turn order (leader first)
- [ ] Trading system
- [ ] Async mode

### Phase 5: AI & Polish
- [ ] OpenAI integration for dialogue
- [ ] Worker personality depth
- [ ] Wildcard reward system
- [ ] Course card system
- [ ] Win conditions

### Phase 6: Monetization
- [ ] Gold coin system
- [ ] Cosmetic shop
- [ ] Theme system
- [ ] Card skins

---

## Performance Considerations

| Area | Strategy |
|------|----------|
| React Flow | Virtualization for large graphs |
| State updates | Batch updates, selective re-renders |
| Animations | CSS transitions, requestAnimationFrame |
| Multiplayer | WebSocket for real-time, polling for async |
| AI calls | Debounce, cache common responses |
| Assets | Lazy loading, image optimization |

---

## Testing Strategy

| Type | Tool | Coverage |
|------|------|----------|
| Unit | Vitest | State logic, utilities |
| Component | React Testing Library | UI components |
| Integration | Playwright | Game flows |
| E2E | Playwright | Full game scenarios |
