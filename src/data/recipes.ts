import { ResourceType } from '../types/game';

export interface Recipe {
  id: string;
  name: string;
  building: string; // Which building can use this recipe
  inputs: Partial<Record<ResourceType, number>>;
  outputs: Partial<Record<ResourceType, number>>;
  processingTime: number; // seconds per batch
}

export const RECIPES: Record<string, Recipe> = {
  smelt_iron: {
    id: 'smelt_iron',
    name: 'Smelt Iron Bar',
    building: 'smelter',
    inputs: {
      iron_ore: 2,
    },
    outputs: {
      iron_bar: 1,
      slag: 0.5,
    },
    processingTime: 2,
  },
  
  refine_coal: {
    id: 'refine_coal',
    name: 'Refine Coal',
    building: 'smelter',
    inputs: {
      coal: 3,
      stone: 1,
    },
    outputs: {
      coal: 5,
    },
    processingTime: 4,
  },
  
  process_stone: {
    id: 'process_stone',
    name: 'Process Stone Bricks',
    building: 'smelter',
    inputs: {
      stone: 4,
    },
    outputs: {
      stone: 6,
    },
    processingTime: 2,
  },
  
  forge_steel_bar: {
    id: 'forge_steel_bar',
    name: 'Forge Steel Bar',
    building: 'foundry',
    inputs: {
      iron_bar: 2,
      coal: 1,
    },
    outputs: {
      advanced_metal: 1,
    },
    processingTime: 4,
  },
  
  refine_steel: {
    id: 'refine_steel',
    name: 'Refine Steel (Mass Production)',
    building: 'foundry',
    inputs: {
      iron_bar: 3,
      coal: 2,
    },
    outputs: {
      iron_bar: 6,
    },
    processingTime: 5,
  },
  
  forge_component: {
    id: 'forge_component',
    name: 'Forge Component',
    building: 'foundry',
    inputs: {
      advanced_metal: 1,
      stone: 1,
    },
    outputs: {
      component: 2,
    },
    processingTime: 4,
  },
  
  craft_component: {
    id: 'craft_component',
    name: 'Basic Component',
    building: 'constructor',
    inputs: {
      iron_bar: 1,
      stone: 2,
    },
    outputs: {
      component: 1,
    },
    processingTime: 4,
  },
  
  craft_advanced_component: {
    id: 'craft_advanced_component',
    name: 'Advanced Component',
    building: 'constructor',
    inputs: {
      advanced_metal: 1,
      component: 2,
    },
    outputs: {
      component: 4,
    },
    processingTime: 6,
  },
  
  craft_food: {
    id: 'craft_food',
    name: 'Process Food Rations',
    building: 'constructor',
    inputs: {
      water: 2,
      stone: 1,
    },
    outputs: {
      food: 3,
    },
    processingTime: 3,
  },
};

// Get all recipes for a building
export function getRecipesForBuilding(buildingId: string): Recipe[] {
  return Object.values(RECIPES).filter(r => r.building === buildingId);
}

// Get recipe for a building (returns first one for backwards compatibility)
export function getRecipeForBuilding(buildingId: string): Recipe | undefined {
  return Object.values(RECIPES).find(r => r.building === buildingId);
}
