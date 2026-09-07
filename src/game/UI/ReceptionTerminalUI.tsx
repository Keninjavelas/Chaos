import React, { useEffect, useState } from "react";
import { useGameState } from "../useGameState";
import { playInteractionFeedback } from "../Interactables/interactionFeedback";
import { portfolioManifest, shouldRenderPublicEntry } from "@/data/portfolioData";
import type { GitHubRepo, ReposApiResponse } from "@/lib/github/types";
import { PersonnelPhoto } from "./PersonnelRecordOverlay";

type TerminalTab = "MANIFEST" | "OPEN_SOURCE" | "RESEARCH" | "SYSTEM";

type RepoArchiveState =
  | { status: "loading" }
  | { status: "ok"; payload: ReposApiResponse }
  | { status: "unavailable" };

function formatRepoDate(iso: string | null): string {
  return iso ? iso.slice(0, 10) : "—";
}

/** Single archival row in the live GitHub repository index. */
function RepoRow({ repo }: { repo: GitHubRepo }) {
  return (
    <div className="space-y-1 border-b border-[#00ff00]/15 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer font-bold text-[#00ffff] underline decoration-[#00ffff]/40 underline-offset-2 hover:text-white"
        >
          {repo.name} ↗
        </a>
        {repo.isFork && (
          <span className="border border-[#ffaa00]/60 px-1.5 text-[10px] tracking-widest text-[#ffaa00]">
            FORK
          </span>
        )}
        {repo.isArchived && (
          <span className="border border-[#888]/50 px-1.5 text-[10px] tracking-widest text-[#888]">
            ARCHIVED
          </span>
        )}
        {repo.primaryLanguage && (
          <span className="text-[11px] text-[#00ff00]/70">LANG: {repo.primaryLanguage}</span>
        )}
        <span className="text-[11px] text-[#00ff00]/50">
          PUSHED: {formatRepoDate(repo.pushedAt)}
        </span>
        <span className="text-[11px] text-[#00ff00]/50">
          STARS: {repo.stars} · FORKS: {repo.forks}
        </span>
      </div>
      {repo.description !== "" && (
        <div className="truncate text-xs text-[#00ff00]/85">{repo.description}</div>
      )}
    </div>
  );
}

