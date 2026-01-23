import { create } from 'zustand';
import { Tile, PlacedCard, ResourceType, GameMode, Position, Connection } from '../types/game';
import { getRecipeForBuilding, RECIPES } from '../data/recipes';
import { MAPS, DEFAULT_MAP } from '../data/maps';

interface GameState {
  // Grid
  grid: Tile[][];
  gridSize: { width: number; height: number };
  
  // Resources
  resources: Record<ResourceType, number>;
  
  // Player Inventory (separate from global resources)
  inventory: Record<ResourceType, number>;
  inventoryCapacity: number;
  
  // Population
  population: number;
  maxPopulation: number;
  
  // Cards
  hand: string[]; // card definition IDs
  placedCards: PlacedCard[];
  connections: Connection[]; // Conveyor connections between buildings
  
  // Game state
  mode: GameMode;
  turn: number;
  isPaused: boolean;
  isGameOver: boolean;
  hasWon: boolean;
  
  // Actions
  initGame: (mode: GameMode, mapId?: string) => void;
  revealTile: (position: Position) => void;
  addResource: (resource: ResourceType, amount: number) => void;
  placeCard: (cardId: string, position: Position) => void;
  transferToInventory: (cardInstanceId: string) => void;
  transferToStorage: (fromCardId: string, toCardId: string) => void;
  addConnection: (fromCardId: string, toCardId: string) => void;
  removeConnection: (connectionId: string) => void;
  setRecipe: (cardInstanceId: string, recipeId: string) => void;
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

// Create stationary resource nodes on the map from map configuration
const createResourceNodes = (mapId: string = DEFAULT_MAP): PlacedCard[] => {
  const mapConfig = MAPS[mapId];
  if (!mapConfig) return [];
  
  return mapConfig.resourceNodes.map((node, i) => ({
    instanceId: `${node.type}-${i}`,
    definitionId: node.type,
    position: node.position,
    isStationary: true,
    tier: node.tier,
  }));
};

const initialResources: Record<ResourceType, number> = {
  water: 0,
  food: 10,
  wood: 20,
  stone: 10,
  coal: 0,
  iron_ore: 0,
  iron_bar: 0,
  advanced_metal: 0,
  component: 0,
  slag: 0,
  power: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  grid: [],
  gridSize: { width: 6, height: 6 },
  resources: { ...initialResources },
  inventory: { ...initialResources },
  inventoryCapacity: 1000,
  population: 1,
  maxPopulation: 2,
  hand: ['well', 'farm', 'tent', 'lumber_mill'],
  placedCards: [],
  connections: [],
  mode: 'survival',
  turn: 0,
  isPaused: false,
  isGameOver: false,
  hasWon: false,

  initGame: (mode, mapId = DEFAULT_MAP) => {
    const mapConfig = MAPS[mapId];
    const width = mapConfig.width;
    const height = mapConfig.height;
    const resourceNodes = createResourceNodes(mapId);
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
      inventory: { ...initialResources },
      inventoryCapacity: 1000,
      population: 1,
      maxPopulation: 2,
      hand: ['miner', 'extractor', 'storage_small', 'storage_medium', 'storage_large', 'smelter', 'foundry', 'constructor', 'power_plant', 'conveyor', 'splitter'],
      placedCards: resourceNodes,
      connections: [],
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
    
    // Initialize storage for miners, extractors, and storage buildings
    if (cardId === 'miner' || cardId === 'extractor') {
      newCard.storage = {
        water: 0, food: 0, wood: 0, stone: 0, coal: 0, iron_ore: 0, iron_bar: 0, advanced_metal: 0, component: 0, slag: 0, power: 0
      };
      newCard.storageCapacity = 100; // Miners/extractors: 1 slot × 100 = 100 units
    } else if (cardId === 'storage_small') {
      newCard.storage = {
        water: 0, food: 0, wood: 0, stone: 0, coal: 0, iron_ore: 0, iron_bar: 0, advanced_metal: 0, component: 0, slag: 0, power: 0
      };
      newCard.storageCapacity = 500; // 5 slots × 100
    } else if (cardId === 'storage_medium') {
      newCard.storage = {
        water: 0, food: 0, wood: 0, stone: 0, coal: 0, iron_ore: 0, iron_bar: 0, advanced_metal: 0, component: 0, slag: 0, power: 0
      };
      newCard.storageCapacity = 1000; // 10 slots × 100
    } else if (cardId === 'storage_large') {
      newCard.storage = {
        water: 0, food: 0, wood: 0, stone: 0, coal: 0, iron_ore: 0, iron_bar: 0, advanced_metal: 0, component: 0, slag: 0, power: 0
      };
      newCard.storageCapacity = 2000; // 20 slots × 100
    } else if (['smelter', 'foundry', 'constructor'].includes(cardId)) {
      // Processing buildings have input/output storage
      newCard.storage = {
        water: 0, food: 0, wood: 0, stone: 0, coal: 0, iron_ore: 0, iron_bar: 0, advanced_metal: 0, component: 0, slag: 0, power: 0
      };
      newCard.storageCapacity = 200; // Can hold inputs + outputs
      newCard.isProcessing = false;
      
      // Assign recipe
      const recipe = getRecipeForBuilding(cardId);
      if (recipe) {
        newCard.recipe = {
          recipeId: recipe.id,
          inputs: recipe.inputs,
          outputs: recipe.outputs,
          processingTime: recipe.processingTime,
          progress: 0,
        };
      }
    }
    
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
    const state = get();
    const updatedCards = [...state.placedCards];
    
    // Water limit check - stop production if at 200
    const waterAtLimit = state.inventory.water >= 200;
    
    // Find all resource nodes with miners/extractors
    updatedCards.forEach((card) => {
      const position = card.position;
      const cardsAtPosition = updatedCards.filter(
        c => c.position.x === position.x && c.position.y === position.y
      );
      
      // Find if this position has both a resource node and a miner/extractor
      const resourceNode = cardsAtPosition.find(c => c.isStationary);
      const extractor = cardsAtPosition.find(c => ['miner', 'extractor'].includes(c.definitionId));
      
      if (resourceNode && extractor && extractor.storage && extractor.storageCapacity) {
        const tier = resourceNode.tier || 1;
        const baseProduction = 1;
        const tierMultiplier = tier;
        const production = baseProduction * tierMultiplier;
        
        // Calculate current total storage used
        const currentStorage = Object.values(extractor.storage).reduce((sum, val) => sum + val, 0);
        const availableSpace = extractor.storageCapacity - currentStorage;
        
        // If at 80% or more, try to transfer to adjacent storage buildings
        if (currentStorage >= extractor.storageCapacity * 0.8) {
          // Check adjacent tiles (4 directions)
          const adjacentPositions = [
            { x: position.x + 1, y: position.y },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x, y: position.y - 1 },
          ];
          
          for (const adjPos of adjacentPositions) {
            const storageIndex = updatedCards.findIndex(c => 
              c.position.x === adjPos.x && 
              c.position.y === adjPos.y &&
              ['storage_small', 'storage_medium', 'storage_large'].includes(c.definitionId) &&
              c.storage &&
              c.storageCapacity
            );
            
            if (storageIndex !== -1) {
              const adjacentStorage = updatedCards[storageIndex];
              
              if (adjacentStorage.storage && adjacentStorage.storageCapacity) {
                const storageUsed = Object.values(adjacentStorage.storage).reduce((sum, val) => sum + val, 0);
                const storageAvailable = adjacentStorage.storageCapacity - storageUsed;
                
                if (storageAvailable > 10) {
                  console.log(`Transferring from ${extractor.definitionId} to storage. Available: ${storageAvailable}`);
                  
                  // Transfer resources
                  const extractorIndex = updatedCards.findIndex(c => c.instanceId === extractor.instanceId);
                  if (extractorIndex !== -1 && updatedCards[extractorIndex].storage) {
                    Object.keys(updatedCards[extractorIndex].storage!).forEach(resourceKey => {
                      const resource = resourceKey as ResourceType;
                      const amount = updatedCards[extractorIndex].storage![resource];
                      
                      if (amount > 0) {
                        const transferAmount = Math.min(amount, storageAvailable);
                        updatedCards[extractorIndex].storage![resource] -= transferAmount;
                        updatedCards[storageIndex].storage![resource] += transferAmount;
                        console.log(`Transferred ${transferAmount} ${resource}`);
                      }
                    });
                  }
                  break;
                }
              }
            }
          }
        }
        
        // Check if extractor can produce (has space)
        if (availableSpace >= production) {
          const extractorIndex = updatedCards.findIndex(c => c.instanceId === extractor.instanceId);
          if (extractorIndex !== -1 && updatedCards[extractorIndex].storage) {
            // Produce resources based on node type
            switch (resourceNode.definitionId) {
              case 'water_source':
                if (extractor.definitionId === 'extractor' && !waterAtLimit) {
                  updatedCards[extractorIndex].storage!.water += production;
                }
                break;
              case 'iron_ore_deposit':
                if (extractor.definitionId === 'miner') {
                  updatedCards[extractorIndex].storage!.iron_ore += production;
                  updatedCards[extractorIndex].storage!.stone += production * 0.2;
                }
                break;
              case 'coal_deposit':
                if (extractor.definitionId === 'miner') {
                  updatedCards[extractorIndex].storage!.coal += production;
                  updatedCards[extractorIndex].storage!.stone += production * 0.2;
                }
                break;
              case 'stone_quarry':
                if (extractor.definitionId === 'miner') {
                  updatedCards[extractorIndex].storage!.stone += production;
                }
                break;
            }
          }
        }
      }
    });
    
    // Process smelters, foundries, constructors
    updatedCards.forEach((card, cardIndex) => {
      if (['smelter', 'foundry', 'constructor'].includes(card.definitionId) && card.storage && card.recipe) {
        // Check if has enough inputs to start processing
        if (!card.isProcessing) {
          const hasInputs = Object.keys(card.recipe.inputs).every(resourceKey => {
            const resource = resourceKey as ResourceType;
            const required = card.recipe!.inputs[resource];
            const available = card.storage![resource] || 0;
            return required !== undefined && available >= required;
          });
          
          if (hasInputs) {
            // Start processing - consume inputs
            Object.keys(card.recipe.inputs).forEach(resourceKey => {
              const resource = resourceKey as ResourceType;
              const required = card.recipe!.inputs[resource];
              if (required !== undefined) {
                updatedCards[cardIndex].storage![resource] -= required;
              }
            });
            
            updatedCards[cardIndex].isProcessing = true;
            updatedCards[cardIndex].recipe!.progress = 0;
            console.log(`${card.definitionId} started processing ${card.recipe.recipeId}`);
          }
        }
        
        // Continue processing
        if (card.isProcessing && card.recipe) {
          const progressPerTick = (1 / card.recipe.processingTime) * 100; // 1 second ticks
          updatedCards[cardIndex].recipe!.progress += progressPerTick;
          
          // Check if done
          if (updatedCards[cardIndex].recipe!.progress >= 100) {
            // Produce outputs
            Object.keys(card.recipe.outputs).forEach(resourceKey => {
              const resource = resourceKey as ResourceType;
              const output = card.recipe!.outputs[resource];
              if (output !== undefined && output > 0) {
                updatedCards[cardIndex].storage![resource] += output;
                console.log(`${card.definitionId} produced ${output} ${resource}`);
              }
            });
            
            updatedCards[cardIndex].isProcessing = false;
            updatedCards[cardIndex].recipe!.progress = 0;
            console.log(`${card.definitionId} finished processing, storage:`, updatedCards[cardIndex].storage);
          }
        }
        
        // Auto-transfer outputs to adjacent storage
        if (card.storage) {
          const totalUsed = Object.values(card.storage).reduce((sum, val) => sum + val, 0);
          if (totalUsed > card.storageCapacity! * 0.7) {
            const adjacentPositions = [
              { x: card.position.x + 1, y: card.position.y },
              { x: card.position.x - 1, y: card.position.y },
              { x: card.position.x, y: card.position.y + 1 },
              { x: card.position.x, y: card.position.y - 1 },
            ];
            
            for (const adjPos of adjacentPositions) {
              const storageIndex = updatedCards.findIndex(c => 
                c.position.x === adjPos.x && 
                c.position.y === adjPos.y &&
                ['storage_small', 'storage_medium', 'storage_large'].includes(c.definitionId)
              );
              
              if (storageIndex !== -1 && updatedCards[storageIndex].storage && updatedCards[storageIndex].storageCapacity) {
                const storageUsed = Object.values(updatedCards[storageIndex].storage!).reduce((sum, val) => sum + val, 0);
                const storageAvailable = updatedCards[storageIndex].storageCapacity! - storageUsed;
                
                if (storageAvailable > 10) {
                  // Transfer outputs (iron_bar, etc)
                  Object.keys(card.storage).forEach(resourceKey => {
                    const resource = resourceKey as ResourceType;
                    if (['iron_bar'].includes(resource)) { // Only transfer outputs
                      const amount = updatedCards[cardIndex].storage![resource];
                      if (amount > 0) {
                        const transferAmount = Math.min(amount, storageAvailable);
                        updatedCards[cardIndex].storage![resource] -= transferAmount;
                        updatedCards[storageIndex].storage![resource] += transferAmount;
                      }
                    }
                  });
                  break;
                }
              }
            }
          }
        }
      }
    });
    
    // Handle resource transfers through connections
    state.connections.forEach(connection => {
      const fromCardIndex = updatedCards.findIndex(c => c.instanceId === connection.from);
      const toCardIndex = updatedCards.findIndex(c => c.instanceId === connection.to);
      
      if (fromCardIndex !== -1 && toCardIndex !== -1) {
        const fromCard = updatedCards[fromCardIndex];
        const toCard = updatedCards[toCardIndex];
        
        if (fromCard.storage && toCard.storage && toCard.storageCapacity) {
          // Calculate available space in destination
          const toStorageUsed = Object.values(toCard.storage).reduce((sum, val) => sum + val, 0);
          const toStorageAvailable = toCard.storageCapacity - toStorageUsed;
          
          if (toStorageAvailable > 0) {
            // Transfer resources at connection speed (items per tick)
            const transferSpeed = connection.speed;
            let transferred = 0;
            
            Object.keys(fromCard.storage).forEach(resourceKey => {
              if (transferred >= transferSpeed) return;
              
              const resource = resourceKey as ResourceType;
              const amount = fromCard.storage![resource];
              
              if (amount > 0) {
                const transferAmount = Math.min(
                  amount,
                  transferSpeed - transferred,
                  toStorageAvailable
                );
                
                if (transferAmount > 0) {
                  updatedCards[fromCardIndex].storage![resource] -= transferAmount;
                  updatedCards[toCardIndex].storage![resource] += transferAmount;
                  transferred += transferAmount;
                }
              }
            });
          }
        }
      }
    });
    
    // Population consumes resources
    const foodConsumed = state.population * 0.5; // 0.5 food per tick per person
    const waterConsumed = state.population * 0.3; // 0.3 water per tick per person
    
    let newResources = { ...state.resources };
    newResources.food = Math.max(0, newResources.food - foodConsumed);
    newResources.water = Math.max(0, newResources.water - waterConsumed);
    
    // Check starvation/dehydration
    let newPopulation = state.population;
    if (newResources.food === 0 || newResources.water === 0) {
      newPopulation = Math.max(1, state.population - 1); // Lose 1 pop per tick if starving
    }
    
    // Check win condition: 10 population + 50 components
    const hasWon = newPopulation >= 10 && newResources.component >= 50;
    
    set({
      turn: state.turn + 1,
      placedCards: updatedCards,
      resources: newResources,
      population: newPopulation,
      hasWon,
    });
  },

