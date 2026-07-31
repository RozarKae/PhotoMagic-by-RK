import { z } from 'zod';

export const ClientNotificationV9Schema = z.object({
  id: z.string().optional(),
  projectId: z.string().min(1),
  clientName: z.string().min(1),
  clientContact: z.string().min(1),
  triggerEvent: z.enum([
    'booking_confirmation',
    'payment_received',
    'gallery_ready',
    'album_ready',
    'revision_requested',
    'album_approved',
    'printing_started',
    'delivery_ready',
    'review_request',
  ]),
  channels: z.array(z.enum(['email', 'sms', 'whatsapp', 'in_app'])).min(1),
  notificationStatus: z.enum(['pending', 'sent', 'delivered', 'failed']).default('delivered'),
  messageBody: z.string().optional(),
  sentAt: z.string().optional(),
});

export const StudioDeadlineV9Schema = z.object({
  id: z.string().optional(),
  projectId: z.string().min(1),
  projectName: z.string().min(1),
  taskName: z.string().min(1),
  assigneeName: z.string().min(1),
  assigneeRole: z
    .enum(['photographer', 'editor', 'album_designer', 'printer', 'delivery_manager'])
    .default('editor'),
  dueDate: z.string(),
  priorityLevel: z.enum(['low', 'medium', 'high', 'urgent']).default('high'),
  status: z
    .enum(['pending', 'in_progress', 'review_needed', 'overdue', 'completed'])
    .default('pending'),
  slaHoursRemaining: z.number().default(48),
  isEscalated: z.boolean().default(false),
  reminderSentCount: z.number().default(0),
  icalSyncToken: z.string().optional(),
});

export const StudioCalendarEventV9Schema = z.object({
  id: z.string().optional(),
  eventTitle: z.string().min(1),
  eventType: z.enum([
    'booking',
    'shoot',
    'editing_schedule',
    'album_deadline',
    'print_schedule',
    'delivery',
    'holiday',
    'staff_availability',
  ]),
  startTime: z.string(),
  endTime: z.string(),
  photographerName: z.string().optional(),
  editorName: z.string().optional(),
  eventStatus: z
    .enum(['scheduled', 'in_progress', 'completed', 'postponed', 'cancelled'])
    .default('scheduled'),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export const WorkflowDashboardMetricsV9Schema = z.object({
  snapshotDate: z.string().optional(),
  activeProjectsCount: z.number().default(0),
  todaysTasksCount: z.number().default(0),
  pendingReviewsCount: z.number().default(0),
  editingQueueCount: z.number().default(0),
  albumQueueCount: z.number().default(0),
  deliveryQueueCount: z.number().default(0),
  revenueSnapshotInr: z.number().default(0),
  upcomingEventsCount: z.number().default(0),
  storageUsageGb: z.number().default(0),
  performanceLatencyMs: z.number().default(120),
});

export type ClientNotificationV9 = z.infer<typeof ClientNotificationV9Schema>;
export type StudioDeadlineV9 = z.infer<typeof StudioDeadlineV9Schema>;
export type StudioCalendarEventV9 = z.infer<typeof StudioCalendarEventV9Schema>;
export type WorkflowDashboardMetricsV9 = z.infer<typeof WorkflowDashboardMetricsV9Schema>;
