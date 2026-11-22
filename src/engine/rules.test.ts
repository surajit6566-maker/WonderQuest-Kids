import test from 'node:test';
import assert from 'node:assert/strict';
import { MINI_GAMES } from './catalog';
import {
  getMemoryDeck,
  getMissingObjectRounds,
  getNumberCatcherRounds,
  getPicturePuzzlePresets,
  getQuizQuestionsForGame,
  getWordBuilderRounds,
} from './questions';
import {
  calculateStarsEarned,
  claimDailyMissionReward,
  createDefaultState,
  createMissionForDate,
  createParentalGate,
  formatLearningTime,
  recordGameCompletion,
  syncDailyMissionForDate,
  unlockMascot,
  validateAndRepairState,
  verifyParentalGate,
} from './storage';
import { AgeGroup } from './types';

test('age-gating ensures >= 10 valid challenges per mini-game and zero older-age leaks', () => {
  const ages: AgeGroup[] = ['little', 'smart', 'super'];

  for (const age of ages) {
    for (const game of MINI_GAMES) {
      if (game.mechanic === 'quiz' || game.mechanic === 'animal-sound') {
        const qs = getQuizQuestionsForGame(game.id, age);
        assert.ok(
          qs.length >= 10,
          `${game.id} for ${age} must have at least 10 questions (got ${qs.length})`,
        );
        for (const q of qs) {
          assert.ok(
            q.ageGroups.includes(age),
            `Question ${q.id} in ${game.id} leaked across age boundary to ${age}`,
          );
          assert.ok(
            q.options.some((opt) => opt.id === q.correctOptionId),
            `Question ${q.id} must contain its correctOptionId in options`,
          );
        }
      } else if (game.mechanic === 'word-builder') {
        const words = getWordBuilderRounds(age);
        assert.ok(words.length >= 10);
        if (age === 'little') {
          assert.ok(words.every((w) => w.word.length <= 3));
        }
      } else if (game.mechanic === 'missing-object') {
        const rounds = getMissingObjectRounds(age);
        assert.ok(rounds.length >= 10);
      } else if (game.mechanic === 'number-catcher') {
        const rounds = getNumberCatcherRounds(age);
        assert.ok(rounds.length >= 10);
        if (age === 'little') {
          assert.ok(rounds.every((r) => r.targetValue >= 1 && r.targetValue <= 10));
        }
      } else if (game.mechanic === 'memory-match') {
        const deck = getMemoryDeck(age);
        assert.equal(deck.length, age === 'little' ? 4 : age === 'smart' ? 6 : 8);
      } else if (game.mechanic === 'picture-puzzle') {
        const presets = getPicturePuzzlePresets(age);
        assert.ok(presets.length >= 2);
      }
    }
  }
});

test('validateAndRepairState safely recovers from corrupted or missing fields', () => {
  const repaired = validateAndRepairState(
    {
      settings: { selected_age_group: 'invalid-age', playtime_reminder_minutes: -50 },
      progress: {
        total_stars: -10,
        unlocked_characters: ['unknown-hero'],
        active_character: 'unknown-hero',
      },
    },
    '2026-11-22',
  );

  assert.equal(repaired.settings.selected_age_group, null);
  assert.equal(repaired.settings.music_enabled, true);
  assert.equal(repaired.settings.playtime_reminder_minutes, 30);
  assert.equal(repaired.progress.total_stars, 0);
  assert.deepEqual(repaired.progress.unlocked_characters, ['wally']);
  assert.equal(repaired.progress.active_character, 'wally');
  assert.equal(repaired.dailyMission.mission_date, '2026-11-22');

  const explicitOff = validateAndRepairState({ settings: { music_enabled: false } }, '2026-11-22');
  assert.equal(explicitOff.settings.music_enabled, false);
  assert.equal(createDefaultState('2026-11-22').settings.music_enabled, true);
});

test('calculateStarsEarned awards 1..5 stars proportionally', () => {
  assert.equal(calculateStarsEarned(10, 10), 5);
  assert.equal(calculateStarsEarned(7, 10), 4);
  assert.equal(calculateStarsEarned(5, 10), 3);
  assert.equal(calculateStarsEarned(3, 10), 2);
  assert.equal(calculateStarsEarned(0, 10), 1);
});

