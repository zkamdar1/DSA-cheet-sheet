/**
 * @type {import('next').NextConfig}
 * 
 * Configuration for Next.js DSA Cheatsheet
 * - Static export (dist/) in production only
 * - Image optimization disabled for static export
 * - Trailing slash configuration based on environment
 */
const nextConfig = {
  // Only use export for production builds, not during development
  ...(process.env.NODE_ENV === 'production' ? { 
    output: 'export',
    distDir: 'dist',
    // Uncomment and customize if deploying to GitHub Pages or a subfolder
    // basePath: '/dsa-cheatsheet',
  } : {}),
  
  // Required for static export
  images: {
    unoptimized: true,
  },
  
  // Remove trailingSlash which can cause routing issues in dev mode
  ...(process.env.NODE_ENV === 'production' ? {
    trailingSlash: true,
  } : {}),
  
  // Add any other config options here
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig; 