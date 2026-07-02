import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

export function AmbientAudio() {
  const { camera } = useThree();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const acNoiseRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // We only create the AudioContext after the first user interaction 
    // to comply with browser autoplay policies.
    const handleFirstInteraction = () => {
      if (audioCtxRef.current) return;
      
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;

      // ─── SYNTHESIZE AC RUMBLE ───
      const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate Brownian noise (low frequency rumble)
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Compensate for volume
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Filter to keep only the low frequencies (AC rumble)
      const biquadFilter = ctx.createBiquadFilter();
      biquadFilter.type = "lowpass";
      biquadFilter.frequency.value = 150;

      // Gain (Volume control)
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.4;

      noiseSource.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noiseSource.start(0);
      acNoiseRef.current = noiseSource;

      // ─── SYNTHESIZE CLOCK TICK ───
      const playTick = () => {
        if (!audioCtxRef.current) return;
        const tickOsc = ctx.createOscillator();
        const tickGain = ctx.createGain();
        
        tickOsc.type = 'triangle';
        tickOsc.frequency.setValueAtTime(800, ctx.currentTime);
        tickOsc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.05);
        
        tickGain.gain.setValueAtTime(0, ctx.currentTime);
        tickGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
        tickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        
        tickOsc.connect(tickGain);
        tickGain.connect(ctx.destination);
        
        tickOsc.start(ctx.currentTime);
        tickOsc.stop(ctx.currentTime + 0.06);
      };

      const clockInterval = setInterval(playTick, 1000);

      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);

      return () => {
        clearInterval(clockInterval);
      };
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      if (acNoiseRef.current) acNoiseRef.current.stop();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return null;
}
