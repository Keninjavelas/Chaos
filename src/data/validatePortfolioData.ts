import fs from "node:fs";
import path from "node:path";
import { portfolioAssets } from "./portfolioAssets";
import { portfolioApproval, portfolioManifest, type ApprovalItem, type VerificationStatus } from "./portfolioData";

interface AssetLike {
  path?: string | null;
  url?: string | null;
  status?: string;
  visibility?: string;
  alt?: string;
  note?: string;
}

export interface PortfolioValidationSummary {
  contentEntries: number;
  verified: number;
  needsApproval: number;
  needsSource: number;
  privateEntries: number;
  removeEntries: number;
  missingAssets: number;
}

let hasValidated = false;

const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];
const placeholderPatterns = [/placeholder/i, /not yet supplied/i, /#pending/i, /\bTBD\b/i];

const flattenApprovalItems = (): ApprovalItem[] =>
  [
    ...portfolioApproval.identity,
    ...portfolioApproval.contact,
    ...portfolioApproval.education,
    ...portfolioApproval.experience,
    ...portfolioApproval.skills,
    ...portfolioApproval.projects,
    ...portfolioApproval.publications,
    ...portfolioApproval.certifications,
    ...portfolioApproval.openSource,
    ...portfolioApproval.leadership,
  ];

const flattenAssetRecords = (value: unknown, bucket: AssetLike[] = []): AssetLike[] => {
  if (!value || typeof value !== "object") {
    return bucket;
  }

  const candidate = value as AssetLike;
  if ("status" in candidate && ("path" in candidate || "url" in candidate)) {
    bucket.push(candidate);
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => flattenAssetRecords(entry, bucket));
    return bucket;
  }

  Object.values(value).forEach((entry) => flattenAssetRecords(entry, bucket));
  return bucket;
};

const countByStatus = (items: ApprovalItem[], status: VerificationStatus) =>
  items.filter((item) => item.verificationStatus === status).length;

const hasPlaceholderText = (value: string) =>
  placeholderPatterns.some((pattern) => pattern.test(value));

const hasInvalidYearRange = (value: string) => {
  const years = value.match(/\b\d{4}\b/g)?.map(Number) ?? [];
  if (years.length < 2) return false;
  return years.some((year, index) => index > 0 && year < years[index - 1]);
};

const isPublicImage = (asset: AssetLike) =>
  asset.visibility === "public" &&
  typeof asset.path === "string" &&
  imageExtensions.includes(path.extname(asset.path).toLowerCase());

const internalAssetExists = (assetPath: string) => {
  const normalized = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  return fs.existsSync(path.join(process.cwd(), "public", normalized));
};

export const getPortfolioApprovalSummary = (): PortfolioValidationSummary => {
  const items = flattenApprovalItems();
  const assets = flattenAssetRecords(portfolioAssets);

  return {
    contentEntries: items.length,
    verified: countByStatus(items, "verified"),
    needsApproval: countByStatus(items, "needs-approval"),
    needsSource: countByStatus(items, "needs-source"),
    privateEntries: countByStatus(items, "private"),
    removeEntries: countByStatus(items, "remove"),
    missingAssets: assets.filter((asset) => asset.status === "missing").length,
  };
};

export const validatePortfolioData = () => {
  const warnings: string[] = [];
  const approvalItems = flattenApprovalItems();
  const assetRecords = flattenAssetRecords(portfolioAssets);

  approvalItems.forEach((item) => {
    if (item.verificationStatus !== "verified" && item.verificationStatus !== "private" && item.verificationStatus !== "remove") {
      warnings.push(`[approval] ${item.id} is ${item.verificationStatus}.`);
    }

    if (!item.proposedPublicWording.trim()) {
      warnings.push(`[content] ${item.id} is missing public wording.`);
    }

    if (!item.currentValue.trim()) {
      warnings.push(`[content] ${item.id} is missing its current manifest value.`);
    }

    if (hasPlaceholderText(item.proposedPublicWording)) {
      warnings.push(`[placeholder] ${item.id} contains placeholder-like public wording.`);
    }

    if (hasInvalidYearRange(item.currentValue)) {
      warnings.push(`[dates] ${item.id} appears to have an invalid year range: ${item.currentValue}`);
    }

    if (item.missingLinks.length > 0 && item.verificationStatus !== "private" && item.verificationStatus !== "remove") {
      warnings.push(`[links] ${item.id} is missing links: ${item.missingLinks.join(", ")}`);
    }

    if (item.missingImages.length > 0 && item.verificationStatus !== "private" && item.verificationStatus !== "remove") {
      warnings.push(`[images] ${item.id} is missing images: ${item.missingImages.join(", ")}`);
    }

    if (item.missingPdfs.length > 0 && item.verificationStatus !== "private" && item.verificationStatus !== "remove") {
      warnings.push(`[pdfs] ${item.id} is missing PDFs: ${item.missingPdfs.join(", ")}`);
    }
  });

  const projectSlugs = [
    ...portfolioManifest.projects.flagshipExhibits,
    ...portfolioManifest.projects.detailedDossiers,
    ...portfolioManifest.projects.archiveRecords,
    ...portfolioManifest.projects.deferred,
  ].map((project) => project.slug);
  const duplicateSlugs = projectSlugs.filter((slug, index) => projectSlugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    warnings.push(`[projects] Duplicate project slug(s): ${Array.from(new Set(duplicateSlugs)).join(", ")}`);
  }

  assetRecords.forEach((asset, index) => {
    if (asset.status === "private" && asset.visibility === "public") {
      warnings.push(`[assets] Asset #${index + 1} is marked private but visible publicly.`);
    }

    if (asset.visibility === "public" && asset.status !== "private" && typeof asset.path === "string" && hasPlaceholderText(asset.path)) {
      warnings.push(`[assets] Public asset path looks like a placeholder: ${asset.path}`);
    }

    if (isPublicImage(asset) && !asset.alt) {
      warnings.push(`[assets] Public image asset is missing alt text: ${asset.path}`);
    }

    if ((asset.status === "available" || asset.status === "needs-update") && typeof asset.path === "string" && asset.path.startsWith("/") && !internalAssetExists(asset.path)) {
      warnings.push(`[assets] Expected asset file not found: ${asset.path}`);
    }
  });

  return {
    summary: getPortfolioApprovalSummary(),
    warnings,
  };
};

export const ensurePortfolioValidation = () => {
  if (process.env.NODE_ENV === "production" || hasValidated) {
    return getPortfolioApprovalSummary();
  }

  hasValidated = true;
  const result = validatePortfolioData();

  if (result.warnings.length > 0) {
    console.warn("[portfolio-validation] Content Approval Pass 1 warnings:");
    result.warnings.forEach((warning) => console.warn(`- ${warning}`));
  }

  return result.summary;
};
