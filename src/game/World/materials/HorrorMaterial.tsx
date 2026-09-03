import React from 'react';
import { ThreeElements } from '@react-three/fiber';
import { getSurfaceNormal, getSurfaceRoughness, getSurfaceAlbedo, MaterialSurfaceFamily } from './ProceduralNoise';
import * as THREE from 'three';

interface HorrorMaterialProps extends Omit<ThreeElements['meshStandardMaterial'], 'color'> {
  color?: string | THREE.Color;
  roughness?: number;
  metalness?: number;
  bumpStrength?: number;
  noiseScale?: number;
  family?: MaterialSurfaceFamily;
  colorVariation?: boolean;
}

export function HorrorMaterial({
  color = '#687265',
  roughness = 0.85,
  metalness = 0.0,
  bumpStrength = 0.35,
  family = 'aged-plaster',
  colorVariation = true,
  ...props
}: HorrorMaterialProps) {
  const colorHex = typeof color === 'string' ? color : `#${color.getHexString()}`;
  const roughnessMap = getSurfaceRoughness(family, roughness);
  const normalMap = getSurfaceNormal(family, bumpStrength);
  const albedoMap = colorVariation ? getSurfaceAlbedo(family, colorHex) : undefined;

  const normalScaleVec = React.useMemo(() => new THREE.Vector2(bumpStrength, bumpStrength), [bumpStrength]);

  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      roughnessMap={roughnessMap}
      normalMap={normalMap}
      map={albedoMap}
      normalScale={normalScaleVec}
      {...props}
    />
  );
}
