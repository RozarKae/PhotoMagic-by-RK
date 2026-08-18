# PhotoMagic Studio: Master Information Architecture & Sitemap

> **System Architecture Directive**: This document defines the structural taxonomy, relationship flows, permission boundaries, and navigation hierarchy across all six operational domains of PhotoMagic Studio. Zero visual styling or UI component references.

---

## Permission & Access Control Matrix

| Domain                 | Target Audience              | Access Requirement             | Primary Role Permissions                             |
| :--------------------- | :--------------------------- | :----------------------------- | :--------------------------------------------------- |
| **1. Public Website**  | Prospective Clients & Public | Unauthenticated (Public)       | Read-only public discovery + Form submission         |
| **2. Client Portal**   | Active & Past Clients        | Authenticated (Client JWT)     | Read/Write (Favorites, Proof notes, Profile)         |
| **3. Admin Dashboard** | Studio Directors & Managers  | Authenticated (Admin / Staff)  | Full CRUD (Leads, Events, Financials, Users)         |
| **4. AI Studio**       | Lead Photographers & Editors | Authenticated (Editor / Admin) | Execute AI jobs (Culling, Grading, Upscaling)        |
| **5. Album Studio**    | Clients & Album Designers    | Authenticated (Client + Admin) | Collaborative Read/Write (Layout comments, Sign-off) |
| **6. Delivery Center** | Clients & Fulfillment Staff  | Authenticated (Client + Staff) | Asset download, Print ordering, Vault access         |

---

## Domain Architecture & Navigation Flows

```
                          [ UNIFIED DOMAIN MAP ]

                                   ┌────────────────┐
                                   │ PUBLIC WEBSITE │
                                   └───────┬────────┘
                                           │
                                           ▼ (Auth Gateway: /login)
                         ┌─────────────────┴─────────────────┐
                         │                                   │
                         ▼                                   ▼
              ┌────────────────────┐               ┌───────────────────┐
              │   CLIENT PORTAL    │               │  ADMIN DASHBOARD  │
              └──────────┬─────────┘               └─────────┬─────────┘
                         │                                   │
         ┌───────────────┼──────────────┐                    ├────────────────┐
         │               │              │                    │                │
         ▼               ▼              ▼                    ▼                ▼
  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     ┌─────────────┐  ┌──────────────┐
  │ ALBUM STUDIO│ │DELIVERY CTR │ │PROOFING WS  │     │  AI STUDIO  │  │STUDIO ADMIN  │
  └─────────────┘ └─────────────┘ └─────────────┘     └─────────────┘  └──────────────┘
```

---

## Granular Sitemap Taxonomy

### DOMAIN 1: PUBLIC WEBSITE (`apps/studio`)

- **Access Permission**: Public / Unauthenticated
- **Primary Navigation Bar**: Home | Portfolio | Services | Packages | About | Contact | Client Login

```
1.0 Home (/)
    ├── 1.1 Portfolio Hub (/portfolio)
    │   ├── 1.1.1 Weddings Category (/portfolio?category=weddings)
    │   ├── 1.1.2 Portraits Category (/portfolio?category=portraits)
    │   ├── 1.1.3 Events Category (/portfolio?category=events)
    │   └── 1.1.4 Commercial Category (/portfolio?category=commercial)
    │
    ├── 1.2 Services & Investment (/services, /packages)
    │   ├── 1.2.1 Service Tiers (Silver, Gold, Platinum)
    │   ├── 1.2.2 Heirloom Album & Craft Specifications
    │   └── 1.2.3 Service Guarantee & Delivery SLA
    │
    ├── 1.3 About Studio (/about)
    │   ├── 1.3.1 Brand Ethos & Philosophy
    │   └── 1.3.2 Lead Artisans & Team Biographies
    │
    ├── 1.4 Contact & Inquiry (/contact, /book)
    │   ├── 1.4.1 Streamlined Inquiry Form
    │   └── 1.4.2 Response SLA & Consultation Scheduling
    │
    └── 1.5 Authentication Gateway (/login)
        └── Directs to Client Portal OR Admin Dashboard in `apps/os` based on JWT Role
```

---

### DOMAIN 2: CLIENT PORTAL (`apps/os/app/portal`)

- **Access Permission**: Authenticated (Role: `CLIENT`)
- **Primary Navigation Bar**: Overview | Event Collection | Photo Proofs | Favorite Moments | Album Selection | Downloads | Timeline | Billing Ledger

```
2.0 Client Portal Root (/portal)
    ├── 2.1 Overview Dashboard (/portal/dashboard)
    │   ├── Active Shoot Milestones & Timeline
    │   ├── Pending Proofing Actions
    │   └── Quick Download Shortcuts
    │
    ├── 2.2 Client Galleries (/portal/galleries)
    │   └── 2.2.1 High-Res Proofing Workspace (/portal/galleries/[gallery-id])
    │       ├── Grid View & Zoom Inspector
    │       ├── Favorites & Retouching Notes Manager
    │       └── Side-by-Side Comparison Workspace
    │
    ├── 2.3 Contracts & Financials (/portal/financials)
    │   ├── 2.3.1 Digital Agreement Signing (/portal/financials/contracts/[id])
    │   └── 2.3.2 Retainer & Invoice Payments (/portal/financials/invoices/[id])
    │
    └── 2.4 Account & Privacy Settings (/portal/settings)
        └── Password, Notification Preferences & Guest Sharing Permissions
```

