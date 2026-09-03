import React from "react";
import { ThreeElements } from "@react-three/fiber";
import { HorrorMaterial } from "./HorrorMaterial";
import { MaterialSurfaceFamily } from "./ProceduralNoise";

export type FacilityMaterialKind =
  | "painted-plaster"
  | "stained-plaster"
  | "concrete-wall"
  | "institutional-tile"
  | "ceiling-panel"
  | "dirty-floor"
  | "painted-metal"
  | "rusted-metal"
  | "wood"
  | "machinery"
  | "archive-brass"
  | "glass"
  | "grime";

type FacilityMaterialProps = Omit<ThreeElements["meshStandardMaterial"], "color"> & {
  kind: FacilityMaterialKind;
  color?: string;
};

const presets: Record<FacilityMaterialKind, {
  color: string;
  roughness: number;
  metalness: number;
  family: MaterialSurfaceFamily;
  bumpStrength: number;
  colorVariation?: boolean;
}> = {
  "painted-plaster": { color: "#6e776a", roughness: 0.86, metalness: 0, family: "aged-plaster", bumpStrength: 0.35, colorVariation: true },
  "stained-plaster": { color: "#5a6458", roughness: 0.90, metalness: 0, family: "aged-plaster", bumpStrength: 0.45, colorVariation: true },
  "concrete-wall": { color: "#4b5553", roughness: 0.92, metalness: 0.05, family: "painted-concrete", bumpStrength: 0.45, colorVariation: true },
  "institutional-tile": { color: "#54645e", roughness: 0.62, metalness: 0.1, family: "institutional-tile", bumpStrength: 0.35, colorVariation: true },
  "ceiling-panel": { color: "#464a40", roughness: 0.90, metalness: 0, family: "ceiling-acoustic", bumpStrength: 0.28, colorVariation: true },
  "dirty-floor": { color: "#313833", roughness: 0.68, metalness: 0.08, family: "institutional-vinyl", bumpStrength: 0.25, colorVariation: true },
  "painted-metal": { color: "#3c4850", roughness: 0.48, metalness: 0.72, family: "painted-metal", bumpStrength: 0.20, colorVariation: true },
  "rusted-metal": { color: "#523c34", roughness: 0.82, metalness: 0.52, family: "painted-concrete", bumpStrength: 0.42, colorVariation: true },
  "wood": { color: "#524032", roughness: 0.76, metalness: 0.02, family: "wood-grain", bumpStrength: 0.30, colorVariation: true },
  "machinery": { color: "#1e2930", roughness: 0.46, metalness: 0.82, family: "painted-metal", bumpStrength: 0.20, colorVariation: true },
  "archive-brass": { color: "#9c8452", roughness: 0.38, metalness: 0.88, family: "painted-metal", bumpStrength: 0.15, colorVariation: true },
  "glass": { color: "#6ca6a4", roughness: 0.12, metalness: 0.25, family: "painted-metal", bumpStrength: 0.05 },
  "grime": { color: "#232b23", roughness: 0.96, metalness: 0, family: "aged-plaster", bumpStrength: 0.25, colorVariation: true },
};

export function FacilityMaterial({ kind, color, ...props }: FacilityMaterialProps) {
  const preset = presets[kind] ?? presets["painted-plaster"];

  if (kind === "glass") {
    return <meshStandardMaterial color={color ?? preset.color} transparent opacity={0.25} roughness={preset.roughness} metalness={preset.metalness} {...props} />;
  }

  return (
    <HorrorMaterial
      color={color ?? preset.color}
      roughness={preset.roughness}
      metalness={preset.metalness}
      family={preset.family}
      bumpStrength={preset.bumpStrength}
      colorVariation={preset.colorVariation}
      {...props}
    />
  );
}

export const facilityMaterialPalette = {
  wall: "#6e776a",
  ceiling: "#464a40",
  floor: "#313833",
  concrete: "#4b5553",
  tile: "#54645e",
  emergency: "#b84a3e",
  research: "#87c9d7",
  personnel: "#d4b982",
} as const;
