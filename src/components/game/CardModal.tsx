import { PlacedCard, ResourceType } from '../../types/game';
import { getRecipesForBuilding, Recipe } from '../../data/recipes';
import { useGameStore } from '../../store/gameStore';

interface CardModalProps {
  card: PlacedCard;
  onClose: () => void;
  onUpgrade?: () => void;
}

const resourceInfo: Record<ResourceType, { name: string; color: string; emoji: string }> = {
  water: { name: 'Water', color: 'bg-blue-400', emoji: '💧' },
  food: { name: 'Food', color: 'bg-green-400', emoji: '🌾' },
  wood: { name: 'Wood', color: 'bg-amber-600', emoji: '🪵' },
  stone: { name: 'Stone', color: 'bg-gray-400', emoji: '🪨' },
  iron_ore: { name: 'Iron Ore', color: 'bg-orange-600', emoji: '⛏️' },
  coal: { name: 'Coal', color: 'bg-gray-700', emoji: '🪨' },
  iron_bar: { name: 'Iron Bar', color: 'bg-gray-500', emoji: '🔩' },
  advanced_metal: { name: 'Advanced Metal', color: 'bg-blue-500', emoji: '⚙️' },
  component: { name: 'Component', color: 'bg-purple-500', emoji: '🔧' },
  slag: { name: 'Slag', color: 'bg-red-900', emoji: '💩' },
};

const cardStyles: Record<string, { 
  gradient: string; 
  border: string;
  title: string;
  type: string;
  description: string;
}> = {
  water_source: {
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    border: 'border-blue-300',
    title: 'Water Source',
    type: 'Resource Node',
    description: 'Natural spring providing fresh water. Place an extractor here to pump water continuously.',
  },
  iron_ore_deposit: {
    gradient: 'from-orange-500 via-orange-600 to-orange-700',
    border: 'border-orange-300',
    title: 'Iron Ore Deposit',
    type: 'Resource Node',
    description: 'Rich vein of iron ore. Place a miner here to extract iron ore for smelting.',
  },
  coal_deposit: {
    gradient: 'from-gray-600 via-gray-700 to-gray-900',
    border: 'border-gray-400',
    title: 'Coal Deposit',
    type: 'Resource Node',
    description: 'Coal seam providing fuel for smelters and power generation.',
  },
  stone_quarry: {
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    border: 'border-gray-300',
    title: 'Stone Quarry',
    type: 'Resource Node',
    description: 'Stone deposits for construction and building materials.',
  },
  miner: {
    gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
    border: 'border-yellow-300',
    title: 'Miner',
    type: 'Extraction Building',
    description: 'Extracts resources from ore deposits, coal seams, and stone quarries. Connect to conveyors to transport materials.',
  },
  extractor: {
    gradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
    border: 'border-cyan-300',
    title: 'Extractor',
    type: 'Extraction Building',
    description: 'Pumps water from water sources. Connect to conveyors to transport water to processing facilities.',
  },
  smelter: {
    gradient: 'from-red-400 via-red-500 to-red-600',
    border: 'border-red-300',
    title: 'Smelter',
    type: 'Processing Building',
    description: 'Processes ore into refined materials. Requires power and fuel to operate.',
  },
  foundry: {
    gradient: 'from-red-600 via-red-700 to-red-800',
    border: 'border-red-400',
    title: 'Foundry',
    type: 'Advanced Processing',
    description: 'Advanced metalworking facility. Creates high-grade materials for construction.',
  },
  constructor: {
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    border: 'border-blue-300',
    title: 'Constructor',
    type: 'Manufacturing',
    description: 'Assembles components into finished structures and equipment.',
  },
  power_plant: {
    gradient: 'from-yellow-300 via-yellow-400 to-yellow-500',
    border: 'border-yellow-200',
    title: 'Power Plant',
    type: 'Utility',
    description: 'Generates power for nearby buildings. Burns coal to produce electricity.',
  },
  conveyor: {
    gradient: 'from-gray-300 via-gray-400 to-gray-500',
    border: 'border-gray-200',
    title: 'Conveyor Belt',
    type: 'Logistics',
    description: 'Transports materials between buildings. Connect from output to input.',
  },
  splitter: {
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
    border: 'border-purple-300',
    title: 'Splitter',
    type: 'Logistics',
    description: 'Divides resource flow into multiple paths. Useful for distributing materials.',
  },
};

