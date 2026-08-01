# PhotoMagic End-to-End Authentication Lifecycle

## Authentication Lifecycle Architecture

```
Guest Visitor (Studio Website:3000)
    │
    ▼
Marketing / Pricing / Portfolio Pages
    │
    ▼
Click "Login" → /login Page (@photomagic/studio)
    │
    ▼
Credentials Submitted → @photomagic/auth (Supabase Auth Client)
    │
    ├── Validation Failure → Show error notice on /login
    │
    └── Success → Set Cross-Domain Session Cookie `photomagic_os_session`
            │
            ▼
Redirect to PhotoMagic OS (http://localhost:3001/dashboard)
    │
    ▼
Middleware Guard (`apps/os/middleware.ts`)
    ├── Cookie Present → Validate session token & RBAC role
    │       │
    │       ▼
    │   Access Granted to Protected OS Routes (/dashboard, /projects, /gallery, etc.)
    │
    └── Cookie Missing/Expired → Redirect to Marketing /login (http://localhost:3000/login)
            │
            ▼
User Clicks "Logout" inside OS Navigation Header
    │
    ▼
Clear Cookie (`photomagic_os_session`) + Call Supabase signOut()
    │
    ▼
Redirect back to Marketing Website (http://localhost:3000)
```

---

## Role-Based Access Control (RBAC) Specifications

Defined in `@photomagic/auth/src/rbac.ts`:

| Role           | Permissions / Scope                                               | Accessible Routes                                       |
| -------------- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| `SUPER_ADMIN`  | Full platform administration & organization management            | All routes + `/devops` + `/security`                    |
| `STUDIO_OWNER` | Studio owner, full access to clients, bookings, financial reports | All OS operational routes                               |
| `PHOTOGRAPHER` | Assigned shoots, active projects, gallery uploads, AI tools       | `/dashboard`, `/projects`, `/gallery`, `/albums`, `/ai` |
| `EDITOR`       | Image editing, culling, face enhancement, album proofing          | `/dashboard`, `/projects`, `/gallery`, `/albums`, `/ai` |
| `CLIENT`       | Client portal, gallery viewing, album approval, payment           | `/delivery`, `/albums` (client view)                    |
| `GUEST`        | Unauthenticated marketing website visitor                         | Public Studio pages (`apps/studio`)                     |

---

## Middleware & Route Security

`apps/os/middleware.ts` guards all protected OS routes:

- Protected route prefixes: `/dashboard`, `/projects`, `/bookings`, `/gallery`, `/albums`, `/ai`, `/delivery`, `/clients`, `/financials`, `/settings`, `/analytics`, `/automation`.
- Static assets (`/_next`, `/api`, static files) are passed through without cookie checks.
- Unauthenticated requests in production environments are redirected to `NEXT_PUBLIC_WEBSITE_URL/login`.
