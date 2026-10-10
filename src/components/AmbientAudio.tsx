import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
}

export const AmbientAudio: React.FC<Props> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const toggleAmbiance = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimeout(() => {
        setIsPlaying(false);
      }, 500);
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  };

  const startAmbientSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft Warm Chord (F Major 9 - Sophisticated jazz lounge warmth)
      const frequencies = [87.31, 130.81, 174.61, 220.00, 261.63, 329.63]; // F2, C3, F3, A3, C4, E4

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle drift
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1 + idx * 0.05;
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.value = 0.12 / frequencies.length;

        if (panner) {
          panner.pan.value = (idx / frequencies.length) * 1.6 - 0.8;
          osc.connect(oscGain);
          oscGain.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(oscGain);
          oscGain.connect(masterGain);
        }

        osc.start();
      });

      // Subtle warm crackle simulation
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 1.5;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.04;

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

    } catch (e) {
      console.warn("Audio Context setup not supported or user gesture needed:", e);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const d = DICTIONARY[language] || DICTIONARY.ky || DICTIONARY.en;

  return (
    <button
      id="ambient-audio-toggle"
      onClick={toggleAmbiance}
      title={isPlaying ? d?.audioPlaying || 'Lounge Audio' : d?.audioMuted || 'Ambiance'}
      className={`fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl ${
        isPlaying 
          ? 'bg-[#151518]/90 border-[#c5a059] text-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.25)]' 
          : 'bg-[#111113]/80 border-white/10 text-white/50 hover:text-white hover:border-[#c5a059]/50'
      }`}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-[#c5a059] animate-pulse rounded-full"></span>
            <span className="w-1 h-4 bg-[#c5a059] animate-pulse delay-75 rounded-full"></span>
            <span className="w-1 h-2 bg-[#c5a059] animate-pulse delay-150 rounded-full"></span>
          </div>
          <Volume2 className="w-4 h-4 text-[#c5a059]" />
          <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline text-[#dfba6f]">
            Lounge Audio
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline">
            Ambiance
          </span>
          <Sparkles className="w-3 h-3 text-[#c5a059]" />
        </>
      )}
    </button>
  );
};
