import React from "react";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall } from "../props/RoomArchitecture";
import { DocumentProp } from "../props/DocumentProp";
import { Collectible } from "../props/Collectible";
import { PointLight } from "three";

function ServerRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main rack body */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 3, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Server blades */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0.4 + i * 0.3, 0.35]}>
          <boxGeometry args={[0.9, 0.1, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      {/* Blinking LEDs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`led-${i}`} position={[-0.3, 0.4 + i * 0.3, 0.41]}>
          <boxGeometry args={[0.02, 0.02, 0.01]} />
          <meshBasicMaterial color={Math.random() > 0.5 ? "#00ff00" : "#ff0000"} />
        </mesh>
      ))}
    </group>
  );
}

function OperatorDesk({ position, type }: { position: [number, number, number], type: 1 | 2 | 3 }) {
  const isActive = type === 3;
  return (
    <group position={position}>
      {/* Desk */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2, 0.05, 1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Monitors */}
      <mesh position={[-0.6, 1.1, -0.3]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.1]} />
        <meshStandardMaterial color={type === 1 ? "#555" : "#111"} /> {/* Type 1 static */}
      </mesh>
      <mesh position={[0, 1.1, -0.4]}>
        <boxGeometry args={[0.6, 0.4, 0.1]} />
        <meshStandardMaterial color={type === 1 ? "#666" : "#111"} />
      </mesh>
      <mesh position={[0.6, 1.1, -0.3]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.1]} />
        <meshStandardMaterial color={type === 1 ? "#444" : "#111"} />
      </mesh>
      
      {/* Screen glow if active */}
      {isActive && <pointLight position={[0, 1.1, 0]} color="#4a90e2" intensity={0.5} distance={3} />}
      
      {/* Type 1 Details: Coffee Mug & Dust */}
      {type === 1 && (
        <mesh position={[0.7, 0.82, 0.2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      )}

      {/* Type 2 Details: Error Screen */}
      {type === 2 && (
        <DocumentProp position={[0, 1.1, -0.34]} rotation={[0, 0, 0]} 
          document={{ id: `ERR-TIMEOUT`, title: "CONNECTION TIMED OUT", type: "note", content: "FATAL: CONNECTION TIMED OUT" }} 
        />
      )}

      {/* Type 3 Details: Empty Photo Frame */}
      {type === 3 && (
        <group position={[0.8, 0.85, 0.1]} rotation={[0, -0.5, 0.2]}>
          <mesh><boxGeometry args={[0.2, 0.25, 0.02]} /><meshStandardMaterial color="#3a2a1a" /></mesh>
          {/* Empty inside */}
          <mesh position={[0, 0, 0.011]}><planeGeometry args={[0.15, 0.2]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        </group>
      )}
    </group>
  );
}

export function CommunicationsOffice({ position, rotation }: RoomProps) {
  // Dimensions: 8x10m (X: -4 to 4, Z: -5 to 5)
  return (
    <group position={position} rotation={rotation}>
      {/* Lighting */}
      <ambientLight intensity={0.1} color="#4a90e2" />
      <pointLight position={[0, 2.5, 0]} intensity={0.6} color="#4a90e2" distance={15} />

      {/* Architecture */}
      <RoomFloor args={[8, 10]} position={[0, -0.5, 0]} />
      <RoomCeiling args={[8, 0.1, 10]} position={[0, 2.9, 0]} hasLights={false} />
      
      {/* Walls */}
      <RoomWall width={8} height={3} position={[0, 0, -5]} rotation={[0, 0, 0]} /> {/* Front Wall */}
      {/* Back Wall (Doorway of 2m at X=0, Z=5) */}
      <RoomWall width={3} height={3} position={[-2.5, 0, 5]} rotation={[0, Math.PI, 0]} /> 
      <RoomWall width={3} height={3} position={[2.5, 0, 5]} rotation={[0, Math.PI, 0]} /> 
      <mesh position={[0, 2.8, 5]}><boxGeometry args={[2, 0.8, 0.2]} /><meshStandardMaterial color="#444" /></mesh> {/* Door header */}
      <RoomWall width={10} height={3} position={[-4, 0, 0]} rotation={[0, Math.PI/2, 0]} /> {/* Left Wall */}
      <RoomWall width={10} height={3} position={[4, 0, 0]} rotation={[0, -Math.PI/2, 0]} /> {/* Right Wall */}

      {/* Left Wall: Network Racks */}
      <ServerRack position={[-3.2, 0, -3]} />
      <ServerRack position={[-3.2, 0, -1.5]} />
      <ServerRack position={[-3.2, 0, 0]} />
      <ServerRack position={[-3.2, 0, 1.5]} />
      <ServerRack position={[-3.2, 0, 3]} />
      
      <DocumentProp position={[-2.8, 1.5, 0]} rotation={[0, Math.PI/2, 0]} 
        document={{ id: "ERR-DRIVE", title: "SYSTEM ALERT", type: "note", content: "CRITICAL: DRIVE FAILURE DETECTED." }} 
      />

      {/* Right Wall: Operator Stations */}
      <OperatorDesk position={[2.5, 0, 3]} type={1} />
      <OperatorDesk position={[2.5, 0, 0]} type={2} />
      
      {/* Desk 3: ACTIVE EXTERNAL RELAY */}
      <OperatorDesk position={[2.5, 0, -3]} type={3} />
      
      {/* The 3 CRT Terminals on Desk 3 */}
      {/* GitHub */}
      <DocumentProp position={[1.9, 1.15, -3.2]} rotation={[0, -0.3, 0]}
        document={{ id: "RELAY-1", title: "GITHUB", type: "terminal", content: `ARCHIVE REPOSITORY INDEX\n\nRepositories Located: 34\nRecent Activity Detected\n\n[LINK: https://github.com/Keninjavelas] [ ACCESS REPOSITORIES ]` }} 
      />
      {/* LinkedIn */}
      <DocumentProp position={[2.5, 1.15, -3.3]} rotation={[0, 0, 0]}
        document={{ id: "RELAY-2", title: "LINKEDIN", type: "terminal", content: `Professional Network Relay\n\n[LINK: https://linkedin.com/in/aryankapoor] [ OPEN PROFESSIONAL NETWORK ]` }} 
      />
      {/* Email */}
      <DocumentProp position={[3.1, 1.15, -3.2]} rotation={[0, 0.3, 0]}
        document={{ id: "RELAY-3", title: "EMAIL", type: "terminal", content: `Direct Communication Channel\n\n[LINK: mailto:aryan.kapoor030703@gmail.com] [ SEND TRANSMISSION ]` }} 
      />

      {/* Network Map Mounted Behind Desk 3 */}
      <DocumentProp position={[3.9, 2.0, -3]} rotation={[0, -Math.PI/2, 0]}
        document={{ id: "NET-MAP", title: "NETWORK TOPOLOGY", type: "note", content: `RECEPTION\n    |\nPERSONNEL\n    |\nRECORDS\n    |\nCOMMUNICATIONS\n    |\nUNKNOWN NODE` }} 
      />

      {/* Outbound Message Queue */}
      <DocumentProp position={[1, 1, 4.5]} rotation={[-Math.PI/4, 0, 0]}
        document={{ id: "OUTBOUND-QUEUE", title: "OUTBOUND MESSAGE QUEUE", type: "terminal", content: `Outbound Transmission #138\nNo Response\n\nOutbound Transmission #142\nNo Response\n\nOutbound Transmission #156\nDelivery Failed\n\nOutbound Transmission #187\nAwaiting Acknowledgement` }} 
      />

      {/* Emergency Resume Archive */}
      <group position={[0, 1.5, -4.9]}>
        {/* Cabinet body */}
        <mesh><boxGeometry args={[1, 1.2, 0.2]} /><meshStandardMaterial color="#800" /></mesh>
        {/* Cracked glass */}
        <mesh position={[0, 0, 0.11]}><planeGeometry args={[0.9, 1.1]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.3} wireframe /></mesh>
        {/* Flashing light */}
        <pointLight position={[0, 0.7, 0]} color="#ff0000" intensity={1} distance={2} />
        {/* Label */}
        <DocumentProp position={[0, -0.4, 0.12]} rotation={[0, 0, 0]}
          document={{ id: "LBL-EMERGENCY", title: "EMERGENCY LABEL", type: "note", content: "BREAK GLASS IN CASE OF RECRUITER" }} 
        />
        {/* Collectible inside */}
        <Collectible id="Resume.pdf" label="Resume Archive Package" position={[0, 0, 0.05]} color="#ffffff" />
      </group>

      {/* Scattered Logs */}
      <DocumentProp position={[-1, 0.01, -2]} rotation={[-Math.PI/2, 0, 0.4]}
        document={{ id: "LOG-A", title: "COMM LOG A", type: "note", content: "No response received." }} 
      />
      <DocumentProp position={[1, 0.01, -1]} rotation={[-Math.PI/2, 0, -0.2]}
        document={{ id: "LOG-B", title: "COMM LOG B", type: "note", content: "Retrying transmission." }} 
      />
      <DocumentProp position={[0.5, 0.01, -3]} rotation={[-Math.PI/2, 0, 0.1]}
        document={{ id: "LOG-C", title: "COMM LOG C", type: "note", content: "Connection established.\n\nDate: [REMOVED]" }} 
      />

      {/* Hidden Audio Tape */}
      <Collectible id="Audio Tape 04" label="Audio Tape 04" position={[-3.8, 0.1, -1.5]} color="#4444ff" />

    </group>
  );
}
