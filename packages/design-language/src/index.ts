// PhotoMagic Design Language (PDL v1.0) Primary Export Surface

export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/radius';
export * from './tokens/elevation';
export * from './tokens/typography';
export * from './tokens/motion';
export * from './tokens/breakpoints';
export * from './tokens/z-index';

export * from './themes/studio-theme';
export * from './themes/workspace-theme';

export * from './presets/motion-presets';
export * from './presets/typography-presets';

export * from './specs/button-spec';
export * from './specs/card-spec';

import { PDL_COLORS } from './tokens/colors';
import { PDL_SPACING } from './tokens/spacing';
import { PDL_RADIUS } from './tokens/radius';
import { PDL_ELEVATION } from './tokens/elevation';
import { PDL_TYPOGRAPHY } from './tokens/typography';
import { PDL_MOTION } from './tokens/motion';
import { PDL_BREAKPOINTS } from './tokens/breakpoints';
import { PDL_ZINDEX } from './tokens/z-index';

export const PDL_TOKENS = {
  colors: PDL_COLORS,
  spacing: PDL_SPACING,
  radius: PDL_RADIUS,
  elevation: PDL_ELEVATION,
  typography: PDL_TYPOGRAPHY,
  motion: PDL_MOTION,
  breakpoints: PDL_BREAKPOINTS,
  zIndex: PDL_ZINDEX,
} as const;
