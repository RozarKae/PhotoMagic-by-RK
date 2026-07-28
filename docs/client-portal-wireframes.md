# Phase C2 – Client Portal Wireframes & UX Design
**Studio / Product:** PhotoMagic by RK – Photography Client Portal  
**Document Version:** 1.0.0  
**Status:** Approved Wireframe & UX Design Specification  

---

## Executive Summary

This document defines the wireframes, spatial layout structures, component hierarchies, state handling specifications (Empty, Loading, Error), and responsive adaptations for all 10 core screens of the PhotoMagic by RK Client Portal. It bridges the gap between high-level information architecture (Phase C1) and full frontend component development.

---

## 1. Login Screen (`/client/login`)

### 1.1 Screen Purpose
Secure, passwordless gateway for clients and guest attendees to authenticate via Magic Link, SMS/WhatsApp OTP, or 6-digit Event Access PIN.

### 1.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  [ BACKGROUND: Full-screen ambient dark slideshow of RK photos ]     |
|                                                                       |
|                     +---------------------------+                     |
|                     |     PHOTOMAGIC BY RK      | (Brand Header)      |
|                     |     Client Portal Access  |                     |
|                     +---------------------------+                     |
|                     |  [ Magic Link ]  [ PIN ]  | (Tab Selector)      |
|                     +---------------------------+                     |
|                     |                           |                     |
|                     |  Enter Email or Mobile:   |                     |
|                     |  [______________________] | (Input Field)       |
|                     |                           |                     |
|                     |  [ Send Access Link  -> ] | (Primary Button)    |
|                     |                           |                     |
|                     |  --- OR ---               |                     |
|                     |                           |                     |
|                     |  Enter Event Access PIN:  |                     |
|                     |  [ _ ] [ _ ] [ _ ] [ _ ]  | (OTP Input Boxes)   |
|                     |                           |                     |
|                     |  [ Access Gallery    -> ] | (Secondary Button)  |
|                     +---------------------------+                     |
|                     | 🔒 256-Bit Encrypted      | (Security Footer)   |
|                     +---------------------------+                     |
|                                                                       |
|  Need Help? Contact Studio: support@photomagicbyrk.com                |
+-----------------------------------------------------------------------+
```

### 1.3 Component List
* `AuthCard`: Glassmorphic container (`backdrop-blur-md`, dark gold border).
* `BrandLogo`: High-resolution vector studio mark.
* `TabGroup`: Auth mode switcher (Magic Link vs Event PIN).
* `InputGroup`: Floating label text input for email/phone.
* `PinInput`: 6-box auto-advancing numeric pin entry component.
* `ActionButton`: Full-width gold gradient CTA button with loading spinner state.
* `SecurityBadge`: SSL encryption icon with text caption.

### 1.4 Navigation
* **Entry:** Direct link, SMS/Email link, bookmarked URL.
* **Exit:** Redirects to `/client/dashboard` (Client Auth) or `/client/gallery/[eventId]` (Guest PIN Auth).

### 1.5 User Actions
* Switch between Magic Link and PIN tabs.
* Enter email/phone number and click "Send Access Link".
* Type 6-digit numeric PIN with auto-focus movement.
* Click support email link.

### 1.6 Responsive Adaptations
* **Mobile (< 768px):** Centered card fills 90% screen width; full-screen background overlay switches to static ambient dark gradient to save memory.
* **Desktop (>= 1024px):** Split-screen layout—Left 60% features a high-res auto-playing ambient hero slideshow; Right 40% features the dark glassmorphic auth panel.

### 1.7 UI States

#### Empty State
* Fresh form with empty input field, placeholder text `"name@example.com or +91 98765 43210"`, disabled submit button until valid input regex match.

#### Loading State
```
+-------------------------------------------+
|  [ Send Access Link... (Spinner) ]        |  <- Button disabled, pulse effect
+-------------------------------------------+
```
* Button text changes to "Sending Link...", displays inline gold spinner, input disabled.

#### Error State
```
+-------------------------------------------+
| ⚠️ We couldn't find an event linked to   |  <- Red toast notification alert
|    this phone number. Please check or PIN |
+-------------------------------------------+
```
* Red alert banner slides down inside AuthCard; input border turns `var(--color-error-red)`.

---

## 2. Dashboard Screen (`/client/dashboard`)

### 2.1 Screen Purpose
Central command hub presenting event status, progress milestone steps, urgent pending tasks (selections, proof approvals, payments), and recent activity updates.

### 2.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  PHOTOMAGIC BY RK   [Galleries] [Albums] [Invoices]   (Bell) [Client v]|
+-----------------------------------------------------------------------+
|  BANNER: Ananya & Vikram's Grand Wedding                              |
|  Dec 15, 2025 • Taj Palace, Udaipur                                   |
|                                                                       |
|  MILESTONE TRACKER:                                                   |
|  [✓] Shoot ───── [✓] Selection ───── [●] Proofing ───── [ ] Delivery  |
|                                                                       |
|  +---------------------------------+  +----------------------------+  |
|  | PENDING ACTIONS (2)             |  | RECENT STUDIO ACTIVITY     |  |
|  |                                 |  |                            |  |
|  | ⚠️ Album Proof Draft V2 Ready   |  | 📸 120 retouched photos    |  |
|  |   Review spreads by Nov 30      |  |    added to "Reception"    |  |
|  |   [ Review Proof Now -> ]       |  | 💳 Invoice #1042 Paid      |  |
|  |                                 |  | 💬 Note from Photographer  |  |
|  | 📋 Photo Selection (65/100)     |  |    "Check spread 4 edit"   |  |
|  |   [ Resume Selection -> ]       |  |                            |  |
|  +---------------------------------+  +----------------------------+  |
|                                                                       |
|  QUICK ACCESS MODULES:                                                |
|  +------------------+  +------------------+  +---------------------+  |
|  | 🖼️ Main Gallery   |  | 📖 Album Proof   |  | 💳 Invoices & Pay   |  |
|  | 1,240 Photos     |  | Round 1 of 2     |  | Balance: $1,200     |  |
|  +------------------+  +------------------+  +---------------------+  |
+-----------------------------------------------------------------------+
```

