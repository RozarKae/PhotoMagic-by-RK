# PhotoMagic Monorepo — AI Agent & Context Architecture Map

> **Fast Reference for AI Coding Assistants (Gemini, Antigravity, Claude, Cursor)**  
> Keep prompts fast by referencing this index rather than scanning the entire codebase.

---

## 1. Monorepo Layout & Boundaries

```
PhotoMagic-by-RK/
├── apps/
│   ├── studio/       # Public-facing luxury marketing website & client proofing portal (Next.js 14, Port 3000)
│   └── os/           # Internal Photography Studio OS & AI Command Center (Next.js 14, Port 3001)
├── packages/
│   ├── ui/           # Core design system components (@photomagic/ui: Button, Card, Badge, Modal, etc.)
│   ├── types/        # Global TypeScript types (@photomagic/types)
│   ├── config/       # Zod schemas, routes, env, studio data, prompt cache (@photomagic/config)
│   ├── database/     # Supabase client, queries & schema definitions (@photomagic/database)
│   ├── storage/      # Cloudflare R2 presigned URLs & asset upload helpers (@photomagic/storage)
│   ├── auth/         # Supabase auth session helpers (@photomagic/auth)
│   └── shared/       # Shared utility functions, formatters, calculations (@photomagic/shared)
```

> **CRITICAL IMPORT RULE**:
>
> - `apps/*` MUST import shared logic, components, and types exclusively from `@photomagic/*` packages.
> - **NEVER** import across apps (e.g., `apps/studio` cannot import from `apps/os`).

---

## 2. Design System Tokens (`@photomagic/ui`)

- **Palette**: Dark luxury aesthetic.
  - Backgrounds: `bg-surface-base`, `bg-surface-elevated`, `bg-canvas`
  - Accents: `text-gold-500`, `border-gold-500/30`, `bg-gold-500/10`
  - Typography: `text-text-primary` (ivory/white), `text-text-secondary` (silver), `text-text-tertiary` (graphite)
  - Borders: `border-border-subtle`, `border-border-base`
- **Components**: Always reuse `<Card variant="glass">`, `<Badge variant="gold">`, `<Button variant="primary">` from `@photomagic/ui`.

---

## 3. AI Inference & Prompt Engine

- **Server Actions**: [`apps/os/app/actions/ai-inference-actions.ts`](file:///f:/PhotoMagic-by-RK/apps/os/app/actions/ai-inference-actions.ts)
  - `generateImageImagenAction(prompt, aspectRatio)` (Google Imagen 3 with cached fallback & prompt cache)
  - `analyzePhotoQualityGeminiAction(imageInput)` (Gemini 2.0 Flash multimodal vision analysis)
  - `removeBackgroundCloudAction(imageInput)` (Local FastAPI or HuggingFace RMBG-1.4)
  - `enhanceFaceCloudAction(imageInput)` (GFPGAN v1.4)
  - `upscalePhotoCloudAction(imageInput, scaleFactor)` (Swin2SR)
- **Prompt Cache**: `globalPromptCache` in `@photomagic/config` provides SHA-256 LRU caching.
- **Circuit Breaker**: `isLocalWorkerAvailable()` caches worker status with a 60-second TTL to avoid 600ms latency spikes.

---

## 4. Context Bloat Warning (Do NOT Ingest Unnecessarily)

To keep prompt processing fast and token usage low, **DO NOT** ingest the following files unless explicitly needed:

1. `packages/config/src/studio-data.ts` (60 KB) — Contains raw static website copy and package lists.
2. `packages/config/src/prewedding-pipeline-config.json` (14 KB) — Raw prompt generation matrices.
3. `packages/config/src/prewedding-generation-manifest.json` (8 KB) — Asset registry.
4. `docs/*` (38 files, >350 KB) — Architectural documentation. Check only specific docs when explicitly instructed.
5. `apps/*/public/images/*` — Binary media (excluded via `.aiignore`).

---

## 5. Standard Verification Commands

- Type check all packages: `pnpm run type-check`
- Lint all packages: `pnpm run lint`
- Build specific app: `pnpm run build:os` or `pnpm run build:studio`
