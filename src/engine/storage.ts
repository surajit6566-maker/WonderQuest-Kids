import { MINI_GAMES, MASCOTS, WORLDS } from './catalog';
import {
  AgeGroup,
  DailyMissionState,
  GameProgressRecord,
  MascotId,
  MiniGameId,
  PlayerProgress,
  SavedDrawing,
  UserSettings,
  WonderQuestState,
  WorldId,
} from './types';

export const STORAGE_KEY = 'wonderquest_kids_db_v1';

const DAILY_MISSION_TEMPLATES: Array<{
  id: string;
  title: string;
  description: string;
  target_count: number;
  target_category: 'any' | WorldId;
  reward_stars: number;
}> = [
  {
    id: 'mission-animal-3',
    title: 'Animal Island Scout',
    description: 'Complete 2 Animal Island mini-games today.',
    target_count: 2,
    target_category: 'animal-island',
    reward_stars: 8,
  },
  {
    id: 'mission-number-2',
    title: 'Number Planet Explorer',
    description: 'Finish 2 Number Planet challenges today.',
    target_count: 2,
    target_category: 'number-planet',
    reward_stars: 8,
  },
  {
    id: 'mission-any-3',
    title: 'Triple Discovery Quest',
    description: 'Complete 3 mini-games in any world today.',
    target_count: 3,
    target_category: 'any',
    reward_stars: 10,
  },
  {
    id: 'mission-science-1',
    title: 'Curiosity Lab Mission',
    description: 'Complete 1 Science World quiz today.',
    target_count: 1,
    target_category: 'science-world',
    reward_stars: 6,
  },
  {
    id: 'mission-forest-2',
    title: 'Forest Puzzle Master',
    description: 'Complete 2 Mystery Forest challenges today.',
    target_count: 2,
    target_category: 'mystery-forest',
    reward_stars: 8,
  },
];

export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createMissionForDate(dateStr: string): DailyMissionState {
  // Deterministic hash from YYYY-MM-DD so same day gives consistent mission
  let hash = 0;
  for (let i = 0; i < dateStr.length; i += 1) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  const template = DAILY_MISSION_TEMPLATES[hash % DAILY_MISSION_TEMPLATES.length];
  return {
    mission_id: `${template.id}-${dateStr}`,
    title: template.title,
    description: template.description,
    target_count: template.target_count,
    current_count: 0,
    target_category: template.target_category,
    reward_stars: template.reward_stars,
    mission_date: dateStr,
    completion_status: 'active',
    reward_claimed: false,
  };
}

export function createDefaultState(dateStr: string = getLocalDateString()): WonderQuestState {
  const settings: UserSettings = {
    selected_age_group: null,
    sound_enabled: true,
    music_enabled: true,
    voice_enabled: true,
    reduced_motion: false,
    high_contrast: false,
    language: 'en',
    playtime_reminder_minutes: 30,
  };

  const progress: PlayerProgress = {
    total_stars: 5,
    lifetime_stars: 5,
    completed_games: [],
    completed_worlds: [],
    achievement_badges: [],
    unlocked_characters: ['wally'],
    active_character: 'wally',
    time_spent_seconds: 0,
    total_questions_answered: 0,
    total_correct_answers: 0,
  };

  return {
    settings,
    progress,
    gameProgress: {},
    dailyMission: createMissionForDate(dateStr),
    savedDrawings: [],
  };
}

function isValidAgeGroup(val: unknown): val is AgeGroup {
  return val === 'little' || val === 'smart' || val === 'super';
}