### 2.3 Component List
* `HeaderNav`: Sticky top navigation bar with brand mark, routes, notification bell, user avatar menu.
* `EventHeroBanner`: Wide cover photo banner with dark contrast gradient and event meta text.
* `MilestoneStepper`: Horizontal progress bar step tracker with active/completed node states.
* `ActionCard`: High-priority alert callout card with direct action buttons.
* `ActivityFeed`: Chronological activity timeline widget with icons and timestamps.
* `QuickTile`: Metric summary tile with icon, title, count badge, and click target.

### 2.4 Navigation
* **Entry:** Successful login, header logo click.
* **Exit:** Gallery (`/client/gallery/[eventId]`), Selection (`/client/selection`), Proof (`/client/albums/[albumId]/proof`), Invoices (`/client/invoices`).

### 2.5 User Actions
* Click milestone nodes to view phase breakdown.
* Click "Review Proof Now" or "Resume Selection" primary actions.
* Click quick tiles to jump to target modules.

### 2.6 Responsive Adaptations
* **Mobile (< 768px):** Milestone tracker converts to a vertical compact accordion; action cards stack full width; quick tiles convert to a 2x2 grid; fixed bottom navigation bar activates.
* **Desktop (>= 1024px):** 2-column asymmetric layout (65% Left for Actions & Milestones, 35% Right for Activity Feed & Quick Metrics).

### 2.7 UI States

#### Empty State (New Event Created, Photos Pending Ingestion)
```
+-----------------------------------------------------------------------+
|  🎉 Welcome, Ananya & Vikram!                                         |
|  Your event photos are currently being curated and ingested by RK.     |
|  You will receive an SMS alert as soon as the first gallery is ready. |
+-----------------------------------------------------------------------+
```

#### Loading State
* Skeleton shimmer placeholders for banner, 4 milestone nodes, and 2 action cards.

#### Error State
* Banner error alert: `"Unable to sync latest project status. [Retry Sync]"`.

---

## 3. Gallery Screen (`/client/gallery/[eventId]`)

