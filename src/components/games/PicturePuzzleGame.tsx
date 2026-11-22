import React, { useEffect, useMemo, useState } from 'react';
import { getPicturePuzzlePresets } from '../../engine/questions';
import { AgeGroup } from '../../engine/types';

interface PicturePuzzleGameProps {
  ageGroup: AgeGroup;
  onSound: (type: 'correct' | 'incorrect' | 'click') => void;
  onSpeak: (text: string) => void;
  onFinish: (correctCount: number, incorrectCount: number) => void;
}

export const PicturePuzzleGame: React.FC<PicturePuzzleGameProps> = ({
  ageGroup,
  onSound,
  onSpeak,
  onFinish,
}) => {
  const presets = useMemo(() => getPicturePuzzlePresets(ageGroup), [ageGroup]);
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = presets[presetIdx];
  const totalTiles = preset.gridSize * preset.gridSize;

  const createScrambledOrder = (count: number) => {
    const arr = Array.from({ length: count }, (_, i) => i);
    // Deterministic cyclic shift + adjacent swap so it is always solvable and never pre-solved
    const shifted = [...arr.slice(1), arr[0]];
    if (shifted.length >= 4) {
      const tmp = shifted[1];
      shifted[1] = shifted[2];
      shifted[2] = tmp;
    }
    return shifted;
  };

  const [tiles, setTiles] = useState<number[]>(() => createScrambledOrder(totalTiles));
  const [selectedPos, setSelectedPos] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setTiles(createScrambledOrder(preset.gridSize * preset.gridSize));
    setSelectedPos(null);
  }, [preset.gridSize, presetIdx]);

  useEffect(() => {
    onSpeak(`Put the ${preset.title} tiles in number order by tapping two tiles to swap them!`);
  }, [preset.title, onSpeak]);

  const isSolved = (order: number[]) => order.every((val, idx) => val === idx);

  const handleTileTap = (pos: number) => {
    onSound('click');
    if (selectedPos === null) {
      setSelectedPos(pos);
      return;
    }
    if (selectedPos === pos) {
      setSelectedPos(null);
      return;
    }
    const next = [...tiles];
    const tmp = next[selectedPos];
    next[selectedPos] = next[pos];
    next[pos] = tmp;
    setTiles(next);
    setSelectedPos(null);
    const nextMoves = moves + 1;
    setMoves(nextMoves);

    if (isSolved(next)) {
      onSound('correct');
      window.setTimeout(() => {
        if (presetIdx + 1 < presets.length) {
          setPresetIdx((p) => p + 1);
        } else {
          onFinish(10, Math.min(3, Math.floor(nextMoves / 12)));
        }
      }, 650);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <span>
          Scene <span className="font-mono-num">{presetIdx + 1}</span> / {presets.length} · {preset.title}
        </span>
        <span className="font-mono-num text-slate-700">Swaps: {moves}</span>
      </div>

      <p className="text-center text-sm font-semibold text-slate-600">
        Tap any two tiles to swap them until numbers <span className="font-mono-num">1–{totalTiles}</span> match in order!
      </p>

      <div
        className={`grid mx-auto gap-3 ${
          preset.gridSize === 2 ? 'grid-cols-2 max-w-xs' : 'grid-cols-3 max-w-sm'
        }`}
        data-testid="picture-puzzle-grid"
      >
        {tiles.map((tileId, pos) => {
          const isSelected = selectedPos === pos;
          const inRightSpot = tileId === pos;
          return (
            <button
              key={pos}
              type="button"
              onClick={() => handleTileTap(pos)}
              aria-label={`Puzzle tile ${tileId + 1} at slot ${pos + 1}`}
              style={{ backgroundColor: preset.themeColors[tileId] }}
              className={`aspect-square rounded-2xl border-3 flex flex-col items-center justify-center shadow-[0_4px_0_rgba(30,41,59,0.12)] transition-transform ${
                isSelected
                  ? 'border-slate-900 scale-105 ring-4 ring-[#FFD95A]'
                  : inRightSpot
                  ? 'border-emerald-700'
                  : 'border-slate-900/20'
              }`}
            >
              <span className="text-4xl leading-none select-none" aria-hidden="true">
                {preset.symbols[tileId]}
              </span>
              <span className="mt-1 px-2 py-0.5 rounded-lg bg-white/85 font-mono-num text-xs font-bold text-slate-900">
                {tileId + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
