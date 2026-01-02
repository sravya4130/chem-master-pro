import { useState, useCallback, useEffect, useRef } from 'react';
import { Tutor } from '@/contexts/AppContext';

interface TutorVoiceConfig {
  rate: number;
  pitch: number;
  voiceName?: string;
}

// Each tutor has a unique voice configuration
const tutorVoiceConfigs: Record<string, TutorVoiceConfig> = {
  'Alex': { rate: 1.0, pitch: 1.0, voiceName: 'Google UK English Male' },      // Neutral, clear voice
  'David': { rate: 0.95, pitch: 0.85, voiceName: 'Google UK English Male' },   // Deeper, slower voice
  'Sravya': { rate: 1.05, pitch: 1.2, voiceName: 'Google UK English Female' }, // Higher pitched, energetic
  'Olivia': { rate: 1.0, pitch: 1.15, voiceName: 'Microsoft Zira' },           // Clear, friendly female
  'Mermi': { rate: 1.1, pitch: 1.3, voiceName: 'Google UK English Female' },   // Upbeat, enthusiastic
  'Ogneson': { rate: 0.9, pitch: 0.75, voiceName: 'Google UK English Male' },  // Very deep, professor-like
};

// Fallback configurations based on available voices
const getFallbackVoice = (voices: SpeechSynthesisVoice[], tutorName: string): SpeechSynthesisVoice | null => {
  const config = tutorVoiceConfigs[tutorName] || { rate: 1.0, pitch: 1.0 };
  
  // Try to find the preferred voice
  if (config.voiceName) {
    const preferred = voices.find(v => v.name.includes(config.voiceName!));
    if (preferred) return preferred;
  }
  
  // Fallback to any English voice based on pitch (higher pitch = female preference)
  const isFemaleVoice = config.pitch > 1.0;
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));
  
  if (isFemaleVoice) {
    return englishVoices.find(v => 
      v.name.includes('Female') || 
      v.name.includes('Samantha') || 
      v.name.includes('Zira') ||
      v.name.includes('Victoria')
    ) || englishVoices[0] || null;
  } else {
    return englishVoices.find(v => 
      v.name.includes('Male') || 
      v.name.includes('Daniel') || 
      v.name.includes('David') ||
      v.name.includes('Alex')
    ) || englishVoices[0] || null;
  }
};

export const useTutorSpeech = (tutor: Tutor | null) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [currentText, setCurrentText] = useState('');
  const [progress, setProgress] = useState(0);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesLoadedRef = useRef(false);
  const textChunksRef = useRef<string[]>([]);
  const currentChunkIndexRef = useRef(0);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    
    // Load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesLoadedRef.current = true;
      }
    };
    
    loadVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Split text into chunks for progress tracking
  const splitTextIntoChunks = (text: string): string[] => {
    // Split by sentences but keep punctuation
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    return sentences.map(s => s.trim()).filter(s => s.length > 0);
  };

  const speak = useCallback((text: string) => {
    if (!isSupported || !tutor) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setCurrentText(text);
    
    // Split into chunks
    textChunksRef.current = splitTextIntoChunks(text);
    currentChunkIndexRef.current = 0;

    const speakChunk = (index: number) => {
      if (index >= textChunksRef.current.length) {
        setIsSpeaking(false);
        setProgress(100);
        return;
      }

      const chunk = textChunksRef.current[index];
      const utterance = new SpeechSynthesisUtterance(chunk);
      utteranceRef.current = utterance;
      
      // Get tutor-specific voice config
      const config = tutorVoiceConfigs[tutor.name] || { rate: 1.0, pitch: 1.0 };
      utterance.rate = config.rate * speedMultiplier;
      utterance.pitch = config.pitch;
      
      // Get appropriate voice
      const voices = window.speechSynthesis.getVoices();
      const voice = getFallbackVoice(voices, tutor.name);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      
      utterance.onend = () => {
        currentChunkIndexRef.current++;
        setProgress((currentChunkIndexRef.current / textChunksRef.current.length) * 100);
        speakChunk(currentChunkIndexRef.current);
      };
      
      utterance.onerror = (event) => {
        if (event.error !== 'interrupted') {
          console.error('Speech error:', event.error);
          setIsSpeaking(false);
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    setProgress(0);
    speakChunk(0);
  }, [isSupported, tutor, speedMultiplier]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported, isPaused]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setProgress(0);
      currentChunkIndexRef.current = 0;
    }
  }, [isSupported]);

  const setSpeed = useCallback((speed: number) => {
    // Clamp speed between 0.5 and 2.0
    const clampedSpeed = Math.max(0.5, Math.min(2.0, speed));
    setSpeedMultiplier(clampedSpeed);
    
    // If currently speaking, restart with new speed
    if (isSpeaking && currentText) {
      stop();
      // Use setTimeout to ensure the cancel takes effect
      setTimeout(() => {
        speak(currentText);
      }, 100);
    }
  }, [isSpeaking, currentText, stop, speak]);

  const increaseSpeed = useCallback(() => {
    setSpeed(speedMultiplier + 0.25);
  }, [speedMultiplier, setSpeed]);

  const decreaseSpeed = useCallback(() => {
    setSpeed(speedMultiplier - 0.25);
  }, [speedMultiplier, setSpeed]);

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    speedMultiplier,
    setSpeed,
    increaseSpeed,
    decreaseSpeed,
    progress,
    currentText,
  };
};