---

### DOMAIN 3: ADMIN & OS DASHBOARD (`apps/os/app/dashboard`, `apps/os/app/admin`)

- **Access Permission**: Authenticated (Role: `SUPER_ADMIN`, `STUDIO_OWNER`, `STUDIO_MANAGER`, `LEAD_PHOTOGRAPHER`)
- **Primary Navigation Bar**: Overview | Inquiries | Shoot Calendar | Galleries | Clients | Financials | Projects

```
3.0 Admin Dashboard Root (/dashboard, /admin)
    ├── 3.1 Operations Overview (/dashboard)
    │   ├── Active Shoot Pipeline Summary
    │   ├── Delivery SLA Countdown Tracker
    │   └── Revenue & Retainer Metrics
    │
    ├── 3.2 Lead & Projects CRM (/projects, /clients)
    │   └── 3.2.1 Lead Detail & 15-Stage Workflow Manager (/projects)
    │
    ├── 3.3 Event & Shoot Calendar (/bookings)
    │   └── 3.3.1 Shoot Manifest & Gear Assignment (/equipment)
    │
    ├── 3.4 Gallery & Asset Management (/gallery)
    │   ├── 3.4.1 Upload & Ingestion Center (/gallery)
    │   └── 3.4.2 Client Access & Expiry Controls (/gallery)
    │
    ├── 3.5 Client Directory (/clients)
    │   └── 3.5.1 Client History & Portal Privileges (/clients)
    │
    └── 3.6 Financials & Contracts (/financials)
        ├── 3.6.1 Contract Builder & GST Invoicing (/financials)
        └── 3.6.2 Invoicing & Revenue Reporting (/analytics)
```

---

### DOMAIN 4: AI STUDIO & EDITING SUITE (`apps/os/app/ai*`)

- **Access Permission**: Authenticated (Role: `ADMIN`, `EDITOR`, `LEAD_PHOTOGRAPHER`)
- **Primary Navigation Bar**: AI Hub | AI Face Enhancement | AI Editing Studio | AI Album Designer

```
4.0 AI Creative Suite (/ai)
    ├── 4.1 AI Face Enhancement Engine (/ai-face-enhancement)
    │   ├── 68-Point Landmark Mesh Visualizer
    │   └── Micro Skin Texture & Identity Lock Controls
    │
    ├── 4.2 AI Color & Non-Destructive Edit Studio (/ai-editing-studio)
    │   └── Split-Slider Before/After Canvas & Studio LUT Profiles
    │
    ├── 4.3 AI Wedding Album Layout Engine (/ai-album-designer)
    │   └── 15-Chapter Auto-Culling & Spread Layout Generator
    │
    └── 4.4 Studio Automation & Workflow Graph (/automation, /studio-workflow)
        └── Visual Node Graph Triggers & Event Steppers
```

---

### DOMAIN 5: ALBUM STUDIO (`apps/os/app/albums`)

- **Access Permission**: Authenticated (Shared Role: `CLIENT` + `ADMIN_DESIGNER`)
- **Navigation Bar**: Overview | Layout Editor | Material Selection | Sign-Off

```
5.0 Album Studio Root (/albums, /album-studio)
    ├── 5.1 Interactive Spread Designer (/albums)
    │   ├── Page-by-Page 12x18 Spread Review & Drag-and-Drop Swap
    │   └── Collaborative 3D Spatial Coordinate Pin Commenting
    │
    ├── 5.2 Material & Cover Customizer (/albums)
    │   ├── Italian Leather, Linen & Velvet Cover Swatches
    │   └── Antique Gold Foil Stamping & Embossing Preview
    │
    └── 5.3 Final Sign-Off & Lab Dispatch (/albums)
        └── Digital Signature Sign-Off & Print Lab Dispatch Queue
```

---

### DOMAIN 6: DELIVERY CENTER (`apps/os/app/delivery`)

- **Access Permission**: Authenticated (Shared Role: `CLIENT` + `ADMIN`)
- **Navigation Bar**: Download Center | High-Res PIN Vault | Lifetime Archive

```
6.0 Delivery Center Root (/delivery, /delivery-center)
    ├── 6.1 Download Center (/delivery)
    │   ├── Master Archival Resolution PIN Protected Zip Pack
    │   └── Web & Social Optimized Zip Pack Generator
    │
    ├── 6.2 Museum-Grade Print Store & Delivery Status (/delivery-center)
    │   ├── Fine Art Paper Print Tracking
    │   └── Courier & Lab Dispatch Telemetry
    │
    └── 6.3 Lifetime Cloud Vault (/delivery)
        └── Long-Term Cold Storage & Cloud Backup Status
```
