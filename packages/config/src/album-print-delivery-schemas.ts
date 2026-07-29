import { z } from 'zod';

export const AlbumPrintLabPackageV7Schema = z.object({
  labPreset: z.enum(['whcc', 'graphistudio', 'millers_lab', 'fuji_print_lab']),
  dpiResolution: z.enum(['300', '600']),
  colorSpace: z.enum(['sRGB', 'Adobe RGB', 'CMYK', 'ProPhoto RGB']),
  coverArtworkUrl: z.string().optional(),
  spineArtworkUrl: z.string().optional(),
  instructionsText: z.string().optional(),
});

export const AlbumRevisionHistoryV7Schema = z.object({
  versionNumber: z.number().min(1),
  designerName: z.string().min(1),
  changeSummary: z.string().min(1),
});

export const AlbumDeliveryCertificateV7Schema = z.object({
  certificateCode: z.string().min(6),
  clientName: z.string().min(1),
  archiveStatus: z.enum(['active', 'archived']),
});

export type AlbumPrintLabPackageV7 = z.infer<typeof AlbumPrintLabPackageV7Schema>;
export type AlbumRevisionHistoryV7 = z.infer<typeof AlbumRevisionHistoryV7Schema>;
export type AlbumDeliveryCertificateV7 = z.infer<typeof AlbumDeliveryCertificateV7Schema>;
