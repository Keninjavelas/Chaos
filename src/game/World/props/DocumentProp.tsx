import React from 'react';
import { InteractableObject } from '../../Interactables/InteractableObject';
import { useGameState } from '../../useGameState';
import { DocumentContent } from '../../../data/types';

interface DocumentPropProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  document: DocumentContent;
}

export function DocumentProp({ position, rotation = [0, 0, 0], document }: DocumentPropProps) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <InteractableObject 
      label={document.interactionLabel || `Read ${document.title}`}
      onInteract={() => inspectDocument(document)}
    >
      <group position={position} rotation={rotation}>
        {/* Visual representation of a piece of paper/folder */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.02, 0.5]} />
          <meshStandardMaterial color={document.type === 'dossier' ? "#e3c28d" : "#f4ebd8"} roughness={0.9} />
        </mesh>
      </group>
    </InteractableObject>
  );
}
