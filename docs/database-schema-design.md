# PhotoMagic Studio OS — Complete Database Schema Design (Phase 0.6)

---

> **Document Status**: Master Database Schema Specification (v1.0)  
> **Role**: Principal Database Architect  
> **Target Database Engine**: PostgreSQL 15+ (Supabase Managed PostgreSQL)  
> **Object Storage Engine**: Cloudflare R2 (DB stores file metadata & presigned keys only)  
> **Multi-Tenant Model**: `workspace_id` Column Isolation + Row Level Security (RLS) + Optional `branch_id`  

---

## 1. Domain Model

PhotoMagic Studio OS is organized into 9 high-cohesion domain aggregates that encapsulate studio management, client proofing, album co-design, billing, and AI processing workflows.

```
+---------------------------------------------------------------------------------------------------+
|                                     PHOTOMAGIC DOMAIN MODEL                                       |
|                                                                                                   |
|  +---------------------------+  +---------------------------+  +-------------------------------+  |
|  |  TENANT & IDENTITY        |  |  CRM & LEAD PIPELINE      |  |  PROJECTS & LOGISTICS         |  |
|  |  - Workspaces / Branches  |  |  - Leads & Activities     |  |  - Projects & Bookings        |  |
|  |  - User Profiles & RBAC   |  |  - Packages & Custom Addon|  |  - Schedules & Venue Briefs   |  |
|  +---------------------------+  +---------------------------+  +-------------------------------+  |
|                                                                                                   |
|  +---------------------------+  +---------------------------+  +-------------------------------+  |
|  |  GALLERY & MEDIA ASSETS   |  |  ALBUM PRODUCTION         |  |  PAYMENTS & FINANCIALS        |  |
|  |  - Galleries & Photos     |  |  - Albums & Spreads       |  |  - Invoices & Line Items      |  |
|  |  - Selections & Favorites |  |  - Visual Pin Comments    |  |  - Payment Transactions       |  |
|  +---------------------------+  +---------------------------+  +-------------------------------+  |
|                                                                                                   |
|  +---------------------------+  +---------------------------+  +-------------------------------+  |
|  |  NOTIFICATIONS & TELEMETRY|  |  ANALYTICS & METRICS      |  |  AI INTELLIGENCE              |  |
|  |  - Multi-Channel Alerts   |  |  - Studio Revenue & NPS   |  |  - AI Culling Jobs            |  |
|  |  - Audit Trail Logs       |  |  - Gallery Views & Likes  |  |  - Visual Embeddings (Vector) |  |
|  +---------------------------+  +---------------------------+  +-------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Complete Table Inventory

| # | Table Name | Domain Module | Primary Key | Soft Delete | Description |
|:---|:---|:---|:---|:---:|:---|
| 1 | `workspaces` | Tenant & Identity | `UUID` | Yes | Top-level studio workspace entity (SaaS Tenant). |
| 2 | `branches` | Tenant & Identity | `UUID` | Yes | Physical studio branch locations under a workspace. |
| 3 | `user_profiles` | Tenant & Identity | `UUID` | No | Extended user account data mapped 1:1 to `auth.users`. |
| 4 | `workspace_members` | Tenant & Identity | `UUID` | No | Membership junction linking users to workspaces with roles. |
| 5 | `leads` | CRM Pipeline | `UUID` | Yes | Prospective client inquiries and deals. |
| 6 | `lead_activities` | CRM Pipeline | `UUID` | No | Activity history log (calls, notes, emails) per lead. |
| 7 | `packages` | CRM Pipeline | `UUID` | Yes | Standard photography/videography service packages. |
| 8 | `package_addons` | CRM Pipeline | `UUID` | Yes | Optional add-on items (drone, extra album, extra hours). |
| 9 | `projects` | Projects & Logistics | `UUID` | Yes | Core event/shoot project container linking client to services. |
| 10 | `shoot_schedules` | Projects & Logistics | `UUID` | Yes | Event timeline slots and staff assignments. |
| 11 | `venues` | Projects & Logistics | `UUID` | No | Location details, maps, and logistics for a shoot. |
| 12 | `contracts` | Projects & Logistics | `UUID` | Yes | E-signature legal agreements and terms. |
| 13 | `galleries` | Gallery & Media | `UUID` | Yes | Proofing media collection for an event. |
| 14 | `photos` | Gallery & Media | `UUID` | Yes | Individual image asset metadata stored in Cloudflare R2. |
| 15 | `photo_selections` | Gallery & Media | `UUID` | No | Client proofing likes, favorites, and selection state. |
| 16 | `albums` | Album Production | `UUID` | Yes | Physical photo album project metadata. |
| 17 | `album_spreads` | Album Production | `UUID` | Yes | Double-page spread layout records. |
| 18 | `album_comments` | Album Production | `UUID` | No | Visual coordinate pin feedback on album spreads. |
| 19 | `invoices` | Payments & Financials| `UUID` | Yes | Financial billing statements. |
| 20 | `invoice_items` | Payments & Financials| `UUID` | No | Line item details per invoice. |
| 21 | `payments` | Payments & Financials| `UUID` | No | Razorpay/Stripe financial transaction records. |
| 22 | `notifications` | Notifications | `UUID` | No | In-app and push notification queues. |
| 23 | `audit_logs` | System Telemetry | `UUID` | No | Immutable audit log of all critical database operations. |
| 24 | `ai_culling_jobs` | AI Intelligence | `UUID` | No | Tracking smart culling and visual ranking jobs. |
| 25 | `photo_embeddings` | AI Intelligence | `UUID` | No | `pgvector` visual embeddings for semantic AI search. |

---

## 3. Table Responsibilities & Key Schema Specifications

### 3.1 Tenant & Identity Domain

#### Table: `workspaces`
- **Responsibility**: Represents a studio business subscriber. Root tenant isolation boundary.
- **Columns**:
  - `id` (`UUID`, PK, Default `gen_random_uuid()`)
  - `name` (`VARCHAR(255)`, NOT NULL)
  - `slug` (`VARCHAR(100)`, UNIQUE, NOT NULL)
  - `custom_domain` (`VARCHAR(255)`, UNIQUE, NULLABLE)
  - `logo_r2_key` (`TEXT`, NULLABLE)
  - `currency` (`VARCHAR(3)`, NOT NULL, Default `'USD'`)
  - `time_zone` (`VARCHAR(50)`, NOT NULL, Default `'UTC'`)
  - `billing_plan` (`VARCHAR(50)`, NOT NULL, Default `'starter'`)
  - Standard base columns (`created_at`, `updated_at`, `deleted_at`, `version`)

#### Table: `branches`
- **Responsibility**: Represents physical studio offices or regional branches under a parent workspace.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `name` (`VARCHAR(255)`, NOT NULL)
  - `address_line1` (`TEXT`, NULLABLE)
  - `city` (`VARCHAR(100)`, NULLABLE)
  - `phone` (`VARCHAR(50)`, NULLABLE)
  - Standard base columns

#### Table: `user_profiles`
- **Responsibility**: Stores user profile metadata linked 1:1 to Supabase `auth.users`.
- **Columns**:
  - `id` (`UUID`, PK, Foreign Key -> `auth.users.id`)
  - `email` (`VARCHAR(255)`, UNIQUE, NOT NULL)
  - `full_name` (`VARCHAR(255)`, NOT NULL)
  - `phone` (`VARCHAR(50)`, NULLABLE)
  - `avatar_r2_key` (`TEXT`, NULLABLE)
  - Standard base columns

#### Table: `workspace_members`
- **Responsibility**: Junction table for user roles and permissions within specific workspaces and optional branches.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `user_id` (`UUID`, FK -> `user_profiles.id`, NOT NULL)
  - `branch_id` (`UUID`, FK -> `branches.id`, NULLABLE)
  - `role` (`VARCHAR(50)`, NOT NULL, Default `'client'`)
  - Standard base columns

---

### 3.2 CRM & Pipeline Domain

#### Table: `leads`
- **Responsibility**: Manages client inquiries, contact details, and sales pipeline stages.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `branch_id` (`UUID`, FK -> `branches.id`, NULLABLE)
  - `client_name` (`VARCHAR(255)`, NOT NULL)
  - `email` (`VARCHAR(255)`, NOT NULL)
  - `phone` (`VARCHAR(50)`, NULLABLE)
  - `event_type` (`VARCHAR(100)`, NOT NULL)
  - `event_date` (`DATE`, NULLABLE)
  - `estimated_budget` (`NUMERIC(12,2)`, NULLABLE)
  - `status` (`lead_status_enum`, NOT NULL, Default `'new'`)
  - Standard base columns

---

### 3.3 Projects & Logistics Domain

#### Table: `projects`
- **Responsibility**: Core event shoot container linking client, logistics, gallery, and billing.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `branch_id` (`UUID`, FK -> `branches.id`, NULLABLE)
  - `lead_id` (`UUID`, FK -> `leads.id`, NULLABLE)
  - `client_id` (`UUID`, FK -> `user_profiles.id`, NOT NULL)
  - `title` (`VARCHAR(255)`, NOT NULL)
  - `event_date` (`DATE`, NOT NULL)
  - `status` (`project_status_enum`, NOT NULL, Default `'confirmed'`)
  - Standard base columns

---

### 3.4 Gallery & Media Domain

#### Table: `galleries`
- **Responsibility**: Proofing gallery container holding photo collections for client selection.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `project_id` (`UUID`, FK -> `projects.id`, NOT NULL)
  - `title` (`VARCHAR(255)`, NOT NULL)
  - `access_pin` (`VARCHAR(10)`, NULLABLE)
  - `selection_limit` (`INTEGER`, NOT NULL, Default 75)
  - `is_selection_locked` (`BOOLEAN`, NOT NULL, Default `FALSE`)
  - `status` (`gallery_status_enum`, NOT NULL, Default `'draft'`)
  - Standard base columns

#### Table: `photos`
- **Responsibility**: Stores metadata, EXIF parameters, and Cloudflare R2 key references for photo assets.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `gallery_id` (`UUID`, FK -> `galleries.id`, NOT NULL)
  - `filename` (`VARCHAR(255)`, NOT NULL)
  - `r2_raw_key` (`TEXT`, NULLABLE)
  - `r2_proof_key` (`TEXT`, NOT NULL)
  - `r2_thumb_key` (`TEXT`, NOT NULL)
  - `blurhash` (`VARCHAR(100)`, NULLABLE)
  - `width` (`INTEGER`, NOT NULL)
  - `height` (`INTEGER`, NOT NULL)
  - `byte_size` (`BIGINT`, NOT NULL)
  - `exif_data` (`JSONB`, NULLABLE)
  - Standard base columns

#### Table: `photo_selections`
- **Responsibility**: Tracks client likes, favorites, and selection state per photo.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `gallery_id` (`UUID`, FK -> `galleries.id`, NOT NULL)
  - `photo_id` (`UUID`, FK -> `photos.id`, NOT NULL)
  - `client_id` (`UUID`, FK -> `user_profiles.id`, NOT NULL)
  - `is_favorite` (`BOOLEAN`, NOT NULL, Default `TRUE`)
  - `rating` (`INTEGER`, CHECK (`rating BETWEEN 1 AND 5`), NULLABLE)
  - `notes` (`TEXT`, NULLABLE)
  - Standard base columns

---

### 3.5 Album Production Domain

#### Table: `albums`
- **Responsibility**: Manages physical photo album project lifecycle.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `gallery_id` (`UUID`, FK -> `galleries.id`, NOT NULL)
  - `title` (`VARCHAR(255)`, NOT NULL)
  - `total_spreads` (`INTEGER`, NOT NULL, Default 15)
  - `status` (`album_status_enum`, NOT NULL, Default `'draft'`)
  - Standard base columns

#### Table: `album_spreads`
- **Responsibility**: Represents an individual double-page album layout spread.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `album_id` (`UUID`, FK -> `albums.id`, NOT NULL)
  - `spread_number` (`INTEGER`, NOT NULL)
  - `preview_r2_key` (`TEXT`, NOT NULL)
  - `layout_json` (`JSONB`, NULLABLE)
  - Standard base columns

#### Table: `album_comments`
- **Responsibility**: Stores precise coordinate visual pin comments on album spreads.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `spread_id` (`UUID`, FK -> `album_spreads.id`, NOT NULL)
  - `author_id` (`UUID`, FK -> `user_profiles.id`, NOT NULL)
  - `pin_x` (`NUMERIC(5,2)`, NOT NULL, CHECK (`pin_x BETWEEN 0 AND 100`))
  - `pin_y` (`NUMERIC(5,2)`, NOT NULL, CHECK (`pin_y BETWEEN 0 AND 100`))
  - `comment_text` (`TEXT`, NOT NULL)
  - `status` (`VARCHAR(20)`, NOT NULL, Default `'open'`)
  - Standard base columns

---

### 3.6 Financials & Payments Domain

#### Table: `invoices`
- **Responsibility**: Billing ledger for project fees, deposits, and add-ons.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `project_id` (`UUID`, FK -> `projects.id`, NOT NULL)
  - `invoice_number` (`VARCHAR(50)`, UNIQUE, NOT NULL)
  - `subtotal` (`NUMERIC(12,2)`, NOT NULL)
  - `tax_amount` (`NUMERIC(12,2)`, NOT NULL, Default 0.00)
  - `total_amount` (`NUMERIC(12,2)`, NOT NULL)
  - `deposit_due` (`NUMERIC(12,2)`, NOT NULL)
  - `due_date` (`DATE`, NOT NULL)
  - `status` (`invoice_status_enum`, NOT NULL, Default `'draft'`)
  - Standard base columns

#### Table: `payments`
- **Responsibility**: Transaction execution logs from payment gateways (Razorpay/Stripe).
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `invoice_id` (`UUID`, FK -> `invoices.id`, NOT NULL)
  - `gateway` (`VARCHAR(50)`, NOT NULL)
  - `transaction_ref` (`VARCHAR(255)`, NOT NULL)
  - `amount` (`NUMERIC(12,2)`, NOT NULL)
  - `status` (`payment_status_enum`, NOT NULL, Default `'success'`)
  - Standard base columns

---

### 3.7 AI Intelligence Domain

#### Table: `photo_embeddings`
- **Responsibility**: Stores visual vectors for AI facial recognition and semantic image search using `pgvector`.
- **Columns**:
  - `id` (`UUID`, PK)
  - `workspace_id` (`UUID`, FK -> `workspaces.id`, NOT NULL)
  - `photo_id` (`UUID`, FK -> `photos.id`, NOT NULL)
  - `embedding` (`vector(1536)`, NOT NULL)
  - `quality_score` (`NUMERIC(3,2)`, NULLABLE)
  - `detected_faces` (`JSONB`, NULLABLE)
  - Standard base columns

---

## 4. Enum Definitions

```sql
-- Lead Sales Pipeline Status
CREATE TYPE lead_status_enum AS ENUM (
  'new', 'contacted', 'consultation_booked', 'quote_sent', 'won', 'lost'
);

