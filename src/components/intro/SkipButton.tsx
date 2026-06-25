// src/components/intro/SkipButton.tsx
"use client";
import React, { useEffect, useState } from "react";

interface SkipButtonProps {
  onSkip: () => void;
  onHover?: () => void;
}

/**
 * Subtle skip button that appears in the bottom-right.
 * Low opacity until hovered for minimum distraction.
 */
export const SkipButton: React.FC<SkipButtonProps> = ({ onSkip, onHover }) => {
  return (
    <button
      onClick={onSkip}
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        padding: "6px 14px",
        background: "rgba(0,0,0,0.8)",
        color: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(255,255,255,0.4)",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        zIndex: 100,
        backdropFilter: "blur(4px)",
        transition: "opacity 0.3s, color 0.3s",
        opacity: 0.85,
      }}
      onMouseEnter={(e) => {
        if (onHover) onHover();
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.color = "rgba(255,255,255,0.9)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.6";
        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
      }}
    >
      Skip Intro ▸
    </button>
  );
};
