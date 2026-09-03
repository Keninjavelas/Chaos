import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { useGameState } from "../../useGameState";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { DocumentProp } from "./DocumentProp";

interface FilingCabinetProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  cabinetId?: string;
}

export function FilingCabinet({ position, rotation = [0, 0, 0], cabinetId = "RECEPTION_CABINET" }: FilingCabinetProps) {
  const openDrawers = useGameState((state) => state.openDrawers);
  const toggleDrawer = useGameState((state) => state.toggleDrawer);
  const isTopDrawerOpen = !!openDrawers[cabinetId];

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Main Cabinet Body */}
        <RoundedBox args={[0.8, 1.8, 0.8]} position={[0, 0.9, 0]} radius={0.02} smoothness={4}>
          <FacilityMaterial kind="painted-metal" color="#262f36" />
        </RoundedBox>

        {/* Drawers (0.3, 0.7, 1.1) */}
        {[0.3, 0.7, 1.1].map((y, i) => (
          <group key={i} position={[0, y, 0.4]}>
            <RoundedBox args={[0.76, 0.36, 0.05]} position={[0, 0, 0]} radius={0.01}>
              <FacilityMaterial kind="painted-metal" color="#354048" />
            </RoundedBox>
            <RoundedBox args={[0.3, 0.04, 0.04]} position={[0, 0.08, 0.03]} radius={0.01}>
              <FacilityMaterial kind="painted-metal" color="#7a858e" />
            </RoundedBox>
            {/* Brass Index Card Slot */}
            <mesh position={[0, -0.04, 0.03]}>
              <planeGeometry args={[0.14, 0.05]} />
              <meshBasicMaterial color="#c4b087" toneMapped={false} />
            </mesh>
          </group>
        ))}

        {/* Top Interactive Drawer (y = 1.5) */}
        <InteractableObject
          label="Cabinet drawer"
          interactionKind="OPEN"
          onInteract={() => toggleDrawer(cabinetId)}
        >
          <group position={[0, 1.5, 0.4 + (isTopDrawerOpen ? 0.35 : 0)]}>
            <RoundedBox args={[0.76, 0.36, 0.05]} position={[0, 0, 0]} radius={0.01}>
              <FacilityMaterial kind="painted-metal" color="#354048" />
            </RoundedBox>
            <RoundedBox args={[0.3, 0.04, 0.04]} position={[0, 0.08, 0.03]} radius={0.01}>
              <FacilityMaterial kind="painted-metal" color="#7a858e" />
            </RoundedBox>
            {/* Brass Index Card Slot */}
            <mesh position={[0, -0.04, 0.03]}>
              <planeGeometry args={[0.14, 0.05]} />
              <meshBasicMaterial color="#c4b087" toneMapped={false} />
            </mesh>

            {/* Document dossier inside open drawer */}
            {isTopDrawerOpen && (
              <group position={[0, 0.05, -0.15]}>
                <DocumentProp
                  position={[0, 0, 0]}
                  document={{
                    id: "CABINET-FILE-01",
                    title: "INCIDENT DOSSIER - LEVEL 1",
                    type: "case_file",
                    content: "CONFIDENTIAL CLASSIFIED RECORD\n\nSubject 44 isolation order executed. Elevator shaft locked to Sublevel.\n\nAll staff must evacuate via primary corridor."
                  }}
                />
              </group>
            )}
          </group>
        </InteractableObject>
      </RigidBody>
    </group>
  );
}
