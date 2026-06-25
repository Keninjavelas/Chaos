import React, { useEffect, useState } from "react";
import { useArchiveStore } from "@/lib/state";

export const InspectionUI: React.FC = () => {
  const { activeDocument, setActiveDocument, isAwakened } = useArchiveStore();
  const [isVisible, setIsVisible] = useState(false);
  const [glitchPhase, setGlitchPhase] = useState(0);

  useEffect(() => {
    if (activeDocument) {
      setIsVisible(true);
      document.exitPointerLock?.();
      
      if (isAwakened && activeDocument.type === 'terminal') {
        setGlitchPhase(1);
        setTimeout(() => setGlitchPhase(2), 200);
        setTimeout(() => setGlitchPhase(1), 500);
        setTimeout(() => setGlitchPhase(3), 800);
        setTimeout(() => setGlitchPhase(0), 1200);
      } else {
        setGlitchPhase(0);
      }
    } else {
      setIsVisible(false);
    }
  }, [activeDocument, isAwakened]);

  if (!activeDocument || !isVisible) return null;

  // Determine what content to show based on glitch phase
  let displayContent = activeDocument.content;
  if (glitchPhase === 1) displayContent = "> ERR_MEM_CORRUPTION\n> 0x000F839A\n...";
  if (glitchPhase === 2) displayContent = activeDocument.content.replace(/[a-z]/g, '█');
  if (glitchPhase === 3) displayContent = "\n\nYOU HAVE BEEN HERE BEFORE\n\n".repeat(5);

  // Parse links
  const renderContent = (content: string) => {
    const linkRegex = /\[LINK: (.*?)\] \[(.*?)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex, match.index)}</span>);
      }
      
      parts.push(
        <a 
          key={`link-${match.index}`} 
          href={match[1]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center mt-4 mb-2 px-6 py-3 bg-[#1a1a1a] text-[#44ff44] font-mono text-sm font-bold tracking-widest hover:bg-[#44ff44] hover:text-black border border-[#44ff44] transition-colors uppercase cursor-pointer pointer-events-auto"
          style={{ textDecoration: 'none' }}
        >
          {match[2]}
        </a>
      );
      
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto select-none p-8">
      
      <div className="max-w-2xl w-full max-h-full flex flex-col items-center">
        
        {/* Document Container */}
        <div className="w-full bg-[#f4ebd8] text-[#1a1a1a] shadow-2xl relative overflow-hidden flex flex-col p-8 sm:p-12" style={{ minHeight: '60vh' }}>
          
          {/* Grime / Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('/noise.png')]"></div>
          
          {/* Header */}
          <div className="border-b-2 border-[#1a1a1a] pb-4 mb-8 flex justify-between items-end relative z-10">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#555] mb-1">{activeDocument.type.replace('_', ' ')}</p>
              <h2 className="text-3xl font-serif font-bold tracking-tight">{glitchPhase > 0 ? "ERROR" : activeDocument.title}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-[#555]">ID: {glitchPhase > 0 ? "CORRUPTED" : activeDocument.id}</p>
            </div>
          </div>

          {/* Content */}
          <div className={`prose prose-sm sm:prose-base max-w-none prose-neutral font-serif leading-relaxed relative z-10 overflow-y-auto custom-scrollbar flex-1 whitespace-pre-wrap ${glitchPhase > 0 ? 'text-red-600 font-mono font-bold text-xl' : ''}`}>
            {renderContent(displayContent)}
          </div>

        </div>

        {/* Close Button */}
        <button 
          onClick={() => setActiveDocument(null)}
          className="mt-8 px-6 py-2 border border-[#444] text-[#c8c0b0] font-mono text-sm tracking-widest hover:bg-[#c8c0b0] hover:text-black transition-colors"
        >
          [ CLOSE ]
        </button>

      </div>
    </div>
  );
};
