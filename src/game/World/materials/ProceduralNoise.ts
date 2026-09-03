import * as THREE from 'three';

// ─── HIGH-FIDELITY PBR TEXTURE SYNTHESIS (ZERO PERIODIC WAVES) ───
// Generates seamless, organic, multi-octave non-periodic surface maps for institutional horror environments.

export type MaterialSurfaceFamily =
  | 'aged-plaster'
  | 'painted-concrete'
  | 'institutional-tile'
  | 'ceiling-acoustic'
  | 'institutional-vinyl'
  | 'painted-metal'
  | 'wood-grain';

const roughnessCache = new Map<string, THREE.CanvasTexture>();
const normalCache = new Map<string, THREE.CanvasTexture>();
const albedoCache = new Map<string, THREE.CanvasTexture>();

// Permutation table for fast non-periodic hash noise
const PERM = new Uint8Array(512);
const P = [
  151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,
  8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
  35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
  134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,
  55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,
  18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,
  250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,
  189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,
  172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
  228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
  107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
];
for (let i = 0; i < 256; i++) {
  PERM[i] = P[i];
  PERM[256 + i] = P[i];
}

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
function grad(hash: number, x: number, y: number) {
  const h = hash & 7;
  const u = h < 4 ? x : y;
  const v = h < 4 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// Seamless Perlin Noise for 2D UV tiles
function seamlessNoise(x: number, y: number, period: number): number {
  const sX = x % period;
  const sY = y % period;
  const X0 = Math.floor(sX) & 255;
  const Y0 = Math.floor(sY) & 255;
  const X1 = (X0 + 1) % period;
  const Y1 = (Y0 + 1) % period;

  const fx = sX - Math.floor(sX);
  const fy = sY - Math.floor(sY);

  const u = fade(fx);
  const v = fade(fy);

  const a = PERM[X0];
  const b = PERM[X1];
  const aa = PERM[(a + Y0) & 255];
  const ab = PERM[(a + Y1) & 255];
  const ba = PERM[(b + Y0) & 255];
  const bb = PERM[(b + Y1) & 255];

  const res = lerp(
    v,
    lerp(u, grad(PERM[aa], fx, fy), grad(PERM[ba], fx - 1, fy)),
    lerp(u, grad(PERM[ab], fx, fy - 1), grad(PERM[bb], fx - 1, fy - 1))
  );
  return (res + 1) * 0.5; // Normalized to 0..1
}

// Multi-octave Fractal Brownian Motion
function fbm(x: number, y: number, octaves = 4, period = 32): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let maxAmp = 0;

  for (let i = 0; i < octaves; i++) {
    value += seamlessNoise(x * frequency, y * frequency, period * frequency) * amplitude;
    maxAmp += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value / maxAmp;
}

// ─── SURFACE MAP GENERATORS ───

function generateSurfaceHeightmap(family: MaterialSurfaceFamily, size = 512): Float32Array {
  const heightmap = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const nx = (x / size) * 16;
      const ny = (y / size) * 16;

      let h = 0.5;

      switch (family) {
        case 'aged-plaster': {
          // Subtle stucco stipple + broad mineral stain variation
          const fineStipple = fbm(nx * 3, ny * 3, 4, 48);
          const broadStain = fbm(nx * 0.75, ny * 0.75, 2, 12);
          h = fineStipple * 0.7 + broadStain * 0.3;
          break;
        }

        case 'painted-concrete': {
          // Aggregate pitting + heavy structural tooth
          const aggregate = fbm(nx * 4, ny * 4, 5, 64);
          const microPit = Math.pow(seamlessNoise(nx * 8, ny * 8, 128), 3);
          h = aggregate * 0.85 - microPit * 0.15;
          break;
        }

        case 'institutional-tile': {
          // Grout grid lines + subtle ceramic surface glaze
          const tileX = (x / size) * 8;
          const tileY = (y / size) * 8;
          const fx = tileX - Math.floor(tileX);
          const fy = tileY - Math.floor(tileY);
          const isGrout = fx < 0.04 || fy < 0.04;
          const ceramicWarp = fbm(nx, ny, 3, 16) * 0.15;
          h = isGrout ? 0.2 : (0.85 + ceramicWarp);
          break;
        }

        case 'ceiling-acoustic': {
          // Acoustic fissured stipple
          const fissures = fbm(nx * 5, ny * 5, 4, 80);
          const pit = seamlessNoise(nx * 10, ny * 10, 160) < 0.3 ? -0.2 : 0;
          h = fissures * 0.8 + pit;
          break;
        }

        case 'institutional-vinyl': {
          // Smooth floor with subtle directional buff lines
          const buff = Math.sin(ny * 12 + fbm(nx * 2, ny * 0.5, 3, 32) * 2) * 0.05;
          const grime = fbm(nx, ny, 3, 16) * 0.1;
          h = 0.5 + buff + grime;
          break;
        }

        case 'painted-metal': {
          // Smooth rolled steel with subtle micro-orange-peel
          const orangePeel = fbm(nx * 6, ny * 6, 3, 96);
          h = orangePeel * 0.2 + 0.5;
          break;
        }

        case 'wood-grain': {
          // Organic directional grain lines
          const grain = Math.sin(nx * 20 + fbm(nx * 2, ny * 8, 4, 32) * 6);
          h = (grain + 1) * 0.5;
          break;
        }
      }

      heightmap[idx] = Math.max(0, Math.min(1, h));
    }
  }

  return heightmap;
}

