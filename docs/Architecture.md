# PhotoMagic Monorepo Architecture

## Executive Summary

PhotoMagic is built as a high-performance monorepo powered by **pnpm workspaces** and **TurboRepo**. The application ecosystem is strictly divided into two primary Next.js frontends supported by 10 modular workspace packages.

---

## High-Level System Architecture

```
                               ┌────────────────────────────────────────┐
                               │           PhotoMagic Monorepo          │
                               └───────────────────┬────────────────────┘
                                                   │
                   ┌───────────────────────────────┴───────────────────────────────┐
                   │                                                               │
        ┌──────────┴──────────┐                                         ┌──────────┴──────────┐
        │  PhotoMagic Studio  │                                         │    PhotoMagic OS    │
        │    (apps/studio)    │                                         │      (apps/os)      │
        │     Port: 3000      │                                         │      Port: 3001     │
        └──────────┬──────────┘                                         └──────────┬──────────┘
                   │                                                               │
                   └───────────────────────────────┬───────────────────────────────┘
                                                   │
     ┌─────────────────────────────────────────────┴─────────────────────────────────────────────┐
     │                                     Shared Packages (`packages/*`)                       │
     ├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┤
     │    @auth     │  @database   │   @storage   │   @shared    │    @types    │     @ui      │
     ├──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┤
     │                           @config / @tailwind-config / @typescript-config                │
     └─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Core System Boundaries

### 1. PhotoMagic Studio (`apps/studio`)

- **Role**: Public-facing luxury marketing website, portfolio showcase, booking portal, and guest authentication entry.
- **Port**: `3000`
- **Key Routes**: `/`, `/about`, `/services`, `/portfolio`, `/packages`, `/book`, `/pricing`, `/login`, `/testimonials`, `/faq`, `/contact`, `/privacy`, `/terms`.
- **Tech Stack**: Next.js (App Router), React 18, Framer Motion, `@photomagic/ui`, `@photomagic/types`, `@photomagic/config`.

### 2. PhotoMagic OS (`apps/os`)

- **Role**: Enterprise operating system for photography studio automation, client management, AI image processing, gallery delivery, financials, and CRM.
- **Port**: `3001`
- **Key Routes**: `/dashboard`, `/projects`, `/bookings`, `/gallery`, `/albums`, `/ai`, `/delivery`, `/clients`, `/financials`, `/analytics`, `/automation`, `/settings`, `/marketing`, `/equipment`, `/team`, `/devops`, `/security`.
- **Middleware**: Protected route enforcement (`apps/os/middleware.ts`) via `photomagic_os_session` authentication cookies and RBAC guards.

---

## Package Graph & Core Layering

| Package                         | Primary Responsibility                                     | Key Export / Entry Point         |
| ------------------------------- | ---------------------------------------------------------- | -------------------------------- |
| `@photomagic/auth`              | Authentication lifecycle, Supabase Auth helpers, RBAC      | `packages/auth/src/index.ts`     |
| `@photomagic/database`          | Supabase Client & Server client creation                   | `packages/database/src/index.ts` |
| `@photomagic/storage`           | Cloudflare R2 / S3 storage key generators & presigned URLs | `packages/storage/src/index.ts`  |
| `@photomagic/shared`            | Common utilities, formatters, state helpers                | `packages/shared/src/index.ts`   |
| `@photomagic/types`             | Central TypeScript interfaces & domain data models         | `packages/types/src/index.ts`    |
| `@photomagic/ui`                | Design system, glassmorphism tokens, shared UI components  | `packages/ui/src/index.ts`       |
| `@photomagic/config`            | Zod schemas (AI, CRM, Finance, Workflow) & ENV validation  | `packages/config/src/index.ts`   |
| `@photomagic/tailwind-config`   | Shared Tailwind CSS preset & theme extensions              | `packages/tailwind-config`       |
| `@photomagic/typescript-config` | Base `tsconfig.json` inheritance templates                 | `packages/typescript-config`     |
| `@photomagic/eslint-config`     | Unified ESLint ruleset across the workspace                | `packages/eslint-config`         |

---

## Data Flow & Integration Principles

1. **Zero Logic Duplication**: Shared business rules, authentication logic, database queries, and type definitions reside strictly inside `packages/*`.
2. **Environment Isolation**: Runtime validation occurs on boot via `@photomagic/config/src/env.ts`.
3. **Session Persistence**: Seamless session sharing between Studio (Port 3000) and OS Platform (Port 3001) using cross-subdomain cookie validation.
