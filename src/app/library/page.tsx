"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useArchiveStore } from "@/lib/state";

const MEMORIES = [
  { id: "INFRAMIND", title: "Inframind", text: "I kept trying to visualize the network. The nodes were bleeding into each other. It was supposed to be a tool, but it felt more like an invasive procedure.", date: "Sometime in the winter" },
  { id: "SYNTHOS", title: "Synthos", text: "The audio environment collapsed on itself. High corruption rate. I can still hear the generative loop when it's completely silent in this room.", date: "April 12th... maybe 1998?" },
  { id: "ECHO_PROTOCOL", title: "Echo Protocol", text: "Peer-to-peer transmission. We were trying to share memories without speaking. I don't think it worked. Or maybe it worked too well and that's why I'm alone now.", date: "Forgotten" },
];

export default function TheLibrary() {
  const { degradationLevel } = useArchiveStore();
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const getCorruptedText = (text: string, probability: number) => {
    if (degradationLevel > probability) return "..... [torn page] .....";
    return text;
  };

  return (
    <div className="memory-room the-library">
      <Link href="/" className="memory-back-link">Leave the room</Link>
      
      <div className="scattered-desk">
        {MEMORIES.map((memory, idx) => (
          <div 
            key={memory.id} 
            className={`journal-entry ${activeNote === memory.id ? "reading" : ""}`}
            style={{ 
              top: `${10 + (idx * 20)}%`, 
              left: `${10 + (idx * 25)}%`,
              transform: activeNote === memory.id ? "scale(1.1) rotate(0deg)" : `rotate(${idx % 2 === 0 ? -3 : 5}deg)`
            }}
            onClick={() => setActiveNote(activeNote === memory.id ? null : memory.id)}
          >
            <h3 className="journal-title">{getCorruptedText(memory.title, 0.8)}</h3>
            
            {activeNote === memory.id && (
              <div className="journal-body">
                <p className="journal-text">{getCorruptedText(memory.text, 0.5)}</p>
                <p className="journal-date">{getCorruptedText(memory.date, 0.7)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
