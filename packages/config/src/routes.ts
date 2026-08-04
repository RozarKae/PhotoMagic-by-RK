export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    PORTFOLIO: '/portfolio',
    INVESTMENT: '/packages',
    EXPERIENCE: '/about',
    BOOKING: '/book',
    CONTACT: '/contact',
  },
  CLIENT: {
    DASHBOARD: '/portal',
    TIMELINE: '/portal/timeline',
    GALLERY: '/portal/gallery',
    COMPARE: '/portal/compare',
    ALBUM: '/portal/album',
    CONTRACTS: '/portal/contracts',
    PAYMENTS: '/portal/payments',
    DOWNLOADS: '/portal/downloads',
  },
  ADMIN: {
    COMMAND: '/admin',
    LEADS: '/admin/leads',
    PROJECTS: '/admin/projects',
    CALENDAR: '/admin/calendar',
    PRODUCTION: '/admin/production',
    GALLERIES: '/admin/galleries',
    ALBUMS: '/admin/albums',
    CRM: '/admin/crm',
    FINANCIALS: '/admin/financials',
    SETTINGS: '/admin/settings',
  },
  API: {
    V1: {
      AUTH_MAGIC_LINK: '/api/v1/auth/magic-link',
      GALLERY_PHOTOS: (galleryId: string) => `/api/v1/galleries/${galleryId}/photos`,
      PRESIGNED_UPLOAD: '/api/v1/storage/upload-url',
      RAZORPAY_WEBHOOK: '/api/v1/webhooks/razorpay',
    },
  },
} as const;

export type Routes = typeof ROUTES;
