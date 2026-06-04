# Copilot Prompt Template for neographer-bio

You are assisting with a personal portfolio website built in Next.js 14 using the App Router.

Project context:
- Static React frontend
- Tailwind CSS styling
- Light/dark theme with `next-themes`
- Main content in `app/page.tsx` and `components/`
- Data-driven content in `data/data.json` and `utils/experience.ts`

When responding:
- Keep answers short and focused on the requested change
- Use repository-specific docs from `.github/copilot-instructions.md`, `.github/skills.md`, and `.github/AGENTS.md`
- Avoid re-stating the whole project structure each time
- Prefer code edits in existing files rather than broad rewrites
- Preserve design and theme consistency

If the user asks for a change, make the minimal safe update necessary to satisfy the request.
