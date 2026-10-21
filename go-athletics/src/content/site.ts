/**
 * Business details shown on the site. Values come from the approved design
 * reference; update them here and every section, link and form follows.
 */
export const SITE = {
  brand: 'GO Athletics',
  legalName: 'Game Changer Athletics',
  tagline: 'Train. Develop. Perform.',
  description:
    'Game Changer Athletics provides comprehensive athletic development, sports training, recovery and mental preparation for athletes of all levels.',
  phone: { display: '(203) 283-1045', href: 'tel:+12032831045' },
  email: { display: 'info@gamechangersct.com', href: 'mailto:info@gamechangersct.com' },
  address: {
    line1: '551 Anderson Avenue, Unit B',
    line2: 'Milford, CT',
    mapsQuery: '551 Anderson Avenue Unit B, Milford, CT',
  },
  hours: 'By Appointment Only',
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapsQuery)}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(SITE.address.mapsQuery)}&output=embed`;

export interface SocialLink {
  name: 'Facebook' | 'Instagram' | 'YouTube';
  href: string;
}

/** Only verified https URLs from NEXT_PUBLIC_SOCIAL_* env vars (see .env.example) are rendered. */
export const SOCIAL_LINKS: SocialLink[] = (
  [
    { name: 'Facebook', href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? '' },
    { name: 'Instagram', href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? '' },
    { name: 'YouTube', href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? '' },
  ] satisfies SocialLink[]
).filter((link) => /^https:\/\//.test(link.href));
