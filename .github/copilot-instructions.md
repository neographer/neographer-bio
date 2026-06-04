# Copilot Instructions for neographer-bio

This repository is a personal portfolio/bio website built with Next.js 14 using the App Router. The site is a static React frontend with a small component layer, Tailwind CSS styling, and a light/dark theme toggle.

## Project summary

- Framework: Next.js 14 with the `app/` directory
- Language: TypeScript and React
- Styling: Tailwind CSS, `tailwind-merge`, `clsx`
- Theme: `next-themes` with a light/dark toggle
- Animation: `framer-motion`
- Icons: `react-icons`, `lucide-react`
- Data: `data/data.json`, `utils/experience.ts`
- Primary content lives in `app/page.tsx` and `components/`

## Important structure

- `app/layout.tsx` — root layout and metadata
- `app/page.tsx` — home page content entry
- `app/globals.css` — global styles, Tailwind base imports, theme backgrounds
- `components/` — reusable UI blocks and page sections
- `data/data.json` — site content for sections, links, and social items
- `utils/experience.ts` — experience data helper

## Coding conventions

- Prefer small, reusable React functional components
- Preserve Tailwind-first styling and existing class conventions
- Keep markup semantic and accessible
- Use the app router and static site patterns rather than server-side APIs
- Only introduce new dependencies when necessary
- Do not rewrite the entire site unless the user explicitly asks for a redesign

## What to optimize

- Keep generated responses concise and focused on the requested change
- Use repository context from `.github/copilot-instructions.md`, `.github/skills.md`, and `.github/AGENTS.md`
- Avoid repeating the full project description in every response
- Favor edits in `components/`, `app/`, and `data/` over broad structural refactors

## Common tasks

- Update page content and section text
- Improve responsive layout and spacing
- Adjust theme toggle / light-dark styles
- Add or refine UI components in `components/`
- Maintain static, client-side rendering behavior
