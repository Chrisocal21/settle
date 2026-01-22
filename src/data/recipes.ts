import { ResourceType } from '../types/game';

export interface Recipe {
  id: string;
  name: string;
  building: string; // Which building can use this recipe
  inputs: Record<ResourceType, number>;
  outputs: Record<ResourceType, number>;
  processingTime: number; // seconds per batch
}

export const RECIPES: Record<string, Recipe> = {
  smelt_iron: {
    id: 'smelt_iron',
    name: 'Smelt Iron',
    building: 'smelter',
    inputs: {
      iron_ore: 2,
      coal: 1,
      water: 0,
      food: 0,
      wood: 0,
      stone: 0,
      iron_bars: 0,
      power: 0,
    },
    outputs: {
      iron_bars: 1,
      stone: 0.5, // Byproduct slag
      water: 0,
      food: 0,
      wood: 0,
      coal: 0,
      iron_ore: 0,
      power: 0,
    },
    processingTime: 3,
  },
  
  advanced_metal: {
    id: 'advanced_metal',
    name: 'Advanced Metalworking',
    building: 'foundry',
    inputs: {
      iron_bars: 3,
      coal: 2,
      water: 0,
      food: 0,
      wood: 0,
      stone: 0,
      iron_ore: 0,
      power: 0,
    },
    outputs: {
      iron_bars: 5, // Refined output
      water: 0,
      food: 0,
      wood: 0,
      stone: 0,
      coal: 0,
      iron_ore: 0,
      power: 0,
    },
    processingTime: 5,
  },
};

// Get recipe for a building
export function getRecipeForBuilding(buildingId: string): Recipe | undefined {
  return Object.values(RECIPES).find(r => r.building === buildingId);
}
