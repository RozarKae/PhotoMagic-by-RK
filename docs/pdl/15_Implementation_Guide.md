# PhotoMagic Design Language (PDL) — 15. Implementation Guide & Monorepo Integration

## Overview

This document details how developers, designers, and AI tools must consume the **PhotoMagic Design Language (PDL v1.0)** within the monorepo.

---

## Package Architecture

PDL is packaged inside `packages/design-language` and registered as `@photomagic/design-language`.

```
packages/design-language/
├── package.json
├── tsconfig.json
└── src/
    ├── tokens/
    │   ├── colors.ts
    │   ├── spacing.ts
    │   ├── radius.ts
    │   ├── elevation.ts
    │   ├── typography.ts
    │   ├── motion.ts
    │   ├── breakpoints.ts
    │   └── z-index.ts
    ├── themes/
    │   ├── studio-theme.ts
    │   └── workspace-theme.ts
    ├── presets/
    │   ├── motion-presets.ts
    │   └── typography-presets.ts
    ├── specs/
    │   ├── button-spec.ts
    │   └── card-spec.ts
    └── index.ts
```

---

## Consuming PDL in Applications

### 1. TypeScript Import Pattern

```typescript
import { PDL_TOKENS, PDL_MOTION_PRESETS, PDL_STUDIO_THEME } from '@photomagic/design-language';

// Example: Using PDL motion curve in Framer Motion
const modalAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1.0 },
  transition: { ease: PDL_TOKENS.motion.curves.luxuryEase, duration: 0.25 },
};
```

### 2. Tailwind CSS Integration

In `packages/tailwind-config/tailwind.config.ts`, extend Tailwind with `@photomagic/design-language` tokens:

```typescript
import { PDL_TOKENS } from '@photomagic/design-language';

export default {
  theme: {
    extend: {
      colors: {
        'pdl-bg': PDL_TOKENS.colors.base.bg,
        'pdl-gold': PDL_TOKENS.colors.brand.raw,
      },
    },
  },
};
```

---

## Contribution & Maintenance Rules

1. **Never Bypass PDL Tokens**: No hardcoded arbitrary styling values are allowed in UI applications (`apps/studio`, `apps/os`).
2. **PDL Versioning**: Any token addition or specification change requires updating `@photomagic/design-language` version in accordance with semver.
3. **Automated Validation**: `pnpm run type-check` validates token integrity before any release.
