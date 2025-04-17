import type { Metadata } from 'next';

const siteConfig = {
  name: 'DSA Cheatsheet',
  description: 'A comprehensive cheatsheet for data structures and algorithms',
  url: 'https://dsa-cheatsheet.yourdomain.com', // Replace with your actual domain
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
      name: 'Your Name', // Replace with your name
      url: 'https://github.com/yourusername', // Replace with your GitHub or personal site
    },
  ],
  creator: 'Your Name', // Replace with your name
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@yourusername', // Replace with your Twitter handle
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL(siteConfig.url),
}; 