# Multi-stage Dockerfile for PhotoMagic Studio OS Monorepo
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# Stage 1: Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/studio/package.json ./apps/studio/
COPY apps/os/package.json ./apps/os/
COPY packages/ui/package.json ./packages/ui/
COPY packages/database/package.json ./packages/database/
COPY packages/storage/package.json ./packages/storage/
COPY packages/config/package.json ./packages/config/
COPY packages/auth/package.json ./packages/auth/
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Stage 3: Runner
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm", "--filter", "@photomagic/studio", "start"]