### 3.1 Screen Purpose
Multi-category photo gallery grid allowing users to switch sub-events, filter photos, favorite images, select album photos, and launch slideshows.

### 3.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  < Dashboard   Ananya & Vikram's Wedding    [Slideshow] [Share] [View]|
+-----------------------------------------------------------------------+
|  SUB-GALLERIES:                                                       |
|  [ All (1,240) ] [ Haldi (210) ] [ Sangeet (450) ] [ Wedding (580) ]  |
|                                                                       |
|  FILTER BAR:                                                          |
|  Filters: [ All ] [ Favorites (40) ] [ Selected (65) ]  Sort: [ Date v]|
|-----------------------------------------------------------------------|
|  GRID CANVAS (Masonry / Justified):                                   |
|  +---------------+  +---------------+  +---------------+              |
|  | [IMG_0101]    |  | [IMG_0102]    |  | [IMG_0103]    |              |
|  |               |  |               |  |               |              |
|  | (♥) (✓) (💬)  |  | (♥) (✓) (💬)  |  | (♥) (✓) (💬)  |              |
|  +---------------+  +---------------+  +---------------+              |
|  +---------------+  +---------------+  +---------------+              |
|  | [IMG_0104]    |  | [IMG_0105]    |  | [IMG_0106]    |              |
|  | (♥) (✓) (💬)  |  | (♥) (✓) (💬)  |  | (♥) (✓) (💬)  |              |
|  +---------------+  +---------------+  +---------------+              |
|                                                                       |
|  [ Scroll for Infinite Loading / Showing 30 of 1,240 ]               |
+-----------------------------------------------------------------------+
```

### 3.3 Component List
* `SubGalleryTabs`: Horizontal scrollable pills for category switching.
* `FilterBar`: Dropdown selectors for filtering (Favorites, Selections) and sorting.
* `PhotoGrid`: Virtualized grid supporting Masonry, Justified, and Uniform Cards.
* `PhotoCard`: Individual thumbnail container with hover overlay, action buttons (`Heart`, `Checkmark`, `Comment`), and selection badges.
* `SlideshowTrigger`: Button launching full-screen ambient slideshow player.

### 3.4 Navigation
* **Entry:** Dashboard quick tile, top nav, direct sub-gallery URL.
* **Exit:** Photo Lightbox (`/photo/[photoId]`), Selection Workbench (`/client/selection`).

### 3.5 User Actions
* Click sub-gallery tab to switch event category.
* Click Heart icon on thumbnail to favorite/unfavorite.
* Click Checkmark icon to add/remove from album selection.
* Click thumbnail to launch Lightbox viewer.

### 3.6 Responsive Adaptations
* **Mobile (< 768px):** 2-column justified image grid; filter bar collapses into a "Filter & Sort" floating action button (FAB); horizontal swipe sub-gallery pills.
* **Desktop (>= 1024px):** 4 to 5-column responsive masonry grid; filter toolbar pinned under header.

### 3.7 UI States

#### Empty State (Sub-Gallery Has No Photos)
```
+-----------------------------------------------------------------------+
| 🖼️ No Photos in "Pre-Wedding" Category Yet                            |
| Photos for this sub-event will appear here once uploaded by the studio|
+-----------------------------------------------------------------------+
```

#### Loading State
* Skeleton shimmer grid of rectangular image cards with pulsing gradient backgrounds.

#### Error State
* Inline error banner: `"Failed to load gallery images. [Tap to Reload]"`.

---

## 4. Fullscreen Photo Viewer Screen (`/photo/[photoId]`)

### 4.1 Screen Purpose
High-resolution full-screen inspector lightbox for deep inspection, EXIF evaluation, side-by-side comparison, and direct photo commenting.

### 4.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
| (X Close)   IMG_0482.CR3   [100% Zoom] [Compare]   (♥ Fav) (✓ Select) |
+-----------------------------------------------------------------------+
|                                                                       |
|  [< Prev]                                                   [Next >]  |
|                                                                       |
|                       +-----------------------+                       |
|                       |                       |                       |
|                       |   HIGH-RES PHOTO      |                       |
|                       |   CANVAS AREA         |                       |
|                       |                       |                       |
|                       +-----------------------+                       |
|                                                                       |
|-----------------------------------------------------------------------|
|  COLLAPSIBLE SIDE/BOTTOM PANEL:                                       |
|  💬 Retouch Request: "Please remove glare on Vikram's glasses"        |
|  [ Write retouch note...                     ] [ Save Note ]          |
|  EXIF: ISO 400 • 85mm f/1.8 • 1/500s                                  |
+-----------------------------------------------------------------------+
```

