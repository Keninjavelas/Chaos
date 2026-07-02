import React from 'react';
import { HorrorMaterial } from '../materials/HorrorMaterial';

interface PropProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function VendingMachine({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Body */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.0, 0.8]} />
        <HorrorMaterial color="#1a1a1a" metalness={0.7} roughness={0.6} noiseScale={3.0} />
      </mesh>
      {/* Glass Front (Smashed/Dirty) */}
      <mesh position={[0, 1.2, 0.41]}>
        <planeGeometry args={[1.0, 1.2]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Light Panel (Flickering/Dim) */}
      <mesh position={[0, 1.9, 0.41]}>
        <boxGeometry args={[1.0, 0.15, 0.05]} />
        <meshStandardMaterial color="#fff" emissive="#ffddaa" emissiveIntensity={0.2} />
      </mesh>
      <pointLight position={[0, 1.9, 0.6]} color="#ffddaa" intensity={0.5} distance={3} decay={2} />
      
      {/* Base/Vent */}
      <mesh position={[0, 0.15, 0.41]}>
        <boxGeometry args={[1.2, 0.3, 0.05]} />
        <HorrorMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function MedicalCart({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cart Base/Shelves */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.05, 0.5]} />
        <HorrorMaterial color="#cccccc" metalness={0.8} roughness={0.5} noiseScale={4.0} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.05, 0.5]} />
        <HorrorMaterial color="#cccccc" metalness={0.8} roughness={0.5} noiseScale={4.0} />
      </mesh>
      
      {/* Poles */}
      <mesh position={[-0.35, 0.45, -0.2]} castShadow receiveShadow><cylinderGeometry args={[0.02, 0.02, 0.9]} /><HorrorMaterial color="#999" metalness={0.9} /></mesh>
      <mesh position={[0.35, 0.45, -0.2]} castShadow receiveShadow><cylinderGeometry args={[0.02, 0.02, 0.9]} /><HorrorMaterial color="#999" metalness={0.9} /></mesh>
      <mesh position={[-0.35, 0.45, 0.2]} castShadow receiveShadow><cylinderGeometry args={[0.02, 0.02, 0.9]} /><HorrorMaterial color="#999" metalness={0.9} /></mesh>
      <mesh position={[0.35, 0.45, 0.2]} castShadow receiveShadow><cylinderGeometry args={[0.02, 0.02, 0.9]} /><HorrorMaterial color="#999" metalness={0.9} /></mesh>
      
      {/* Wheels */}
      <mesh position={[-0.35, 0.05, -0.2]} rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.05, 0.05, 0.02]} /><HorrorMaterial color="#111" /></mesh>
      <mesh position={[0.35, 0.05, -0.2]} rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.05, 0.05, 0.02]} /><HorrorMaterial color="#111" /></mesh>
      <mesh position={[-0.35, 0.05, 0.2]} rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.05, 0.05, 0.02]} /><HorrorMaterial color="#111" /></mesh>
      <mesh position={[0.35, 0.05, 0.2]} rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.05, 0.05, 0.02]} /><HorrorMaterial color="#111" /></mesh>

      {/* Clutter on top shelf */}
      <mesh position={[-0.2, 0.75, 0]} castShadow><boxGeometry args={[0.2, 0.1, 0.15]} /><HorrorMaterial color="#7a2a2a" roughness={0.8} /></mesh>
      <mesh position={[0.2, 0.8, -0.1]} rotation={[Math.PI/2, 0.2, 0]} castShadow><cylinderGeometry args={[0.04, 0.04, 0.15]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.6} /></mesh>
    </group>
  );
}

export function FallenLocker({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Fallen locker lying on the ground */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI/2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.0, 0.6]} />
        <HorrorMaterial color="#3a4a5a" metalness={0.7} roughness={0.6} noiseScale={4.0} />
      </mesh>
      
      {/* Door swung open */}
      <mesh position={[0, 0.55, -0.75]} rotation={[-Math.PI/2 + 0.3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 1.9, 0.05]} />
        <HorrorMaterial color="#3a4a5a" metalness={0.7} roughness={0.6} noiseScale={4.0} />
      </mesh>
    </group>
  );
}

export function TrashBin({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.2, 0.8, 16]} />
        <HorrorMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      {/* Black rim */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.25, 0.02, 8, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

export function CleaningTrolley({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.05, 0.9]} />
        <HorrorMaterial color="#1a5276" roughness={0.7} />
      </mesh>
      {/* Wheels */}
      {[-0.25, 0.25].map(x => [-0.4, 0.4].map(z => (
        <mesh key={`${x}-${z}`} position={[x, 0.05, z]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      )))}
      {/* Handle */}
      <mesh position={[0, 0.6, -0.4]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.0]} />
        <meshStandardMaterial color="#888" metalness={0.8} />
      </mesh>
      <mesh position={[-0.25, 0.6, -0.4]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.0]} />
        <meshStandardMaterial color="#888" metalness={0.8} />
      </mesh>
      <mesh position={[0.25, 0.6, -0.4]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.0]} />
        <meshStandardMaterial color="#888" metalness={0.8} />
      </mesh>
      {/* Mop Bucket */}
      <mesh position={[0, 0.3, 0.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4]} />
        <meshStandardMaterial color="#f1c40f" roughness={0.6} />
      </mesh>
      {/* Mop handle sticking out */}
      <mesh position={[0.1, 0.8, 0.2]} rotation={[0.2, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.2]} />
        <meshStandardMaterial color="#d4ac0d" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function WaterDispenser({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base unit */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.35, 1.0, 0.35]} />
        <meshStandardMaterial color="#e5e8e8" roughness={0.7} />
      </mesh>
      {/* Drip tray */}
      <mesh position={[0, 0.4, 0.18]} castShadow>
        <boxGeometry args={[0.25, 0.05, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Water Jug (Empty/Dirty) */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4]} />
        <meshPhysicalMaterial color="#aed6f1" transmission={0.9} opacity={1} roughness={0.2} ior={1.3} thickness={0.05} />
      </mesh>
    </group>
  );
}
