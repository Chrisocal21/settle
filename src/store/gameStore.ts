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
    'plains', 'plains', 'plains', 'plains', 'plains', 
    'forest', 'forest', 'mountain', 'mountain', 'water', 'fertile'
  ];
  
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      position: { x, y },
      terrain: terrainTypes[Math.floor(Math.random() * terrainTypes.length)],
      state: 'revealed' as const, // Start with revealed world map
    }))
  );
};

// Create stationary resource nodes on the map
const createResourceNodes = (width: number, height: number): PlacedCard[] => {
  const nodes: PlacedCard[] = [];
  
  const getRandomTier = () => {
    const rand = Math.random();
    if (rand < 0.5) return 1; // 50% common
    if (rand < 0.85) return 2; // 35% uncommon
    return 3; // 15% rare
  };
  
  // Add water sources (4-6 scattered)
  for (let i = 0; i < 5; i++) {
    nodes.push({
      instanceId: `water-source-${i}`,
      definitionId: 'water_source',
      position: { 
        x: Math.floor(Math.random() * width), 
        y: Math.floor(Math.random() * height) 
      },
      isStationary: true,
      tier: getRandomTier(),
    });
  }
  
  // Add iron ore deposits
  for (let i = 0; i < 4; i++) {
    nodes.push({
      instanceId: `iron-ore-${i}`,
      definitionId: 'iron_ore_deposit',
      position: { 
        x: Math.floor(Math.random() * width), 
        y: Math.floor(Math.random() * height) 
      },
      isStationary: true,
      tier: getRandomTier(),
    });
  }
  
  // Add coal deposits
  for (let i = 0; i < 4; i++) {
    nodes.push({
      instanceId: `coal-${i}`,
      definitionId: 'coal_deposit',
      position: { 
        x: Math.floor(Math.random() * width), 
        y: Math.floor(Math.random() * height) 
      },
      isStationary: true,
      tier: getRandomTier(),
    });
  }
  
  // Add stone quarries
  for (let i = 0; i < 3; i++) {
    nodes.push({
      instanceId: `stone-${i}`,
      definitionId: 'stone_quarry',
      position: { 
        x: Math.floor(Math.random() * width), 
        y: Math.floor(Math.random() * height) 
      },
      isStationary: true,
      tier: getRandomTier(),
    });
  }
  
  return nodes;
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

  initGame: (mode, width = 25, height = 25) => {
    const resourceNodes = createResourceNodes(width, height);
    const grid = createInitialGrid(width, height);
    
    // Mark tiles with resource nodes as occupied
    resourceNodes.forEach((node) => {
      const tile = grid[node.position.y][node.position.x];
      tile.state = 'occupied';
    });
    
    set({
      grid,
      gridSize: { width, height },
      resources: { ...initialResources },
      population: 1,
      maxPopulation: 2,
      hand: ['miner', 'extractor', 'smelter', 'foundry', 'constructor', 'power_plant', 'conveyor', 'splitter'],
      placedCards: resourceNodes,
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
    
    // Check if there's already a card at this position
    const cardsAtPosition = state.placedCards.filter(
      (c) => c.position.x === position.x && c.position.y === position.y
    );
    
    // Check if placing on a resource node
    const resourceNode = cardsAtPosition.find(
      (c) => c.isStationary && ['water_source', 'iron_ore_deposit', 'coal_deposit', 'stone_quarry'].includes(c.definitionId)
    );
    
    // Allow placement if tile is empty OR correct extractor type on resource
    const canPlace = cardsAtPosition.length === 0 || 
      (resourceNode?.definitionId === 'water_source' && cardId === 'extractor') ||
      (resourceNode && resourceNode.definitionId !== 'water_source' && cardId === 'miner');
    
    if (!canPlace) {
      console.log('Cannot place card here - tile occupied');
      return;
    }
    
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
            ? { ...tile, state: 'occupied' as const }
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
