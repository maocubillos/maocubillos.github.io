# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite)
npm run build     # TypeScript check + Vite production build → outputs to docs/
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Architecture

**Stack:** React 19 + TypeScript + Vite (SWC), deployed to GitHub Pages.

**Single-page app** with no routing — one screen displaying an emergency contact card ("SOS kid") with buttons that open phone calls, WhatsApp, and email via browser protocol handlers (`tel:`, `https://wa.me/`, `mailto:`).

**Key files:**
- `src/App.tsx` — main component with all contact button logic
- `src/App.css` — card and button styles (custom CSS variables, no framework)
- `src/index.css` — global styles and CSS reset
- `vite.config.ts` — base path set to `./` for GitHub Pages relative asset resolution

**Build output** goes to `docs/` (GitHub Pages serves from this folder on the `main` branch).

**Icons** come from `iconoir-react`. No state management library — plain React hooks only.
