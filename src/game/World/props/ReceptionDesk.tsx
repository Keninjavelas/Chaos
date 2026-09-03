import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { useGameState } from "../../useGameState";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ReceptionDeskProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onInteractMap?: () => void;
}

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
        label="Desk drawer"
        interactionKind="OPEN"
        onInteract={() => toggleDrawer("RECEPTION_DRAWER")}
      >
        {/* Animated Drawer Box */}
        <group ref={drawerRef}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.25, 1.1]} />
            <FacilityMaterial kind="wood" color="#352920" />
          </mesh>
          {/* Drawer Handle */}
          <mesh position={[0, 0.05, 0.56]}>
            <boxGeometry args={[0.2, 0.03, 0.03]} />
            <FacilityMaterial kind="painted-metal" color="#7a858e" />
          </mesh>

          {/* Items Inside Drawer */}
          {isOpen && (
            <group position={[0, 0.14, 0]}>
              {/* Security Keycard Pickup */}
              {!inventory["KEYCARD-SECURITY"] && (
                <InteractableObject
                  label="Security keycard"
                  interactionKind="USE"
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
                    <meshStandardMaterial color="#0A84FF" roughness={0.3} metalness={0.2} />
                  </mesh>
                </InteractableObject>
              )}

              {/* Flashlight Pickup */}
              {!inventory["FLASHLIGHT-AUX"] && (
                <InteractableObject
                  label="Heavy flashlight"
                  interactionKind="USE"
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
                    <FacilityMaterial kind="painted-metal" color="#1c242a" />
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

export function ReceptionDesk({ position, rotation = [0, 0, 0] }: ReceptionDeskProps) {
  return (
    <group position={position} rotation={rotation}>
      
      {/* ─── DESK STRUCTURE ─── */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Working Surface */}
        <RoundedBox args={[4.2, 0.1, 2.4]} position={[0, 0.75, 0]} radius={0.02} smoothness={4}>
          <FacilityMaterial kind="wood" color="#4a3b2c" />
        </RoundedBox>

        {/* Front Privacy Panel / Shield */}
        <mesh position={[0, 0.35, 1.15]} receiveShadow>
          <boxGeometry args={[4.2, 0.8, 0.1]} />
          <FacilityMaterial kind="wood" color="#352920" />
        </mesh>

        {/* Left Side Panel */}
        <mesh position={[-2.05, 0.35, 0]} receiveShadow>
          <boxGeometry args={[0.1, 0.8, 2.4]} />
          <FacilityMaterial kind="wood" color="#352920" />
        </mesh>

        {/* Right Side Panel */}
        <mesh position={[2.05, 0.35, 0]} receiveShadow>
          <boxGeometry args={[0.1, 0.8, 2.4]} />
          <FacilityMaterial kind="wood" color="#352920" />
        </mesh>
      </RigidBody>

      {/* ─── INTERACTIVE DRAWER (Left Side) ─── */}
      <InteractiveDeskDrawer />

      {/* ─── RECEPTION DESK CHAIR ─── */}
      <group position={[0, 0, -0.9]} rotation={[0, 0.1, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.5, 0.08, 0.5]} />
          <FacilityMaterial kind="painted-metal" color="#182025" />
        </mesh>
        <mesh position={[0, 0.7, -0.22]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.06]} />
          <FacilityMaterial kind="painted-metal" color="#182025" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4]} />
          <FacilityMaterial kind="painted-metal" color="#2c353c" />
        </mesh>
      </group>
    </group>
  );
}
