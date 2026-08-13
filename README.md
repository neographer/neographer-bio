# Neographer Bio Monorepo

This repository is a monorepo managed with **pnpm workspaces** and **Turborepo**. It contains the frontend web properties of the Neographer ecosystem.

---

## Repository Structure

```
├── apps/
│   ├── hub/          # The central landing portal (neographer.co.in / neographer.co)
│   ├── resume/       # Professional ATS-friendly resume portfolio (resume.neographer.co.in)
│   └── collections/  # Numismatics dashboard & Philately resource portal (collections.neographer.co.in)
├── packages/
│   └── ui/           # Shared interface components and assets
├── .agents/          # AI agent prompt guides and workspace rules
└── package.json      # Monorepo configuration
```

---

## Tech Stack & Guidelines

All applications in this monorepo share a unified branding scheme:
- **Background**: Slate-50 (`#F8FAFC`) — crisp, clean, premium light web layout.
- **Foreground Text**: Slate-900 (`#0F172A`) — deep professional contrast.
- **Primary Accent**: Teal-600 (`#0D9488`) — active tags, markers, and buttons.
- **Borders**: Slate-200 (`#E2E8F0`).
- **Typography**: Inter (primary sans-serif) + System Monospace (utility labels and code blocks).

---

## Local Development

Ensure you have **Node.js** and **pnpm** installed.

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Run Development Servers**:
   This will boot up all applications in parallel using Turborepo:
   ```bash
   pnpm dev
   ```
   - **Hub Portal**: [http://localhost:3000](http://localhost:3000)
   - **Resume App**: [http://localhost:3001](http://localhost:3001)
   - **Collections App**: [http://localhost:3002](http://localhost:3002)

3. **Production Compilation**:
   Verify everything compiles cleanly:
   ```bash
   pnpm build
   ```

---

## Collections App Dataset Updates

The `apps/collections` application loads static data at build time. To update the database:
1. Replace `apps/collections/neographer_export.csv` with a fresh Numista export CSV.
2. Run the parser script to update data outputs:
   ```bash
   node apps/collections/scripts/convert_data.js
   ```
3. Re-compile the application or start dev.
