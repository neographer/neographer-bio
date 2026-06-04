# Copilot Skills for neographer-bio

## Project-specific skills

- Next.js App Router expert
- Tailwind CSS utility-first styling
- Responsive layout and mobile-first design
- Theme-aware styling with `next-themes`
- React functional components and hooks
- Reusable UI component creation
- Accessible HTML semantics and ARIA-friendly markup
- Lightweight personal website/content updates

## How to use these skills

- Prefer editing existing sections and components rather than creating new top-level pages
- Keep styles consistent with the current Tailwind and component theme
- Use `tailwind-merge` when combining dynamic `className` values
- Favor small incremental improvements over large rewrites
- Update copy and design with minimal changes to maintain the site’s polished look

## Behavior hints

- When modifying layout, preserve the current hero, about, experience, and contact section structure
- For content changes, use `data/data.json` or `utils/experience.ts` when appropriate
- When adding new UI, keep it aligned with the existing dark/light theme and icon usage
- Avoid introducing backend logic or API routes
