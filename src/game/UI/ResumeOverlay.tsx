import React from 'react';
import { useGameState, GameMode } from '../useGameState';

export const ResumeOverlay: React.FC = () => {
  const gameMode = useGameState(state => state.gameMode);

  if (gameMode !== GameMode.RESUMING) return null;

  return (
    <div className="absolute inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none select-none">
      <div className="text-white text-xl font-mono tracking-[0.3em] animate-pulse">
        [ CLICK TO RESUME ]
      </div>
    </div>
  );
};
