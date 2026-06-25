// src/components/intro/BlackoutTransition.tsx
"use client";
import React, { useEffect, useState } from "react";

interface BlackoutTransitionProps {
  onComplete: () => void;
}

/**
 * CRT monitor power-down effect:
 * 1. Instant black (0ms)
 * 2. White horizontal line shrinks to center (400ms)
 * 3. Hold pure black silence (1500ms)
 * 4. Fire onComplete
 */
export const BlackoutTransition: React.FC<BlackoutTransitionProps> = ({ onComplete }) => {
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    // Show the CRT shrink line after a tiny delay
    const lineTimer = setTimeout(() => setShowLine(true), 50);

    // After line animation (400ms) + silence (1500ms) = ~1900ms
    const completeTimer = setTimeout(() => onComplete(), 2000);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <>
      <div className="crt-blackout" />
      {showLine && <div className="crt-line" />}
    </>
  );
};