function createNormalTextureFromHeightmap(heightmap: Float32Array, size: number, strength = 1.0): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;

      // Sobel central difference filter for smooth normal gradients
      const left = heightmap[y * size + ((x - 1 + size) % size)];
      const right = heightmap[y * size + ((x + 1) % size)];
      const up = heightmap[((y - 1 + size) % size) * size + x];
      const down = heightmap[((y + 1) % size) * size + x];

      const dx = (right - left) * strength * 2.0;
      const dy = (down - up) * strength * 2.0;
      const dz = 1.0;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = Math.round(((dx / len) * 0.5 + 0.5) * 255);
      const ny = Math.round(((-dy / len) * 0.5 + 0.5) * 255);
      const nz = Math.round(((dz / len) * 0.5 + 0.5) * 255);

      const pIdx = idx * 4;
      data[pIdx] = nx;
      data[pIdx + 1] = ny;
      data[pIdx + 2] = nz;
      data[pIdx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createRoughnessTextureFromHeightmap(heightmap: Float32Array, size: number, baseRoughness: number, variance = 0.2): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let i = 0; i < heightmap.length; i++) {
    const h = heightmap[i];
    const rVal = Math.max(0, Math.min(255, Math.round((baseRoughness + (h - 0.5) * variance) * 255)));
    const pIdx = i * 4;
    data[pIdx] = rVal;
    data[pIdx + 1] = rVal;
    data[pIdx + 2] = rVal;
    data[pIdx + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createAlbedoTextureFromHeightmap(heightmap: Float32Array, size: number, baseHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  const baseCol = new THREE.Color(baseHex);
  const r0 = Math.round(baseCol.r * 255);
  const g0 = Math.round(baseCol.g * 255);
  const b0 = Math.round(baseCol.b * 255);

  for (let i = 0; i < heightmap.length; i++) {
    const h = heightmap[i];
    const shade = (h - 0.5) * 0.15; // Subtle organic shade variation (+-7.5%)
    const pIdx = i * 4;
    data[pIdx] = Math.max(0, Math.min(255, Math.round(r0 * (1 + shade))));
    data[pIdx + 1] = Math.max(0, Math.min(255, Math.round(g0 * (1 + shade))));
    data[pIdx + 2] = Math.max(0, Math.min(255, Math.round(b0 * (1 + shade))));
    data[pIdx + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// ─── PUBLIC PBR ACCESSORS ───

export function getSurfaceNormal(family: MaterialSurfaceFamily = 'aged-plaster', strength = 1.0): THREE.CanvasTexture | undefined {
  if (typeof document === 'undefined') return undefined;
  const key = `${family}-${strength}`;
  if (!normalCache.has(key)) {
    const hmap = generateSurfaceHeightmap(family, 512);
    const tex = createNormalTextureFromHeightmap(hmap, 512, strength);
    normalCache.set(key, tex);
  }
  return normalCache.get(key);
}

export function getSurfaceRoughness(family: MaterialSurfaceFamily = 'aged-plaster', baseRoughness = 0.85): THREE.CanvasTexture | undefined {
  if (typeof document === 'undefined') return undefined;
  const key = `${family}-${baseRoughness}`;
  if (!roughnessCache.has(key)) {
    const hmap = generateSurfaceHeightmap(family, 512);
    const tex = createRoughnessTextureFromHeightmap(hmap, 512, baseRoughness, 0.2);
    roughnessCache.set(key, tex);
  }
  return roughnessCache.get(key);
}

export function getSurfaceAlbedo(family: MaterialSurfaceFamily = 'aged-plaster', baseHex = '#596057'): THREE.CanvasTexture | undefined {
  if (typeof document === 'undefined') return undefined;
  const key = `${family}-${baseHex}`;
  if (!albedoCache.has(key)) {
    const hmap = generateSurfaceHeightmap(family, 512);
    const tex = createAlbedoTextureFromHeightmap(hmap, 512, baseHex);
    albedoCache.set(key, tex);
  }
  return albedoCache.get(key);
}