test('unlockMascot enforces star balance and awards Friend Maker badge', () => {
  const initial = createDefaultState('2026-11-22');
  // Bella costs 10 stars, default starts with 5
  const failUnlock = unlockMascot(initial, 'bella');
  assert.equal(failUnlock.ok, false);
  assert.equal(failUnlock.nextState.progress.unlocked_characters.length, 1);

  const richState = {
    ...initial,
    progress: { ...initial.progress, total_stars: 15, lifetime_stars: 15 },
  };
  const okUnlock = unlockMascot(richState, 'bella');
  assert.equal(okUnlock.ok, true);
  assert.equal(okUnlock.nextState.progress.total_stars, 5);
  assert.ok(okUnlock.nextState.progress.unlocked_characters.includes('bella'));
  assert.equal(okUnlock.nextState.progress.active_character, 'bella');
  assert.ok(okUnlock.nextState.progress.achievement_badges.includes('friend-maker'));
});

test('recordGameCompletion updates stars, badges, world completion, and daily mission', () => {
  let state = createDefaultState('2026-11-22');
  // Force an animal-island mission for deterministic test or 'any'
  state = {
    ...state,
    dailyMission: {
      ...createMissionForDate('2026-11-22'),
      target_category: 'animal-island',
      target_count: 2,
      current_count: 0,
      reward_stars: 8,
    },
  };

  const res1 = recordGameCompletion(state, {
    gameId: 'animal-sound-detective',
    worldId: 'animal-island',
    correctCount: 9,
    incorrectCount: 1,
    ageGroup: 'smart',
    todayStr: '2026-11-22',
  });

  assert.equal(res1.starsEarned, 5);
  assert.equal(res1.worldBonusStars, 0);
  assert.ok(res1.newlyUnlockedBadges.includes('first-star'));
  assert.equal(res1.nextState.dailyMission.current_count, 1);

  const res2 = recordGameCompletion(res1.nextState, {
    gameId: 'geography-challenge',
    worldId: 'animal-island',
    correctCount: 10,
    incorrectCount: 0,
    ageGroup: 'smart',
    todayStr: '2026-11-22',
  });

  assert.equal(res2.worldBonusStars, 5);
  assert.ok(res2.nextState.progress.completed_worlds.includes('animal-island'));
  assert.ok(res2.newlyUnlockedBadges.includes('world-conqueror'));
  assert.equal(res2.nextState.dailyMission.completion_status, 'completed');

  const claimRes = claimDailyMissionReward(res2.nextState);
  assert.equal(claimRes.claimedStars, 8);
  assert.equal(claimRes.nextState.dailyMission.reward_claimed, true);
});

test('syncDailyMissionForDate resets mission cleanly when date changes', () => {
  const day1 = createDefaultState('2026-11-22');
  const modified = {
    ...day1,
    dailyMission: { ...day1.dailyMission, current_count: 2, completion_status: 'completed' as const },
  };
  const sameDay = syncDailyMissionForDate(modified, '2026-11-22');
  assert.equal(sameDay.dailyMission.current_count, 2);

  const nextDay = syncDailyMissionForDate(modified, '2026-11-23');
  assert.equal(nextDay.dailyMission.mission_date, '2026-11-23');
  assert.equal(nextDay.dailyMission.current_count, 0);
  assert.equal(nextDay.dailyMission.completion_status, 'active');
});

test('parental gate math challenge validates exact numeric answers only', () => {
  const gate = createParentalGate(() => 0.5);
  assert.equal(verifyParentalGate(gate, String(gate.answer)), true);
  assert.equal(verifyParentalGate(gate, 'abc'), false);
  assert.equal(verifyParentalGate(gate, String(gate.answer + 1)), false);
});

test('formatLearningTime renders clean readable durations', () => {
  assert.equal(formatLearningTime(45), '45s');
  assert.equal(formatLearningTime(125), '2m 5s');
  assert.equal(formatLearningTime(3665), '1h 1m');
});
