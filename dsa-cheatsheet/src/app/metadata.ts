import type { Metadata } from 'next';

const siteConfig = {
  name: 'DSA Cheatsheet',
  description: 'A comprehensive cheatsheet for data structures and algorithms',
  url: 'https://dsacheatsheet.vercel.app',
  ogImage: '/og-image.png',
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'data structures',
    'algorithms',
    'cheatsheet',
    'coding interviews',
    'DSA',
    'technical interview preparation',
    'big-O notation',
    'problem-solving patterns',
  ],
  authors: [
    {
      name: 'Zaid Kamdar', 
      url: 'https://github.com/zkamdar1',
    },
  ],
  creator: 'Zaid Kamdar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'DSA Cheatsheet',
    description: 'Interactive DSA cheatsheet with code examples and diagrams.',
    siteName: 'DSA Cheatsheet',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSA Cheatsheet',
    description: 'Interactive DSA cheatsheet with code examples and diagrams.',
    images: ['https://dsacheatsheet.vercel.app/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://dsacheatsheet.vercel.app/'),
}; 