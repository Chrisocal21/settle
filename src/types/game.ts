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
  isStationary?: boolean; // For resource nodes that can't be moved
  tier?: number; // 1-3 for resource nodes quality
}

// Resource node types (stationary on map)
export type ResourceNodeType = 
  | 'water_source'
  | 'iron_ore_deposit'
  | 'coal_deposit'
  | 'stone_quarry'
  | 'forest_patch';

// Game mode
export type GameMode = 'survival' | 'builder' | 'puzzle' | 'campaign';
