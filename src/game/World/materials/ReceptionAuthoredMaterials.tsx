"use client";
import React, { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

interface PbrTextureMaps {
  diffuse: THREE.Texture;
  normal: THREE.Texture;
  roughness: THREE.Texture;
  ao: THREE.Texture;
}

const textureLoader = new THREE.TextureLoader();

// Global cached base textures so image buffers are only downloaded and decoded once
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

/**
 * Creates cloned texture maps with custom repeat scales without duplicating GPU image memory.
 */
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

/**
 * Hook to ensure a mesh's geometry has uv2 coordinates for ambient occlusion.
 */
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
// RECEPTION HERO FLOOR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface ReceptionFloorProps {
  position?: [number, number, number];
  args?: [number, number]; // [width, length]
}

export function ReceptionHeroFloor({ position = [0, -0.5, 0], args = [10, 10.5] }: ReceptionFloorProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);

  // Repeat scaled to institutional tile size (~0.4m per tile)
  const repeatX = Math.max(1, args[0] / 2.0);
  const repeatY = Math.max(1, args[1] / 2.0);
  const maps = useClonedPbrMaps("/textures/reception/floor", repeatX, repeatY);

  return (
    <RigidBody type="fixed" position={position}>
      {/* Base Floor Plane */}
      <mesh ref={meshRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.25, 1.25), [])}
          roughnessMap={maps.roughness}
          roughness={0.68}
          metalness={0.04}
          aoMap={maps.ao}
          aoMapIntensity={0.85}
          color="#cfc7ba"
        />
      </mesh>

      {/* Underlying Collision Box */}
      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[args[0], 1.0, args[1]]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECEPTION HERO CEILING COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface ReceptionCeilingProps {
  position?: [number, number, number];
  args?: [number, number, number]; // [width, height, length]
}

export function ReceptionHeroCeiling({ position = [0, 3.2, 0], args = [10, 0.1, 10.5] }: ReceptionCeilingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);

  // Repeat aligned to 1.2m acoustic tile bays
  const repeatX = Math.max(1, args[0] / 2.4);
  const repeatY = Math.max(1, args[2] / 2.4);
  const maps = useClonedPbrMaps("/textures/reception/ceiling", repeatX, repeatY);

  const tileColumns = Math.max(1, Math.floor(args[0] / 1.2));
  const tileRows = Math.max(1, Math.floor(args[2] / 1.2));

  return (
    <RigidBody type="fixed" position={position}>
      {/* Main Ceiling Slab */}
      <mesh ref={meshRef} receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.3, 1.3), [])}
          roughnessMap={maps.roughness}
          roughness={0.92}
          metalness={0.0}
          aoMap={maps.ao}
          aoMapIntensity={0.8}
          color="#c8c2b5"
        />
      </mesh>

      {/* Grid framing strips preserving institutional architectural layout */}
      {Array.from({ length: tileColumns - 1 }).map((_, index) => (
        <mesh key={`ceiling-column-${index}`} position={[-args[0] / 2 + (index + 1) * 1.2, -args[1] / 2 - 0.006, 0]}>
          <boxGeometry args={[0.02, 0.012, args[2]]} />
          <meshStandardMaterial color="#222420" roughness={0.92} metalness={0.2} />
        </mesh>
      ))}
      {Array.from({ length: tileRows - 1 }).map((_, index) => (
        <mesh key={`ceiling-row-${index}`} position={[0, -args[1] / 2 - 0.006, -args[2] / 2 + (index + 1) * 1.2]}>
          <boxGeometry args={[args[0], 0.012, 0.02]} />
          <meshStandardMaterial color="#222420" roughness={0.92} metalness={0.2} />
        </mesh>
      ))}
    </RigidBody>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECEPTION HERO WALL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface ReceptionWallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number, number]; // [width, height, depth]
}

