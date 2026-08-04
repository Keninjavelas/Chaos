import React, { useState, useEffect } from "react";
import { useGameState } from "../useGameState";

export function ReceptionTerminalUI() {
  const activeTerminal = useGameState((state) => state.activeTerminal);
  const setActiveTerminal = useGameState((state) => state.setActiveTerminal);
  const [activeTab, setActiveTab] = useState<"PROJECTS" | "OPEN_SOURCE" | "RESEARCH" | "CCTV">("PROJECTS");

  useEffect(() => {
    if (!activeTerminal) return;
    document.exitPointerLock?.();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === 'e' || key === 'escape') {
        setActiveTerminal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTerminal, setActiveTerminal]);

  if (!activeTerminal) return null;

  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-mono text-[#00ff00] select-none pointer-events-auto cursor-default">
      {/* CRT Monitor Frame */}
      <div className="relative w-full max-w-4xl h-[80vh] bg-[#081408] border-4 border-[#1a3a1a] rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.2)] flex flex-col overflow-hidden p-6">
        
        {/* CRT Scanline overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20" />

        {/* Top Header */}
        <div className="flex justify-between items-center border-b-2 border-[#00ff00]/40 pb-3 mb-4">
          <div>
            <div className="text-xs text-[#00ff00]/60">AUXILIUM DIGITAL ARCHIVE OS v4.12</div>
            <div className="text-lg font-bold tracking-widest text-[#00ff00]">DEVELOPER PORTFOLIO TERMINAL // NODE-01</div>
          </div>
          <button
            onClick={() => setActiveTerminal(null)}
            className="px-3 py-1 bg-[#00ff00]/10 border border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors text-sm tracking-wider cursor-pointer font-bold"
          >
            [ E ] LEAVE TERMINAL
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#00ff00]/20 pb-2">
          {(["PROJECTS", "OPEN_SOURCE", "RESEARCH", "CCTV"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs tracking-widest transition-all border cursor-pointer ${
                activeTab === tab
                  ? "bg-[#00ff00] text-black font-bold border-[#00ff00]"
                  : "bg-black/40 text-[#00ff00]/70 border-[#00ff00]/30 hover:border-[#00ff00]"
              }`}
            >
              {tab === "PROJECTS" && "[1] GIT COMMITS"}
              {tab === "OPEN_SOURCE" && "[2] NOTIFICATIONS"}
              {tab === "RESEARCH" && "[3] PEER REVIEWS"}
              {tab === "CCTV" && "[4] SYSTEM FEED"}
            </button>
          ))}
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-black/50 border border-[#00ff00]/20 rounded text-sm leading-relaxed space-y-4 font-mono">
          {activeTab === "PROJECTS" && (
            <div className="space-y-3">
              <div className="text-xs text-[#00ff00]/70 tracking-widest">$ git log --oneline -n 6</div>
              <div className="text-xs text-[#00ff00] font-mono space-y-1">
                <div><span className="text-yellow-400">3e4ac9d</span> feat: 2D DOM document inspection overlay</div>
                <div><span className="text-yellow-400">f992ac1</span> fix: collider clipping & physics bounds</div>
                <div><span className="text-yellow-400">d45fa20</span> perf: reduce draw calls with instanced debris</div>
                <div><span className="text-yellow-400">89bc332</span> refactor: interaction system & state management</div>
                <div><span className="text-yellow-400">c1192fa</span> docs: update local-first architecture specs</div>
                <div><span className="text-yellow-400">a4401fe</span> init: repository setup</div>
              </div>
            </div>
          )}

          {activeTab === "OPEN_SOURCE" && (
            <div className="space-y-3">
              <div className="text-xs text-[#00ff00]/70 tracking-widest">[ GITHUB NOTIFICATION FEED ]</div>
              <div className="p-3 border border-[#00ff00]/30 bg-[#00ff00]/5 space-y-1">
                <div className="font-bold text-[#00ff00]">notifications (1)</div>
                <div className="text-xs text-[#00ff00]/90">✓ Your pull request #142 has been merged into main branch.</div>
                <div className="text-xs text-[#00ff00]/60 italic">Reviewer: "Clean architecture, performance looks solid. Zero regression."</div>
              </div>
              <div className="p-3 border border-[#00ff00]/30 bg-[#00ff00]/5 space-y-1">
                <div className="font-bold text-[#00ff00]">Latitude Investigation Audit</div>
                <div className="text-xs text-[#00ff00]/80">STATUS: VERIFIED & COMPLETED</div>
              </div>
            </div>
          )}

          {activeTab === "RESEARCH" && (
            <div className="space-y-3">
              <div className="text-xs text-[#00ff00]/70 tracking-widest">[ PEER REVIEW SUMMARY // PAPER ID: ICETM-2026 ]</div>
              <div className="p-3 border border-[#00ff00]/30 bg-[#00ff00]/5 space-y-2">
                <div className="font-bold text-[#00ff00]">Reviewer #2 Feedback:</div>
                <div className="text-xs text-[#00ff00]/90 italic">
                  "The proposed local-first agent architecture is promising. Please clarify the evaluation methodology before July."
                </div>
                <div className="text-xs text-[#00ff00] font-bold border-t border-[#00ff00]/20 pt-1">
                  STATUS: Revisions complete. Accepted after revision.
                </div>
              </div>
            </div>
          )}

          {activeTab === "CCTV" && (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-56 h-32 border-2 border-[#00ff00]/60 bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00] animate-pulse text-xs tracking-widest font-bold">
                [ SYSTEM ONLINE ]
              </div>
              <div className="text-xs text-[#00ff00]">ARCHIVE FEED CAM-01 (RECEPTION): ONLINE</div>
              <div className="text-xs text-[#00ff00]/60">Exploring Digital Archive & Engineering Vault...</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-2 border-t border-[#00ff00]/20 flex justify-between items-center text-xs text-[#00ff00]/60">
          <div>PRESS [ E ] TO LEAVE TERMINAL</div>
          <div>STATUS: ONLINE</div>
        </div>
      </div>
    </div>
  );
}
