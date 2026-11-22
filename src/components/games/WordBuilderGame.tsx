import React, { useEffect, useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { getWordBuilderRounds } from '../../engine/questions';
import { AgeGroup } from '../../engine/types';

interface WordBuilderGameProps {
  ageGroup: AgeGroup;
  onSound: (type: 'correct' | 'incorrect' | 'click') => void;
  onSpeak: (text: string) => void;
  onFinish: (correctCount: number, incorrectCount: number) => void;
}

interface LetterTile {
  uid: string;
  char: string;
}

export const WordBuilderGame: React.FC<WordBuilderGameProps> = ({
  ageGroup,
  onSound,
  onSpeak,
  onFinish,
}) => {
  const rounds = useMemo(() => getWordBuilderRounds(ageGroup), [ageGroup]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [pickedIds, setPickedIds] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const current = rounds[roundIdx];

  const tiles: LetterTile[] = useMemo(() => {
    const chars = current.word.split('').map((char, idx) => ({
      uid: `${current.id}-${idx}-${char}`,
      char,
    }));
    // Deterministic scramble so word isn't already spelled
    const sorted = [...chars].sort((a, b) => a.char.localeCompare(b.char));
    if (sorted.map((t) => t.char).join('') === current.word && sorted.length > 1) {
      const first = sorted.shift()!;
      sorted.push(first);
    }
    return sorted;
  }, [current]);

  useEffect(() => {
    onSpeak(`Spell the word: ${current.clue}`);
  }, [current, onSpeak]);

  const builtWord = pickedIds
    .map((id) => tiles.find((t) => t.uid === id)?.char ?? '')
    .join('');

  const handleTileTap = (tile: LetterTile) => {
    if (feedback !== 'idle' || pickedIds.includes(tile.uid)) return;
    onSound('click');
    const nextPicked = [...pickedIds, tile.uid];
    setPickedIds(nextPicked);

    if (nextPicked.length === current.word.length) {
      const attempt = nextPicked
        .map((id) => tiles.find((t) => t.uid === id)?.char ?? '')
        .join('');
      const isRight = attempt === current.word;
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
          setPickedIds([]);
          setFeedback('idle');
        }
      }, 950);
    }
  };

  const handleClear = () => {
    if (feedback !== 'idle') return;
    onSound('click');
    setPickedIds([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <span>
          Word <span className="font-mono-num">{roundIdx + 1}</span> / {rounds.length}
        </span>
        <span className="font-mono-num text-emerald-700">Spelled: {correctCount}</span>
      </div>

      <div className="p-5 rounded-3xl bg-[#FFF9EC] border-2 border-slate-900/10 flex flex-col items-center gap-3 text-center">
        <span className="text-6xl leading-none select-none" aria-hidden="true">
          {current.emoji}
        </span>
        <p className="font-display text-xl sm:text-2xl font-bold text-slate-900">{current.clue}</p>
      </div>

      {/* Answer Slots */}
      <div className="flex items-center justify-center flex-wrap gap-2.5">
        {current.word.split('').map((_, idx) => {
          const letter = builtWord[idx] ?? '';
          return (
            <div
              key={idx}
              className={`w-13 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center font-display text-2xl sm:text-3xl font-bold ${
                feedback === 'correct'
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                  : feedback === 'incorrect'
                  ? 'bg-rose-100 border-rose-500 text-rose-900'
                  : letter
                  ? 'bg-white border-slate-800 text-slate-900'
                  : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
              }`}
            >
              {letter}
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear letters"
          className="h-14 px-3.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 text-sm font-bold"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
      </div>

      {/* Scrambled Letter Tiles */}
      <div className="flex items-center justify-center flex-wrap gap-3 pt-2">
        {tiles.map((tile) => {
          const used = pickedIds.includes(tile.uid);
          return (
            <button
              key={tile.uid}
              type="button"
              disabled={used || feedback !== 'idle'}
              onClick={() => handleTileTap(tile)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 font-display text-2xl sm:text-3xl font-bold shadow-[0_4px_0_rgba(30,41,59,0.12)] transition-transform ${
                used
                  ? 'bg-slate-100 border-slate-200 text-slate-300 shadow-none'
                  : 'bg-[#FFD95A] border-slate-900/15 text-slate-900 hover:bg-[#FCD34D] active:translate-y-0.5'
              }`}
            >
              {tile.char}
            </button>
          );
        })}
      </div>

      {feedback !== 'idle' && (
        <p className="text-center font-bold text-slate-800" role="status">
          {feedback === 'correct'
            ? `Brilliant! You spelled ${current.word}!`
            : `Almost! The word is ${current.word}.`}
        </p>
      )}
    </div>
  );
};
