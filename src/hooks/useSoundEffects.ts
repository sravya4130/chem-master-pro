import { useCallback, useRef, useEffect } from 'react';

type SoundType = 'click' | 'success' | 'error' | 'levelUp' | 'xp' | 'streak' | 'whoosh' | 'pop';

const SOUND_FREQUENCIES: Record<SoundType, { frequencies: number[]; duration: number; type: OscillatorType }> = {
  click: { frequencies: [800, 600], duration: 0.05, type: 'sine' },
  success: { frequencies: [523, 659, 784], duration: 0.15, type: 'sine' },
  error: { frequencies: [200, 150], duration: 0.2, type: 'square' },
  levelUp: { frequencies: [392, 494, 587, 784], duration: 0.3, type: 'sine' },
  xp: { frequencies: [880, 1047], duration: 0.1, type: 'sine' },
  streak: { frequencies: [659, 784, 988], duration: 0.2, type: 'triangle' },
  whoosh: { frequencies: [400, 200, 100], duration: 0.15, type: 'sawtooth' },
  pop: { frequencies: [1000, 500], duration: 0.08, type: 'sine' },
};

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isEnabledRef = useRef(true);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType, volume: number = 0.3) => {
    if (!isEnabledRef.current) return;

    try {
      const ctx = getAudioContext();
      const { frequencies, duration, type: oscType } = SOUND_FREQUENCIES[type];
      
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      frequencies.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        oscillator.type = oscType;
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + (index * duration / frequencies.length));
        oscillator.connect(gainNode);
        oscillator.start(ctx.currentTime + (index * duration / frequencies.length));
        oscillator.stop(ctx.currentTime + duration);
      });
    } catch (error) {
      console.warn('Sound effect failed:', error);
    }
  }, [getAudioContext]);

  const playClick = useCallback(() => playSound('click'), [playSound]);
  const playSuccess = useCallback(() => playSound('success', 0.4), [playSound]);
  const playError = useCallback(() => playSound('error', 0.2), [playSound]);
  const playLevelUp = useCallback(() => playSound('levelUp', 0.5), [playSound]);
  const playXP = useCallback(() => playSound('xp', 0.25), [playSound]);
  const playStreak = useCallback(() => playSound('streak', 0.35), [playSound]);
  const playWhoosh = useCallback(() => playSound('whoosh', 0.2), [playSound]);
  const playPop = useCallback(() => playSound('pop', 0.3), [playSound]);

  const setEnabled = useCallback((enabled: boolean) => {
    isEnabledRef.current = enabled;
  }, []);

  return {
    playClick,
    playSuccess,
    playError,
    playLevelUp,
    playXP,
    playStreak,
    playWhoosh,
    playPop,
    setEnabled,
    isEnabled: isEnabledRef.current
  };
};
