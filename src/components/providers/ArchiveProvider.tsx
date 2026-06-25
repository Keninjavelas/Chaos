// src/components/providers/ArchiveProvider.tsx
"use client";

import { useEffect, useRef } from "react";
import { useArchiveStore } from "@/lib/state";
import { initializeArchive } from "../../archive/init/bootstrap";

export default function ArchiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("[Archive] ArchiveProvider mounted");
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const { reset } = useArchiveStore.getState();
    reset();
    initializeArchive();
  }, []);

  return <>{children}</>;
};