  transferToInventory: (cardInstanceId) => {
    const state = get();
    const card = state.placedCards.find(c => c.instanceId === cardInstanceId);
    
    if (!card || !card.storage) return;
    
    const newInventory = { ...state.inventory };
    const updatedCards = state.placedCards.map(c => {
      if (c.instanceId === cardInstanceId && c.storage) {
        const newStorage = { ...c.storage };
        
        // Transfer all resources from card to inventory
        Object.keys(c.storage).forEach(resourceKey => {
          const resource = resourceKey as ResourceType;
          const amount = c.storage![resource];
          
          if (amount > 0) {
            newInventory[resource] += amount;
            newStorage[resource] = 0;
          }
        });
        
        return { ...c, storage: newStorage };
      }
      return c;
    });
    
    set({
      inventory: newInventory,
      placedCards: updatedCards,
    });
  },

  transferToStorage: (fromCardId, toCardId) => {
    const state = get();
    const fromCard = state.placedCards.find(c => c.instanceId === fromCardId);
    const toCard = state.placedCards.find(c => c.instanceId === toCardId);
    
    if (!fromCard || !toCard || !fromCard.storage || !toCard.storage || !toCard.storageCapacity) {
      return;
    }
    
    const updatedCards = state.placedCards.map(c => {
      if (c.instanceId === fromCardId && c.storage) {
        const newStorage = { ...c.storage };
        const targetCard = state.placedCards.find(card => card.instanceId === toCardId);
        
        if (targetCard && targetCard.storage && targetCard.storageCapacity) {
          // Calculate available space in target storage
          const targetUsed = Object.values(targetCard.storage).reduce((sum, val) => sum + val, 0);
          const availableSpace = targetCard.storageCapacity - targetUsed;
          
          // Transfer resources up to available space
          Object.keys(c.storage).forEach(resourceKey => {
            const resource = resourceKey as ResourceType;
            const amount = c.storage![resource];
            
            if (amount > 0 && availableSpace > 0) {
              const transferAmount = Math.min(amount, availableSpace);
              newStorage[resource] -= transferAmount;
              
              // Update target storage
              const targetIndex = state.placedCards.findIndex(card => card.instanceId === toCardId);
              if (targetIndex !== -1 && updatedCards[targetIndex].storage) {
                updatedCards[targetIndex] = {
                  ...updatedCards[targetIndex],
                  storage: {
                    ...updatedCards[targetIndex].storage!,
                    [resource]: updatedCards[targetIndex].storage![resource] + transferAmount
                  }
                };
              }
            }
          });
        }
        
        return { ...c, storage: newStorage };
      }
      return c;
    });
    
    set({
      placedCards: updatedCards,
    });
  },

