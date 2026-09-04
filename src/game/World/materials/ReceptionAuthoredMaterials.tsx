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

  const repeatX = Math.max(1, args[0] / 2.0);
  const repeatY = Math.max(1, args[1] / 2.0);
  const maps = useClonedPbrMaps("/textures/reception/floor", repeatX, repeatY);

  return (
    <RigidBody type="fixed" position={position}>
      {/* Base Floor Plane — deep brown-grey institutional horror tone */}
      <mesh ref={meshRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.5, 1.5), [])}
          roughnessMap={maps.roughness}
          roughness={0.82}
          metalness={0.03}
          aoMap={maps.ao}
          aoMapIntensity={1.0}
          color="#786c58"
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

  const repeatX = Math.max(1, args[0] / 2.4);
  const repeatY = Math.max(1, args[2] / 2.4);
  const maps = useClonedPbrMaps("/textures/reception/ceiling", repeatX, repeatY);

  const tileColumns = Math.max(1, Math.floor(args[0] / 1.2));
  const tileRows = Math.max(1, Math.floor(args[2] / 1.2));

  return (
    <RigidBody type="fixed" position={position}>
      {/* Main Ceiling Slab — aged stained acoustic tile tone */}
      <mesh ref={meshRef} receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.55, 1.55), [])}
          roughnessMap={maps.roughness}
          roughness={0.97}
          metalness={0.0}
          aoMap={maps.ao}
          aoMapIntensity={0.95}
          color="#868173"
        />
      </mesh>

      {/* Grid framing strips — charcoal metal grid horror tone */}
      {Array.from({ length: tileColumns - 1 }).map((_, index) => (
        <mesh key={`ceiling-column-${index}`} position={[-args[0] / 2 + (index + 1) * 1.2, -args[1] / 2 - 0.006, 0]}>
          <boxGeometry args={[0.02, 0.012, args[2]]} />
          <meshStandardMaterial color="#161815" roughness={0.95} metalness={0.35} />
        </mesh>
      ))}
      {Array.from({ length: tileRows - 1 }).map((_, index) => (
        <mesh key={`ceiling-row-${index}`} position={[0, -args[1] / 2 - 0.006, -args[2] / 2 + (index + 1) * 1.2]}>
          <boxGeometry args={[args[0], 0.012, 0.02]} />
          <meshStandardMaterial color="#161815" roughness={0.95} metalness={0.35} />
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

  const wallSpan = Math.max(args[0], args[2]);
  const wallHeight = args[1];
  const repeatX = Math.max(0.8, wallSpan / 2.5);
  const repeatY = Math.max(0.8, wallHeight / 2.5);

  const maps = useClonedPbrMaps("/textures/reception/wall", repeatX, repeatY);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Moldy grey-green / aged plaster institutional horror base */}
        <mesh ref={meshRef} position={[0, args[1] / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial
            map={maps.diffuse}
            normalMap={maps.normal}
            normalScale={useMemo(() => new THREE.Vector2(1.85, 1.85), [])}
            roughnessMap={maps.roughness}
            roughness={0.93}
            metalness={0.02}
            aoMap={maps.ao}
            aoMapIntensity={1.0}
            color="#989380"
          />
        </mesh>
      </RigidBody>

      {/* Dark charcoal/black metal baseboards with worn metal feel */}
      <mesh position={[0, 0.1, args[2] / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#141817" roughness={0.62} metalness={0.72} />
      </mesh>
      <mesh position={[0, 0.1, -args[2] / 2 - 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#141817" roughness={0.62} metalness={0.72} />
      </mesh>

      {/* Chair Rail — deep brown-black aged laminate */}
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
      {/* Older mismatched plaster repair — different tone from aged wall */}
      <mesh receiveShadow position={[0, 0, 0.002]}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshStandardMaterial
          color="#b0a895"
          roughness={0.96}
          metalness={0.0}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
      {/* Yellowed old tape edge around repair */}
      <mesh receiveShadow position={[0, 0, 0.003]}>
        <planeGeometry args={[scale[0] + 0.04, scale[1] + 0.04]} />
        <meshBasicMaterial
          color="#847a64"
          transparent
          opacity={0.42}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NEW HORROR DECALS — Narrative Surface Decay
// ─────────────────────────────────────────────────────────────────────────────

let cachedPeelingTexture: THREE.CanvasTexture | null = null;

function getPeelingPaintTexture(): THREE.CanvasTexture {
  if (!cachedPeelingTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 256, 256);
      for (let pass = 0; pass < 5; pass++) {
        const cx = 40 + Math.random() * 176;
        const cy = 40 + Math.random() * 176;
        const rx = 25 + Math.random() * 55;
        const ry = 18 + Math.random() * 45;
        const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, Math.max(rx, ry));
        grad.addColorStop(0, "rgba(12, 10, 8, 0.92)");
        grad.addColorStop(0.6, "rgba(28, 24, 20, 0.55)");
        grad.addColorStop(1, "rgba(40, 36, 30, 0.0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
      // Jagged curl edges
      ctx.strokeStyle = "rgba(62, 54, 42, 0.75)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        let x = Math.random() * 256;
        let y = Math.random() * 256;
        ctx.moveTo(x, y);
        for (let s = 0; s < 6; s++) {
          x += (Math.random() - 0.5) * 30;
          y += (Math.random() - 0.5) * 30;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    cachedPeelingTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedPeelingTexture!;
}

export function ReceptionPeelingPaint({
  position,
  rotation = [0, 0, 0],
  scale = [0.6, 0.5],
  opacity = 0.85,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const tex = getPeelingPaintTexture();
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

let cachedGrimeTexture: THREE.CanvasTexture | null = null;

function getGrimeCornerTexture(): THREE.CanvasTexture {
  if (!cachedGrimeTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 256, 512);
      // Heavy concentration at bottom/top edge, soft vertical fade
      const vert = ctx.createLinearGradient(0, 0, 0, 512);
      vert.addColorStop(0.0, "rgba(14, 12, 10, 0.82)");
      vert.addColorStop(0.15, "rgba(18, 16, 14, 0.62)");
      vert.addColorStop(0.4, "rgba(22, 20, 18, 0.28)");
      vert.addColorStop(0.7, "rgba(28, 26, 22, 0.08)");
      vert.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
      ctx.fillStyle = vert;
      ctx.fillRect(0, 0, 256, 512);
      // Dark heavy band
      const band = ctx.createLinearGradient(0, 0, 256, 0);
      band.addColorStop(0, "rgba(0,0,0,0.0)");
      band.addColorStop(0.2, "rgba(8, 6, 4, 0.4)");
      band.addColorStop(0.5, "rgba(8, 6, 4, 0.55)");
      band.addColorStop(0.8, "rgba(8, 6, 4, 0.4)");
      band.addColorStop(1, "rgba(0,0,0,0.0)");
      ctx.fillStyle = band;
      ctx.fillRect(0, 0, 256, 40);
      // Speckles
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 200;
        const r = 0.5 + Math.random() * 2;
        ctx.fillStyle = `rgba(6, 5, 4, ${0.3 + Math.random() * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    cachedGrimeTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedGrimeTexture!;
}

export function ReceptionGrimeBand({
  position,
  rotation = [0, 0, 0],
  scale = [4.0, 0.9],
  opacity = 0.55,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const tex = getGrimeCornerTexture();
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

let cachedRustTexture: THREE.CanvasTexture | null = null;

function getRustBleedTexture(): THREE.CanvasTexture {
  if (!cachedRustTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 384;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 128, 384);
      const grad = ctx.createLinearGradient(0, 0, 0, 384);
      grad.addColorStop(0, "rgba(90, 38, 16, 0.78)");
      grad.addColorStop(0.25, "rgba(110, 52, 22, 0.58)");
      grad.addColorStop(0.55, "rgba(88, 44, 20, 0.28)");
      grad.addColorStop(0.8, "rgba(66, 34, 16, 0.1)");
      grad.addColorStop(1, "rgba(0,0,0,0.0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(44, 0);
      ctx.bezierCurveTo(36, 90, 58, 190, 60, 370);
      ctx.lineTo(80, 370);
      ctx.bezierCurveTo(82, 200, 96, 100, 88, 0);
      ctx.closePath();
      ctx.fill();
      // Side rivulet trails
      ctx.fillStyle = "rgba(76, 34, 16, 0.38)";
      ctx.fillRect(32, 0, 5, 180);
      ctx.fillRect(92, 0, 4, 220);
      ctx.fillRect(22, 14, 3, 80);
      ctx.fillRect(102, 30, 4, 140);
    }
    cachedRustTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedRustTexture!;
}

export function ReceptionRustBleed({
  position,
  rotation = [0, 0, 0],
  scale = [0.28, 1.2],
  opacity = 0.7,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const tex = getRustBleedTexture();
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

let cachedCeilingStainTexture: THREE.CanvasTexture | null = null;

function getCeilingStainTexture(): THREE.CanvasTexture {
  if (!cachedCeilingStainTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 512, 256);
      // Long horizontal pipe-run discoloration
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0.0, "rgba(0,0,0,0.0)");
      grad.addColorStop(0.3, "rgba(32, 26, 18, 0.2)");
      grad.addColorStop(0.5, "rgba(44, 36, 26, 0.58)");
      grad.addColorStop(0.7, "rgba(32, 26, 18, 0.2)");
      grad.addColorStop(1.0, "rgba(0,0,0,0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);
      // Concentrated darker blobs along the center
      for (let i = 0; i < 6; i++) {
        const cx = 40 + i * 85 + (Math.random() - 0.5) * 40;
        const cy = 128 + (Math.random() - 0.5) * 60;
        const r = 25 + Math.random() * 40;
        const blob = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
        blob.addColorStop(0, "rgba(22, 18, 14, 0.78)");
        blob.addColorStop(0.5, "rgba(38, 32, 24, 0.35)");
        blob.addColorStop(1, "rgba(0,0,0,0.0)");
        ctx.fillStyle = blob;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    cachedCeilingStainTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedCeilingStainTexture!;
}

export function ReceptionCeilingPipeStain({
  position,
  rotation = [0, 0, 0],
  scale = [4.5, 0.8],
  opacity = 0.65,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const tex = getCeilingStainTexture();
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
