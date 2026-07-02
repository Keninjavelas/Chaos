import React from "react";
import * as THREE from "three";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";

export function CoffeeMug({ position, rotation = [0, 0, 0], spilled = false }: { position: [number, number, number], rotation?: [number, number, number], spilled?: boolean }) {
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      {/* Mug Body */}
      <mesh position={[0, spilled ? 0.04 : 0.05, 0]} rotation={spilled ? [Math.PI / 2, 0, 0] : [0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[spilled ? 0 : 0.04, spilled ? 0.06 : 0.05, spilled ? -0.04 : 0]} rotation={spilled ? [Math.PI / 2, 0, 0] : [0, 0, 0]} castShadow>
        <torusGeometry args={[0.02, 0.006, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Spilled liquid */}
      {spilled && (
        <mesh position={[0, 0.001, -0.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.15, 0.2]} />
          <meshStandardMaterial color="#301b0d" roughness={0.1} metalness={0.8} />
        </mesh>
      )}
    </group>
  );
}

export function Pen({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation as [number, number, number]} castShadow>
      <cylinderGeometry args={[0.004, 0.004, 0.14, 8]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
    </mesh>
  );
}

export function StickyNote({ position, rotation = [0, 0, 0], color = "#fcf383" }: { position: [number, number, number], rotation?: [number, number, number], color?: string }) {
  return (
    <mesh position={position} rotation={rotation as [number, number, number]} receiveShadow>
      <planeGeometry args={[0.076, 0.076]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}

export function EmployeeID({ position, rotation = [0, 0, 0], name = "A. Vance" }: { position: [number, number, number], rotation?: [number, number, number], name?: string }) {
  const inspectDocument = useGameState((state) => state.inspectDocument);
  
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      <InteractableObject 
        interactionRange={1.5}
        label="Read ID Badge"
        onInteract={() => inspectDocument({
          id: "ID-BADGE-01",
          title: "EMPLOYEE ID",
          type: "note",
          content: `AUXILIUM ASYLUM\n\nName: ${name}\nDept: Records\nClearance: LEVEL 2\n\nStatus: TERMINATED`
        })}
      >
        <group>
        {/* Lanyard Clip */}
        <mesh position={[0, 0.045, 0.001]} castShadow>
          <boxGeometry args={[0.015, 0.01, 0.002]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Badge Card */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.054, 0.086, 0.001]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.5} />
        </mesh>
        {/* Photo silhouette */}
        <mesh position={[-0.012, 0.015, 0.0006]} receiveShadow>
          <planeGeometry args={[0.02, 0.025]} />
          <meshStandardMaterial color="#444" roughness={0.8} />
        </mesh>
        {/* Text lines */}
        <mesh position={[0.01, 0.02, 0.0006]} receiveShadow>
          <planeGeometry args={[0.015, 0.002]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0.01, 0.015, 0.0006]} receiveShadow>
          <planeGeometry args={[0.015, 0.002]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>
    </InteractableObject>
    </group>
  );
}

export function Keyboard({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation as [number, number, number]} castShadow receiveShadow>
      <boxGeometry args={[0.45, 0.02, 0.15]} />
      <meshStandardMaterial color="#c0c0b8" roughness={0.9} />
      {/* Keys block */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.42, 0.01, 0.12]} />
        <meshStandardMaterial color="#a0a098" roughness={0.9} />
      </mesh>
    </mesh>
  );
}

export function CRTMonitor({ position, rotation = [0, 0, 0], on = false }: { position: [number, number, number], rotation?: [number, number, number], on?: boolean }) {
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.04, 0.2]} />
        <meshStandardMaterial color="#b0b0a8" roughness={0.9} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.06]} />
        <meshStandardMaterial color="#909088" roughness={0.9} />
      </mesh>
      {/* Monitor Body */}
      <mesh position={[0, 0.22, 0]} rotation={[-0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.3, 0.4]} />
        <meshStandardMaterial color="#c0c0b8" roughness={0.9} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.22, 0.201]} rotation={[-0.1, 0, 0]} receiveShadow>
        <planeGeometry args={[0.34, 0.24]} />
        <meshStandardMaterial color={on ? "#112211" : "#111"} emissive={on ? "#33ff33" : "#000"} emissiveIntensity={on ? 2 : 0} roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export function DeskPhone({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      {/* Phone Base */}
      <mesh position={[0, 0.03, 0]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.06, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Handset */}
      <mesh position={[-0.07, 0.07, 0]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 0.04, 0.22]} />
        <meshStandardMaterial color="#111" roughness={0.7} />
      </mesh>
      {/* Dial Pad Area */}
      <mesh position={[0.03, 0.065, 0.05]} rotation={[0.1, 0, 0]}>
        <planeGeometry args={[0.08, 0.1]} />
        <meshStandardMaterial color="#333" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function Intercom({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      <mesh position={[0, 0.05, 0]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.1, 0.1]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      {/* Speaker Grill */}
      <mesh position={[0, 0.05, 0.051]} rotation={[0.2, 0, 0]}>
        <planeGeometry args={[0.12, 0.06]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      {/* Button */}
      <mesh position={[0, 0.08, -0.02]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.06]} />
        <meshStandardMaterial color="#800" roughness={0.6} />
      </mesh>
    </group>
  );
}

export function Bell({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      {/* Base */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      {/* Dome */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.04, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Button */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.02]} />
        <meshStandardMaterial color="#888" roughness={0.4} metalness={0.9} />
      </mesh>
    </group>
  );
}

export function WallSign({ position, rotation = [0, 0, 0], text = "NOTICE", size = "small" }: { position: [number, number, number], rotation?: [number, number, number], text?: string, size?: "small" | "large" }) {
  const width = size === "large" ? 0.6 : 0.3;
  const height = size === "large" ? 0.8 : 0.2;
  
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.01]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
      {/* Text representation (abstracted as a dark block for now to save performance) */}
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[width * 0.8, height * 0.8]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function Magazine({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#ffffff" }: { position?: [number, number, number], rotation?: [number, number, number], color?: string }) {
  return (
    <mesh position={position} rotation={rotation as [number, number, number]} castShadow receiveShadow>
      <boxGeometry args={[0.22, 0.005, 0.28]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}
