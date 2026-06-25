import React, { useState } from "react";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall, NoticeBoard } from "../props/RoomArchitecture";
import { ReceptionDesk } from "../props/ReceptionDesk";
import { FilingCabinet } from "../props/FilingCabinet";
import { VisitorChairs } from "../props/RoomArchitecture";

import { RingingPhone } from "../props/RingingPhone";
import { DocumentProp } from "../props/DocumentProp";
import { useArchiveStore, DocumentData } from "@/lib/state";
import { RigidBody } from "@react-three/rapier";

function FramedCertificate({ position, rotation, document }: { position: [number, number, number], rotation: [number, number, number], document: DocumentData }) {
  const { setActiveDocument } = useArchiveStore();
  return (
    <RigidBody type="fixed" position={position} rotation={rotation}>
      <group 
        onPointerOver={(e) => { e.stopPropagation(); window.document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { window.document.body.style.cursor = 'auto'; }}
        onClick={(e) => { 
          e.stopPropagation(); 
          setActiveDocument(document);
          window.document.body.style.cursor = 'auto';
        }}
      >
        {/* Frame */}
        <mesh position={[0, 0, 0]}><boxGeometry args={[0.5, 0.7, 0.05]} /><meshStandardMaterial color="#1a1a1a" roughness={0.6} /></mesh>
        {/* Glass/Paper */}
        <mesh position={[0, 0, 0.03]}><planeGeometry args={[0.45, 0.65]} /><meshStandardMaterial color="#e5e0d8" roughness={0.2} metalness={0.1} /></mesh>
      </group>
    </RigidBody>
  );
}

function ResumeEnvelope({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  const [collected, setCollected] = useState(false);
  const { addInventoryItem, setActiveDocument } = useArchiveStore();

  if (collected) {
    return (
      <DocumentProp 
        position={position} 
        rotation={rotation}
        document={{ 
          id: "DOC-RESUME-NOTE", 
          title: "HANDWRITTEN NOTE", 
          type: "note", 
          content: "Most people start here.\nThey should have started with the records." 
        }} 
      />
    );
  }

  return (
    <RigidBody type="fixed" position={position} rotation={rotation}>
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); window.document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { window.document.body.style.cursor = 'auto'; }}
        onClick={(e) => { 
          e.stopPropagation(); 
          addInventoryItem("Resume.pdf");
          setCollected(true);
          window.document.body.style.cursor = 'auto';
        }}
      >
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial color="#d4a373" roughness={0.9} /> {/* Manila envelope color */}
      </mesh>
    </RigidBody>
  );
}

