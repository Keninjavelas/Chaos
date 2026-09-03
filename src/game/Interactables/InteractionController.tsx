import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { playInteractionFeedback, InteractionFeedback } from "./interactionFeedback";
import { GameMode, useGameState } from "../useGameState";

export function InteractionController() {
  // Clear the previous-frame target before interactables submit candidates for this frame.
  // This prevents a prompt from surviving after the player looks away.
  useFrame((state) => {
    const gameState = useGameState.getState();
    if (
      gameState.interactionTargetFrame !== null &&
      gameState.interactionTargetFrame !== state.clock.elapsedTime
    ) {
      gameState.clearInteractionTarget();
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "e" || event.repeat) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

      const state = useGameState.getState();
      if (state.gameMode !== GameMode.PLAYING || !state.activeInteraction) return;

      event.preventDefault();
      const target = state.activeInteraction;
      state.clearInteractionTarget();

      let feedbackKind: InteractionFeedback = "activate";
      if (target.kind === "OPEN") feedbackKind = "open";
      else if (target.kind === "READ" || target.kind === "VIEW") feedbackKind = "read";

      playInteractionFeedback(feedbackKind);
      target.trigger();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
