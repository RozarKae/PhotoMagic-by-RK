# Phase C0 – Client Experience Blueprint
**Studio / Product:** PhotoMagic by RK – Photography Client Portal  
**Document Version:** 1.0.0  
**Status:** Approved Product Blueprint (Specification for Implementation)  

---

## Executive Summary

This blueprint defines the complete end-to-end Client Experience for the PhotoMagic by RK client portal. Designed for luxury wedding, event, and portrait photography clients, the portal combines elegant visual aesthetics with high-performance utility. It guides clients through every phase of post-event interaction—from passwordless portal authentication to photo proofing, interactive album design, invoice settlement, and high-resolution download delivery.

---

## 1. Client Journey Overview

### 1.1 End-to-End Client Lifecycle

```
[Phase 1: Onboarding & Auth]
   └── Client receives access link / PIN via SMS & Email
   └── Log in via Magic Link / Access Code
       │
[Phase 2: Event Hub & Dashboard]
   └── Views Event Summary, Countdown, Progress Milestones
   └── Accesses Gallery, Invoices, & Pending Actions
       │
[Phase 3: Gallery Exploration & Selection]
   └── Browses categorized high-res galleries & slideshows
   └── Marks Favorites & selects images for Album inclusion (with Retouch Notes)
   └── Submits locked selection list to studio
       │
[Phase 4: Album Selection & Customization]
   └── Chooses album cover material, size, page count, embossing text
   └── Submits design preferences
       │
[Phase 5: Album Proofing & Revisions]
   └── Interactive spread-by-spread virtual flipbook view
   └── Leaves pin-point comments for retouching / image swaps
   └── Approves final draft with digital sign-off
       │
[Phase 6: Payments & Invoices]
   └── Reviews itemized invoice breakdown (Base package + Album extras)
   └── Pays balance securely via online gateway (Stripe/Razorpay)
       │
[Phase 7: Final Delivery & Downloads]
   └── Unlocks Web-Res & High-Res batch ZIP downloads
   └── Single-click PIN-secured download links
       │
[Phase 8: Post-Delivery & Reviews]
   └── Receives thank-you package & leaves studio review / testimonial
```

### 1.2 Lifecycle Stages & Milestone States

| Stage | Trigger / Condition | Primary Client Goal | Studio Automated Action |
| :--- | :--- | :--- | :--- |
| **1. Portal Access** | Shoot completed & photos ingested | Access private studio portal | Send welcome SMS + Email with Magic Link |
| **2. Selection Phase** | Preview gallery published | Select photos for Album & Retouch | Enforce max selection caps; auto-save drafts |
| **3. Album Customization** | Photo selection locked | Select cover options & album size | Lock selection; notify studio layout artist |
| **4. Proofing Phase** | Album draft layout uploaded | Review spreads and submit feedback | Track revision count (e.g. Round 1 of 2) |
| **5. Financial Settlement** | Proof approved by client | Pay final balance / add-ons | Generate invoice; enable download locks |
| **6. Final Delivery** | Invoice fully settled | Download High-Res & Web-Res ZIPs | Generate watermarked & unwatermarked archives |
| **7. Archive & Review** | 30 days post-delivery | Rate experience & share feedback | Schedule cloud archive & send review prompt |

---

## 2. Login Experience

### Screen 2.1: Client Portal Authentication (`/client/login`)

