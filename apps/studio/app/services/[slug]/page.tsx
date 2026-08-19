import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { CMS_SERVICES, DEFAULT_PACKAGES, CMS_TESTIMONIALS, ROUTES } from '@photomagic/config';
import { Button } from '@photomagic/ui';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Star, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CMS_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: ServiceDetailPageProps): Metadata {
  const service = CMS_SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found | PhotoMagic Studios' };

  return {
    title: `${service.creativeName} (${service.actualName}) | PhotoMagic Studios by RK`,
    description: service.seoDescription || service.description,
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = CMS_SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Linked packages for this service
  const linkedPackages = DEFAULT_PACKAGES.filter((p) => service.packages.includes(p.id));

  // Linked testimonials
  const linkedTestimonials = CMS_TESTIMONIALS.filter((t) => service.testimonials.includes(t.id));

  return (
    <div className="min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-900 dark:text-purple-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Signature Services</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-[#0F0618] text-white p-8 sm:p-16 mb-16 shadow-museum">
          <div className="absolute inset-0 opacity-40">
            <img
              src={service.heroMedia}
              alt={service.creativeName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0618] via-[#0F0618]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-300 font-mono text-[10px] uppercase tracking-widest w-fit">
              <Sparkles size={12} />
              <span>{service.actualName}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-hero tracking-tight leading-tight">
              {service.creativeName}
            </h1>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
              {service.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href={`/book?service=${service.slug}`}>
                <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-95 transition-all flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{service.ctaText}</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Work & Gallery */}
        {service.featuredWork && service.featuredWork.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between border-b border-purple-200/60 dark:border-purple-900/40 pb-4 mb-8">
              <div>
                <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                  Editorial Artifacts
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-hero text-purple-950 dark:text-purple-50 mt-1">
                  Featured Work & Retrospectives
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.featuredWork.map((work, wIdx) => (
                <div
                  key={wIdx}
                  className="rounded-3xl overflow-hidden bg-white dark:bg-[#170C22] border border-purple-200/70 dark:border-purple-800/40 shadow-sm"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                      {work.location}
                    </span>
                    <h3 className="font-hero text-lg font-bold text-purple-950 dark:text-purple-100">
                      {work.title}
                    </h3>
                    <p className="text-xs text-purple-900/80 dark:text-purple-300/80 leading-relaxed">
                      {work.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Linked Collections & Pricing */}
        {linkedPackages.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between border-b border-purple-200/60 dark:border-purple-900/40 pb-4 mb-8">
              <div>
                <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                  Recommended Collections
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-hero text-purple-950 dark:text-purple-50 mt-1">
                  Curated Packages for {service.actualName}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {linkedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                      {pkg.creativeTier}
                    </span>
                    <h3 className="font-hero text-lg font-bold text-purple-950 dark:text-purple-100 mt-1">
                      {pkg.name}
                    </h3>
                    <div className="text-2xl font-extrabold text-purple-900 dark:text-purple-200 font-mono mt-2 mb-3">
                      {pkg.formattedPrice}
                    </div>
                    <p className="text-xs text-purple-800/80 dark:text-purple-300/80 mb-4 leading-relaxed">
                      {pkg.description}
                    </p>

                    <ul className="flex flex-col gap-2 pt-3 border-t border-purple-100 dark:border-purple-900/40 text-xs text-purple-900/90 dark:text-purple-200/90 mb-6">
                      {pkg.components.slice(0, 4).map((comp, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <CheckCircle2
                            size={13}
                            className="text-emerald-500 flex-shrink-0 mt-0.5"
                          />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={`/book?package=${pkg.id}&service=${service.slug}`}>
                    <Button variant="primary" size="sm" className="w-full text-xs">
                      Reserve This Collection
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials for this service */}
        {linkedTestimonials.length > 0 && (
          <section className="mb-20">
            <div className="border-b border-purple-200/60 dark:border-purple-900/40 pb-4 mb-8">
              <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                Client Voices
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-hero text-purple-950 dark:text-purple-50 mt-1">
                Reflections on Our {service.actualName}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {linkedTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col justify-between"
                >
                  <p className="text-xs sm:text-sm text-purple-950 dark:text-purple-100 italic leading-relaxed mb-4">
                    "{t.quote}"
                  </p>
                  <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-950 dark:text-purple-100">
                      {t.clientName}
                    </span>
                    <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400">
                      {t.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-[#1F0736] text-white text-center flex flex-col items-center gap-4 shadow-museum">
          <h2 className="text-2xl sm:text-4xl font-bold font-hero">
            Commission PhotoMagic Studios for {service.actualName}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-lg">
            Available across Tamil Nadu, Pondicherry, Kerala, and all of India.
          </p>
          <Link href={`/book?service=${service.slug}`}>
            <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:opacity-95 transition-all">
              {service.ctaText}
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
