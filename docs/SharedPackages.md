# PhotoMagic Shared Packages Reference

## Overview

All shared logic, types, design systems, and configuration reside in `packages/`. Every package is exported under the `@photomagic/` workspace scope.

---

## Workspace Packages Summary

```
packages/
├── auth/                 # @photomagic/auth
├── config/               # @photomagic/config
├── database/             # @photomagic/database
├── eslint-config/        # @photomagic/eslint-config
├── shared/               # @photomagic/shared
├── storage/              # @photomagic/storage
├── tailwind-config/      # @photomagic/tailwind-config
├── types/                # @photomagic/types
├── typescript-config/    # @photomagic/typescript-config
└── ui/                   # @photomagic/ui
```

---

## Deep Dive by Package

### 1. `@photomagic/auth`

- **Path**: `packages/auth/src/index.ts`
- **Contains**:
  - `auth-actions.ts`: Server actions for sign in, sign up, sign out, password reset.
  - `auth-provider.tsx`: React Context for client auth state.
  - `rbac.ts`: Role-based access permission checkers (`hasPermission`, `isAuthorizedRole`).
  - `server-auth.ts`: Server-side session retrieval (`getServerSession`, `requireAuth`).
  - `password-validation.ts`: Password strength rules & validation logic.

### 2. `@photomagic/database`

- **Path**: `packages/database/src/index.ts`
- **Contains**:
  - `client.ts`: Supabase browser client factory (`createBrowserClient`).
  - `server.ts`: Supabase server client factory (`createServerClient`).
  - `utils.ts`: Query helper utilities and database error handling formatters.

### 3. `@photomagic/storage`

- **Path**: `packages/storage/src/index.ts`
- **Contains**:
  - `r2-client.ts`: S3-compatible Cloudflare R2 client initialization.
  - `keys.ts`: Deterministic object storage key generators for galleries, raw assets, and thumbnails.
  - `presigned.ts`: Presigned upload and download URL generation.

### 4. `@photomagic/shared`

- **Path**: `packages/shared/src/index.ts`
- **Contains**:
  - Currency & price formatters (`formatCurrency`, `formatINR`, `formatUSD`).
  - Date/time utilities (`formatDate`, `relativeTime`).
  - String slugification and text helpers.

### 5. `@photomagic/types`

- **Path**: `packages/types/src/index.ts`
- **Contains**:
  - Unified interfaces for `User`, `Studio`, `ShootProject`, `Booking`, `Client`, `GalleryAsset`, `Album`, `Invoice`, `AIRecoveryTask`.

### 6. `@photomagic/ui`

- **Path**: `packages/ui/src/index.ts`
- **Contains**:
  - Card, Button, Input, Modal, Badge, Dropdown, Table, Skeleton, Tooltip, Toast.
  - Global luxury dark-mode CSS styles (`packages/ui/src/styles/globals.css`).

### 7. `@photomagic/config`

- **Path**: `packages/config/src/index.ts`
- **Contains**:
  - 40 Zod schemas for AI modules, workflow, CRM, finance, platform settings.
  - Runtime environment validator (`env.ts`).
  - Central API route definitions (`routes.ts`) and logger (`logger.ts`).
