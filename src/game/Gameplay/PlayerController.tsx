import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, RapierRigidBody, CapsuleCollider } from "@react-three/rapier";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { useArchiveStore } from "@/lib/state";
import { useGameState, GameMode } from "../useGameState";
import { useInput } from "./useInput";

const MAX_WALK_SPEED = 3.5;
const ACCEL_RATE = 14.0;
const DECEL_RATE = 16.0;

// Reusable math vectors to avoid per-frame allocations
const desiredDirection = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const handOffset = new THREE.Vector3();
const lookAtVector = new THREE.Vector3();

export function PlayerController() {
  const body = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const input = useInput();
  const { teleportTarget, setTeleportTarget } = useArchiveStore();
  const gameMode = useGameState((state) => state.gameMode);
  const setGameMode = useGameState((state) => state.setGameMode);

  const flashlightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Group>(null);

  // Smooth bobbing state
  const bobPhase = useRef(0);
  const smoothedSpeed = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!body.current) return;

    if (teleportTarget) {
      body.current.setTranslation(new THREE.Vector3(...teleportTarget), true);
      setTeleportTarget(null);
      return;
    }

    if (gameMode !== GameMode.PLAYING) {
      // Zero out horizontal velocity when not playing / in overlay
      const curLinvel = body.current.linvel();
      body.current.setLinvel({ x: 0, y: curLinvel.y, z: 0 }, true);
      return;
    }

    const currentVelocity = body.current.linvel();
    const dt = Math.min(delta, 0.1);

    // 1. Calculate desired horizontal movement vector
    frontVector.set(0, 0, Number(input.backward) - Number(input.forward));
    sideVector.set(Number(input.left) - Number(input.right), 0, 0);

    desiredDirection.subVectors(frontVector, sideVector);
    const inputLength = desiredDirection.length();

    if (inputLength > 0.001) {
      desiredDirection.divideScalar(inputLength);
      desiredDirection.multiplyScalar(MAX_WALK_SPEED);
      desiredDirection.applyEuler(camera.rotation);
      // Keep purely on horizontal XZ plane
      desiredDirection.y = 0;
    } else {
      desiredDirection.set(0, 0, 0);
    }

    // 2. Smoothly lerp horizontal velocity (Acceleration / Deceleration)
    const isAccelerating = inputLength > 0.001;
    const lerpRate = isAccelerating ? ACCEL_RATE : DECEL_RATE;
    const lerpFactor = Math.min(dt * lerpRate, 1.0);

    const targetX = THREE.MathUtils.lerp(currentVelocity.x, desiredDirection.x, lerpFactor);
    const targetZ = THREE.MathUtils.lerp(currentVelocity.z, desiredDirection.z, lerpFactor);

    body.current.setLinvel({ x: targetX, y: currentVelocity.y, z: targetZ }, true);

    // 3. Ground Speed & Camera Head Bob
    const horizontalSpeed = Math.hypot(targetX, targetZ);
    smoothedSpeed.current = THREE.MathUtils.lerp(smoothedSpeed.current, horizontalSpeed, Math.min(dt * 10, 1.0));

    // Progress bobbing cycle proportionally to speed
    if (smoothedSpeed.current > 0.1) {
      bobPhase.current += dt * (smoothedSpeed.current * 2.8);
    }

    const bobIntensity = Math.min(smoothedSpeed.current / MAX_WALK_SPEED, 1.0);
    const bobY = Math.sin(bobPhase.current * 2) * (0.02 * bobIntensity);
    const bobX = Math.cos(bobPhase.current) * (0.012 * bobIntensity);

    // Sync camera to physics body (Camera Height: 1.65m base + bobbing)
    const position = body.current.translation();
    camera.position.set(position.x + bobX, position.y + 0.65 + bobY, position.z);

    // 4. Flashlight Dynamics (Restrained sway and battery pulsation)
    if (flashlightRef.current && targetRef.current) {
      const time = clock.getElapsedTime();

      const swayX = Math.sin(time * 0.6) * 0.004;
      const swayY = Math.cos(time * 0.4) * 0.004;

      handOffset.set(0.28 + swayX + bobX * 0.5, -0.18 + swayY + bobY * 0.5, 0);
      handOffset.applyQuaternion(camera.quaternion);
      flashlightRef.current.position.copy(camera.position).add(handOffset);

      lookAtVector.set(swayX * 2, swayY * 2, -1);
      lookAtVector.applyQuaternion(camera.quaternion);
      targetRef.current.position.copy(camera.position).add(lookAtVector);
      flashlightRef.current.target = targetRef.current;

      // Subtle Battery Ambient Ripple (±4% at 0.25 Hz)
      const baseIntensity = 30.0;
      const variation = Math.sin(time * Math.PI * 2 * 0.25) * 0.04;
      flashlightRef.current.intensity = baseIntensity * (1.0 + variation);
    }
  });

  const handleUnlock = () => {
    const currentMode = useGameState.getState().gameMode;
    if (currentMode === GameMode.INSPECTING || currentMode === GameMode.INTERACTING) {
      // Pointer intentionally released for document / terminal modal
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
      
      {/* Player Flashlight */}
      <spotLight 
        ref={flashlightRef} 
        intensity={15.0} 
        angle={0.48}
        penumbra={1.0}
        distance={22}
        decay={2.0} 
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />
      <group ref={targetRef} />
      <RigidBody
        ref={body}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 1, 4]}
        enabledRotations={[false, false, false]}
        ccd={true}
        friction={0}
      >
        <CapsuleCollider args={[0.5, 0.3]} />
      </RigidBody>
    </>
  );
}
