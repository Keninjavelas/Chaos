import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useArchiveStore } from "@/lib/state";
import * as THREE from "three";

interface RingingPhoneProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function RingingPhone({ position, rotation = [0, 0, 0] }: RingingPhoneProps) {
  const [isAnswered, setIsAnswered] = useState(false);
  const phoneRef = useRef<THREE.Group>(null);
  const { setActiveDocument, isAwakened } = useArchiveStore();

  const isRinging = !isAnswered && !isAwakened;

  useFrame(({ clock }) => {
    if (isRinging && phoneRef.current) {
      // Violent shaking
      const time = clock.getElapsedTime();
      const shake = Math.sin(time * 50) * 0.02;
      phoneRef.current.position.x = shake;
    }
  });

  return (
    <RigidBody type="fixed" position={position} rotation={rotation}>
      <group ref={phoneRef}>
        <mesh 
          onPointerOver={(e) => { e.stopPropagation(); window.document.body.style.cursor = 'pointer'; }}
          onPointerOut={(e) => { window.document.body.style.cursor = 'auto'; }}
          onClick={(e) => { 
            e.stopPropagation(); 
            if (!isAnswered) {
              setIsAnswered(true);
              setActiveDocument({
                id: "PHONE-CALL-01",
                title: "INCOMING CALL",
                type: "note",
                content: `[ You pick up the receiver. ]\n\n[ There is only the sound of heavy breathing, and then a click. ]\n\n[ The line goes dead. ]`
              });
              window.document.body.style.cursor = 'auto';
            }
          }}
        >
          {/* Base */}
          <boxGeometry args={[0.4, 0.1, 0.4]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
        
        {/* Receiver */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.1]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>

        {isRinging && !isAnswered && (
          <pointLight position={[0, 0.2, 0]} color="#ff0000" intensity={0.5} distance={1} />
        )}
      </group>
    </RigidBody>
  );
}
