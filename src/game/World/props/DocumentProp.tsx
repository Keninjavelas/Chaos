import React, { useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useArchiveStore, DocumentData } from "@/lib/state";

interface DocumentPropProps {
  document: DocumentData;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function DocumentProp({ document, position, rotation = [0, 0, 0] }: DocumentPropProps) {
  const { setActiveDocument } = useArchiveStore();

  return (
    <RigidBody type="fixed" position={position} rotation={rotation}>
      {/* Visual representation of a piece of paper/folder */}
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); window.document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { window.document.body.style.cursor = 'auto'; }}
        onClick={(e) => { 
          e.stopPropagation(); 
          setActiveDocument(document);
          window.document.body.style.cursor = 'auto';
        }}
      >
        <boxGeometry args={[0.4, 0.02, 0.5]} />
        <meshStandardMaterial color={document.type === 'dossier' ? "#e3c28d" : "#f4ebd8"} roughness={0.9} />
      </mesh>

      {/* If it's a glowing terminal, we can add a small glow */}
      {document.type === 'terminal' && (
        <mesh position={[0, 0.05, 0]}>
          <planeGeometry args={[0.3, 0.2]} />
          <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5} roughness={0.2} />
        </mesh>
      )}
    </RigidBody>
  );
}
