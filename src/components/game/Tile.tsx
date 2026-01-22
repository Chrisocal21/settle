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
  extractor: { emoji: '💦', color: 'bg-cyan-500', name: 'Extractor' },
  smelter: { emoji: '🔥', color: 'bg-red-500', name: 'Smelter' },
  foundry: { emoji: '🏭', color: 'bg-red-700', name: 'Foundry' },
  constructor: { emoji: '🏗️', color: 'bg-blue-600', name: 'Constructor' },
  power_plant: { emoji: '⚡', color: 'bg-yellow-400', name: 'Power' },
  conveyor: { emoji: '➡️', color: 'bg-gray-400', name: 'Conveyor' },
  splitter: { emoji: '⚡', color: 'bg-purple-500', name: 'Splitter' },
};

export function Tile({ tile, onDrop, isSelected, onClick }: TileProps) {
  const placedCards = useGameStore((state) => state.placedCards);
  const cardsOnTile = placedCards.filter(
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
        hover:bg-gray-100
        cursor-pointer
      `}
    >
      <div className="absolute top-0 left-0 text-[6px] text-gray-400 font-mono px-0.5">
        {tile.position.x},{tile.position.y}
      </div>
      
      {cardsOnTile.length > 0 && (
        <>
          {/* Render resource nodes first (full size) */}
          {cardsOnTile.filter(c => c.isStationary).map((card) => {
            const cardInfo = cardDisplay[card.definitionId];
            const tier = card.tier || 1;
            const tierStars = '★'.repeat(tier);
            
            return (
              <div
                key={card.instanceId}
                className={`
                  absolute inset-0.5
                  ${cardInfo.color} 
                  border-2 border-dashed border-yellow-400
                  rounded
                  cursor-pointer
                  flex flex-col items-center justify-center 
                  text-white font-bold
                  ${card.tier && card.tier > 1 ? `ring-2 ${tierColors[card.tier as keyof typeof tierColors]}` : ''}
                `}
                title={`${cardInfo.name} (Tier ${tier})`}
              >
                <div className="text-xl">{cardInfo.emoji}</div>
                {card.tier && card.tier > 1 && (
                  <div className="text-[8px] text-yellow-300 absolute top-0 right-0.5">
                    {tierStars}
                  </div>
                )}
                <div className="text-[6px]">{cardInfo.name}</div>
              </div>
            );
          })}
          
          {/* Render miners/extractors as small overlays */}
          {cardsOnTile.filter(c => ['miner', 'extractor'].includes(c.definitionId)).map((card) => {
            const cardInfo = cardDisplay[card.definitionId];
            
            return (
              <div
                key={card.instanceId}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('cardInstanceId', card.instanceId);
                }}
                className={`
                  absolute bottom-0.5 right-0.5
                  w-6 h-6
                  ${cardInfo.color} 
                  border-2 border-white
                  rounded
                  cursor-move hover:scale-110
                  flex items-center justify-center 
                  text-white
                  transition-transform
                  shadow-lg
                `}
                style={{ zIndex: 10 }}
                title={cardInfo.name}
              >
                <div className="text-sm">{cardInfo.emoji}</div>
              </div>
            );
          })}
          
          {/* Render other buildings normally */}
          {cardsOnTile.filter(c => !c.isStationary && !['miner', 'extractor'].includes(c.definitionId)).map((card) => {
            const cardInfo = cardDisplay[card.definitionId];
            
            return (
              <div
                key={card.instanceId}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('cardInstanceId', card.instanceId);
                }}
                className={`
                  absolute inset-0.5
                  ${cardInfo.color} 
                  border border-gray-900
                  rounded
                  cursor-move hover:scale-105
                  flex flex-col items-center justify-center 
                  text-white font-bold
                  transition-transform
                `}
                title={cardInfo.name}
              >
                <div className="text-xl">{cardInfo.emoji}</div>
                <div className="text-[6px]">{cardInfo.name}</div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
