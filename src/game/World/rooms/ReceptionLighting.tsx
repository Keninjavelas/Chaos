import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useArchiveStore } from "@/lib/state";

function StableFluorescent({
  position,
  color = "#c9c2b0",
  intensity = 2.4,
  distance = 9,
  decay = 2.0,
}: {
  position: [number, number, number];
  color?: string;
  intensity?: number;
  distance?: number;
  decay?: number;
}) {
  const lightRef = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (lightRef.current) {
      timeRef.current += delta;
      const hum = Math.sin(timeRef.current * 18) * 0.08;
      const microJitter = (Math.random() - 0.5) * 0.06;
      lightRef.current.intensity = intensity * (1.0 + hum + microJitter);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={position}
      intensity={intensity}
      color={color}
      distance={distance}
      decay={decay}
    />
  );
}

function UnstableFluorescent({
  position,
  color = "#a8a592",
  baseIntensity = 1.4,
  distance = 7,
  decay = 2.2,
}: {
  position: [number, number, number];
  color?: string;
  baseIntensity?: number;
  distance?: number;
  decay?: number;
}) {
  const lightRef = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);
  const nextFlickerRef = useRef(7);
  const flickerActiveRef = useRef(false);
  const flickerDurationRef = useRef(0);

  useFrame((_, delta) => {
    if (!lightRef.current) return;
    timeRef.current += delta;

    if (flickerActiveRef.current) {
      flickerDurationRef.current -= delta;
      if (flickerDurationRef.current <= 0) {
        flickerActiveRef.current = false;
        nextFlickerRef.current = 22 + Math.random() * 32;
      }
      const dip = 0.62 + Math.random() * 0.3;
      lightRef.current.intensity = baseIntensity * dip;
    } else {
      nextFlickerRef.current -= delta;
      if (nextFlickerRef.current <= 0) {
        flickerActiveRef.current = true;
        flickerDurationRef.current = 0.06 + Math.random() * 0.14;
      }
      const hum = Math.sin(timeRef.current * 11) * 0.06;
      const sag = 0.82 + Math.sin(timeRef.current * 0.5) * 0.06;
      lightRef.current.intensity = baseIntensity * sag * (1.0 + hum);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={position}
      intensity={baseIntensity}
      color={color}
      distance={distance}
      decay={decay}
    />
  );
}

export function ReceptionLighting() {
  const { isBlackout } = useArchiveStore();

  if (isBlackout) return null;

  return (
    <group>
      {/* ================================================================ */}
      {/* §1-2  GLOBAL WARM-NEUTRAL BASE — prevents absolute black         */}
      {/* ================================================================ */}
      {/* Hemisphere: broad institutional sepia fill.                          */}
      {/* Sky = warm dirty amber-grey; Ground = charcoal brown-black.          */}
      {/* Shadows therefore stay tinted (not RGB 0,0,0) so material texture    */}
      {/* remains readable everywhere.                                          */}
      <hemisphereLight
        args={["#b8a88a", "#3a3228", 0.9]}
      />

      {/* Tiny ambient catch — enough to stop mid-range geometry from          */}
      {/* crushing, not enough to flatten depth.                               */}
      <ambientLight intensity={0.25} color="#ad9f85" />

      {/* ================================================================ */}
      {/* §8  CEILING READABILITY — faint reflected fill                    */}
      {/* ================================================================ */}
      {/* Low-energy downward tinted point so grid, pipes, fixture housings    */}
      {/* retain silhouette instead of disappearing into a black void.         */}
      <pointLight
        position={[0, 3.05, 0]}
        intensity={0.75}
        distance={7.5}
        decay={2.1}
        color="#a8987d"
      />

      {/* ================================================================ */}
      {/* §3  RECEPTION DESK = PRIMARY FOCAL POINT                           */}
      {/* ================================================================ */}
      {/* Broader, softer warm tungsten pool. Positioned high + rearward so    */}
      {/* the cone covers the DESK TOP itself, not just the floor in front.    */}
      {/* Intensity 11 (not 18) — larger footprint, lower peak = no hotspot.   */}
      <spotLight
        position={[0, 2.0, -0.2]}
        target-position={[0, 0.82, -1.55]}
        intensity={11.0}
        angle={0.88}
        penumbra={0.9}
        distance={10}
        decay={1.85}
        color="#d7a36a"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      <mesh position={[0, 0.82, -1.55]} visible={false}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
      </mesh>

      {/* Desktop surface bounce — sits at desktop height so the monitor,      */}
      {/* papers, keyboard, mug catch the warm spill. Spreads 5m radius, so    */}
      {/* nearby walls + floor also soften.                                    */}
      <pointLight
        position={[0, 0.86, -1.55]}
        intensity={3.0}
        distance={5.0}
        decay={2.0}
        color="#c99868"
      />

      {/* §4  DESK FRONT FACE — subtle front/under fill so it is not a         */}
      {/*     black slab. Only silhouette + material + edge, dimmer than top.  */}
      <pointLight
        position={[0, 0.45, -1.15]}
        intensity={0.9}
        distance={2.6}
        decay={2.1}
        color="#b88659"
      />

      {/* §5  FLOOR WARM PUDDLE — catches practical light falloff just in      */}
      {/*     front of desk so tile/vinyl + wear + circulation path read.     */}
      <pointLight
        position={[0, 0.06, -0.9]}
        intensity={1.6}
        distance={5.5}
        decay={2.15}
        color="#c49870"
      />

      {/* ================================================================ */}
      {/* §2-OVERHEAD — two stable tubes + one intentionally unstable       */}
      {/* ================================================================ */}
      {/* Fluorescents contribute to ceiling readability + general wall       */}
      {/* grazing. Intensities slightly reduced vs previous so the desk stays */}
      {/* brighter than any overhead fixture (hierarchy rule 10).             */}
      <StableFluorescent
        position={[-1.8, 2.85, 2.0]}
        color="#bab29d"
        intensity={1.8}
        distance={8}
        decay={2.05}
      />
      <StableFluorescent
        position={[1.6, 2.85, -0.5]}
        color="#b6b29c"
        intensity={1.6}
        distance={7.5}
        decay={2.1}
      />
      {/* §13  UNSTABLE FIXTURE — one only, rare + subtle (unchanged from     */}
      {/*      previous pass: 22-54s gaps, 0.06-0.2s dip-only sag, no strobe) */}
      <UnstableFluorescent
        position={[2.4, 2.85, 2.6]}
        color="#8e8c76"
        baseIntensity={1.05}
        distance={6}
        decay={2.3}
      />

      {/* ================================================================ */}
      {/* §7  WALL GRAZING — asymmetric: warmer west, cooler darker east     */}
      {/* ================================================================ */}
      {/* West wall (admin alcove) — slightly warm grazing so plaster relief, */}
      {/* damp patch, peeling paint, repair all show texture variation.       */}
      <pointLight
        position={[-4.75, 1.55, 0.5]}
        intensity={1.25}
        distance={6}
        decay={2.15}
        color="#b5a589"
      />
      {/* South entry wall — very soft warm low graze catches water streak,   */}
      {/* repair patch, and entry coat-rack silhouette.                       */}
      <pointLight
        position={[0, 1.7, 4.6]}
        intensity={1.15}
        distance={6.5}
        decay={2.15}
        color="#b0a185"
      />

      {/* ================================================================ */}
      {/* §6  SIDE WING ENTRANCE THRESHOLD SPILLS                             */}
      {/* ================================================================ */}
      {/* WEST WING — faint cool-neutral spill INSIDE the opening so the      */}
      {/*            player perceives "there is a corridor here" without      */}
      {/*            brightly lighting what lies beyond.                     */}
      {/* Threshold (just inside the portal frame):                           */}
      <pointLight
        position={[-4.75, 2.3, 0]}
        intensity={1.35}
        distance={5.5}
        decay={2.15}
        color="#7e8f9d"
      />
      {/* Deep corridor (dimmer than threshold so the opening is brighter):   */}
      <pointLight
        position={[-8.5, 2.55, 0]}
        intensity={1.1}
        distance={7.5}
        decay={2.1}
        color="#6e808f"
      />
      <pointLight
        position={[-6.2, 2.45, 0]}
        intensity={0.8}
        distance={5}
        decay={2.2}
        color="#617280"
      />

      {/* EAST WING — same threshold logic, subtly warmer teal-grey           */}
      <pointLight
        position={[4.75, 2.3, 0]}
        intensity={1.25}
        distance={5.5}
        decay={2.15}
        color="#889594"
      />
      <pointLight
        position={[8.5, 2.55, 0]}
        intensity={1.0}
        distance={7.5}
        decay={2.1}
        color="#778685"
      />
      <pointLight
        position={[6.2, 2.45, 0]}
        intensity={0.75}
        distance={5}
        decay={2.2}
        color="#6a7877"
      />

      {/* ================================================================ */}
      {/* §9  REAR SECURITY GATE — faint desaturated dark-red tension       */}
      {/* ================================================================ */}
      {/* Desaturated dark red, localized, short radius. Player notices this  */}
      {/* SECOND after the desk (per hierarchy).                             */}
      <pointLight
        position={[0, 2.15, -4.55]}
        intensity={0.9}
        distance={3.4}
        decay={2.1}
        color="#441616"
      />
      {/* Faint floor reflection of the gate under-light:                     */}
      <pointLight
        position={[0, 0.08, -4.35]}
        intensity={0.25}
        distance={2.0}
        decay={2.3}
        color="#370f0f"
      />
      {/* Cool recession beyond the bars — gives the gate depth, not a void:  */}
      <pointLight
        position={[0, 1.35, -5.0]}
        intensity={0.55}
        distance={3.0}
        decay={2.25}
        color="#1e3042"
      />

      {/* ================================================================ */}
      {/* MID-ROOM TEXTURE FILL — prevents foreground from crushing          */}
      {/* ================================================================ */}
      {/* Broad, low-intensity, warm-neutral, center-height. No obvious      */}
      {/* source; acts as aggregated bounce from all the practicals so       */}
      {/* foreground (player's first step in) is dark charcoal, not black.   */}
      <pointLight
        position={[0, 1.55, 0.8]}
        intensity={1.0}
        distance={8.5}
        decay={2.2}
        color="#9c8f78"
      />
    </group>
  );
}
