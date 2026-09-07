// src/components/intro/QuoteSequence.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

const quotes = [
  "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does."
];

interface QuoteSequenceProps {
  onComplete: () => void;
}

/**
 * Shows a single random philosopher quote overlaid on the
 * reflection screen. Fades in over 1s, holds 4s, fades out 1s.
 * Total time: ~7 seconds. Then fires onComplete.
 */
export const QuoteSequence: React.FC<QuoteSequenceProps> = ({ onComplete }) => {
  const [quote, setQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [showCracks, setShowCracks] = useState(false);

  useEffect(() => {
    // Quote appears first.
    // After 3.5 seconds, show cracked screen.
    const crackTimer = setTimeout(() => setShowCracks(true), 3500);
    // 1 second later, transition to homepage.
    const endTimer = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(crackTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <>
      <div className="reflection-quote">
        {quote}
      </div>
      {showCracks && <div className="glass-cracks" />}
    </>
  );
};
