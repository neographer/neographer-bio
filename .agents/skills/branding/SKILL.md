---
name: neographer-branding
description: Guidelines and instructions for creating new applications or editing existing ones in the Neographer monorepo, enforcing strict brand guidelines (Slate-50 background, Slate-900 text, Teal-600 accent) and workspace configurations.
---

# Neographer Brand & Monorepo Workspace Integrator

Use this skill when the user asks to create a new application, workspace, or feature (e.g. blog, articles, utilities, projects, portfolio, etc.) within the Neographer monorepo, or when editing design elements.

## Brand Standards Reference

Ensure all user interfaces use the unified styling system:
- **Background**: `bg-slate-50` (`#F8FAFC`)
- **Text Color**: `text-slate-900` (`#0F172A`)
- **Accent/Highlights**: `text-teal-600` / `bg-teal-600` (`#0D9488`)
- **Borders**: `border-slate-200` (`#E2E8F0`)
- **Muted Text**: `text-slate-500` / `text-slate-600`
- **Typography**: Inter (primary sans-serif) + System Monospace (utility tags and code blocks)

## How to Scaffold a New Monorepo Workspace App

When adding a new workspace app (e.g. `apps/blog` or `apps/projects`):
1. **Directory**: Create the app directory under `apps/`.
2. **Dependencies**: Set up `package.json` utilizing the exact versions of React, Next.js, and other tools as in `apps/hub` and `apps/resume` to avoid dependency drift.
3. **Configurations**:
   - `tsconfig.json`: Extend or copy from `apps/hub/tsconfig.json`.
   - `postcss.config.js`: Set up Tailwind CSS processing.
   - `tailwind.config.js`: Ensure `content` paths point to the correct files, and declare the standard theme variable mappings.
4. **Tailwind Config Theme Mapping**:
   ```javascript
   theme: {
     extend: {
       colors: {
         border: "var(--border)",
         background: "var(--background)",
         foreground: "var(--foreground)",
         primary: "var(--primary)",
       }
     }
   }
   ```
5. **CSS Variables (globals.css)**: Set up the CSS custom properties matching the Slate/Teal brand design.
6. **Registering Redirects**: If the new application corresponds to a subdomain, add a redirect path inside `apps/hub/next.config.js` to ensure the landing page redirects users cleanly (e.g., `/blog` redirects to `https://blog.neographer.co.in`).
7. **Lockfile**: Run `npx pnpm install` in the monorepo root to link workspace dependencies and update `pnpm-lock.yaml`.