-- Project Lifecycle Status
CREATE TYPE project_status_enum AS ENUM (
  'draft', 'confirmed', 'in_production', 'proofing', 'completed', 'archived'
);

-- Proofing Gallery Status
CREATE TYPE gallery_status_enum AS ENUM (
  'draft', 'uploading', 'proofing_active', 'selection_locked', 'delivered'
);

-- Album Proofing Status
CREATE TYPE album_status_enum AS ENUM (
  'draft', 'client_review', 'revisions_requested', 'approved', 'sent_to_print'
);

-- Billing & Invoice Status
CREATE TYPE invoice_status_enum AS ENUM (
  'draft', 'issued', 'partially_paid', 'paid', 'overdue', 'cancelled'
);

-- Payment Gateway Status
CREATE TYPE payment_status_enum AS ENUM (
  'pending', 'success', 'failed', 'refunded'
);
```

---

## 5. Foreign Key Mapping

```
workspaces(id)
  ├── branches(workspace_id)
  ├── workspace_members(workspace_id)
  ├── leads(workspace_id)
  ├── projects(workspace_id)
  │     ├── contracts(project_id)
  │     ├── shoot_schedules(project_id)
  │     ├── galleries(project_id)
  │     │     ├── photos(gallery_id)
  │     │     │     ├── photo_selections(photo_id)
  │     │     │     └── photo_embeddings(photo_id)
  │     │     └── albums(gallery_id)
  │     │           └── album_spreads(album_id)
  │     │                 └── album_comments(spread_id)
  │     └── invoices(project_id)
  │           ├── invoice_items(invoice_id)
  │           └── payments(invoice_id)
  └── audit_logs(workspace_id)
