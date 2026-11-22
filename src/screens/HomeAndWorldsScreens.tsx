import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Compass,
  Gift,
  Lock,
  Play,
  Settings,
  Sparkles,
  Star,
  Volume2,
} from 'lucide-react';
import { MascotAvatar } from '../components/MascotAvatar';
import { AGE_LEVEL_META, MASCOTS, MINI_GAMES, WORLDS } from '../engine/catalog';
import { getWorldGamesForAge } from '../engine/storage';
import { AgeGroup, MiniGameId, WonderQuestState, WorldId } from '../engine/types';

export const HomeScreen: React.FC<{
  state: WonderQuestState;
  ageGroup: AgeGroup;
  onExploreWorlds: () => void;
  onOpenCollection: () => void;
  onOpenParent: () => void;
  onOpenSettings: () => void;
  onChangeAge: () => void;
  onClaimDailyMission: () => void;
  onSpeakGreeting: (text: string) => void;
}> = ({
  state,
  ageGroup,
  onExploreWorlds,
  onOpenCollection,
  onOpenParent,
  onOpenSettings,
  onChangeAge,
  onClaimDailyMission,
  onSpeakGreeting,
}) => {
  const activeMascot =
    MASCOTS.find((m) => m.id === state.progress.active_character) ?? MASCOTS[0];
  const ageMeta = AGE_LEVEL_META[ageGroup];
  const mission = state.dailyMission;
  const missionPct = Math.min(100, Math.round((mission.current_count / mission.target_count) * 100));
  const greeting = activeMascot.encouragements[0];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-7">
      {/* Hero Companion + Primary CTA */}
      <section className="rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_6px_0_rgba(30,41,59,0.06)] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="p-4 rounded-3xl bg-[#EBF8FE] border-2 border-[#57C7F2] shrink-0">
            <MascotAvatar
              mascotId={activeMascot.id}
              size="lg"
              mood="happy"
              reducedMotion={state.settings.reduced_motion}
            />
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-extrabold text-slate-600">
              <span>{activeMascot.name} · {activeMascot.role}</span>
              <span aria-hidden="true">·</span>
              <span>{ageMeta.title} ({ageMeta.ageRange})</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              Ready for a WonderQuest, Explorer?
            </h1>

            <div className="p-3.5 rounded-2xl bg-[#FFF9EC] border-2 border-slate-900/10 flex items-center justify-between gap-3">
              <p className="text-sm sm:text-base font-bold text-slate-700">“{greeting}”</p>
              <button
                type="button"
                onClick={() => onSpeakGreeting(greeting)}
                aria-label="Hear mascot greeting"
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-[#0284C7] shrink-0 hover:bg-slate-50"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3">
          <button
            type="button"
            data-start="true"
            onClick={onExploreWorlds}
            className="h-16 px-7 rounded-2xl bg-[#FFD95A] hover:bg-[#FCD34D] border-2 border-slate-900/15 shadow-[0_5px_0_rgba(30,41,59,0.14)] font-display text-2xl font-bold text-slate-900 flex items-center justify-center gap-3 active:translate-y-0.5 transition-transform"
          >
            <Compass className="w-7 h-7" />
            <span>Explore Worlds</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onOpenCollection}
              className="h-13 px-4 rounded-2xl bg-[#B9A6F6]/35 hover:bg-[#B9A6F6]/50 border-2 border-slate-900/15 font-bold text-sm sm:text-base text-slate-900 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Award className="w-5 h-5" />
              <span>My Collection</span>
            </button>

            <button
              type="button"
              onClick={onChangeAge}
              className="h-13 px-4 rounded-2xl bg-[#8DE3B2]/45 hover:bg-[#8DE3B2]/65 border-2 border-slate-900/15 font-bold text-sm sm:text-base text-slate-900 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5" />
              <span>Switch Age</span>
            </button>
          </div>
        </div>
      </section>

      {/* Daily Mission + Quick Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_4px_0_rgba(30,41,59,0.06)] p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold tracking-wide text-[#0284C7]">
                Daily Mission · {mission.mission_date}
              </p>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                {mission.title}
              </h2>
              <p className="text-sm font-semibold text-slate-600 mt-1">{mission.description}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="font-mono-num text-xl font-bold text-slate-900">
                +{mission.reward_stars} ★
              </span>
              <p className="text-xs font-bold text-slate-500">Bonus Reward</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Mission Progress</span>
              <span className="font-mono-num">
                {mission.current_count} / {mission.target_count}
              </span>
            </div>
            <div className="h-4 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#8DE3B2] transition-all duration-300"
                style={{ width: `${missionPct}%` }}
              />
            </div>
          </div>

          {mission.completion_status === 'completed' && !mission.reward_claimed ? (
            <button
              type="button"
              onClick={onClaimDailyMission}
              className="h-12 px-5 rounded-2xl bg-[#FFD95A] hover:bg-[#FCD34D] border-2 border-slate-900/15 font-bold text-slate-900 flex items-center gap-2 shadow-[0_3px_0_rgba(30,41,59,0.12)]"
            >
              <Gift className="w-5 h-5" />
              <span>Claim +{mission.reward_stars} Bonus Stars</span>
            </button>
          ) : mission.reward_claimed ? (
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Daily Mission reward claimed! Come back tomorrow for a new quest.</span>
            </p>
          ) : (
            <p className="text-xs font-bold text-slate-500">
              Play worlds to complete today’s quest and unlock bonus stars.
            </p>
          )}
        </section>

        {/* Quick Stats & Parent/Settings Card */}
        <section className="lg:col-span-5 rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_4px_0_rgba(30,41,59,0.06)] p-6 flex flex-col justify-between gap-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Your Adventure Log</h2>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-2xl bg-[#FEFCE8] border border-slate-900/10 text-center">
                <p className="font-mono-num text-2xl font-bold text-slate-900">
                  {state.progress.total_stars}
                </p>
                <p className="text-xs font-bold text-slate-600 mt-0.5">Stars</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#ECFDF5] border border-slate-900/10 text-center">
                <p className="font-mono-num text-2xl font-bold text-slate-900">
                  {state.progress.completed_games.length}
                </p>
                <p className="text-xs font-bold text-slate-600 mt-0.5">Games Done</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#F5F3FF] border border-slate-900/10 text-center">
                <p className="font-mono-num text-2xl font-bold text-slate-900">
                  {state.progress.unlocked_characters.length}/5
                </p>
                <p className="text-xs font-bold text-slate-600 mt-0.5">Mascots</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onOpenParent}
              className="h-12 px-4 rounded-2xl bg-[#FFF9EC] hover:bg-[#FEF3C7] border-2 border-slate-900/10 font-bold text-sm text-slate-800 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Lock className="w-4 h-4 text-slate-600" />
              <span>Parent Dashboard</span>
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="h-12 px-4 rounded-2xl bg-[#FFF9EC] hover:bg-slate-100 border-2 border-slate-900/10 font-bold text-sm text-slate-800 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span>Settings</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export const WorldSelectionScreen: React.FC<{
  state: WonderQuestState;
  ageGroup: AgeGroup;
  onSelectWorld: (worldId: WorldId) => void;
}> = ({ state, ageGroup, onSelectWorld }) => {
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Choose a Learning World
          </h1>
          <p className="text-base font-semibold text-slate-600 mt-1">
            Six colorful worlds to explore at your own pace.
          </p>
        </div>
        <p className="text-sm font-bold text-slate-600 tabular-nums">
          Worlds completed: {state.progress.completed_worlds.length} / 5
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORLDS.map((world) => {
          const isTreasure = world.id === 'treasure-room';
          const worldGames = isTreasure ? [] : getWorldGamesForAge(world.id, ageGroup);
          const doneCount = worldGames.filter((g) =>
            state.progress.completed_games.includes(g.id),
          ).length;
          const pct =
            worldGames.length > 0 ? Math.round((doneCount / worldGames.length) * 100) : 100;

          return (
            <article
              key={world.id}
              className="rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_6px_0_rgba(30,41,59,0.06)] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div
                  className="aspect-4/3 w-full overflow-hidden relative"
                  style={{ backgroundColor: world.surfaceHex }}
                >
                  {isTreasure ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#FEF9C3] via-[#FFD95A] to-[#FF9566] flex flex-col items-center justify-center p-6 text-center">
                      <Star className="w-16 h-16 fill-white text-slate-900 mb-2" />
                      <p className="font-display text-2xl font-bold text-slate-900">
                        {state.progress.unlocked_characters.length} / 5 Mascots Unlocked
                      </p>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        {state.progress.achievement_badges.length} / 8 Badges Earned
                      </p>
                    </div>
                  ) : !brokenImages[world.id] ? (
                    <img
                      src={world.imagePath}
                      alt={`${world.name} illustration`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [world.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-2xl font-bold text-slate-800">
                      {world.name}
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                      {world.name}
                    </h2>
                    {!isTreasure && (
                      <span className="font-mono-num text-xs font-extrabold text-slate-600">
                        {doneCount}/{worldGames.length} Done
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    {world.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 space-y-3">
                {!isTreasure && (
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: world.accentHex }}
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => onSelectWorld(world.id)}
                  style={{ backgroundColor: world.accentHex }}
                  className="w-full h-12 rounded-2xl border-2 border-slate-900/15 font-display text-lg font-bold text-slate-900 shadow-[0_3px_0_rgba(30,41,59,0.12)] hover:brightness-95 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-900" />
                  <span>{isTreasure ? 'Open Treasure Room' : `Play ${world.name}`}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export const GameSelectionScreen: React.FC<{
  worldId: WorldId;
  ageGroup: AgeGroup;
  state: WonderQuestState;
  onSelectGame: (gameId: MiniGameId) => void;
}> = ({ worldId, ageGroup, state, onSelectGame }) => {
  const world = WORLDS.find((w) => w.id === worldId) ?? WORLDS[0];
  const games = MINI_GAMES.filter(
    (g) => g.worldId === worldId && g.ageGroups.includes(ageGroup),
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <section
        className="rounded-3xl p-6 sm:p-7 border-2 border-slate-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ backgroundColor: world.surfaceHex }}
      >
        <div>
          <p className="text-xs font-extrabold tracking-wide text-slate-600">
            {AGE_LEVEL_META[ageGroup].title} · {games.length} Mini-Games
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
            {world.name}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
            {world.tagline}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {games.map((game) => {
          const rec = state.gameProgress[game.id];
          const isCompleted = state.progress.completed_games.includes(game.id);
          return (
            <article
              key={game.id}
              className="rounded-3xl bg-white border-2 border-slate-900/10 shadow-[0_5px_0_rgba(30,41,59,0.06)] p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold text-slate-500">
                    {game.difficultyLabel[ageGroup]}
                    {rec?.best_stars ? ` · Best: ${rec.best_stars} ★` : ''}
                  </span>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      Completed
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">Ready to play</span>
                  )}
                </div>

                <h2 className="font-display text-2xl font-bold text-slate-900">{game.title}</h2>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                  {game.shortDesc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectGame(game.id)}
                style={{ backgroundColor: game.accentHex }}
                className="h-13 px-5 rounded-2xl border-2 border-slate-900/15 font-display text-lg font-bold text-slate-900 shadow-[0_3px_0_rgba(30,41,59,0.12)] hover:brightness-95 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-900" />
                <span>Play {game.title}</span>
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
};
