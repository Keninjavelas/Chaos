import React from 'react';
import { useGameState } from '../useGameState';

export function InteractionPrompt() {
  const activePrompt = useGameState((state) => state.activePrompt);

  if (!activePrompt) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      {/* Central Crosshair dot */}
      <div className="absolute w-1 h-1 bg-white/80 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
      
      {/* Prompt Text floating at bottom center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md animate-in fade-in slide-in-from-bottom-2 duration-200">
        <span className="font-mono text-xs text-white/90 bg-white/10 px-2 py-1 rounded shadow-inner">
          [{activePrompt.key || 'E'}]
        </span>
        <span className="font-mono text-sm tracking-wide text-white shadow-black drop-shadow-md">
          {activePrompt.text}
        </span>
      </div>
    </div>
  );
}
