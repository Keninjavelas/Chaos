"use client";
import React from "react";
import Link from "next/link";
import { useArchiveStore } from "@/lib/state";

export default function TheWorkshop() {
  const { degradationLevel } = useArchiveStore();

  const getCorruptedText = (text: string, probability: number) => {
    if (degradationLevel > probability) return "██████████";
    return text;
  };

  return (
    <div className="memory-room the-workshop">
      <Link href="/" className="memory-back-link">Leave the workshop</Link>
      
      <div className="workbench">
        <div className="blueprint">
          <h3>Design Document 42</h3>
          <p className="scribble">{getCorruptedText("If we route the memory pool through the secondary proxy, we can isolate the degradation. But why is it degrading in the first place?", 0.6)}</p>
          <div className="diagram-box">
            {degradationLevel > 0.4 ? (
              <span className="diagram-error">THE GEOMETRY IS WRONG</span>
            ) : (
              <span className="diagram-text">[Technical Sketch]</span>
            )}
          </div>
        </div>

        <div className="blueprint scattered">
          <h3>Notes on Observer Pattern</h3>
          <p className="scribble">{getCorruptedText("It's not just observing. It's recording. It knows how long you stare at it.", 0.5)}</p>
        </div>
      </div>
    </div>
  );
}
