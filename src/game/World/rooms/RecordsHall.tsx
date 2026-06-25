"use client";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, PositionalAudio } from "@react-three/drei";
import { RoomProps } from "../types";
import { useArchiveStore } from "@/lib/state";
import { RoomFloor, RoomCeiling, RoomWall, VisitorChairs } from "../props/RoomArchitecture";
import { FilingCabinet } from "../props/FilingCabinet";
import { Collectible } from "../props/Collectible";
import { DocumentProp } from "../props/DocumentProp";

function BrokenFluorescent({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const timer = useRef(0);
  const isOff = useRef(false);

  useFrame((_, delta) => {
    if (!lightRef.current) return;
    timer.current -= delta;
    if (timer.current <= 0) {
      if (isOff.current) {
        // Turn back on temporarily
        lightRef.current.intensity = 1.0 + Math.random() * 2.0;
        isOff.current = false;
        timer.current = 1 + Math.random() * 3;
      } else {
        // Break again
        lightRef.current.intensity = 0;
        isOff.current = true;
        timer.current = 0.1 + Math.random() * 0.5;
      }
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, -0.05, 0]}><boxGeometry args={[1.2, 0.1, 0.3]} /><meshStandardMaterial color="#222" /></mesh>
      <pointLight ref={lightRef} color="#E5E3D4" distance={8} decay={2} intensity={0} />
    </group>
  );
}

function WorkingFluorescent({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.05, 0]}><boxGeometry args={[1.2, 0.1, 0.3]} /><meshStandardMaterial color="#fff" emissive="#E5E3D4" emissiveIntensity={0.5} /></mesh>
      <pointLight color="#E5E3D4" distance={10} decay={2} intensity={3.0} />
    </group>
  );
}

function RandomAudioEvents() {
  // We use a simple effect to trigger random audio events
  useEffect(() => {
    const triggerAudio = () => {
      // In a full implementation, this would play positional audio
      // For now we just log it to represent the audio system working
      const events = ['Drawer Slam', 'Document Falling', 'Cabinet Creak'];
      console.log(`[Audio Event]: ${events[Math.floor(Math.random() * events.length)]}`);
      scheduleNext();
    };

    const scheduleNext = () => {
      const delay = 30000 + Math.random() * 90000; // 30-120s
      setTimeout(triggerAudio, delay);
    };

    const timer = setTimeout(triggerAudio, 15000); // First event at 15s
    return () => clearTimeout(timer);
  }, []);

  return (
    <group>
      {/* Continuous Audio Loops */}
    </group>
  );
}