### 4.3 Component List
* `LightboxHeader`: Top toolbar containing filename, zoom controls, compare trigger, favorite/select toggles, and close button.
* `PhotoCanvas`: Centered high-resolution image container supporting pinch-to-zoom and drag-pan.
* `NavArrows`: Left/Right floating overlay arrow navigation buttons.
* `CommentPanel`: Collapsible drawer for viewing and adding image-specific retouch comments.
* `ExifBadge`: Small translucent badge displaying camera metadata.

### 4.4 Navigation
* **Entry:** Thumbnail click in Gallery Grid.
* **Exit:** Returns to Gallery Grid preserving scroll position; Side-by-Side Comparison (`/compare`).

### 4.5 User Actions
* Swipe or press Left/Right keys to navigate images.
* Double-tap or click zoom button for 100% detail inspection.
* Click Heart or Checkmark to toggle Favorite/Selection state.
* Add or edit retouch instructions in comment box.

### 4.6 Responsive Adaptations
* **Mobile (< 768px):** Full-screen image presentation; top header auto-hides after 3 seconds of inactivity; swipe gestures for navigation; bottom sheet for comments.
* **Desktop (>= 1024px):** Fixed top toolbar; right-side collapsible inspection panel (EXIF + Comments + Selection controls).

### 4.7 UI States

#### Empty State (Comment Section Empty)
* Comment panel shows placeholder text: `"No retouch notes for this image yet. Type a note above to request specific edits."`

#### Loading State
* High-res canvas renders progressive blurred micro-thumbnail while full-resolution WebP loads in background with centered gold spinner.

#### Error State
* Canvas shows broken image placeholder with text: `"Failed to load high-resolution photo. [Reload Photo]"`.

---

## 5. Selected Photos Screen (`/client/selection`)

### 5.1 Screen Purpose
Curated workbench where clients organize, add retouch instructions, count, and lock down their final photo selections for album print creation.

### 5.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  < Back to Gallery      ALBUM SELECTION WORKBENCH                     |
+-----------------------------------------------------------------------+
|  SELECTION PROGRESS BAR:                                              |
|  Progress: [=======================>........] 75 / 100 Selected       |
|  Status: Draft (Auto-saved)                      [ Lock & Submit ]    |
|                                                                       |
|  FILTERS: [ All Selected (75) ] [ Has Notes (12) ]  Sort: [ Priority v]|
|-----------------------------------------------------------------------|
|  SELECTED GRID:                                                       |
|  +------------------+  +------------------+  +---------------------+  |
|  | [IMG_0102]       |  | [IMG_0482]       |  | [IMG_0991]          |  |
|  | Priority: Cover  |  | Note: Retouch    |  | Note: None          |  |
|  | [ Edit Note ]    |  | [ Edit Note ]    |  | [ Edit Note ]       |  |
|  | [ Remove ]       |  | [ Remove ]       |  | [ Remove ]          |  |
|  +------------------+  +------------------+  +---------------------+  |
|                                                                       |
|  SUBMISSION CONFIRMATION MODAL (On click Lock):                       |
|  +-----------------------------------------------------------------+  |
|  | Confirm Final Selection Lock                                    |  |
|  | You have selected 100 of 100 quota photos.                       |  |
|  | Once submitted, selections lock and go to the layout designer.  |  |
|  | [ Cancel ]                            [ Confirm & Lock ]        |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### 5.3 Component List
* `QuotaProgressBar`: Visual progress bar showing selected count vs max package quota with state color coding (Green = Exact, Red = Exceeded).
* `SubmitLockBar`: Sticky action header with auto-save badge and primary "Lock & Submit" button.
* `SelectedCard`: Grid tile with priority badge, note preview, note edit button, and remove action button.
* `NoteEditorModal`: Popup modal for writing detailed retouch instructions for a specific photo.
* `LockConfirmModal`: Final confirmation dialog before locking selection state.

