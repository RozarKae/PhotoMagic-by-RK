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

### DOMAIN 1: PUBLIC WEBSITE (`apps/website`)

- **Access Permission**: Public / Unauthenticated
- **Primary Navigation Bar**: Home | Portfolio | Services | About | Contact | Client Login

```
1.0 Home (/)
    ├── 1.1 Portfolio Hub (/portfolio)
    │   ├── 1.1.1 Weddings Category (/portfolio/weddings)
    │   ├── 1.1.2 Portraits Category (/portfolio/portraits)
    │   ├── 1.1.3 Events Category (/portfolio/events)
    │   ├── 1.1.4 Commercial Category (/portfolio/commercial)
    │   └── 1.1.5 Real Story Narrative View (/portfolio/[story-slug])
    │
    ├── 1.2 Services & Investment (/services)
    │   ├── 1.2.1 Service Tiers (Essential, Editorial, Heirloom)
    │   ├── 1.2.2 Heirloom Album & Craft Specifications
    │   └── 1.2.3 Service Guarantee & Delivery SLA
    │
    ├── 1.3 About Studio (/about)
    │   ├── 1.3.1 Brand Ethos & Philosophy
    │   └── 1.3.2 Lead Artisans & Team Biographies
    │
    ├── 1.4 Contact & Inquiry (/contact)
    │   ├── 1.4.1 Streamlined 5-Field Inquiry Form
    │   └── 1.4.2 Response SLA & Consultation Scheduling
    │
    └── 1.5 Authentication Gateway (/login)
        └── Directs to Client Portal OR Admin Dashboard based on JWT Role
```

---

### DOMAIN 2: CLIENT PORTAL (`apps/portal`)

- **Access Permission**: Authenticated (Role: `CLIENT`)
- **Primary Navigation Bar**: Overview | My Galleries | Contracts & Invoices | Settings

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

### DOMAIN 3: ADMIN DASHBOARD (`apps/admin`)

- **Access Permission**: Authenticated (Role: `ADMIN`, `LEAD_PHOTOGRAPHER`)
- **Primary Navigation Bar**: Overview | Inquiries | Shoot Calendar | Galleries | Clients | Financials

```
3.0 Admin Dashboard Root (/admin)
    ├── 3.1 Operations Overview (/admin/dashboard)
    │   ├── Active Shoot Pipeline Summary
    │   ├── Delivery SLA Countdown Tracker
    │   └── Revenue & Retainer Metrics
    │
    ├── 3.2 Lead & Inquiry CRM (/admin/leads)
    │   └── 3.2.1 Lead Detail & Consultation Manager (/admin/leads/[lead-id])
    │
    ├── 3.3 Event & Shoot Calendar (/admin/events)
    │   └── 3.3.1 Shoot Manifest & Gear Assignment (/admin/events/[event-id])
    │
    ├── 3.4 Gallery & Asset Management (/admin/galleries)
    │   ├── 3.4.1 Upload & Ingestion Center (/admin/galleries/[id]/upload)
    │   └── 3.4.2 Client Access & Expiry Controls (/admin/galleries/[id]/access)
    │
    ├── 3.5 Client Directory (/admin/clients)
    │   └── 3.5.1 Client History & Portal Privileges (/admin/clients/[client-id])
    │
    └── 3.6 Financials & Contracts (/admin/financials)
        ├── 3.6.1 Contract Builder & E-sign Dispatch
        └── 3.6.2 Invoicing & Revenue Reporting
```

---

### DOMAIN 4: AI STUDIO (`apps/admin/ai`)

- **Access Permission**: Authenticated (Role: `ADMIN`, `RETUCHER`, `LEAD_PHOTOGRAPHER`)
- **Primary Navigation Bar**: AI Hub | Smart Culling | Auto Color Match | Enhancements | Indexing

```
4.0 AI Studio Hub (/studio/ai)
    ├── 4.1 Smart Culling Engine (/studio/ai/culling)
    │   ├── Automated Blurry & Closed-Eye Filtration
    │   └── Duplicate Grouping & Best-Take Recommendation
    │
    ├── 4.2 Signature Color Match (/studio/ai/color-match)
    │   └── Studio Signature Profile Auto-Grading & Lighting Balance
    │
    ├── 4.3 Fine Art Enhancements (/studio/ai/enhancements)
    │   ├── Micro Skin Texture Preservation & Blemish Clean-up
    │   └── Background Element Clean-up & Resolution Upscaling
    │
    └── 4.4 Smart Indexing & Tagging (/studio/ai/indexing)
        └── Facial Recognition & Automated Shot List Tagging
```

---

### DOMAIN 5: ALBUM STUDIO (`apps/portal/album` & `apps/admin/album`)

- **Access Permission**: Authenticated (Shared Role: `CLIENT` + `ADMIN_DESIGNER`)
- **Navigation Bar**: Overview | Layout Editor | Material Selection | Sign-Off

```
5.0 Album Studio Root (/studio/album/[album-id])
    ├── 5.1 Interactive Spread Designer (/studio/album/[album-id]/editor)
    │   ├── Page-by-Page Spread Review & Drag-and-Drop Swap
    │   └── Collaborative Client Commenting & Annotation Thread
    │
    ├── 5.2 Material & Cover Customizer (/studio/album/[album-id]/materials)
    │   ├── Italian Leather, Linen & Velvet Cover Swatch Selector
    │   └── Cover Foil Embossing & Spine Text Preview
    │
    └── 5.3 Final Sign-Off & Production Gateway (/studio/album/[album-id]/signoff)
        └── Digital Signature Sign-Off & Print Lab Dispatch Queue
```

---

### DOMAIN 6: DELIVERY CENTER (`apps/portal/delivery`)

- **Access Permission**: Authenticated (Shared Role: `CLIENT` + `ADMIN`)
- **Navigation Bar**: Download Center | Print Store | Lifetime Vault

```
6.0 Delivery Center Root (/delivery/[delivery-id])
    ├── 6.1 Download Center (/delivery/[delivery-id]/downloads)
    │   ├── Master Archival Resolution Zip Pack Generator
    │   └── Web & Social Optimized Zip Pack Generator
    │
    ├── 6.2 Museum-Grade Print Store (/delivery/[delivery-id]/store)
    │   ├── Fine Art Paper Print Ordering
    │   └── Framed Canvas & Acrylic Wall Art Customizer
    │
    └── 6.3 Lifetime Cloud Vault (/delivery/[delivery-id]/vault)
        └── Long-Term Backup Storage & Multi-Device Sync Status
```
