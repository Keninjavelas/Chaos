// Central configuration for the two-layer GitHub repository model.
//
// LAYER 1 — CURATED FEATURED REPOSITORIES (exactly three, curated by hand).
// These remain full portfolio records (dossiers, evidence, screenshots,
// interactions). Their GitHub full names below are used ONLY to (a) link the
// curated record to GitHub and (b) exclude them from the dynamic archive so
// they never appear twice. Featured status is never inferred from stars,
// repository age, or ranking.
//
// A `githubFullName` of null means the curated project currently has no
// public GitHub repository (e.g. Auxilium / Metis). The curated record still
// renders independently; there is simply nothing to exclude or link.

export interface FeaturedRepositoryRef {
  /** Manifest slug of the curated project (flagship exhibit / dossier). */
  slug: string;
  /** Display project name used by the curated layer. */
  project: string;
  /** GitHub "owner/name" when a public repository exists, otherwise null. */
  githubFullName: string | null;
}

export const FEATURED_REPOSITORIES: readonly FeaturedRepositoryRef[] = [
  { slug: "inframind", project: "InfraMind", githubFullName: "Keninjavelas/InfraMind" },
  { slug: "auxilium", project: "Auxilium Digital Archive", githubFullName: null },
  { slug: "metis", project: "Metis", githubFullName: null },
] as const;

/** Lower-cased set of full names that must never appear in the dynamic archive. */
export const FEATURED_GITHUB_FULL_NAMES: ReadonlySet<string> = new Set(
  FEATURED_REPOSITORIES.flatMap((entry) =>
    entry.githubFullName ? [entry.githubFullName.toLowerCase()] : []
  )
);
