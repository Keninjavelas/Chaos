import type { AssetStatus } from "./portfolioData";

export interface AssetRecord {
  path: string | null;
  status: AssetStatus;
  visibility: "public" | "private";
  alt?: string;
  note?: string;
}

export interface ExternalResourceRecord {
  url: string | null;
  status: AssetStatus;
  visibility: "public" | "private";
  note?: string;
}

export const portfolioAssets = {
  profile: {
    headshot: {
      path: "/portfolio/profile/headshot.jpg",
      status: "available",
      visibility: "public",
      alt: "Professional portrait of Aryan Kapoor",
      note: "Primary headshot for public portfolio surfaces (user-supplied, integrated 2026-09-06).",
    } satisfies AssetRecord,
    avatar: {
      path: "/portfolio/profile/avatar.webp",
      status: "missing",
      visibility: "public",
      alt: "Square professional avatar of Aryan Kapoor",
      note: "Square-cropped avatar for compact UI surfaces.",
    } satisfies AssetRecord,
    casualPortrait: {
      path: "/portfolio/profile/casual.webp",
      status: "private",
      visibility: "private",
      alt: "Casual portrait reserved for the Personal Archive",
      note: "Optional Personal Archive image only.",
    } satisfies AssetRecord,
  },
  documents: {
    resume: {
      pdf: {
        path: "/portfolio/documents/resume.pdf",
        status: "available",
        visibility: "public",
        note: "Current downloadable public resume PDF (user-supplied, integrated 2026-09-06). Production resume action is now enabled.",
      } satisfies AssetRecord,
    },
    papers: {
      postQuantum: {
        pdf: {
          path: "/portfolio/documents/papers/post-quantum-zero-trust.pdf",
          status: "available",
          visibility: "public",
          note: "Local PDF for the Zenodo publication (user-supplied, integrated 2026-09-06).",
        } satisfies AssetRecord,
        coverImage: {
          path: "/portfolio/documents/papers/post-quantum-zero-trust-cover.webp",
          status: "missing",
          visibility: "public",
          alt: "Cover page for the post-quantum cryptography paper",
        } satisfies AssetRecord,
      },
      aiSurvey: {
        pdf: {
          path: "/portfolio/documents/papers/ai-education-recruitment-survey.pdf",
          status: "available",
          visibility: "public",
          note: "Final manuscript PDF for the AI education/recruitment survey paper (user-supplied, integrated 2026-09-06).",
        } satisfies AssetRecord,
        coverImage: {
          path: "/portfolio/documents/papers/ai-education-recruitment-cover.webp",
          status: "missing",
          visibility: "public",
          alt: "Cover page for the AI-driven systems survey paper",
        } satisfies AssetRecord,
        acceptanceImage: {
          path: "/portfolio/documents/papers/ai-survey-acceptance-redacted.webp",
          status: "missing",
          visibility: "private",
          alt: "Redacted conference acceptance image",
          note: "May be shown later if a redacted version is prepared.",
        } satisfies AssetRecord,
      },
    },
    certificates: {
      googleProjectManagement: {
        pdf: {
          path: "/portfolio/documents/certificates/google-project-management.pdf",
          status: "missing",
          visibility: "private",
        } satisfies AssetRecord,
      },
      awsCloudPractitionerEssentials: {
        pdf: {
          path: "/portfolio/documents/certificates/aws-cloud-practitioner-essentials.pdf",
          status: "missing",
          visibility: "private",
        } satisfies AssetRecord,
      },
      oracleCloudInfrastructureFoundations: {
        pdf: {
          path: "/portfolio/documents/certificates/oracle-cloud-infrastructure-foundations.pdf",
          status: "missing",
          visibility: "private",
        } satisfies AssetRecord,
      },
      nptelQuantumComputing: {
        pdf: {
          path: "/portfolio/documents/certificates/nptel-quantum-computing.pdf",
          status: "missing",
          visibility: "private",
        } satisfies AssetRecord,
      },
    },
  },
  projects: {
    inframind: {
      hero: {
        path: "/portfolio/projects/inframind/hero.png",
        status: "available",
        visibility: "public",
        alt: "Hero screenshot of InfraMind",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/inframind/hover.png",
          status: "available",
          visibility: "public",
          alt: "InfraMind hover intelligence interface",
        },
        {
          path: "/portfolio/projects/inframind/security.png",
          status: "available",
          visibility: "public",
          alt: "InfraMind security and topology view",
        },
      ] satisfies AssetRecord[],
      architectureDiagram: {
        path: "/portfolio/projects/inframind/architecture.png",
        status: "available",
        visibility: "public",
        alt: "Architecture diagram for InfraMind",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/InfraMind",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: "https://infra-site-three.vercel.app/",
        status: "available",
        visibility: "public",
        note: "Verified Vercel site as of 2026-08-11. Keep Marketplace surfaces hidden until that listing is manually reconfirmed.",
      } satisfies ExternalResourceRecord,
    },
    auxilium: {
      hero: {
        path: "/portfolio/projects/auxilium/hero.png",
        status: "available",
        visibility: "public",
        alt: "Hero screenshot of Auxilium Digital Archive",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/auxilium/reception.png",
          status: "available",
          visibility: "public",
          alt: "Reception room view from Auxilium Digital Archive",
        },
        {
          path: "/portfolio/projects/auxilium/personnel-wing.webp",
          status: "available",
          visibility: "public",
          alt: "Personnel or records room view from Auxilium Digital Archive",
          note: "Authentic capture from the production build (2026-09-07): Personnel Wing timeline/records room, normal gameplay HUD only.",
        } satisfies AssetRecord,
        {
          path: "/portfolio/projects/auxilium/document-overlay.png",
          status: "available",
          visibility: "public",
          alt: "Interaction overlay from Auxilium Digital Archive",
        },
      ] satisfies AssetRecord[],
      architectureDiagram: {
        path: "/portfolio/projects/auxilium/architecture.png",
        status: "available",
        visibility: "public",
        alt: "Implemented architecture diagram for Auxilium Digital Archive",
      } satisfies AssetRecord,
      demoVideo: {
        path: "/portfolio/projects/auxilium/demo.mp4",
        status: "missing",
        visibility: "public",
        note: "30-60 second walkthrough video.",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "Confirmed private GitHub repository. Do not render a public repo button unless the visibility changes.",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: null,
        status: "missing",
        visibility: "public",
        note: "Deployment-phase requirement only. Publish this only after the real deployment URL exists. Do not render a dead placeholder link.",
      } satisfies ExternalResourceRecord,
    },
    poseidon: {
      hero: {
        path: "/portfolio/projects/poseidon/hero.webp",
        status: "missing",
        visibility: "public",
        alt: "Hero screenshot for Poseidon",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/poseidon/dashboard.webp",
          status: "missing",
          visibility: "public",
          alt: "Poseidon dashboard interface",
        },
        {
          path: "/portfolio/projects/poseidon/simulation.webp",
          status: "missing",
          visibility: "public",
          alt: "Poseidon simulation or digital twin interface",
        },
      ] satisfies AssetRecord[],
      architectureDiagram: {
        path: "/portfolio/projects/poseidon/architecture.webp",
        status: "missing",
        visibility: "public",
        alt: "Architecture diagram for Poseidon",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/Poseidon",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "No independently verified public deployment. Keep live-link surfaces hidden.",
      } satisfies ExternalResourceRecord,
    },
    metis: {
      hero: {
        path: "/portfolio/projects/metis/hero.png",
        status: "available",
        visibility: "public",
        alt: "Hero screenshot for Metis",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/metis/workflow.png",
          status: "available",
          visibility: "public",
          alt: "Workflow or dashboard view from Metis",
        },
        {
          path: "/portfolio/projects/metis/artifact.png",
          status: "available",
          visibility: "public",
          alt: "Generated artifact set from Metis",
        },
      ] satisfies AssetRecord[],
      architectureDiagram: {
        path: "/portfolio/projects/metis/architecture.png",
        status: "available",
        visibility: "public",
        alt: "Architecture diagram for Metis",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "Confirmed private GitHub repository. Public case study should rely on redacted screenshots and diagrams rather than a repo link.",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: null,
        status: "private",
        visibility: "private",
      } satisfies ExternalResourceRecord,
    },
    multiCloudServerlessAnalytics: {
      hero: {
        path: "/portfolio/projects/multicloud-serverless-analytics/hero.png",
        status: "available",
        visibility: "public",
        alt: "Hero screenshot for Multi-Cloud Serverless Analytics",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/multicloud-serverless-analytics/supporting.png",
          status: "available",
          visibility: "public",
          alt: "Architecture workflow visual for Multi-Cloud Serverless Analytics",
        },
      ] satisfies AssetRecord[],
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/MultiCloud-Serverless-Analytics",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "No independently verified public deployment. Keep live-link surfaces hidden.",
      } satisfies ExternalResourceRecord,
    },
    wordExtension: {
      hero: {
        path: "/portfolio/projects/word-extension/hero.png",
        status: "available",
        visibility: "public",
        alt: "Hero screenshot for Word Extension",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/word-extension/qa.webp",
          status: "missing",
          visibility: "public",
          alt: "QA or task-pane workflow screenshot for Word Extension",
        },
      ] satisfies AssetRecord[],
      repositoryUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "Local-only workspace. Do not render a repository link unless one is later created and approved.",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: null,
        status: "private",
        visibility: "private",
      } satisfies ExternalResourceRecord,
    },
    dayOneAi: {
      hero: {
        path: "/portfolio/projects/dayone-ai/hero.png",
        status: "available",
        visibility: "public",
        alt: "Hero screenshot for DayOne AI",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/dayone-ai/supporting.png",
          status: "available",
          visibility: "public",
          alt: "Admin or workflow screenshot for DayOne AI",
        },
      ] satisfies AssetRecord[],
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/DayOne-AI",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: null,
        status: "private",
        visibility: "private",
      } satisfies ExternalResourceRecord,
    },
    ghostProtocol: {
      hero: {
        path: "/portfolio/projects/ghost-protocol/hero.png",
        status: "available",
        visibility: "public",
        alt: "Hero screenshot for Ghost Protocol",
      } satisfies AssetRecord,
      screenshots: [
        {
          path: "/portfolio/projects/ghost-protocol/dashboard.webp",
          status: "missing",
          visibility: "public",
          alt: "Dashboard screenshot for Ghost Protocol",
        },
      ] satisfies AssetRecord[],
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/Ghost-Protocol",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
      liveUrl: {
        url: null,
        status: "private",
        visibility: "private",
      } satisfies ExternalResourceRecord,
    },
    studentOs: {
      hero: {
        path: "/portfolio/projects/student-os/hero.png",
        status: "available",
        visibility: "public",
        alt: "Archive screenshot for Student OS",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "Repository unlinked 2026-09-06 — ownership could not be verified; see portfolioData audit note on the Student OS archive record.",
      } satisfies ExternalResourceRecord,
    },
    yatinveda: {
      repositoryUrl: {
        url: null,
        status: "private",
        visibility: "private",
      } satisfies ExternalResourceRecord,
    },
    reconcilyx: {
      repositoryUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "Keep repository details private until owner confirmation resolves the public-safe project scope.",
      } satisfies ExternalResourceRecord,
    },
    gcpOmniStream: {
      hero: {
        path: "/portfolio/projects/gcp-omnistream/hero.png",
        status: "available",
        visibility: "public",
        alt: "Archive screenshot for GCP OmniStream",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/GCP-OmniStream",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
    },
    awsCloudOps: {
      hero: {
        path: "/portfolio/projects/aws-cloudops/hero.png",
        status: "available",
        visibility: "public",
        alt: "Archive screenshot for AWS CloudOps",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/AWS-CloudOps",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
    },
    awsHelixDataLakehouse: {
      hero: {
        path: "/portfolio/projects/aws-helix-data-lakehouse/hero.png",
        status: "available",
        visibility: "public",
        alt: "Archive screenshot for AWS Helix Data Lakehouse",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/AWS-Helix-Data-Lakehouse",
        status: "available",
        visibility: "public",
      } satisfies ExternalResourceRecord,
    },
    fashionFeet: {
      repositoryUrl: {
        url: null,
        status: "private",
        visibility: "private",
        note: "Local-only unstable workspace. No public link should render.",
      } satisfies ExternalResourceRecord,
    },
    odysseus: {
      hero: {
        path: "/portfolio/projects/odysseus/hero.jpg",
        status: "available",
        visibility: "public",
        alt: "Archive screenshot for Odysseus",
      } satisfies AssetRecord,
      repositoryUrl: {
        url: "https://github.com/Keninjavelas/odysseus",
        status: "available",
        visibility: "public",
        note: "Public fork. Public wording must stay explicit about upstream attribution.",
      } satisfies ExternalResourceRecord,
    },
  },
  experience: {
    springerCapital: {
      certificate: {
        path: "/portfolio/experience/springer-capital/certificate.pdf",
        status: "missing",
        visibility: "private",
        note: "Internship certificate or proof.",
      } satisfies AssetRecord,
      screenshot: {
        path: "/portfolio/experience/springer-capital/non-confidential-proof.webp",
        status: "missing",
        visibility: "private",
        alt: "Non-confidential proof image for Springer Capital work",
      } satisfies AssetRecord,
    },
  },
  community: {
    ieee: {
      photo: {
        path: "/portfolio/events/ieee-webmaster.webp",
        status: "missing",
        visibility: "public",
        alt: "IEEE-related role or event image",
      } satisfies AssetRecord,
    },
    hackathon: {
      photo: {
        path: "/portfolio/events/hackathon.webp",
        status: "missing",
        visibility: "public",
        alt: "Hackathon event image",
      } satisfies AssetRecord,
    },
    symposium: {
      photo: {
        path: "/portfolio/events/technical-symposium.webp",
        status: "missing",
        visibility: "public",
        alt: "Technical symposium image",
      } satisfies AssetRecord,
    },
  },
  openSource: {
    firstContributions: {
      screenshot: {
        path: "/portfolio/open-source/first-contributions.webp",
        status: "missing",
        visibility: "private",
        alt: "Optional screenshot for the first public contribution",
      } satisfies AssetRecord,
    },
    latitudeLlm: {
      screenshot: {
        path: "/portfolio/open-source/latitude-llm.webp",
        status: "missing",
        visibility: "private",
        alt: "Optional screenshot for the Latitude LLM contribution discussion",
      } satisfies AssetRecord,
    },
  },
} as const;
