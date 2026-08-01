export const gradients = {
  goldGold: 'linear-gradient(135deg, #D4AF37 0%, #E5C158 50%, #B59226 100%)',
  goldGlass: 'linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, rgba(17, 17, 17, 0) 100%)',
  emeraldGlass: 'linear-gradient(180deg, rgba(11, 93, 76, 0.2) 0%, rgba(17, 17, 17, 0) 100%)',
  canvasHero:
    'radial-gradient(ellipse at 50% 0%, rgba(11, 93, 76, 0.08) 0%, transparent 70%), radial-gradient(ellipse at 80% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
  photoOverlay: 'linear-gradient(180deg, rgba(6, 6, 6, 0) 40%, rgba(6, 6, 6, 0.95) 100%)',
} as const;

export type GradientsToken = typeof gradients;
