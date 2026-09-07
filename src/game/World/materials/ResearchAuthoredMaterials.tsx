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

    const roughness = textureLoader.load(`${dir}/roughness.jpg`);
    roughness.wrapS = THREE.RepeatWrapping;
    roughness.wrapT = THREE.RepeatWrapping;
    roughness.colorSpace = THREE.NoColorSpace;
    roughness.anisotropy = 8;

    const ao = textureLoader.load(`${dir}/ao.jpg`);
    ao.wrapS = THREE.RepeatWrapping;
    ao.wrapT = THREE.RepeatWrapping;
    ao.colorSpace = THREE.NoColorSpace;
    ao.anisotropy = 8;

    cachedBaseTextures[dir] = { diffuse, normal, roughness, ao };
  }
  return cachedBaseTextures[dir];
}

function useClonedPbrMaps(dir: string, repeatX: number, repeatY: number): PbrTextureMaps {
  return useMemo(() => {
    const base = getBasePbrTextures(dir);
    const cloneMap = (tex: THREE.Texture) => {
      const next = tex.clone();
      next.repeat.set(repeatX, repeatY);
      next.needsUpdate = true;
      return next;
    };
    return {
      diffuse: cloneMap(base.diffuse),
      normal: cloneMap(base.normal),
      roughness: cloneMap(base.roughness),
      ao: cloneMap(base.ao),
    };
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

export function ResearchHeroFloor({ position = [0, -0.5, 0], args = [5.5, 6.5] }: { position?: [number, number, number]; args?: [number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);
  const maps = useClonedPbrMaps("/textures/reception/floor", Math.max(1, args[0] / 2), Math.max(1, args[1] / 2));

  return (
    <RigidBody type="fixed" position={position}>
      <mesh ref={meshRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.4, 1.4), [])}
          roughnessMap={maps.roughness}
          roughness={0.88}
          metalness={0.04}
          aoMap={maps.ao}
          aoMapIntensity={1.05}
          color="#3f4642"
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[args[0], 1, args[1]]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
}

export function ResearchHeroCeiling({ position = [0, 2.9, 0], args = [5.5, 0.1, 6.5] }: { position?: [number, number, number]; args?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);
  const maps = useClonedPbrMaps("/textures/reception/ceiling", Math.max(1, args[0] / 2.4), Math.max(1, args[2] / 2.4));

  return (
    <RigidBody type="fixed" position={position}>
      <mesh ref={meshRef} receiveShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial
          map={maps.diffuse}
          normalMap={maps.normal}
          normalScale={useMemo(() => new THREE.Vector2(1.45, 1.45), [])}
          roughnessMap={maps.roughness}
          roughness={0.98}
          metalness={0}
          aoMap={maps.ao}
          aoMapIntensity={0.9}
          color="#6a7068"
        />
      </mesh>
    </RigidBody>
  );
}

export function ResearchHeroWall({ position, rotation = [0, 0, 0], args }: { position: [number, number, number]; rotation?: [number, number, number]; args: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useEnsureUv2(meshRef);
  const maps = useClonedPbrMaps("/textures/reception/wall", Math.max(0.8, Math.max(args[0], args[2]) / 2.5), Math.max(0.8, args[1] / 2.5));

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        <mesh ref={meshRef} position={[0, args[1] / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial
            map={maps.diffuse}
            normalMap={maps.normal}
            normalScale={useMemo(() => new THREE.Vector2(1.7, 1.7), [])}
            roughnessMap={maps.roughness}
            roughness={0.95}
            metalness={0.02}
            aoMap={maps.ao}
            aoMapIntensity={1}
            color="#7a8178"
          />
        </mesh>
      </RigidBody>
      <mesh position={[0, 0.1, args[2] / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#121616" roughness={0.65} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.1, -args[2] / 2 - 0.01]} receiveShadow>
        <boxGeometry args={[args[0], 0.2, 0.04]} />
        <meshStandardMaterial color="#121616" roughness={0.65} metalness={0.7} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESEARCH DECAY DECALS — institutional horror atmosphere for lab spaces
// ─────────────────────────────────────────────────────────────────────────────

// Shared organic vertical water streak texture for ceiling leaks
let cachedResearchWaterTexture: THREE.CanvasTexture | null = null;

function getResearchWaterStainTexture(): THREE.CanvasTexture {
  if (!cachedResearchWaterTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 128, 512);

      // Water stain gradient — cooler, more industrial tone for lab
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, "rgba(45, 55, 58, 0.80)");
      grad.addColorStop(0.25, "rgba(42, 52, 54, 0.65)");
      grad.addColorStop(0.6, "rgba(38, 48, 50, 0.40)");
      grad.addColorStop(0.9, "rgba(32, 40, 42, 0.15)");
      grad.addColorStop(1.0, "rgba(25, 32, 34, 0.0)");

      ctx.fillStyle = grad;
      // Main central drip body — more angular for lab aesthetic
      ctx.beginPath();
      ctx.moveTo(38, 0);
      ctx.bezierCurveTo(44, 130, 50, 290, 54, 485);
      ctx.lineTo(74, 485);
      ctx.bezierCurveTo(78, 290, 84, 130, 90, 0);
      ctx.closePath();
      ctx.fill();

      // Side trails — thinner for lab look
      ctx.fillStyle = "rgba(35, 45, 48, 0.35)";
      ctx.fillRect(30, 0, 7, 150);
      ctx.fillRect(91, 0, 5, 200);
    }
    cachedResearchWaterTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedResearchWaterTexture!;
}

// Shared organic damp patch texture for wall corners
let cachedResearchDampTexture: THREE.CanvasTexture | null = null;

function getResearchDampTexture(): THREE.CanvasTexture {
  if (!cachedResearchDampTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 256, 256);

      const rad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
      rad.addColorStop(0, "rgba(30, 42, 46, 0.72)");
      rad.addColorStop(0.45, "rgba(35, 48, 52, 0.50)");
      rad.addColorStop(0.75, "rgba(40, 52, 56, 0.22)");
      rad.addColorStop(1, "rgba(42, 54, 58, 0.0)");

      ctx.fillStyle = rad;
      ctx.beginPath();
      // Irregular organic perimeter
      for (let i = 0; i <= 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 95 + Math.sin(angle * 4) * 15 + Math.cos(angle * 3) * 10;
        const x = 128 + Math.cos(angle) * radius;
        const y = 128 + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }
    cachedResearchDampTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedResearchDampTexture!;
}

// Shared peeling paint texture
let cachedResearchPeelingTexture: THREE.CanvasTexture | null = null;

function getResearchPeelingTexture(): THREE.CanvasTexture {
  if (!cachedResearchPeelingTexture && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 256, 256);
      for (let pass = 0; pass < 4; pass++) {
        const cx = 40 + Math.random() * 176;
        const cy = 40 + Math.random() * 176;
        const rx = 20 + Math.random() * 45;
        const ry = 15 + Math.random() * 38;
        const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, Math.max(rx, ry));
        grad.addColorStop(0, "rgba(15, 18, 20, 0.88)");
        grad.addColorStop(0.6, "rgba(30, 36, 40, 0.50)");
        grad.addColorStop(1, "rgba(42, 48, 52, 0.0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
      // Jagged curl edges — darker for lab
      ctx.strokeStyle = "rgba(50, 58, 64, 0.65)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        let x = Math.random() * 256;
        let y = Math.random() * 256;
        ctx.moveTo(x, y);
        for (let s = 0; s < 5; s++) {
          x += (Math.random() - 0.5) * 28;
          y += (Math.random() - 0.5) * 28;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    cachedResearchPeelingTexture = new THREE.CanvasTexture(canvas);
  }
  return cachedResearchPeelingTexture!;
}

export function ResearchWaterStain({
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
  const tex = getResearchWaterStainTexture();
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

export function ResearchDampPatch({
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
  const tex = getResearchDampTexture();
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

export function ResearchPeelingPaint({
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
  const tex = getResearchPeelingTexture();
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
