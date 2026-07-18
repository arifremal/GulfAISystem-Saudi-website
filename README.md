# Gulf AI Systems — Saudi Main Website

Corporate marketing site for [Gulf AI Systems](https://gulfaisystems.com.sa/) — an AI transformation partner for Saudi businesses. The site introduces services, industry hubs, and conversion paths (consultation, contact, chat).

Live site: [gulfaisystems.com.sa](https://gulfaisystems.com.sa/)

## Features

- **Home** — hero, proof metrics, about intro, industries, services, approach, problem/why-us, and audit CTA
- **About** (`/about`) — company vision, people, and positioning
- **Contact** (`/contact`) — inquiry form via Web3Forms, WhatsApp, and phone
- **Bilingual UI** — English and Arabic (RTL) with language switcher
- **Chat widget** and consultation modal for lead capture
- **Industry hubs** linked as subdomains:

| Industry | URL |
| --- | --- |
| Construction | https://construction.gulfaisystems.com.sa |
| Logistics | https://logistics.gulfaisystems.com.sa |
| Healthcare | https://healthcare.gulfaisystems.com.sa |
| Manufacturing | https://manufacturing.gulfaisystems.com.sa |
| Retail | https://retail.gulfaisystems.com.sa |
| Professional services | https://professionalservices.gulfaisystems.com.sa |

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Lucide React (icons)
- Oxlint (linting)

## Project structure

```
src/
  components/   # Layout, sections, widgets
  pages/        # About & Contact pages
  i18n/         # EN / AR translations + language context
  data/         # Shared content (industries, services, contact)
  lib/          # Forms, analytics, site meta
public/         # Favicons, OG image, static assets
```

## Getting started

**Requirements:** Node.js 20+ recommended

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` (Vite default).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local dev server |
| `npm run build` | Typecheck and production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Configuration

Optional environment variable (create a `.env` file if needed):

```env
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

If unset, the contact form uses the default key in `src/lib/web3forms.ts`.

Contact numbers and WhatsApp links are configured in:

- `src/data/content.ts`
- `src/lib/site-meta.ts`

## Deploy

```bash
npm run build
```

Upload the contents of `dist/` to your host (static hosting, CDN, or reverse proxy). Ensure `/about` and `/contact` resolve to `index.html` (SPA fallback).

## License

Private — Gulf AI Systems. All rights reserved.