### 5.4 Navigation
* **Entry:** Dashboard selection prompt, gallery selection bar button.
* **Exit:** Gallery Grid (to pick more photos), Album Customization (`/client/album-customization`).

### 5.5 User Actions
* Remove unwanted photos from selection list.
* Open note editor to add retouch requests.
* Assign priority tags (e.g. "Cover Candidate", "Full Spread Candidate").
* Click "Lock & Submit Selection" to send list to studio.

### 5.6 Responsive Adaptations
* **Mobile (< 768px):** 2-column selection grid; sticky bottom progress bar with embedded submit button.
* **Desktop (>= 1024px):** 3 or 4-column selection grid; top sticky control header.

### 5.7 UI States

#### Empty State (No Photos Selected Yet)
```
+-----------------------------------------------------------------------+
| 📋 Your Selection List is Empty                                       |
| Browse your event gallery and click the checkmark (✓) icon on photos |
| to add them to your album selection list.                             |
| [ Go to Gallery -> ]                                                  |
+-----------------------------------------------------------------------+
```

#### Loading State
* Skeleton shimmer layout of selection cards and progress bar.

#### Error State
* Over-quota warning state: `"⚠️ You have selected 105 photos, which exceeds your package limit of 100. Please remove 5 photos before locking."`

---

## 6. Album Preview Screen (`/client/albums/[albumId]/proof`)

### 6.1 Screen Purpose
Interactive virtual double-page spread flipbook reviewer enabling clients to inspect draft layouts, drop revision pins, write comments, and approve albums for printing.

### 6.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  ALBUM PROOFING - Spread 04 of 24 (Pages 8-9)     [ Revision Rd 1 ]   |
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
|  📍 Pin #1 (Photo B): "Please swap Photo B with IMG_0842"             |
|  [ Drop New Revision Pin ]                                            |
|                                                                       |
|  ACTIONS:                                                             |
|  [ Submit Revisions (1 Pin) ]             [ Approve Album For Print ] |
+-----------------------------------------------------------------------+
```

### 6.3 Component List
* `ProofHeader`: Spread counter, version badge (V1/V2), and approval CTA.
* `FlipbookCanvas`: Virtual 3D spread rendering engine with realistic page shadows and turn animations.
* `FeedbackPin`: Numbered pin dropped on exact coordinates of a spread layout.
* `RevisionPanel`: List of feedback pins for current spread with text area to write revision details.
* `ApprovalModal`: Digital sign-off dialog with electronic agreement confirmation.

### 6.4 Navigation
* **Entry:** Dashboard proof alert, email notification link.
* **Exit:** Invoices (`/client/invoices`) post-approval, Dashboard (`/client/dashboard`).

### 6.5 User Actions
* Flip through double-page spreads using arrows or page swipe.
* Click anywhere on a spread photo to drop a revision pin.
* Enter revision text associated with pin.
* Click "Submit Revisions" to request studio changes.
* Click "Approve Album For Print" to finalize layout.

### 6.6 Responsive Adaptations
* **Mobile (< 768px):** Displays single page view instead of double-page spread; orientation prompt asking user to rotate device to landscape for full spread view; bottom sheet for revision pins.
* **Desktop (>= 1024px):** Full side-by-side double-page spread presentation; collapsible right-hand feedback drawer.

### 6.7 UI States

#### Empty State (No Revision Pins Dropped Yet)
* Feedback panel displays: `"No revision pins dropped on this spread. Click anywhere on a photo to request a layout or retouch change."`

#### Loading State
* Render high-resolution spread canvas skeleton with central spinner while vector layout assets load.

#### Error State
* Error banner: `"Failed to load album layout proof V2. [Retry Loading]"`.

---

## 7. Payments Screen (`/client/invoices`)

### 7.1 Screen Purpose
Financial summary and invoicing console displaying contract baseline package prices, itemized add-ons, payment schedules, and online payment gateway triggers.

### 7.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  INVOICES & FINANCIAL SUMMARY                                         |
+-----------------------------------------------------------------------+
|  ACCOUNT BALANCE SUMMARY:                                             |
|  Contract Total: $5,000.00 | Paid: $3,000.00 | Due Now: $2,000.00    |
|-----------------------------------------------------------------------|
|  INVOICE #INV-2025-0892                                               |
|  Status: UNPAID (Due Nov 30, 2025)             [ Download PDF ]       |
|                                                                       |
|  Item Description                                    Qty       Amount |
|  -------------------------------------------------------------------  |
|  1. Royal Wedding Photography Package (Base)          1     $4,000.00 |
|  2. Extra Retouched Photos (10x)                      10       $200.00 |
|  3. Parent Replica Albums (Set of 2)                  1       $800.00 |
|  -------------------------------------------------------------------  |
|  Subtotal:                                                  $5,000.00 |
|  Less Booking Deposit Paid (Oct 10, 2025):                 -$3,000.00 |
|  TOTAL REMAINING BALANCE:                                   $2,000.00 |
|                                                                       |
|  PAYMENT METHOD:                                                      |
|  (*) Credit / Debit Card (Stripe)      ( ) UPI / Net Banking          |
|                                                                       |
|  [ Pay $2,000.00 Securely Now  -> ]                                   |
|  🔒 256-Bit SSL Encrypted Payment Gateway                             |
+-----------------------------------------------------------------------+
```

