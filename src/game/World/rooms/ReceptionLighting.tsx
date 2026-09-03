import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useArchiveStore } from "@/lib/state";

function FluorescentHumLight({ position, color, castShadow = false }: { position: [number, number, number], color: string, castShadow?: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);
  
  useFrame((_, delta) => {
    if (lightRef.current) {
      timeRef.current += delta;
      // Realistic tube ballast hum with minor micro-fluctuations (keeps textures constantly readable)
      const hum = Math.sin(timeRef.current * 12) * 0.15;
      const microJitter = (Math.random() - 0.5) * 0.1;
      const rareFlutter = Math.random() > 0.992 ? 0.6 : 1.0;
      lightRef.current.intensity = (4.6 + hum + microJitter) * rareFlutter;
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      position={position} 
      intensity={4.6} 
      color={color} 
      distance={14} 
      decay={1.8} 
      castShadow={castShadow} 
      shadow-mapSize={[1024, 1024]} 
      shadow-bias={-0.001} 
    />
  );
}

export function ReceptionLighting() {
  const { isBlackout } = useArchiveStore();

  if (isBlackout) return null;

  return (
    <group>
      {/* 1. Primary Overhead Tube Fixture (Dirty fluorescent warm white) */}
      <FluorescentHumLight position={[0, 2.85, 1.2]} color="#ece4d6" />
      
      {/* 2. West Wall Grazing Lights (Crucial: strikes West wall plaster at angle to pop normal maps and cracks) */}
      <pointLight
        position={[-3.8, 2.65, 2.2]}
        intensity={3.6}
        distance={7}
        decay={1.8}
        color="#e8dfce"
      />
      <pointLight
        position={[-3.8, 2.65, -2.4]}
        intensity={2.8}
        distance={6.5}
        decay={1.8}
        color="#ded5c4"
      />

      {/* 3. East Wall Grazing Lights (Waiting area & refreshment zone) */}
      <pointLight
        position={[3.8, 2.65, 1.5]}
        intensity={3.2}
        distance={7}
        decay={1.8}
        color="#dce2dc"
      />
      <pointLight
        position={[3.8, 2.65, -2.4]}
        intensity={2.6}
        distance={6.5}
        decay={1.8}
        color="#d6ddd8"
      />

      {/* 4. South Wall Entry Grazing Light (Illuminates entry wall behind player at start) */}
      <pointLight
        position={[0, 2.65, 4.0]}
        intensity={2.8}
        distance={6}
        decay={2.0}
        color="#e4dacf"
      />

      {/* 5. Ceiling Soft Indirect Bounce (Softens charcoal shadows, reveals ceiling panel texture) */}
      <pointLight
        position={[0, 1.8, 0]}
        intensity={1.8}
        distance={7.0}
        decay={2.0}
        color="#a89e8b"
      />

      {/* 6. Desk Lamp (Warm incandescent amber, casts specular pool on desk and floor tiles) */}
      <spotLight 
        position={[-0.5, 1.25, -1.5]} 
        intensity={12.0} 
        angle={0.78} 
        penumbra={0.9} 
        distance={8.5} 
        decay={1.8}
        color="#ffd5a8" 
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      {/* Target for desk lamp pointing straight down */}
      <mesh position={[-0.5, 0, -1.5]} visible={false}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
      </mesh>

      {/* 7. Elevator Gate Moody Accent (Depth cue into sublevel elevator lobby) */}
      <pointLight 
        position={[0, 2.5, -4.6]} 
        intensity={3.0} 
        color="#183658" 
        distance={6} 
        decay={2}
      />
    </group>
  );
}
