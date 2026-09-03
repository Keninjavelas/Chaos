import React, { useEffect } from 'react';
import { useGameState, GameMode } from '../useGameState';

export function InteractionPrompt() {
  const gameMode = useGameState((state) => state.gameMode);
  const activePrompt = useGameState((state) => state.activePrompt);
  const activeInteraction = useGameState((state) => state.activeInteraction);
  const interactionMessage = useGameState((state) => state.interactionMessage);
  const setInteractionMessage = useGameState((state) => state.setInteractionMessage);

  useEffect(() => {
    if (!interactionMessage) return;
    const timeout = window.setTimeout(() => setInteractionMessage(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [interactionMessage, setInteractionMessage]);

  if (gameMode !== GameMode.PLAYING) return null;

  const message = interactionMessage ?? activePrompt?.text ?? null;
  const action = activeInteraction
    ? `${activeInteraction.kind.charAt(0)}${activeInteraction.kind.slice(1).toLowerCase()}`
    : "";

  const displayLabel = activeInteraction
    ? activeInteraction.label.toLowerCase().startsWith(action.toLowerCase())
      ? activeInteraction.label
      : `${action} ${activeInteraction.label}`
    : "";

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 select-none">
      {/* Reticle / Crosshair */}
      <div 
        className={`absolute rounded-full transition-all duration-150 ${
          activeInteraction 
            ? 'h-2 w-2 border border-[#d5eadf] bg-[#d5eadf]/70 shadow-[0_0_8px_rgba(213,234,223,0.8)] scale-125' 
            : 'h-1.5 w-1.5 border border-white/60 bg-white/40 shadow-[0_0_4px_rgba(255,255,255,0.5)]'
        }`} 
      />

      {/* Primary Interaction Prompt */}
      {activeInteraction && (
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded border border-[#d5eadf]/30 bg-black/80 px-3.5 py-2 font-mono text-xs tracking-wider text-[#edf5f0] shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="border border-[#d5eadf]/50 bg-[#d5eadf]/15 px-1.5 py-0.5 font-bold text-[#d5eadf] rounded-sm">[ E ]</span>
          <span>{displayLabel}</span>
        </div>
      )}

      {/* Transient Narrative Message / Environmental Inspect Observation */}
      {!activeInteraction && message && (
        <div className="absolute bottom-12 left-1/2 max-w-lg -translate-x-1/2 rounded border border-white/20 bg-black/85 px-4 py-2.5 font-mono text-xs tracking-wide text-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150 text-center">
          {message}
        </div>
      )}
    </div>
  );
}
