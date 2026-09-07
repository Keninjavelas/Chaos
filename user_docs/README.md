# user_docs — Authentic Asset Upload Area (V1 launch assets)

Drop documents / images / evidence files here. After you upload, tell the
assistant and each asset will be verified against the portfolio manifest
(`src/data/portfolioAssets.ts` + `src/data/portfolioData.ts`) and integrated
into `/public/portfolio/...` only if it is authentic and source-backed.
Nothing here is copied into the app automatically, and nothing is fabricated.

## Already received (verified)

| File in this folder | Verified content | Will integrate to |
|---|---|---|
| `Aryan_Kapoor_Resume.pdf` | Aryan Kapoor resume (1 page; email aryankapoor0303@gmail.com; phone kept PRIVATE — never shown publicly) | `/public/portfolio/documents/resume.pdf` (button becomes visible) |
| `Survey Paper.pdf` | "A Decision Framework for Post-Quantum Cryptography Deployment in Zero Trust Architecture" (8 pp, author Aryan Kapoor, HKBK College of Engineering) | `/public/portfolio/documents/papers/post-quantum-zero-trust.pdf` (maps to the POST-QUANTUM publication — not the AI-survey paper) |
| `Phase 1 Survey Paper.pdf` | "AI-Driven Systems for Education and Recruitment" (6 pp, 1st author Aryan Kapoor; co-authors Abdul Muqeet, Bhavani Singh Rajput, Dr. Pushpa Mohan, Dawood Masoodi) | `/public/portfolio/documents/papers/ai-education-recruitment-survey.pdf` (independent manuscript — no external record attached yet) |
| `Photograph.jpg` | Authentic headshot (ID-style, sky-blue backdrop) | Basis for the Personnel / Identity Archive record treatment (see `docs/identity-personnel-record-treatment.md`) |

## Still needed — REQUIRED for V1

1. **Auxilium Personnel Wing screenshot** → `/public/portfolio/projects/auxilium/personnel-wing.webp`
   Real in-game capture preferred (no stock/synthetic images). I can capture it
   from the local build myself if you prefer — say the word.
2. **AI education / recruitment survey paper PDF** (the OTHER publication —
   the one already linked to Zenodo record 20002606). Optional minimum: V1
   only needs one publication PDF (the Post-Quantum one above satisfies it),
   so this is recommended but not blocking. Expected path:
   `/public/portfolio/documents/papers/ai-education-recruitment-survey.pdf`

## Recommended / OPTIONAL uploads (for richer display)

- AWS Cloud Practitioner Essentials certificate (PDF or screenshot) — this is
  the one that flips the hidden `needs-source` AWS entry to publicly visible.
- Google PMP / Oracle OCI / NPTEL certificates (PDF or screenshots), only if
  you want them public.
- Springer Capital internship certificate/letter (optional).
- Publication cover images:
  `/portfolio/documents/papers/post-quantum-zero-trust-cover.webp`,
  `/portfolio/documents/papers/ai-education-recruitment-cover.webp`
- AI-survey acceptance/venue redacted proof:
  `/portfolio/documents/papers/ai-survey-acceptance-redacted.webp`
- Poseidon dossier screenshots (any) and/or publication/venue screenshots.
- Professional headshot (only if the UI should show one).

## What will NOT be used

- Your phone number (private; resumes carry it, the public site must not).
- Anything not backed by a real file or a real URL you provide.
- Synthetic/AI-generated "evidence" of any kind.

## Expected canonical filenames (used at integration)

- Resume: `resume.pdf`
- Post-Quantum paper: `post-quantum-zero-trust.pdf`
- AI survey paper: `ai-education-recruitment-survey.pdf`
- Personnel screenshot: `personnel-wing.webp`
