import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const metadata = {
  title: 'Privacy Policy | PhotoMagic Studio',
  description:
    'Our commitment to data privacy, client confidentiality, and image rights management.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />

      <section className="relative pt-36 pb-16 px-6 max-w-4xl mx-auto">
        <span className="font-nav text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
          Legal & Confidentiality
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white mt-4 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-400 font-light text-sm mt-4">Last Updated: August 1, 2026</p>

        <div className="mt-12 space-y-8 text-gray-300 font-light leading-relaxed border-t border-white/10 pt-8">
          <div>
            <h2 className="font-serif text-xl text-white mb-3">
              1. Client Confidentiality & Image Protection
            </h2>
            <p>
              PhotoMagic Studio respects the absolute privacy of our clients. Images captured during
              private commissions, destination weddings, and executive portraiture are stored
              securely and never published or distributed without explicit written client
              authorization.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-white mb-3">
              2. Information Collection & Usage
            </h2>
            <p>
              We collect personal contact information (names, email addresses, phone numbers, event
              dates, and venue details) exclusively for managing inquiries, bookings, contracts, and
              deliverable notifications. We do not sell or lease personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-white mb-3">3. Encrypted Gallery Storage</h2>
            <p>
              Client proofing galleries and high-resolution deliverables delivered via PhotoMagic OS
              are protected by end-to-end PIN encryption and access controls to ensure authorized
              viewing.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-white mb-3">4. Contact Privacy Concierge</h2>
            <p>
              If you have any questions regarding our privacy practices or wish to request image
              removal, please email{' '}
              <a href="mailto:privacy@photomagicstudio.com" className="text-amber-400 underline">
                privacy@photomagicstudio.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
