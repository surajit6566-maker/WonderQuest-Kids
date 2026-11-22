import { useCallback, useEffect, useRef, useState } from 'react';
import { ParentalGateModal } from './components/ParentalGateModal';
import { ShellHeader } from './components/ShellHeader';
import { MASCOTS, MINI_GAMES } from './engine/catalog';
import {
  claimDailyMissionReward,
  createDefaultState,
  evaluateBadges,
  getLocalDateString,
  loadWonderQuestState,
  recordGameCompletion,
  saveWonderQuestState,
  unlockMascot,
} from './engine/storage';
import {
  AgeGroup,
  GameplayResultSummary,
  MascotId,
  MiniGameId,
  SavedDrawing,
  ScreenId,
  SoundEffectType,
  UserSettings,
  WonderQuestState,
  WorldId,
} from './engine/types';
import {
  CollectionScreen,
  ParentDashboardScreen,
  PrivacyScreen,
  SettingsScreen,
} from './screens/CollectionAndAdminScreens';
import { GameplayScreen, ResultScreen } from './screens/GameplayAndResultScreens';
import {
  GameSelectionScreen,
  HomeScreen,
  WorldSelectionScreen,
} from './screens/HomeAndWorldsScreens';
import {
  AgeSelectionScreen,
  SplashScreen,
  WelcomeScreen,
} from './screens/OnboardingScreens';
import { soundEngine } from './utils/audio';

