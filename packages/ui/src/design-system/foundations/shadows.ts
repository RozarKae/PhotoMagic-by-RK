// Luxury Shadow System
export const shadows = {
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  card: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 175, 55, 0.03)',
  floating: '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.05)',
  modal: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.08)',
  dropdown: '0 10px 30px rgba(0, 0, 0, 0.7)',
  image: '0 20px 40px rgba(0, 0, 0, 0.7)',
  hero: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(11, 93, 76, 0.1)',
  luxury: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.05)',
} as const;

export type ShadowsToken = typeof shadows;
