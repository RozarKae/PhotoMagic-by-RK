import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { CMS_STORIES, ROUTES } from '@photomagic/config';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

interface StoryDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CMS_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export function generateMetadata({ params }: StoryDetailPageProps): Metadata {
  const story = CMS_STORIES.find((s) => s.slug === params.slug);
  if (!story) return { title: 'Story Not Found | PhotoMagic Studios' };

  return {
    title: `${story.title} | PhotoMagic Studios by RK`,
    description: story.seoDescription || story.minimalContext,
  };
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const story = CMS_STORIES.find((s) => s.slug === params.slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-900 dark:text-purple-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Visual Stories</span>
          </Link>
        </div>

        {/* Story Header */}
        <header className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800/40">
            <span>{story.category}</span>
            <span>•</span>
            <span>{story.year}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-hero text-purple-950 dark:text-purple-50 tracking-tight leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-mono text-purple-800 dark:text-purple-300">
            <MapPin size={13} className="text-rose-500" />
            <span>{story.location}</span>
          </div>

          <p className="text-sm sm:text-base text-purple-900/90 dark:text-purple-200/90 leading-relaxed max-w-2xl font-light mt-2 italic">
            "{story.minimalContext}"
          </p>
        </header>

        {/* Full-bleed Media Story Items */}
        <div className="flex flex-col gap-12 mb-20">
          {story.mediaItems.map((item, idx) => (
            <figure
              key={idx}
              className="flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-museum p-4 sm:p-6"
            >
              <div className="relative rounded-2xl overflow-hidden bg-purple-100 dark:bg-purple-950 aspect-[16/10] w-full">
                <img
                  src={item.url}
                  alt={item.caption || story.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {item.caption && (
                <figcaption className="pt-4 px-2 flex items-center justify-between text-xs text-purple-900/80 dark:text-purple-300/80 font-mono">
                  <span>{item.caption}</span>
                  <span className="text-[10px] text-rose-500 font-bold">
                    0{idx + 1} / 0{story.mediaItems.length}
                  </span>
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {/* In-Context Story Inquiry Callout */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-[#1F0736] text-white text-center flex flex-col items-center gap-4 shadow-museum">
          <div className="inline-flex items-center gap-2 text-gold-400 font-mono text-[10px] uppercase tracking-widest">
            <Sparkles size={13} />
            <span>Inspired by This Chapter?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-hero">
            Inquire for a Similar Experience
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-lg">
            Let us document your celebration or milestone with the same natural intimacy and
            cinematic color palette.
          </p>
          <Link href={`/book?story=${story.slug}`}>
            <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:opacity-95 transition-all flex items-center gap-2">
              <Calendar size={14} />
              <span>Check Your Date Availability</span>
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
