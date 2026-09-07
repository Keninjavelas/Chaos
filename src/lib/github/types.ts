// Shared types for the GitHub repository integration.
// Imported type-only by both the server service and the client UI.

/** Normalized, safe repository record — the only shape that leaves the server. */
export interface GitHubRepo {
  /** Repository name (e.g. "InfraMind"). */
  name: string;
  /** Owner/name (e.g. "Keninjavelas/InfraMind"). */
  fullName: string;
  /** Public HTML URL on github.com. */
  url: string;
  /** Short repository description (null-safe → empty string). */
  description: string;
  /** Primary language, when GitHub reports one. */
  primaryLanguage: string | null;
  /** Repository topics when GitHub reports them. */
  topics: string[];
  stars: number;
  forks: number;
  isFork: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  /** Last push time; the field used for "recent activity" ordering. */
  pushedAt: string | null;
  defaultBranch: string;
  /** Optional linked homepage. */
  homepage: string | null;
}

/** Source of the served snapshot. */
export type RepoSnapshotSource = "live" | "memory" | "unavailable";

export interface ReposApiResponse {
  ok: boolean;
  /** Where this payload came from: live GitHub fetch, in-process fallback cache. */
  source: RepoSnapshotSource;
  /** ISO timestamp of the snapshot, when available. */
  generatedAt: string | null;
  /** Dynamic archive rows (public repos minus curated featured full names). */
  archive: GitHubRepo[];
  counts: {
    /** Total public repositories discovered on GitHub. */
    publicDiscovered: number;
    /** Archive rows after excluding featured full names. */
    archive: number;
    /** Number of forks inside the archive. */
    forks: number;
    /** Number of featured projects that have a public repo reference. */
    featuredWithRepo: number;
  };
  /** Present only when the archive is unavailable (no live fetch, no cache). */
  error?: string;
}

/** Raw GitHub REST API repository object — only the fields we consume. */
export interface GitHubApiRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
  visibility?: string;
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
  default_branch: string;
  homepage: string | null;
}
