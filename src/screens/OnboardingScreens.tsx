import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { MascotAvatar } from '../components/MascotAvatar';
import { AGE_LEVEL_META } from '../engine/catalog';
import { AgeGroup } from '../engine/types';

export const SplashScreen: React.FC<{
  reducedMotion: boolean;
  onComplete: () => void;
}> = ({ reducedMotion, onComplete }) => {
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    const t1 = window.setTimeout(() => setProgress(64), 350);
    const t2 = window.setTimeout(() => setProgress(100), 750);
    const t3 = window.setTimeout(onComplete, 1300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#57C7F2] via-[#A9E4FA] to-[#FFF9EC] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full flex flex-col items-center gap-5">
        <MascotAvatar mascotId="wally" size="xl" mood="happy" reducedMotion={reducedMotion} />

        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            WonderQuest Kids
          </h1>
          <p className="mt-2 text-sm font-extrabold tracking-widest text-slate-700">
            PLAY • EXPLORE • LEARN • DISCOVER
          </p>
        </div>

        <div className="w-full max-w-xs bg-white/80 rounded-full h-4 p-1 border-2 border-slate-900/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#FFD95A] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="text-sm font-bold text-slate-700 hover:text-slate-900 underline underline-offset-4"
        >
          Continue now
        </button>
      </div>
    </main>
  );
};

export const WelcomeScreen: React.FC<{
  reducedMotion: boolean;
  onStartLearning: () => void;
  onParentInfo: () => void;
}> = ({ reducedMotion, onStartLearning, onParentInfo }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFF9EC] flex flex-col justify-center p-4 sm:p-8">
      <div className="max-w-6xl w-full mx-auto rounded-[2rem] bg-white border-2 border-slate-900/10 shadow-[0_10px_0_rgba(30,41,59,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Negative-Space Copy Column */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between gap-8 bg-[#FFF9EC]/50">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <MascotAvatar mascotId="wally" size="sm" mood="happy" reducedMotion={reducedMotion} />
              <span className="text-sm font-extrabold text-[#0284C7] tracking-wide">
                Safe Adventure Learning · Ages 2–12
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.08]">
                WonderQuest Kids
              </h1>
              <p className="text-lg font-semibold text-slate-600 leading-relaxed">
                Explore six vibrant learning worlds filled with animal voices, playful numbers,
                creative coloring, memory puzzles, and science wonders.
              </p>
            </div>

            <div className="space-y-2.5 text-sm font-bold text-slate-700">
              <p className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#FF9566] shrink-0" />
                <span>16 interactive mini-games tailored to your child’s age</span>
              </p>
              <p className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0" />
                <span>100% ad-free, offline-ready, with parent-gated controls</span>
              </p>
              <p className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-[#0284C7] shrink-0" />
                <span>Voice instructions, gentle audio, and virtual star rewards</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
            <button
              type="button"
              data-start="true"
              onClick={onStartLearning}
              className="h-14 px-7 rounded-2xl bg-[#FFD95A] hover:bg-[#FCD34D] border-2 border-slate-900/15 shadow-[0_5px_0_rgba(30,41,59,0.14)] font-display text-xl font-bold text-slate-900 flex items-center justify-center gap-2.5 active:translate-y-0.5 transition-transform whitespace-nowrap"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onParentInfo}
              className="h-14 px-6 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-900/15 font-bold text-base text-slate-800 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <ShieldCheck className="w-5 h-5 text-slate-600" />
              <span>Parent Information</span>
            </button>
          </div>
        </div>

        {/* Right Storybook Key-Art Backdrop */}
        <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] bg-gradient-to-br from-[#57C7F2] to-[#8DE3B2]">
          {!imgError ? (
            <img
              src="/src/assets/images/wonderquest_welcome_hero_1795365643464.jpg"
              alt="Floating WonderQuest adventure island with hot air balloons and rainbow sky"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <MascotAvatar mascotId="bella" size="xl" mood="happy" reducedMotion={reducedMotion} />
              <p className="mt-4 font-display text-2xl font-bold text-slate-900">
                Adventure Awaits!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export const AgeSelectionScreen: React.FC<{
  selectedAge: AgeGroup | null;
  reducedMotion: boolean;
  onSelectAge: (age: AgeGroup) => void;
}> = ({ selectedAge, reducedMotion, onSelectAge }) => {
  const levels = (['little', 'smart', 'super'] as AgeGroup[]).map((id) => AGE_LEVEL_META[id]);
  const mascots: Record<AgeGroup, 'wally' | 'coco' | 'luna'> = {
    little: 'wally',
    smart: 'coco',
    super: 'luna',
  };

  return (
    <main className="min-h-screen bg-[#FFF9EC] py-10 px-4 sm:px-8 flex flex-col justify-center">
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-900">
            Choose Your Explorer Level
          </h1>
          <p className="text-base sm:text-lg font-semibold text-slate-600 max-w-2xl mx-auto">
            Every challenge adapts safely to your child’s age. Younger explorers never see advanced content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level) => {
            const isCurrent = selectedAge === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onSelectAge(level.id)}
                style={{ backgroundColor: level.bgHex }}
                className={`text-left rounded-3xl p-6 sm:p-7 border-3 transition-transform hover:-translate-y-1 active:translate-y-0 flex flex-col justify-between gap-6 shadow-[0_6px_0_rgba(30,41,59,0.1)] ${
                  isCurrent ? 'border-slate-900 ring-4 ring-[#FFD95A]' : 'border-slate-900/15'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <MascotAvatar
                      mascotId={mascots[level.id]}
                      size="md"
                      mood="happy"
                      reducedMotion={reducedMotion}
                    />
                    <span className="font-mono-num text-sm font-extrabold text-slate-800">
                      {level.ageRange}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                      {level.title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
                      {level.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-900/10 text-xs font-bold text-slate-700">
                    {level.highlights.join(' · ')}
                  </div>
                </div>

                <div
                  className="h-12 w-full rounded-2xl border-2 border-slate-900/15 font-display text-lg font-bold text-slate-900 flex items-center justify-center gap-2"
                  style={{ backgroundColor: level.accentHex }}
                >
                  {isCurrent && <CheckCircle2 className="w-5 h-5" />}
                  <span>{isCurrent ? 'Selected Level' : `Play ${level.title}`}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
};
