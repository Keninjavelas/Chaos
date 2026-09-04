"use client";
import React, { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import {
  ReceptionWaterStreak,
  ReceptionDampPatch,
  ReceptionRepairPatch,
  ReceptionPeelingPaint,
  ReceptionRustBleed,
  ReceptionCeilingPipeStain,
} from "./ReceptionAuthoredMaterials";

interface PbrTextureMaps {
  diffuse: THREE.Texture;
  normal: THREE.Texture;
  roughness: THREE.Texture;
  ao: THREE.Texture;
}

const textureLoader = new THREE.TextureLoader();

// Personnel-local clone of the base-texture cache. Paths are identical to
// Reception base families so no new /textures/* directory is introduced
// (see Personnel wing tasks.md Task 2 Notes — ceiling cares about new dirs).
const cachedBaseTextures: Record<string, PbrTextureMaps> = {};

function getBasePbrTextures(dir: string): PbrTextureMaps {
  if (!cachedBaseTextures[dir]) {
    const diffuse = textureLoader.load(`${dir}/diffuse.jpg`);
    diffuse.wrapS = THREE.RepeatWrapping;
    diffuse.wrapT = THREE.RepeatWrapping;
    diffuse.colorSpace = THREE.SRGBColorSpace;
    diffuse.anisotropy = 8;
    diffuse.generateMipmaps = true;
    diffuse.minFilter = THREE.LinearMipmapLinearFilter;
    diffuse.magFilter = THREE.LinearFilter;

    const normal = textureLoader.load(`${dir}/normal.jpg`);
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;
    normal.colorSpace = THREE.NoColorSpace;
    normal.anisotropy = 8;
    normal.generateMipmaps = true;
    normal.minFilter = THREE.LinearMipmapLinearFilter;
    normal.magFilter = THREE.LinearFilter;

    const roughness = textureLoader.load(`${dir}/roughness.jpg`);
    roughness.wrapS = THREE.RepeatWrapping;
    roughness.wrapT = THREE.RepeatWrapping;
    roughness.colorSpace = THREE.NoColorSpace;
    roughness.anisotropy = 8;
    roughness.generateMipmaps = true;
    roughness.minFilter = THREE.LinearMipmapLinearFilter;
    roughness.magFilter = THREE.LinearFilter;

    const ao = textureLoader.load(`${dir}/ao.jpg`);
    ao.wrapS = THREE.RepeatWrapping;
    ao.wrapT = THREE.RepeatWrapping;
    ao.colorSpace = THREE.NoColorSpace;
    ao.anisotropy = 8;
    ao.generateMipmaps = true;
    ao.minFilter = THREE.LinearMipmapLinearFilter;
    ao.magFilter = THREE.LinearFilter;

    cachedBaseTextures[dir] = { diffuse, normal, roughness, ao };
  }
  return cachedBaseTextures[dir];
}

function useClonedPbrMaps(dir: string, repeatX: number, repeatY: number): PbrTextureMaps {
  return useMemo(() => {
    const base = getBasePbrTextures(dir);

    const diffuse = base.diffuse.clone();
    diffuse.repeat.set(repeatX, repeatY);
    diffuse.needsUpdate = true;

    const normal = base.normal.clone();
    normal.repeat.set(repeatX, repeatY);
    normal.needsUpdate = true;

    const roughness = base.roughness.clone();
    roughness.repeat.set(repeatX, repeatY);
    roughness.needsUpdate = true;

    const ao = base.ao.clone();
    ao.repeat.set(repeatX, repeatY);
    ao.needsUpdate = true;

    return { diffuse, normal, roughness, ao };
  }, [dir, repeatX, repeatY]);
}

function useEnsureUv2(meshRef: React.RefObject<THREE.Mesh | null>) {
  useEffect(() => {
    if (meshRef.current?.geometry) {
      const geom = meshRef.current.geometry;
      if (!geom.attributes.uv2 && geom.attributes.uv) {
        geom.setAttribute("uv2", geom.attributes.uv);
      }
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONNEL HERO FLOOR — deep warm brown admin laminate/vinyl tone
// ─────────────────────────────────────────────────────────────────────────────

interface PersonnelFloorProps {
  position?: [number, number, number];
  args?: [number, number]; // [width, length]
}

export function PersonnelHeroFloor({ position = [0, -0.5, 0], args = [8.5, 8.5] }: PersonnelFloorProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);

  const repeatX = Math.max(1, args[0] / 2.0);
  const repeatY = Math.max(1, args[1] / 2.0);
  const maps = useClonedPbrMaps("/textures/reception/floor", repeatX, repeatY);

  return (
    <RigidBody type="fixed" position={position}>
      <mesh ref={meshRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.55, 1.55), [])}
          roughnessMap={maps.roughness}
          roughness={0.85}
          metalness={0.03}
          aoMap={maps.ao}
          aoMapIntensity={1.0}
          color="#6e5e4a"
        />
      </mesh>

      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[args[0], 1.0, args[1]]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONNEL HERO CEILING — slightly cleaner admin acoustic grid (less discolored)
// ─────────────────────────────────────────────────────────────────────────────

interface PersonnelCeilingProps {
  position?: [number, number, number];
  args?: [number, number, number]; // [width, height, length]
  hasLights?: boolean;
}

export function PersonnelHeroCeiling({
  position = [0, 2.9, 0],
  args = [8.5, 0.1, 8.5],
  hasLights: _hasLights = false,
}: PersonnelCeilingProps) {
  void _hasLights;
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);

  const repeatX = Math.max(1, args[0] / 2.4);
  const repeatY = Math.max(1, args[2] / 2.4);
  const maps = useClonedPbrMaps("/textures/reception/ceiling", repeatX, repeatY);

  const tileColumns = Math.max(1, Math.floor(args[0] / 1.2));
  const tileRows = Math.max(1, Math.floor(args[2] / 1.2));

  return (
    <RigidBody type="fixed" position={position}>
      <mesh ref={meshRef} receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.6, 1.6), [])}
          roughnessMap={maps.roughness}
          roughness={0.98}
          metalness={0.0}
          aoMap={maps.ao}
          aoMapIntensity={0.92}
          color="#8e8a78"
        />
      </mesh>

      {Array.from({ length: tileColumns - 1 }).map((_, index) => (
        <mesh key={`personnel-ceiling-col-${index}`} position={[-args[0] / 2 + (index + 1) * 1.2, -args[1] / 2 - 0.006, 0]}>
          <boxGeometry args={[0.02, 0.012, args[2]]} />
          <meshStandardMaterial color="#161815" roughness={0.95} metalness={0.35} />
        </mesh>
      ))}
      {Array.from({ length: tileRows - 1 }).map((_, index) => (
        <mesh key={`personnel-ceiling-row-${index}`} position={[0, -args[1] / 2 - 0.006, -args[2] / 2 + (index + 1) * 1.2]}>
          <boxGeometry args={[args[0], 0.012, 0.02]} />
          <meshStandardMaterial color="#161815" roughness={0.95} metalness={0.35} />
        </mesh>
      ))}
    </RigidBody>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONNEL HERO WALL — aged admin plaster, beige-grey/faded-olive tint
// ─────────────────────────────────────────────────────────────────────────────

interface PersonnelWallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number, number]; // [width, height, depth]
}

