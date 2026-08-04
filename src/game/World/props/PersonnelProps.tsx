import React from "react";
import { RigidBody } from "@react-three/rapier";
import { HorrorMaterial } from "../materials/HorrorMaterial";

interface PropProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function CubicleDivider({ position = [0, 0, 0], rotation = [0, 0, 0], length = 2 }: PropProps & { length?: number }) {
  return (
    <RigidBody type="fixed" position={position} rotation={rotation} colliders="cuboid">
      {/* Fabric Panel */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 1.2, 0.05]} />
        <HorrorMaterial color="#364052" roughness={0.9} noiseScale={15.0} />
      </mesh>
      {/* Top Trim */}
      <mesh position={[0, 1.22, 0]} castShadow>
        <boxGeometry args={[length + 0.02, 0.04, 0.07]} />
        <HorrorMaterial color="#222" roughness={0.7} />
      </mesh>
      {/* End Caps */}
      <mesh position={[-length / 2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.06, 1.2, 0.07]} />
        <HorrorMaterial color="#222" roughness={0.7} />
      </mesh>
      <mesh position={[length / 2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.06, 1.2, 0.07]} />
        <HorrorMaterial color="#222" roughness={0.7} />
      </mesh>
    </RigidBody>
  );
}

export function SupervisorDesk({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Desk Surface */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.05, 1.0]} />
          <HorrorMaterial color="#3d2314" roughness={0.8} />
        </mesh>
        {/* L-Shape Extension */}
        <mesh position={[1.0, 0.75, 0.75]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.05, 2.5]} />
          <HorrorMaterial color="#3d2314" roughness={0.8} />
        </mesh>
        
        {/* Legs / Sides */}
        <mesh position={[-0.95, 0.375, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 1.0]} />
          <HorrorMaterial color="#222" roughness={0.7} />
        </mesh>
        <mesh position={[1.45, 0.375, 1.95]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.1]} />
          <HorrorMaterial color="#222" roughness={0.7} />
        </mesh>
        
        {/* Modesty Panel */}
        <mesh position={[0, 0.45, -0.45]} castShadow>
          <boxGeometry args={[1.9, 0.6, 0.02]} />
          <HorrorMaterial color="#222" roughness={0.7} />
        </mesh>
      </RigidBody>
    </group>
  );
}

export function OldRefrigerator({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Body */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.8, 0.8]} />
          <HorrorMaterial color="#d4d4d4" roughness={0.6} metalness={0.2} noiseScale={2.0} />
        </mesh>
        {/* Freezer Door */}
        <mesh position={[0, 1.45, 0.42]} castShadow>
          <boxGeometry args={[0.78, 0.65, 0.05]} />
          <HorrorMaterial color="#c0c0c0" roughness={0.6} metalness={0.2} noiseScale={2.5} />
        </mesh>
        {/* Main Door */}
        <mesh position={[0, 0.55, 0.42]} rotation={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.78, 1.05, 0.05]} />
          <HorrorMaterial color="#c0c0c0" roughness={0.6} metalness={0.2} noiseScale={2.5} />
        </mesh>
        {/* Handles */}
        <mesh position={[0.3, 1.45, 0.46]} castShadow><boxGeometry args={[0.02, 0.3, 0.04]} /><HorrorMaterial color="#555" /></mesh>
        <mesh position={[0.3, 0.7, 0.45]} rotation={[0, -0.2, 0]} castShadow><boxGeometry args={[0.02, 0.4, 0.04]} /><HorrorMaterial color="#555" /></mesh>
      </RigidBody>
    </group>
  );
}

export function Microwave({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <HorrorMaterial color="#e0e0e0" roughness={0.7} />
      </mesh>
      {/* Window */}
      <mesh position={[-0.05, 0.15, 0.21]} castShadow>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Keypad */}
      <mesh position={[0.18, 0.15, 0.205]} castShadow>
        <boxGeometry args={[0.1, 0.25, 0.02]} />
        <HorrorMaterial color="#222" />
      </mesh>
    </group>
  );
}