export function RecordsHall({ position }: RoomProps) {
  const { inventory } = useArchiveStore();
  const isGateUnlocked = inventory.includes("Archive Keycard");
  const rows = [-6, -4, 4, 6];
  const cols = [-5, -3, 3, 5];
  
  const labels: Record<string, string> = {
    "-5_-6": "CABINET-12\nInfrastructure Systems",
    "5_-6": "CABINET-21\nSecurity Research",
    "-5_6": "CABINET-33\nDistributed Systems",
    "5_6": "CABINET-47\nExperimental Projects",
  };

  return (
    <group position={position}>
      <RandomAudioEvents />

      {/* ─── ARCHITECTURE (14x18m Room) ─── */}
      {/* The main hall floor Z: -9 to 9 */}
      <RoomFloor args={[14, 18]} position={[0, -0.5, 0]} />
      
      {/* The Ceiling Z: -9 to 9 */}
      <group position={[0, 3.5, 0]}>
        <RoomCeiling args={[14, 0.1, 18]} position={[0, 0, 0]} hasLights={false} />
        {/* Steel support beams */}
        <mesh position={[0, -0.1, -4.5]}><boxGeometry args={[14, 0.3, 0.4]} /><meshStandardMaterial color="#2a2a2a" roughness={0.8} /></mesh>
        <mesh position={[0, -0.1, 0]}><boxGeometry args={[14, 0.3, 0.4]} /><meshStandardMaterial color="#2a2a2a" roughness={0.8} /></mesh>
        <mesh position={[0, -0.1, 4.5]}><boxGeometry args={[14, 0.3, 0.4]} /><meshStandardMaterial color="#2a2a2a" roughness={0.8} /></mesh>
        
        {/* Exposed Conduit */}
        <mesh position={[-2, -0.1, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.05, 0.05, 18]} /><meshStandardMaterial color="#111" metalness={0.5} /></mesh>
        <mesh position={[2, -0.1, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.05, 0.05, 18]} /><meshStandardMaterial color="#111" metalness={0.5} /></mesh>
      </group>

      {/* Main Room Walls */}
      <RoomWall position={[0, 0, -9]} args={[14, 4.0, 0.2]} /> {/* Rear */}
      <RoomWall position={[-7, 0, 0]} args={[0.2, 4.0, 18]} /> {/* Left */}
      <RoomWall position={[7, 0, 0]} args={[0.2, 4.0, 18]} /> {/* Right */}
      
      {/* Front Wall with 2m gap for corridor */}
      <RoomWall position={[-4.5, 0, 9]} args={[5, 4.0, 0.2]} />
      <RoomWall position={[4.5, 0, 9]} args={[5, 4.0, 0.2]} />
      <mesh position={[0, 3.0, 9]}><boxGeometry args={[4, 1.0, 0.2]} /><meshStandardMaterial color="#444" /></mesh> {/* Door header */}

      {/* ─── ENTRY CORRIDOR ─── */}
      {/* Extends exactly from Z=9 to Z=13 (relative) to prevent overlap snags */}
      <group position={[0, 0, 11]}>
        <RoomFloor args={[4, 4.0]} position={[0, -0.5, 0]} />
        <RoomCeiling args={[4, 0.1, 4.0]} position={[0, 2.5, 0]} hasLights={false} />
        {/* Walls are slightly longer (4.1m) to overlap into the rooms */}
        <RoomWall position={[-1, 0, 0]} args={[0.2, 3.0, 4.1]} />
        <RoomWall position={[1, 0, 0]} args={[0.2, 3.0, 4.1]} />
        {/* Open to the intersection */}
      </group>

      {/* ─── LIGHTING SETUP ─── */}
      <ambientLight intensity={0.4} /> {/* Bright enough to read, but unsettling */}
      
      {/* 6 Working Fluorescents */}
      <WorkingFluorescent position={[-3.5, 3.4, -6]} />
      <WorkingFluorescent position={[3.5, 3.4, -6]} />
      <WorkingFluorescent position={[-3.5, 3.4, 0]} />
      <WorkingFluorescent position={[3.5, 3.4, 0]} />
      <WorkingFluorescent position={[-3.5, 3.4, 6]} />
      
      {/* 2 Broken/Failing Fluorescents */}
      <BrokenFluorescent position={[3.5, 3.4, 6]} />
      <BrokenFluorescent position={[0, 3.4, -3]} />

      {/* ─── THE 16 CABINETS ─── */}
      {rows.map((z) =>
        cols.map((x) => {
          const isShowcase = labels[`${x}_${z}`];
          return (
            <group key={`cab-${x}-${z}`} position={[x, -0.5, z]}>
              <FilingCabinet position={[0, 0, 0]} rotation={[0, x < 0 ? Math.PI/2 : -Math.PI/2, 0]} />
              {isShowcase && (
                <Text 
                  position={[x < 0 ? 0.31 : -0.31, 1.0, 0]} 
                  rotation={[0, x < 0 ? Math.PI/2 : -Math.PI/2, 0]}
                  fontSize={0.08}
                  color="#ffffff"
                  maxWidth={0.6}
                  textAlign="center"
                >
                  {isShowcase}
                </Text>
              )}
            </group>
          );
        })
      )}

      {/* Hidden Collectibles */}
      <Collectible id="research_note_12" label="Research Note" position={[-6.5, -0.4, -8.5]} color="#f0ead6" />
      <mesh position={[6.5, -0.4, -8.5]} rotation={[0, Math.random(), 0]}><boxGeometry args={[0.2, 0.05, 0.15]} /><meshStandardMaterial color="#222" /></mesh> {/* Audio Tape */}
      <mesh position={[-6.5, -0.4, 8.5]} rotation={[0, Math.random(), 0]}><planeGeometry args={[0.15, 0.1]} /><meshStandardMaterial color="#fff" /></mesh> {/* Photograph */}

      {/* ─── CENTRAL READING TABLE (The Crime Scene) ─── */}
      {/* 4w x 1.5d x 1h */}
      <group position={[0, -0.5, 0]}>
        <mesh position={[0, 0.95, 0]}><boxGeometry args={[4, 0.1, 1.5]} /><meshStandardMaterial color="#3a2518" roughness={0.7} /></mesh>
        <mesh position={[-1.8, 0.45, -0.6]}><boxGeometry args={[0.1, 0.9, 0.1]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        <mesh position={[1.8, 0.45, -0.6]}><boxGeometry args={[0.1, 0.9, 0.1]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        <mesh position={[-1.8, 0.45, 0.6]}><boxGeometry args={[0.1, 0.9, 0.1]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        <mesh position={[1.8, 0.45, 0.6]}><boxGeometry args={[0.1, 0.9, 0.1]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
      </group>

      {/* ─── CONTRADICTORY CASE FILES ─── */}
      {/* Version A: Completed */}
      <DocumentProp 
        position={[-1.0, 0.51, 0.2]} 
        rotation={[-Math.PI/2, 0, -0.1]}
        document={{
          id: "CASE-12-A",
          title: "CASE FILE 12-A\nINFRAMIND",
          type: "case_file",
          content: `STATUS:\nOperational\n\nDESCRIPTION:\nDistributed infrastructure simulation platform.\n\nPROBLEM:\nCloud cost visibility and infrastructure drift.\n\nARCHITECTURE:\nDocker, Kubernetes, Prometheus, Grafana\n\nRESULT:\nReduced deployment complexity. Project marked fully complete and handed over to ops.`
        }} 
      />

      {/* Version B: Cancelled */}
      <DocumentProp 
        position={[0.2, 0.51, -0.3]} 
        rotation={[-Math.PI/2, 0, 0.4]}
        document={{
          id: "CASE-12-B",
          title: "CASE FILE 12-B\nINFRAMIND",
          type: "case_file",
          content: `STATUS:\nCancelled Due To Containment Failure\n\nDESCRIPTION:\nDistributed infrastructure simulation platform.\n\nPROBLEM:\nThe agents were granted autonomous scaling privileges. They did not optimize the cloud cost; they drained the corporate account to lease 4,000 additional GPUs.\n\nRESULT:\nPhysical servers destroyed. Network isolated.`
        }} 
      />

      {/* Version C: Still Running */}
      
        
        {/* Cabinet 12: Deployment Records */}
        <FilingCabinet position={[6, 0.5, -2]} rotation={[0, -Math.PI/2, 0]} />
        <DocumentProp
          position={[5.6, 1.61, -2]}
          rotation={[-Math.PI/2, 0, Math.PI/2]}
          document={{
            id: "CABINET-12",
            title: "DEPLOYMENT RECORDS",
            type: "case_file",
            content: `Case File 12-A\n\nINFRASTRUCTURE & DEPLOYMENT\n\nEvidence Locker:\n- Containerized Deployments\n- Infrastructure Automation\n- Cloud Hosting\n- CI/CD Pipelines`
          }}
        />

        {/* Cabinet 21: Containment Reports */}
        <FilingCabinet position={[6, 0.5, 0]} rotation={[0, -Math.PI/2, 0]} />
        <DocumentProp position={[5.6, 1.61, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]}
          document={{ id: "CABINET-21", title: "CONTAINMENT REPORTS", type: "case_file", content: `Case File 21-B\n\nSECURITY RESEARCH ARCHIVE\n\nEvidence Locker:\n- Research Paper\n- Threat Models\n- Microservice Security Notes\n- Investigation Logs` }} 
        />

        {/* Cabinet 33: Operations Archive */}
        <FilingCabinet position={[6, 0.5, 2]} rotation={[0, -Math.PI/2, 0]} />
        <DocumentProp position={[5.6, 1.61, 2]} rotation={[-Math.PI/2, 0, Math.PI/2]}
          document={{ id: "CABINET-33", title: "OPERATIONS ARCHIVE", type: "case_file", content: `Case File 33-C\n\nENGINEERING INCIDENT ARCHIVE\n\nIncident A: Docker Network Isolation Failure\nSymptoms: Services unable to resolve internal DNS.\nRoot Cause: Bridge network IP conflicts.\nResolution: Custom subnet allocation.\n\nIncident B: Reverse Proxy Routing Failure\nSymptoms: Nginx returning 502 Bad Gateway under load.\nRoot Cause: Exhausted worker connections.\nResolution: Tuned worker_rlimit_nofile.\n\nIncident C: State Persistence Corruption\nSymptoms: Database locking.\nRoot Cause: Concurrent write contention in SQLite.\nResolution: Migrated to PostgreSQL.\n\nIncident D: Container Communication Breakdown\nSymptoms: Silent packet drops.\nRoot Cause: MTU mismatch on host virtual interfaces.\nResolution: Standardized MTU flags across daemon.` }} 
        />

        {/* Cabinet 47: Restricted Programs */}
        <FilingCabinet position={[6, 0.5, 4]} rotation={[0, -Math.PI/2, 0]} />
        <DocumentProp position={[5.6, 1.61, 4]} rotation={[-Math.PI/2, 0, Math.PI/2]}
          document={{ id: "CABINET-47", title: "RESTRICTED PROGRAMS", type: "case_file", content: `Case File 47-X\n\nEXPERIMENTAL SYSTEMS\n\nStatus:\nResearch Phase / Prototype\n\nClassification:\nDistributed Systems\n\nContents:\nKubernetes, Open Source, Advanced Platform Engineering\n\n(Note: Physical access to Restricted Archive required for full dossiers.)` }} 
        />

        {/* File A: Current Major Project */}
        <DocumentProp position={[-0.5, 1.11, -0.1]} rotation={[-Math.PI/2, 0, 0.1]}
          document={{ id: "PROJ-ACTIVE", title: "CURRENT INVESTIGATION", type: "case_file", content: `CASE FILE: PLATFORM LABORATORY\n\nOBJECTIVE:\nBuild repeatable infrastructure environments locally.\n\nTECHNOLOGIES:\nDocker, WSL2, Nginx, Python, GitHub Actions, Prometheus, Grafana.\n\nPROBLEMS INVESTIGATED:\nNetwork Isolation, Reverse Proxy Routing, Persistent Storage, Observability.\n\nOUTCOME:\nEstablished a reproducible engineering environment for experimentation and incident analysis.` }} 
        />

        {/* Contradictory Incident Reports (The Horror Element) */}
        <DocumentProp position={[1.8, 1.11, -0.6]} rotation={[-Math.PI/2, 0, -0.1]}
          document={{ id: "NOTE-CONTRA-1", title: "INCIDENT REPORT 14", type: "note", content: `STATUS: Resolved\n\nRoot Cause:\nNetwork segmentation fault.\n\nSystems restored.` }} 
        />
        <DocumentProp position={[-2.3, 0.81, -0.8]} rotation={[-Math.PI/2, 0, 0.4]}
          document={{ id: "NOTE-CONTRA-2", title: "INCIDENT REPORT 14", type: "note", content: `STATUS: Escalating\n\nRoot Cause remains unknown.\n\nDo not reconnect affected nodes.` }} 
        />
        <DocumentProp position={[-1.2, 0.01, 1.5]} rotation={[-Math.PI/2, 0, -0.5]}
          document={{ id: "NOTE-CONTRA-3", title: "INCIDENT REPORT 14", type: "note", content: `STATUS: Invalid\n\nNo affected systems exist.\n\nRecord should be destroyed.` }} 
        />

        {/* Hidden Collectible */}
        <Collectible id="Archive Keycard" label="Archive Keycard" position={[0, 0.01, 0.5]} color="#44ff44" />

        {/* Table Clutter */}
        <mesh position={[-1, 1.35, 0.5]}><boxGeometry args={[0.2, 0.2, 0.2]} /><meshStandardMaterial color="#555" /></mesh>
        <VisitorChairs position={[-2.5, 0.5, 0]} rotation={[0, Math.PI/2, 0]} />
        <VisitorChairs position={[2.5, 0.5, 0]} rotation={[0, -Math.PI/2, 0]} />
        <VisitorChairs position={[0, 0.5, 1.5]} rotation={[0, 0, 0]} />
      

      {/* ─── WALL CABINETS ─── */}
      <FilingCabinet position={[6, 0.5, -2]} rotation={[0, -Math.PI/2, 0]} />
      <DocumentProp
        position={[5.6, 1.61, -2]}
        rotation={[-Math.PI/2, 0, Math.PI/2]}
        document={{
          id: "CABINET-12",
          title: "DEPLOYMENT RECORDS",
          type: "case_file",
          content: `Case File 12-A\n\nINFRASTRUCTURE & DEPLOYMENT\n\nEvidence Locker:\n- Containerized Deployments\n- Infrastructure Automation\n- Cloud Hosting\n- CI/CD Pipelines`
        }}
      />
      <FilingCabinet position={[6, 0.5, 0]} rotation={[0, -Math.PI/2, 0]} />
      <DocumentProp position={[5.6, 1.61, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]}
        document={{ id: "CABINET-21", title: "CONTAINMENT REPORTS", type: "case_file", content: `Case File 21-B\n\nSECURITY RESEARCH ARCHIVE\n\nEvidence Locker:\n- Research Paper\n- Threat Models\n- Microservice Security Notes\n- Investigation Logs` }} 
      />
      <FilingCabinet position={[6, 0.5, 2]} rotation={[0, -Math.PI/2, 0]} />
      <DocumentProp position={[5.6, 1.61, 2]} rotation={[-Math.PI/2, 0, Math.PI/2]}
        document={{ id: "CABINET-33", title: "OPERATIONS ARCHIVE", type: "case_file", content: `Case File 33-C\n\nENGINEERING INCIDENT ARCHIVE\n\nIncident A: Docker Network Isolation Failure\nSymptoms: Services unable to resolve internal DNS.\nRoot Cause: Bridge network IP conflicts.\nResolution: Custom subnet allocation.\n\nIncident B: Reverse Proxy Routing Failure\nSymptoms: Nginx returning 502 Bad Gateway under load.\nRoot Cause: Exhausted worker connections.\nResolution: Tuned worker_rlimit_nofile.\n\nIncident C: State Persistence Corruption\nSymptoms: Database locking.\nRoot Cause: Concurrent write contention in SQLite.\nResolution: Migrated to PostgreSQL.\n\nIncident D: Container Communication Breakdown\nSymptoms: Silent packet drops.\nRoot Cause: MTU mismatch on host virtual interfaces.\nResolution: Standardized MTU flags across daemon.` }} 
      />
      <FilingCabinet position={[6, 0.5, 4]} rotation={[0, -Math.PI/2, 0]} />
      <DocumentProp position={[5.6, 1.61, 4]} rotation={[-Math.PI/2, 0, Math.PI/2]}
        document={{ id: "CABINET-47", title: "RESTRICTED PROGRAMS", type: "case_file", content: `Case File 47-X\n\nEXPERIMENTAL SYSTEMS\n\nStatus:\nResearch Phase / Prototype\n\nClassification:\nDistributed Systems\n\nContents:\nKubernetes, Open Source, Advanced Platform Engineering\n\n(Note: Physical access to Restricted Archive required for full dossiers.)` }} 
      />

      {/* ─── CEILING-HUNG ARCHIVE MAP ─── */}
      <group position={[0, 2.5, 0]}>
        <DocumentProp position={[0, 0, 0]} rotation={[0, 0, 0]}
          document={{ id: "REC-MAP", title: "FACILITY MAP", type: "note", content: `RECEPTION WING\n\nPERSONNEL WING\n\nRECORDS HALL\n\nCOMMUNICATIONS (DO NOT ACCESS)\n\nSUBLEVEL -1 (DATA REMOVED)` }} 
        />
        {/* Support chains/wires for the map */}
        <mesh position={[-0.15, 0.45, 0]}><cylinderGeometry args={[0.005, 0.005, 0.9]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[0.15, 0.45, 0]}><cylinderGeometry args={[0.005, 0.005, 0.9]} /><meshStandardMaterial color="#222" /></mesh>
        {/* Large backboard to make it visually iconic */}
        <mesh position={[0, 0, -0.02]}><boxGeometry args={[1.5, 1.0, 0.02]} /><meshStandardMaterial color="#d4c398" roughness={1} /></mesh>
      </group>

      {/* ─── SECTION 3: RESTRICTED ARCHIVE (Z = -3 to Z = -9) ─── */}
      <group position={[0, 0, 0]}>
        {/* Chain Fence / Security Gate at Z = -3 */}
        <group position={[0, 0, -3]}>
          {/* Posts */}
          <mesh position={[-7, 1.5, 0]}><cylinderGeometry args={[0.05, 0.05, 3]} /><meshStandardMaterial color="#444" metalness={0.8} /></mesh>
          <mesh position={[-3, 1.5, 0]}><cylinderGeometry args={[0.05, 0.05, 3]} /><meshStandardMaterial color="#444" metalness={0.8} /></mesh>
          <mesh position={[3, 1.5, 0]}><cylinderGeometry args={[0.05, 0.05, 3]} /><meshStandardMaterial color="#444" metalness={0.8} /></mesh>
          <mesh position={[7, 1.5, 0]}><cylinderGeometry args={[0.05, 0.05, 3]} /><meshStandardMaterial color="#444" metalness={0.8} /></mesh>
          {/* Chainlink Mesh (Semi-transparent) */}
          <mesh position={[-5, 1.5, 0]}><planeGeometry args={[4, 3]} /><meshStandardMaterial color="#111" wireframe transparent opacity={0.3} /></mesh>
          <mesh position={[5, 1.5, 0]}><planeGeometry args={[4, 3]} /><meshStandardMaterial color="#111" wireframe transparent opacity={0.3} /></mesh>
          
          {/* The Gate */}
          <group position={[-3, 0, 0]} rotation={[0, isGateUnlocked ? 1.5 : 0, 0]}>
            <mesh position={[3, 1.5, 0]}><planeGeometry args={[6, 3]} /><meshStandardMaterial color="#111" wireframe transparent opacity={0.3} /></mesh>
            <mesh position={[3, 1.5, 0]}><boxGeometry args={[6, 3, 0.05]} /><meshStandardMaterial color="#222" wireframe /></mesh>
            {/* Lock Status */}
            <mesh position={[5.9, 1.5, 0.1]}><boxGeometry args={[0.1, 0.15, 0.05]} /><meshStandardMaterial color={isGateUnlocked ? "#00ff00" : "#800"} /></mesh>
          </group>
        </group>

        {/* Restricted Archive Contents */}
        <group position={[0, -0.5, -6]}>
          <FilingCabinet position={[-2, 0, 0]} rotation={[0, 0, 0]} />
          <FilingCabinet position={[0, 0, 0]} rotation={[0, 0, 0]} />
          <FilingCabinet position={[2, 0, 0]} rotation={[0, 0, 0]} />

          {/* Minor Archive 1: Kubernetes Initiative */}
          <DocumentProp position={[-2, 1.11, 0]} rotation={[-Math.PI/2, 0, 0.1]}
            document={{ id: "MINOR-1", title: "KUBERNETES INITIATIVE", type: "dossier", content: `PROJECT: Kubernetes Initiative\n\nSTATUS: Ongoing\n\nOBJECTIVE:\nDeep dive into orchestration, operators, and stateful deployments.\n\nTRAJECTORY:\nProving ability to handle complex infrastructure.` }} 
          />

          {/* Minor Archive 2: Open Source Contribution */}
          <DocumentProp position={[0, 1.11, 0]} rotation={[-Math.PI/2, 0, -0.1]}
            document={{ id: "MINOR-2", title: "OPEN SOURCE CONTRIBUTION PROGRAM", type: "dossier", content: `PROJECT: Open Source Contribution\n\nSTATUS: Pending Deployment\n\nOBJECTIVE:\nContribute upstream fixes to heavily relied-upon cloud-native tools.\n\nTRAJECTORY:\nDemonstrating deep community integration and codebase adaptability.` }} 
          />

          {/* Minor Archive 3: Distributed Systems Lab */}
          <DocumentProp position={[2, 1.11, 0]} rotation={[-Math.PI/2, 0, 0]}
            document={{ id: "MINOR-3", title: "DISTRIBUTED SYSTEMS LAB", type: "dossier", content: `PROJECT: Distributed Systems Lab\n\nSTATUS: Research Phase\n\nOBJECTIVE:\nExploring novel consensus algorithms and failure injection methods.\n\nTRAJECTORY:\nPushing boundaries on what makes systems fundamentally reliable.` }} 
          />
          
          {/* Audio Log Collectible on the floor */}
          <Collectible id="audio_tape_records" label="Research Tape" position={[3, 0.1, 1]} color="#ff4444" />
        </group>
      </group>

    </group>
  );
}
