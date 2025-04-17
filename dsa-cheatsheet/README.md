# DSA Cheatsheet

A comprehensive, interactive cheatsheet for data structures and algorithms, designed for technical interview preparation and learning DSA concepts.

## Features

- **No-scroll UI**: All content is organized in a tab-based, no-scroll interface for quick access
- **Comprehensive Content**: Covers all essential DSA topics including data structures, algorithms, Big-O notation, and problem-solving patterns
- **Interactive**: Command palette (Cmd+K) for quick search, theme toggle, and more
- **Visual Diagrams**: ASCII art diagrams for visual representation of data structures
- **Code Examples**: Python implementations for all data structures and algorithms
- **Dark Mode**: Dark mode by default with light mode toggle

## Tech Stack

- **Framework**: Next.js 15.3.0 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide Icons
- **Search**: cmdk for command palette
- **Theming**: next-themes for dark/light mode
- **Deployment**: Static export for any static hosting (Vercel, Netlify, GitHub Pages)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dsa-cheatsheet.git
   cd dsa-cheatsheet
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The static export will be generated in the `dist` directory.

## Deployment

This app is built to be deployed as a static site. Follow these steps for deployment:

### Vercel

The easiest deployment option:

1. Push your repository to GitHub
2. Import the repository into Vercel
3. Vercel will automatically detect Next.js and use the correct build settings

### Netlify

1. Push your repository to GitHub
2. Import the repository into Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

### GitHub Pages

1. Add a `base` configuration to your `next.config.mjs` if deploying to a subfolder:
   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // Only use export for production builds
     ...(process.env.NODE_ENV === "production"
       ? {
           output: "export",
           distDir: "dist",
           basePath: "/dsa-cheatsheet", // Update this if needed
         }
       : {}),
     // ... other settings
   };
   ```
2. Run `npm run build`
3. Push the generated `dist` folder to the `gh-pages` branch

## Pre-Deployment Checklist

- [x] Fix any React hooks errors
- [x] Update `.gitignore` to exclude build artifacts
- [x] Ensure all components render properly on both client and server
- [x] Test navigation between different sections
- [x] Verify theme switching works correctly
- [x] Test the command palette functionality
- [x] Check mobile responsiveness
- [x] Update paths if deploying to a subfolder
- [ ] Complete content listed in TODO.md
- [ ] Add analytics (optional)
- [ ] Configure custom domain (if applicable)

## Sections

1. **Introduction** - Overview of the cheatsheet and how to use it
2. **Data Structures** - Arrays, linked lists, stacks, queues, hash tables, trees, graphs, and heaps
3. **Algorithms** - Sorting, searching, recursion, dynamic programming, and graph traversals
4. **Big-O Notation** - Time and space complexity analysis
5. **Problem-Solving Patterns** - Common patterns like sliding window, two pointers, etc.
6. **Problem-Solving Strategies** - Approaches to tackle algorithmic problems
7. **Practice Recommendations** - Suggestions for effective practice

## Future Improvements

See `TODO.md` for a comprehensive list of planned improvements and content additions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
