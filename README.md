# jimtaylor.space

Jim Taylor’s personal workshop: full stack development, useful things and unexpected ideas. Built with Vue 3, Vue Router, Vite and hand-written CSS.

## Run locally

```sh
npm install
npm run dev
npm run build
npm test
```

## Pages and design

- `/` — Workshop homepage with selected work, About and contact actions.
- `/uses` — Tools and gear, styled to match Workshop.
- `/personal` — Life outside development, hobbies and an interactive map.
- `/preview/editorial`, `/preview/studio`, `/preview/workshop` — comparison studies.
- `/preview/original` — previous homepage retained for reference.

The homepage presents Jim as a full stack builder using Laravel, Vue and AI-assisted development. Purple and citrus accents, outlined panels and playful typography define the Workshop direction. One static, posterized WebP portrait lives in About, with a compact responsive crop. Project artwork is labelled as interface studies. REGGULAR is coming soon and has no outbound link.

`src/previews/DesignPreview.vue` contains the homepage and comparison layouts; `src/previews/preview.css` defines their design. `WorkshopHeader.vue` provides shared navigation and `src/workshop.css` styles the supporting pages. Existing clipboard email and telephone actions are retained.

## Validation and deployment

`npm test` builds on a production preview server and checks the homepage, portrait, REGGULAR status, navigation and mobile layouts. Run `npm run build` first.

Pushing to `main` triggers the existing Netlify deployment to [jimtaylor.space](https://jimtaylor.space). `netlify.toml` sets the static output, SPA fallback and security headers.
