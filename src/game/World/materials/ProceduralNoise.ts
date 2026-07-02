import * as THREE from 'three';

// Cache the generated textures by scale so we reuse exact instances
const roughnessCache = new Map<number, THREE.CanvasTexture>();
const normalCache = new Map<number, THREE.CanvasTexture>();
const colorNoiseCache = new Map<number, THREE.CanvasTexture>();

function generateNoiseData(size: number, scale: number = 1.0) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return canvas;

  const imgData = context.createImageData(size, size);
  const data = imgData.data;

  // Generate basic fractal noise
  for (let i = 0; i < data.length; i += 4) {
    // Generate layered noise for more natural organic look (scratches/grime)
    const val = Math.random();
    const val2 = Math.random();
    
    // Combine for a dirty, scratchy output
    const intensity = Math.floor(((val * 0.8) + (val2 * 0.2)) * 255);

    data[i] = intensity;     // R
    data[i + 1] = intensity; // G
    data[i + 2] = intensity; // B
    data[i + 3] = 255;       // A
  }

  context.putImageData(imgData, 0, 0);
  return canvas;
}

function generateNormalData(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return canvas;

  const imgData = context.createImageData(size, size);
  const data = imgData.data;

  // A very subtle normal map generation
  for (let i = 0; i < data.length; i += 4) {
    // Default normal is 128, 128, 255 (pointing straight up)
    // We add slight high-frequency noise to simulate micro-bumps and plaster texture
    const nx = Math.floor(128 + (Math.random() - 0.5) * 40);
    const ny = Math.floor(128 + (Math.random() - 0.5) * 40);
    
    data[i] = nx;     // R (X)
    data[i + 1] = ny; // G (Y)
    data[i + 2] = 255;// B (Z)
    data[i + 3] = 255;// A
  }

  context.putImageData(imgData, 0, 0);
  return canvas;
}

export function getProceduralRoughness(scale: number = 4.0) {
  if (typeof document === 'undefined') return undefined; // Protect against SSR
  if (!roughnessCache.has(scale)) {
    const canvas = generateNoiseData(512);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(scale, scale);
    tex.needsUpdate = true;
    roughnessCache.set(scale, tex);
  }
  return roughnessCache.get(scale);
}

export function getProceduralNormal(scale: number = 4.0) {
  if (typeof document === 'undefined') return undefined; // Protect against SSR
  if (!normalCache.has(scale)) {
    const canvas = generateNormalData(512);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(scale, scale);
    tex.needsUpdate = true;
    normalCache.set(scale, tex);
  }
  return normalCache.get(scale);
}

export function getProceduralColorNoise(scale: number = 4.0) {
  if (typeof document === 'undefined') return undefined; // Protect against SSR
  if (!colorNoiseCache.has(scale)) {
    const canvas = generateNoiseData(512, 0.5);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(scale, scale);
    tex.needsUpdate = true;
    colorNoiseCache.set(scale, tex);
  }
  return colorNoiseCache.get(scale);
}