export function validateAndRepairState(
  raw: unknown,
  todayStr: string = getLocalDateString(),
): WonderQuestState {
  const fallback = createDefaultState(todayStr);
  if (!raw || typeof raw !== 'object') {
    return fallback;
  }
  const obj = raw as Record<string, unknown>;
  const rawSettings = (obj.settings && typeof obj.settings === 'object'
    ? obj.settings
    : {}) as Record<string, unknown>;
  const rawProgress = (obj.progress && typeof obj.progress === 'object'
    ? obj.progress
    : {}) as Record<string, unknown>;
  const rawMission = (obj.dailyMission && typeof obj.dailyMission === 'object'
    ? obj.dailyMission
    : {}) as Record<string, unknown>;

  const validGameIds = new Set(MINI_GAMES.map((g) => g.id));
  const validWorldIds = new Set(WORLDS.map((w) => w.id));
  const validMascots = new Set(MASCOTS.map((m) => m.id));

  const settings: UserSettings = {
    selected_age_group: isValidAgeGroup(rawSettings.selected_age_group)
      ? rawSettings.selected_age_group
      : null,
    sound_enabled:
      typeof rawSettings.sound_enabled === 'boolean' ? rawSettings.sound_enabled : true,
    music_enabled:
      typeof rawSettings.music_enabled === 'boolean' ? rawSettings.music_enabled : true,
    voice_enabled:
      typeof rawSettings.voice_enabled === 'boolean' ? rawSettings.voice_enabled : true,
    reduced_motion:
      typeof rawSettings.reduced_motion === 'boolean' ? rawSettings.reduced_motion : false,
    high_contrast:
      typeof rawSettings.high_contrast === 'boolean' ? rawSettings.high_contrast : false,
    language: 'en',
    playtime_reminder_minutes:
      typeof rawSettings.playtime_reminder_minutes === 'number' &&
      rawSettings.playtime_reminder_minutes >= 10 &&
      rawSettings.playtime_reminder_minutes <= 120
        ? Math.round(rawSettings.playtime_reminder_minutes)
        : 30,
  };

  const unlockedCharsRaw = Array.isArray(rawProgress.unlocked_characters)
    ? rawProgress.unlocked_characters.filter(
        (id): id is MascotId => typeof id === 'string' && validMascots.has(id as MascotId),
      )
    : [];
  const unlockedCharacters: MascotId[] = Array.from(new Set<MascotId>(['wally', ...unlockedCharsRaw]));

  const activeChar: MascotId =
    typeof rawProgress.active_character === 'string' &&
    unlockedCharacters.includes(rawProgress.active_character as MascotId)
      ? (rawProgress.active_character as MascotId)
      : 'wally';

  const completedGames = Array.isArray(rawProgress.completed_games)
    ? Array.from(
        new Set(
          rawProgress.completed_games.filter(
            (g): g is MiniGameId => typeof g === 'string' && validGameIds.has(g as MiniGameId),
          ),
        ),
      )
    : [];

  const completedWorlds = Array.isArray(rawProgress.completed_worlds)
    ? Array.from(
        new Set(
          rawProgress.completed_worlds.filter(
            (w): w is WorldId => typeof w === 'string' && validWorldIds.has(w as WorldId),
          ),
        ),
      )
    : [];

  const achievementBadges = Array.isArray(rawProgress.achievement_badges)
    ? Array.from(
        new Set(rawProgress.achievement_badges.filter((b): b is string => typeof b === 'string')),
      )
    : [];

  const totalStars =
    typeof rawProgress.total_stars === 'number' && Number.isFinite(rawProgress.total_stars)
      ? Math.max(0, Math.floor(rawProgress.total_stars))
      : 5;

  const lifetimeStars =
    typeof rawProgress.lifetime_stars === 'number' && Number.isFinite(rawProgress.lifetime_stars)
      ? Math.max(totalStars, Math.floor(rawProgress.lifetime_stars))
      : totalStars;

  const progress: PlayerProgress = {
    total_stars: totalStars,
    lifetime_stars: lifetimeStars,
    completed_games: completedGames,
    completed_worlds: completedWorlds,
    achievement_badges: achievementBadges,
    unlocked_characters: unlockedCharacters,
    active_character: activeChar,
    time_spent_seconds:
      typeof rawProgress.time_spent_seconds === 'number' && rawProgress.time_spent_seconds >= 0
        ? Math.floor(rawProgress.time_spent_seconds)
        : 0,
    total_questions_answered:
      typeof rawProgress.total_questions_answered === 'number' &&
      rawProgress.total_questions_answered >= 0
        ? Math.floor(rawProgress.total_questions_answered)
        : 0,
    total_correct_answers:
      typeof rawProgress.total_correct_answers === 'number' &&
      rawProgress.total_correct_answers >= 0
        ? Math.floor(rawProgress.total_correct_answers)
        : 0,
  };

  const gameProgress: Record<string, GameProgressRecord> = {};
  if (obj.gameProgress && typeof obj.gameProgress === 'object') {
    for (const [key, val] of Object.entries(obj.gameProgress as Record<string, unknown>)) {
      if (!validGameIds.has(key as MiniGameId) || !val || typeof val !== 'object') {
        continue;
      }
      const rec = val as Record<string, unknown>;
      gameProgress[key] = {
        game_id: key as MiniGameId,
        current_level:
          typeof rec.current_level === 'number' && rec.current_level >= 1
            ? Math.floor(rec.current_level)
            : 1,
        correct_answers:
          typeof rec.correct_answers === 'number' && rec.correct_answers >= 0
            ? Math.floor(rec.correct_answers)
            : 0,
        incorrect_answers:
          typeof rec.incorrect_answers === 'number' && rec.incorrect_answers >= 0
            ? Math.floor(rec.incorrect_answers)
            : 0,
        best_stars:
          typeof rec.best_stars === 'number' && rec.best_stars >= 0
            ? Math.min(5, Math.floor(rec.best_stars))
            : 0,
        completion_status:
          rec.completion_status === 'completed' || rec.completion_status === 'in-progress'
            ? rec.completion_status
            : 'not-started',
        last_played_date:
          typeof rec.last_played_date === 'string' ? rec.last_played_date : todayStr,
      };
    }
  }

  let dailyMission = createMissionForDate(todayStr);
  if (rawMission.mission_date === todayStr && typeof rawMission.mission_id === 'string') {
    const targetCount =
      typeof rawMission.target_count === 'number' && rawMission.target_count > 0
        ? Math.floor(rawMission.target_count)
        : dailyMission.target_count;
    const currentCount =
      typeof rawMission.current_count === 'number' && rawMission.current_count >= 0
        ? Math.min(targetCount, Math.floor(rawMission.current_count))
        : 0;
    dailyMission = {
      ...dailyMission,
      current_count: currentCount,
      completion_status: currentCount >= targetCount ? 'completed' : 'active',
      reward_claimed: Boolean(rawMission.reward_claimed) && currentCount >= targetCount,
    };
  }

  const savedDrawings: SavedDrawing[] = Array.isArray(obj.savedDrawings)
    ? obj.savedDrawings
        .filter(
          (d): d is SavedDrawing =>
            Boolean(d) &&
            typeof d === 'object' &&
            typeof (d as SavedDrawing).id === 'string' &&
            typeof (d as SavedDrawing).dataUrl === 'string' &&
            (d as SavedDrawing).dataUrl.startsWith('data:image/'),
        )
        .slice(0, 12)
    : [];

  return {
    settings,
    progress,
    gameProgress,
    dailyMission,
    savedDrawings,
  };
}

