import React, { useEffect, useMemo, useState } from 'react';
import { getMemoryDeck } from '../../engine/questions';
import { AgeGroup } from '../../engine/types';

interface MemoryCardMatchGameProps {
  ageGroup: AgeGroup;
  onSound: (type: 'correct' | 'incorrect' | 'click') => void;
  onSpeak: (text: string) => void;
  onFinish: (correctCount: number, incorrectCount: number) => void;
}

interface CardNode {
  uid: string;
  pairId: string;
  label: string;
  emoji: string;
  bgHex: string;
}

export const MemoryCardMatchGame: React.FC<MemoryCardMatchGameProps> = ({
  ageGroup,
  onSound,
  onSpeak,
  onFinish,
}) => {
  const deck = useMemo(() => {
    const base = getMemoryDeck(ageGroup);
    const doubled: CardNode[] = [];
    base.forEach((item) => {
      doubled.push({ uid: `${item.id}-a`, pairId: item.id, label: item.label, emoji: item.emoji, bgHex: item.bgHex });
      doubled.push({ uid: `${item.id}-b`, pairId: item.id, label: item.label, emoji: item.emoji, bgHex: item.bgHex });
    });
    // Deterministic interleaved shuffle
    return doubled.sort((a, b) => ((a.uid.charCodeAt(0) * 13 + a.uid.charCodeAt(a.uid.length - 1) * 7) % 23) - ((b.uid.charCodeAt(0) * 13 + b.uid.charCodeAt(b.uid.length - 1) * 7) % 23));
  }, [ageGroup]);

  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    onSpeak('Flip two cards to find matching woodland pairs!');
  }, [onSpeak]);

  const handleFlip = (card: CardNode) => {
    if (locked || flipped.includes(card.uid) || matched.includes(card.pairId)) {
      return;
    }

    onSound('click');
    const nextFlipped = [...flipped, card.uid];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setLocked(true);
      const first = deck.find((c) => c.uid === nextFlipped[0]);
      const second = deck.find((c) => c.uid === nextFlipped[1]);

      if (first && second && first.pairId === second.pairId) {
        const nextMatched = [...matched, first.pairId];
        window.setTimeout(() => {
          onSound('correct');
          setMatched(nextMatched);
          setFlipped([]);
          setLocked(false);

          if (nextMatched.length === deck.length / 2) {
            const pairTotal = deck.length / 2;
            const effectiveCorrect = Math.max(1, pairTotal);
            onFinish(effectiveCorrect, Math.min(mistakes, pairTotal));
          }
        }, 420);
      } else {
        window.setTimeout(() => {
          onSound('incorrect');
          setMistakes((m) => m + 1);
          setFlipped([]);
          setLocked(false);
        }, 720);
      }
    }
  };

  const colsClass =
    ageGroup === 'little'
      ? 'grid-cols-4 max-w-lg'
      : ageGroup === 'smart'
      ? 'grid-cols-4 max-w-xl'
      : 'grid-cols-4 max-w-2xl';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <span>
          Pairs Matched: <span className="font-mono-num">{matched.length}</span> / {deck.length / 2}
        </span>
        <span className="font-mono-num text-slate-700">Tries: {mistakes}</span>
      </div>

      <div className={`grid ${colsClass} mx-auto gap-3 sm:gap-4`} data-testid="memory-grid">
        {deck.map((card) => {
          const isOpen = flipped.includes(card.uid) || matched.includes(card.pairId);
          const isMatched = matched.includes(card.pairId);
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => handleFlip(card)}
              aria-label={isOpen ? `${card.label} card` : 'Hidden woodland memory card'}
              style={{ backgroundColor: isOpen ? card.bgHex : '#8DE3B2' }}
              className={`aspect-square rounded-2xl border-3 transition-transform active:scale-95 flex flex-col items-center justify-center p-2 shadow-[0_4px_0_rgba(30,41,59,0.12)] ${
                isMatched
                  ? 'border-emerald-600 opacity-90'
                  : isOpen
                  ? 'border-slate-800'
                  : 'border-slate-900/15 hover:brightness-95'
              }`}
            >
              {isOpen ? (
                <>
                  <span className="text-3xl sm:text-4xl leading-none" aria-hidden="true">
                    {card.emoji}
                  </span>
                  <span className="text-xs font-bold text-slate-800 mt-1">{card.label}</span>
                </>
              ) : (
                <span className="font-display text-2xl font-bold text-slate-800" aria-hidden="true">
                  ?
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