export function CoffeeMachine({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow><boxGeometry args={[0.25, 0.04, 0.3]} /><HorrorMaterial color="#111" /></mesh>
      {/* Back Tower */}
      <mesh position={[0, 0.2, -0.1]} castShadow><boxGeometry args={[0.25, 0.4, 0.15]} /><HorrorMaterial color="#111" /></mesh>
      {/* Top Overhang */}
      <mesh position={[0, 0.38, 0.05]} castShadow><boxGeometry args={[0.25, 0.05, 0.2]} /><HorrorMaterial color="#111" /></mesh>
      {/* Carafe */}
      <mesh position={[0, 0.12, 0.05]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.15]} />
        <meshStandardMaterial color="#211004" roughness={0.2} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export function OfficePrinter({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Base Tower */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.8, 0.6]} />
          <HorrorMaterial color="#e5e5e5" roughness={0.8} />
        </mesh>
        {/* Paper Trays (Right side) */}
        <mesh position={[0.36, 0.3, 0]} castShadow>
          <boxGeometry args={[0.05, 0.6, 0.5]} />
          <HorrorMaterial color="#ccc" />
        </mesh>
        {/* Scanner Top */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.1, 0.65]} />
          <HorrorMaterial color="#d0d0d0" roughness={0.7} />
        </mesh>
        {/* Output Tray Cavity (Visual hack using black block) */}
        <mesh position={[0, 0.65, 0.31]}>
          <boxGeometry args={[0.4, 0.15, 0.05]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        {/* Paper falling out */}
        <mesh position={[0, 0.6, 0.35]} rotation={[0.2, 0.1, 0]} castShadow>
          <planeGeometry args={[0.21, 0.29]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </RigidBody>
    </group>
  );
}

export function AudioRecorder({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.12]} />
        <HorrorMaterial color="#333" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0.04]}>
        <boxGeometry args={[0.04, 0.01, 0.03]} />
        <meshBasicMaterial color="#ff3333" /> {/* Red recording light */}
      </mesh>
    </group>
  );
}

export function CassetteTape({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.005, 0]} castShadow>
        <boxGeometry args={[0.1, 0.01, 0.06]} />
        <HorrorMaterial color="#111" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.011, 0]}>
        <planeGeometry args={[0.07, 0.04]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
}

export function FamilyPhoto({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.08, 0]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.12, 0.01]} />
        <HorrorMaterial color="#3d2314" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.08, 0.006]} rotation={[0.2, 0, 0]}>
        <planeGeometry args={[0.13, 0.1]} />
        <meshStandardMaterial color="#88aaff" roughness={0.4} /> {/* Abstract photo placeholder */}
      </mesh>
      <mesh position={[0, 0.04, -0.02]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.01]} />
        <HorrorMaterial color="#111" />
      </mesh>
    </group>
  );
}

export function WallClock({ position = [0, 0, 0], rotation = [0, 0, 0] }: PropProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.05]} />
        <HorrorMaterial color="#eee" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[0.3, 0.3]} />
        {/* Simple clock face representation */}
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0, 0.05, 0.035]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.01, 0.1, 0.005]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-0.04, 0, 0.035]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.01, 0.08, 0.005]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

export function DeskLamp({ position = [0, 0, 0], rotation = [0, 0, 0], on = true }: PropProps & { on?: boolean }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.04]} />
        <HorrorMaterial color="#111" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 0.2, 0.05]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.4]} />
        <HorrorMaterial color="#222" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.35, 0.15]} rotation={[0.5, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.15]} />
        <HorrorMaterial color="#111" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Light Source */}
      {on && (
        <>
          <mesh position={[0, 0.3, 0.15]} rotation={[0.5, 0, 0]}>
            <sphereGeometry args={[0.03]} />
            <meshBasicMaterial color="#ffddaa" />
          </mesh>
          <spotLight 
            position={[0, 0.3, 0.15]} 
            target-position={[0, 0, 0.3]} 
            angle={0.6} 
            penumbra={0.5} 
            intensity={0.85} 
            distance={2.5} 
            color="#ffc888" 
            castShadow={false} 
          />
          <mesh position={[0, 0, 0.3]} visible={false}><boxGeometry args={[0.1, 0.1, 0.1]}/></mesh>
        </>
      )}
    </group>
  );
}
