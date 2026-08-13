# Neographer Project Guidelines & Brand System

This document outlines the coding standards, repository guidelines, and branding conventions for all projects in the Neographer monorepo (hub, resume, blog, articles, utilities, projects, etc.).

## 1. Visual Brand Identity

All applications under the `neographer.co.in` or `neographer.co` ecosystem must adhere to the same styling guidelines to maintain a unified visual brand.

### Core Color Palette
- **Background**: Slate-50 (`#F8FAFC`) — A crisp, clean, premium light web background.
- **Foreground (Body Text)**: Slate-900 (`#0F172A`) — Deep, professional slate text for high contrast and readability.
- **Primary Brand Accent**: Teal-600 (`#0D9488`) — The modern primary color used for branding elements, links, visual identifiers, and highlights.
- **Primary Hover**: Teal-700 (`#0F766E`) — Used for interactive hover states.
- **Borders**: Slate-200 (`#E2E8F0`) — Subtle slate borders for section dividers and card outlines.
- **Muted Foreground**: Slate-500 (`#64748B`) or Slate-600 (`#475569`) — Secondary text, dates, sub-labels, and descriptions.

### Typography
- **Primary Sans Font**: `Inter` (with standard browser sans-serif fallbacks).
- **Monospace Font**: System monospace (for code blocks, labels, metadata tags, e.g., `[01 // TECH]`).
- **Heading Styles**: Clear weight hierarchy (`font-light` for hero headings, `font-medium` or `font-semibold` for component sub-headings).

### UI Layout & Interactions
- **Minimal Grid Backgrounds**: Use fine light slate patterns (opacity `0.3` to `0.6` in background containers) to add depth without clutter.
- **Micro-animations**: Smooth hover transitions (`transition-all duration-300` or `duration-500` with `ease-out`) for active links and cards.
- **Interactive Hover Glows**: Interactive items can feature soft box-shadow teal glows (e.g., `hover:shadow-[0_0_50px_-12px_rgba(13,148,136,0.12)]`).
- **Print Optimization**: Always support print stylesheets on resume/document pages (clean margins, disabling backgrounds, pure black text).

---

## 2. Monorepo Architecture

This workspace is a pnpm monorepo managed with Turborepo.

- **Workspace Packages**:
  - `apps/hub` (mapped to `neographer.co.in`) — The central routing and landing page hub.
  - `apps/resume` (mapped to `resume.neographer.co.in`) — The professional ATS-friendly resume.
  - `apps/collections` (mapped to `collections.neographer.co.in`) — Digital catalog of coins, banknotes, and philatelic resources.
  - Planned extensions: `apps/blog` (`blog.neographer.co.in`), `apps/gallery`, etc.
  - `packages/ui` — Shared workspace components.
- **Dependency Control**: Keep package dependencies aligned across all app workspaces (e.g., same version of Next.js, React, and Lucide React).
- **Edge redirects**: `apps/hub` serves as the primary router. Any domain-specific shortcut redirects (such as `/resume` -> `https://resume.neographer.co.in` or `/collections` -> `https://collections.neographer.co.in`) must be configured at the Next.js edge configuration level in `apps/hub/next.config.js`.
