# SOS Kid

A mobile-friendly emergency contact card for kids. Displays a child's profile with one-tap buttons to call, WhatsApp, or email their emergency contacts.

Deployed at [maocubillos.github.io](https://maocubillos.github.io).

## Stack

- React 19 + TypeScript + Vite (SWC)
- Deployed to GitHub Pages (served from `docs/`)

## Usage

Open the app with a `?profile=<name>` query parameter:

```
https://maocubillos.github.io/?profile=tomas
```

If no profile is specified, it defaults to `tomas`.

## Adding a Profile

Create a JSON file at `public/profiles/<name>.json`:

```json
{
  "name": "Full Name",
  "contacts": [
    {
      "label": "Mom",
      "phone": "+1234567890",
      "email": "mom@example.com"
    },
    {
      "label": "Dad",
      "phone": "+0987654321"
    }
  ]
}
```

- `phone` — used for both the call (`tel:`) and WhatsApp (`wa.me/`) buttons
- `email` — optional; shows an email button if present

## Commands

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + production build → docs/
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Deployment

Push to `main`. GitHub Pages serves from the `docs/` folder automatically.
