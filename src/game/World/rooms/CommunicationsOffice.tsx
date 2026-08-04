import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomFloor, RoomCeiling, RoomWall, NoticeBoard } from "../props/RoomArchitecture";
import {
  SupervisorDesk,
  WallClock,
  DeskLamp,
} from "../props/PersonnelProps";
import {
  CoffeeMug,
  Pen,
  StickyNote,
  Keyboard,
  CRTMonitor,
} from "../props/Clutter";
import { DocumentProp } from "../props/DocumentProp";
import { InstancedDebris } from "../props/InstancedDebris";
import { CeilingPipes, HVACVent } from "../props/RoomArchitecture";
import { ServerRack } from "../props/ServerRack";
import { GlassWhiteboard } from "../props/GlassWhiteboard";
import { useGameState } from "../../useGameState";
import { InteractableObject } from "../../Interactables/InteractableObject";

export function CommunicationsOffice({ position = [0, 0, 0], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] }) {
  const addInventoryItem = useGameState(state => state.addInventoryItem);
  const inventory = useGameState(state => state.inventory);

  return (
    <group position={position} rotation={rotation}>
      {/* Room Architecture - Research Lab (5.5m x 6.5m) */}
      <RoomFloor args={[5.5, 6.5]} position={[0, -0.5, 0.25]} />
      <RoomCeiling args={[5.5, 0.1, 6.5]} position={[0, 2.9, 0.25]} hasLights={false} />
      
      {/* Rear Wall (North) */}
      <RoomWall position={[0, 0, 3]} args={[5, 3.2, 0.2]} />
      {/* Right Wall (East) */}
      <RoomWall position={[2.5, 0, 0]} args={[0.2, 3.2, 6]} />
      {/* Left Wall (West) */}
      <RoomWall position={[-2.5, 0, 0]} args={[0.2, 3.2, 6]} />
      {/* South Wall (3.0m Open Suite Entrance Flush with Corridor) */}
      <RoomWall position={[-2.0, 0, -3]} args={[1.0, 3.2, 0.2]} />
      <RoomWall position={[2.0, 0, -3]} args={[1.0, 3.2, 0.2]} />
      <mesh position={[0, 3.0, -3]}>
        <boxGeometry args={[3.0, 0.4, 0.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Ceiling Elements */}
      <CeilingPipes position={[1, 2.75, -2]} rotation={[0, Math.PI / 2, 0]} length={4} />
      <HVACVent position={[-1, 2.65, 1]} />

      {/* ─── RESEARCH LAB COOL BLUE LIGHTING ─── */}
      <spotLight position={[0, 2.8, 0]} target-position={[0, 0, 0]} angle={0.9} penumbra={0.5} intensity={2.5} distance={9} color="#00aacc" />
      <pointLight position={[-1.8, 1.8, 0]} color="#00ff99" intensity={0.8} distance={4} decay={2} />

      {/* ─── NORTH WALL: GLASS WHITEBOARD (LOCAL AI ARCHITECTURE) ─── */}
      <GlassWhiteboard position={[0, 1.5, 2.85]} rotation={[0, 0, 0]} />

      {/* ─── WEST WALL: RACK-MOUNTED SERVER TOWERS ─── */}
      <ServerRack position={[-2.1, 0, 1.2]} rotation={[0, Math.PI / 2, 0]} />
      <ServerRack position={[-2.1, 0, -0.6]} rotation={[0, Math.PI / 2, 0]} />

      {/* ─── LOCAL AI GPU WORKSTATION ─── */}
      <SupervisorDesk position={[0.2, 0, 0.2]} rotation={[0, -Math.PI / 6, 0]} />

      <group position={[0.2, 0, 0.2]} rotation={[0, -Math.PI / 6, 0]}>
        <CRTMonitor position={[-0.1, 0.81, -0.6]} rotation={[0, -0.2, 0]} on={true} />
        <Keyboard position={[-0.1, 0.81, -0.3]} rotation={[0, -0.2, 0]} />
        <DeskLamp position={[0.6, 0.81, -0.3]} rotation={[0, 0.5, 0]} on={true} />
        <CoffeeMug position={[0.8, 0.81, 0.3]} rotation={[0, 0.8, 0]} spilled={false} />
        <StickyNote position={[0.4, 0.81, -0.3]} rotation={[0, 0.2, 0]} color="#aaccff" />

        {/* Local AI Experiment Document */}
        <DocumentProp position={[0.3, 0.81, -1.0]} rotation={[0, -0.1, 0]}
          document={{
            id: "DOC-AI-EXPERIMENT",
            title: "LOCAL LLM EXPERIMENT LOG - ATTEMPT 41",
            type: "dossier",
            content: `LOCAL LLM EXPERIMENT LOG (ATTEMPT 41)\n\nModel: Qwen-14B / 16GB VRAM\nArchitecture: Zero-Cloud / 100% Offline\n\nResult: Attempt 41 finally works. Agentic task execution running smoothly without external telemetry.`
          }}
        />

        {/* Pickable Level 2 Master Keycard on Workstation Table */}
        {!inventory["KEYCARD-LEVEL2"] && (
          <group position={[-0.6, 0.82, -0.2]}>
            <InteractableObject
              label="Take Level 2 Research Clearance Keycard"
              onInteract={() => addInventoryItem({
                id: "KEYCARD-LEVEL2",
                name: "Level 2 Research Clearance Keycard",
                description: "Master Clearance Access Card granting entry to Sublevel Research Vault.",
                category: "key",
                acquired: true,
                isNew: true,
                icon: "keycard_level2"
              })}
            >
              <mesh rotation={[-Math.PI / 2, 0, 0.4]}>
                <boxGeometry args={[0.1, 0.01, 0.14]} />
                <meshStandardMaterial color="#00aacc" roughness={0.3} metalness={0.8} />
              </mesh>
            </InteractableObject>
          </group>
        )}
      </group>

      {/* East Wall Notice Board */}
      <NoticeBoard position={[2.35, 1.2, -1]} rotation={[0, -Math.PI / 2, 0]} />
      <DocumentProp position={[2.32, 1.2, -0.8]} rotation={[0, -Math.PI / 2, 0]}
        document={{
          id: "DOC-HERMES-NOTE",
          title: "PROJECT HERMES CORE MEMO",
          type: "note",
          content: `MEMORANDUM: PROJECT HERMES CORE\n\n"Local First → Privacy → Offline → Ownership"\n\nDo not push unverified telemetry to cloud endpoints.`
        }}
      />
      
      {/* Wall Clock */}
      <WallClock position={[0, 2.4, -2.9]} rotation={[0, Math.PI, 0]} />
      
      {/* Paper Debris */}
      <InstancedDebris count={12} areaSize={[3, 3]} position={[0, -0.49, 0]} type="paper" />
    </group>
  );
}
