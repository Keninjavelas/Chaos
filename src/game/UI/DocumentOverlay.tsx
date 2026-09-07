import React, { useEffect } from "react";
import { useGameState } from "../useGameState";
import { playInteractionFeedback } from "../Interactables/interactionFeedback";
import { PersonnelRecordOverlay } from "./PersonnelRecordOverlay";

export function DocumentOverlay() {
  const activeDocument = useGameState((state) => state.activeDocument);
  const clearInteraction = useGameState((state) => state.clearInteraction);

  useEffect(() => {
    if (!activeDocument) return;

    // Exit pointer lock for reading
    document.exitPointerLock?.();

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
  }, [activeDocument, clearInteraction]);

  if (!activeDocument) return null;

  // Personnel / Identity Archive overlays (S2 personnel file, S3 recruiter
  // dossier) render their own dedicated presentation.
  if (
    activeDocument.type === 'personnel-file' ||
    activeDocument.type === 'personnel-dossier'
  ) {
    return <PersonnelRecordOverlay document={activeDocument} />;
  }

  const isNote = activeDocument.type === 'note';

  return (
    <div 
      className="fixed inset-0 z-[160] flex flex-col items-center justify-between bg-black/85 p-6 md:p-12 font-mono select-none pointer-events-auto cursor-default"
      onClick={() => {
        playInteractionFeedback("close");
        clearInteraction();
      }}
    >
      {/* Top Header Mode Label */}
      <div 
        className="w-full max-w-2xl flex justify-between items-center text-xs text-[#eddcb9]/60 tracking-widest uppercase"
        onClick={(e) => e.stopPropagation()}
      >
        <div>[ INSPECTION MODE // {activeDocument.type.toUpperCase()} ]</div>
        <button
          onClick={() => {
            playInteractionFeedback("close");
            clearInteraction();
          }}
          className="px-3 py-1 bg-[#eddcb9]/10 border border-[#eddcb9]/30 hover:bg-[#eddcb9] hover:text-black transition-colors text-xs font-bold tracking-wider rounded cursor-pointer"
        >
          [ ESC ] PUT AWAY
        </button>
      </div>

      {/* 2D High-Resolution Document Paper Container (Centered, Vector-Sharp HTML) */}
      <div 
        className="w-full max-w-xl max-h-[70vh] flex flex-col my-auto shadow-2xl rounded-lg overflow-hidden border-2 border-[#d6be92]/40 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className={`w-full h-full p-8 md:p-10 flex flex-col overflow-y-auto ${
            isNote
              ? 'bg-[#eddcb9] text-[#24160a] font-serif shadow-inner'
              : 'bg-[#f5f2eb] text-[#1c1b18] font-mono'
          }`}
          style={{
            backgroundColor: isNote ? '#eddcb9' : '#f5f2eb',
            color: isNote ? '#24160a' : '#1c1b18',
          }}
        >
          {/* Header Title */}
          <div className="border-b-2 border-current/20 pb-3 mb-4 flex justify-between items-baseline">
            <h2 className={`text-xl md:text-2xl font-bold tracking-wide uppercase ${isNote ? 'font-serif' : 'font-mono'}`}>
              {activeDocument.title || "UNTITLED DOCUMENT"}
            </h2>
            <span className="text-[10px] opacity-60 tracking-widest uppercase font-mono">{activeDocument.type}</span>
          </div>

          {/* Document Content Body */}
          <p 
            className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap flex-1 ${
              isNote ? 'font-serif italic text-[#1a0f07]' : 'font-mono text-xs md:text-sm text-[#222]'
            }`}
            style={{
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap'
            }}
          >
            {activeDocument.content || "[ NO CONTENT AVAILABLE ]"}
          </p>

          {/* Author Signature */}
          {activeDocument.author && (
            <div className="mt-6 text-xs md:text-sm italic text-right border-t border-current/20 pt-3 font-serif opacity-80">
              — {activeDocument.author}
            </div>
          )}

          {/* Interactive Link */}
          {activeDocument.interactiveLink && (
            <div className="mt-6 flex justify-center pointer-events-auto">
              <a 
                href={activeDocument.interactiveLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#24160a] text-[#eddcb9] px-4 py-2 rounded shadow hover:bg-black transition-colors cursor-pointer font-sans text-xs font-bold"
                onClick={(e) => e.stopPropagation()}
              >
                {activeDocument.interactiveLink.label}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Dismissal Instructions */}
      <div className="text-center font-mono text-xs text-[#eddcb9]/80 tracking-widest">
        PRESS <span className="bg-[#eddcb9]/20 px-2 py-0.5 rounded text-white font-bold">[ ESC ]</span> TO PUT AWAY
      </div>
    </div>
  );
}
