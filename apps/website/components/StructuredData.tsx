import React from 'react';

export const StructuredData: React.FC = () => {
  const businessJsonLd = {
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://photomagic.studio',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://photomagic.studio/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Services',
        item: 'https://photomagic.studio/services',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Investment',
        item: 'https://photomagic.studio/packages',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
};
