# phd for life (`phd4life.com`)

> Digital garden and engineering log for AI4Science projects, autonomous agentic workflows, NLP & deep learning experiments, and synthetic biology notes.

[![Site](https://img.shields.io/badge/website-phd4life.com-2dd4bf?style=flat-square)](https://phd4life.com)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro%205-ff5d01?style=flat-square)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)

---

## Overview

**phd for life** is an Astro-based personal homepage and technical publication hub. It focuses on:

- **AI for Science & Synthetic Biology**: Programmable biology, Bio-LMs, and edge bioinformatics.
- **Autonomous Agents & Lab Automation**: Model Context Protocol (MCP) integrations, zero-hardware simulation gates, and physical deck previews.
- **Applied Machine Learning & NLP**: Practical developer tooling, AST-aware sanitization, and reproducible research workflows.
- **Technical Field Notes**: Content Collections-driven Markdown/MDX blog with syntax highlighting and KaTeX mathematics.

## Visual Design & Aesthetics

The design uses an obsidian and teal palette inspired by deep-sky cartography:

- **Color Tokens**: Obsidian deep background (`#06060a`), obsidian surface (`#0c0c12`), mint/teal accent (`#2dd4bf`).
- **Typography**: Editorial contrast combining *Fraunces* (italic serif) and *DM Sans* (clean sans-serif), with *JetBrains Mono* for technical telemetry.
- **Animations**:
  - Three.js multi-layered WebGL starfield with mouse parallax.
  - GSAP & ScrollTrigger scroll orchestration with section numbering index (00–07).
  - Lenis smooth scrolling with reduced-motion fallbacks.
  - Animated canvas film grain.

## Tech Stack

- **Framework**: Astro 5 (Static Site Generation / `output: 'static'`)
- **Language**: TypeScript
- **Content Engine**: Astro Content Collections with Zod schemas
- **Code & Math**: Shiki (`github-dark`), `remark-math`, `rehype-katex`
- **Animations**: Three.js, GSAP 3, Lenis
- **Package Manager**: pnpm

## Project Structure

```text
├── astro.config.mjs         # Astro integrations (MDX, Sitemap, Unified Math/Shiki)
├── package.json             # Scripts and dependencies
├── tsconfig.json            # Strict TypeScript configuration
├── public/
│   ├── favicon.svg          # Minimalist vector icon
│   ├── robots.txt           # Search engine directives & sitemap URL
│   └── images/projects/     # Obsidian & teal geometric SVG project covers
└── src/
    ├── content.config.ts    # Zod schema for blog posts
    ├── content/blog/        # Technical Markdown / MDX field notes
    ├── data/                # Typed data sources (projects, stack, workflows, site)
    ├── styles/              # Design tokens, global layout, and prose styling
    ├── scripts/             # Three.js starfield, film grain, and GSAP/Lenis motion
    ├── layouts/             # Base and BlogPost layouts
    ├── components/          # 00-07 page section components
    └── pages/               # File-based routing (Index, Blog, Tags, RSS, 404)
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/SmartisanNaive/blog.git
cd blog

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:4321` in your browser.

### Building for Production

```bash
# Build static files to dist/
pnpm build

# Preview production build locally
pnpm preview
```

## Deployment

The project builds to a standalone static `dist/` directory with zero runtime server requirements.

- **Tencent Cloud EdgeOne Pages**:
  - Framework: Astro
  - Build command: `pnpm build`
  - Output directory: `dist`
  - Node version: 20+
- **Cloudflare Pages / Vercel**: Fully compatible out of the box with the same static settings.

## License

This project is open-source software licensed under the [MIT License](./LICENSE).
