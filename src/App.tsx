import { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import { Grid } from './components/game/Grid';
import { ResourceBar } from './components/game/ResourceBar';
import { Hand } from './components/game/Hand';
import { Inventory } from './components/game/Inventory';

// Global drag state
declare global {
  interface Window {
    draggedCard: string | null;
  }
}

function App() {
  const initGame = useGameStore((state) => state.initGame);
  const tick = useGameStore((state) => state.tick);
  const [showHand, setShowHand] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    initGame('survival', 30, 30);
  }, [initGame]);

  // Game loop - tick every second
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [tick]);

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
    // Swipe right from left edge = show inventory
    else if (deltaY < -50 && touchStartY < window.innerHeight * 0.3) {
      setShowInventory(true);
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
      
      {/* Floating Inventory Button (top-left) */}
      <button
        onClick={() => setShowInventory(!showInventory)}
        className="absolute top-4 left-4 w-12 h-12 bg-amber-600 border-2 border-amber-900 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
        title="Toggle Inventory"
      >
        <span className="text-xl">🎒</span>
      </button>

      {/* Floating Hand Button (bottom-right) */}
      <button
        onClick={() => setShowHand(!showHand)}
        className="absolute bottom-4 right-4 w-12 h-12 bg-cream-dark border-2 border-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
        title="Toggle Buildings"
      >
        <span className="text-xl">🏗️</span>
      </button>

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

      {/* Inventory - Popup Modal */}
      {showInventory && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowInventory(false)}
        >
          <div 
            className="bg-cream-dark border-4 border-amber-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-cream-dark border-b-2 border-amber-800 z-10">
              <div className="flex items-center justify-between p-4">
                <div className="text-2xl font-bold text-amber-900">🏛️ Settle</div>
                <button
                  onClick={() => setShowInventory(false)}
                  className="w-10 h-10 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="px-4 pb-4">
                <ResourceBar />
              </div>
            </div>
            <div className="p-4">
              <Inventory />
            </div>
          </div>
        </div>
      )}

      {/* Swipe hints (show briefly on load) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-600 bg-white/90 px-3 py-1 rounded-full pointer-events-none z-20 md:hidden shadow">
        ↑ Buildings | ↓ Resources | Click resources → Drag miner to upgrade
      </div>
    </div>
  );
}

export default App;
