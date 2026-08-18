# PhotoMagic Studio OS — Monorepo Setup & Developer Guide

Welcome to **PhotoMagic Studio OS**, a premium photography studio management platform built with Next.js App Router, Supabase, Cloudflare R2, and Tailwind CSS.

---

## 🏗️ Monorepo Architecture

Managed via **pnpm Workspaces** and **Turborepo**.

```
photo-magic-monorepo/
├── apps/
│   ├── studio/              # Public Luxury Marketing Website & Showcase (Next.js, Port 3000)
│   └── os/                  # Unified Studio Command Center, Client Portal & AI Suite (Next.js, Port 3001)
├── packages/
│   ├── ui/                  # Shared Design System Component Library
│   ├── design-language/     # Shared Master Design Tokens, Colors, Radii & Typography
│   ├── database/            # Supabase Client & 32 PostgreSQL DDL Migrations
│   ├── storage/             # Cloudflare R2 Presigned S3 Storage Wrapper
│   ├── auth/                # Supabase Auth helpers & RBAC middleware guards
│   ├── config/              # Centralized Zod validation schemas & env validator
│   ├── types/               # Centralized TypeScript interface definitions
│   ├── shared/              # Common utilities & helpers
│   ├── typescript-config/   # Shared TypeScript configurations
│   ├── eslint-config/       # Shared ESLint rules
│   └── tailwind-config/     # Shared Tailwind CSS design system tokens
├── docs/                    # Master Architectural & Execution Blueprints
├── PhotoMagicBible.md       # Master Single-Source-of-Truth Project Bible
├── PhotoMagicDesignBible2.md # Master Design System Specification
├── turbo.json               # Turborepo task pipeline configuration
└── pnpm-workspace.yaml      # pnpm workspace definition
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v20.0.0` or higher
- **pnpm**: `v9.0.0` or higher (`npm i -g pnpm`)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/your-org/photomagic-studio-os.git
cd photomagic-studio-os

# Install dependencies across all apps and packages
pnpm install
```

### 3. Environment Variables

Copy `.env.example` to local environment files in each app:

```bash
cp .env.example apps/studio/.env.local
cp .env.example apps/os/.env.local
```

### 4. Running Development Servers

```bash
# Start all applications simultaneously via Turborepo
pnpm dev

# Or start individual applications
pnpm dev:studio   # Runs apps/studio on http://localhost:3000
pnpm dev:os       # Runs apps/os on http://localhost:3001
```

- **Studio Marketing Website**: `http://localhost:3000`
- **Studio OS & Client Portal**: `http://localhost:3001`

---

## 🧪 Quality Gates & Commands

```bash
# Run static TypeScript checks across monorepo
pnpm type-check

# Run ESLint check
pnpm lint

# Format code with Prettier
pnpm format

# Build all applications for production
pnpm build
```

---

## 📘 Documentation

- Complete Architectural Specifications reside in [docs/](file:///f:/PhotoMagic-by-RK/docs).
- Project Master Bible: [PhotoMagicBible.md](file:///f:/PhotoMagic-by-RK/PhotoMagicBible.md).
