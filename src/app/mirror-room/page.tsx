"use client";
import React from "react";
import Link from "next/link";
import { useArchiveStore } from "@/lib/state";

export default function TheMirrorRoom() {
  const { degradationLevel } = useArchiveStore();

  const getCorruptedText = (text: string, probability: number) => {
    if (degradationLevel > probability) return "[UNRECOGNIZABLE]";
    return text;
  };

  return (
    <div className="memory-room the-mirror-room">
      <Link href="/" className="memory-back-link">Step away from the glass</Link>
      
      <div className="mirror-frame">
        <div className={`reflection ${degradationLevel > 0.4 ? "distorted" : ""}`}>
          <p className="mirror-text">
            I look at the face in the glass and it doesn&apos;t quite fit anymore.
          </p>
          <p className="mirror-text">
            {getCorruptedText("I remember studying systems. Architectures. Finding comfort in things that compile cleanly. Now the code just looks like dead language.", 0.6)}
          </p>
          <p className="mirror-text">
            {getCorruptedText("My name is Aryan Kapoor. At least, that's what the files say.", 0.5)}
          </p>
          
          {degradationLevel > 0.5 && (
            <div className="crack-overlay" />
          )}
          
          {degradationLevel > 0.8 && (
            <p className="mirror-text creeping-text">It&apos;s staring back.</p>
          )}
        </div>
      </div>
    </div>
  );
}
