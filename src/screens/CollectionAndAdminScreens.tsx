import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Crown,
  Heart,
  HelpCircle,
  Lock,
  Music,
  Palette,
  Rocket,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Volume2,
} from 'lucide-react';
import { MascotAvatar } from '../components/MascotAvatar';
import { AGE_LEVEL_META, BADGES, MASCOTS, MINI_GAMES, WORLDS } from '../engine/catalog';
import { formatLearningTime, getWorldGamesForAge } from '../engine/storage';
import { AgeGroup, MascotId, UserSettings, WonderQuestState } from '../engine/types';

function renderBadgeIcon(name: string) {
  switch (name) {
    case 'star':
      return <Star className="w-6 h-6" />;
    case 'compass':
      return <Compass className="w-6 h-6" />;
    case 'trophy':
      return <Trophy className="w-6 h-6" />;
    case 'palette':
      return <Palette className="w-6 h-6" />;
    case 'rocket':
      return <Rocket className="w-6 h-6" />;
    case 'heart':
      return <Heart className="w-6 h-6" />;
    case 'crown':
      return <Crown className="w-6 h-6" />;
    default:
      return <Award className="w-6 h-6" />;
  }
}

export const CollectionScreen: React.FC<{
  state: WonderQuestState;
  onUnlockOrSelectMascot: (id: MascotId) => void;
  onExploreWorlds: () => void;
}> = ({ state, onUnlockOrSelectMascot, onExploreWorlds }) => {
  const [notice, setNotice] = useState('');

  const handleMascotClick = (id: MascotId, cost: number, name: string) => {
    const unlocked = state.progress.unlocked_characters.includes(id);
    if (!unlocked && state.progress.total_stars < cost) {
      setNotice(`Earn ${cost - state.progress.total_stars} more stars to unlock ${name}!`);
      return;
    }
    setNotice(unlocked ? `${name} is now your active adventure buddy!` : `Hooray! You unlocked ${name}!`);
    onUnlockOrSelectMascot(id);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-[#FEF9C3] via-[#FFF9EC] to-[#EBF8FE] border-2 border-slate-900/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold text-slate-600">Treasure Room & Milestones</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
            My WonderQuest Collection
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
            Spend virtual stars to welcome new mascot friends and track your learning badges.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="px-5 py-3 rounded-2xl bg-white border-2 border-slate-900/10 text-center">
            <p className="font-mono-num text-2xl font-bold text-slate-900">
              {state.progress.total_stars} ★
            </p>
            <p className="text-xs font-bold text-slate-500">Available Stars</p>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white border-2 border-slate-900/10 text-center">
            <p className="font-mono-num text-2xl font-bold text-slate-900">
              {state.progress.completed_worlds.length}/5
            </p>
            <p className="text-xs font-bold text-slate-500">Worlds Done</p>
          </div>
        </div>
      </section>

      {notice && (
        <div
          className="p-4 rounded-2xl bg-[#EBF8FE] border-2 border-[#57C7F2] font-bold text-slate-900"
          role="status"
        >
          {notice}
        </div>
      )}

      {/* 5 Original Mascot Characters */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Explorer Mascots ({state.progress.unlocked_characters.length} / 5)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MASCOTS.map((m) => {
            const isUnlocked = state.progress.unlocked_characters.includes(m.id);
            const isActive = state.progress.active_character === m.id;
            const canAfford = state.progress.total_stars >= m.unlockCost;

            return (
              <article
                key={m.id}
                className={`rounded-3xl bg-white border-2 p-5 flex flex-col justify-between gap-4 shadow-[0_4px_0_rgba(30,41,59,0.06)] ${
                  isActive ? 'border-slate-900 ring-4 ring-[#FFD95A]' : 'border-slate-900/10'
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={!isUnlocked ? 'opacity-65 grayscale-[30%]' : ''}>
                    <MascotAvatar
                      mascotId={m.id}
                      size="md"
                      mood={isActive ? 'happy' : 'idle'}
                      reducedMotion={state.settings.reduced_motion}
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">{m.name}</h3>
                  <p className="text-xs font-extrabold text-slate-500">{m.role}</p>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                    {m.personality}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleMascotClick(m.id, m.unlockCost, m.name)}
                  style={{
                    backgroundColor: isActive
                      ? '#FFD95A'
                      : isUnlocked
                      ? '#8DE3B2'
                      : canAfford
                      ? m.accentHex
                      : '#F1F5F9',
                  }}
                  className="w-full h-11 rounded-2xl border-2 border-slate-900/15 font-bold text-xs text-slate-900 flex items-center justify-center gap-1.5"
                >
                  {isActive ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Active Buddy</span>
                    </>
                  ) : isUnlocked ? (
                    <span>Choose Buddy</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlock ({m.unlockCost} ★)</span>
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Achievement Badges */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Achievement Badges ({state.progress.achievement_badges.length} / {BADGES.length})
          </h2>
          <button
            type="button"
            onClick={onExploreWorlds}
            className="text-sm font-bold text-[#0284C7] hover:underline"
          >
            Earn more in Worlds
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const earned = state.progress.achievement_badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-2xl border-2 p-4 flex items-start gap-3.5 ${
                  earned
                    ? 'bg-white border-slate-900/15 shadow-[0_3px_0_rgba(30,41,59,0.06)]'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-900/10"
                  style={{ backgroundColor: earned ? badge.accentHex : '#E2E8F0' }}
                >
                  {renderBadgeIcon(badge.iconName)}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{badge.title}</h3>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{badge.description}</p>
                  <p className="text-[11px] font-extrabold mt-1.5 text-slate-500">
                    {earned ? 'Earned' : 'Locked'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export const ParentDashboardScreen: React.FC<{
  state: WonderQuestState;
  onUpdateSettings: (patch: Partial<UserSettings>) => void;
  onRequestReset: () => void;
  onOpenPrivacy: () => void;
}> = ({ state, onUpdateSettings, onRequestReset, onOpenPrivacy }) => {
  const [tab, setTab] = useState<'overview' | 'blueprint'>('overview');
  const activeAge: AgeGroup = state.settings.selected_age_group ?? 'smart';
  const accuracy =
    state.progress.total_questions_answered > 0
      ? Math.round(
          (state.progress.total_correct_answers / state.progress.total_questions_answered) * 100,
        )
      : 0;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold text-[#0284C7]">Parent-Protected Area</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Parent Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white border-2 border-slate-900/10">
          <button
            type="button"
            onClick={() => setTab('overview')}
            className={`h-10 px-4 rounded-xl text-sm font-bold transition-colors ${
              tab === 'overview' ? 'bg-[#57C7F2] text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Learning Progress
          </button>
          <button
            type="button"
            onClick={() => setTab('blueprint')}
            className={`h-10 px-4 rounded-xl text-sm font-bold transition-colors ${
              tab === 'blueprint' ? 'bg-[#57C7F2] text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kodular & Play Store Guide
          </button>
        </div>
      </div>

      {tab === 'overview' ? (
        <div className="space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-3xl bg-white border-2 border-slate-900/10 p-5">
              <p className="text-xs font-extrabold text-slate-500">Time Spent Learning</p>
              <p className="font-mono-num text-3xl font-bold text-slate-900 mt-1">
                {formatLearningTime(state.progress.time_spent_seconds)}
              </p>
            </div>
            <div className="rounded-3xl bg-white border-2 border-slate-900/10 p-5">
              <p className="text-xs font-extrabold text-slate-500">Games Completed</p>
              <p className="font-mono-num text-3xl font-bold text-slate-900 mt-1">
                {state.progress.completed_games.length} / {MINI_GAMES.length}
              </p>
            </div>
            <div className="rounded-3xl bg-white border-2 border-slate-900/10 p-5">
              <p className="text-xs font-extrabold text-slate-500">Lifetime Stars</p>
              <p className="font-mono-num text-3xl font-bold text-slate-900 mt-1">
                {state.progress.lifetime_stars} ★
              </p>
            </div>
            <div className="rounded-3xl bg-white border-2 border-slate-900/10 p-5">
              <p className="text-xs font-extrabold text-slate-500">Accuracy Rate</p>
              <p className="font-mono-num text-3xl font-bold text-slate-900 mt-1">{accuracy}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Age & Controls */}
            <section className="lg:col-span-5 rounded-3xl bg-white border-2 border-slate-900/10 p-6 space-y-5">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Child Profile & Controls
              </h2>

              <div className="space-y-2">
                <label htmlFor="parent-age-select" className="block text-sm font-bold text-slate-700">
                  Active Age Level
                </label>
                <select
                  id="parent-age-select"
                  value={activeAge}
                  onChange={(e) =>
                    onUpdateSettings({ selected_age_group: e.target.value as AgeGroup })
                  }
                  className="w-full h-12 px-4 rounded-2xl border-2 border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value="little">Little Explorers (Ages 2–4)</option>
                  <option value="smart">Smart Explorers (Ages 5–8)</option>
                  <option value="super">Super Explorers (Ages 9–12)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="playtime-reminder" className="block text-sm font-bold text-slate-700">
                  Gentle Playtime Break Reminder
                </label>
                <select
                  id="playtime-reminder"
                  value={state.settings.playtime_reminder_minutes}
                  onChange={(e) =>
                    onUpdateSettings({
                      playtime_reminder_minutes: Number.parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full h-12 px-4 rounded-2xl border-2 border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value={15}>Every 15 minutes</option>
                  <option value={30}>Every 30 minutes</option>
                  <option value={45}>Every 45 minutes</option>
                  <option value={60}>Every 60 minutes</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-700">Sound Effects</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ sound_enabled: !state.settings.sound_enabled })
                  }
                  className={`h-10 px-4 rounded-xl font-bold text-sm border-2 ${
                    state.settings.sound_enabled
                      ? 'bg-[#8DE3B2] border-slate-900/15 text-slate-900'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {state.settings.sound_enabled ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-700">Background Music</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ music_enabled: !state.settings.music_enabled })
                  }
                  className={`h-10 px-4 rounded-xl font-bold text-sm border-2 ${
                    state.settings.music_enabled
                      ? 'bg-[#FFD95A] border-slate-900/15 text-slate-900'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {state.settings.music_enabled ? 'On' : 'Off'}
                </button>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="h-11 px-4 rounded-2xl bg-[#EBF8FE] border-2 border-[#57C7F2] font-bold text-sm text-slate-900 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy & Safety</span>
                </button>
                <button
                  type="button"
                  onClick={onRequestReset}
                  className="h-11 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 font-bold text-sm text-rose-700 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Progress</span>
                </button>
              </div>
            </section>

            {/* World & Completed Games Progress */}
            <section className="lg:col-span-7 rounded-3xl bg-white border-2 border-slate-900/10 p-6 space-y-5">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                World Progress ({AGE_LEVEL_META[activeAge].title})
              </h2>

              <div className="space-y-4">
                {WORLDS.filter((w) => w.id !== 'treasure-room').map((w) => {
                  const games = getWorldGamesForAge(w.id, activeAge);
                  const done = games.filter((g) =>
                    state.progress.completed_games.includes(g.id),
                  ).length;
                  const pct = games.length > 0 ? Math.round((done / games.length) * 100) : 0;

                  return (
                    <div key={w.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm font-bold">
                        <span className="text-slate-900">{w.name}</span>
                        <span className="font-mono-num text-slate-600">
                          {done} / {games.length} ({pct}%)
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: w.accentHex }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-700 mb-2">
                  Recent Completed Mini-Games
                </h3>
                {state.progress.completed_games.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No mini-games completed yet. Start exploring a world to see progress here!
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700">
                    {state.progress.completed_games.map((gId) => {
                      const gm = MINI_GAMES.find((x) => x.id === gId);
                      const rec = state.gameProgress[gId];
                      return (
                        <span
                          key={gId}
                          className="px-3 py-1.5 rounded-xl bg-[#FFF9EC] border border-slate-900/10"
                        >
                          {gm?.title ?? gId} · {rec?.best_stars ?? 1}★
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      ) : (
        /* Kodular No-Code Architecture & Google Play Families Blueprint */
        <section className="rounded-3xl bg-white border-2 border-slate-900/10 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Kodular Android Architecture & Google Play Blueprint
            </h2>
            <p className="text-sm font-semibold text-slate-600">
              Complete no-code Android mapping matching this live WonderQuest Kids implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-5 rounded-2xl bg-[#FFF9EC] border border-slate-900/10 space-y-2">
              <h3 className="font-display text-lg font-bold text-slate-900">
                1. Kodular Screen & Component Architecture
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 font-semibold">
                <li><strong>Screen1 (Splash)</strong>: VerticalArrangement + Image (Mascot) + Clock (1300ms) → opens Welcome.</li>
                <li><strong>Screen2 (Welcome & AgeSelect)</strong>: CardView buttons for Little (2–4), Smart (5–8), Super (9–12) → TinyDB.StoreValue(&quot;selected_age_group&quot;).</li>
                <li><strong>Screen3 (Home & Worlds)</strong>: HorizontalArrangement Top HUD + TinyDB DailyMission check + 6 World CardViews.</li>
                <li><strong>Screen4 (Gameplay & Canvas)</strong>: Dynamic Label/Image prompt, Sound component, TextToSpeech, Canvas (Coloring & Number Catcher), Clock timer.</li>
                <li><strong>Screen5 (Collection & Parent)</strong>: Star shop unlock logic + Parent Math Gate Notifier + Progress summary.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#EBF8FE] border border-slate-900/10 space-y-2">
              <h3 className="font-display text-lg font-bold text-slate-900">
                2. TinyDB Local Database Keys
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 font-semibold font-mono text-xs">
                <li>selected_age_group → &quot;little&quot; | &quot;smart&quot; | &quot;super&quot;</li>
                <li>sound_enabled / music_enabled / reduced_motion → Boolean</li>
                <li>total_stars / lifetime_stars → Integer</li>
                <li>completed_games / unlocked_characters → JSON List</li>
                <li>game_progress_[id] → &#123;level, correct, incorrect, status&#125;</li>
                <li>daily_mission → &#123;mission_id, mission_date, count, claimed&#125;</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#ECFDF5] border border-slate-900/10 space-y-2">
              <h3 className="font-display text-lg font-bold text-slate-900">
                3. Visual Block Logic & Android Back Handling
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 font-semibold">
                <li>On <strong>Screen.BackPressed</strong>: Close open modal or navigate cleanly back to Home/Worlds rather than exiting abruptly.</li>
                <li>On <strong>AnswerButton.Click</strong>: Validate answer against age-filtered list, play Correct/Gentle Boop Sound, increment TinyDB stars, advance question index.</li>
                <li><strong>Clock.Timer</strong>: Compare Clock1.FormatDate(Now, &quot;yyyy-MM-dd&quot;) with stored mission_date to reset daily mission reliably offline.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#F5F3FF] border border-slate-900/10 space-y-2">
              <h3 className="font-display text-lg font-bold text-slate-900">
                4. Android Build & Google Play Families Checklist
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 font-semibold">
                <li>Export signed <strong>.aab (Android App Bundle)</strong> targeting current Google Play API level (API 34+).</li>
                <li>Compress PNG/WebP assets (&lt; 150 KB each) and OGG audio files for lightweight APK/AAB size.</li>
                <li>Target Audience: Ages 2–12; Ad-free Version 1; Zero personal data collected; COPPA &amp; Google Play Families compliant Data Safety declaration.</li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export const SettingsScreen: React.FC<{
  settings: UserSettings;
  onUpdateSettings: (patch: Partial<UserSettings>) => void;
  onRequestReset: () => void;
  onOpenPrivacy: () => void;
}> = ({ settings, onUpdateSettings, onRequestReset, onOpenPrivacy }) => {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">Settings</h1>
        <p className="text-base font-semibold text-slate-600 mt-1">
          Customize audio, motion comfort, and accessibility options.
        </p>
      </div>

      <section className="rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_5px_0_rgba(30,41,59,0.06)] divide-y divide-slate-100">
        {[
          {
            label: 'Sound Effects',
            desc: 'Button clicks, chimes, animal voices, and celebration tunes.',
            icon: <Volume2 className="w-5 h-5 text-[#0284C7]" />,
            checked: settings.sound_enabled,
            onToggle: () => onUpdateSettings({ sound_enabled: !settings.sound_enabled }),
          },
          {
            label: 'Background Music',
            desc: 'Gentle calming pentatonic melody while exploring.',
            icon: <Music className="w-5 h-5 text-[#FF9566]" />,
            checked: settings.music_enabled,
            onToggle: () => onUpdateSettings({ music_enabled: !settings.music_enabled }),
          },
          {
            label: 'Voice Instructions',
            desc: 'Reads questions aloud for early readers.',
            icon: <BookOpen className="w-5 h-5 text-[#16A34A]" />,
            checked: settings.voice_enabled,
            onToggle: () => onUpdateSettings({ voice_enabled: !settings.voice_enabled }),
          },
          {
            label: 'Reduced Motion',
            desc: 'Minimizes floating and bounce animations for sensitive eyes.',
            icon: <Sparkles className="w-5 h-5 text-[#7C3AED]" />,
            checked: settings.reduced_motion,
            onToggle: () => onUpdateSettings({ reduced_motion: !settings.reduced_motion }),
          },
        ].map((row) => (
          <div key={row.label} className="p-5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#FFF9EC] flex items-center justify-center shrink-0">
                {row.icon}
              </div>
              <div>
                <p className="font-display text-lg font-bold text-slate-900">{row.label}</p>
                <p className="text-sm font-semibold text-slate-600">{row.desc}</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={row.checked}
              aria-label={`Toggle ${row.label}`}
              onClick={row.onToggle}
              className={`h-11 px-5 rounded-2xl border-2 font-bold text-sm shrink-0 ${
                row.checked
                  ? 'bg-[#8DE3B2] border-slate-900/15 text-slate-900'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {row.checked ? 'On' : 'Off'}
            </button>
          </div>
        ))}

        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold text-slate-900">Language</p>
            <p className="text-sm font-semibold text-slate-600">
              English is active in Version 1; additional languages planned.
            </p>
          </div>
          <select
            aria-label="Language selection"
            value={settings.language}
            onChange={() => {}}
            className="h-11 px-4 rounded-2xl border-2 border-slate-200 bg-white font-bold text-sm text-slate-800"
          >
            <option value="en">English (Primary)</option>
          </select>
        </div>

        <div className="p-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="h-11 px-5 rounded-2xl bg-[#EBF8FE] border-2 border-[#57C7F2] font-bold text-sm text-slate-900 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy & Child Safety</span>
          </button>

          <button
            type="button"
            onClick={onRequestReset}
            className="h-11 px-5 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 font-bold text-sm text-rose-700 flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Reset All Progress (Parent Gate)</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export const PrivacyScreen: React.FC<{
  onBackHome: () => void;
}> = ({ onBackHome }) => {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div>
        <p className="text-xs font-extrabold text-[#0284C7]">Version 1.0.0 · Google Play Families Ready</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
          Privacy, Child Safety & Help
        </h1>
      </div>

      <section className="rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_5px_0_rgba(30,41,59,0.06)] p-6 sm:p-8 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#16A34A]" />
            <span>Our Child Safety Promise</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 font-semibold">
            <li>Zero advertising in WonderQuest Kids Version 1.</li>
            <li>No child-to-child messaging, public chat, social feeds, or public profiles.</li>
            <li>No account registration, location tracking, or personal data collection.</li>
            <li>All stars, drawings, and learning progress stay strictly on your local device.</li>
            <li>Parent Dashboard and progress resets are protected behind an adult math gate.</li>
          </ul>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#0284C7]" />
            <span>Parent Help & Contact</span>
          </h2>
          <p className="font-semibold">
            Need to switch your child’s difficulty level? Tap <strong>Parents</strong> in the top bar
            or <strong>Switch Age</strong> on the Home screen anytime.
          </p>
          <p className="font-semibold">
            Contact & Support: <span className="font-mono text-sm">support@wonderquestkids.example</span>
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onBackHome}
            className="h-12 px-6 rounded-2xl bg-[#FFD95A] hover:bg-[#FCD34D] border-2 border-slate-900/15 font-display text-lg font-bold text-slate-900"
          >
            Back to WonderQuest
          </button>
        </div>
      </section>
    </main>
  );
};