### 7.3 Component List
* `BalanceSummaryBar`: High-level summary metrics (Total, Paid, Outstanding Balance).
* `InvoiceCard`: Detailed ledger container with itemized line items, quantities, subtotal, deposits, and total due.
* `PaymentMethodSelector`: Radio button group for selecting Stripe card checkout or UPI/Net Banking.
* `PayButton`: Primary call to action launching secure payment processing.
* `ReceiptDownloadButton`: Secondary button for generating PDF statements.

### 7.4 Navigation
* **Entry:** Post-album approval trigger, dashboard alert link, top menu.
* **Exit:** Media Downloads (`/client/downloads`) post-payment, Dashboard (`/client/dashboard`).

### 7.5 User Actions
* Select invoice to view breakdown.
* Choose payment gateway option.
* Click "Pay Securely Now" to open payment modal.
* Download PDF invoice statement or past payment receipts.

### 7.6 Responsive Adaptations
* **Mobile (< 768px):** Vertical stacked layout; table line items convert to stacked list cards; sticky bottom CTA bar with "Pay $2,000.00 Now" button.
* **Desktop (>= 1024px):** 2-column layout (65% Left Invoice Itemization, 35% Right Payment Checkout Panel).

### 7.7 UI States

#### Empty State (Fully Paid / Zero Invoices Due)
```
+-----------------------------------------------------------------------+
|  🎉 All Invoices Settled!                                             |
|  Your account balance is $0.00. Thank you for your payment.           |
|  [ Go to Downloads to Access High-Res Photos -> ]                     |
+-----------------------------------------------------------------------+
```

#### Loading State
* Skeleton shimmer blocks for financial metrics and line-item tables.

#### Error State
* Gateway failure alert: `"⚠️ Payment gateway declined transaction. Please check card details or select UPI."`

---

## 8. Downloads Screen (`/client/downloads`)

### 8.1 Screen Purpose
Media delivery hub offering direct single-click downloads for high-resolution print archives, web-optimized social archives, and individual sub-gallery ZIPs.