#### Purpose
Provide a secure, frictionless, and branded gateway for clients and guest visitors to access private event galleries without complex password setup.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  [ BRAND HERO BACKGROUND - SLIDESHOW OF CLIENT'S HIGHLIGHT PHOTOS ]  |
|                                                                       |
|                     +---------------------------+                     |
|                     |     PHOTOMAGIC BY RK      |                     |
|                     |     Client Portal         |                     |
|                     |                           |                     |
|                     |  [ Magic Link ]  [ PIN ]  |                     |
|                     |                           |                     |
|                     |  Enter Mobile or Email:   |                     |
|                     |  [______________________] |                     |
|                     |                           |                     |
|                     |  [ Send Access Link  -> ] |                     |
|                     |                           |                     |
|                     |  - OR -                   |                     |
|                     |  Enter Event PIN:         |                     |
|                     |  [ _ _ _ _ _ _ ]          |                     |
|                     |                           |                     |
|                     |  [ Access Gallery    -> ] |                     |
|                     +---------------------------+                     |
|                                                                       |
|  Protected by PhotoMagic Security • Support Contact: support@rk.com    |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Single point of entry for clients (couple/primary buyer) and guest pass holders.
* **Key Actions:**
  * Request passwordless Magic Link via Email or WhatsApp/SMS.
  * Enter 6-digit Event Access Code / PIN for instant guest access.
  * Auto-login via tokenized URL (e.g., `portal.photomagicbyrk.com/access?token=xyz123`).
  * Remember me toggle for persistent 30-day session cookies.
* **Information Displayed:**
  * Studio branding logo & background hero image showcase.
  * Event title context (if tokenized link used: e.g., "Welcome, Ananya & Vikram").
  * Clear security indicator (Encrypted Private Gallery).
  * Contact help link for client support.
* **Navigation:**
  * Successful auth -> Directs to Client Dashboard (`/client/dashboard`) or linked direct event gallery (`/client/gallery/[eventId]`).
  * Expired link -> Prompts to request a fresh access token.
* **Expected User Experience:**
  * Fast < 2-second authentication process.
  * Luxurious visual presentation with smooth dark-mode aesthetics, gold accents, and fluid background fade animations.
  * Clear error notifications for incorrect PIN or unrecognized email addresses.

---

## 3. Dashboard Layout

### Screen 3.1: Client Portal Overview (`/client/dashboard`)

#### Purpose
Serve as the central command hub where the client gets an instant overview of event status, progress milestones, pending tasks, recent uploads, and quick navigation shortcuts.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  PHOTOMAGIC BY RK   [Galleries] [Albums] [Invoices]   (Bell) [Client v]|
+-----------------------------------------------------------------------+
|  HERO HEADER: Ananya & Vikram's Grand Wedding                         |
|  Date: Dec 15, 2025 • Location: Taj Palace, Udaipur                   |
|                                                                       |
|  STATUS TRACKER:                                                      |
|  [✓] Shoot Done ── [✓] Selection ── [●] Album Proof ── [ ] Delivery   |
|                                                                       |
|  +---------------------------+   +---------------------------------+  |
|  | PENDING ACTIONS           |   | RECENT ACTIVITY & UPDATES       |  |
|  |                           |   |                                 |  |
|  | ⚠️ Review Album Proof V1  |   | 📸 120 new retouched images     |  |
|  |   Due in 3 days           |   |    added to "Reception"        |  |
|  |   [ Review Proof Now ]    |   | 💳 Invoice #INV-1042 Paid       |  |
|  |                           |   | 💬 Studio note added by RK      |  |
|  | 📋 Select 100 Photos for  |   |                                 |  |
|  |    Main Album (65/100)    |   |                                 |  |
|  |   [ Continue Selection ]  |   |                                 |  |
|  +---------------------------+   +---------------------------------+  |
|                                                                       |
|  QUICK ACCESS TILES:                                                  |
|  +-----------------+  +-----------------+  +---------------------+  |
|  | 🖼️ Main Gallery  |  | 📖 Album Proof  |  | 💳 Invoices & Pay   |  |
|  | 1,240 Photos    |  | Revision 1 of 2 |  | Balance: $1,200     |  |
|  +-----------------+  +-----------------+  +---------------------+  |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Comprehensive dashboard summarizing event status, actionable client tasks, and quick access to core portal modules.
* **Key Actions:**
  * Resume image selection process.
  * Jump directly into active Album Proofing session.
  * View and settle outstanding balance payments.
  * Download event summary or client timeline PDF.
  * Quick-launch gallery slideshow.
* **Information Displayed:**
  * Event Cover Photo & Headline (Event Name, Date, Venue).
  * Interactive Milestone Tracker (Shooting, RAW Upload, Client Selection, Layout Proofing, Printing, Final Delivery).
  * Pending Action Cards with deadline badges (e.g. "Selection due by Nov 30").
  * Recent activity feed (studio uploads, status changes, comments).
  * Summary widgets: Total Photos, Selected Count, Unpaid Balance, Album Approval Status.
* **Navigation:**
  * Header nav links to Gallery, Albums, Invoices, Notifications, and Account Settings.
  * Action cards link directly to relevant target routes.
* **Expected User Experience:**
  * Clear hierarchy ensuring the client immediately knows their *next step*.
  * Progress ring visuals and badge indicators highlighting pending responsibilities without overwhelming the client.

---

## 4. Gallery Experience

### Screen 4.1: Multi-Subgallery View (`/client/gallery/[eventId]`)

#### Purpose
Present event photography in a high-impact, organized grid, allowing clients to switch between sub-events (e.g., Sangeet, Ceremony, Reception), filter images, and run full-screen slideshows.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  < Back to Dashboard   Ananya & Vikram's Gallery   [Slideshow] [Share]|
+-----------------------------------------------------------------------+
|  SUB-GALLERIES:                                                       |
|  [ All (1,240) ]  [ Haldi (210) ]  [ Sangeet (450) ]  [ Wedding (580) ]|
|                                                                       |
|  FILTERS: [ Selected (65) ] [ Favorites (40) ] [ Sort: Time v ] [Grid]|
|-----------------------------------------------------------------------|
|  +--------------+  +--------------+  +--------------+  +------------+ |
|  | [IMG_01]     |  | [IMG_02]     |  | [IMG_03]     |  | [IMG_04]   | |
|  |              |  |              |  |              |  |            | |
|  | (♥) (✓) (💬) |  | (♥) (✓) (💬) |  | (♥) (✓) (💬) |  | (♥)(✓)(💬) | |
|  +--------------+  +--------------+  +--------------+  +------------+ |
|  +--------------+  +--------------+  +--------------+  +------------+ |
|  | [IMG_05]     |  | [IMG_06]     |  | [IMG_07]     |  | [IMG_08]   | |
|  |              |  |              |  |              |  |            | |
|  | (♥) (✓) (💬) |  | (♥) (✓) (💬) |  | (♥) (✓) (💬) |  | (♥)(✓)(💬) | |
|  +--------------+  +--------------+  +--------------+  +------------+ |
|                                                                       |
|  [ Load More Photos (Showing 24 of 1,240) - Scroll for Infinite Loading ]
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Primary viewing interface for browsing thousands of event photos smoothly across categorized sub-galleries.
* **Key Actions:**
  * Filter by Sub-gallery tab (e.g., Mehendi, Cocktail, Reception).
  * Toggle viewing mode: Masonry, Justified Grid, or Large Cards.
  * Quick-action overlay buttons on thumbnails: Favorite (Heart), Add to Album Selection (Checkmark), Add Comment (Bubble).
  * Bulk action bar trigger (Select All visible, Clear Selection, Batch Download).
  * Launch ambient ambient background audio Slideshow mode.
* **Information Displayed:**
  * Sub-gallery counts (e.g., "Sangeet (450)").
  * Filter tags (All, Favorites, Album Selections, Retouched).
  * Photo metadata overlay on hover (Image Code/Filename, resolution, selection indicator).
  * Studio subtle watermark (if configured for pre-settlement phase).
* **Navigation:**
  * Clicking any photo thumbnail opens the Full-Screen Photo Viewer Lightbox.
  * Sub-gallery tabs dynamically update browser URL anchor without full page reload.
* **Expected User Experience:**
  * Virtualized infinite scrolling with lazy-loaded low-res placeholders transitioning seamlessly into sharp previews.
  * Zero lag when filtering or switching sub-galleries.

---

## 5. Full-Screen Photo Viewer

### Screen 5.1: High-Res Lightbox (`/client/gallery/[eventId]/photo/[photoId]`)

#### Purpose
Provide a immersive full-screen viewing experience for close inspection, image-by-image evaluation, detailed comments, side-by-side comparison, and direct selection.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
| (X Close)   IMG_0482.CR3   [100% Zoom] [Compare]  (♥ Fav) (✓ Album)   |
+-----------------------------------------------------------------------+
|                                                                       |
|  [< Prev]                                                   [Next >]  |
|                                                                       |
|                       +-----------------------+                       |
|                       |                       |                       |
|                       |   HIGH-RES PHOTO      |                       |
|                       |   DISPLAY AREA        |                       |
|                       |                       |                       |
|                       +-----------------------+                       |
|                                                                       |
|-----------------------------------------------------------------------|
|  SIDE PANEL (Collapsible):                                            |
|  - Retouch Comment: "Please remove glare on Vikram's glasses."        |
|  - EXIF Data: ISO 400 • 85mm • f/1.8 • 1/500s                         |
|  - Tags: #BrideSolo #Portrait #Haldi                                  |
|  - [ Save Comment ]                                                   |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Distraction-free inspection lightbox with professional review capabilities.
* **Key Actions:**
  * Keyboard navigation (Left/Right arrows for next/prev, Escape to exit, F for Favorite, A for Album select).
  * Pinch-to-zoom / 100% pixel inspection toggle.
  * Side-by-side comparison mode (compare two similar candidate photos side-by-side).
  * Per-image comment entry (e.g., specific retouching requests like "remove background exit sign").
  * Download single photo (if permitted by permission tier).
* **Information Displayed:**
  * File name, date/time captured, sub-gallery association.
  * Optional EXIF panel (ISO, lens, aperture, shutter speed).
  * Selection state icons (Heart for personal favorites, Star for Album list).
  * Threaded comment history between Client and Photographer.
* **Navigation:**
  * Carousel loop through current sub-gallery scope.
  * Close button returns client to grid view with scroll position preserved.
* **Expected User Experience:**
  * High-speed webp/avif preview rendering.
  * Smooth slide/fade transitions between photos.
  * Touch swipe gestures for mobile viewers.

---

## 6. Photo Selection & Favorites

### Screen 6.1: Selection & Favorites Manager (`/client/selection`)

#### Purpose
Empower clients to review, curate, organize, count, and lock down their final selection of photos for custom album print production and specialized retouching.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  < Back to Gallery      ALBUM PHOTO SELECTION TOOL                    |
+-----------------------------------------------------------------------+
|  SELECTION COUNTER:                                                   |
|  Progress: [=======================>........] 75 / 100 Selected       |
|  Status: Draft (Auto-saved)                      [ Lock & Submit ]    |
|                                                                       |
|  FILTER: [ All Selected (75) ] [ Needs Retouch (12) ] [ By Event v ]  |
|-----------------------------------------------------------------------|
|  SELECTED PHOTOS GRID:                                                |
|  +---------------+  +---------------+  +---------------+              |
|  | IMG_0102.JPG  |  | IMG_0482.JPG  |  | IMG_0991.JPG  |              |
|  | Priority: Cover  | Note: Retouch   | Note: None    |              |
|  | [ Remove ]    |  | [ Edit Note ] |  | [ Remove ]    |              |
|  +---------------+  +---------------+  +---------------+              |
|                                                                       |
|  SUBMISSION CONFIRMATION MODAL (On click Lock):                       |
|  +-----------------------------------------------------------------+  |
|  | Confirm Final Selection Submission                              |  |
|  | You have selected 100 of 100 photos.                              |  |
|  | Once submitted, your selection will be locked for album layout. |  |
|  | [ Cancel ]                            [ Confirm & Lock Selection] |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Curated workbench for finalizing the exact image list that goes into the printed photo album.
* **Key Actions:**
  * Drag-and-drop ordering or prioritization (e.g. mark photos as "Album Cover Candidate", "Full Spread Candidate").
  * Attach specific edit/retouch instructions to individual selected photos.
  * Remove or replace selected images.
  * Click "Lock & Submit Selection" to notify the studio team.
* **Information Displayed:**
  * Real-time progress bar indicating current count vs. max quota (e.g., "75 / 100 selected").
  * Warning flags for over-selection or under-selection.
  * Summary view of all photos grouped by event section.
  * Lock status indicator ("Draft - Open for edits" vs "Submitted - Locked").
* **Navigation:**
  * Direct links back to Gallery to browse for replacement photos.
  * Proceeds to Album Customization Workflow (`/client/album-customization`) upon locking selection.
* **Expected User Experience:**
  * Reassuring auto-save indicator every time a photo is selected/deselected.
  * Modal confirmation before final submission to prevent accidental locking.

---

## 7. Album Selection Workflow

### Screen 7.1: Album Options & Customization (`/client/album-customization`)

#### Purpose
Guide the client through selecting physical specifications for their bespoke wedding album—including cover material, size, color palette, box options, and cover cover title engraving text.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  ALBUM CUSTOMIZATION STUDIO                                           |
+-----------------------------------------------------------------------+
|  STEP 1: SELECT ALBUM SIZE                                            |
|  ( ) 12" x 12" Square    (*) 12" x 18" Horizontal (Recommended)      |
|                                                                       |
|  STEP 2: COVER MATERIAL                                               |
|  (*) Italian Leather     ( ) Premium Linen     ( ) Acrylic Glass      |
|  Color Palette:  [ (■ Black)  (*■ Royal Tan)  (■ Tuscan Brown) ]       |
|                                                                       |
|  STEP 3: COVER EMBOSSING TEXT                                         |
|  Line 1 (Names): [ Ananya & Vikram                           ]        |
|  Line 2 (Date):  [ December 15th, 2025                       ]        |
|  Foil Color:     (*) Gold Foil    ( ) Silver Foil    ( ) Blind Emboss |
|                                                                       |
|  STEP 4: COMPLIMENTARY PARENT ALBUMS                                  |
|  [x] Include 2x Parent Replica Albums (8" x 12") (+$350)              |
|                                                                       |
|  SUMMARY:                                                             |
|  Total Album Package Value: Included in Royal Package                 |
|  Add-ons: Parent Albums (+$350)                                       |
|                                                                       |
|  [ Back to Selections ]                [ Save & Confirm Specs  -> ]   |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Interactive configurator for selecting high-end physical photo album materials and typography details.
* **Key Actions:**
  * Interactive selection of album size, orientations, cover materials, and colors.
  * Real-time visual swatch preview of selected leather/linen textures and foil options.
  * Input cover text with live font embossing preview.
  * Optional add-on toggles (e.g. Parent duplicate albums, handcrafted wooden presentation case).
  * Save choices and submit specs to designer.
* **Information Displayed:**
  * Dynamic price calculator (displays included options vs upgrade add-on costs).
  * High-resolution photographic swatches of genuine materials.
  * Character limit count and preview for cover embossing.
* **Navigation:**
  * Preceded by Photo Selection Lock (`/client/selection`).
  * Leads to Album Proofing Notification state or Dashboard pending design approval (`/client/albums/[albumId]/proof`).
* **Expected User Experience:**
  * Luxury e-commerce configurator feel with realistic material texture renders.
  * Clear transparent pricing for upgrades with no hidden surprises.

---

## 8. Album Proof & Revision Flow

### Screen 8.1: Interactive Album Proof Viewer (`/client/albums/[albumId]/proof`)

#### Purpose
Allow clients to flip through virtual draft spreads of their photo album design, pin point-and-click comments on specific photos or pages, request revisions, and digitally sign off on final print approval.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  ALBUM PROOFING HUB - Spread 04 of 24 (Pages 8-9)   [ Revision Rd 1 ] |
+-----------------------------------------------------------------------+
|  [ < Prev Spread ]                                   [ Next Spread > ]|
|                                                                       |
|  +---------------------------------+-------------------------------+  |
|  |  LEFT PAGE                      |  RIGHT PAGE                   |  |
|  |  +------------+  +------------+ |  +--------------------------+ |  |
|  |  |            |  |  [Pin #1]  | |  |                          | |  |
|  |  |  Photo A   |  |  Photo B   | |  |   Full Spread Hero       | |  |
|  |  |            |  |            | |  |                          | |  |
|  |  +------------+  +------------+ |  +--------------------------+ |  |
|  +---------------------------------+-------------------------------+  |
|                                                                       |
|-----------------------------------------------------------------------|
|  REVISION FEEDBACK PANEL:                                             |
|  📍 Pin #1 (Photo B): "Please swap Photo B with IMG_0842 from Haldi"  |
|  [ Add New Comment Pin ]                                              |
|                                                                       |
|  ACTIONS:                                                             |
|  [ Request Revisions (1 Feedback Pin) ]     [ Approve Album For Print ]|
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Virtual flipbook reviewer with collaborative feedback pins for seamless layout revisions.
* **Key Actions:**
  * Flip through double-page spreads using interactive virtual page-turn animation.
  * Click anywhere on a photo layout to drop a numbered Feedback Pin.
  * Write precise feedback notes linked to dropped pins (e.g. "Swap this image", "Make black and white").
  * Submit full feedback batch for studio designer revision.
  * Click "Approve Album For Print" with digital signature modal.
* **Information Displayed:**
  * Current Spread number & page count (e.g. Spread 4 of 25).
  * Active revision cycle counter (e.g., "Round 1 of 2 included revisions").
  * History log of past comments and studio responses.
  * Status indicator: `Draft Pending Review`, `Revisions Submitted`, `Ready for Print Approval`, `Approved & Sent to Press`.
* **Navigation:**
  * Accessible from Dashboard alert or email notification link.
  * Approval locks proofing module and triggers Invoice/Final Balance phase (`/client/invoices`).
* **Expected User Experience:**
  * Fluid spread transitions mimicking a physical coffee table album.
  * Intuitive point-and-click comment dropping eliminating long messy email chains.

---

## 9. Payments & Invoices

### Screen 9.1: Invoice & Payment Portal (`/client/invoices`)

#### Purpose
Provide a transparent, itemized view of all project financial transactions, deposit history, album upgrades, tax breakdowns, and integrated online gateway payment triggers.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  INVOICES & FINANCIAL SUMMARY                                         |
+-----------------------------------------------------------------------+
|  STATEMENT SUMMARY:                                                   |
|  Total Contract Value: $5,000.00                                      |
|  Payments Received:    $3,000.00                                      |
|  Remaining Balance:    $2,000.00 (Due on Album Approval)              |
|-----------------------------------------------------------------------|
|  INVOICE #INV-2025-0892                                               |
|  Status: UNPAID (Due Now)                      [ Download PDF ]       |
|                                                                       |
|  Item Description                                    Qty       Amount |
|  -------------------------------------------------------------------  |
|  1. Royal Wedding Photography Package (Base)          1     $4,000.00 |
|  2. Additional Retouched Photos (10x)                10       $200.00 |
|  3. Parent Replica Albums (Set of 2)                  1       $800.00 |
|  -------------------------------------------------------------------  |
|  Subtotal:                                                  $5,000.00 |
|  Less Booking Deposit Paid (Oct 10, 2025):                 -$3,000.00 |
|  TOTAL DUE NOW:                                             $2,000.00 |
|                                                                       |
|  PAYMENT METHOD:                                                      |
|  (*) Credit / Debit Card (Stripe)      ( ) UPI / Net Banking          |
|                                                                       |
|  [ Pay $2,000.00 Securely Now  -> ]                                   |
|  🔒 256-Bit Bank-Grade SSL Encryption                                 |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Centralized accounting hub for viewing invoices, payment schedules, receipts, and executing online balance payments.
* **Key Actions:**
  * Settle pending invoices using integrated gateways (Stripe, Razorpay, Credit Card, UPI, Net Banking).
  * Download official tax invoices and payment receipts in PDF format.
  * View payment installment history and scheduled future milestone dates.
* **Information Displayed:**
  * Contract baseline price + itemized add-ons breakdown.
  * Payment ledger (Date, Transaction ID, Payment Method, Amount Paid).
  * Outstanding balance due date and overdue warnings.
  * Download locks status notification (e.g. "Full High-Res downloads unlock immediately upon balance settlement").
* **Navigation:**
  * Accessible via Top Nav or direct alert links when an invoice is issued.
  * Successful payment updates status instantly and redirects to Downloads page (`/client/downloads`).
* **Expected User Experience:**
  * Seamless inline checkout without redirecting away from branded studio experience.
  * Instant receipt generation and real-time dashboard status update.

---

## 10. Downloads

### Screen 10.1: Media Delivery & Downloads (`/client/downloads`)

#### Purpose
Deliver final edited photos and digital assets to the client with flexible download resolutions, batch archive generation, and PIN protection.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  DIGITAL DOWNLOAD CENTER - Ananya & Vikram's Collection               |
+-----------------------------------------------------------------------+
|  STATUS: 🔓 FULL ACCESS UNLOCKED                                      |
|  Download Storage Expiry: Dec 15, 2026 (365 days remaining)           |
|-----------------------------------------------------------------------|
|  FULL EVENT ARCHIVE DOWNLOAD:                                         |
|  +-----------------------------------------------------------------+  |
|  | 📦 High-Resolution Print Archive (Full Event - 1,240 Photos, 12GB)|  |
|  |    Best for printing, canvas prints, and physical enlargements. |  |
|  |    [ Download Full High-Res ZIP (Part 1 - 6GB) ]                |  |
|  |    [ Download Full High-Res ZIP (Part 2 - 6GB) ]                |  |
|  +-----------------------------------------------------------------+  |
|  +-----------------------------------------------------------------+  |
|  | 📲 Web-Optimized Social Archive (Full Event - 1,240 Photos, 1.2GB)|  |
|  |    Optimized for Instagram, Facebook, and fast mobile sharing.  |  |
|  |    [ Download Web-Res ZIP (1.2GB) ]                             |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  SUB-GALLERY DIRECT DOWNLOADS:                                        |
|  - Haldi Collection (210 Photos) ........ [ High-Res ]  [ Web-Res ]   |
|  - Sangeet Collection (450 Photos) ...... [ High-Res ]  [ Web-Res ]   |
|  - Wedding Collection (580 Photos) ...... [ High-Res ]  [ Web-Res ]   |
|  - Selected Favorites (40 Photos) ....... [ High-Res ]  [ Web-Res ]   |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Secure download center for acquiring original high-resolution master files and web-ready copies.
* **Key Actions:**
  * Single-click full event ZIP downloads (automatically split into manageable 5GB chunks if needed).
  * Sub-gallery specific ZIP download triggers.
  * Selection-only ZIP downloads (e.g. download only favorited or album photos).
  * Require Download Security PIN input for guest users.
* **Information Displayed:**
  * Clear description of High-Res (original print resolution 300DPI) vs Web-Res (2048px 72DPI web ready).
  * File size indicators and archive generation progress bars.
  * Archive expiration countdown timer (e.g., "Gallery active until Dec 2026").
  * Usage rights summary ("Personal Print & Display License granted").
* **Navigation:**
  * Direct access from top navigation bar and post-payment confirmation screen.
* **Expected User Experience:**
  * Fast cloud-backed CDN download delivery speeds.
  * Background archive generation so the client can leave their email and be notified when large ZIPs are ready.

---

## 11. Notifications

### Screen 11.1: Client Notification Hub & Settings (`/client/notifications`)

#### Purpose
Keep clients informed of crucial project updates, studio comments, proof ready alerts, and payment receipts while allowing them to customize communication channels.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  NOTIFICATION CENTER                                                  |
+-----------------------------------------------------------------------+
|  UNREAD NOTIFICATIONS (2)                       [ Mark All as Read ]  |
|-----------------------------------------------------------------------|
|  🔴 [ Album Proof ]  Studio uploaded Album Layout Draft V2            |
|      Yesterday at 4:30 PM • [ View Proof ]                            |
|                                                                       |
|  🔴 [ Payment ]      Payment received for Invoice #INV-1042           |
|      Nov 12 at 10:15 AM • [ View Receipt ]                            |
|                                                                       |
|  ⚪ [ Gallery ]      120 new retouched images added to "Reception"    |
|      Nov 08 at 2:00 PM • [ View Gallery ]                             |
|-----------------------------------------------------------------------|
|  COMMUNICATION PREFERENCES:                                           |
|  Receive updates via:                                                 |
|  [x] Email Notifications (ananya@example.com)                         |
|  [x] WhatsApp / SMS Alerts (+91 98765-43210)                          |
|                                                                       |
|  Notify me when:                                                      |
|  [x] Album proof revisions are ready                                  |
|  [x] New photos are uploaded                                          |
|  [x] Invoice payment due dates approach                               |
|                                                                       |
|  [ Save Preferences ]                                                 |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Notification feed and notification preferences console.
* **Key Actions:**
  * Click notification item to jump directly to target workflow step (e.g. proof page or invoice).
  * Mark individual or all notifications as read.
  * Toggle notification preferences (Email vs WhatsApp/SMS).
* **Information Displayed:**
  * Chronological activity feed categorized by badges (`Gallery`, `Proofing`, `Payment`, `Studio Note`).
  * Time stamps and read/unread visual indicators.
* **Navigation:**
  * Accessible from Bell Icon in the header menu.
* **Expected User Experience:**
  * Real-time notification badge updates using WebSockets/Server-Sent Events.
  * Non-intrusive toast popups when the client is actively browsing the portal.

---

## 12. Support & Contact

### Screen 12.1: Studio Support & Direct Help (`/client/support`)

#### Purpose
Provide clients with a direct line of communication with RK and the studio management team for help, custom requests, or technical support.

#### ASCII Layout Mockup
```
+-----------------------------------------------------------------------+
|  STUDIO SUPPORT & CONTACT                                             |
+-----------------------------------------------------------------------+
|  NEED HELP OR HAVE SPECIAL REQUESTS?                                  |
|                                                                       |
|  +---------------------------------+  +----------------------------+  |
|  | DIRECT MESSAGING WITH RK        |  | STUDIO CONTACT DETAILS     |  |
|  |                                 |  |                            |  |
|  | Message Topic:                  |  | 📞 Phone / WhatsApp:       |  |
|  | [ Album Layout Question       v]|  |    +91 98765-XXXXX         |  |
|  |                                 |  | ✉️ Email:                  |  |
|  | Message Details:                |  |    hello@photomagicbyrk.com|  |
|  | [ Write message here...       ] |  | 📍 Studio Address:         |  |
|  | [                             ] |  |    RK Photography Studio   |  |
|  |                                 |  |    Jubilee Hills, Hyd      |  |
|  | [ Send Message to Studio -> ]   |  | 🕒 Hours: Mon-Sat 10am-7pm|  |
|  +---------------------------------+  +----------------------------+  |
|                                                                       |
|  FREQUENTLY ASKED QUESTIONS (FAQ):                                    |
|  [+] How many photos can I select for my album?                       |
|  [+] What is the turn-around time for album revisions?                |
|  [+] How long will my online gallery stay active?                     |
+-----------------------------------------------------------------------+
```

#### Detailed Specifications

* **Purpose:** Help center and direct client-to-studio messaging interface.
* **Key Actions:**
  * Send direct inquiry or retouch request message to studio team.
  * Attach reference files or screenshots.
  * Click-to-call or click-to-WhatsApp direct contact links.
  * Expand/collapse FAQ items.
* **Information Displayed:**
  * Studio business contact info, address, operating hours.
  * Assigned Project Manager / Lead Photographer contact card.
  * Interactive FAQ accordion.
* **Navigation:**
  * Accessible from primary header nav or footer support link.
* **Expected User Experience:**
  * Instant automated confirmation message upon sending a support inquiry.
  * Helpful self-service FAQ section answering common proofing and download questions.

---

## 13. Mobile Experience

### 13.1 Mobile Architecture & Responsive Adaptations

The mobile experience (`viewports < 768px`) is built as a touch-first, app-like web experience with Progressive Web App (PWA) capabilities.

```
+------------------------------------+
|  [=]  PHOTOMAGIC BY RK     (Bell)  |
+------------------------------------+
|  Ananya & Vikram's Sangeet         |
|  [ Sub-Galleries v ]  [ Filters v ]|
|------------------------------------|
|  +------------+   +------------+   |
|  |  IMG_01    |   |  IMG_02    |   |
|  | (♥) (✓)    |   | (♥) (✓)    |   |
|  +------------+   +------------+   |
|  +------------+   +------------+   |
|  |  IMG_03    |   |  IMG_04    |   |
|  | (♥) (✓)    |   | (♥) (✓)    |   |
|  +------------+   +------------+   |
|------------------------------------|
|  FIXED BOTTOM NAVIGATION BAR:      |
|  [ 🏠 Home ] [ 🖼️ Gallery ] [ 📖 Album ] [ 💳 Pay ] |
+------------------------------------+
```

### 13.2 Mobile-Specific UX Adaptations

1. **Fixed Bottom Navigation Bar:** Quick thumb-zone access to core screens: `Dashboard`, `Gallery`, `Album Proof`, `Invoices`.
2. **Gesture-Driven Lightbox:** Swiping left/right changes photos; double-tap zooms to fit; swipe down closes lightbox.
3. **Optimized Touch Targets:** All selection hearts, checkmarks, and buttons have a minimum touch target area of 44x44px.
4. **Offline Favorites Caching:** Favorited thumbnails are cached locally on device storage via Service Workers for offline viewing on mobile devices.
5. **Mobile Quick-Share Sheet:** Native Web Share API integration allowing clients to share individual photos directly to Instagram/WhatsApp from the lightbox.

---

## 14. Permissions Matrix

The portal enforces strict role-based authorization to ensure privacy while allowing clients to share galleries with family and guest attendees.

| Feature / Action | Primary Client (Couple) | Family / VIP Guest | Public / Event Guest | Studio Admin / RK |
| :--- | :---: | :---: | :---: | :---: |
| **View Published Galleries** | ✅ Full | ✅ Full | ✅ Allowed | ✅ Full |
| **Favorite Photos** | ✅ Private List | ✅ Private List | ❌ Disabled | ✅ View All |
| **Select Album Photos & Lock** | ✅ Full Control | ❌ View Only | ❌ Disabled | ✅ Manage & Override |
| **Customize Album Options** | ✅ Full Control | ❌ Disabled | ❌ Disabled | ✅ Full Control |
| **Comment on Album Proofs** | ✅ Full Control | 💬 Allowed if Shared | ❌ Disabled | ✅ Full Control |
| **Approve Final Album Design** | ✅ Exclusive | ❌ Disabled | ❌ Disabled | ✅ Override |
| **View Invoices & Pay** | ✅ Full Access | ❌ Disabled | ❌ Disabled | ✅ Full Control |
| **Download Web-Res Photos** | ✅ Unlimited | ✅ If PIN Provided | ❌ Disabled | ✅ Unlimited |
| **Download High-Res Master ZIPs**| ✅ Unlocked post-payment | ❌ Disabled | ❌ Disabled | ✅ Unlimited |
| **Manage Access PINs & Invites**| ✅ Can Invite Family | ❌ Disabled | ❌ Disabled | ✅ Full Admin Control |

---

## 15. Navigation Structure & Sitemap

### 15.1 Information Architecture Sitemap

```
Client Portal Root (/)
 ├── 🔑 Login & Access Gateway (/client/login)
 │    └── Magic Link Request & PIN Entry
 │
 ├── 📊 Client Dashboard (/client/dashboard)
 │    ├── Progress Milestone Bar
 │    ├── Pending Action Cards
 │    └── Recent Activity Log
 │
 ├── 🖼️ Gallery Workspace (/client/gallery/[eventId])
 │    ├── Category Sub-galleries (/client/gallery/[eventId]?sub=haldi)
 │    ├── Filtered Views (Favorites, Selections)
 │    └── 🔍 Lightbox Photo Inspector (/client/gallery/[eventId]/photo/[photoId])
 │
 ├── 🎯 Photo Selection Manager (/client/selection)
 │    └── Quota Tracker & Selection Locking
 │
 ├── 🎨 Album Configurator (/client/album-customization)
 │    └── Materials, Embossing & Cover Specs
 │
 ├── 📖 Album Proofing Viewer (/client/albums/[albumId]/proof)
 │    ├── Virtual Spread Flipbook
 │    ├── Pin-point Comment Feedback
 │    └── Final Design Approval
 │
 ├── 💳 Payments & Invoices (/client/invoices)
 │    ├── Invoice Ledger & Breakdown
 │    ├── Online Payment Gateway (Stripe/Razorpay)
 │    └── PDF Receipt Download
 │
 ├── 📥 Media Download Center (/client/downloads)
 │    ├── High-Res Print ZIP Archives
 │    └── Web-Res Social Media ZIP Archives
 │
 ├── 🔔 Notifications (/client/notifications)
 └── 💬 Studio Support (/client/support)
```

### 15.2 URL Route Matrix

| Route Path | Page Name | Auth Requirement | Primary Component |
| :--- | :--- | :--- | :--- |
| `/client/login` | Portal Login | Public | Login Form / PIN Validator |
| `/client/dashboard` | Client Dashboard | Client Session | Overview Dashboard Hub |
| `/client/gallery/[eventId]` | Event Gallery | Token / PIN / Session | Grid Viewer & Sub-gallery Tabs |
| `/client/gallery/[eventId]/photo/[photoId]` | Photo Lightbox | Token / PIN / Session | Full-screen Inspector & EXIF |
| `/client/selection` | Selection Workbench | Primary Client Session | Quota Manager & Retouch Notes |
| `/client/album-customization` | Album Configurator | Primary Client Session | Material & Swatch Picker |
| `/client/albums/[albumId]/proof` | Album Proof Viewer | Primary Client Session | Spread Flipbook & Feedback Pins |
| `/client/invoices` | Financial Hub | Primary Client Session | Invoice Ledger & Payment Gateway |
| `/client/downloads` | Delivery Center | Client Session (Payment Unlocked)| Archive ZIP Downloader |
| `/client/notifications` | Notification Center | Client Session | Activity Feed & Settings |
| `/client/support` | Studio Contact | Client Session | Contact Form & FAQ Accordion |

---

## Conclusion & Next Phase Handoff

This blueprint completes **Phase C0 (Client Experience Blueprint)**. It establishes the complete functional specification, user flow architecture, component requirements, permissions, and layout blueprints for the PhotoMagic by RK client portal. 

All subsequent engineering phases (Frontend Component Building, Backend API Integration, Proofing Engine Implementation, and Payment Gateway Connections) will strictly follow the designs outlined in this guide.
