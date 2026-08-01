import { PDL_TYPOGRAPHY } from '../tokens/typography';

export const PDL_TYPOGRAPHY_PRESETS = {
  heroTitle: {
    fontFamily: PDL_TYPOGRAPHY.fonts.serif,
    ...PDL_TYPOGRAPHY.styles.displayHero,
  },
  sectionTitle: {
    fontFamily: PDL_TYPOGRAPHY.fonts.serif,
    ...PDL_TYPOGRAPHY.styles.display1,
  },
  workspaceHeading: {
    fontFamily: PDL_TYPOGRAPHY.fonts.sans,
    ...PDL_TYPOGRAPHY.styles.heading1,
  },
  dataLabel: {
    fontFamily: PDL_TYPOGRAPHY.fonts.mono,
    ...PDL_TYPOGRAPHY.styles.monoData,
  },
} as const;
