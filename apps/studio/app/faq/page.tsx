'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Container, Card, Badge, Stack } from '@photomagic/ui';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How far in advance should we book our wedding photography?',
      a: 'We recommend reserving your date 9 to 18 months in advance, especially for prime wedding season dates (October through May).',
    },
    {
      q: 'How long does image proofing and final album delivery take?',
      a: 'Online proofing galleries are published within 3 to 4 weeks post-event. Final flush-mount album printing takes 2 to 3 weeks following design approval.',
    },
    {
      q: 'Do you travel internationally for destination weddings?',
      a: 'Yes, our master studio team regularly travels worldwide, including Lake Como, Paris, Udaipur, Monte Carlo, and the Caribbean.',
    },
    {
      q: 'How does the online album proofing portal work?',
      a: 'Clients receive a private access PIN to log into their PhotoMagic Client Portal, where they can favorite photos, leave visual spatial pin notes, and approve page layouts.',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="gold">Common Inquiries</Badge>
            <h1 className="text-4xl font-extrabold text-text-primary mt-2">
              Frequently Asked Questions
            </h1>
          </div>

          <Stack gap={4}>
            {faqs.map((faq, idx) => (
              <Card key={idx} variant="glass" className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </Stack>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