```

---

## 6. Indexing & Query Optimization Strategy

| Table Name | Index Syntax / Type | Target Query Pattern |
|:---|:---|:---|
| `photos` | `B-Tree (gallery_id, deleted_at)` | Fast rendering of gallery proof grid. |
| `photo_selections` | `Composite B-Tree (gallery_id, client_id, is_favorite)` | Real-time calculation of client favorite count. |
| `photos` | `GIN (exif_data)` | JSON metadata filtering (focal length, camera model). |
| `photo_embeddings` | `HNSW (embedding vector_cosine_ops)` | High-performance AI visual similarity search. |
| `projects` | `B-Tree (workspace_id, event_date)` | Monthly shoot schedule calendar rendering. |

---

## 7. Storage Metadata & Cloudflare R2 Integration

- **Rule**: Binary media files (JPEGs, RAWs, MP4s, PDFs) are **NEVER** stored directly inside PostgreSQL byte arrays.
- **R2 Mapping Contract**:
  - `photos.r2_raw_key`: `workspaces/{workspace_id}/raw/{photo_id}.cr3`
  - `photos.r2_proof_key`: `workspaces/{workspace_id}/proofs/{photo_id}.webp`
  - `photos.r2_thumb_key`: `workspaces/{workspace_id}/thumbs/{photo_id}.webp`
- **BlurHash Inline Placeholder**: `photos.blurhash` stores tiny 20-character strings rendered client-side before image binary downloads complete.

---

## 8. Multi-Branch & SaaS Tenant Readiness

- **Tenant Isolation**: Guaranteed via `workspace_id` filtering enforced at database level via Row Level Security (RLS).
- **Branch Isolation**: Optional `branch_id` filtering enables larger multi-location studios to restrict staff visibility to specific regional offices without code changes.

---

## Summary & Next Steps

This **Complete Database Schema Design** provides the definitive specification for PhotoMagic Studio OS v1.0 data architecture. All upcoming migration definitions, typed backend queries, and serverless actions must conform to these table structures, data types, and aggregate boundaries.
