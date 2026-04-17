<p align="center">
  <h1 align="center">Chaapofy</h1>
  <p align="center">Extract complete design systems from any website in seconds.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/chhapify"><img src="https://img.shields.io/npm/v/chhapify?color=blue&label=npm" alt="npm version"></a>
  <a href="https://github.com/krs-jetson/design-chhapify/blob/main/LICENSE"><img src="https://img.shields.io/github/license/krs-jetson/design-chhapify" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/chhapify" alt="node version"></a>
</p>

---

**Chaapofy** crawls any website with a headless browser, extracts every computed style from the live DOM, and generates **8 output files** — including an AI-optimized markdown file, visual HTML preview, Tailwind config, React theme, shadcn/ui theme, Figma variables, W3C design tokens, and CSS custom properties.

Unlike other tools, Chaapofy also extracts **layout patterns** (grids, flexbox, containers), captures **responsive behavior** across breakpoints, records **interaction states** (hover, focus, active), scores **WCAG accessibility**, and enables **multi-brand comparison**.

## Quick Start

```bash
npx chhapify https://stripe.com
```

Get everything at once:

```bash
npx chhapify https://stripe.com --full
```

## What You Get (8 Files)

| File | What it is |
|------|------------|
| `*-design-language.md` | AI-optimized markdown — feed it to any LLM to recreate the design |
| `*-preview.html` | Visual report with swatches, type scale, shadows, a11y score |
| `*-design-tokens.json` | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) format |
| `*-tailwind.config.js` | Drop-in Tailwind CSS theme |
| `*-variables.css` | CSS custom properties |
| `*-figma-variables.json` | Figma Variables import (with dark mode support) |
| `*-theme.js` | React/CSS-in-JS theme (Chakra, Stitches, Vanilla Extract) |
| `*-shadcn-theme.css` | shadcn/ui globals.css variables |

## Install

```bash
# Use directly (no install needed)
npx chhapify https://example.com

# Or install globally
npm install -g chhapify
```

## Key Features

### Layout System Extraction

Extracts the structural skeleton — grid column patterns, flex direction usage, container widths, gap values, and justify/align patterns.

### Responsive Multi-Breakpoint Capture

Crawls the site at 4 viewports (mobile, tablet, desktop, wide) and maps exactly what changes:

```bash
chhapify https://vercel.com --responsive
```

### Interaction State Capture

Programmatically hovers and focuses interactive elements, capturing the actual style transitions:

```bash
chhapify https://stripe.com --interactions
```

### Live Site Sync

Treat the deployed site as your source of truth:

```bash
chhapify sync https://stripe.com --out ./src/tokens
```

### Multi-Brand Comparison

Compare multiple brands side-by-side:

```bash
chhapify brands stripe.com vercel.com github.com
```

### Clone Command

Generate a working Next.js app with the extracted design applied:

```bash
chhapify clone https://stripe.com
cd cloned-design && npm install && npm run dev
```

### Design System Scoring

Rate any site's design quality across 7 categories:

```bash
chhapify score https://vercel.com
```

## CLI Reference

```
chhapify <url> [options]

Options:
  -o, --out <dir>         Output directory (default: ./chhapify-output)
  -n, --name <name>       Output file prefix (default: derived from URL)
  -w, --width <px>        Viewport width (default: 1280)
  --height <px>           Viewport height (default: 800)
  --wait <ms>             Wait after page load for SPAs (default: 0)
  --dark                  Also extract dark mode styles
  --depth <n>             Internal pages to crawl (default: 0)
  --screenshots           Capture component screenshots
  --responsive            Capture at multiple breakpoints
  --interactions          Capture hover/focus/active states
  --full                  Enable all captures
  --cookie <cookies...>   Cookies for authenticated pages (name=value)
  --header <headers...>   Custom headers (name:value)
  --framework <type>      Only generate specific theme (react, shadcn)
  --verbose               Detailed progress output

Commands:
  apply <url>             Extract and apply design directly to your project
  clone <url>             Generate a working Next.js starter from extracted design
  score <url>             Rate design quality (7 categories, A-F, bar chart)
  watch <url>             Monitor for design changes on interval
  diff <urlA> <urlB>      Compare two sites' design languages
  brands <urls...>        Multi-brand comparison matrix
  sync <url>              Sync local tokens with live site
```

## Example Output

```
  chhapify
  https://vercel.com

  Output files:
  ✓ vercel-com-design-language.md
  ✓ vercel-com-design-tokens.json
  ✓ vercel-com-tailwind.config.js
  ✓ vercel-com-variables.css
  ✓ vercel-com-preview.html
  ✓ vercel-com-figma-variables.json
  ✓ vercel-com-theme.js
  ✓ vercel-com-shadcn-theme.css

  Summary:
  Colors: 27 unique colors
  Fonts: Geist, Geist Mono
  Spacing: 18 values (base: 2px)
  Shadows: 11 unique shadows
  Radii: 10 unique values
  Components: 11 types detected
  CSS Vars: 407 custom properties
  Layout: 55 grids, 492 flex containers
  A11y: 94% WCAG score
```

## License

[MIT](LICENSE)