  addConnection: (fromCardId, toCardId) => {
    const state = get();
    const fromCard = state.placedCards.find(c => c.instanceId === fromCardId);
    const toCard = state.placedCards.find(c => c.instanceId === toCardId);
    
    if (!fromCard || !toCard) return;
    
    // Check if connection already exists
    const existingConnection = state.connections.find(
      c => c.from === fromCardId && c.to === toCardId
    );
    
    if (existingConnection) return;
    
    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      from: fromCardId,
      to: toCardId,
      fromPos: fromCard.position,
      toPos: toCard.position,
      speed: 1, // 1 item per second
      type: 'conveyor',
    };
    
    set({
      connections: [...state.connections, newConnection],
    });
    
    console.log(`Connected ${fromCard.definitionId} to ${toCard.definitionId}`);
  },

  removeConnection: (connectionId) => {
    set((state) => ({
      connections: state.connections.filter(c => c.id !== connectionId),
    }));
  },  
  setRecipe: (cardInstanceId, recipeId) => {
    const recipe = RECIPES[recipeId];
    
    if (!recipe) return;
    
    set((state) => ({
      placedCards: state.placedCards.map(card => {
        if (card.instanceId === cardInstanceId) {
          return {
            ...card,
            recipe: {
              recipeId: recipe.id,
              inputs: recipe.inputs,
              outputs: recipe.outputs,
              processingTime: recipe.processingTime,
              progress: 0,
            },
            isProcessing: false,
          };
        }
        return card;
      }),
    }));
  },
}));
