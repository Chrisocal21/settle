interface WinModalProps {
  onClose: () => void;
  onRestart: () => void;
}

export function WinModal({ onClose, onRestart }: WinModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl border-8 border-yellow-300 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Victory!</h1>
          <p className="text-xl text-yellow-100 mb-6">
            Your settlement has thrived!
          </p>
          
          <div className="bg-white/20 rounded-lg p-4 mb-6">
            <p className="text-white text-sm">
              You've successfully built a self-sustaining production chain and maintained a healthy population.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onRestart}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Start New Game
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Continue Playing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
