import React, { useEffect, useState } from "react";
import { useGameState } from "../useGameState";
import { playInteractionFeedback } from "../Interactables/interactionFeedback";
import { portfolioManifest } from "@/data/portfolioData";
import type { DocumentContent } from "@/data/types";
import { ContactForm } from "./ContactForm";

const HEADSHOT_PATH = "/portfolio/profile/headshot.jpg";

/**
 * Shared photograph element for the Personnel / Identity Archive record
 * surfaces. The photo is the user's real headshot; on load failure a neutral
 * "NO PHOTO ON FILE" plate is shown instead (never a synthetic image).
 */
export function PersonnelPhoto({
  className,
  frame,
}: {
  className?: string;
  frame?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#c9c2ae] font-mono text-[10px] tracking-widest text-[#5a5344] ${frame ?? ""}`}
      >
        NO PHOTO ON FILE
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${frame ?? ""}`}>
      <img
        src={HEADSHOT_PATH}
        alt="Personnel record photograph"
        className={`object-cover ${className ?? ""}`}
        onError={() => setFailed(true)}
        draggable={false}
      />
    </div>
  );
}

/**
 * Personnel / Identity Archive overlays.
 * - "personnel-file" (S2, Personnel Wing intake monitor): the strongest
 *   presentation — aged physical personnel file with redactions, stamps,
 *   handwritten annotation, corruption artifacts.
 * - "personnel-dossier" (S3, Elevator Lobby recruiter terminal): a cleaner
 *   condensed dossier — professional information first, atmosphere second.
 * Real professional content always remains legible; every anomaly is
 * diegetic archive decoration, never a claim about the person.
 */
export function PersonnelRecordOverlay({ document }: { document: DocumentContent }) {
  const clearInteraction = useGameState((state) => state.clearInteraction);
  const isFile = document.type === "personnel-file";

  useEffect(() => {
    window.document.exitPointerLock?.();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() === "escape") {
        playInteractionFeedback("close");
        clearInteraction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearInteraction]);

  const identity = portfolioManifest.identity;
  const close = () => {
    playInteractionFeedback("close");
    clearInteraction();
  };

  if (isFile) {
    return (
      <div className="fixed inset-0 z-[160] flex flex-col items-center justify-between bg-[#0a0805]/90 p-4 font-mono select-none pointer-events-auto cursor-default md:p-8">
        <div className="w-full max-w-3xl flex items-center justify-between text-[11px] tracking-[0.3em] text-[#b8a888]">
          <span>[ PERSONNEL / IDENTITY ARCHIVE // FILE VIEW ]</span>
          <button
            onClick={close}
            className="cursor-pointer border border-[#b8a888]/40 bg-black/30 px-3 py-1 text-[#e8dcbe] hover:bg-[#b8a888] hover:text-black"
          >
            [ ESC ] PUT AWAY
          </button>
        </div>

        <div
          className="relative my-4 w-full max-w-3xl flex-1 overflow-hidden border border-[#6b6048] shadow-[0_0_60px_rgba(0,0,0,0.9)]"
          style={{ background: "linear-gradient(165deg,#d8d0ba 0%,#c6bda4 60%,#b7ab8e 100%)" }}
        >
          {/* Paper grain + clamp shadow */}
          <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
            style={{ backgroundImage: "radial-gradient(#00000022 1px, transparent 1px)", backgroundSize: "3px 3px" }} />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0000001a] to-transparent" />

          <div className="relative h-full overflow-y-auto p-6 text-[#241d12] md:p-10">
            {/* Header block */}
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b-2 border-[#241d12]/30 pb-3">
              <div>
                <div className="text-[10px] tracking-[0.35em] text-[#6a5c42]">
                  AUXILIUM FACILITY // DEPARTMENT-02
                </div>
                <div className="mt-1 text-xl font-bold tracking-[0.2em] text-[#1a150c] md:text-2xl">
                  PERSONNEL / IDENTITY FILE
                </div>
                <div className="text-[11px] tracking-[0.25em] text-[#241d12]/70">
                  FILE NO: AUX-P2-{identity.name.split(" ").pop()?.toUpperCase() ?? "00"} · CONFIDENTIAL
                </div>
              </div>
              <div className="rotate-[-6deg] border-2 border-[#7a2f2f] px-3 py-1 text-[11px] font-bold tracking-[0.25em] text-[#7a2f2f]">
                REVIEW REQUIRED
              </div>
            </div>

            {/* Photo + core fields */}
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="relative shrink-0">
                <PersonnelPhoto
                  frame="h-44 w-36 border-[3px] border-[#241d12] shadow-[4px_4px_0_rgba(36,29,18,0.35)]"
                  className="h-full w-full"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#241d12]/80 py-0.5 text-center text-[9px] tracking-[0.2em] text-[#e8e0cc]">
                  PHOTO // {identity.name.split(" ").pop()?.toUpperCase() ?? ""}
                </div>
                {/* redaction tape over a corner of the photo */}
                <div className="pointer-events-none absolute -right-2 -top-2 h-6 w-16 -rotate-12 bg-[#241d12]" />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5 text-[13px] leading-snug md:text-sm">
                <div className="text-base font-bold tracking-widest md:text-lg">
                  {identity.name.toUpperCase()}
                </div>
                <FieldRow label="ROLE" value={identity.headline} />
                <FieldRow label="DEPARTMENT" value="Systems & Infrastructure" decorative />
                <FieldRow label="STATUS" value="ACTIVE" decorative />
                <FieldRow label="VERIFICATION" value="PASSED" decorative />
                <FieldRow label="CLASSIFICATION" value="ARCHIVE PERSONNEL" decorative />
                <FieldRow label="AVAILABILITY" value={identity.availability} />
                <div className="pt-1 text-[11px] text-[#241d12]/60">
                  <span className="bg-[#241d12] px-1 text-[#d8d0ba]">OBSERVED IRREGULARITIES:</span>{" "}
                  ██████ (suppressed)
                </div>
              </div>
            </div>

            {/* Decorative marginalia / corruption artifacts */}
            <div className="relative mt-6 space-y-3 border-t border-[#241d12]/30 pt-4">
              <div className="rotate-[0.5deg] font-serif text-[12px] italic text-[#4a3d28]">
                — reviewed again. photo matches the current record. re-file quarterly.
              </div>
              <div className="font-serif text-[12px] text-[#241d12]/50">
                Last full inspection: 2026-09-06 · 03:12 <span className="text-[#7a2f2f]">(time anomaly logged █)</span>
              </div>
              <div className="font-mono text-[12px] text-[#241d12]/55">
                File integrity: <span className="font-bold">97.4%</span> · corruption at offset 0x1F ·{" "}
                <span className="bg-[#241d12] text-[#d8d0ba]">██████</span> entry not rendered
              </div>
              <div className="rotate-[-1.2deg] border border-[#7a2f2f]/50 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-[#7a2f2f]">
                ARCHIVE-USE ONLY · DO NOT REMOVE
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-[#241d12]/30 pt-3 text-[10px] tracking-[0.3em] text-[#241d12]/60">
              <span>AUTHORIZED PERSONNEL ONLY</span>
              <span>FILE CONSOLIDATION ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] tracking-[0.3em] text-[#b8a888]">
          PRESS [ ESC ] TO PUT AWAY
        </div>
      </div>
    );
  }

  // Personnel dossier (S3) — condensed, professional information first.
  return (
    <div className="fixed inset-0 z-[160] flex flex-col items-center justify-between bg-[#0a0805]/85 p-4 font-mono select-none pointer-events-auto cursor-default md:p-8">
      <div className="w-full max-w-3xl flex items-center justify-between text-[11px] tracking-[0.3em] text-[#b8c4b0]">
        <span>[ PERSONNEL DOSSIER // RECORD RETRIEVED ]</span>
        <button
          onClick={close}
          className="cursor-pointer border border-[#b8c4b0]/40 bg-black/30 px-3 py-1 text-[#e4eadc] hover:bg-[#b8c4b0] hover:text-black"
        >
          [ ESC ] PUT AWAY
        </button>
      </div>

      <div className="relative my-4 w-full max-w-3xl flex-1 overflow-hidden border border-[#4c5a4a] bg-[#10180f] shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        <div className="flex h-full flex-col overflow-y-auto p-6 text-[#d9e2d2] md:p-9">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#8fa08a]/30 pb-3">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[#8fa08a]">
                AUXILIUM ARCHIVE // RETRIEVED RECORD
              </div>
              <div className="mt-1 text-lg font-bold tracking-[0.15em] text-[#eaf2e6] md:text-xl">
                PERSONNEL DOSSIER — {identity.name.toUpperCase()}
              </div>
            </div>
            <div className="border border-[#8fa08a]/40 px-3 py-1 text-[10px] tracking-[0.25em] text-[#8fa08a]">
              FILE INTEGRITY 97.4%
            </div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <PersonnelPhoto
              frame="h-40 w-32 shrink-0 border border-[#8fa08a]/60"
              className="h-full w-full"
            />
            <div className="min-w-0 flex-1 space-y-1.5 text-[12px] leading-relaxed md:text-[13px]">
              <FieldRow label="ROLE" value={identity.headline} light />
              <FieldRow label="STATUS" value="ACTIVE" decorative light />
              <FieldRow label="VERIFICATION" value="PASSED" decorative light />
              <FieldRow label="AVAILABILITY" value={identity.availability} light />
            </div>
          </div>

          {document.content ? (
            <p className="mt-5 whitespace-pre-wrap border-t border-[#8fa08a]/25 pt-4 text-[11px] leading-[1.7] text-[#c4cfbd] md:text-xs">
              {document.content}
            </p>
          ) : null}

          {/* Live contact form on the recruiter dossier (S3 contact terminal) —
              a real SMTP-backed submission surface replacing the bare email
              text/mailto path. */}
          {document.id === "RECRUITER-SUMMARY" ? <ContactForm /> : null}

          {document.interactiveLink && (
            <div className="mt-5 flex justify-center">
              <a
                href={document.interactiveLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#8fa08a] bg-[#8fa08a]/10 px-4 py-2 text-xs font-bold text-[#eaf2e6] hover:bg-[#8fa08a] hover:text-black"
              >
                {document.interactiveLink.label}
              </a>
            </div>
          )}

          <div className="mt-auto pt-5 text-right text-[10px] tracking-[0.3em] text-[#8fa08a]/60">
            AUTHORIZED PERSONNEL ONLY
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] tracking-[0.3em] text-[#b8c4b0]">
        PRESS [ ESC ] TO PUT AWAY
      </div>
    </div>
  );
}

function FieldRow({
  label,
  value,
  decorative = false,
  light = false,
}: {
  label: string;
  value: string;
  decorative?: boolean;
  light?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`w-28 shrink-0 text-[10px] tracking-[0.2em] ${
          light ? "text-[#8fa08a]" : "text-[#6a5c42]"
        }`}
      >
        {decorative ? `${label}:` : `${label}:`}
      </span>
      <span className={light ? "font-bold text-[#eaf2e6]" : "font-bold text-[#1a150c]"}>{value}</span>
    </div>
  );
}
