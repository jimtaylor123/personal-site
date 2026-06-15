
```
  ╔══════════════════════════════════════╗
  ║     jimtaylor.space                  ║
  ║     ———————————————                  ║
  ║     personal site · portfolio · lab  ║
  ╚══════════════════════════════════════╝
```

## What

This is [jimtaylor.space](https://jimtaylor.space) — my little corner of the internet. It's a dark-first, single-page portfolio that introduces who I am, links to projects I've shipped, and shares the tools I use.

Built because a personal site should feel like you, not a template.

## Stack

| Thing | What |
|---|---|
| **Vite 6** | Fast dev, fast builds |
| **Vue 3** | Components, router, reactivity |
| **Hand-written CSS** | Custom properties, no framework — more impressive in review |
| **Space Grotesk + Inter** | Headings + body, via Google Fonts |
| **Netlify** | Deploys from `main`, custom domain, security headers |

## Pages

- **/** — Hero with WebGL shader, portrait (smiling / not-smiling depending on theme), about, projects, links
- **/uses** — Editor, frontend/backend tools, security gear, hardware

## Running it

```bash
npm install
npm run dev      # local dev at localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Design choices that mattered

- **Dark-first** — the hero stays dramatic in both themes (WebGL canvas adjusts warmth)
- **Nav is always dark-translucent** — works over the hero without `backdrop-filter` (which chokes on macOS Chrome)
- **Anti-scrape contact** — email and phone are reversed in JS, decoded on click. Email copies to clipboard instead of `mailto:` (unreliable without a local mail client)
- **Two portrait variants** — smiling in light mode, not-so-much in dark mode (because mood)

## Structure

```
public/
  favicon.svg
  images/
    smiling.webp
    not-smiling.webp
src/
  main.js
  App.vue
  style.css              # reset + custom properties
  router.js
  composables/
    useTheme.js          # dark/light toggle, persisted
  pages/
    HomePage.vue
    UsesPage.vue
  components/
    SiteHeader.vue       # fixed nav + theme toggle
    SiteFooter.vue
    HeroSection.vue      # WebGL shader canvas + portrait
    AboutSection.vue
    ProjectsSection.vue
    LinksSection.vue
```

## Deploy

Pushing to `main` auto-deploys via Netlify. The `netlify.toml` locks down CSP, HSTS, and other security headers.

## Colophon

- Domain: [jimtaylor.space](https://jimtaylor.space)
- Subdomain projects: `*.jimtaylor.space`
- Email: decode it on the site (or you already know it)
- CI: Netlify from `main`

---

*Built with `npm create vite@latest`, a lot of hand-rolled CSS, and exactly zero
page builders.*
