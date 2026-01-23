import { Position } from '../types/game';

export interface MapConfig {
  id: string;
  name: string;
  backgroundImage: string;
  width: number;
  height: number;
  resourceNodes: {
    type: 'water_source' | 'iron_ore_deposit' | 'coal_deposit' | 'stone_quarry';
    position: Position;
    tier: 1 | 2 | 3;
  }[];
}

export const MAPS: Record<string, MapConfig> = {
  fantasy_world: {
    id: 'fantasy_world',
    name: 'Fantasy World',
    backgroundImage: '/map-fantasy.jpg',
    width: 30,
    height: 20,
    resourceNodes: [
      // Water sources - aligned with oceans/lakes (edges and water bodies)
      { type: 'water_source', position: { x: 2, y: 8 }, tier: 2 },   // West coast
      { type: 'water_source', position: { x: 5, y: 15 }, tier: 2 },  // Southwest lake
      { type: 'water_source', position: { x: 15, y: 3 }, tier: 3 },  // North central lake
      { type: 'water_source', position: { x: 25, y: 10 }, tier: 2 }, // East coast
      { type: 'water_source', position: { x: 18, y: 17 }, tier: 2 }, // Southeast lake
      
      // Iron ore deposits - mountains and highlands
      { type: 'iron_ore_deposit', position: { x: 8, y: 5 }, tier: 2 },   // Northwest mountains
      { type: 'iron_ore_deposit', position: { x: 12, y: 8 }, tier: 3 },  // Central mountains
      { type: 'iron_ore_deposit', position: { x: 20, y: 6 }, tier: 2 },  // Northeast mountains
      { type: 'iron_ore_deposit', position: { x: 22, y: 13 }, tier: 2 }, // East highlands
      
      // Coal deposits - scattered in mainland
      { type: 'coal_deposit', position: { x: 10, y: 10 }, tier: 2 },  // Central west
      { type: 'coal_deposit', position: { x: 16, y: 8 }, tier: 2 },   // North central
      { type: 'coal_deposit', position: { x: 13, y: 14 }, tier: 3 },  // South central
      { type: 'coal_deposit', position: { x: 24, y: 8 }, tier: 1 },   // East
      
      // Stone quarries - rocky areas
      { type: 'stone_quarry', position: { x: 7, y: 12 }, tier: 2 },   // West
      { type: 'stone_quarry', position: { x: 14, y: 11 }, tier: 2 },  // Central
      { type: 'stone_quarry', position: { x: 19, y: 14 }, tier: 3 },  // South
    ],
  },
};

export const DEFAULT_MAP = 'fantasy_world';
