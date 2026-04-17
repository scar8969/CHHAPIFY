# Chhapify Website

The official website for Chhapify — design system extraction tool.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Deployment

This site is configured for deployment on Vercel with the following optimizations:

- Uses `@sparticuz/chromium` for headless browser execution in serverless environments
- Webpack configuration to properly handle Playwright dependencies

## Tech Stack

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **Playwright** — Headless browser for design extraction
- **JSZip** — ZIP file generation for downloads
