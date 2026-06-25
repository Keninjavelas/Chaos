// src/components/intro/IntroFlow.tsx
"use client";
import React, { useState, useCallback } from "react";
import { LoadingDesktop } from "@/components/intro/LoadingDesktop";
import { BlackoutTransition } from "@/components/intro/BlackoutTransition";
import { ReflectionSilhouette } from "@/components/intro/ReflectionSilhouette";
import { QuoteSequence } from "@/components/intro/QuoteSequence";
import { StartScreen } from "@/game/UI/StartScreen";
import dynamic from "next/dynamic";

// Dynamically import Renderer without SSR for normal operation
const GameCanvas = dynamic(() => import("@/game/Engine/Renderer"), { ssr: false });

/**
 * IntroFlow — the full atmospheric intro sequence:
 *   1. desktop   — Fake 2000s Windows desktop with loading bar + cat memes
 *   2. blackout  — CRT power-down effect (instant black, white line, silence)
 *   3. reflection — Barely-visible silhouette + single philosopher quote (~7s)
 *   4. startscreen — Terminal menu
 *   5. game      — Archive AK-27 classified terminal homepage
 *
 * The skip button is overlaid during the desktop phase.
 */

type Phase = "desktop" | "blackout" | "reflection" | "startscreen" | "game";

export const IntroFlow: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("desktop");

  const goBlackout = useCallback(() => setPhase("blackout"), []);
  const goReflection = useCallback(() => setPhase("reflection"), []);
  const goStartScreen = useCallback(() => setPhase("startscreen"), []);
  const goGame = useCallback(() => setPhase("game"), []);

  // Skip jumps straight to blackout (which then leads to reflection → startscreen → game)
  const handleSkip = useCallback(() => setPhase("blackout"), []);

  console.log("IntroFlow render – current phase:", phase);

  // ─── Desktop phase ────────────────────────────────────────
  if (phase === "desktop") {
    console.log("Rendering LoadingDesktop");
    return <LoadingDesktop onComplete={goBlackout} onSkip={handleSkip} />;
  }

  // ─── CRT Blackout ─────────────────────────────────────────
  if (phase === "blackout") {
    console.log("Rendering BlackoutTransition");
    return <BlackoutTransition onComplete={goReflection} />;
  }

  // ─── Reflection + Quote ───────────────────────────────────
  if (phase === "reflection") {
    console.log("Rendering ReflectionSilhouette & QuoteSequence");
    return (
      <div className="reflection-screen">
        <ReflectionSilhouette />
        <QuoteSequence onComplete={goStartScreen} />
      </div>
    );
  }

  // ─── Start Screen ─────────────────────────────────────────
  if (phase === "startscreen") {
    console.log("Rendering StartScreen");
    return <StartScreen onEnter={goGame} />;
  }

  // ─── Archive Homepage (Game) ─────────────────────────────────
  if (phase === "game") {
    console.log("Rendering GameCanvas");
    return <GameCanvas />;
  }

  // Fallback – should never happen
  console.warn("IntroFlow: unknown phase", phase);
  return null;
};
