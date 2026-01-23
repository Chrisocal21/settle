import { useEffect, useState } from 'react';
import { Connection, PlacedCard } from '../../types/game';

interface FlowParticle {
  id: string;
  connectionId: string;
  progress: number; // 0-1
}

interface ConnectionFlowProps {
  connections: Connection[];
  tileSize: number;
  placedCards: PlacedCard[];
}

export function ConnectionFlow({ connections, tileSize, placedCards }: ConnectionFlowProps) {
  const [particles, setParticles] = useState<FlowParticle[]>([]);

  useEffect(() => {
    // Create particles for each active connection
    const interval = setInterval(() => {
      setParticles((prev) => {
        // Remove completed particles
        const active = prev.filter((p) => p.progress < 1);
        
        // Add new particles (one per connection every 1 second)
        const newParticles = connections.map((conn) => ({
          id: `${conn.id}-${Date.now()}-${Math.random()}`,
          connectionId: conn.id,
          progress: 0,
        }));
        
        return [...active, ...newParticles];
      });
    }, 1000); // New particle every second

    return () => clearInterval(interval);
  }, [connections]);

  useEffect(() => {
    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          progress: p.progress + 0.02, // Move 2% per frame (50 frames = 1 second)
        }))
      );
    }, 20); // 50 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((particle) => {
        const connection = connections.find((c) => c.id === particle.connectionId);
        if (!connection) return null;

        // Look up current card positions dynamically
        const fromCard = placedCards.find(c => c.instanceId === connection.from);
        const toCard = placedCards.find(c => c.instanceId === connection.to);
        
        if (!fromCard || !toCard) return null;

        const fromX = fromCard.position.x * tileSize + tileSize / 2;
        const fromY = fromCard.position.y * tileSize + tileSize / 2;
        const toX = toCard.position.x * tileSize + tileSize / 2;
        const toY = toCard.position.y * tileSize + tileSize / 2;

        const currentX = fromX + (toX - fromX) * particle.progress;
        const currentY = fromY + (toY - fromY) * particle.progress;

        return (
          <circle
            key={particle.id}
            cx={currentX}
            cy={currentY}
            r="4"
            fill="#fbbf24"
            className="animate-pulse"
          />
        );
      })}
    </>
  );
}
