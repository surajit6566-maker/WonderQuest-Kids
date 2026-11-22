import React, { useEffect, useMemo, useState } from 'react';
import { getMissingObjectRounds } from '../../engine/questions';
import { AgeGroup } from '../../engine/types';

interface MissingObjectGameProps {
  ageGroup: AgeGroup;
  onSound: (type: 'correct' | 'incorrect' | 'click') => void;
  onSpeak: (text: string) => void;
  onFinish: (correctCount: number, incorrectCount: number) => void;
}

export const MissingObjectGame: React.FC<MissingObjectGameProps> = ({
  ageGroup,
  onSound,
  onSpeak,
  onFinish,
}) => {
  const rounds = useMemo(() => getMissingObjectRounds(ageGroup), [ageGroup]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [pickedId, setPickedId] = useState<string | null>(null);

  const round = rounds[roundIdx];

  useEffect(() => {
    onSpeak(round.clue);
  }, [round.clue, onSpeak]);

  const handlePick = (itemName: string) => {
    if (status !== 'idle') return;
    setPickedId(itemName);
    const right = itemName === round.targetName;
    const nextCorrect = right ? correctCount + 1 : correctCount;
    const nextIncorrect = right ? incorrectCount : incorrectCount + 1;

    setCorrectCount(nextCorrect);
    setIncorrectCount(nextIncorrect);
    setStatus(right ? 'correct' : 'incorrect');
    onSound(right ? 'correct' : 'incorrect');

    window.setTimeout(() => {
      if (roundIdx + 1 >= rounds.length) {
        onFinish(nextCorrect, nextIncorrect);
      } else {
        setRoundIdx((i) => i + 1);
        setStatus('idle');
        setPickedId(null);
      }
    }, 850);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <span>
          Search <span className="font-mono-num">{roundIdx + 1}</span> / {rounds.length}
        </span>
        <span className="font-mono-num text-emerald-700">Found: {correctCount}</span>
      </div>

      <div className="p-5 rounded-3xl bg-[#FEFCE8] border-2 border-[#FFD95A] flex flex-col sm:flex-row items-center justify-center gap-4">
        <span className="text-5xl select-none" aria-hidden="true">
          {round.targetEmoji}
        </span>
        <p className="font-display text-xl sm:text-2xl font-bold text-slate-900 text-center sm:text-left">
          {round.clue}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4" data-testid="missing-object-grid">
        {round.gridItems.map((item) => {
          const isTarget = item.name === round.targetName;
          const isPicked = pickedId === item.name;
          let ring = 'border-slate-900/12 bg-white hover:bg-[#FFF9EC]';
          if (status !== 'idle') {
            if (isTarget) ring = 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-200';
            else if (isPicked) ring = 'border-rose-500 bg-rose-50';
          }
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePick(item.name)}
              aria-label={item.name}
              className={`min-h-[96px] rounded-2xl border-2 ${ring} p-3 flex flex-col items-center justify-center gap-1.5 shadow-[0_3px_0_rgba(30,41,59,0.08)] active:translate-y-0.5 transition-all`}
            >
              <span className="text-4xl leading-none" aria-hidden="true">
                {item.emoji}
              </span>
              <span className="text-xs font-bold text-slate-700">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