export function ReceptionHeroWall({ position, rotation = [0, 0, 0], args }: ReceptionWallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);

  // Believable real-world plaster/concrete scale (~2.5m per texture tile)
  // For walls oriented along X or Z:
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
            normalScale={useMemo(() => new THREE.Vector2(1.35, 1.35), [])}
            roughnessMap={maps.roughness}
            roughness={0.86}
            metalness={0.02}
            aoMap={maps.ao}
            aoMapIntensity={0.88}
            color="#d8d1c2" // Dirty warm grey-beige institutional plaster tone
          />
        </mesh>
      </RigidBody>

      {/* Dark painted metal baseboards */}
      <mesh position={[0, 0.1, args[2] / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#1e2422" roughness={0.55} metalness={0.65} />
      </mesh>
      <mesh position={[0, 0.1, -args[2] / 2 - 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#1e2422" roughness={0.55} metalness={0.65} />
      </mesh>

      {/* Chair Rail (Aged wood/laminate trim) */}
      <mesh position={[0, 1.0, args[2] / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.08, 0.05]} />
        <meshStandardMaterial color="#3d3024" roughness={0.72} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.0, -args[2] / 2 - 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.08, 0.05]} />
        <meshStandardMaterial color="#3d3024" roughness={0.72} metalness={0.05} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECEPTION DECALS & LOCALIZED TILING BREAKUPS (Requirement 6)
// ─────────────────────────────────────────────────────────────────────────────

// Shared organic vertical water streak texture created on high-res canvas
let cachedLeakTexture: THREE.CanvasTexture | null = null;

function getWaterLeakTexture(): THREE.CanvasTexture {
  if (!cachedLeakTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 128, 512);

      // Vertical drip gradient with irregular trails
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, "rgba(42, 34, 24, 0.85)");
      grad.addColorStop(0.2, "rgba(48, 38, 28, 0.75)");
      grad.addColorStop(0.6, "rgba(38, 30, 22, 0.45)");
      grad.addColorStop(0.9, "rgba(30, 24, 18, 0.15)");
      grad.addColorStop(1.0, "rgba(20, 16, 12, 0.0)");

      ctx.fillStyle = grad;
      // Main central drip body
      ctx.beginPath();
      ctx.moveTo(40, 0);
      ctx.bezierCurveTo(45, 120, 52, 280, 56, 480);
      ctx.lineTo(72, 480);
      ctx.bezierCurveTo(76, 280, 83, 120, 88, 0);
      ctx.closePath();
      ctx.fill();

      // Side spatter trails
      ctx.fillStyle = "rgba(40, 32, 22, 0.4)";
      ctx.fillRect(32, 0, 8, 160);
      ctx.fillRect(88, 0, 6, 210);
      ctx.fillRect(28, 30, 4, 80);
      ctx.fillRect(96, 40, 5, 120);
    }
    cachedLeakTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedLeakTexture!;
}

// Shared organic damp / mold corner patch texture
let cachedDampTexture: THREE.CanvasTexture | null = null;

function getDampPatchTexture(): THREE.CanvasTexture {
  if (!cachedDampTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 256, 256);

      const rad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
      rad.addColorStop(0, "rgba(28, 36, 30, 0.78)");
      rad.addColorStop(0.4, "rgba(35, 42, 34, 0.55)");
      rad.addColorStop(0.75, "rgba(42, 46, 38, 0.25)");
      rad.addColorStop(1, "rgba(42, 46, 38, 0.0)");

      ctx.fillStyle = rad;
      ctx.beginPath();
      // Irregular organic perimeter
      for (let i = 0; i <= 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const radius = 100 + Math.sin(angle * 5) * 18 + Math.cos(angle * 3) * 12;
        const x = 128 + Math.cos(angle) * radius;
        const y = 128 + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }
    cachedDampTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedDampTexture!;
}

export function ReceptionWaterStreak({
  position,
  rotation = [0, 0, 0],
  scale = [0.35, 1.8],
  opacity = 0.55,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const tex = getWaterLeakTexture();
  if (!tex) return null;

  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={opacity}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-3}
      />
    </mesh>
  );
}

export function ReceptionDampPatch({
  position,
  rotation = [0, 0, 0],
  scale = [0.8, 0.8],
  opacity = 0.5,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const tex = getDampPatchTexture();
  if (!tex) return null;

  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={opacity}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-3}
      />
    </mesh>
  );
}

export function ReceptionRepairPatch({
  position,
  rotation = [0, 0, 0],
  scale = [0.55, 0.4],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Plaster compound patch with subtle border */}
      <mesh receiveShadow position={[0, 0, 0.002]}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshStandardMaterial
          color="#c2bcb0"
          roughness={0.95}
          metalness={0.0}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
      {/* Faint plaster taping edge */}
      <mesh receiveShadow position={[0, 0, 0.003]}>
        <planeGeometry args={[scale[0] + 0.04, scale[1] + 0.04]} />
        <meshBasicMaterial
          color="#9e988c"
          transparent
          opacity={0.35}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
    </group>
  );
}
