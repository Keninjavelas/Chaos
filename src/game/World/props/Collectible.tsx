import React, { useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useArchiveStore } from "@/lib/state";

interface CollectibleProps {
  id: string;
  position: [number, number, number];
  color?: string;
  label: string;
}

export function Collectible({ id, position, color = "#ffea00", label }: CollectibleProps) {
  const [collected, setCollected] = useState(false);
  const { addInventoryItem } = useArchiveStore();

  if (collected) return null;

  return (
    <RigidBody type="fixed" position={position}>
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
        onClick={(e) => { 
          e.stopPropagation(); 
          setCollected(true);
          addInventoryItem(id);
          document.body.style.cursor = 'auto';
        }}
      >
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      
      {/* Floating indicator */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </RigidBody>
  );
}
