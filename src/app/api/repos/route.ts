// GET /api/repos — GitHub Repository Archive snapshot.
//
// Revalidation strategy (Next.js native, no extra infrastructure):
// - `export const revalidate = 3600` opts this route into ISR caching.
//   Visitors hit the cached payload; ~every 60 minutes Next revalidates in
//   the background against GitHub (rate-limited unauth API: 60 req/hour —
//   one revalidation per hour is well within limits).
// - If GitHub is unavailable during revalidation, Next keeps serving the last
//   cached payload (stale-while-revalidate). If there is no cache at all
//   (first request) the service fallback / 503 path below applies and the UI
//   shows a graceful unavailable state while featured records keep working.
//
// No token, no client secrets, no private metadata: only public repositories
// are fetched, filtered, and returned.

import { FEATURED_REPOSITORIES } from "@/data/featuredRepositories";
import { buildArchive, getRepositorySnapshot } from "@/lib/github/service";
import type { ReposApiResponse } from "@/lib/github/types";

export const revalidate = 3600;
export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  try {
    const { repos, source, at } = await getRepositorySnapshot();
    const archive = buildArchive(repos);
    const payload: ReposApiResponse = {
      ok: true,
      source,
      generatedAt: at,
      archive,
      counts: {
        publicDiscovered: repos.length,
        archive: archive.length,
        forks: archive.filter((repo) => repo.isFork).length,
        featuredWithRepo: FEATURED_REPOSITORIES.filter((entry) => entry.githubFullName !== null).length,
      },
    };
    return Response.json(payload);
  } catch {
    const payload: ReposApiResponse = {
      ok: false,
      source: "unavailable",
      generatedAt: null,
      archive: [],
      counts: {
        publicDiscovered: 0,
        archive: 0,
        forks: 0,
        featuredWithRepo: FEATURED_REPOSITORIES.filter((entry) => entry.githubFullName !== null).length,
      },
      error: "REPOSITORY_ARCHIVE_UNAVAILABLE",
    };
    return Response.json(payload, { status: 503 });
  }
}
