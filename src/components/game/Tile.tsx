import { Tile as TileType } from '../../types/game';
import { useGameStore } from '../../store/gameStore';

interface TileProps {
  tile: TileType;
  onDrop: (position: { x: number; y: number }) => void;
  isSelected: boolean;
  onClick: () => void;
}

const cardDisplay: Record<string, { emoji: string; color: string; name: string }> = {
  // Resource nodes (stationary)
  water_source: { emoji: '💧', color: 'bg-blue-500', name: 'Water' },
  iron_ore_deposit: { emoji: '⛏️', color: 'bg-orange-700', name: 'Iron Ore' },
  coal_deposit: { emoji: '🪨', color: 'bg-gray-800', name: 'Coal' },
  stone_quarry: { emoji: '🗿', color: 'bg-gray-500', name: 'Stone' },
  
  // Player buildings
  miner: { emoji: '⛏️', color: 'bg-yellow-500', name: 'Miner' },
  smelter: { emoji: '🔥', color: 'bg-red-500', name: 'Smelter' },
  foundry: { emoji: '🏭', color: 'bg-red-700', name: 'Foundry' },
  constructor: { emoji: '🏗️', color: 'bg-blue-600', name: 'Constructor' },
  power_plant: { emoji: '⚡', color: 'bg-yellow-400', name: 'Power' },
  conveyor: { emoji: '➡️', color: 'bg-gray-400', name: 'Conveyor' },
  splitter: { emoji: '⚡', color: 'bg-purple-500', name: 'Splitter' },
};

export function Tile({ tile, onDrop, isSelected, onClick }: TileProps) {
  const placedCards = useGameStore((state) => state.placedCards);
  const cardOnTile = placedCards.find(
    (c) => c.position.x === tile.position.x && c.position.y === tile.position.y
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('ring-2', 'ring-blue-400');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('ring-2', 'ring-blue-400');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-blue-400');
    onDrop(tile.position);
  };

  const cardInfo = cardOnTile ? cardDisplay[cardOnTile.definitionId] : null;
  const tier = cardOnTile?.tier || 1;
  
  // Tier indicators
  const tierStars = '★'.repeat(tier);
  const tierColors = {
    1: 'ring-gray-400',
    2: 'ring-blue-400',
    3: 'ring-yellow-400',
  };

  return (
    <div
      onClick={onClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative
        w-14 h-14
        border border-gray-300
        bg-gray-50
        transition-all
        ${isSelected ? 'ring-4 ring-green-400 bg-green-50' : ''}
        ${cardOnTile?.tier && cardOnTile.tier > 1 ? `ring-2 ${tierColors[cardOnTile.tier as keyof typeof tierColors]}` : ''}
        hover:bg-gray-100
        cursor-pointer
      `}
    >
      <div className="absolute top-0 left-0 text-[6px] text-gray-400 font-mono px-0.5">
        {tile.position.x},{tile.position.y}
      </div>
      
      {cardOnTile && cardInfo && (
        <div
          draggable={!cardOnTile.isStationary}
          onDragStart={(e) => {
            if (cardOnTile.isStationary) {
              e.preventDefault();
              return;
            }
            e.dataTransfer.setData('cardInstanceId', cardOnTile.instanceId);
          }}
          className={`
            absolute inset-0.5
            ${cardInfo.color} 
            ${cardOnTile.isStationary ? 'border-2 border-dashed border-yellow-400' : 'border border-gray-900'} 
            rounded
            ${!cardOnTile.isStationary ? 'cursor-move hover:scale-105' : 'cursor-pointer'}
            flex flex-col items-center justify-center 
            text-white font-bold
            transition-transform
          `}
          title={cardOnTile.isStationary ? `${cardInfo.name} (Tier ${tier})` : cardInfo.name}
        >
          <div className="text-xl">{cardInfo.emoji}</div>
          {cardOnTile.tier && cardOnTile.tier > 1 && (
            <div className="text-[8px] text-yellow-300 absolute top-0 right-0.5">
              {tierStars}
            </div>
          )}
          <div className="text-[6px]">{cardInfo.name}</div>
        </div>
      )}
    </div>
  );
}
