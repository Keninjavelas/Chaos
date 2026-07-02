import React from 'react';
import { ThreeElements } from '@react-three/fiber';
import { getProceduralRoughness, getProceduralNormal } from './ProceduralNoise';
import * as THREE from 'three';

interface HorrorMaterialProps extends Omit<ThreeElements['meshStandardMaterial'], 'color'> {
  color?: string | THREE.Color;
  roughness?: number;
  metalness?: number;
  noiseScale?: number;
  bumpStrength?: number;
  roughnessVariance?: number;
}

export function HorrorMaterial({
  color = '#ffffff',
  roughness = 0.8,
  metalness = 0.0,
  noiseScale = 4.0,
  bumpStrength = 1.0,
  roughnessVariance = 1.0,
  ...props
}: HorrorMaterialProps) {
  // Use the scale-cached textures directly without cloning
  const roughnessMap = getProceduralRoughness(noiseScale);
  const normalMap = getProceduralNormal(noiseScale);

  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      roughnessMap={roughnessMap}
      normalMap={normalMap}
      normalScale={new THREE.Vector2(bumpStrength, bumpStrength)}
      {...props}
    />
  );
}
