# PhotoMagic Production Deployment Guide

## Overview

PhotoMagic applications (`apps/studio` and `apps/os`) are optimized for deployment on Vercel, AWS ECS, or Docker containers.

---

## Environment Variables Configuration

Ensure all required production environment variables are defined in your deployment target platform (.env.production / Vercel secrets):

```env
# Node & Environment
NODE_ENV=production
NEXT_PUBLIC_WEBSITE_URL=https://photomagic.studio
NEXT_PUBLIC_OS_URL=https://os.photomagic.studio

# Supabase Auth & Database
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Storage & CDN (Cloudflare R2 / S3)
STORAGE_ACCOUNT_ID=your-cloudflare-account-id
STORAGE_ACCESS_KEY_ID=your-access-key-id
STORAGE_SECRET_ACCESS_KEY=your-secret-access-key
STORAGE_BUCKET_NAME=photomagic-assets
NEXT_PUBLIC_STORAGE_PUBLIC_URL=https://assets.photomagic.studio
```

---

## Deploying on Vercel

### 1. PhotoMagic Studio (`apps/studio`)

- **Project Root Directory**: `apps/studio`
- **Build Command**: `pnpm run build:studio` (or `turbo run build --filter=@photomagic/studio`)
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Custom Domain**: `photomagic.studio` (or www)

### 2. PhotoMagic OS (`apps/os`)

- **Project Root Directory**: `apps/os`
- **Build Command**: `pnpm run build:os` (or `turbo run build --filter=@photomagic/os`)
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Custom Domain**: `os.photomagic.studio`

---

## Containerized Deployment (Docker)

To deploy using Docker and Docker Compose:

### 1. Multi-Stage Docker Build

```bash
docker build -t photomagic-studio -f Dockerfile --target studio .
docker build -t photomagic-os -f Dockerfile --target os .
```

### 2. Run with Docker Compose

```bash
docker-compose up -d --build
```

This launches Studio on port 3000 and OS on port 3001 with production environment isolation.
