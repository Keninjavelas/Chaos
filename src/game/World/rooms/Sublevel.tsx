import React from "react";
import { RoomProps } from "../types";
import { DocumentProp } from "../props/DocumentProp";
import { Collectible } from "../props/Collectible";
import { InteractableObject } from "../../Gameplay/InteractableObject";
import { useArchiveStore } from "@/lib/state";
import * as THREE from "three";

export function Sublevel({ position }: RoomProps) {
  const { setTeleportTarget } = useArchiveStore();

  return (
    <group position={position}>
      {/* ─── ATMOSPHERE & LIGHTING ─── */}
      <ambientLight intensity={0.3} color="#fff1e0" />
      <pointLight position={[0, 2.5, 0]} intensity={2.5} color="#ffecd1" distance={15} decay={2} />
      {/* Desk Lamp */}
      <pointLight position={[0.5, 1.2, 0]} intensity={1.8} color="#ffb347" distance={4} decay={2} />

      {/* ─── ARCHITECTURE ─── */}
      {/* Floor – Warm concrete */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.6} />
      </mesh>
      {/* Ceiling – Light concrete */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#a58c7b" roughness={0.8} />
      </mesh>
      {/* Walls – Dark walnut paneling */}
      <mesh position={[0, 1.25, -5]}><boxGeometry args={[10, 3.5, 0.2]} /><meshStandardMaterial color="#3b2f2f" /></mesh>
      <mesh position={[0, 1.25, 5]}><boxGeometry args={[10, 3.5, 0.2]} /><meshStandardMaterial color="#3b2f2f" /></mesh>
      <mesh position={[-5, 1.25, 0]}><boxGeometry args={[0.2, 3.5, 10]} /><meshStandardMaterial color="#3b2f2f" /></mesh>
      <mesh position={[5, 1.25, 0]}><boxGeometry args={[0.2, 3.5, 10]} /><meshStandardMaterial color="#3b2f2f" /></mesh>

      {/* Bookshelves – Left back wall */}
      <group position={[-4.5, 0.5, -2]}>
        <mesh position={[0, 0, 0]}><boxGeometry args={[1.5, 2.5, 0.2]} /><meshStandardMaterial color="#8b5a2b" /></mesh>
        <mesh position={[0, -0.9, 0.15]}><boxGeometry args={[1.4, 0.2, 0.6]} /><meshStandardMaterial color="#5a3e2e" /></mesh>
        <mesh position={[0, -0.5, 0.15]}><boxGeometry args={[1.4, 0.2, 0.6]} /><meshStandardMaterial color="#5a3e2e" /></mesh>
        <mesh position={[0, -0.1, 0.15]}><boxGeometry args={[1.4, 0.2, 0.6]} /><meshStandardMaterial color="#5a3e2e" /></mesh>
      </group>

      {/* Return elevator (back wall) */}
      <group position={[0, -0.5, 4.9]}>
        <mesh position={[0, 1.2, 0]}><boxGeometry args={[2.2, 2.5, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[-0.5, 1.2, -0.1]}><boxGeometry args={[1.0, 2.4, 0.05]} /><meshStandardMaterial color="#cccccc" metalness={0.5} /></mesh>
        <mesh position={[0.5, 1.2, -0.1]}><boxGeometry args={[1.0, 2.4, 0.05]} /><meshStandardMaterial color="#cccccc" metalness={0.5} /></mesh>
        <InteractableObject
          position={[1.3, 1.2, -0.1]}
          size={[0.3, 0.5, 0.05]}
          label="RETURN TO SURFACE"
          color="#336633"
          onInteract={() => setTeleportTarget([0, 1, -8])}
        />
      </group>

      {/* ─── WORKSTATION (center) ─── */}
      <group position={[0, 0, 0]}>
        {/* Desk */}
        <mesh position={[0, 0.75, 0]}><boxGeometry args={[2.4, 0.05, 1.2]} /><meshStandardMaterial color="#dddddd" /></mesh>
        {/* Legs */}
        <mesh position={[-1.1, 0.375, -0.5]}><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[1.1, 0.375, -0.5]}><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[-1.1, 0.375, 0.5]}><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[1.1, 0.375, 0.5]}><cylinderGeometry args={[0.03, 0.03, 0.75]} /><meshStandardMaterial color="#222" /></mesh>
        {/* Chair */}
        <mesh position={[0, 0.45, 0.8]}><cylinderGeometry args={[0.3, 0.3, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[0, 0.8, 1.0]} rotation={[-0.1, 0, 0]}><boxGeometry args={[0.5, 0.6, 0.1]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[0, 0.225, 0.8]}><cylinderGeometry args={[0.05, 0.05, 0.45]} /><meshStandardMaterial color="#111" /></mesh>
        {/* Monitor */}
        <mesh position={[0, 1.1, -0.3]}>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <DocumentProp
          position={[0, 1.1, -0.27]}
          rotation={[0, 0, 0]}
          document={{
            id: "FINAL-MONITOR",
            title: "SYSTEM TERMINAL",
            type: "terminal",
            content: `PROJECT STATUS\n\nACTIVE\n\nLast Updated:\nToday`
          }}
        />
        {/* Lamp */}
        <mesh position={[0.7, 0.78, -0.3]}><cylinderGeometry args={[0.1, 0.1, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[0.7, 1.0, -0.3]}><cylinderGeometry args={[0.02, 0.02, 0.4]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[0.5, 1.2, -0.3]} rotation={[0, 0, Math.PI/4]}><coneGeometry args={[0.15, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
        {/* Personal Log (shortened) */}
        <DocumentProp
          position={[-0.5, 0.78, 0]}
          rotation={[-Math.PI/2, 0, 0.2]}
          document={{
            id: "LOG-PERSONAL",
            title: "Personal Log",
            type: "note",
            content: `If you're reading this,\n\nthe elevator finally opened.\n\nGood.\n\nThere's still a lot left to build.`
          }}
        />
        {/* Corkboard – Roadmap (offset behind & right) */}
        <group position={[0.4, 0.8, -0.5]}>
          <mesh position={[0, 0, 0]}><planeGeometry args={[3, 2]} /><meshStandardMaterial color="#444" /></mesh>
          <DocumentProp
            position={[0, 0.1, 0.01]}
            rotation={[0, 0, 0]}
            document={{
              id: "CORKBOARD-2027",
              title: "2027",
              type: "note",
              content: `Platform Engineering   ☐\nDistributed Systems    ☐\nCloud Infrastructure    ☐\nSecurity Engineering    ☑\nOpen Source            ☐`
            }}
          />
        </group>
      </group>

      {/* ─── PROTOTYPE SHELF (left wall near whiteboard) ─── */}
      <group position={[-4.9, 0.5, -1]}>
        <mesh position={[0, 0.1, 0]}><boxGeometry args={[3, 0.05, 0.4]} /><meshStandardMaterial color="#555" /></mesh>
        <DocumentProp
          position={[-1, 0.3, 0]}
          rotation={[-Math.PI/2, 0, 0]}
          document={{
            id: "PROTO-A",
            title: "Prototype A – Portfolio Website v1",
            type: "note",
            content: `ABANDONED`
          }}
        />
        <DocumentProp
          position={[0, 0.3, 0]}
          rotation={[-Math.PI/2, 0, 0]}
          document={{
            id: "PROTO-B",
            title: "Prototype B – Traditional Dashboard Concept",
            type: "note",
            content: `REPLACED`
          }}
        />
        <DocumentProp
          position={[1, 0.3, 0]}
          rotation={[-Math.PI/2, 0, 0]}
          document={{
            id: "PROTO-C",
            title: "Prototype C – Archive Facility Alpha",
            type: "note",
            content: `INSUFFICIENT`
          }}
        />
      </group>

      {/* ─── WHITEBOARD (left wall) ─── */}
      <group position={[-4.9, 1.5, 0]} rotation={[0, Math.PI/2, 0]}>
        <mesh><boxGeometry args={[4, 2, 0.1]} /><meshStandardMaterial color="#ffffff" /></mesh>
        <mesh position={[0, 1, 0]}><boxGeometry args={[4.1, 0.05, 0.15]} /><meshStandardMaterial color="#888" /></mesh>
        <mesh position={[0, -1, 0]}><boxGeometry args={[4.1, 0.05, 0.15]} /><meshStandardMaterial color="#888" /></mesh>
        <mesh position={[-2, 0, 0]}><boxGeometry args={[0.05, 2, 0.15]} /><meshStandardMaterial color="#888" /></mesh>
        <mesh position={[2, 0, 0]}><boxGeometry args={[0.05, 2, 0.15]} /><meshStandardMaterial color="#888" /></mesh>
        <DocumentProp
          position={[0, 0, 0.06]}
          rotation={[0, 0, 0]}
          document={{
            id: "WB-FINAL",
            title: "ENGINEERING NOTES",
            type: "note",
            content: `Ideas / Experiments / Architectures\n\n- Need stronger Kubernetes skills.\n- Build larger systems.\n- Contribute to open source.\n- Create something people remember.\n- Learn distributed systems.`
          }}
        />
      </group>

      {/* ─── BLUEPRINT WALL (right wall) ─── */}
      <group position={[4.9, 1.5, 0]} rotation={[0, -Math.PI/2, 0]}>
        <mesh position={[-1.5, 0.5, 0]}><planeGeometry args={[1, 0.8]} /><meshStandardMaterial color="#444" /></mesh>
        <DocumentProp position={[-1.5, 0.5, 0.01]} document={{ id: "BP-REC", title: "RECEPTION WING", type: "note", content: `Reception\n\n[ANNOTATION: Needs Improvement.]` }} />
        <mesh position={[0, 0.5, 0]}><planeGeometry args={[1, 0.8]} /><meshStandardMaterial color="#444" /></mesh>
        <DocumentProp position={[0, 0.5, 0.01]} document={{ id: "BP-PER", title: "PERSONNEL WING", type: "note", content: `Personnel\n\n[ANNOTATION: Still Incomplete.]` }} />
        <mesh position={[1.5, 0.5, 0]}><planeGeometry args={[1, 0.8]} /><meshStandardMaterial color="#444" /></mesh>
        <DocumentProp position={[1.5, 0.5, 0.01]} document={{ id: "BP-REC2", title: "RECORDS HALL", type: "note", content: `Records\n\n[ANNOTATION: Not Good Enough.]` }} />
        <mesh position={[-0.75, -0.5, 0]}><planeGeometry args={[1, 0.8]} /><meshStandardMaterial color="#444" /></mesh>
        <DocumentProp position={[-0.75, -0.5, 0.01]} document={{ id: "BP-COM", title: "COMMUNICATIONS OFFICE", type: "note", content: `Communications\n\n[ANNOTATION: Try Again.]` }} />
      </group>

      {/* ─── SCALE MODEL SHELF (right side) ─── */}
      <group position={[3.5, 0.2, -1]}>
        <mesh position={[0, 0, 0]}><boxGeometry args={[2, 0.05, 1]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[-0.8, 0.3, 0]}><boxGeometry args={[0.4, 0.2, 0.6]} /><meshStandardMaterial color="#555" /></mesh>
        <DocumentProp position={[-0.8, 0.5, 0.35]} rotation={[-Math.PI/2, 0, 0]} document={{ id: "MODEL-REC", title: "Reception Wing Model", type: "note", content: `` }} />
        <mesh position={[-0.2, 0.3, 0]}><boxGeometry args={[0.4, 0.2, 0.6]} /><meshStandardMaterial color="#555" /></mesh>
        <DocumentProp position={[-0.2, 0.5, 0.35]} rotation={[-Math.PI/2, 0, 0]} document={{ id: "MODEL-PER", title: "Personnel Wing Model", type: "note", content: `` }} />
        <mesh position={[0.4, 0.3, 0]}><boxGeometry args={[0.4, 0.2, 0.6]} /><meshStandardMaterial color="#555" /></mesh>
        <DocumentProp position={[0.4, 0.5, 0.35]} rotation={[-Math.PI/2, 0, 0]} document={{ id: "MODEL-REC-HALL", title: "Records Hall Model", type: "note", content: `` }} />
        <mesh position={[1.0, 0.3, 0]}><boxGeometry args={[0.4, 0.2, 0.6]} /><meshStandardMaterial color="#555" /></mesh>
        <DocumentProp position={[1.0, 0.5, 0.35]} rotation={[-Math.PI/2, 0, 0]} document={{ id: "MODEL-COM", title: "Communications Office Model", type: "note", content: `` }} />
      </group>

      {/* ─── REWARD SHELF (front wall) ─── */}
      <group position={[-2, 1.2, -4.9]}>
        <mesh><boxGeometry args={[1.5, 0.05, 0.4]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[0, 0.05, 0]} rotation={[0, 0.2, 0]}><boxGeometry args={[0.4, 0.02, 0.3]} /><meshStandardMaterial color="#ddd" /></mesh>
        <Collectible id="Master Facility Map" label="Master Facility Map" position={[0, 0.08, 0]} color="#44ff44" />
      </group>
    </group>
  );
}