export function loadWonderQuestState(todayStr: string = getLocalDateString()): WonderQuestState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createDefaultState(todayStr);
  }
  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return createDefaultState(todayStr);
    }
    const parsed = JSON.parse(serialized);
    return validateAndRepairState(parsed, todayStr);
  } catch {
    return createDefaultState(todayStr);
  }
}

export function saveWonderQuestState(state: WonderQuestState): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors gracefully so gameplay never crashes
  }
}

export function syncDailyMissionForDate(
  state: WonderQuestState,
  todayStr: string = getLocalDateString(),
): WonderQuestState {
  if (state.dailyMission.mission_date === todayStr) {
    return state;
  }
  return {
    ...state,
    dailyMission: createMissionForDate(todayStr),
  };
}

export function calculateStarsEarned(correctCount: number, totalCount: number): number {
  if (totalCount <= 0) return 1;
  const ratio = correctCount / totalCount;
  if (ratio >= 0.9) return 5;
  if (ratio >= 0.7) return 4;
  if (ratio >= 0.5) return 3;
  if (ratio >= 0.25) return 2;
  return 1; // Always encouraging virtual star for effort!
}

export function getWorldGamesForAge(worldId: WorldId, ageGroup: AgeGroup) {
  return MINI_GAMES.filter(
    (game) => game.worldId === worldId && game.ageGroups.includes(ageGroup),
  );
}

