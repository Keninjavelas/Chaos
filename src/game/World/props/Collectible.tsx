import React, { useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useArchiveStore } from "@/lib/state";
import { InteractableObject } from "../../Interactables/InteractableObject";

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
      <InteractableObject
        label={label}
        interactionKind="USE"
        onInteract={() => {
          setCollected(true);
          addInventoryItem(id);
        }}
      >
        <group>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
          
          {/* Subtle item indicator */}
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </group>
      </InteractableObject>
    </RigidBody>
  );
}
