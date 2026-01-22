import { useGameStore } from '../../store/gameStore';

const resourceEmoji: Record<string, string> = {
  water: '💧',
  food: '🌾',
  wood: '🪵',
  stone: '🪨',
  power: '⚡',
};

export function ResourceBar() {
  const resources = useGameStore((state) => state.resources);
  const population = useGameStore((state) => state.population);
  const maxPopulation = useGameStore((state) => state.maxPopulation);

  return (
    <div className="flex flex-wrap gap-3 p-3 bg-cream-dark rounded-lg">
      <div className="flex items-center gap-1 font-semibold">
        👥 {population}/{maxPopulation}
      </div>
      {Object.entries(resourceEmoji).map(([key, emoji]) => (
        <div key={key} className="flex items-center gap-1">
          {emoji} {Math.floor(resources[key as keyof typeof resources])}
        </div>
      ))}
    </div>
  );
}