const cardEmojis: Record<string, string> = {
  water_source: '💧',
  iron_ore_deposit: '⛏️',
  coal_deposit: '🪨',
  stone_quarry: '🗿',
  miner: '⛏️',
  smelter: '🔥',
  foundry: '🏭',
  constructor: '🏗️',
  power_plant: '⚡',
  conveyor: '➡️',
  splitter: '⚡',
};

export function CardModal({ card, onClose, onUpgrade }: CardModalProps) {
  const style = cardStyles[card.definitionId] || cardStyles.miner;
  const emoji = cardEmojis[card.definitionId] || '📦';
  const tier = card.tier || 1;
  const setRecipe = useGameStore((state) => state.setRecipe);
  
  // Get available recipes for this building
  const availableRecipes = getRecipesForBuilding(card.definitionId);
  const hasRecipes = availableRecipes.length > 0;
  const currentRecipeId = card.recipe?.recipeId;
  
  const tierNames = {
    1: 'Common',
    2: 'Uncommon',
    3: 'Rare',
  };
  
  const tierColors = {
    1: 'from-gray-400 to-gray-500',
    2: 'from-blue-400 to-blue-600',
    3: 'from-yellow-400 to-yellow-600',
  };
  
  const tierBorders = {
    1: 'border-gray-400',
    2: 'border-blue-400',
    3: 'border-yellow-400',
  };
  
  const resourceYield = {
    1: '100%',
    2: '150%',
    3: '200%',
  };

  // Get storage contents
  const storageContents = card.storage || {};
  const storageUsed = Object.values(storageContents).reduce((sum, val) => sum + val, 0);
  const capacity = card.storageCapacity || 0;
  const hasStorage = capacity > 0;
  const fillPercent = capacity > 0 ? Math.floor((storageUsed / capacity) * 100) : 0;
  
  // Check if processing
  const isProcessing = card.isProcessing || false;
  const recipeProgress = card.recipe?.progress || 0;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Trading Card Style */}
        <div className={`
          bg-gradient-to-b ${style.gradient}
          rounded-2xl shadow-2xl
          border-8 ${card.tier ? tierBorders[card.tier as keyof typeof tierBorders] : style.border}
          p-1
          transform hover:scale-105 transition-transform
        `}>
          {/* Card Inner Border */}
          <div className="bg-cream rounded-xl p-4 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg z-10"
            >
              ✕
            </button>

            {/* Card Header */}
            <div className="text-center mb-4">
              <div className="text-6xl mb-2 relative inline-block">
                {emoji}
                {card.tier && card.tier > 1 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-yellow-600 shadow">
                    {'★'.repeat(card.tier)}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{style.title}</h2>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {style.type}
              </div>
              {card.tier && (
                <div className={`
                  inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold text-white
                  bg-gradient-to-r ${tierColors[card.tier as keyof typeof tierColors]}
                `}>
                  {tierNames[card.tier as keyof typeof tierNames]}
                </div>
              )}
            </div>

            {/* Card Art Section */}
            <div className={`
              bg-gradient-to-br ${style.gradient}
              rounded-lg h-32 flex items-center justify-center mb-4
              border-2 ${style.border}
              shadow-inner
            `}>
              <div className="text-8xl opacity-30">{emoji}</div>
            </div>

            {/* Description */}
            <div className="bg-white/80 rounded-lg p-3 mb-4 border border-gray-300">
              <p className="text-sm text-gray-700 leading-relaxed">
                {style.description}
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-blue-100 rounded p-2 text-center border border-blue-300">
                <div className="text-xs text-gray-600">Tier</div>
                <div className="text-lg font-bold text-blue-700">{tier}</div>
              </div>
              <div className="bg-green-100 rounded p-2 text-center border border-green-300">
                <div className="text-xs text-gray-600">
                  {card.isStationary ? 'Yield' : 'Efficiency'}
                </div>
                <div className="text-lg font-bold text-green-700">
                  {card.isStationary ? resourceYield[tier as keyof typeof resourceYield] : '100%'}
                </div>
              </div>
            </div>

            {/* Storage/Inventory Section */}
            {hasStorage && (
              <div className="bg-amber-50 rounded-lg p-3 mb-4 border-2 border-amber-300">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-bold text-amber-700 uppercase">Storage</div>
                  <div className="text-xs text-gray-600">
                    {Math.floor(storageUsed)} / {capacity} ({fillPercent}%)
                  </div>
                </div>
                
                {/* Storage bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      fillPercent >= 90 ? 'bg-red-500' : 
                      fillPercent >= 70 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>

                {/* Resource items */}
                {Object.keys(storageContents).length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(storageContents).map(([resource, amount]) => {
                      if (amount === 0) return null;
                      const info = resourceInfo[resource as ResourceType];
                      return (
                        <div 
                          key={resource}
                          className={`${info.color} rounded p-2 text-white text-center border border-white/30`}
                        >
                          <div className="text-lg">{info.emoji}</div>
                          <div className="text-xs font-bold">{Math.floor(amount)}</div>
                          <div className="text-[8px] opacity-80">{info.name}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 text-sm py-2">
                    Empty
                  </div>
                )}
              </div>
            )}

            {/* Recipe Progress Section */}
            {isProcessing && card.recipe && (
              <div className="bg-yellow-50 rounded-lg p-3 mb-4 border-2 border-yellow-300">
                <div className="text-xs font-bold text-yellow-700 uppercase mb-2">Processing</div>
                <div className="text-sm text-gray-700 mb-2">
                  {availableRecipes.find(r => r.id === card.recipe?.recipeId)?.name || 'Processing...'}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all"
                    style={{ width: `${recipeProgress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 text-right mt-1">
                  {Math.floor(recipeProgress)}%
                </div>
              </div>
            )}
            
            {/* Recipe Selection Section */}
            {hasRecipes && (
              <div className="bg-indigo-50 rounded-lg p-3 mb-4 border-2 border-indigo-300">
                <div className="text-xs font-bold text-indigo-700 uppercase mb-2">Select Recipe</div>
                <div className="space-y-2">
                  {availableRecipes.map((recipe) => {
                    const isActive = recipe.id === currentRecipeId;
                    return (
                      <button
                        key={recipe.id}
                        onClick={() => {
                          setRecipe(card.instanceId, recipe.id);
                        }}
                        className={`w-full p-2 rounded-lg border-2 text-left transition-all ${
                          isActive 
                            ? 'bg-indigo-500 border-indigo-600 text-white' 
                            : 'bg-white border-indigo-200 hover:border-indigo-400 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{recipe.name}</span>
                          <span className="text-xs opacity-75">{recipe.processingTime}s</span>
                        </div>
                        <div className="text-[10px] opacity-90">
                          <span className="mr-2">
                            In: {Object.entries(recipe.inputs).map(([res, amt]) => 
                              `${resourceInfo[res as ResourceType]?.emoji || '?'}×${amt}`
                            ).join(' ')}
                          </span>
                          <span>
                            Out: {Object.entries(recipe.outputs).map(([res, amt]) => 
                              `${resourceInfo[res as ResourceType]?.emoji || '?'}×${amt}`
                            ).join(' ')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upgrade Slots */}
            <div className="bg-purple-50 rounded-lg p-3 border-2 border-purple-300">
              <div className="text-xs font-bold text-purple-700 mb-2 uppercase">
                {card.isStationary ? 'Add Extraction Building' : 'Upgrade Slots'}
              </div>
              {card.isStationary ? (
                <button
                  onClick={() => {
                    onUpgrade?.();
                    onClose();
                  }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {card.definitionId === 'water_source' ? '💦 Place Extractor Here' : '⛏️ Place Miner Here'}
                </button>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white border-2 border-dashed border-purple-300 rounded aspect-square flex items-center justify-center text-2xl hover:border-purple-500 cursor-pointer transition-colors">
                    +
                  </div>
                  <div className="bg-white border-2 border-dashed border-purple-300 rounded aspect-square flex items-center justify-center text-2xl hover:border-purple-500 cursor-pointer transition-colors">
                    +
                  </div>
                  <div className="bg-white border-2 border-dashed border-purple-300 rounded aspect-square flex items-center justify-center text-2xl hover:border-purple-500 cursor-pointer transition-colors">
                    +
                  </div>
                </div>
              )}
            </div>

            {/* Card ID Footer */}
            <div className="mt-4 text-center">
              <div className="text-[8px] text-gray-400 font-mono">
                ID: {card.instanceId}
              </div>
            </div>
          </div>
        </div>

        {/* Holographic Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
}
