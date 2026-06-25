import React from "react";
import { RoomFloor, RoomCeiling, RoomWall } from "../props/RoomArchitecture";

interface RoomProps {
  position: [number, number, number];
}

export function MainCorridor({ position }: RoomProps) {
  // A narrow, winding descent to the Elevator
  return (
    <group position={position}>
      {/* ─── SEGMENT 1 (From Reception Gap) ─── */}
      {/* Starting at local 0,0,0 going -Z */}
      <RoomFloor position={[0, -0.5, -2.5]} args={[1.5, 5]} />
      <RoomCeiling position={[0, 2.5, -2.5]} args={[1.5, 1, 5]} hasLights={false} />
      
      {/* Left Wall Seg 1 */}
      <RoomWall position={[-0.75, 0, -2.5]} args={[0.5, 5, 5]} />
      {/* Right Wall Seg 1 */}
      <RoomWall position={[0.75, 0, -2.5]} args={[0.5, 5, 5]} />

      {/* ─── CORNER 1 (Turn Left / -X) ─── */}
      <RoomFloor position={[-3.25, -0.5, -4.25]} args={[5, 1.5]} />
      <RoomCeiling position={[-3.25, 2.5, -4.25]} args={[5, 1, 1.5]} hasLights={true} />
      
      {/* End cap blocking straight path */}
      <RoomWall position={[0, 0, -5]} args={[1.5, 5, 0.5]} />
      {/* Top wall of Seg 2 */}
      <RoomWall position={[-3.25, 0, -5]} args={[6.5, 5, 0.5]} />
      {/* Bottom wall of Seg 2 */}
      <RoomWall position={[-3.25, 0, -3.5]} args={[5, 5, 0.5]} />

      {/* ─── SEGMENT 3 (Turn Right / -Z down the main hall) ─── */}
      <RoomFloor position={[-5, -0.5, -11.5]} args={[1.5, 13]} />
      <RoomCeiling position={[-5, 2.5, -11.5]} args={[1.5, 1, 13]} hasLights={true} />

      {/* End cap blocking left path */}
      <RoomWall position={[-5.75, 0, -4.25]} args={[0.5, 5, 1.5]} />
      
      {/* Left Wall Seg 3 */}
      {/* Gaps for Personnel Wing and Records Hall */}
      <RoomWall position={[-5.75, 0, -7]} args={[0.5, 5, 4]} />
      {/* Gap at z=-10 for Personnel Wing */}
      <RoomWall position={[-5.75, 0, -14]} args={[0.5, 5, 6]} />
      {/* Gap at z=-18 for Records Hall */}
      <RoomWall position={[-5.75, 0, -20.5]} args={[0.5, 5, 3]} />

      {/* Right Wall Seg 3 */}
      {/* Gap for Communications at z=-14 */}
      <RoomWall position={[-4.25, 0, -9.5]} args={[0.5, 5, 9]} />
      <RoomWall position={[-4.25, 0, -16.5]} args={[0.5, 5, 3]} />
      <RoomWall position={[-4.25, 0, -20.5]} args={[0.5, 5, 3]} />

      {/* ─── FINAL APPROACH (To Communications/Elevator) ─── */}
      <RoomFloor position={[-5, -0.5, -20]} args={[1.5, 4]} />
      <RoomCeiling position={[-5, 2.5, -20]} args={[1.5, 1, 4]} hasLights={false} />
      
      {/* End of corridor connects to Communications or Elevator Room */}
    </group>
  );
}
