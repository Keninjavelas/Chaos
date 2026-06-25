import React, { useState, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";

interface InteractableObjectProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
  label: string;
  color?: string;
  onInteract: () => void;
}

export function InteractableObject({ position, rotation = [0,0,0], size, label, color = "#222", onInteract }: InteractableObjectProps) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e') {
        onInteract();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hovered, onInteract]);

  return (
    <RigidBody type="fixed" position={position} rotation={rotation}>
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onInteract(); }} // Support mouse click too
      >
        <boxGeometry args={size} />
        <meshStandardMaterial color={hovered ? "#444" : color} roughness={0.9} />
        
        {hovered && (
          <Html center position={[0, size[1] / 2 + 0.3, 0]} className="pointer-events-none">
            <div style={{ color: "white", fontFamily: "monospace", fontSize: "14px", background: "rgba(0,0,0,0.8)", padding: "4px 8px", border: "1px solid #555" }}>
              [E] {label}
            </div>
          </Html>
        )}
      </mesh>
    </RigidBody>
  );
}
