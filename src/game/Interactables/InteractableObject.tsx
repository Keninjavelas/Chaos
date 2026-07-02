import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useGameState, GameMode } from "../useGameState";

interface InteractableObjectProps {
  /** The interaction text prompt, e.g. "Inspect File" */
  label: string;
  /** Maximum distance to allow interaction */
  interactionRange?: number;
  /** Function called when player interacts */
  onInteract: () => void;
  children: React.ReactNode;
}

export function InteractableObject({ 
  label, 
  interactionRange = 2.5, 
  onInteract, 
  children 
}: InteractableObjectProps) {
  const [hovered, setHovered] = useState(false);
  const [inRange, setInRange] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  
  const setActivePrompt = useGameState((state) => state.setActivePrompt);
  const gameMode = useGameState((state) => state.gameMode);

  // Change cursor to pointer when hovered and in range
  useCursor(hovered && inRange && gameMode === GameMode.PLAYING);

  // Check distance and update global prompt
  useFrame(({ camera }) => {
    if (gameMode !== GameMode.PLAYING) {
      if (hovered) setHovered(false);
      if (inRange) setInRange(false);
      return;
    }

    if (!hovered || !groupRef.current) {
      if (inRange) {
        setInRange(false);
        setActivePrompt(null);
      }
      return;
    }

    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    
    const distance = camera.position.distanceTo(worldPos);
    const isNowInRange = distance <= interactionRange;

    if (isNowInRange !== inRange) {
      setInRange(isNowInRange);
      if (isNowInRange) {
        setActivePrompt({ text: label });
      } else {
        setActivePrompt(null);
      }
    }
    
    // Smooth hover transition (scale)
    const targetScale = (hovered && inRange) ? 1.05 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  // Handle interaction key (E)
  useEffect(() => {
    if (!hovered || !inRange || gameMode !== GameMode.PLAYING) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e') {
        onInteract();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hovered, inRange, onInteract]);

  // Clean up prompt on unmount
  useEffect(() => {
    return () => {
      if (hovered && inRange) {
        setActivePrompt(null);
      }
    };
  }, [hovered, inRange, setActivePrompt]);

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { 
        if (gameMode !== GameMode.PLAYING) return;
        e.stopPropagation(); 
        setHovered(true); 
      }}
      onPointerOut={() => { 
        setHovered(false); 
      }}
      onClick={(e) => { 
        if (inRange && gameMode === GameMode.PLAYING) {
          e.stopPropagation(); 
          onInteract(); 
        }
      }}
    >
      {/* Optional: Add a visual effect when hovered and inRange by using context or cloning children, 
          but for now we rely on the crosshair UI to indicate interactivity. */}
      {children}
    </group>
  );
}