### 8.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  DIGITAL DOWNLOAD CENTER - Ananya & Vikram's Collection               |
+-----------------------------------------------------------------------+
|  STATUS: 🔓 UNLOCKED FULL ACCESS (Expires in 340 Days)                |
|-----------------------------------------------------------------------|
|  FULL EVENT ARCHIVE DOWNLOADS:                                        |
|  +-----------------------------------------------------------------+  |
|  | 📦 High-Resolution Print Archive (Full Event - 1,240 Photos, 12GB)|  |
|  |    Best for printing, canvas prints, and physical enlargements. |  |
|  |    [ Download High-Res Part 1 (6GB) ]                           |  |
|  |    [ Download High-Res Part 2 (6GB) ]                           |  |
|  +-----------------------------------------------------------------+  |
|  +-----------------------------------------------------------------+  |
|  | 📲 Web-Optimized Social Archive (Full Event - 1,240 Photos, 1.2GB)|  |
|  |    Optimized for Instagram, Facebook, and fast mobile sharing.  |  |
|  |    [ Download Web-Res ZIP (1.2GB) ]                             |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  SUB-GALLERY ZIP DOWNLOADS:                                           |
|  - Haldi Collection (210 Photos) ........ [ High-Res ]  [ Web-Res ]   |
|  - Sangeet Collection (450 Photos) ...... [ High-Res ]  [ Web-Res ]   |
|  - Wedding Collection (580 Photos) ...... [ High-Res ]  [ Web-Res ]   |
+-----------------------------------------------------------------------+
```

### 8.3 Component List
* `StatusBanner`: Lock/Unlock status badge with cloud storage countdown timer.
* `ArchiveCard`: Feature card for full-event ZIP downloads with resolution badges, size indicators, and direct download links.
* `SubGalleryDownloadList`: Rows displaying individual event categories with dual High-Res / Web-Res buttons.
* `ZipProgressModal`: Modal displaying ZIP archive background compilation progress.

### 8.4 Navigation
* **Entry:** Dashboard download tile, post-payment confirmation screen, top nav.
* **Exit:** External browser file download manager, Dashboard (`/client/dashboard`).

### 8.5 User Actions
* Click High-Res or Web-Res ZIP download buttons.
* Trigger individual sub-gallery downloads.
* Copy shareable download PIN for guest users.

### 8.6 Responsive Adaptations
* **Mobile (< 768px):** Recommends Web-Res downloads for mobile viewports with warning prompt before initiating multi-gigabyte High-Res downloads over mobile data.
* **Desktop (>= 1024px):** Displays full high-res multi-part download options with direct parallel speed connections.

### 8.7 UI States

#### Empty State / Lock State (Unsettled Balance)
```
+-----------------------------------------------------------------------+
| 🔒 High-Resolution Downloads Locked                                   |
| Full high-resolution downloads will unlock automatically once your    |
| remaining balance invoice is settled.                                 |
| [ View & Settle Invoice -> ]                                          |
+-----------------------------------------------------------------------+
```

#### Loading State (Preparing ZIP Archive)
```
+-----------------------------------------------------------------------+
| ⏳ Preparing your High-Res ZIP Archive (45%)...                       |
| We are compiling 1,240 photos into a single package. Please wait.     |
+-----------------------------------------------------------------------+
```

#### Error State
* Download error toast: `"⚠️ Download link expired. [Re-generate Download Link]"`.

---

## 9. Notifications Screen (`/client/notifications`)

### 9.1 Screen Purpose
Chronological alert center displaying studio announcements, proof ready notifications, invoice reminders, and communication delivery preferences.

### 9.2 Layout Structure & ASCII Wireframe

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
|  NOTIFICATION PREFERENCES:                                            |
|  [x] Email Alerts (ananya@example.com)                                |
|  [x] WhatsApp / SMS Alerts (+91 98765 43210)                          |
|  [ Save Preferences ]                                                 |
+-----------------------------------------------------------------------+
```

### 9.3 Component List
* `NotificationItem`: List item with category badge, read/unread red indicator, message body, timestamp, and target CTA button.
* `MarkReadButton`: Global action to mark all notifications as read.
* `PreferencesCard`: Checkbox settings panel for toggling Email and WhatsApp alerts.

### 9.4 Navigation
* **Entry:** Header bell icon click.
* **Exit:** Target workflow screens (Proof, Invoices, Gallery) associated with clicked notification.

### 9.5 User Actions
* Click notification row to mark read and jump to target workflow.
* Toggle Email and WhatsApp preference checkboxes.
* Click "Mark All as Read".

