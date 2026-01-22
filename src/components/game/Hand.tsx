import { useGameStore } from '../../store/gameStore';

const cardInfo: Record<string, { emoji: string; color: string; bg: string }> = {
  miner: { emoji: '⛏️', color: 'border-yellow-600', bg: 'bg-yellow-100' },
  extractor: { emoji: '💦', color: 'border-cyan-600', bg: 'bg-cyan-100' },
  smelter: { emoji: '🔥', color: 'border-red-600', bg: 'bg-red-100' },
  foundry: { emoji: '🏭', color: 'border-red-800', bg: 'bg-red-200' },
  constructor: { emoji: '🏗️', color: 'border-blue-600', bg: 'bg-blue-100' },
  power_plant: { emoji: '⚡', color: 'border-yellow-500', bg: 'bg-yellow-100' },
  conveyor: { emoji: '➡️', color: 'border-gray-600', bg: 'bg-gray-100' },
  splitter: { emoji: '⚡', color: 'border-purple-600', bg: 'bg-purple-100' },
};

export function Hand() {
  const hand = useGameStore((state) => state.hand);

  return (
    <div className="p-3">
      <div className="flex gap-2 flex-wrap justify-center">
        {hand.map((cardId, index) => {
          const info = cardInfo[cardId] || { emoji: '📦', color: 'border-gray-400', bg: 'bg-gray-100' };
          return (
            <div
              key={`${cardId}-${index}`}
              draggable
              onDragStart={(e) => {
                window.draggedCard = cardId;
                e.dataTransfer.effectAllowed = 'move';
              }}
              className={`
                w-20 h-20 p-2
                ${info.bg}
                border-2 ${info.color} rounded shadow
                cursor-move
                flex flex-col items-center justify-center
                hover:shadow-lg hover:scale-105
                transition-transform
              `}
            >
              <div className="text-2xl">{info.emoji}</div>
              <div className="text-[8px] font-bold mt-1 text-center">
                {cardId.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
