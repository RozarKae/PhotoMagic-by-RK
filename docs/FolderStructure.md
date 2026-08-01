# PhotoMagic Directory & Monorepo Structure

```
f:\PhotoMagic-by-RK\
├── apps/
│   ├── os/                            # PhotoMagic OS Enterprise App (Port 3001)
│   │   ├── app/                       # Next.js App Router (37 modular routes)
│   │   │   ├── (auth)/                # Authentication layouts & components
│   │   │   ├── ai/                    # AI photo enhancement & studio suite
│   │   │   ├── albums/                # Album proofing & designer tools
│   │   │   ├── analytics/             # Business intelligence & studio reporting
│   │   │   ├── automation/            # Workflow & client automation triggers
│   │   │   ├── bookings/              # Calendar, lead pipeline & booking CRM
│   │   │   ├── clients/               # Client portal, contacts & histories
│   │   │   ├── dashboard/             # Executive studio overview
│   │   │   ├── delivery/              # Digital gallery delivery center
│   │   │   ├── financials/            # Invoicing, revenue & payment processing
│   │   │   ├── gallery/               # Photo gallery management
│   │   │   ├── projects/              # Active shoot & event project management
│   │   │   └── settings/              # Studio configuration & team management
│   │   ├── components/                # OS-specific UI views & components
│   │   ├── middleware.ts              # Session cookie verification & protected route security
│   │   ├── next.config.js             # OS Next.js build configuration
│   │   ├── package.json               # @photomagic/os package definition
│   │   └── tsconfig.json              # TypeScript compilation config
│   │
│   └── studio/                        # PhotoMagic Studio Marketing Website (Port 3000)
│       ├── app/                       # Next.js App Router (19 public pages)
│       │   ├── about/                 # Studio story & philosophy
│       │   ├── blog/                  # Photography insights & articles
│       │   ├── book/                  # Booking enquiry & consultation request
│       │   ├── contact/               # Contact form & studio locations
│       │   ├── faq/                   # Frequently asked questions
│       │   ├── login/                 # Guest/Client login gateway to OS
│       │   ├── packages/              # Pricing tiers & service packages
│       │   ├── portfolio/             # High-resolution gallery showcase
│       │   ├── privacy/               # Privacy policy
│       │   ├── services/              # Studio services breakdown
│       │   ├── terms/                 # Terms of service
│       │   └── testimonials/          # Client reviews & endorsements
│       ├── components/                # Studio website specific components
│       ├── next.config.js             # Studio Next.js build configuration
│       ├── package.json               # @photomagic/studio package definition
│       └── tsconfig.json              # TypeScript compilation config
│
├── packages/                          # Monorepo Workspace Shared Packages
│   ├── auth/                          # Authentication, Supabase Auth, RBAC guards
│   │   └── src/                       # auth-actions, auth-provider, rbac, server-auth
│   ├── config/                        # Centralized Zod schemas & ENV runtime validator
│   │   └── src/                       # Zod schemas (AI, CRM, Finance, Workflow) & env.ts
│   ├── database/                      # Supabase Client & Server client factories
│   │   └── src/                       # client, server, utils
│   ├── eslint-config/                 # Shared ESLint configuration rule presets
│   ├── shared/                        # Common utility functions & helper tools
│   ├── storage/                       # Cloudflare R2 / S3 storage key & presigned URL generators
│   ├── tailwind-config/               # Shared Tailwind CSS design system preset
│   ├── types/                         # Centralized TypeScript interface definitions
│   ├── typescript-config/             # Base tsconfig templates
│   └── ui/                            # Design system UI library, glassmorphic components
│       └── src/                       # components, design-system, providers, styles
│
├── docs/                              # Permanent System Architecture Documentation
├── Dockerfile                         # Production containerization build setup
├── docker-compose.yml                 # Local multi-container orchestration
├── package.json                       # Monorepo root scripts & dependencies
├── pnpm-workspace.yaml                # pnpm workspace package declaration
└── turbo.json                         # TurboRepo build pipeline & execution graph
```