export default function App() {
  const [state, setState] = useState<WonderQuestState>(() => loadWonderQuestState());

  const initialScreen = (): ScreenId => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 'home';
      }
    }
    return 'splash';
  };

  const [screen, setScreen] = useState<ScreenId>(initialScreen);
  const [selectedWorld, setSelectedWorld] = useState<WorldId>('animal-island');
  const [selectedGame, setSelectedGame] = useState<MiniGameId>('animal-sound-detective');
  const [resultSummary, setResultSummary] = useState<GameplayResultSummary | null>(null);
  const [playKey, setPlayKey] = useState(0);

  // Parental gate & break reminder state
  const [gateAction, setGateAction] = useState<null | 'parent' | 'reset'>(null);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [breakBannerDismissed, setBreakBannerDismissed] = useState(false);

  const settingsRef = useRef(state.settings);
  settingsRef.current = state.settings;

  // Ensure ?autostart=1 has an active age level if none was saved yet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' && !state.settings.selected_age_group) {
        setState((prev) => ({
          ...prev,
          settings: { ...prev.settings, selected_age_group: 'smart' },
        }));
      }
    }
  }, [state.settings.selected_age_group]);

  // Persist every state change locally
  useEffect(() => {
    saveWonderQuestState(state);
  }, [state]);

  // Sync reduced-motion and body dataset state
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('reduced-motion', state.settings.reduced_motion);
      document.body.dataset.state =
        screen === 'splash' || screen === 'welcome' || screen === 'age-select'
          ? 'title'
          : 'playing';
    }
  }, [state.settings.reduced_motion, screen]);

  // Sync optional background music loop
  useEffect(() => {
    soundEngine.startMusic(state.settings.music_enabled);
    return () => soundEngine.stopMusic();
  }, [state.settings.music_enabled]);

  // Track learning time gently while in active screens
  useEffect(() => {
    if (screen === 'splash' || screen === 'welcome') return;
    const timer = window.setInterval(() => {
      setSessionSeconds((s) => s + 5);
      setState((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          time_spent_seconds: prev.progress.time_spent_seconds + 5,
        },
      }));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [screen]);

  const playSound = useCallback((effect: SoundEffectType) => {
    soundEngine.play(effect, settingsRef.current.sound_enabled);
  }, []);

  const speakText = useCallback((text: string) => {
    soundEngine.speak(text, settingsRef.current.voice_enabled);
  }, []);

  const activeAge: AgeGroup = state.settings.selected_age_group ?? 'smart';

  const handleUpdateSettings = (patch: Partial<UserSettings>) => {
    playSound('click');
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...patch },
    }));
  };

  const handleSplashComplete = useCallback(() => {
    setScreen((curr) => (curr === 'splash' ? 'welcome' : curr));
  }, []);

  const handleStartFromWelcome = () => {
    playSound('click');
    if (state.settings.selected_age_group) {
      setScreen('home');
    } else {
      setScreen('age-select');
    }
  };

  const handleSelectAge = (age: AgeGroup) => {
    playSound('star');
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, selected_age_group: age },
    }));
    setScreen('home');
  };

  const handleSelectWorld = (worldId: WorldId) => {
    playSound('click');
    if (worldId === 'treasure-room') {
      setScreen('collection');
      return;
    }
    setSelectedWorld(worldId);
    setScreen('games');
  };

  const handleSelectGame = (gameId: MiniGameId) => {
    playSound('click');
    setSelectedGame(gameId);
    setPlayKey((k) => k + 1);
    setScreen('gameplay');
  };

  const handleCompleteGame = (correctCount: number, incorrectCount: number) => {
    const game = MINI_GAMES.find((g) => g.id === selectedGame) ?? MINI_GAMES[0];
    const outcome = recordGameCompletion(state, {
      gameId: game.id,
      worldId: game.worldId,
      correctCount,
      incorrectCount,
      ageGroup: activeAge,
      todayStr: getLocalDateString(),
    });

    setState(outcome.nextState);
    playSound('victory');

    const mascot =
      MASCOTS.find((m) => m.id === outcome.nextState.progress.active_character) ?? MASCOTS[0];
    const encouragement =
      mascot.encouragements[
        (correctCount + outcome.starsEarned) % mascot.encouragements.length
      ];

    setResultSummary({
      gameId: game.id,
      worldId: game.worldId,
      correctCount,
      incorrectCount,
      starsEarned: outcome.starsEarned,
      worldBonusStars: outcome.worldBonusStars,
      newBadges: outcome.newlyUnlockedBadges,
      encouragement,
    });
    setScreen('result');
  };

  const handleNextChallenge = () => {
    playSound('click');
    const worldGames = MINI_GAMES.filter(
      (g) => g.worldId === selectedWorld && g.ageGroups.includes(activeAge),
    );
    if (worldGames.length === 0) {
      setScreen('worlds');
      return;
    }
    const idx = worldGames.findIndex((g) => g.id === selectedGame);
    const nextGame = worldGames[(idx + 1) % worldGames.length];
    setSelectedGame(nextGame.id);
    setPlayKey((k) => k + 1);
    setScreen('gameplay');
  };

  const handleSaveDrawing = (drawing: SavedDrawing) => {
    setState((prev) => {
      const nextDrawings = [drawing, ...prev.savedDrawings].slice(0, 12);
      const draft: WonderQuestState = {
        ...prev,
        savedDrawings: nextDrawings,
        progress: {
          ...prev.progress,
          total_stars: prev.progress.total_stars + 3,
          lifetime_stars: prev.progress.lifetime_stars + 3,
          completed_games: Array.from(
            new Set([...prev.progress.completed_games, 'creative-coloring-studio']),
          ),
        },
      };
      return {
        ...draft,
        progress: {
          ...draft.progress,
          achievement_badges: evaluateBadges(draft),
        },
      };
    });
  };

  const handleDeleteDrawing = (id: string) => {
    playSound('click');
    setState((prev) => ({
      ...prev,
      savedDrawings: prev.savedDrawings.filter((d) => d.id !== id),
    }));
  };

  const handleUnlockOrSelectMascot = (id: MascotId) => {
    const res = unlockMascot(state, id);
    if (res.ok) {
      playSound('star');
      setState(res.nextState);
    } else {
      playSound('incorrect');
    }
  };

  const handleClaimDailyMission = () => {
    const res = claimDailyMissionReward(state);
    if (res.claimedStars > 0) {
      playSound('victory');
      setState(res.nextState);
    }
  };

  const handleGateSuccess = () => {
    const action = gateAction;
    setGateAction(null);
    playSound('correct');
    if (action === 'parent') {
      setScreen('parent');
    } else if (action === 'reset') {
      const fresh = createDefaultState(getLocalDateString());
      setState(fresh);
      setScreen('age-select');
    }
  };

  const getBackHandler = (): (() => void) | undefined => {
    switch (screen) {
      case 'age-select':
        return () => setScreen(state.settings.selected_age_group ? 'home' : 'welcome');
      case 'worlds':
      case 'collection':
      case 'parent':
      case 'settings':
        return () => setScreen('home');
      case 'privacy':
        return () => setScreen(state.settings.selected_age_group ? 'home' : 'welcome');
      case 'games':
        return () => setScreen('worlds');
      case 'gameplay':
      case 'result':
        return () => {
          soundEngine.stopSpeech();
          setScreen('games');
        };
      default:
        return undefined;
    }
  };

  const showHeader = screen !== 'splash' && screen !== 'welcome';
  const showBreakBanner =
    !breakBannerDismissed &&
    sessionSeconds >= state.settings.playtime_reminder_minutes * 60 &&
    screen !== 'splash' &&
    screen !== 'welcome';

  return (
    <div className="min-h-screen bg-[#FFF9EC] text-slate-800 pb-10">
      {showHeader && (
        <ShellHeader
          screen={screen}
          stars={state.progress.total_stars}
          ageGroup={state.settings.selected_age_group}
          soundEnabled={state.settings.sound_enabled}
          musicEnabled={state.settings.music_enabled}
          onGoHome={() => {
            soundEngine.stopSpeech();
            playSound('click');
            setScreen(state.settings.selected_age_group ? 'home' : 'age-select');
          }}
          onBack={getBackHandler()}
          onToggleSound={() =>
            handleUpdateSettings({ sound_enabled: !state.settings.sound_enabled })
          }
          onToggleMusic={() =>
            handleUpdateSettings({ music_enabled: !state.settings.music_enabled })
          }
          onOpenSettings={() => {
            playSound('click');
            setScreen('settings');
          }}
          onOpenParent={() => {
            playSound('click');
            setGateAction('parent');
          }}
        />
      )}

      {showBreakBanner && (
        <div className="max-w-4xl mx-auto px-4 mt-2">
          <div className="p-3.5 rounded-2xl bg-[#EBF8FE] border-2 border-[#57C7F2] flex items-center justify-between gap-4 text-sm font-bold text-slate-800">
            <span>
              Time for a quick stretch and water break! You have been exploring for{' '}
              {state.settings.playtime_reminder_minutes} minutes.
            </span>
            <button
              type="button"
              onClick={() => setBreakBannerDismissed(true)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-extrabold whitespace-nowrap"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {screen === 'splash' && (
        <SplashScreen
          reducedMotion={state.settings.reduced_motion}
          onComplete={handleSplashComplete}
        />
      )}

      {screen === 'welcome' && (
        <WelcomeScreen
          reducedMotion={state.settings.reduced_motion}
          onStartLearning={handleStartFromWelcome}
          onParentInfo={() => {
            playSound('click');
            setScreen('privacy');
          }}
        />
      )}

      {screen === 'age-select' && (
        <AgeSelectionScreen
          selectedAge={state.settings.selected_age_group}
          reducedMotion={state.settings.reduced_motion}
          onSelectAge={handleSelectAge}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          state={state}
          ageGroup={activeAge}
          onExploreWorlds={() => {
            playSound('click');
            setScreen('worlds');
          }}
          onOpenCollection={() => {
            playSound('click');
            setScreen('collection');
          }}
          onOpenParent={() => {
            playSound('click');
            setGateAction('parent');
          }}
          onOpenSettings={() => {
            playSound('click');
            setScreen('settings');
          }}
          onChangeAge={() => {
            playSound('click');
            setScreen('age-select');
          }}
          onClaimDailyMission={handleClaimDailyMission}
          onSpeakGreeting={(txt) => speakText(txt)}
        />
      )}

      {screen === 'worlds' && (
        <WorldSelectionScreen
          state={state}
          ageGroup={activeAge}
          onSelectWorld={handleSelectWorld}
        />
      )}

      {screen === 'games' && (
        <GameSelectionScreen
          worldId={selectedWorld}
          ageGroup={activeAge}
          state={state}
          onSelectGame={handleSelectGame}
        />
      )}

      {screen === 'gameplay' && (
        <GameplayScreen
          key={`${selectedGame}-${playKey}`}
          gameId={selectedGame}
          ageGroup={activeAge}
          reducedMotion={state.settings.reduced_motion}
          savedDrawings={state.savedDrawings}
          onSaveDrawing={handleSaveDrawing}
          onDeleteDrawing={handleDeleteDrawing}
          onPlaySound={playSound}
          onSpeak={speakText}
          onCompleteGame={handleCompleteGame}
          onBackToGames={() => {
            soundEngine.stopSpeech();
            setScreen('games');
          }}
        />
      )}

      {screen === 'result' && resultSummary && (
        <ResultScreen
          summary={resultSummary}
          activeMascotId={state.progress.active_character}
          reducedMotion={state.settings.reduced_motion}
          onReplay={() => {
            playSound('click');
            setPlayKey((k) => k + 1);
            setScreen('gameplay');
          }}
          onNextChallenge={handleNextChallenge}
          onExploreWorlds={() => {
            playSound('click');
            setScreen('worlds');
          }}
        />
      )}

      {screen === 'collection' && (
        <CollectionScreen
          state={state}
          onUnlockOrSelectMascot={handleUnlockOrSelectMascot}
          onExploreWorlds={() => {
            playSound('click');
            setScreen('worlds');
          }}
        />
      )}

      {screen === 'parent' && (
        <ParentDashboardScreen
          state={state}
          onUpdateSettings={handleUpdateSettings}
          onRequestReset={() => setGateAction('reset')}
          onOpenPrivacy={() => setScreen('privacy')}
        />
      )}

      {screen === 'settings' && (
        <SettingsScreen
          settings={state.settings}
          onUpdateSettings={handleUpdateSettings}
          onRequestReset={() => setGateAction('reset')}
          onOpenPrivacy={() => setScreen('privacy')}
        />
      )}

      {screen === 'privacy' && (
        <PrivacyScreen
          onBackHome={() =>
            setScreen(state.settings.selected_age_group ? 'home' : 'welcome')
          }
        />
      )}

      <ParentalGateModal
        open={gateAction !== null}
        title={gateAction === 'reset' ? 'Confirm Reset Progress' : 'Parent Dashboard Check'}
        description={
          gateAction === 'reset'
            ? 'Solve this math question to confirm resetting all stars, badges, and drawings.'
            : 'Solve this quick adult math question to enter the Parent Dashboard.'
        }
        onSuccess={handleGateSuccess}
        onClose={() => setGateAction(null)}
      />
    </div>
  );
}