export function ReceptionTerminalUI() {
  const activeTerminal = useGameState((state) => state.activeTerminal);
  const clearInteraction = useGameState((state) => state.clearInteraction);
  const [activeTab, setActiveTab] = useState<TerminalTab>("MANIFEST");
  const [repoArchive, setRepoArchive] = useState<RepoArchiveState>({ status: "loading" });
  const publicOpenSource = portfolioManifest.openSource.filter((entry) =>
    shouldRenderPublicEntry(entry.verificationStatus)
  );
  const publicPublications = portfolioManifest.publications.filter((entry) =>
    shouldRenderPublicEntry(entry.verificationStatus)
  );

  useEffect(() => {
    if (!activeTerminal) return;
    document.exitPointerLock?.();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      if (key === "escape") {
        playInteractionFeedback("close");
        clearInteraction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTerminal, clearInteraction]);

  // Dynamic GitHub repository archive (server-synced, ISR-cached ~60 min).
  // State updates happen only inside the async continuation — never
  // synchronously within the effect body (react-hooks/set-state-in-effect).
  useEffect(() => {
    if (!activeTerminal) return;
    const controller = new AbortController();
    let active = true;
    const loadArchive = async () => {
      try {
        const response = await fetch("/api/repos", { signal: controller.signal });
        const payload = (await response.json()) as ReposApiResponse;
        if (!active) return;
        setRepoArchive(payload.ok ? { status: "ok", payload } : { status: "unavailable" });
      } catch (error: unknown) {
        if (!active) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        setRepoArchive({ status: "unavailable" });
      }
    };
    void loadArchive();
    return () => {
      active = false;
      controller.abort();
    };
  }, [activeTerminal]);

  if (!activeTerminal) return null;

  const tabs: { key: TerminalTab; label: string }[] = [
    { key: "MANIFEST", label: "[1] MANIFEST" },
    { key: "OPEN_SOURCE", label: "[2] OPEN SOURCE" },
    { key: "RESEARCH", label: "[3] PUBLICATIONS" },
    { key: "SYSTEM", label: "[4] ACCESS POLICY" },
  ];

  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 font-mono text-[#00ff00] backdrop-blur-md pointer-events-auto select-none cursor-default">
      <div className="relative flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border-4 border-[#1a3a1a] bg-[#081408] p-6 shadow-[0_0_50px_rgba(0,255,0,0.2)]">
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />

        <div className="mb-4 flex items-center justify-between border-b-2 border-[#00ff00]/40 pb-3">
          <div>
            <div className="text-xs text-[#00ff00]/60">AUXILIUM DIGITAL ARCHIVE OS v4.12</div>
            <div className="text-lg font-bold tracking-widest text-[#00ff00]">PROFESSIONAL CONTENT TERMINAL // VERIFIED MANIFEST</div>
          </div>
          <button
            onClick={() => {
              playInteractionFeedback("close");
              clearInteraction();
            }}
            className="cursor-pointer border border-[#00ff00] bg-[#00ff00]/10 px-3 py-1 text-sm font-bold tracking-wider transition-colors hover:bg-[#00ff00] hover:text-black"
          >
            [ ESC ] LEAVE TERMINAL
          </button>
        </div>

        <div className="mb-6 flex gap-2 border-b border-[#00ff00]/20 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`cursor-pointer border px-4 py-1.5 text-xs tracking-widest transition-all ${
                activeTab === tab.key
                  ? "border-[#00ff00] bg-[#00ff00] font-bold text-black"
                  : "border-[#00ff00]/30 bg-black/40 text-[#00ff00]/70 hover:border-[#00ff00]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto rounded border border-[#00ff00]/20 bg-black/50 p-4 text-sm leading-relaxed">
          {activeTab === "MANIFEST" && (
            <div className="space-y-3">
              <div className="text-xs tracking-widest text-[#00ff00]/70">[ PROFESSIONAL CONTENT MANIFEST // VERIFIED ON AUGUST 5, 2026 ]</div>

              {/* S1 · Personnel / Identity record — first, mostly-clean
                  professional introduction with the verified headshot. */}
              <div className="flex items-center gap-4 border border-[#00ff00]/25 bg-[#00ff00]/5 p-3">
                <PersonnelPhoto
                  frame="h-24 w-20 shrink-0 border border-[#00ff00]/40"
                  className="h-full w-full"
                />
                <div className="min-w-0 space-y-1 text-xs text-[#00ff00]">
                  <div className="text-[10px] tracking-[0.3em] text-[#00ff00]/60">
                    ARCHIVE PERSONNEL // IDENTITY RECORD
                  </div>
                  <div className="text-base font-bold tracking-widest text-[#00ff00]">
                    {portfolioManifest.identity.name}
                  </div>
                  <div className="text-[#00ff00]/85">{portfolioManifest.identity.headline}</div>
                  <div className="text-[10px] text-[#00ff00]/75">
                    {portfolioManifest.education[0].institution} — {portfolioManifest.education[0].credential}
                  </div>
                  <div className="text-[10px] text-[#00ff00]/75">
                    {portfolioManifest.education[0].duration} · {portfolioManifest.education[0].detail}
                  </div>
                  <div className="text-[#00ff00]/85">{portfolioManifest.identity.availability}</div>
                  <div className="text-[10px] text-[#00ff00]/60">
                    STATUS: ACTIVE · VERIFICATION: PASSED · CLASS: ARCHIVE PERSONNEL
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#00ff00]">
                {portfolioManifest.terminal.manifestLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "OPEN_SOURCE" && (
            <div className="space-y-3">
              <div className="text-xs tracking-widest text-[#00ff00]/70">[ OPEN SOURCE ACTIVITY // STATUS VERIFIED ]</div>
              {publicOpenSource.map((entry) => (
                <div key={entry.project} className="space-y-1 border border-[#00ff00]/30 bg-[#00ff00]/5 p-3">
                  <div className="font-bold text-[#00ff00]">{entry.project}</div>
                  <div className="text-xs text-[#00ff00]/80">STATUS: {entry.statusLine.toUpperCase()}</div>
                  <div className="text-xs text-[#00ff00]/90">{entry.detail}</div>
                </div>
              ))}
              <div className="space-y-1 border border-[#00ff00]/20 bg-black/20 p-3">
                {portfolioManifest.terminal.openSourceLines.map((line) => (
                  <div key={line} className="text-xs text-[#00ff00]/80">
                    {line}
                  </div>
                ))}
              </div>

              <div className="border border-[#00ff00]/30 bg-[#020a02] p-3">
                {repoArchive.status === "loading" && (
                  <div className="text-xs tracking-widest text-[#00ff00]/60">
                    [ SYNCHRONIZING GITHUB REPOSITORY INDEX … ]
                  </div>
                )}
                {repoArchive.status === "unavailable" && (
                  <div className="space-y-1 text-xs text-[#00ff00]/70">
                    <div className="tracking-widest text-[#00ff00]">
                      [ GITHUB REPOSITORY ARCHIVE // UNAVAILABLE ]
                    </div>
                    <div>INDEX SYNCHRONIZATION FAILED — LAST SNAPSHOT UNAVAILABLE.</div>
                    <div>FEATURED PROJECT RECORDS REMAIN ACCESSIBLE.</div>
                  </div>
                )}
                {repoArchive.status === "ok" && (
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="tracking-widest text-[#00ff00]">
                        [ GITHUB REPOSITORY ARCHIVE // LIVE INDEX ]
                      </span>
                      <span className="text-[11px] text-[#00ff00]/60">
                        {repoArchive.payload.counts.archive} RECORDS ·{" "}
                        {repoArchive.payload.counts.forks} FORKS · SYNC:{" "}
                        {repoArchive.payload.source.toUpperCase()}
                      </span>
                    </div>
                    <div className="max-h-56 overflow-y-auto border border-[#00ff00]/20 bg-black/40 px-2">
                      {repoArchive.payload.archive.length === 0 ? (
                        <div className="py-2 text-xs text-[#00ff00]/70">
                          NO PUBLIC REPOSITORIES IN INDEX.
                        </div>
                      ) : (
                        repoArchive.payload.archive.map((repo) => (
                          <RepoRow key={repo.fullName} repo={repo} />
                        ))
                      )}
                    </div>
                    <div className="text-[11px] text-[#00ff00]/50">
                      FEATURED PROJECTS ARE CURATED RECORDS AND ARE EXCLUDED FROM THIS INDEX.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "RESEARCH" && (
            <div className="space-y-3">
              <div className="text-xs tracking-widest text-[#00ff00]/70">[ PUBLICATION STATUS // VERIFIED RECORDS ]</div>
              {publicPublications.map((publication) => (
                <div key={publication.title} className="space-y-2 border border-[#00ff00]/30 bg-[#00ff00]/5 p-3">
                  <div className="font-bold text-[#00ff00]">{publication.title}</div>
                  <div className="text-xs text-[#00ff00]/80">VENUE: {publication.venue}</div>
                  {publication.notes.map((note) => (
                    <div key={note} className="text-xs text-[#00ff00]/90">
                      {note}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === "SYSTEM" && (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
              <div className="flex h-32 w-56 items-center justify-center border-2 border-[#00ff00]/60 bg-[#00ff00]/10 text-xs font-bold tracking-widest text-[#00ff00] animate-pulse">
                [ SYSTEM ONLINE ]
              </div>
              <div className="text-center text-xs text-[#00ff00]">CORE PORTFOLIO SURFACES REMAIN PUBLICLY ACCESSIBLE</div>
              {portfolioManifest.terminal.systemLines.map((line) => (
                <div key={line} className="text-center text-xs text-[#00ff00]/70">
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#00ff00]/20 pt-2 text-xs text-[#00ff00]/60">
          <div>PRESS [ ESC ] TO LEAVE TERMINAL</div>
          <div>STATUS: ONLINE</div>
        </div>
      </div>
    </div>
  );
}
