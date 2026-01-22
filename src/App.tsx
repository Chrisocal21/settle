import { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import { Grid } from './components/game/Grid';
import { ResourceBar } from './components/game/ResourceBar';
import { Hand } from './components/game/Hand';

// Global drag state
declare global {
  interface Window {
    draggedCard: string | null;
  }
}

function App() {
  const initGame = useGameStore((state) => state.initGame);
  const [showResources, setShowResources] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    initGame('survival', 30, 30);
  }, [initGame]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    
    // Swipe up from bottom = show hand
    if (deltaY > 50 && touchStartY > window.innerHeight * 0.7) {
      setShowHand(true);
      setTouchStartY(null);
    }
    // Swipe down from top = show resources
    else if (deltaY < -50 && touchStartY < window.innerHeight * 0.3) {
      setShowResources(true);
      setTouchStartY(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cream relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fullscreen Grid */}
      <div className="absolute inset-0">
        <Grid />
      </div>
      
      {/* Floating Resource Button (top-right) */}
      <button
        onClick={() => setShowResources(!showResources)}
        className="absolute top-4 right-4 w-12 h-12 bg-cream-dark border-2 border-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
        title="Toggle Resources"
      >
        <span className="text-xl">💎</span>
      </button>

      {/* Floating Hand Button (bottom-right) */}
      <button
        onClick={() => setShowHand(!showHand)}
        className="absolute bottom-4 right-4 w-12 h-12 bg-cream-dark border-2 border-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
        title="Toggle Buildings"
      >
        <span className="text-xl">🏗️</span>
      </button>

      {/* Resource Bar - Slide from top */}
      <div
        className={`
          absolute top-0 left-0 right-0 z-30
          transition-transform duration-300 ease-in-out
          ${showResources ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="bg-cream-dark border-b-2 border-gray-700 shadow-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold">🏛️ Settle</h1>
            <button
              onClick={() => setShowResources(false)}
              className="text-2xl hover:scale-125 transition-transform"
            >
              ✕
            </button>
          </div>
          <ResourceBar />
          <p className="text-xs text-gray-600 mt-2">
            Click resource nodes (dashed border) → Drag miner onto them to upgrade | Conveyors connect buildings
          </p>
        </div>
      </div>

      {/* Hand - Slide from bottom */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-30
          transition-transform duration-300 ease-in-out
          ${showHand ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="bg-cream-dark border-t-2 border-gray-700 shadow-xl">
          <div className="flex items-center justify-between p-3 pb-2">
            <div className="text-sm font-semibold">🏗️ Buildings</div>
            <button
              onClick={() => setShowHand(false)}
              className="text-2xl hover:scale-125 transition-transform"
            >
              ✕
            </button>
          </div>
          <Hand />
        </div>
      </div>

      {/* Swipe hints (show briefly on load) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-600 bg-white/90 px-3 py-1 rounded-full pointer-events-none z-20 md:hidden shadow">
        ↑ Buildings | ↓ Resources | Click resources → Drag miner to upgrade
      </div>
    </div>
  );
}

export default App;
