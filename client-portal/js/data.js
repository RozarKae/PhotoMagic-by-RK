/* PhotoMagic by RK - Mock Dashboard Data */

export const mockDashboardData = {
  client: {
    name: "Ananya & Vikram",
    avatarInitials: "AV",
    role: "Primary Client",
    email: "ananya@example.com",
    phone: "+91 98765 43210"
  },
  event: {
    id: "evt-udr-2025",
    title: "Grand Wedding Celebration",
    venue: "Taj Lake Palace & Jagmandir, Udaipur",
    date: "December 15, 2025",
    package: "Royal Diamond Photography & Cinematography",
    currentStatus: "Album Proofing Phase",
    statusBadge: "Action Required"
  },
  statistics: {
    totalPhotos: 1240,
    selectedPhotos: 65,
    maxAlbumQuota: 100,
    pendingActions: 2,
    unpaidBalance: "$2,000.00"
  },
  timelineSteps: [
    { id: 1, label: "Booking", status: "completed", date: "Oct 10, 2025" },
    { id: 2, label: "Shoot Completed", status: "completed", date: "Dec 15, 2025" },
    { id: 3, label: "Gallery Uploaded", status: "completed", date: "Jan 05, 2026" },
    { id: 4, label: "Selection Completed", status: "completed", date: "Jan 20, 2026" },
    { id: 5, label: "Editing", status: "completed", date: "Feb 10, 2026" },
    { id: 6, label: "Album Design", status: "active", date: "In Progress" },
    { id: 7, label: "Approval", status: "pending", date: "Est. Mar 05" },
    { id: 8, label: "Delivery", status: "pending", date: "Est. Mar 15" }
  ],
  quickActions: [
    {
      id: "action-gallery",
      title: "Main Gallery",
      description: "Browse 1,240 high-resolution categorized wedding photos.",
      icon: "🖼️",
      badge: "1,240 Photos",
      badgeType: "gold",
      cta: "View Gallery",
      target: "gallery"
    },
    {
      id: "action-selection",
      title: "Selected Photos",
      description: "Review and manage your 65 / 100 chosen album photos.",
      icon: "📋",
      badge: "65 / 100 Chosen",
      badgeType: "warning",
      cta: "Manage Selection",
      target: "selection"
    },
    {
      id: "action-album",
      title: "Album Proof",
      description: "Interactive virtual flipbook layout draft V2 ready for review.",
      icon: "📖",
      badge: "Action Required",
      badgeType: "warning",
      cta: "Review Proof",
      target: "album"
    },
    {
      id: "action-payments",
      title: "Payments & Invoices",
      description: "Review contract breakdown and settle remaining balance.",
      icon: "💳",
      badge: "$2,000 Due",
      badgeType: "info",
      cta: "Pay Invoice",
      target: "payments"
    },
    {
      id: "action-downloads",
      title: "Downloads",
      description: "Access high-resolution print archives and web-ready ZIPs.",
      icon: "📥",
      badge: "Ready",
      badgeType: "success",
      cta: "Access Downloads",
      target: "downloads"
    },
    {
      id: "action-support",
      title: "Studio Support",
      description: "Need help or custom retouching? Contact RK directly.",
      icon: "💬",
      badge: "24/7 Desk",
      badgeType: "gold",
      cta: "Contact Studio",
      target: "support"
    }
  ],
  updates: [
    {
      id: "upd-1",
      title: "Album Layout Draft V2 Uploaded",
      time: "Yesterday at 4:30 PM",
      icon: "📖",
      type: "proof",
      description: "Studio designer updated double-page spreads 4 and 8 based on your retouch comments."
    },
    {
      id: "upd-2",
      title: "Invoice #INV-2025-0892 Generated",
      time: "Feb 22, 2026 at 10:15 AM",
      icon: "💳",
      type: "payment",
      description: "Remaining balance invoice ready for review and secure payment settlement."
    },
    {
      id: "upd-3",
      title: "120 New Retouched Photos Added",
      time: "Feb 18, 2026 at 2:00 PM",
      icon: "📸",
      type: "gallery",
      description: "High-resolution edited portraits added to the Reception category."
    }
  ],
  studioMessage: {
    author: "RK (Radhakrishna)",
    role: "Lead Photographer & Art Director",
    avatarInitials: "RK",
    date: "Feb 24, 2026",
    content: "Hi Ananya & Vikram! We've uploaded Draft V2 of your wedding album layout. Please review spread 4 where we swapped the portrait as requested. Once approved, we will send it directly to our print press in Italy!"
  }
};
