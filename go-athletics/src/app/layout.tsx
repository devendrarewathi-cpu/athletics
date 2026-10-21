import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import type { ReactNode } from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SiteProviders } from '@/components/layout/SiteProviders';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/sections.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GO Athletics | Sports Performance Training in Milford, CT',
    template: '%s | GO Athletics',
  },
  description:
    'Personalized athletic development, sports performance training, recovery and mental preparation for athletes of all levels in Milford, CT. Book an assessment with GO Athletics.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'GO Athletics',
    title: 'GO Athletics | Built Different. Train With Purpose.',
    description:
      'Assessment-driven sports performance training, recovery and mental performance coaching in Milford, CT.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'GO Athletics' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <SiteProviders>
          {/* Everything outside the modal portal; ModalShell marks it inert while a dialog is open. */}
          <div id="site-root">
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <AnnouncementBar />
            <Header />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </SiteProviders>
      </body>
    </html>
  );
}
