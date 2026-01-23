import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Tile } from './Tile';
import { CardModal } from './CardModal';
import { ConnectionFlow } from './ConnectionFlow';
import { Position, PlacedCard } from '../../types/game';

export function Grid() {
  const grid = useGameStore((state) => state.grid);
  const placeCard = useGameStore((state) => state.placeCard);
  const transferToInventory = useGameStore((state) => state.transferToInventory);
  const addConnection = useGameStore((state) => state.addConnection);
  const connections = useGameStore((state) => state.connections);
  const placedCards = useGameStore((state) => state.placedCards);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [viewingCard, setViewingCard] = useState<PlacedCard | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null); // Card instanceId
  const [connectingFromPos, setConnectingFromPos] = useState<Position | null>(null);

  const handleTileClick = (position: Position, event?: React.MouseEvent) => {
    // Check if we're in connecting mode (shift key held)
    if (event?.shiftKey) {
      const cardsAtPosition = placedCards.filter(
        (c) => c.position.x === position.x && c.position.y === position.y
      );
      
      const building = cardsAtPosition.find(c => 
        !c.isStationary && 
        ['miner', 'extractor', 'storage_small', 'storage_medium', 'storage_large', 'smelter', 'foundry', 'constructor'].includes(c.definitionId)
      );
      
      if (building) {
        if (!connectingFrom) {
          // Start connection
          setConnectingFrom(building.instanceId);
          setConnectingFromPos(position);
          console.log(`Starting connection from ${building.definitionId}`);
        } else {
          // Complete connection
          addConnection(connectingFrom, building.instanceId);
          setConnectingFrom(null);
          setConnectingFromPos(null);
          console.log(`Connected to ${building.definitionId}`);
        }
      }
      return;
    }
    
    // Cancel connecting mode if clicking without shift
    if (connectingFrom) {
      setConnectingFrom(null);
      setConnectingFromPos(null);
      return;
    }
    
    // Check if there's a card at this position
    const cardsAtPosition = placedCards.filter(
      (c) => c.position.x === position.x && c.position.y === position.y
    );
    
    // Check if clicking on a miner/extractor (the small overlay)
    const minerExtractor = cardsAtPosition.find(c => ['miner', 'extractor'].includes(c.definitionId));
    const resourceNode = cardsAtPosition.find(c => c.isStationary);
    
    if (minerExtractor) {
      // Transfer resources from miner/extractor to inventory
      transferToInventory(minerExtractor.instanceId);
      return;
    }

    if (resourceNode) {
      // Open card modal for resource node
      setViewingCard(resourceNode);
      setSelectedPosition(position);
    } else if (cardsAtPosition.length > 0) {
      // Open card modal for other buildings
      setViewingCard(cardsAtPosition[0]);
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
      }));
    } else {
      // Placing new card from hand
      placeCard(cardInstanceId, position);
    }

    window.draggedCard = null;
  };

  if (grid.length === 0) return null;

  const TILE_SIZE = 56; // matches Tile component size (w-14 h-14 = 56px)

  return (
    <>
      <div className="w-full h-full overflow-auto bg-cream relative">
        <div className="inline-block relative">
          {/* SVG overlay for connection lines */}
          <svg 
            className="absolute top-0 left-0 pointer-events-none z-10"
            style={{ width: grid[0].length * TILE_SIZE, height: grid.length * TILE_SIZE }}
          >
            {/* Render existing connections */}
            {connections.map((conn) => {
              // Look up current card positions dynamically
              const fromCard = placedCards.find(c => c.instanceId === conn.from);
              const toCard = placedCards.find(c => c.instanceId === conn.to);
              
              if (!fromCard || !toCard) return null;
              
              const fromX = fromCard.position.x * TILE_SIZE + TILE_SIZE / 2;
              const fromY = fromCard.position.y * TILE_SIZE + TILE_SIZE / 2;
              const toX = toCard.position.x * TILE_SIZE + TILE_SIZE / 2;
              const toY = toCard.position.y * TILE_SIZE + TILE_SIZE / 2;

              return (
                <g key={conn.id}>
                  <line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="#4ade80"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="pointer-events-none"
                  />
                  {/* Invisible wider line for easier clicking */}
                  <line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="transparent"
                    strokeWidth="12"
                    className="pointer-events-auto cursor-pointer hover:stroke-red-300/30"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (window.confirm('Delete this connection?')) {
                        useGameStore.getState().removeConnection(conn.id);
                      }
                    }}
                  />
                  <circle cx={fromX} cy={fromY} r="3" fill="#4ade80" />
                  <circle cx={toX} cy={toY} r="3" fill="#4ade80" />
                </g>
              );
            })}
            
            {/* Animated flow particles */}
            <ConnectionFlow connections={connections} tileSize={TILE_SIZE} placedCards={placedCards} />
            
            {/* Show connecting line when in connection mode */}
            {connectingFrom && connectingFromPos && (
              <g>
                <circle 
                  cx={connectingFromPos.x * TILE_SIZE + TILE_SIZE / 2} 
                  cy={connectingFromPos.y * TILE_SIZE + TILE_SIZE / 2} 
                  r="6" 
                  fill="#facc15" 
                  opacity="0.8"
                />
              </g>
            )}
          </svg>

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
                  onClick={(e) => handleTileClick(tile.position, e)}
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
              // Add miner or extractor to resource node
              const extractorType = viewingCard.definitionId === 'water_source' ? 'extractor' : 'miner';
              placeCard(extractorType, viewingCard.position);
            }
          }}
        />
      )}
      
      {/* Connection mode indicator */}
      {connectingFrom && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg font-semibold z-50">
          🔗 Connection Mode - Shift+Click destination building (or click anywhere to cancel)
        </div>
      )}
    </>
  );
}
