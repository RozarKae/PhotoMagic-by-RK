# PhotoMagic Developer Onboarding & Setup Guide

## Prerequisites

Ensure your workstation has the following installed:

- **Node.js**: `>= 18.0.0` (LTS recommended)
- **pnpm**: `>= 9.0.0` (`npm install -g pnpm`)
- **Git**: `>= 2.30.0`

---

## Workspace Setup

### 1. Clone Repository & Install Dependencies

```bash
git clone https://github.com/rozarkae/PhotoMagic-by-RK.git
cd PhotoMagic-by-RK
pnpm install
```

### 2. Environment Setup

Copy the example environment file into root and target apps:

```bash
cp .env.example .env.local
```

### 3. Development Commands

| Command           | Action                                                        |
| ----------------- | ------------------------------------------------------------- |
| `pnpm dev`        | Launch both Studio (Port 3000) and OS (Port 3001) in dev mode |
| `pnpm dev:studio` | Launch Studio frontend only (`http://localhost:3000`)         |
| `pnpm dev:os`     | Launch OS platform frontend only (`http://localhost:3001`)    |
| `pnpm build`      | Production build across all workspace apps & packages         |
| `pnpm type-check` | Run TypeScript validation across all 12 packages/apps         |
| `pnpm lint`       | Run ESLint validation across all workspace packages           |
| `pnpm format`     | Run Prettier format check and fix                             |

---

## Code Quality Standards

- **TypeScript**: Strict mode enabled. No implicit any.
- **Imports**: Use workspace alias `@photomagic/*` for all shared packages. Relative imports outside an app directory are prohibited.
- **Formatting**: Prettier is configured via `.prettierrc`. Run `pnpm format` before committing.
