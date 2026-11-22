import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  RotateCcw,
  Sparkles,
  Star,
  Volume2,
  XCircle,
} from 'lucide-react';
import { MascotAvatar } from '../components/MascotAvatar';
import { VisualPromptIllustration } from '../components/VisualPromptIllustration';
import { MemoryCardMatchGame } from '../components/games/MemoryCardMatchGame';
import { MissingObjectGame } from '../components/games/MissingObjectGame';
import { NumberCatcherGame } from '../components/games/NumberCatcherGame';
import { PicturePuzzleGame } from '../components/games/PicturePuzzleGame';
import { WordBuilderGame } from '../components/games/WordBuilderGame';
import { BADGES, MASCOTS, MINI_GAMES, WORLDS } from '../engine/catalog';
import { getQuizQuestionsForGame } from '../engine/questions';
import {
  AgeGroup,
  GameplayResultSummary,
  MascotId,
  MiniGameId,
  SavedDrawing,
  SoundEffectType,
} from '../engine/types';
import { CreativeStudioScreen } from './CreativeStudioScreen';

export const GameplayScreen: React.FC<{
  gameId: MiniGameId;
  ageGroup: AgeGroup;
  reducedMotion: boolean;
  savedDrawings: SavedDrawing[];
  onSaveDrawing: (drawing: SavedDrawing) => void;
  onDeleteDrawing: (id: string) => void;
  onPlaySound: (type: SoundEffectType) => void;
  onSpeak: (text: string) => void;
  onCompleteGame: (correctCount: number, incorrectCount: number) => void;
  onBackToGames: () => void;
}> = ({
  gameId,
  ageGroup,
  reducedMotion,
  savedDrawings,
  onSaveDrawing,
  onDeleteDrawing,
  onPlaySound,
  onSpeak,
  onCompleteGame,
  onBackToGames,
}) => {
  const game = MINI_GAMES.find((g) => g.id === gameId) ?? MINI_GAMES[0];
  const world = WORLDS.find((w) => w.id === game.worldId) ?? WORLDS[0];
  const questions = useMemo(() => getQuizQuestionsForGame(gameId, ageGroup), [gameId, ageGroup]);

  const [qIdx, setQIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const currentQuestion = questions[qIdx];

  useEffect(() => {
    setQIdx(0);
    setSelectedOptionId(null);
    setCorrectCount(0);
    setIncorrectCount(0);
  }, [gameId, ageGroup]);

  useEffect(() => {
    if (
      (game.mechanic === 'quiz' || game.mechanic === 'animal-sound') &&
      currentQuestion
    ) {
      if (currentQuestion.soundCue) {
        const timer = window.setTimeout(() => {
          onPlaySound(currentQuestion.soundCue!);
        }, 250);
        return () => window.clearTimeout(timer);
      }
      onSpeak(currentQuestion.voicePrompt ?? currentQuestion.prompt);
    }
  }, [game.mechanic, currentQuestion, onPlaySound, onSpeak]);

  const handleSelectOption = (optionId: string) => {
    if (selectedOptionId !== null || !currentQuestion) return;
    setSelectedOptionId(optionId);
    const isRight = optionId === currentQuestion.correctOptionId;
    if (isRight) {
      setCorrectCount((c) => c + 1);
      onPlaySound('correct');
    } else {
      setIncorrectCount((c) => c + 1);
      onPlaySound('incorrect');
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    onPlaySound('click');
    if (qIdx + 1 >= questions.length) {
      onCompleteGame(correctCount, incorrectCount);
    } else {
      setQIdx((i) => i + 1);
      setSelectedOptionId(null);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold text-slate-500">
            {world.name} · {game.difficultyLabel[ageGroup]}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            {game.title}
          </h1>
        </div>
        <button
          type="button"
          onClick={onBackToGames}
          className="h-10 px-4 rounded-xl bg-white border-2 border-slate-900/10 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          Choose Another Game
        </button>
      </div>

      <section className="rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_6px_0_rgba(30,41,59,0.06)] p-5 sm:p-8">
        {game.mechanic === 'coloring-studio' && (
          <CreativeStudioScreen
            savedDrawings={savedDrawings}
            onSaveDrawing={onSaveDrawing}
            onDeleteDrawing={onDeleteDrawing}
            onSound={onPlaySound}
            onSpeak={onSpeak}
          />
        )}

        {game.mechanic === 'number-catcher' && (
          <NumberCatcherGame
            ageGroup={ageGroup}
            onSound={onPlaySound}
            onSpeak={onSpeak}
            onFinish={onCompleteGame}
          />
        )}

        {game.mechanic === 'memory-match' && (
          <MemoryCardMatchGame
            ageGroup={ageGroup}
            onSound={onPlaySound}
            onSpeak={onSpeak}
            onFinish={onCompleteGame}
          />
        )}

        {game.mechanic === 'missing-object' && (
          <MissingObjectGame
            ageGroup={ageGroup}
            onSound={onPlaySound}
            onSpeak={onSpeak}
            onFinish={onCompleteGame}
          />
        )}

        {game.mechanic === 'word-builder' && (
          <WordBuilderGame
            ageGroup={ageGroup}
            onSound={onPlaySound}
            onSpeak={onSpeak}
            onFinish={onCompleteGame}
          />
        )}

        {game.mechanic === 'picture-puzzle' && (
          <PicturePuzzleGame
            ageGroup={ageGroup}
            onSound={onPlaySound}
            onSpeak={onSpeak}
            onFinish={onCompleteGame}
          />
        )}

        {(game.mechanic === 'quiz' || game.mechanic === 'animal-sound') && currentQuestion && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600">
                <span>
                  Question <span className="font-mono-num">{qIdx + 1}</span> of {questions.length}
                </span>
                <span className="font-mono-num text-emerald-700">
                  Correct: {correctCount}
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#57C7F2] transition-all duration-300"
                  style={{ width: `${((qIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Prompt + Audio Replay */}
            <div className="text-center space-y-4">
              <VisualPromptIllustration visual={currentQuestion.visual} />

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 max-w-2xl mx-auto">
                {currentQuestion.prompt}
              </h2>

              <div className="flex items-center justify-center gap-3">
                {currentQuestion.soundCue && (
                  <button
                    type="button"
                    onClick={() => onPlaySound(currentQuestion.soundCue!)}
                    className="h-11 px-5 rounded-2xl bg-[#8DE3B2] hover:bg-[#73D99E] border-2 border-slate-900/15 font-bold text-sm text-slate-900 inline-flex items-center gap-2 shadow-[0_3px_0_rgba(30,41,59,0.1)]"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Play Animal Sound</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    onSpeak(currentQuestion.voicePrompt ?? currentQuestion.prompt)
                  }
                  className="h-11 px-4 rounded-2xl bg-[#EBF8FE] hover:bg-[#D7F1FD] border-2 border-slate-900/10 font-bold text-sm text-slate-800 inline-flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4 text-[#0284C7]" />
                  <span>Read Aloud</span>
                </button>
              </div>
            </div>

            {/* Answer Buttons */}
            <div
              className={`grid gap-3.5 ${
                currentQuestion.options.length <= 2
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto'
                  : currentQuestion.options.length === 3
                  ? 'grid-cols-1 sm:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQuestion.correctOptionId;
                const answered = selectedOptionId !== null;

                let cardStyle =
                  'bg-[#FFF9EC] hover:bg-[#FEF3C7] border-slate-900/15 text-slate-900';
                if (answered) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    cardStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`min-h-[72px] p-4 rounded-2xl border-2 font-display text-xl font-bold shadow-[0_4px_0_rgba(30,41,59,0.08)] active:translate-y-0.5 transition-all flex items-center justify-center gap-3 ${cardStyle}`}
                  >
                    {opt.colorHex && (
                      <span
                        className="w-8 h-8 rounded-xl border-2 border-slate-900/20 shrink-0"
                        style={{ backgroundColor: opt.colorHex }}
                        aria-hidden="true"
                      />
                    )}
                    {opt.emoji && (
                      <span className="text-3xl leading-none shrink-0" aria-hidden="true">
                        {opt.emoji}
                      </span>
                    )}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Educational Feedback + Next Button */}
            {selectedOptionId !== null && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  selectedOptionId === currentQuestion.correctOptionId
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-amber-50 border-amber-400 text-amber-950'
                }`}
                role="status"
              >
                <div className="flex items-start gap-3">
                  {selectedOptionId === currentQuestion.correctOptionId ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-display text-lg font-bold">
                      {selectedOptionId === currentQuestion.correctOptionId
                        ? 'Awesome job!'
                        : 'Nice try! Let us learn together:'}
                    </p>
                    <p className="text-sm font-semibold mt-0.5">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="h-12 px-6 rounded-2xl bg-[#FFD95A] hover:bg-[#FCD34D] border-2 border-slate-900/15 font-display text-lg font-bold text-slate-900 shadow-[0_3px_0_rgba(30,41,59,0.12)] flex items-center gap-2 shrink-0 whitespace-nowrap"
                >
                  <span>{qIdx + 1 >= questions.length ? 'Finish Challenge' : 'Next'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {!reducedMotion && selectedOptionId === null && (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                <MascotAvatar mascotId="wally" size="sm" reducedMotion={reducedMotion} />
                <span>Take your time and tap your best answer!</span>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export const ResultScreen: React.FC<{
  summary: GameplayResultSummary;
  activeMascotId: MascotId;
  reducedMotion: boolean;
  onReplay: () => void;
  onNextChallenge: () => void;
  onExploreWorlds: () => void;
}> = ({
  summary,
  activeMascotId,
  reducedMotion,
  onReplay,
  onNextChallenge,
  onExploreWorlds,
}) => {
  const mascot = MASCOTS.find((m) => m.id === activeMascotId) ?? MASCOTS[0];
  const game = MINI_GAMES.find((g) => g.id === summary.gameId);
  const unlockedBadgeObjs = BADGES.filter((b) => summary.newBadges.includes(b.id));

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <section className="rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_8px_0_rgba(30,41,59,0.08)] p-7 sm:p-10 text-center space-y-7">
        <div className="flex flex-col items-center gap-3">
          <MascotAvatar
            mascotId={mascot.id}
            size="xl"
            mood="happy"
            reducedMotion={reducedMotion}
          />
          <p className="text-xs font-extrabold tracking-wide text-[#0284C7]">
            Challenge Complete · {game?.title}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-900">
            Way to Go, Explorer!
          </h1>
          <p className="text-base sm:text-lg font-semibold text-slate-600 max-w-md">
            “{summary.encouragement}” — {mascot.name}
          </p>
        </div>

        {/* Star Burst Display */}
        <div className="flex items-center justify-center gap-2.5" aria-label={`Earned ${summary.starsEarned} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={`w-11 h-11 ${
                n <= summary.starsEarned
                  ? 'fill-[#FFD95A] text-slate-900'
                  : 'fill-slate-100 text-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="p-4 rounded-2xl bg-[#ECFDF5] border-2 border-emerald-200">
            <p className="font-mono-num text-3xl font-bold text-emerald-800">
              {summary.correctCount}
            </p>
            <p className="text-xs font-extrabold text-emerald-700 mt-1">Correct</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFF1EB] border-2 border-orange-200">
            <p className="font-mono-num text-3xl font-bold text-orange-800">
              {summary.incorrectCount}
            </p>
            <p className="text-xs font-extrabold text-orange-700 mt-1">To Review</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FEFCE8] border-2 border-yellow-300">
            <p className="font-mono-num text-3xl font-bold text-slate-900">
              +{summary.starsEarned + summary.worldBonusStars}
            </p>
            <p className="text-xs font-extrabold text-slate-700 mt-1">Stars Earned</p>
          </div>
        </div>

        {summary.worldBonusStars > 0 && (
          <div className="p-4 rounded-2xl bg-[#EBF8FE] border-2 border-[#57C7F2] font-bold text-slate-900 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0284C7]" />
            <span>World Completed! +{summary.worldBonusStars} Bonus Stars awarded!</span>
          </div>
        )}

        {unlockedBadgeObjs.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#F5F3FF] border-2 border-[#B9A6F6] space-y-1">
            <p className="text-xs font-extrabold text-purple-800">New Badge Unlocked!</p>
            {unlockedBadgeObjs.map((b) => (
              <p key={b.id} className="font-display text-lg font-bold text-slate-900">
                {b.title} — <span className="font-sans text-sm font-semibold text-slate-600">{b.description}</span>
              </p>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReplay}
            className="w-full sm:w-auto h-13 px-6 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-900/15 font-bold text-slate-800 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            type="button"
            onClick={onNextChallenge}
            className="w-full sm:w-auto h-13 px-7 rounded-2xl bg-[#FFD95A] hover:bg-[#FCD34D] border-2 border-slate-900/15 shadow-[0_4px_0_rgba(30,41,59,0.12)] font-display text-lg font-bold text-slate-900 flex items-center justify-center gap-2"
          >
            <span>Next Challenge</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onExploreWorlds}
            className="w-full sm:w-auto h-13 px-6 rounded-2xl bg-[#8DE3B2] hover:bg-[#73D99E] border-2 border-slate-900/15 font-bold text-slate-900 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>All Worlds</span>
          </button>
        </div>
      </section>
    </main>
  );
};
