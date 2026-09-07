// Server-side GitHub repository service (never imported by client code).
//
// Security posture:
// - No token is used: unauthenticated GitHub REST API (rate-limited to 60
//   requests/hour, which the ISR cache at src/app/api/repos/route.ts absorbs).
// - Only `type=public` repositories are requested and every normalized record
//   is additionally filtered on `private === false`.
// - Private repository names/URLs/metadata can never reach the client.
// - Pagination is bounded (per_page=100, max 10 pages = 1000 repositories) so
//   an accidental growth spike cannot cause unbounded requests.
//
// Resilience:
// - On transient GitHub failure the module serves the last successful
//   in-process snapshot ("memory") when one exists; otherwise the caller
//   (route handler) returns a graceful unavailable response. Next.js ISR
//   additionally keeps serving its last cached payload during background
//   revalidation failures.

import { FEATURED_GITHUB_FULL_NAMES } from "@/data/featuredRepositories";
import type { GitHubApiRepo, GitHubRepo } from "./types";

const GITHUB_API_URL = process.env.GITHUB_API_URL ?? "https://api.github.com";
const OWNER = "Keninjavelas";
const PER_PAGE = 100;
const MAX_PAGES = 10;

/** Deterministic ordering: active (recently pushed) first, archived later,
 *  stable tie-break by repository name. */
export function sortRepositories(repos: GitHubRepo[]): GitHubRepo[] {
  return [...repos].sort((a, b) => {
    if (a.isArchived !== b.isArchived) return a.isArchived ? 1 : -1;
    const pa = a.pushedAt ?? "";
    const pb = b.pushedAt ?? "";
    if (pa !== pb) return pa < pb ? 1 : -1; // newer pushed first
    return a.name.localeCompare(b.name);
  });
}

export function normalizeRepository(raw: GitHubApiRepo): GitHubRepo {
  return {
    name: raw.name,
    fullName: raw.full_name,
    url: raw.html_url,
    description: raw.description ?? "",
    primaryLanguage: raw.language,
    topics: Array.isArray(raw.topics) ? raw.topics : [],
    stars: raw.stargazers_count ?? 0,
    forks: raw.forks_count ?? 0,
    isFork: raw.fork === true,
    isArchived: raw.archived === true,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    pushedAt: raw.pushed_at,
    defaultBranch: raw.default_branch,
    homepage: raw.homepage,
  };
}

/** Exclude curated featured full names (case-insensitive) from an inventory. */
export function excludeFeatured(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((repo) => !FEATURED_GITHUB_FULL_NAMES.has(repo.fullName.toLowerCase()));
}

interface LastGoodSnapshot {
  repos: GitHubRepo[];
  at: string;
}

let lastGoodSnapshot: LastGoodSnapshot | null = null;

/** Fetch every public repository for OWNER with bounded pagination. */
export async function fetchAllPublicRepositories(): Promise<GitHubRepo[]> {
  const collected: GitHubRepo[] = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = `${GITHUB_API_URL}/users/${OWNER}/repos?type=public&per_page=${PER_PAGE}&page=${page}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "auxilium-archive",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      throw new Error(`GitHub API responded ${response.status}`);
    }
    const batch = (await response.json()) as GitHubApiRepo[];
    for (const raw of batch) {
      if (raw.private === true) continue; // defence in depth
      collected.push(normalizeRepository(raw));
    }
    if (batch.length < PER_PAGE) break;
  }
  const sorted = sortRepositories(collected);
  lastGoodSnapshot = { repos: sorted, at: new Date().toISOString() };
  return sorted;
}

/** Snapshot entry point with graceful fallback to the last good fetch. */
export async function getRepositorySnapshot(): Promise<{
  repos: GitHubRepo[];
  source: "live" | "memory";
  at: string;
}> {
  try {
    const repos = await fetchAllPublicRepositories();
    return { repos, source: "live", at: new Date().toISOString() };
  } catch (error) {
    if (lastGoodSnapshot) {
      return { repos: lastGoodSnapshot.repos, source: "memory", at: lastGoodSnapshot.at };
    }
    throw error;
  }
}

/** Build the archive inventory: public repos minus curated featured full names. */
export function buildArchive(repos: GitHubRepo[]): GitHubRepo[] {
  return excludeFeatured(repos);
}
