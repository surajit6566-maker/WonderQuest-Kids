import { SoundEffectType } from '../engine/types';

interface MusicStepNote {
  melody?: number;
  harmony?: number;
  bass?: number;
  duration?: number;
}

// Playful 32-step (8-bar) adventure loop in C Major (I - V - vi - IV - I - V - IV - V)
const MUSIC_SCORE: MusicStepNote[] = [
  // Bar 1: C major
  { melody: 523.25, bass: 130.81, duration: 0.28 },
  { melody: 659.25, duration: 0.22 },
  { melody: 783.99, harmony: 329.63, duration: 0.28 },
  { melody: 659.25, bass: 196.0, duration: 0.22 },
  // Bar 2: G major
  { melody: 587.33, bass: 196.0, duration: 0.28 },
  { melody: 659.25, duration: 0.22 },
  { melody: 783.99, harmony: 392.0, duration: 0.34 },
  { bass: 146.83, duration: 0.2 },
  // Bar 3: A minor
  { melody: 880.0, bass: 220.0, duration: 0.28 },
  { melody: 783.99, duration: 0.22 },
  { melody: 659.25, harmony: 329.63, duration: 0.28 },
  { melody: 523.25, bass: 164.81, duration: 0.22 },
  // Bar 4: F major
  { melody: 698.46, bass: 174.61, duration: 0.28 },
  { melody: 659.25, duration: 0.22 },
  { melody: 587.33, harmony: 349.23, duration: 0.34 },
  { bass: 130.81, duration: 0.2 },
  // Bar 5: C major (bright turnaround)
  { melody: 523.25, bass: 130.81, duration: 0.28 },
  { melody: 783.99, duration: 0.22 },
  { melody: 659.25, harmony: 329.63, duration: 0.28 },
  { melody: 523.25, bass: 196.0, duration: 0.22 },
  // Bar 6: G major
  { melody: 587.33, bass: 196.0, duration: 0.28 },
  { melody: 783.99, duration: 0.22 },
  { melody: 880.0, harmony: 392.0, duration: 0.34 },
  { bass: 146.83, duration: 0.2 },
  // Bar 7: F major -> C
  { melody: 698.46, bass: 174.61, duration: 0.28 },
  { melody: 783.99, duration: 0.22 },
  { melody: 659.25, harmony: 329.63, duration: 0.28 },
  { melody: 523.25, bass: 130.81, duration: 0.22 },
  // Bar 8: G major cadence back home
  { melody: 587.33, bass: 196.0, duration: 0.28 },
  { melody: 659.25, duration: 0.22 },
  { melody: 523.25, harmony: 392.0, duration: 0.42 },
  { duration: 0.1 },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicMasterGain: GainNode | null = null;
  private musicFilter: BiquadFilterNode | null = null;
  private musicTimer: number | null = null;
  private musicStep = 0;
  private wantMusic = false;
  private listenersAttached = false;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    this.attachLifecycleListeners();
    return this.ctx;
  }

  private ensureMusicBus(ctx: AudioContext): GainNode {
    if (!this.musicFilter || !this.musicMasterGain) {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1650, ctx.currentTime);
      filter.Q.setValueAtTime(0.7, ctx.currentTime);

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.85, ctx.currentTime);

      filter.connect(master);
      master.connect(ctx.destination);

      this.musicFilter = filter;
      this.musicMasterGain = master;
    }
    return this.musicMasterGain;
  }

  private attachLifecycleListeners() {
    if (this.listenersAttached || typeof window === 'undefined') return;
    this.listenersAttached = true;

    const unlock = () => {
      const ctx = this.ensureContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx
          .resume()
          .then(() => {
            if (this.wantMusic && this.musicTimer === null && !document.hidden) {
              this.beginScheduler();
            }
          })
          .catch(() => {});
      } else if (this.wantMusic && this.musicTimer === null && !document.hidden) {
        this.beginScheduler();
      }
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.clearScheduler();
        } else if (this.wantMusic && this.ctx) {
          if (this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
          }
          this.beginScheduler();
        }
      });
    }
  }

  private resumeOnAction(): AudioContext | null {
    const ctx = this.ensureContext();
    if (!ctx) return null;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  private tone(
    freqStart: number,
    freqEnd: number,
    durationSec: number,
    type: OscillatorType = 'sine',
    volume = 0.14,
    delaySec = 0,
  ) {
    const ctx = this.resumeOnAction();
    if (!ctx) return;

    const now = ctx.currentTime + delaySec;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, now);
    if (freqEnd !== freqStart) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + durationSec);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  }

  private scheduleMusicNote(freq: number, type: OscillatorType, volume: number, durationSec: number) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    this.ensureMusicBus(this.ctx);
    if (!this.musicFilter) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.022);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(this.musicFilter);
    osc.start(now);
    osc.stop(now + durationSec + 0.03);
  }

  private tickMusicStep() {
    if (!this.wantMusic || !this.ctx || this.ctx.state !== 'running') return;
    const step = MUSIC_SCORE[this.musicStep % MUSIC_SCORE.length];
    const dur = step.duration ?? 0.28;

    if (step.melody) {
      // Soft marimba-like blend: warm sine fundamental + gentle triangle overtone
      this.scheduleMusicNote(step.melody, 'sine', 0.042, dur);
      this.scheduleMusicNote(step.melody * 2, 'triangle', 0.009, Math.min(0.14, dur * 0.6));
    }
    if (step.harmony) {
      this.scheduleMusicNote(step.harmony, 'triangle', 0.02, dur * 1.15);
    }
    if (step.bass) {
      this.scheduleMusicNote(step.bass, 'triangle', 0.032, dur * 1.45);
    }
    this.musicStep = (this.musicStep + 1) % MUSIC_SCORE.length;
  }

  private clearScheduler() {
    if (this.musicTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  private beginScheduler() {
    if (typeof window === 'undefined' || this.musicTimer !== null || !this.wantMusic) return;
    if (!this.ctx) return;

    this.ensureMusicBus(this.ctx);
    if (this.musicMasterGain) {
      const now = this.ctx.currentTime;
      this.musicMasterGain.gain.cancelScheduledValues(now);
      this.musicMasterGain.gain.setValueAtTime(Math.max(0.001, this.musicMasterGain.gain.value), now);
      this.musicMasterGain.gain.linearRampToValueAtTime(0.85, now + 0.15);
    }

    if (this.ctx.state === 'running') {
      this.tickMusicStep();
    }
    this.musicTimer = window.setInterval(() => {
      this.tickMusicStep();
    }, 340);
  }

  play(effect: SoundEffectType, enabled: boolean) {
    if (!enabled) return;

    switch (effect) {
      case 'click':
        this.tone(520, 660, 0.06, 'sine', 0.09);
        break;
      case 'correct':
        this.tone(523.25, 523.25, 0.11, 'triangle', 0.14, 0);
        this.tone(659.25, 659.25, 0.11, 'triangle', 0.14, 0.09);
        this.tone(783.99, 783.99, 0.18, 'triangle', 0.16, 0.18);
        break;
      case 'incorrect':
        this.tone(280, 220, 0.18, 'sine', 0.11, 0);
        break;
      case 'star':
        this.tone(880, 1174, 0.12, 'sine', 0.12, 0);
        this.tone(1174, 1568, 0.16, 'sine', 0.11, 0.08);
        break;
      case 'victory':
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          this.tone(freq, freq, 0.2, 'triangle', 0.15, idx * 0.1);
        });
        break;
      case 'cow':
        this.tone(155, 115, 0.55, 'sawtooth', 0.08, 0);
        break;
      case 'lion':
        this.tone(130, 82, 0.48, 'sawtooth', 0.11, 0);
        this.tone(110, 70, 0.35, 'triangle', 0.09, 0.12);
        break;
      case 'frog':
        this.tone(240, 390, 0.09, 'square', 0.07, 0);
        this.tone(260, 420, 0.11, 'square', 0.07, 0.15);
        break;
      case 'duck':
        this.tone(360, 290, 0.11, 'sawtooth', 0.08, 0);
        this.tone(370, 295, 0.12, 'sawtooth', 0.08, 0.16);
        break;
      case 'cat':
        this.tone(580, 820, 0.18, 'sine', 0.12, 0);
        this.tone(820, 520, 0.24, 'sine', 0.1, 0.18);
        break;
      case 'dog':
        this.tone(320, 180, 0.1, 'triangle', 0.13, 0);
        this.tone(340, 190, 0.11, 'triangle', 0.13, 0.15);
        break;
      case 'elephant':
        this.tone(290, 620, 0.22, 'sawtooth', 0.09, 0);
        this.tone(620, 440, 0.26, 'sawtooth', 0.08, 0.2);
        break;
      case 'owl':
        this.tone(420, 400, 0.18, 'sine', 0.12, 0);
        this.tone(410, 370, 0.32, 'sine', 0.12, 0.26);
        break;
      case 'sheep':
        this.tone(330, 310, 0.12, 'triangle', 0.1, 0);
        this.tone(340, 315, 0.12, 'triangle', 0.1, 0.13);
        this.tone(330, 300, 0.14, 'triangle', 0.09, 0.26);
        break;
      case 'bird':
        this.tone(1100, 1650, 0.08, 'sine', 0.1, 0);
        this.tone(1250, 1820, 0.09, 'sine', 0.1, 0.11);
        break;
    }
  }

  startMusic(enabled: boolean) {
    if (!enabled) {
      this.stopMusic();
      return;
    }
    this.wantMusic = true;
    if (typeof window === 'undefined') return;
    this.attachLifecycleListeners();

    if (!this.ctx) {
      // Wait for first pointerdown/keydown gesture to create AudioContext cleanly with zero browser warnings
      return;
    }
    if (this.musicTimer !== null) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx
        .resume()
        .then(() => {
          if (this.wantMusic && this.musicTimer === null) {
            this.beginScheduler();
          }
        })
        .catch(() => {});
    }
    this.beginScheduler();
  }

  stopMusic() {
    this.wantMusic = false;
    this.clearScheduler();
    if (this.ctx && this.musicMasterGain) {
      const now = this.ctx.currentTime;
      this.musicMasterGain.gain.cancelScheduledValues(now);
      this.musicMasterGain.gain.setValueAtTime(this.musicMasterGain.gain.value, now);
      this.musicMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.08);
    }
  }

  speak(text: string, enabled: boolean) {
    if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 1.12;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Safe fallback when speech synthesis is unavailable
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }
}

export const soundEngine = new SoundEngine();
