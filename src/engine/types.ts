export type AgeGroup = 'little' | 'smart' | 'super';

export type ScreenId =
  | 'splash'
  | 'welcome'
  | 'age-select'
  | 'home'
  | 'worlds'
  | 'games'
  | 'gameplay'
  | 'creative-studio'
  | 'result'
  | 'collection'
  | 'parent'
  | 'settings'
  | 'privacy';

export type WorldId =
  | 'animal-island'
  | 'number-planet'
  | 'mystery-forest'
  | 'creative-city'
  | 'science-world'
  | 'treasure-room';

export type MiniGameId =
  | 'animal-sound-detective'
  | 'color-matching'
  | 'shape-explorer'
  | 'number-catcher'
  | 'addition-adventure'
  | 'subtraction-challenge'
  | 'memory-card-match'
  | 'find-missing-object'
  | 'word-builder'
  | 'spelling-adventure'
  | 'science-quiz'
  | 'planet-explorer-quiz'
  | 'pattern-detective'
  | 'geography-challenge'
  | 'picture-puzzle'
  | 'creative-coloring-studio';

export type GameMechanic =
  | 'quiz'
  | 'animal-sound'
  | 'number-catcher'
  | 'memory-match'
  | 'missing-object'
  | 'word-builder'
  | 'picture-puzzle'
  | 'coloring-studio';

export type MascotId = 'wally' | 'bella' | 'coco' | 'luna' | 'max';

export type SoundEffectType =
  | 'click'
  | 'correct'
  | 'incorrect'
  | 'star'
  | 'victory'
  | 'cow'
  | 'lion'
  | 'frog'
  | 'duck'
  | 'cat'
  | 'dog'
  | 'elephant'
  | 'owl'
  | 'sheep'
  | 'bird';

export interface UserSettings {
  selected_age_group: AgeGroup | null;
  sound_enabled: boolean;
  music_enabled: boolean;
  voice_enabled: boolean;
  reduced_motion: boolean;
  high_contrast: boolean;
  language: 'en';
  playtime_reminder_minutes: number;
}

export interface PlayerProgress {
  total_stars: number;
  lifetime_stars: number;
  completed_games: MiniGameId[];
  completed_worlds: WorldId[];
  achievement_badges: string[];
  unlocked_characters: MascotId[];
  active_character: MascotId;
  time_spent_seconds: number;
  total_questions_answered: number;
  total_correct_answers: number;
}

export interface GameProgressRecord {
  game_id: MiniGameId;
  current_level: number;
  correct_answers: number;
  incorrect_answers: number;
  best_stars: number;
  completion_status: 'not-started' | 'in-progress' | 'completed';
  last_played_date: string;
}

export interface DailyMissionState {
  mission_id: string;
  title: string;
  description: string;
  target_count: number;
  current_count: number;
  target_category: 'any' | WorldId;
  reward_stars: number;
  mission_date: string;
  completion_status: 'active' | 'completed';
  reward_claimed: boolean;
}

export interface SavedDrawing {
  id: string;
  title: string;
  template: string;
  dataUrl: string;
  createdAt: string;
}

export interface WonderQuestState {
  settings: UserSettings;
  progress: PlayerProgress;
  gameProgress: Record<string, GameProgressRecord>;
  dailyMission: DailyMissionState;
  savedDrawings: SavedDrawing[];
}

export interface VisualCue {
  kind:
    | 'animal'
    | 'color'
    | 'shape'
    | 'count'
    | 'math'
    | 'pattern'
    | 'planet'
    | 'science'
    | 'geography'
    | 'word';
  primaryValue: string;
  secondaryValue?: string;
  count?: number;
  colorHex?: string;
  items?: string[];
  patternSequence?: Array<{ shape: string; color: string; label?: string }>;
}

export interface QuestionItem {
  id: string;
  ageGroups: AgeGroup[];
  prompt: string;
  voicePrompt?: string;
  soundCue?: SoundEffectType;
  visual?: VisualCue;
  options: Array<{
    id: string;
    label: string;
    colorHex?: string;
    emoji?: string;
  }>;
  correctOptionId: string;
  explanation: string;
}

export interface WorldDefinition {
  id: WorldId;
  name: string;
  tagline: string;
  description: string;
  accentHex: string;
  surfaceHex: string;
  imagePath: string;
  minAgeGroup: AgeGroup;
}

export interface MiniGameDefinition {
  id: MiniGameId;
  worldId: WorldId;
  title: string;
  shortDesc: string;
  instructions: string;
  mechanic: GameMechanic;
  ageGroups: AgeGroup[];
  difficultyLabel: Record<AgeGroup, string>;
  accentHex: string;
  iconKey: string;
}

export interface MascotDefinition {
  id: MascotId;
  name: string;
  role: string;
  personality: string;
  unlockCost: number;
  accentHex: string;
  encouragements: string[];
}

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  accentHex: string;
  iconName: 'star' | 'compass' | 'trophy' | 'palette' | 'rocket' | 'owl' | 'heart' | 'crown';
}

export interface GameplayResultSummary {
  gameId: MiniGameId;
  worldId: WorldId;
  correctCount: number;
  incorrectCount: number;
  starsEarned: number;
  worldBonusStars: number;
  newBadges: string[];
  encouragement: string;
}
