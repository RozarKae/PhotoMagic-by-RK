# PhotoMagic Design Language (PDL) — 12. Photography Guidelines

## Photography Philosophy

In PhotoMagic, **Photography is the Product**. The photograph is not decorative background art—it is the central value delivered to clients and managed by photographers.

---

## The 6 Laws of PhotoMagic Imagery

### Law 1: Zero Image Distortion

- Aspect ratios must remain authentic to professional camera sensors (`3:2` landscape/portrait default, `1:1` square thumbnails, `16:9` cinematic banners).
- Never apply CSS `stretch` or improper `object-fit`. Always use `object-fit: cover` with proper focal point metadata.

### Law 2: High Dynamic Range Preservation

- Image containers must avoid harsh dark overlays that mute high-dynamic-range highlights unless text readability strictly requires a vignette.
- When text overlays an image, use a subtle 40% height bottom-to-top gradient mask (`linear-gradient(to top, rgba(5,5,5,0.9), transparent)`).

### Law 3: Fast Progressive Loading Matrix

- High-resolution assets load progressively:
  1. Low-Quality Image Placeholder (BlurHash or ultra-compact webp preview).
  2. Smooth opacity cross-fade (`duration-normal`) once full-res asset resolves from CDN.

### Law 4: Aspect Ratio Tokens

| Token              | Ratio  | Primary Application                     |
| ------------------ | ------ | --------------------------------------- |
| `aspect-standard`  | `3:2`  | Default 35mm photograph display format  |
| `aspect-portrait`  | `2:3`  | Vertical portrait showcase              |
| `aspect-square`    | `1:1`  | Grid thumbnails, avatar previews        |
| `aspect-cinematic` | `16:9` | Hero banners, video delivery thumbnails |
| `aspect-panorama`  | `21:9` | Ultra-wide portfolio hero banners       |

### Law 5: Image Priority Matrix

- **Hero Image**: Maximum 1 per view. High-res webp/avif, prioritized preloading (`priority` prop in Next.js Image).
- **Gallery Masonry**: Lazy-loaded responsive srcSets with Cloudflare R2 / S3 storage CDN presigned URLs.