export function evaluateBadges(state: WonderQuestState): string[] {
  const earned = new Set(state.progress.achievement_badges);

  if (state.progress.completed_games.length >= 1) earned.add('first-star');
  if (state.progress.lifetime_stars >= 25) earned.add('star-collector-25');
  if (state.progress.unlocked_characters.length >= 2) earned.add('friend-maker');
  if (state.progress.completed_worlds.length >= 1) earned.add('world-conqueror');
  if (state.savedDrawings.length >= 1) earned.add('creative-artist');
  if (state.progress.completed_games.length >= 5) earned.add('five-games');
  if (state.progress.completed_games.length >= 10) earned.add('ten-games');
  if (state.progress.lifetime_stars >= 75 && state.progress.unlocked_characters.length >= 3) {
    earned.add('grand-champion');
  }

  return Array.from(earned);
}

export function recordGameCompletion(
  state: WonderQuestState,
  params: {
    gameId: MiniGameId;
    worldId: WorldId;
    correctCount: number;
    incorrectCount: number;
    ageGroup: AgeGroup;
    todayStr?: string;
  },
): {
  nextState: WonderQuestState;
  starsEarned: number;
  worldBonusStars: number;
  newlyUnlockedBadges: string[];
} {
  const todayStr = params.todayStr ?? getLocalDateString();
  const synced = syncDailyMissionForDate(state, todayStr);
  const totalCount = Math.max(1, params.correctCount + params.incorrectCount);
  const starsEarned = calculateStarsEarned(params.correctCount, totalCount);

  const prevRecord = synced.gameProgress[params.gameId];
  const updatedRecord: GameProgressRecord = {
    game_id: params.gameId,
    current_level: (prevRecord?.current_level ?? 0) + 1,
    correct_answers: (prevRecord?.correct_answers ?? 0) + params.correctCount,
    incorrect_answers: (prevRecord?.incorrect_answers ?? 0) + params.incorrectCount,
    best_stars: Math.max(prevRecord?.best_stars ?? 0, starsEarned),
    completion_status: 'completed',
    last_played_date: todayStr,
  };

  const completedGames = Array.from(new Set([...synced.progress.completed_games, params.gameId]));

  // Check if all playable games in this world are now complete
  const worldGames = getWorldGamesForAge(params.worldId, params.ageGroup);
  const allWorldGamesComplete =
    worldGames.length > 0 && worldGames.every((g) => completedGames.includes(g.id));

  let worldBonusStars = 0;
  const completedWorlds = [...synced.progress.completed_worlds];
  if (allWorldGamesComplete && !completedWorlds.includes(params.worldId)) {
    completedWorlds.push(params.worldId);
    worldBonusStars = 5;
  }

  // Advance daily mission if eligible
  let dailyMission = { ...synced.dailyMission };
  if (
    dailyMission.completion_status !== 'completed' &&
    (dailyMission.target_category === 'any' || dailyMission.target_category === params.worldId)
  ) {
    const nextCount = Math.min(dailyMission.target_count, dailyMission.current_count + 1);
    dailyMission = {
      ...dailyMission,
      current_count: nextCount,
      completion_status: nextCount >= dailyMission.target_count ? 'completed' : 'active',
    };
  }

  const totalGained = starsEarned + worldBonusStars;
  const draftState: WonderQuestState = {
    ...synced,
    progress: {
      ...synced.progress,
      total_stars: synced.progress.total_stars + totalGained,
      lifetime_stars: synced.progress.lifetime_stars + totalGained,
      completed_games: completedGames,
      completed_worlds: completedWorlds,
      total_questions_answered: synced.progress.total_questions_answered + totalCount,
      total_correct_answers: synced.progress.total_correct_answers + params.correctCount,
    },
    gameProgress: {
      ...synced.gameProgress,
      [params.gameId]: updatedRecord,
    },
    dailyMission,
  };

  const beforeBadges = new Set(synced.progress.achievement_badges);
  const allBadges = evaluateBadges(draftState);
  const newlyUnlockedBadges = allBadges.filter((b) => !beforeBadges.has(b));

  return {
    nextState: {
      ...draftState,
      progress: {
        ...draftState.progress,
        achievement_badges: allBadges,
      },
    },
    starsEarned,
    worldBonusStars,
    newlyUnlockedBadges,
  };
}

