import React, { useState, useEffect } from "react";
import { useGameState } from "../useGameState";
import { playInteractionFeedback } from "../Interactables/interactionFeedback";

export function KeypadSafeUI() {
  const activeKeypad = useGameState((state) => state.activeKeypad);
  const clearInteraction = useGameState((state) => state.clearInteraction);
  const unlockSafe = useGameState((state) => state.unlockSafe);
  const setInteractionMessage = useGameState((state) => state.setInteractionMessage);

  const [inputCode, setInputCode] = useState("");
  const [statusText, setStatusText] = useState("ENTER 4-DIGIT PIN");
  const [statusColor, setStatusColor] = useState("text-[#aaccff]");

  useEffect(() => {
    if (!activeKeypad) return;
    document.exitPointerLock?.();
    setInputCode("");
    setStatusText("ENTER 4-DIGIT PIN");
    setStatusColor("text-[#aaccff]");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === 'escape') {
        playInteractionFeedback("close");
        clearInteraction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeKeypad, clearInteraction]);

  if (!activeKeypad) return null;

  const handleKeyPress = (digit: string) => {
    if (inputCode.length < 4) {
      const newCode = inputCode + digit;
      setInputCode(newCode);
    }
  };

  const handleClear = () => {
    setInputCode("");
    setStatusText("ENTER 4-DIGIT PIN");
    setStatusColor("text-[#aaccff]");
  };

  const handleSubmit = () => {
    if (inputCode === "0845") {
      setStatusText("ACCESS GRANTED");
      setStatusColor("text-green-400 animate-pulse");
      unlockSafe(activeKeypad);
      playInteractionFeedback("open");
      setInteractionMessage("[ SAFE UNLOCKED ] Heavy steel bolt disengaged.");
      setTimeout(() => {
        clearInteraction();
      }, 1000);
    } else {
      playInteractionFeedback("unavailable");
      setStatusText("ACCESS DENIED");
      setStatusColor("text-red-500 animate-pulse");
      setTimeout(() => {
        setInputCode("");
        setStatusText("INVALID PIN - RETRY");
        setStatusColor("text-[#aaccff]");
      }, 1200);
    }
  };

  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-mono select-none pointer-events-auto cursor-default">
      {/* Heavy Steel Keypad Frame */}
      <div className="relative w-full max-w-sm bg-[#161a1e] border-4 border-[#2d353c] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col p-6 items-center space-y-5">
        
        {/* Keypad Title */}
        <div className="w-full text-center border-b border-[#2d353c] pb-3">
          <div className="text-xs text-[#556677] tracking-widest uppercase">AUXILIUM SECURITY LOCK</div>
          <div className="text-sm font-bold text-[#aaccff] tracking-wider uppercase">{activeKeypad.replace('_', ' ')}</div>
        </div>

        {/* Digital LED Display */}
        <div className="w-full bg-[#0a0d10] border-2 border-[#1f2830] rounded p-3 flex flex-col items-center justify-center space-y-1 shadow-inner">
          <div className={`text-xs tracking-widest ${statusColor}`}>{statusText}</div>
          <div className="text-3xl font-bold tracking-[0.4em] text-[#aaccff] h-10 flex items-center">
            {inputCode.padEnd(4, "•")}
          </div>
        </div>

        {/* Keypad Buttons Grid */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-12 bg-[#222830] hover:bg-[#333d48] active:bg-[#aaccff] active:text-black text-white text-lg font-bold rounded border border-[#333d48] shadow transition-colors cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="h-12 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs font-bold rounded border border-red-900/50 cursor-pointer"
          >
            CLR
          </button>
          <button
            onClick={() => handleKeyPress("0")}
            className="h-12 bg-[#222830] hover:bg-[#333d48] active:bg-[#aaccff] active:text-black text-white text-lg font-bold rounded border border-[#333d48] shadow transition-colors cursor-pointer"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            className="h-12 bg-green-950/40 hover:bg-green-900/60 text-green-400 text-xs font-bold rounded border border-green-900/50 cursor-pointer"
          >
            ENT
          </button>
        </div>

        {/* Footer Dismissal Hint */}
        <div className="w-full pt-3 border-t border-[#2d353c] text-center text-xs text-[#556677]">
          PRESS <span className="text-[#aaccff] font-bold">[ ESC ]</span> TO CANCEL
        </div>
      </div>
    </div>
  );
}
