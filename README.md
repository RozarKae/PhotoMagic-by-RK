# PhotoMagic Studio OS — Monorepo Setup & Developer Guide

Welcome to **PhotoMagic Studio OS**, a premium photography studio management platform built with Next.js App Router, Supabase, Cloudflare R2, and Tailwind CSS.

---

## 🏗️ Monorepo Architecture

Managed via **pnpm Workspaces** and **Turborepo**.

```
photo-magic-monorepo/
├── apps/
│   ├── website/             # Public Showcase & Lead Generation Engine (Next.js)
│   ├── client/              # Private Client Experience & Web Proofing Hub (Next.js)
│   └── admin/               # Studio Owner Command Center & Staff Workspace (Next.js)
├── packages/
│   ├── ui/                  # Shared Design System Component Library
│   ├── database/            # Supabase Client & Database Specifications
│   ├── storage/             # Cloudflare R2 Presigned S3 Storage Wrapper
│   ├── typescript-config/   # Shared TypeScript configurations
│   ├── eslint-config/       # Shared ESLint rules
│   └── tailwind-config/     # Shared Tailwind CSS design system tokens
├── docs/                    # Master Architectural & UX Blueprints (Phases 0.1 - 0.9)
├── PhotoMagicBible.md       # Master Single-Source-of-Truth Project Bible
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
cp .env.example apps/website/.env.local
cp .env.example apps/client/.env.local
cp .env.example apps/admin/.env.local
```

### 4. Running Development Servers

```bash
# Start all applications simultaneously via Turborepo
pnpm dev
```

- **Public Website**: `http://localhost:3000`
- **Client Portal**: `http://localhost:3001`
- **Admin Dashboard**: `http://localhost:3002`

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
