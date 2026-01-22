import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Tile } from './Tile';
import { CardModal } from './CardModal';
import { Position, PlacedCard } from '../../types/game';

export function Grid() {
  const grid = useGameStore((state) => state.grid);
  const placeCard = useGameStore((state) => state.placeCard);
  const placedCards = useGameStore((state) => state.placedCards);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [viewingCard, setViewingCard] = useState<PlacedCard | null>(null);

  const handleTileClick = (position: Position) => {
    // Check if there's a card at this position
    const cardAtPosition = placedCards.find(
      (c) => c.position.x === position.x && c.position.y === position.y
    );

    if (cardAtPosition) {
      // Open card modal for any card (resources or buildings)
      setViewingCard(cardAtPosition);
      // Also select resource nodes for drag-and-drop upgrade
      if (cardAtPosition.isStationary) {
        setSelectedPosition(position);
      }
    } else {
      setSelectedPosition(null);
    }
  };

  const handleDrop = (position: { x: number; y: number }) => {
    const cardInstanceId = window.draggedCard;
    if (!cardInstanceId) return;

    // Check if it's a placed card being moved
    const existingCard = placedCards.find((c) => c.instanceId === cardInstanceId);
    
    if (existingCard) {
      // Don't allow moving stationary resource nodes
      if (existingCard.isStationary) {
        window.draggedCard = null;
        return;
      }

      const targetTile = grid[position.y]?.[position.x];
      if (targetTile?.state === 'occupied') {
        window.draggedCard = null;
        return;
      }
      
      // Move existing card
      useGameStore.setState((state) => ({
        placedCards: state.placedCards.map((c) =>
          c.instanceId === cardInstanceId
            ? { ...c, position }
            : c
        ),
        grid: state.grid.map((row) =>
          row.map((tile) => {
            if (tile.cardId === cardInstanceId) {
              return { ...tile, state: 'revealed' as const, cardId: undefined };
            }
            if (tile.position.x === position.x && tile.position.y === position.y) {
              return { ...tile, state: 'occupied' as const, cardId: cardInstanceId };
            }
            return tile;
          })
        ),
      }));
    } else {
      // Placing new card from hand
      const targetCard = placedCards.find(
        (c) => c.position.x === position.x && c.position.y === position.y
      );

      // If dropping a miner on a resource node, upgrade it
      if (cardInstanceId === 'miner' && targetCard?.isStationary) {
        useGameStore.setState((state) => ({
          placedCards: state.placedCards.map((c) =>
            c.position.x === position.x && c.position.y === position.y
              ? { ...c, definitionId: 'miner', isStationary: false }
              : c
          ),
        }));
        setSelectedPosition(null);
      } else {
        // Normal placement on empty tile
        const targetTile = grid[position.y]?.[position.x];
        if (targetTile?.state !== 'occupied') {
          placeCard(cardInstanceId, position);
        }
      }
    }

    window.draggedCard = null;
  };

  if (grid.length === 0) return null;

  return (
    <>
      <div className="w-full h-full overflow-auto bg-gray-100">
        <div className="inline-block">
          {grid.map((row, y) => (
            <div key={y} className="flex">
              {row.map((tile) => (
                <Tile
                  key={`${tile.position.x}-${tile.position.y}`}
                  tile={tile}
                  onDrop={handleDrop}
                  isSelected={
                    selectedPosition?.x === tile.position.x &&
                    selectedPosition?.y === tile.position.y
                  }
                  onClick={() => handleTileClick(tile.position)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Card Detail Modal */}
      {viewingCard && (
        <CardModal 
          card={viewingCard} 
          onClose={() => {
            setViewingCard(null);
            setSelectedPosition(null);
          }}
          onUpgrade={() => {
            if (viewingCard.isStationary && viewingCard.position) {
              // Upgrade resource node to miner
              useGameStore.setState((state) => ({
                placedCards: state.placedCards.map((c) =>
                  c.instanceId === viewingCard.instanceId
                    ? { ...c, definitionId: 'miner', isStationary: false }
                    : c
                ),
              }));
            }
          }}
        />
      )}
    </>
  );
}
