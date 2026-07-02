import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGameState, GameMode } from '../useGameState';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export function InspectionView() {
  const activeDocument = useGameState((state) => state.activeDocument);
  const clearInteraction = useGameState((state) => state.clearInteraction);
  const setActivePrompt = useGameState((state) => state.setActivePrompt);
  const groupRef = useRef<THREE.Group>(null);
  const paperGroupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  
  const [isClosing, setIsClosing] = useState(false);
  const closeMethod = useRef<'e' | 'esc'>('esc');
  const animProgress = useRef(0);
  
  // Parallax smoothing
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const currentRotation = useRef(new THREE.Vector2(0, 0));

  // Manage dynamic close prompt
  useEffect(() => {
    if (activeDocument && !isClosing) {
      setActivePrompt({
        text: activeDocument.closeLabel || "Put Away",
        key: 'E'
      });
    } else {
      setActivePrompt(null);
    }
  }, [activeDocument, isClosing, setActivePrompt]);

  useEffect(() => {
    if (!activeDocument) return;
    
    // Unlock pointer so mouse can be used if needed, and to fulfill GameMode.INSPECTING contract
    document.exitPointerLock?.();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "escape") {
        closeMethod.current = 'esc';
        setIsClosing(true);
      } else if (key === "e") {
        closeMethod.current = 'e';
        setIsClosing(true);
        // CRITICAL: We must request lock on the canvas (gl.domElement), not document.body!
        // We DO NOT set GameMode to PLAYING here. We leave it as INSPECTING so spurious onUnlock events are ignored!
        gl.domElement.requestPointerLock?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDocument, gl]);

  // Reset state when document changes
  React.useEffect(() => {
    if (activeDocument) {
      targetRotation.current.set(0, 0);
      currentRotation.current.set(0, 0);
      animProgress.current = 0;
      setIsClosing(false);
    }
  }, [activeDocument]);

  useFrame(({ camera, pointer }) => {
    if (!activeDocument || !groupRef.current) return;

    // Animate pickup and put-away
    if (isClosing) {
      animProgress.current = THREE.MathUtils.lerp(animProgress.current, 0.0, 0.2);
      if (animProgress.current < 0.02) {
        clearInteraction(closeMethod.current === 'e');
        setIsClosing(false);
      }
    } else {
      animProgress.current = THREE.MathUtils.lerp(animProgress.current, 1.0, 0.1);
    }

    const startY = -0.6; // Start slightly lower
    const endY = -0.15; // Stop at 60-70% height so environment is visible
    const currentY = THREE.MathUtils.lerp(startY, endY, animProgress.current);

    // Position the inspection group further away (-0.9) so it fits in the screen
    const offset = new THREE.Vector3(0, currentY, -0.9);
    offset.applyQuaternion(camera.quaternion);
    groupRef.current.position.copy(camera.position).add(offset);
    
    // Make the document face the camera with a slight tilt during animation
    const startRotX = -Math.PI / 4;
    const currentRotX = THREE.MathUtils.lerp(startRotX, 0, animProgress.current);
    
    const targetQuat = camera.quaternion.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(currentRotX, 0, 0)));
    groupRef.current.quaternion.slerp(targetQuat, 0.2);
    
    // Parallax Sway
    if (paperGroupRef.current) {
      targetRotation.current.x = (pointer.y * 0.15);
      targetRotation.current.y = (pointer.x * 0.15);
      
      currentRotation.current.lerp(targetRotation.current, 0.1);
      paperGroupRef.current.rotation.x = currentRotation.current.x;
      paperGroupRef.current.rotation.y = currentRotation.current.y;
    }
  }); 

  if (!activeDocument) return null;

  return (
    <group 
      ref={groupRef}
      renderOrder={100}
    >
      {/* Warm Light specifically for the paper to ensure readability */}
      <pointLight position={[0, 0.5, 0.8]} intensity={1.5} distance={3} color="#FFE8D6" />
      
      <group ref={paperGroupRef}>
        {/* Soft Drop Shadow behind the paper */}
        <mesh position={[0.02, -0.02, -0.01]} renderOrder={99}>
          <boxGeometry args={[0.42, 0.52, 0.005]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.4} depthTest={false} />
        </mesh>
        
        {/* Paper Mesh */}
        <mesh castShadow={false} receiveShadow={false} renderOrder={100}>
          <boxGeometry args={[0.4, 0.5, 0.005]} />
          <meshStandardMaterial color="#f4f1ea" roughness={0.9} depthTest={false} transparent />
          
          {/* Document Content rendered via Html */}
          <Html 
            transform 
            scale={0.001} // Scale down 400px exactly to 0.4 world units!
            position={[0, 0, 0.003]} 
            style={{ width: '400px', height: '500px', background: 'transparent', pointerEvents: 'auto' }}
          >
            <div className="w-full h-full p-8 font-serif text-black opacity-90 flex flex-col overflow-hidden">
              <h2 className="text-2xl font-bold border-b border-black/20 pb-2 mb-4">{activeDocument.title}</h2>
              <p className="text-sm leading-relaxed whitespace-pre-wrap flex-1">
                {activeDocument.content}
              </p>
              {activeDocument.author && (
                <div className="mt-4 text-xs italic text-right border-t border-black/20 pt-2">
                  - {activeDocument.author}
                </div>
              )}
              {activeDocument.interactiveLink && (
                <div className="mt-6 flex justify-center pointer-events-auto">
                  <a 
                    href={activeDocument.interactiveLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors cursor-pointer font-sans text-sm font-bold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {activeDocument.interactiveLink.label}
                  </a>
                </div>
              )}
            </div>
          </Html>
        </mesh>
        
        {/* Optional Close Button Hint if they don't see the bottom prompt (commented out per new UX rules)
        <Html position={[0, -0.3, 0]} center>
          <div className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-mono cursor-pointer pointer-events-auto hover:bg-white hover:text-black transition-colors"
               onClick={() => setIsClosing(true)}>
            [ESC] or Click to Close
          </div>
        </Html>
        */}
      </group>
    </group>
  );
}
