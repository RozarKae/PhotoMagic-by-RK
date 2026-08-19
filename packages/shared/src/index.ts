export function formatCurrency(amount: number, currency = 'INR'): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
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

export function formatRelativeTime(dateString: string): string {
  if (!dateString) return 'recently';
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return formatDate(dateString);
}

export const BRAND = {
  name: 'PhotoMagic Studios by RK',
  shortName: 'PhotoMagic',
  brandLine: 'Moments Through Our Eyes',
  tamilStatement: 'இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே',
  osName: 'PhotoMagic Studio OS',
  tagline: 'Moments Through Our Eyes • Fine Art Photography & Cinema',
  domain: 'batpaiyancatponnu.online/photomagic',
  osDomain: 'os.batpaiyancatponnu.online',
  phone: '7904943234',
  instagram: 'rkae_photgraphs',
};
