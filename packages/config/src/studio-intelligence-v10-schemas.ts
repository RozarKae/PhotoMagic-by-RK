import { z } from 'zod';

export const PortfolioPublicationV10Schema = z.object({
  id: z.string().optional(),
  projectId: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(['wedding', 'pre_wedding', 'fashion', 'portrait', 'event']),
  coverImageUrl: z.string().url(),
  gallerySlug: z.string().min(3),
  isFeatured: z.boolean().default(false),
  isHomepageHighlight: z.boolean().default(false),
  publicationStatus: z.enum(['published', 'hidden', 'draft']).default('published'),
  seoMetaTitle: z.string().optional(),
  seoMetaDescription: z.string().optional(),
  totalViews: z.number().default(0),
  publishedAt: z.string().optional(),
});

export const RevenueReportV10Schema = z.object({
  id: z.string().optional(),
  reportPeriod: z.string().min(1),
  totalRevenueInr: z.number().min(0),
  collectedPaymentsInr: z.number().min(0),
  outstandingBalanceInr: z.number().min(0),
  averageProjectValueInr: z.number().min(0),
  topSellingPackage: z.string().min(1),
  totalBookings: z.number().default(0),
  createdAt: z.string().optional(),
});

export const BusinessInsightV10Schema = z.object({
  id: z.string().optional(),
  snapshotDate: z.string().optional(),
  topPerformingService: z.string().min(1),
  peakBookingMonth: z.string().min(1),
  leadConversionRate: z.number().default(68.5),
  referralSuccessRate: z.number().default(42.0),
  clientRetentionRate: z.number().default(88.0),
  avgEditingTurnaroundHrs: z.number().default(36),
  avgAlbumCompletionDays: z.number().default(7),
  storageGrowthGb: z.number().default(120.5),
});

export const FinalExecutiveDashboardV10Schema = z.object({
  todaysOverview: z.object({
    activeShoots: z.number().default(3),
    editingJobsInFlight: z.number().default(12),
    albumsAwaitingSignature: z.number().default(4),
    deliveriesPendingDownload: z.number().default(5),
  }),
  upcomingEventsCount: z.number().default(8),
  revenueThisMonthInr: z.number().default(4850000),
  recentClientsCount: z.number().default(42),
  systemHealthStatus: z.enum(['optimal', 'degraded', 'maintenance']).default('optimal'),
  syncLatencyMs: z.number().default(84),
});

export type PortfolioPublicationV10 = z.infer<typeof PortfolioPublicationV10Schema>;
export type RevenueReportV10 = z.infer<typeof RevenueReportV10Schema>;
export type BusinessInsightV10 = z.infer<typeof BusinessInsightV10Schema>;
export type FinalExecutiveDashboardV10 = z.infer<typeof FinalExecutiveDashboardV10Schema>;
