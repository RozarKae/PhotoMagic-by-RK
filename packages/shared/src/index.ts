export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getOsAppUrl(path = '/'): string {
  const osDomain = process.env.NEXT_PUBLIC_OS_URL || 'http://localhost:3001';
  return `${osDomain.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getStudioWebsiteUrl(path = '/'): string {
  const websiteDomain = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';
  return `${websiteDomain.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export const BRAND = {
  name: 'PhotoMagic Studio',
  osName: 'PhotoMagic OS',
  tagline: 'Luxury Editorial Photography & Studio Operations',
  domain: 'photomagicstudio.com',
  osDomain: 'os.photomagicstudio.com',
};
