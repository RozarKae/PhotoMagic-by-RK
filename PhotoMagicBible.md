# PhotoMagic Studio OS — Master Project Bible (Single Source of Truth)

---

> **Document Status**: Single Source of Truth Master Reference  
> **Repository Model**: Turborepo + pnpm Workspaces  
> **Tech Stack**: Next.js (App Router), Supabase (PostgreSQL + Auth), Cloudflare R2, Tailwind CSS, Framer Motion, Razorpay, Google AI

---

## 1. Project Identity & Philosophy

PhotoMagic Studio OS is designed to be a luxury, minimal, fast, and mobile-native photography studio management system that governs the complete customer lifecycle—from visitor discovery to contract signing, web proofing, 3D album approval, and high-res asset delivery.

### Design Benchmarks

- Apple (Spatial Luxury, Typographic Elegance)
- Linear (Speed, Keyboard Navigation, Micro-animations)
- Stripe (Financial Clarity, Clean Component Systems)
- Leica / Hasselblad (Tactile Precision, Media-First Aesthetics)

---

## 2. Master Blueprint Index

| Phase          | Architectural Blueprint              | Document Location                                                                                                                      |
| :------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 0.1**  | Client Experience Blueprint          | [docs/client-experience-blueprint.md](file:///f:/PhotoMagic-by-RK/docs/client-experience-blueprint.md)                                 |
| **Phase 0.2**  | Journey & Information Architecture   | [docs/client-journey-and-information-architecture.md](file:///f:/PhotoMagic-by-RK/docs/client-journey-and-information-architecture.md) |
| **Phase 0.3**  | UX Architecture Blueprint            | [docs/ux-architecture-blueprint.md](file:///f:/PhotoMagic-by-RK/docs/ux-architecture-blueprint.md)                                     |
| **Phase 0.4**  | System Architecture Blueprint        | [docs/system-architecture-blueprint.md](file:///f:/PhotoMagic-by-RK/docs/system-architecture-blueprint.md)                             |
| **Phase 0.5**  | Database Architecture & ERD          | [docs/database-architecture-erd.md](file:///f:/PhotoMagic-by-RK/docs/database-architecture-erd.md)                                     |
| **Phase 0.6**  | Complete Database Schema Design      | [docs/database-schema-design.md](file:///f:/PhotoMagic-by-RK/docs/database-schema-design.md)                                           |
| **Phase 0.7**  | Design System & UI Foundation        | [docs/design-system-foundation.md](file:///f:/PhotoMagic-by-RK/docs/design-system-foundation.md)                                       |
| **Phase 0.8**  | API Architecture & Backend Contracts | [docs/api-architecture-backend-contracts.md](file:///f:/PhotoMagic-by-RK/docs/api-architecture-backend-contracts.md)                   |
| **Phase 0.9**  | Project Execution Blueprint          | [docs/project-execution-blueprint.md](file:///f:/PhotoMagic-by-RK/docs/project-execution-blueprint.md)                                 |
| **Phase 0.10** | Monorepo Setup & Dev Environment     | [README.md](file:///f:/PhotoMagic-by-RK/README.md)                                                                                     |

---

## 3. Core Technical Conventions

- **Monorepo Package Boundaries**: `apps/*` consume components and domain types exclusively from `packages/*`.
- **Database Security**: All operational queries enforce `workspace_id` filtering backed by PostgreSQL Row Level Security (RLS).
- **Storage Rule**: Binary media assets are stored directly in Cloudflare R2 via expiring S3 presigned URLs—never proxied through API functions.
- **Frontend Standard**: Next.js React Server Components (RSC) by default; `'use client'` strictly scoped to interactive leaf nodes.

---

## 4. Phase 1+ Development Roadmap

- **Phase 1**: Core Shared Packages Setup (`@photomagic/ui`, `@photomagic/database`, `@photomagic/storage`).
- **Phase 2**: Authentication & Onboarding Flow (Supabase Auth, Passwordless Magic Links).
- **Phase 3**: CRM, Packages & Custom Estimator Booking Engine.
- **Phase 4**: Web Proofing Gallery & Compare Engine (Virtualized Grid, Selection Locker).
- **Phase 5**: 3D Interactive Album Proofing & Visual Coordinate Pin Commenting.
- **Phase 6**: Razorpay Financial Invoicing & Automated Ledger.
- **Phase 7**: AI Smart Culling & Gemini Tagging Integration.
