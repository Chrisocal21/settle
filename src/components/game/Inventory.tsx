import { useGameStore } from '../../store/gameStore';

const resourceInfo: Record<string, { emoji: string; name: string; color: string }> = {
  water: { emoji: '💧', name: 'Water', color: 'bg-blue-500' },
  food: { emoji: '🌾', name: 'Food', color: 'bg-green-500' },
  wood: { emoji: '🪵', name: 'Wood', color: 'bg-amber-700' },
  stone: { emoji: '🪨', name: 'Stone', color: 'bg-gray-500' },
  coal: { emoji: '🪨', name: 'Coal', color: 'bg-gray-800' },
  iron_ore: { emoji: '⛏️', name: 'Iron Ore', color: 'bg-orange-600' },
  iron_bars: { emoji: '🔧', name: 'Iron Bars', color: 'bg-slate-600' },
  power: { emoji: '⚡', name: 'Power', color: 'bg-yellow-400' },
};

export function Inventory() {
  const inventory = useGameStore((state) => state.inventory);
  const inventoryCapacity = useGameStore((state) => state.inventoryCapacity);

  // Calculate total inventory usage
  const totalUsed = Object.values(inventory).reduce((sum, val) => sum + val, 0);
  const fillPercent = (totalUsed / inventoryCapacity) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-cream rounded-lg shadow-2xl border-4 border-amber-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
          🎒 Inventory
        </h2>
        <div className="text-sm font-semibold text-amber-800">
          {Math.floor(totalUsed)} / {inventoryCapacity}
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="mb-4 bg-gray-300 rounded-full h-4 overflow-hidden border-2 border-gray-400">
        <div
          className={`h-full transition-all ${
            fillPercent > 90 ? 'bg-red-500' : fillPercent > 70 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(fillPercent, 100)}%` }}
        />
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(resourceInfo).map(([key, info]) => {
          const amount = Math.floor(inventory[key as keyof typeof inventory]);
          const hasAmount = amount > 0;

          return (
            <div
              key={key}
              className={`
                relative p-3 rounded-lg border-2 
                ${hasAmount 
                  ? `${info.color} border-gray-800 shadow-lg` 
                  : 'bg-gray-200 border-gray-400 opacity-50'
                }
                transition-all hover:scale-105
              `}
            >
              {/* Resource Icon */}
              <div className="text-3xl text-center mb-1">{info.emoji}</div>
              
              {/* Resource Name */}
              <div className="text-[10px] text-center font-bold text-white truncate">
                {info.name}
              </div>
              
              {/* Amount Badge */}
              {hasAmount && (
                <div className="absolute -top-2 -right-2 bg-white border-2 border-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">{amount}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t-2 border-amber-700">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-blue-100 p-2 rounded border border-blue-300">
            <span className="font-semibold">💧 Water:</span> {Math.floor(inventory.water)} / 200
          </div>
          <div className="bg-orange-100 p-2 rounded border border-orange-300">
            <span className="font-semibold">⛏️ Iron Ore:</span> {Math.floor(inventory.iron_ore)}
          </div>
          <div className="bg-gray-100 p-2 rounded border border-gray-300">
            <span className="font-semibold">🪨 Coal:</span> {Math.floor(inventory.coal)}
          </div>
          <div className="bg-gray-100 p-2 rounded border border-gray-300">
            <span className="font-semibold">🪨 Stone:</span> {Math.floor(inventory.stone)}
          </div>
        </div>
      </div>

      {/* Hint Text */}
      <div className="mt-4 text-xs text-center text-gray-600 italic">
        Click miners/extractors to collect resources • Use resources for crafting & research
      </div>
    </div>
  );
}
