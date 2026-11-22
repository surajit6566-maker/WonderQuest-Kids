import React, { useEffect, useMemo, useState } from 'react';
import { getNumberCatcherRounds } from '../../engine/questions';
import { AgeGroup } from '../../engine/types';

interface NumberCatcherGameProps {
  ageGroup: AgeGroup;
  onSound: (type: 'correct' | 'incorrect' | 'click') => void;
  onSpeak: (text: string) => void;
  onFinish: (correctCount: number, incorrectCount: number) => void;
}

export const NumberCatcherGame: React.FC<NumberCatcherGameProps> = ({
  ageGroup,
  onSound,
  onSpeak,
  onFinish,
}) => {
  const rounds = useMemo(() => getNumberCatcherRounds(ageGroup), [ageGroup]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [selectedVal, setSelectedVal] = useState<number | null>(null);

  const currentRound = rounds[roundIdx];

  const bubbles = useMemo(() => {
    const all = [currentRound.targetValue, ...currentRound.distractors];
    // Deterministic shuffle per round index
    return all
      .map((val, idx) => ({
        val,
        sortKey: ((val * 17 + roundIdx * 31 + idx * 13) % 97),
        offsetY: ((idx * 19 + roundIdx * 7) % 28),
        hue: ['#57C7F2', '#FFD95A', '#FF9566', '#8DE3B2', '#B9A6F6'][(idx + roundIdx) % 5],
      }))
      .sort((a, b) => a.sortKey - b.sortKey);
  }, [currentRound, roundIdx]);

  useEffect(() => {
    onSpeak(currentRound.prompt);
  }, [currentRound.prompt, onSpeak]);

  const handleCatch = (val: number) => {
    if (feedback !== 'none') return;
    setSelectedVal(val);
    const isRight = val === currentRound.targetValue;
    const nextCorrect = isRight ? correctCount + 1 : correctCount;
    const nextIncorrect = isRight ? incorrectCount : incorrectCount + 1;

    setCorrectCount(nextCorrect);
    setIncorrectCount(nextIncorrect);
    setFeedback(isRight ? 'correct' : 'incorrect');
    onSound(isRight ? 'correct' : 'incorrect');

    window.setTimeout(() => {
      if (roundIdx + 1 >= rounds.length) {
        onFinish(nextCorrect, nextIncorrect);
      } else {
        setRoundIdx((r) => r + 1);
        setFeedback('none');
        setSelectedVal(null);
      }
    }, 850);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <span>
          Round <span className="font-mono-num">{roundIdx + 1}</span> / {rounds.length}
        </span>
        <span className="font-mono-num text-emerald-700">Caught: {correctCount}</span>
      </div>

      <div className="p-5 rounded-3xl bg-[#EBF8FE] border-2 border-[#57C7F2] text-center">
        <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          {currentRound.prompt}
        </p>
      </div>

      <div
        className="relative min-h-[260px] rounded-3xl bg-gradient-to-b from-[#EBF8FE] to-[#FFF9EC] border-2 border-slate-900/10 p-6 flex flex-wrap items-center justify-center gap-5 sm:gap-7"
        data-testid="number-catcher-arena"
      >
        {bubbles.map((b) => {
          const isSelected = selectedVal === b.val;
          const isTarget = b.val === currentRound.targetValue;
          let borderClass = 'border-slate-900/15';
          if (feedback !== 'none') {
            if (isTarget) borderClass = 'border-emerald-600 ring-4 ring-emerald-200';
            else if (isSelected) borderClass = 'border-rose-500 ring-4 ring-rose-200';
          }

          return (
            <button
              key={`${roundIdx}-${b.val}`}
              type="button"
              onClick={() => handleCatch(b.val)}
              style={{
                backgroundColor: b.hue,
                transform: `translateY(${b.offsetY - 12}px)`,
              }}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 ${borderClass} shadow-[0_6px_0_rgba(30,41,59,0.14)] flex items-center justify-center font-mono-num text-3xl sm:text-4xl font-bold text-slate-900 hover:scale-105 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900`}
            >
              {b.val}
            </button>
          );
        })}
      </div>

      {feedback !== 'none' && (
        <div
          className={`p-4 rounded-2xl text-center font-bold ${
            feedback === 'correct'
              ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
              : 'bg-amber-100 text-amber-900 border-2 border-amber-300'
          }`}
          role="status"
        >
          {feedback === 'correct'
            ? `Awesome catch! ${currentRound.targetValue} is right!`
            : `Good try! The target number was ${currentRound.targetValue}.`}
        </div>
      )}
    </div>
  );
};
