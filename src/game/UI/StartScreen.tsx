import React from "react";

interface StartScreenProps {
  onEnter: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 bg-black flex text-[#c8c0b0] font-mono select-none">
      {/* Left Sidebar */}
      <div className="w-[400px] h-full bg-[#050505] border-r border-[#1a1a1a] p-12 flex flex-col justify-center relative z-10">
        <button 
          onClick={onEnter}
          className="text-left text-3xl font-bold tracking-widest text-[#e8e0d0] hover:text-white mb-6 transition-colors"
        >
          ENTER.
        </button>

        <p className="text-[#8a8570] text-sm leading-relaxed mb-16 max-w-[250px]">
          You are not just visiting a portfolio. You are wandering through what's left of a memory.
        </p>

        <h3 className="text-xs uppercase tracking-[0.2em] text-[#555] mb-6">Features</h3>

        <div className="space-y-8">
          <div>
            <h4 className="text-[#a8a090] text-sm font-bold uppercase mb-1 flex items-center gap-2">
              <span className="text-lg">🚶</span> Explore Freely
            </h4>
            <p className="text-[#6a6560] text-xs leading-relaxed">Wander through a decaying facility. Nothing is handed to you.</p>
          </div>

          <div>
            <h4 className="text-[#a8a090] text-sm font-bold uppercase mb-1 flex items-center gap-2">
              <span className="text-lg">🖐️</span> Pick up & Collect
            </h4>
            <p className="text-[#6a6560] text-xs leading-relaxed">Find maps, notes, documents, photographs and other fragments of the past.</p>
          </div>

          <div>
            <h4 className="text-[#a8a090] text-sm font-bold uppercase mb-1 flex items-center gap-2">
              <span className="text-lg">📄</span> Uncover the Story
            </h4>
            <p className="text-[#6a6560] text-xs leading-relaxed">Piece together the truth hidden behind the walls.</p>
          </div>

          <div>
            <h4 className="text-[#a8a090] text-sm font-bold uppercase mb-1 flex items-center gap-2">
              <span className="text-lg">⚡</span> Dynamic Environment
            </h4>
            <p className="text-[#6a6560] text-xs leading-relaxed">The facility changes. It reacts. It decays.</p>
          </div>

          <div>
            <h4 className="text-[#a8a090] text-sm font-bold uppercase mb-1 flex items-center gap-2">
              <span className="text-lg">❓</span> Multiple Endings?
            </h4>
            <p className="text-[#6a6560] text-xs leading-relaxed">Some doors are not meant to be opened.</p>
          </div>
        </div>
      </div>

      {/* Right side placeholder background (In actual use, the 3D game might be loading behind this) */}
      <div className="flex-1 bg-[#020202] relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 bg-[url('/hub/base-room.png')] bg-cover bg-center opacity-30 grayscale blur-sm"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent"></div>
         <p className="text-[#333] tracking-[0.5em] text-sm uppercase">Loading Facility Data...</p>
      </div>
    </div>
  );
};
