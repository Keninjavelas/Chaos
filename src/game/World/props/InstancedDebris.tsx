import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { HorrorMaterial } from '../materials/HorrorMaterial';

interface InstancedDebrisProps {
  count?: number;
  areaSize?: [number, number];
  position?: [number, number, number];
  type?: 'paper' | 'rubble' | 'blood';
}

export function InstancedDebris({ count = 200, areaSize = [20, 20], position = [0, -0.49, 0], type = 'paper' }: InstancedDebrisProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < count; i++) {
      // Random position within area Size
      const x = (Math.random() - 0.5) * areaSize[0];
      const z = (Math.random() - 0.5) * areaSize[1];
      
      // Random rotation
      const rotY = Math.random() * Math.PI * 2;
      
      // Setup the dummy
      dummy.position.set(x, 0, z);
      
      if (type === 'paper') {
        dummy.rotation.set(-Math.PI / 2, 0, rotY);
        // Random slight scale variation
        const scale = 0.8 + Math.random() * 0.4;
        dummy.scale.set(scale, scale, scale);
      } else if (type === 'rubble') {
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = 0.5 + Math.random() * 1.5;
        dummy.scale.set(scale, scale, scale);
      } else if (type === 'blood') {
        dummy.rotation.set(-Math.PI / 2, 0, rotY);
        const scale = 1.0 + Math.random() * 3.0;
        dummy.scale.set(scale, scale, scale);
      }
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, areaSize, type, dummy]);

  return (
    <group position={position}>
      {type === 'paper' && (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} receiveShadow>
          <planeGeometry args={[0.21, 0.297]} /> {/* A4 Size approx */}
          <HorrorMaterial color="#d4d0c8" roughness={0.9} noiseScale={5.0} bumpStrength={0.1} />
        </instancedMesh>
      )}
      
      {type === 'rubble' && (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
          <dodecahedronGeometry args={[0.1, 0]} />
          <HorrorMaterial color="#444444" roughness={1.0} noiseScale={10.0} bumpStrength={1.5} />
        </instancedMesh>
      )}

      {type === 'blood' && (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} receiveShadow>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial color="#3a0505" transparent opacity={0.7} depthWrite={false} />
        </instancedMesh>
      )}
    </group>
  );
}
