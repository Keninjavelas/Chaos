import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";

interface ReceptionDeskProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onInteractMap?: () => void;
}

function CRTMonitor({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Monitor Body */}
      <mesh position={[0, 0.35, 0.05]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.45]} />
        <meshStandardMaterial color="#d4d0c8" roughness={0.9} />
      </mesh>
      {/* Screen Frame */}
      <mesh position={[0, 0.35, 0.28]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.45, 0.35, 0.02]} />
        <meshStandardMaterial color="#a09e98" roughness={0.9} />
      </mesh>
      {/* Glass Screen */}
      <mesh position={[0, 0.35, 0.29]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshStandardMaterial color="#050a10" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Power LED */}
      <mesh position={[0.18, 0.2, 0.29]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[0.01, 0.01]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
    </group>
  );
}

function Keyboard({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#d4d0c8" roughness={0.9} />
      </mesh>
      {/* Keys surface */}
      <mesh position={[0, 0.012, 0]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[0.42, 0.01, 0.13]} />
        <meshStandardMaterial color="#a09e98" roughness={0.9} />
      </mesh>
    </group>
  );
}

import { useGameState } from "../../useGameState";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function InteractiveDeskDrawer() {
  const openDrawers = useGameState((state) => state.openDrawers);
  const toggleDrawer = useGameState((state) => state.toggleDrawer);
  const addInventoryItem = useGameState((state) => state.addInventoryItem);
  const inventory = useGameState((state) => state.inventory);
  
  const drawerRef = React.useRef<THREE.Group>(null);
  const isOpen = !!openDrawers["RECEPTION_DRAWER"];

  useFrame((_, delta) => {
    if (drawerRef.current) {
      const targetZ = isOpen ? 0.45 : 0;
      drawerRef.current.position.z = THREE.MathUtils.lerp(drawerRef.current.position.z, targetZ, delta * 8);
    }
  });

  return (
    <group position={[-1.4, 0.45, 0]}>
      {/* Interactive Trigger for Opening/Closing Drawer */}
      <InteractableObject
        label={isOpen ? "Close Desk Drawer" : "Open Desk Drawer"}
        onInteract={() => toggleDrawer("RECEPTION_DRAWER")}
      >
        {/* Animated Drawer Box */}
        <group ref={drawerRef}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.25, 1.1]} />
            <meshStandardMaterial color="#2c231a" roughness={0.85} />
          </mesh>
          {/* Drawer Handle */}
          <mesh position={[0, 0.05, 0.56]}>
            <boxGeometry args={[0.2, 0.03, 0.03]} />
            <meshStandardMaterial color="#888" metalness={0.9} roughness={0.3} />
          </mesh>

          {/* Items Inside Drawer */}
          {isOpen && (
            <group position={[0, 0.14, 0]}>
              {/* Security Keycard Pickup */}
              {!inventory["KEYCARD-SECURITY"] && (
                <InteractableObject
                  label="Take Security Keycard"
                  onInteract={() => addInventoryItem({
                    id: "KEYCARD-SECURITY",
                    name: "Level 2 Access Card",
                    description: "Keycard belonging to Vance A., granting access to restricted wings.",
                    category: "key",
                    acquired: true,
                    isNew: true,
                    icon: "keycard"
                  })}
                >
                  <mesh position={[-0.1, 0, 0.1]}>
                    <boxGeometry args={[0.08, 0.01, 0.12]} />
                    <meshStandardMaterial color="#ffdd00" roughness={0.3} metalness={0.8} />
                  </mesh>
                </InteractableObject>
              )}

              {/* Flashlight Pickup */}
              {!inventory["FLASHLIGHT-AUX"] && (
                <InteractableObject
                  label="Take Emergency Flashlight"
                  onInteract={() => addInventoryItem({
                    id: "FLASHLIGHT-AUX",
                    name: "Heavy Duty Flashlight",
                    description: "Standard issue security lantern.",
                    category: "tool",
                    acquired: true,
                    isNew: true,
                    icon: "flashlight"
                  })}
                >
                  <mesh position={[0.1, 0, -0.1]} rotation={[0, 0.4, 0]}>
                    <cylinderGeometry args={[0.03, 0.02, 0.25]} />
                    <meshStandardMaterial color="#111" roughness={0.5} metalness={0.9} />
                  </mesh>
                </InteractableObject>
              )}
            </group>
          )}
        </group>
      </InteractableObject>
    </group>
  );
}

export function ReceptionDesk({ position, rotation = [0, 0, 0], onInteractMap }: ReceptionDeskProps) {
  return (
    <group position={position} rotation={rotation}>
      
      {/* ─── DESK STRUCTURE ─── */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Working Surface */}
        <RoundedBox args={[4.2, 0.1, 2.4]} position={[0, 0.75, 0]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#3a2f24" roughness={0.8} />
        </RoundedBox>
        {/* Static Pedestals */}
        <mesh position={[-1.4, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 1.2]} />
          <meshStandardMaterial color="#2c231a" roughness={0.85} />
        </mesh>
        <mesh position={[1.4, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 1.2]} />
          <meshStandardMaterial color="#2c231a" roughness={0.85} />
        </mesh>
        {/* Static Drawer Handles on right side */}
        <mesh position={[1.4, 0.6, 0.62]}><boxGeometry args={[0.2, 0.02, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1.4, 0.3, 0.62]}><boxGeometry args={[0.2, 0.02, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
      </RigidBody>

      {/* ─── INTERACTIVE LEFT DRAWER ─── */}
      <InteractiveDeskDrawer />
    </group>
  );
}