export function claimDailyMissionReward(state: WonderQuestState): {
  nextState: WonderQuestState;
  claimedStars: number;
} {
  if (
    state.dailyMission.completion_status !== 'completed' ||
    state.dailyMission.reward_claimed
  ) {
    return { nextState: state, claimedStars: 0 };
  }

  const bonus = state.dailyMission.reward_stars;
  const draft: WonderQuestState = {
    ...state,
    progress: {
      ...state.progress,
      total_stars: state.progress.total_stars + bonus,
      lifetime_stars: state.progress.lifetime_stars + bonus,
    },
    dailyMission: {
      ...state.dailyMission,
      reward_claimed: true,
    },
  };

  return {
    nextState: {
      ...draft,
      progress: {
        ...draft.progress,
        achievement_badges: evaluateBadges(draft),
      },
    },
    claimedStars: bonus,
  };
}

export function unlockMascot(
  state: WonderQuestState,
  mascotId: MascotId,
): { ok: boolean; reason?: string; nextState: WonderQuestState } {
  const mascot = MASCOTS.find((m) => m.id === mascotId);
  if (!mascot) {
    return { ok: false, reason: 'Character not found.', nextState: state };
  }
  if (state.progress.unlocked_characters.includes(mascotId)) {
    return {
      ok: true,
      nextState: {
        ...state,
        progress: { ...state.progress, active_character: mascotId },
      },
    };
  }
  if (state.progress.total_stars < mascot.unlockCost) {
    return {
      ok: false,
      reason: `Need ${mascot.unlockCost - state.progress.total_stars} more stars to unlock ${mascot.name}.`,
      nextState: state,
    };
  }

  const draft: WonderQuestState = {
    ...state,
    progress: {
      ...state.progress,
      total_stars: state.progress.total_stars - mascot.unlockCost,
      unlocked_characters: [...state.progress.unlocked_characters, mascotId],
      active_character: mascotId,
    },
  };

  return {
    ok: true,
    nextState: {
      ...draft,
      progress: {
        ...draft.progress,
        achievement_badges: evaluateBadges(draft),
      },
    },
  };
}

export interface ParentalGateChallenge {
  a: number;
  b: number;
  c: number;
  prompt: string;
  answer: number;
}

export function createParentalGate(seedRandom: () => number = Math.random): ParentalGateChallenge {
  const a = 3 + Math.floor(seedRandom() * 7); // 3..9
  const b = 4 + Math.floor(seedRandom() * 6); // 4..9
  const c = 2 + Math.floor(seedRandom() * 8); // 2..9
  return {
    a,
    b,
    c,
    prompt: `What is (${a} × ${b}) + ${c}?`,
    answer: a * b + c,
  };
}

export function verifyParentalGate(challenge: ParentalGateChallenge, userInput: string): boolean {
  const trimmed = userInput.trim();
  if (!/^\d+$/.test(trimmed)) return false;
  return Number.parseInt(trimmed, 10) === challenge.answer;
}

export function formatLearningTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}
