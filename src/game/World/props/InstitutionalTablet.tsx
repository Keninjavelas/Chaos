import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RenderTexture, PerspectiveCamera, Text } from '@react-three/drei';
import { InteractableObject } from '../../Interactables/InteractableObject';
import { useGameState } from '../../useGameState';

interface InstitutionalTabletProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function InstitutionalTablet({ position, rotation = [0, 0, 0] }: InstitutionalTabletProps) {
  const textRef = useRef<any>(null);
  const [isActive, setIsActive] = useState(false);
  const inspectDocument = useGameState(state => state.inspectDocument);

  useFrame((state) => {
    if (textRef.current && isActive) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <InteractableObject
      label="Access Tablet"
      onInteract={() => {
        setIsActive(true);
        // This acts as a trigger to view the timeline/schedule
        // We'll map this to a special document for now that represents the Tablet UI
        inspectDocument({
          id: "TABLET-TIMELINE",
          title: "SCHEDULE & LOGS",
          type: "terminal",
          content: `SYSTEM TIMELINE\n\n[10:00] Initial Boot Sequence\n[11:30] Service Degradation Detected\n[12:45] Personnel Evacuation Protocol\n[14:00] Automated Containment\n\nSTATUS: LOCKED`,
          closeLabel: "Put Tablet Down"
        });
      }}
    >
      <group position={position} rotation={rotation}>
        {/* Tablet Body */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.05, 0.7]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0.026, 0]}>
          <planeGeometry args={[0.45, 0.65]} />
          {/* We use RenderTexture to draw a dynamic UI onto the 3D tablet screen */}
          <meshStandardMaterial color="#000000" emissive="#ffffff" emissiveIntensity={1.5} toneMapped={false}>
            <RenderTexture attach="emissiveMap" source={undefined} anisotropy={16}>
              <PerspectiveCamera manual aspect={0.45 / 0.65} position={[0, 0, 5]} />
              <mesh position={[0, 0, -2]}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color="#0a1a0a" />
              </mesh>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              
              {/* Dynamic Grid Background */}
              <gridHelper args={[10, 20, "#004400", "#002200"]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1]} />
              
              <Text ref={textRef} fontSize={0.5} color="#00ff00" position={[0, 0, 0]}>
                AOS - V1.4
              </Text>
              <Text fontSize={0.2} color="#00ff00" position={[0, -1.5, 0]}>
                Touch to Access
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </mesh>
      </group>
    </InteractableObject>
  );
}