export function PersonnelHeroWall({ position, rotation = [0, 0, 0], args }: PersonnelWallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);

  const wallSpan = Math.max(args[0], args[2]);
  const wallHeight = args[1];
  const repeatX = Math.max(0.8, wallSpan / 2.5);
  const repeatY = Math.max(0.8, wallHeight / 2.5);

  const maps = useClonedPbrMaps("/textures/reception/wall", repeatX, repeatY);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        <mesh ref={meshRef} position={[0, args[1] / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial
            map={maps.diffuse}
            normalMap={maps.normal}
            normalScale={useMemo(() => new THREE.Vector2(1.9, 1.9), [])}
            roughnessMap={maps.roughness}
            roughness={0.94}
            metalness={0.02}
            aoMap={maps.ao}
            aoMapIntensity={1.0}
            color="#9a937d"
          />
        </mesh>
      </RigidBody>

      <mesh position={[0, 0.1, args[2] / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#141817" roughness={0.62} metalness={0.72} />
      </mesh>
      <mesh position={[0, 0.1, -args[2] / 2 - 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#141817" roughness={0.62} metalness={0.72} />
      </mesh>

      <mesh position={[0, 1.0, args[2] / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.08, 0.05]} />
        <meshStandardMaterial color="#2e251c" roughness={0.8} metalness={0.04} />
      </mesh>
      <mesh position={[0, 1.0, -args[2] / 2 - 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.08, 0.05]} />
        <meshStandardMaterial color="#2e251c" roughness={0.8} metalness={0.04} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONNEL DECAL ALIASES (thin re-exports from Reception — no new canvases)
// ─────────────────────────────────────────────────────────────────────────────

export const PersonnelWaterStreak = ReceptionWaterStreak;
export const PersonnelDampPatch = ReceptionDampPatch;
export const PersonnelRepairPatch = ReceptionRepairPatch;
export const PersonnelPeelingPaint = ReceptionPeelingPaint;
export const PersonnelRustBleed = ReceptionRustBleed;
export const PersonnelCeilingPipeStain = ReceptionCeilingPipeStain;
