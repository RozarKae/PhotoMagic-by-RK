import { colors } from '../foundations/colors';
import { typography } from '../foundations/typography';
import { spacing } from '../foundations/spacing';
import { radius } from '../foundations/radius';
import { shadows } from '../foundations/shadows';
import { motion } from '../foundations/motion';
import { breakpoints } from '../foundations/breakpoints';
import { opacity } from '../foundations/opacity';
import { zIndex } from '../foundations/z-index';
import { gradients } from '../foundations/gradients';

export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
  breakpoints,
  opacity,
  zIndex,
  gradients,
} as const;

export type DesignTokens = typeof designTokens;
