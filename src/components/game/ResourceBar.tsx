import { useGameStore } from '../../store/gameStore';

const resourceEmoji: Record<string, string> = {
  water: '💧',
  food: '🌾',
  wood: '🪵',
  stone: '🪨',
  coal: '🪨',
  iron_ore: '⛏️',
  iron_bars: '🔧',
  power: '⚡',
};

export function ResourceBar() {
  const inventory = useGameStore((state) => state.inventory);
  const inventoryCapacity = useGameStore((state) => state.inventoryCapacity);
  const population = useGameStore((state) => state.population);
  const maxPopulation = useGameStore((state) => state.maxPopulation);
  
  // Calculate total inventory usage
  const totalInventory = Object.values(inventory).reduce((sum, val) => sum + val, 0);

  return (
    <div className="flex flex-wrap gap-3 p-3 bg-cream-dark rounded-lg">
      <div className="flex items-center gap-1 font-semibold">
        👥 {population}/{maxPopulation}
      </div>
      <div className="flex items-center gap-1 font-semibold text-purple-700">
        🎒 {Math.floor(totalInventory)}/{inventoryCapacity}
      </div>
      {Object.entries(resourceEmoji).map(([key, emoji]) => {
        const amount = inventory[key as keyof typeof inventory];
        // Only show resources with amounts > 0
        if (amount <= 0) return null;
        return (
          <div key={key} className="flex items-center gap-1">
            {emoji} {Math.floor(amount)}
          </div>
        );
      })}
    </div>
  );
}
