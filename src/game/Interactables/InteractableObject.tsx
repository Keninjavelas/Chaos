import React, { useEffect, useId, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { InteractionKind } from "@/data/types";
import { playInteractionFeedback } from "./interactionFeedback";
import { useGameState, GameMode } from "../useGameState";

interface InteractableObjectProps {
  label: string;
  interactionKind?: InteractionKind;
  interactionRange?: number;
  priority?: number;
  focusThreshold?: number;
  onInteract: () => void;
  children: React.ReactNode;
}

const inferredKind = (label: string): InteractionKind => {
  const value = label.toLowerCase();
  if (value.startsWith("open") || value.startsWith("close") || value.startsWith("take")) return "OPEN";
  if (value.startsWith("read")) return "READ";
  if (value.startsWith("use") || value.startsWith("access") || value.startsWith("call")) return "USE";
  if (value.startsWith("view")) return "VIEW";
  return "INSPECT";
};

const tempWorldPos = new THREE.Vector3();
const tempCameraDir = new THREE.Vector3();
const tempToTarget = new THREE.Vector3();

export function InteractableObject({ 
  label,
  interactionKind,
  interactionRange = 2.5, 
  priority = 0,
  focusThreshold = 0.965,
  onInteract,
  children,
}: InteractableObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const interactionId = useId();
  const [focused, setFocused] = useState(false);
  const setInteractionTarget = useGameState((state) => state.setInteractionTarget);
  const clearInteractionTarget = useGameState((state) => state.clearInteractionTarget);
  const gameMode = useGameState((state) => state.gameMode);
  const kind = interactionKind ?? inferredKind(label);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (gameMode !== GameMode.PLAYING) {
      if (focused) setFocused(false);
      group.scale.set(1, 1, 1);
      return;
    }

    group.getWorldPosition(tempWorldPos);
    state.camera.getWorldDirection(tempCameraDir);

    tempToTarget.subVectors(tempWorldPos, state.camera.position);
    const distance = tempToTarget.length();
    
    let focusDot = 0;
    if (distance > 0.001) {
      tempToTarget.divideScalar(distance);
      focusDot = tempCameraDir.dot(tempToTarget);
    }

    const isFocused = distance <= interactionRange && focusDot >= focusThreshold;

    if (isFocused) {
      setInteractionTarget({ id: interactionId, kind, label, distance, priority, trigger: onInteract }, state.clock.elapsedTime);
    }

    if (isFocused !== focused) {
      setFocused(isFocused);
      if (isFocused) playInteractionFeedback("focus");
    }

    const targetScale = isFocused ? 1.018 : 1.0;
    group.scale.set(targetScale, targetScale, targetScale);
  });

  useEffect(() => () => clearInteractionTarget(), [clearInteractionTarget]);

  return (
    <group 
      ref={groupRef}
      onClick={(e) => { 
        if (focused && gameMode === GameMode.PLAYING) {
          e.stopPropagation();
          onInteract();
        }
      }}
    >
      {children}
    </group>
  );
}
