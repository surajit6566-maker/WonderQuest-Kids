import React from 'react';
import { ArrowLeft, Home, Lock, Music, Settings, Star, Volume2, VolumeX } from 'lucide-react';
import { AGE_LEVEL_META } from '../engine/catalog';
import { AgeGroup, ScreenId } from '../engine/types';

interface ShellHeaderProps {
  screen: ScreenId;
  stars: number;
  ageGroup: AgeGroup | null;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onGoHome: () => void;
  onBack?: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onOpenSettings: () => void;
  onOpenParent: () => void;
}

export const ShellHeader: React.FC<ShellHeaderProps> = ({
  screen,
  stars,
  ageGroup,
  soundEnabled,
  musicEnabled,
  onGoHome,
  onBack,
  onToggleSound,
  onToggleMusic,
  onOpenSettings,
  onOpenParent,
}) => {
  const ageMeta = ageGroup ? AGE_LEVEL_META[ageGroup] : null;

  return (
    <header className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4 pb-2 flex items-center justify-between gap-1.5 sm:gap-4">
      {/* Zone 1: Back / Home + Brand */}
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
        {onBack && screen !== 'home' && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go Back"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-900/10 shadow-[0_3px_0_rgba(30,41,59,0.08)] flex items-center justify-center text-slate-700 hover:bg-slate-50 active:translate-y-0.5 transition-transform shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57C7F2]"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        {screen !== 'home' && ageGroup !== null && (
          <button
            type="button"
            onClick={onGoHome}
            aria-label="Go to Home"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-900/10 shadow-[0_3px_0_rgba(30,41,59,0.08)] flex items-center justify-center text-slate-700 hover:bg-slate-50 active:translate-y-0.5 transition-transform shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57C7F2]"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        <div className={`flex-col min-w-0 ${screen !== 'home' ? 'hidden sm:flex' : 'flex'}`}>
          <span className="font-display text-sm sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
            WonderQuest<span className="hidden sm:inline"> Kids</span>
          </span>
          {ageMeta && (
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 truncate">
              {ageMeta.title} · {ageMeta.ageRange}
            </span>
          )}
        </div>
      </div>

      {/* Zone 2: Live Star Balance + Quick Utility Controls */}
      <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
        <div
          className="h-9 sm:h-11 px-2 sm:px-3.5 rounded-xl sm:rounded-2xl bg-[#FFD95A] border-2 border-slate-900/15 shadow-[0_3px_0_rgba(30,41,59,0.1)] flex items-center gap-1 sm:gap-2"
          aria-label={`Star balance: ${stars}`}
        >
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-slate-900" />
          <span className="font-mono-num text-xs sm:text-base font-bold text-slate-900">{stars}</span>
        </div>

        <button
          type="button"
          onClick={onToggleMusic}
          aria-pressed={musicEnabled}
          aria-label={musicEnabled ? 'Turn off background music' : 'Turn on background music'}
          title={musicEnabled ? 'Music On' : 'Music Off'}
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border-2 shadow-[0_3px_0_rgba(30,41,59,0.08)] flex items-center justify-center active:translate-y-0.5 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57C7F2] ${
            musicEnabled
              ? 'bg-[#FFF0E5] border-[#FF9566] text-[#C2410C] hover:bg-[#FFE4D1]'
              : 'bg-white border-slate-900/10 text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Music className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={onToggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          title={soundEnabled ? 'Sound Effects On' : 'Sound Effects Off'}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-900/10 shadow-[0_3px_0_rgba(30,41,59,0.08)] flex items-center justify-center text-slate-700 hover:bg-slate-50 active:translate-y-0.5 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57C7F2]"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7]" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />}
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Open Settings"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-900/10 shadow-[0_3px_0_rgba(30,41,59,0.08)] flex items-center justify-center text-slate-700 hover:bg-slate-50 active:translate-y-0.5 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57C7F2]"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={onOpenParent}
          aria-label="Parent Dashboard"
          className="h-9 sm:h-11 px-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-900/10 shadow-[0_3px_0_rgba(30,41,59,0.08)] flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:bg-slate-50 active:translate-y-0.5 transition-transform whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57C7F2]"
        >
          <Lock className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Parents</span>
        </button>
      </div>
    </header>
  );
};
