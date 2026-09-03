import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { audioManager, RoomAudioProfile } from "./AudioManager";
import { useGameState, GameMode } from "../useGameState";
import { useInput } from "../Gameplay/useInput";

export function AudioController() {
  const { camera } = useThree();
  const input = useInput();
  const gameMode = useGameState((state) => state.gameMode);
  const prevPosition = useRef(new THREE.Vector3());
  const footstepAccumulator = useRef(0);

  // Unlock audio on first user gesture
  useEffect(() => {
    const handleGesture = () => {
      audioManager.unlock();
    };

    window.addEventListener("click", handleGesture, { once: false });
    window.addEventListener("keydown", handleGesture, { once: false });
    window.addEventListener("pointerdown", handleGesture, { once: false });

    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      window.removeEventListener("pointerdown", handleGesture);
    };
  }, []);

  // Duck ambience during inspection / terminal mode
  useEffect(() => {
    const isInteracting = gameMode === GameMode.INSPECTING || gameMode === GameMode.INTERACTING;
    audioManager.setAmbienceDucking(isInteracting);
  }, [gameMode]);

  useFrame((_, delta) => {
    // 1. Position & Room Profile Detection
    const px = camera.position.x;
    const pz = camera.position.z;

    let profile: RoomAudioProfile = "CORRIDOR";

    // Reception Wing: X in [-5, 5], Z in [-3, 6]
    if (px >= -5 && px <= 5 && pz >= -3 && pz <= 6) {
      profile = "RECEPTION";
    }
    // Personnel Wing: X in [10, 24], Z in [-8, 8]
    else if (px >= 10 && px <= 24 && pz >= -8 && pz <= 8) {
      profile = "PERSONNEL";
    }
    // Research Lab (Communications): X in [-22, -8], Z in [4, 18]
    else if (px >= -22 && px <= -8 && pz >= 4 && pz <= 18) {
      profile = "RESEARCH";
    }
    // Records Hall: X in [-22, -8], Z in [-18, -4]
    else if (px >= -22 && px <= -8 && pz >= -18 && pz <= -4) {
      profile = "RECORDS";
    }
    // Sublevel: Y <= -30
    else if (camera.position.y <= -30) {
      profile = "SUBLEVEL";
    }

    audioManager.setRoomProfile(profile);

    // 2. Footstep System
    if (gameMode === GameMode.PLAYING) {
      const isMoving = input.forward || input.backward || input.left || input.right;
      const speed = camera.position.distanceTo(prevPosition.current) / (delta || 0.016);

      if (isMoving && speed > 0.4) {
        footstepAccumulator.current += delta;
        const stepInterval = 0.44; // standard walking cadence
        if (footstepAccumulator.current >= stepInterval) {
          footstepAccumulator.current = 0;
          const surface = profile === "RESEARCH" || profile === "SUBLEVEL" ? "metal" : "concrete";
          audioManager.playFootstep(surface);
        }
      } else {
        footstepAccumulator.current = 0.2; // primed for immediate next step
      }
    } else {
      footstepAccumulator.current = 0;
    }

    prevPosition.current.copy(camera.position);
  });

  return null;
}
