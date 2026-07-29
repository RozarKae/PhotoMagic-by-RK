import React from 'react';

export const StructuredData: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PhotographyBusiness',
    name: 'PhotoMagic Studio',
    image: 'https://photomagic.studio/assets/hero-showcase.jpg',
    '@id': 'https://photomagic.studio',
    url: 'https://photomagic.studio',
    telephone: '+1-800-555-6244',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '100 Royal Avenue',
      addressLocality: 'Beverly Hills',
      addressRegion: 'CA',
      postalCode: '90210',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0736,
      longitude: -118.4004,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: ['https://instagram.com/photomagicstudio', 'https://facebook.com/photomagicstudio'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