### 9.6 Responsive Adaptations
* **Mobile (< 768px):** Full-screen slide-over drawer; compact list rows with touch swipe-to-dismiss.
* **Desktop (>= 1024px):** Popover dropdown menu from header bell icon, with link to full `/client/notifications` page.

### 9.7 UI States

#### Empty State (No Notifications)
```
+-----------------------------------------------------------------------+
| 🔔 No Notifications Yet                                              |
| You are all caught up! Updates from RK Studio will appear here.       |
+-----------------------------------------------------------------------+
```

#### Loading State
* Skeleton shimmer list items with pulsing circular badges.

#### Error State
* Alert banner: `"Failed to fetch notifications. [Retry Connection]"`.

---

## 10. Profile Screen (`/client/profile`)

### 10.1 Screen Purpose
Client account management page displaying personal contact details, event meta information, linked family access PINs, security sessions, and notification settings.

### 10.2 Layout Structure & ASCII Wireframe

```
+-----------------------------------------------------------------------+
|  CLIENT PROFILE & ACCOUNT SETTINGS                                    |
+-----------------------------------------------------------------------+
|  CLIENT INFORMATION:                                                  |
|  Primary Name:    Ananya Sharma & Vikram Verma                        |
|  Email Address:   ananya@example.com             [ Edit ]             |
|  Mobile Number:   +91 98765 43210                [ Edit ]             |
|-----------------------------------------------------------------------|
|  EVENT META:                                                          |
|  Event Title:     Grand Wedding Celebration                           |
|  Event Date:      December 15, 2025                                   |
|  Package Tier:    Royal Diamond Photography & Cinematography          |
|-----------------------------------------------------------------------|
|  GUEST ACCESS MANAGEMENT:                                             |
|  Event Access PIN: [ 8 4 9 2 0 1 ]               [ Regenerate PIN ]   |
|  Guest View Link:  https://portal.photomagicbyrk.com/g/ananya-vikram   |
|                    [ Copy Link ]                                      |
|-----------------------------------------------------------------------|
|  ACTIVE SESSIONS:                                                     |
|  - Safari on iPhone 15 Pro (Current Device) • Active Now              |
|  - Chrome on macOS • Active 2 days ago           [ Revoke Access ]    |
|-----------------------------------------------------------------------|
|  [ Save Changes ]                                  [ Sign Out ]       |
+-----------------------------------------------------------------------+
```

### 10.3 Component List
* `ProfileForm`: Input fields for name, email, phone number.
* `EventMetaCard`: Non-editable summary of contract event details and package tier.
* `GuestAccessCard`: PIN generator and copyable guest link container.
* `SessionList`: List of authenticated devices with single-click revocation buttons.
* `SignOutButton`: Button to log out of current session.

### 10.4 Navigation
* **Entry:** Header user avatar menu.
* **Exit:** Login Screen (`/client/login`) upon sign out, Dashboard (`/client/dashboard`).

### 10.5 User Actions
* Update contact email or phone number.
* Regenerate 6-digit Guest Access PIN.
* Copy shareable guest viewing link.
* Revoke active session cookies on other devices.
* Click "Sign Out".

### 10.6 Responsive Adaptations
* **Mobile (< 768px):** Single-column stacked form cards; sticky bottom "Save Changes" bar.
* **Desktop (>= 1024px):** 2-column settings layout (Left Side Menu Tabs: Profile, Event Info, Security, Sessions).

### 10.7 UI States

#### Empty State (Not Applicable)
* All profile fields populate from active authenticated database session.

#### Loading State
* Skeleton shimmer form lines and card containers.

#### Error State
* Validation alert: `"⚠️ Please enter a valid 10-digit mobile number."`

---

## Conclusion & Implementation Handoff

This document completes **PHASE C2 – CLIENT PORTAL WIREFRAMES & UX DESIGN**. It establishes the explicit layout blueprints, component structures, navigation pathways, mobile/desktop adaptations, and 3-tier state specifications (Empty, Loading, Error) across all 10 core screens.

All subsequent frontend development phases must adhere strictly to the spatial hierarchy and UX requirements documented in this specification.
