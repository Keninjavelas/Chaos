import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, RapierRigidBody, CapsuleCollider } from "@react-three/rapier";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { useArchiveStore } from "@/lib/state";
import { useGameState, GameMode } from "../useGameState";
import { useInput } from "./useInput";

const SPEED = 3.5;
// SPRINT_MULTIPLIER removed per spec (Player run: DISABLED)

export function PlayerController() {
  const body = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const input = useInput();
  const { teleportTarget, setTeleportTarget } = useArchiveStore();
  const gameMode = useGameState(state => state.gameMode);
  const setGameMode = useGameState(state => state.setGameMode);
  const clearInteraction = useGameState(state => state.clearInteraction);

  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();

  const flashlightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useFrame(({ clock }) => {
    if (!body.current) return;

    if (teleportTarget) {
      body.current.setTranslation(new THREE.Vector3(...teleportTarget), true);
      setTeleportTarget(null);
      return;
    }

    if (gameMode !== GameMode.PLAYING) return;

    // Movement calculation
    const currentVelocity = body.current.linvel();
    
    frontVector.set(0, 0, Number(input.backward) - Number(input.forward));
    sideVector.set(Number(input.left) - Number(input.right), 0, 0);

    direction.subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED) // Run disabled
      .applyEuler(camera.rotation);

    // Apply movement while preserving vertical velocity (gravity)
    body.current.setLinvel({ x: direction.x, y: currentVelocity.y, z: direction.z }, true);

    // Sync camera to physics body (Camera Height: 1.65m per spec)
    const position = body.current.translation();
    camera.position.set(position.x, position.y + 0.65, position.z); // Body is at y=1, +0.65 = 1.65m

    // Sync flashlight to camera with bobbing and flickering
    if (flashlightRef.current && targetRef.current) {
      const time = clock.getElapsedTime();
      
      // Calculate speed for head bob
      const speed = new THREE.Vector2(currentVelocity.x, currentVelocity.z).length();
      const isMoving = speed > 0.5;
      
      // Head bob and subtle hand sway offsets
      const bobX = isMoving ? Math.sin(time * 8) * 0.03 : 0;
      const bobY = isMoving ? Math.abs(Math.sin(time * 8)) * 0.03 : 0;
      
      // Very subtle hand sway
      const swayX = Math.sin(time * 0.5) * 0.005;
      const swayY = Math.cos(time * 0.3) * 0.005;

      // Position flashlight slightly to the right of the camera
      const handOffset = new THREE.Vector3(0.3 + swayX, -0.2 + swayY, 0);
      handOffset.applyQuaternion(camera.quaternion);
      flashlightRef.current.position.copy(camera.position).add(handOffset);
      
      // Calculate target point
      const lookAtVector = new THREE.Vector3(bobX + swayX, bobY + swayY, -1);
      lookAtVector.applyQuaternion(camera.quaternion);
      
      targetRef.current.position.copy(camera.position).add(lookAtVector);
      flashlightRef.current.target = targetRef.current;

      // Subtle Battery Variation (±5% at 0.3 Hz)
      const baseIntensity = 30.0;
      const variation = Math.sin(time * Math.PI * 2 * 0.3) * 0.05; // 0.3Hz
      flashlightRef.current.intensity = baseIntensity * (1.0 + variation);
    }
  });

  const handleUnlock = () => {
    // When the user presses ESC, the browser naturally unlocks the pointer.
    // We catch that here and sync our state.
    const currentMode = useGameState.getState().gameMode;
    if (currentMode === GameMode.INSPECTING) {
      // Do nothing. The pointer is intentionally unlocked for inspection.
    } else if (currentMode === GameMode.PLAYING) {
      setGameMode(GameMode.RESUMING);
    }
  };

  const handleLock = () => {
    setGameMode(GameMode.PLAYING);
  };

  return (
    <>
      <PointerLockControls 
        makeDefault 
        onLock={handleLock}
        onUnlock={handleUnlock}
      />
      
      {/* Player Flashlight (Production Spec) */}
      <spotLight 
        ref={flashlightRef} 
        intensity={15.0} 
        angle={0.45} // Wider, softer flood
        penumbra={1.0} // Maximum softness
        distance={20} // Realistic falloff
        decay={2.0} 
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />
      <group ref={targetRef as any} />
      <RigidBody
        ref={body}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 1, 4]} // Spawn Position Z: 4
        enabledRotations={[false, false, false]}
        ccd={true}
        friction={0} // We handle movement directly
      >
        <CapsuleCollider args={[0.5, 0.3]} />
      </RigidBody>
    </>
  );
}
