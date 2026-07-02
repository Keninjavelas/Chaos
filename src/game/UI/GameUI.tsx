import React, { useState, useEffect } from "react";
import { useArchiveStore } from "@/lib/state";

interface GameUIProps {
  onOverlayStateChange: (isActive: boolean) => void;
}

export const GameUI: React.FC<GameUIProps> = ({ onOverlayStateChange }) => {
  const [isActive, setIsActive] = useState(false);
  const { journalNotes, inventory, mapDiscovered, mapAnomalyRevealed, memoryFragments, isAwakened } = useArchiveStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      
      if (key === "tab" || key === "m") {
        e.preventDefault();
        setIsActive(prev => {
          if (!prev) document.exitPointerLock?.();
          return !prev;
        });
      } else if (key === "escape" && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    onOverlayStateChange(isActive);
  }, [isActive, onOverlayStateChange]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end pointer-events-auto select-none">
      
      {/* The Dashboard overlays the bottom 65% of the screen */}
      <div className="h-[65%] w-full bg-[#0a0a0a] border-t border-[#333] flex flex-col font-mono text-[#c8c0b0] p-4 gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        
        {/* Top Row */}
        <div className="flex-1 flex gap-4 min-h-0">
          
          {/* MAP */}
          <div className="flex-[1.5] border border-[#222] p-4 flex flex-col bg-[#050505]">
            <h3 className="text-xs tracking-widest text-[#555] mb-4 flex justify-between">
              <span>MAP</span> <span>Facility</span>
            </h3>
            <div className="flex-1 border border-[#1a1a1a] flex items-center justify-center relative bg-[#020202] text-xs">
              {!mapDiscovered ? (
                <span className="text-[#333] tracking-[0.2em]">[ NO MAP DATA ]</span>
              ) : (
                <div className="absolute inset-4 sm:inset-8 border-2 border-white/20 p-4">
                  
                  {/* Reception (Top Center Hub) */}
                  <div className="absolute top-[10%] left-[50%] -translate-x-[50%] w-32 h-20 border-2 border-white/60 bg-white/10 flex flex-col items-center justify-center">
                    <span className="text-[10px] tracking-widest text-white/80">RECEPTION</span>
                  </div>

                  {/* LEFT PATH: Main Corridor */}
                  <div className="absolute top-[30%] left-[30%] w-10 h-4 border-y-2 border-white/40" />
                  <div className="absolute top-[30%] left-[30%] w-4 h-48 border-x-2 border-white/40" />

                  {/* RIGHT PATH 1: Personnel Wing */}
                  <div className="absolute top-[30%] left-[65%] w-8 h-4 border-y-2 border-white/40" />
                  <div className="absolute top-[25%] left-[75%] w-20 h-20 border-2 border-white/60 bg-white/5 flex flex-col items-center justify-center">
                    <span className="text-[10px] tracking-widest text-white/80 text-center">PERSONNEL<br/>WING</span>
                  </div>

                  {/* RIGHT PATH 2: Records Hall */}
                  <div className="absolute top-[30%] left-[70%] w-4 h-24 border-x-2 border-white/40" />
                  <div className="absolute top-[54%] left-[65%] w-24 h-24 border-2 border-white/60 bg-white/5 flex flex-col items-center justify-center">
                    <span className="text-[10px] tracking-widest text-white/80 text-center">RECORDS<br/>HALL</span>
                  </div>

                  {/* Communications (Off Left Corridor) */}
                  <div className="absolute top-[55%] left-[34%] w-8 h-4 border-y-2 border-white/40" />
                  <div className="absolute top-[50%] left-[42%] w-20 h-16 border-2 border-white/60 bg-white/5 flex items-center justify-center">
                    <span className="text-[10px] tracking-widest text-white/80 text-center">COMMS</span>
                  </div>

                  {/* Elevator (Bottom of Left Corridor) */}
                  <div className="absolute top-[80%] left-[28%] w-12 h-12 border-2 border-white/60 flex items-center justify-center bg-black">
                    <span className={`text-[6px] ${isAwakened ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
                      {isAwakened ? "AWAKE" : "ELEVATOR"}
                    </span>
                  </div>

                  {mapAnomalyRevealed && (
                    <div className="absolute bottom-[20%] right-[10%] w-[100px] h-[60px] border-2 border-red-900 bg-red-950/20 shadow-[0_0_15px_rgba(200,0,0,0.3)] flex items-center justify-center rotate-6 z-10 animate-pulse">
                      <span className="text-red-600 font-bold tracking-widest text-xs drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">[ ??? ]</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RECENTLY FOUND */}
          <div className="flex-1 border border-[#222] p-4 flex flex-col bg-[#050505]">
            <h3 className="text-xs tracking-widest text-[#555] mb-4">RECENTLY FOUND</h3>
            <div className="flex-1 bg-[#1a1a1a] p-4 shadow-inner relative flex flex-col justify-center items-center text-center">
              {inventory.length > 0 ? (
                <>
                  <div className="absolute inset-0 opacity-20 bg-[url('/paper-texture.png')] bg-cover mix-blend-overlay"></div>
                  <p className="text-[#111] bg-[#d0c8b8] p-6 text-sm font-serif italic shadow-md rotate-[-2deg] relative z-10 w-[80%]">
                    "They don't remember me. But I remember everything."
                    <span className="block text-right mt-4 font-bold">A.</span>
                  </p>
                </>
              ) : (
                <span className="text-[#333]">[ EMPTY ]</span>
              )}
            </div>
          </div>

          {/* COLLECTION */}
          <div className="flex-[1.2] border border-[#222] p-4 flex flex-col bg-[#050505]">
            <h3 className="text-xs tracking-widest text-[#555] mb-4">COLLECTION</h3>
            <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="border border-[#1a1a1a] bg-[#020202] flex items-center justify-center relative group">
                  {i < inventory.length ? (
                    <div className="text-xs text-white opacity-50">{inventory[i]}</div>
                  ) : (
                    <div className="text-[#222] text-xs"></div>
                  )}
                  {/* Fake item icon silhouettes */}
                  {i === 0 && inventory.length > 0 && <div className="absolute w-8 h-8 opacity-20 bg-[url('/icon-tape.png')] bg-contain bg-no-repeat bg-center"></div>}
                  {i === 1 && inventory.length > 1 && <div className="absolute w-8 h-8 opacity-20 bg-[url('/icon-key.png')] bg-contain bg-no-repeat bg-center"></div>}
                </div>
              ))}
            </div>
            <div className="text-right text-[10px] text-[#555] mt-2 uppercase cursor-pointer hover:text-white transition-colors">View All [Tab]</div>
          </div>

          {/* NOTES */}
          <div className="flex-[1.2] border border-[#222] p-4 flex flex-col bg-[#050505]">
            <h3 className="text-xs tracking-widest text-[#555] mb-4">NOTES</h3>
            <div className="flex-1 bg-[#dcd4c4] p-6 shadow-inner relative flex gap-4 overflow-hidden rounded-r-md">
               {/* Binder rings */}
               <div className="w-4 h-full border-r-2 border-black/10 flex flex-col justify-around py-4 opacity-50">
                  {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-[#111] shadow-inner"></div>)}
               </div>
               <div className="flex-1 font-serif text-[#2a2a2a] text-sm leading-relaxed overflow-y-auto">
                 {journalNotes.length > 0 ? (
                   journalNotes.map((note, i) => <p key={i} className="mb-4">{note}</p>)
                 ) : (
                   <div className="opacity-50">
                     <p className="font-bold underline mb-2">Day 1</p>
                     <p>I arrived at the facility today.</p>
                     <p>It feels... empty. I should look around.</p>
                   </div>
                 )}
               </div>
            </div>
          </div>

          {/* INVENTORY / STATUS */}
          <div className="flex-1 border border-[#222] p-4 flex flex-col bg-[#050505]">
            <h3 className="text-xs tracking-widest text-[#555] mb-4 flex justify-between">
              <span>INVENTORY</span> <span>{inventory.length} ITEMS</span>
            </h3>
            
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
              {inventory.length === 0 ? (
                <div className="text-[#333] text-xs h-full flex items-center justify-center tracking-widest">
                  [ EMPTY ]
                </div>
              ) : (
                inventory.map((item, idx) => (
                  <div key={idx} className="border border-[#1a1a1a] p-2 flex items-center gap-3 bg-[#020202]">
                    <div className="w-8 h-8 bg-[#111] border border-[#222] flex items-center justify-center">
                      <span className="text-[10px] text-[#444]">{idx + 1}</span>
                    </div>
                    <span className="text-xs text-[#a09a8a] uppercase tracking-wider">{item.replace('_', ' ')}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#1a1a1a] text-[10px] text-[#444] uppercase tracking-widest flex justify-between">
              <span>Memory Fragments</span>
              <span className="text-yellow-600/50">{memoryFragments}</span>
            </div>
          </div>

        </div>

        {/* KNOWN AREAS (Bottom Strip) */}
        <div className="h-24 border border-[#222] bg-[#050505] p-3 flex flex-col">
          <h3 className="text-[10px] tracking-widest text-[#555] mb-2 uppercase">KNOWN AREAS</h3>
          <div className="flex-1 flex gap-2 overflow-x-hidden">
            {['RECEPTION WING', 'RECORDS HALL', 'PERSONNEL WING', 'RESEARCH SECTOR', 'OBSERVATION DECK'].map((area, i) => (
              <div key={i} className="flex-1 border border-[#1a1a1a] bg-[#020202] relative group cursor-pointer overflow-hidden flex items-end p-2 opacity-50 hover:opacity-100 transition-opacity">
                 {/* Fake thumbnails */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                 <span className="text-[10px] text-[#888] relative z-20 group-hover:text-white transition-colors">{area}</span>
              </div>
            ))}
            <div className="flex-1 border border-[#1a1a1a] bg-[#020202] flex items-center justify-center opacity-30">
               <span className="text-[#333] tracking-widest">???</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
