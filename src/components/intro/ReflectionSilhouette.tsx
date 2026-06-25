// src/components/intro/ReflectionSilhouette.tsx
"use client";
import React from "react";

/**
 * Barely-visible silhouette of a person — like seeing your own
 * reflection in a turned-off monitor. Positioned behind the quote.
 */
export const ReflectionSilhouette: React.FC = () => {
  return (
    <div className="reflection-silhouette">
      <img
        src="/silhouette.png"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </div>
  );
};
