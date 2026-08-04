import React, { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGameState } from "../../useGameState";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DeskSafeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  safeId?: string;
}

export function DeskSafe({ position, rotation = [0, 0, 0], safeId = "SUPERVISOR_SAFE" }: DeskSafeProps) {
  const unlockedSafes = useGameState((state) => state.unlockedSafes);
  const setActiveKeypad = useGameState((state) => state.setActiveKeypad);
  const addInventoryItem = useGameState((state) => state.addInventoryItem);
  const inventory = useGameState((state) => state.inventory);

  const isUnlocked = !!unlockedSafes[safeId];
  const doorRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (doorRef.current) {
      const targetAngle = isUnlocked ? -Math.PI / 1.8 : 0;
      doorRef.current.rotation.y = THREE.MathUtils.lerp(doorRef.current.rotation.y, targetAngle, delta * 6);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Outer Steel Safe Housing */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.4, 0.45]} />
          <meshStandardMaterial color="#1a1d20" roughness={0.5} metalness={0.8} />
        </mesh>
        {/* Inner Hollow Chamber */}
        <mesh position={[0, 0.2, 0.02]}>
          <boxGeometry args={[0.44, 0.34, 0.38]} />
          <meshStandardMaterial color="#0b0d0e" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Safe Front Interaction (Keypad trigger when locked, item pickup when unlocked) */}
      {!isUnlocked ? (
        <InteractableObject
          label="Inspect Security Keypad"
          onInteract={() => setActiveKeypad(safeId)}
        >
          <group position={[0, 0.2, 0.23]}>
            {/* Keypad Panel */}
            <mesh>
              <boxGeometry args={[0.18, 0.22, 0.02]} />
              <meshStandardMaterial color="#2a3036" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Status LED */}
            <mesh position={[0.06, 0.07, 0.015]}>
              <boxGeometry args={[0.02, 0.02, 0.01]} />
              <meshBasicMaterial color="#ff2222" />
            </mesh>
          </group>
        </InteractableObject>
      ) : (
        /* Hinge Door Group (Swings open when unlocked) */
        <group ref={doorRef} position={[-0.23, 0.2, 0.23]}>
          <mesh position={[0.23, 0, 0]} castShadow>
            <boxGeometry args={[0.46, 0.36, 0.02]} />
            <meshStandardMaterial color="#22272c" roughness={0.5} metalness={0.8} />
          </mesh>
        </group>
      )}

      {/* Item Inside Unlocked Safe: Sublevel Elevator Keycard */}
      {isUnlocked && !inventory["KEYCARD-SUBLEVEL"] && (
        <group position={[0, 0.06, 0]}>
          <InteractableObject
            label="Take Sublevel Access Keycard"
            onInteract={() => addInventoryItem({
              id: "KEYCARD-SUBLEVEL",
              name: "Sublevel Access Keycard",
              description: "Level 3 Security Keycard granting access to Sublevel Bay-03.",
              category: "key",
              acquired: true,
              isNew: true,
              icon: "keycard_sublevel"
            })}
          >
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
              <boxGeometry args={[0.1, 0.01, 0.14]} />
              <meshStandardMaterial color="#cc1111" roughness={0.3} metalness={0.8} />
            </mesh>
          </InteractableObject>
        </group>
      )}
    </group>
  );
}