export function PersonnelWing({ position }: RoomProps) {
  // Center is global X=12, Z=-5.
  // Room is 8x8m (X: -4 to 4, Z: -4 to 4 relative)
  // Entrance corridor connects on Left Wall (X=-4) from Z=1 to Z=3 (Relative Z=2, width 2m)

  return (
    <group position={position}>
      {/* ─── ARCHITECTURE ─── */}
      <RoomFloor args={[8, 8]} position={[0, -0.5, 0]} />
      <RoomCeiling args={[8, 0.1, 8]} position={[0, 2.9, 0]} hasLights={false} />

      {/* Main Walls */}
      <RoomWall position={[0, 0, -4]} args={[8, 3.4, 0.2]} /> {/* Rear */}
      <RoomWall position={[0, 0, 4]} args={[8, 3.4, 0.2]} /> {/* Front */}
      <RoomWall position={[4, 0, 0]} args={[0.2, 3.4, 8]} /> {/* Right */}

      {/* Left Wall with Cutout at Z=2 (Z=1 to Z=3) */}
      <RoomWall position={[-4, 0, -1.5]} args={[0.2, 3.4, 5]} /> {/* Rear part (Z=-4 to Z=1) */}
      <RoomWall position={[-4, 0, 3.5]} args={[0.2, 3.4, 1]} /> {/* Front part (Z=3 to Z=4) */}
      <mesh position={[-4, 2.8, 2]}><boxGeometry args={[0.2, 0.8, 2]} /><meshStandardMaterial color="#444" /></mesh> {/* Header */}

      {/* ─── ENTRY CORRIDOR ─── */}
      <group position={[-5.75, 0, 2]}>
        {/* Floor and Ceiling exactly bridge the 3.5m gap (X: 4.5 to 8.0) */}
        <RoomFloor args={[3.5, 4]} position={[0, -0.5, 0]} />
        <RoomCeiling args={[3.5, 0.1, 4]} position={[0, 2.5, 0]} hasLights={false} />
        {/* Walls are slightly longer (3.9m) to overlap into the rooms and prevent visual seams */}
        <RoomWall position={[0, 0, -1]} args={[3.9, 3.4, 0.2]} />
        <RoomWall position={[0, 0, 1]} args={[3.9, 3.4, 0.2]} />
      </group>

      {/* ─── ATMOSPHERE & LIGHTING ─── */}
      <ambientLight intensity={0.15} color="#ffe5cc" /> 
      
      {/* Single harsh overhead light over the desk */}
      <group position={[0, 2.8, 0]}>
        <mesh><boxGeometry args={[1.2, 0.1, 0.3]} /><meshStandardMaterial color="#fff" emissive="#ffe5cc" emissiveIntensity={0.8} /></mesh>
        <pointLight color="#ffe5cc" distance={6} decay={2} intensity={3.0} />
      </group>

      {/* ─── ITEM 1, 2, & 5: THE DESK (CENTERPIECE) ─── */}
      <group position={[0, -0.5, -0.5]}>
        <ReceptionDesk position={[0, 0, 0]} rotation={[0, 0, 0]} onInteractMap={() => {}} />
        
        {/* Lamp */}
        <mesh position={[-1, 0.61, -0.5]}><cylinderGeometry args={[0.1, 0.15, 0.3]} /><meshStandardMaterial color="#111" /></mesh>
        <spotLight position={[-1, 1.2, -0.5]} target-position={[-0.2, 0.6, -0.2]} angle={0.5} penumbra={0.3} intensity={4} distance={2} color="#fff2cc" />
        <mesh position={[-0.2, 0.6, -0.2]} visible={false}><boxGeometry args={[0.1, 0.1, 0.1]} /></mesh> {/* SpotLight Target */}

        {/* Coffee Mug */}
        <mesh position={[-0.8, 0.65, -0.2]}><cylinderGeometry args={[0.06, 0.06, 0.1]} /><meshStandardMaterial color="#ddd" /></mesh>

        {/* Notebook */}
        <DocumentProp position={[-0.2, 0.62, -0.2]} rotation={[-Math.PI/2, 0, 0.1]}
          document={{ id: "DOC-NOTEBOOK", title: "OPEN NOTEBOOK", type: "note", content: `Most people build features.\nSome build systems.\nSystems last longer.\n\nNeed more Kubernetes experience.` }} 
        />

        {/* Personnel Folder (Clean, separate) */}
        <DocumentProp position={[0.8, 0.61, -0.3]} rotation={[-Math.PI/2, 0, -0.1]}
          document={{ id: "DOC-RESUME", title: "PERSONNEL FOLDER", type: "dossier", content: `NAME: Aryan Kapoor\nLOCATION: Bangalore\nGRADUATION: 2027\nEDUCATION: B.E. Computer Science\n\nRESEARCH: Published Paper\n\nINTERESTS:\n- Backend Systems\n- Cloud Infrastructure\n- Security Engineering\n- Platform Engineering` }} 
        />

        {/* Resume Envelope (Collectible) - Partially sticking out of the drawer area */}
        <ResumeEnvelope position={[-0.6, 0.45, 0.6]} rotation={[-Math.PI/2, 0, 0.2]} />
      </group>

      {/* ─── ITEM 3: THE LOCKER WALL ─── */}
      <group position={[-3.5, -0.5, -2.5]} rotation={[0, Math.PI/2, 0]}>
        {/* Lockers */}
        <mesh position={[0, 1.0, 0]}><boxGeometry args={[1.5, 2.0, 0.6]} /><meshStandardMaterial color="#4a5a6a" metalness={0.6} /></mesh>
        {/* Open Locker Door */}
        <mesh position={[0.75, 1.0, 0.3]} rotation={[0, -0.6, 0]}><boxGeometry args={[0.5, 2.0, 0.05]} /><meshStandardMaterial color="#4a5a6a" metalness={0.6} /></mesh>

        {/* Old Laptop */}
        <mesh position={[0.5, 0.6, 0]}><boxGeometry args={[0.3, 0.02, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
        
        {/* Sticky Notes / Planner */}
        <DocumentProp position={[0.6, 0.65, 0.1]} rotation={[-Math.PI/2, 0, 0.2]}
          document={{ id: "DOC-LOCKER", title: "LOCKER NOTES", type: "note", content: `[PLANNER ENTRY]\nApply for internships.\n\n[CROSSED OUT HEAVILY IN RED INK]\n\n[STICKY NOTE]\nBuild something worth hiring.` }} 
        />
        
        {/* Hidden Interview Notes */}
        <DocumentProp position={[0.1, 0.51, -0.1]} rotation={[-Math.PI/2, 0, 0.1]}
          document={{ id: "DOC-INTERVIEW", title: "INTERVIEW PREPARATION NOTES", type: "note", content: `THINGS TO IMPROVE:\n• Kubernetes\n• Open Source Contributions\n• Larger Scale Experience\n\nCURRENT STRENGTHS:\n• Research\n• Communication\n• Systems Thinking` }} 
        />
      </group>

      {/* ─── ITEM 4: THE WHITEBOARD (THE HORROR LAYER) ─── */}
      <group position={[-1.5, 0.5, -3.8]} rotation={[0, 0, 0]}>
        <NoticeBoard position={[0, 0, 0]} rotation={[0, 0, 0]} />
        <DocumentProp position={[0, 0, 0.05]} rotation={[0, 0, 0]}
          document={{ id: "DOC-WHITEBOARD", title: "WHITEBOARD", type: "note", content: `Why did it fail?\nSymptoms ≠ Root Cause\n\n[Root Cause Unknown]\n\nTemporary Fix Applied.\nInvestigation Continues.` }} 
        />
      </group>

      {/* ─── ITEM 6: CERTIFICATE WALL ─── */}
      {/* Right Wall (X=3.9) */}
      <group position={[3.9, 1.5, 0]} rotation={[0, -Math.PI/2, 0]}>
        <FramedCertificate position={[-1.2, 0.2, 0]} rotation={[0, 0, 0]} document={{ id: "CERT-1", title: "VERIFIED COMPETENCY", type: "case_file", content: "Certificate Frame 01\n\nCloud / Infrastructure"}} />
        <FramedCertificate position={[0, 0.4, 0]} rotation={[0, 0, 0]} document={{ id: "CERT-2", title: "VERIFIED COMPETENCY", type: "case_file", content: "Certificate Frame 02\n\nSecurity / Platform"}} />
        <FramedCertificate position={[1.2, 0.1, 0]} rotation={[0, 0, 0]} document={{ id: "CERT-3", title: "VERIFIED COMPETENCY", type: "case_file", content: "Certificate Frame 03\n\nEngineering Achievement"}} />
        <FramedCertificate position={[-0.5, -0.6, 0]} rotation={[0, 0, 0]} document={{ id: "CERT-4", title: "VERIFIED COMPETENCY", type: "case_file", content: "Certificate Frame 04\n\nResearch Publication"}} />
      </group>

      {/* Filing Shelf to complete the room structure (Visual only) */}
      <FilingCabinet position={[2, -0.5, -3.5]} rotation={[0, 0, 0]} />
      <FilingCabinet position={[2.8, -0.5, -3.5]} rotation={[0, 0, 0]} />

    </group>
  );
}
