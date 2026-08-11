# Build & Preview Workflow

## Local preview

From the repo root:

```bash
npm run start:prez
```

This resolves to `nx serve docs` → `docs/project.json`'s `serve` target (`executor: nx:run-script`, `script: start`) → `docs/package.json`'s `start` script:

```json
"start": "parallelshell \"npm run serve\" \"npm run sass\""
```

Which runs, in parallel:

1. `live-server --port=4242 --open="./index.html" --watch="markdown,scripts/"` — serves the deck at `http://localhost:4242`, live-reloading on any change under `markdown/` or `scripts/`.
2. `sass ./scss/angular.scss:./css/angular.css --source-map --watch` — recompiles custom CSS on change.

**No separate build step is required for local viewing** — the deck is served live, markdown is fetched and rendered by `docs/scripts/slides.js` at runtime.

## Other relevant scripts (`docs/package.json`)

- `npm run sass-once` — one-shot SCSS compile (no watch)
- `npm run serve` — just the live-reload server (no SCSS watch)
- `prepare` — runs `node ./scripts/dont-touch/prepare-script.js`; this is infrastructure, do not edit or invoke manually outside of its intended lifecycle hook.

## Verifying a change

After editing/adding a slide file:

1. Confirm the file is registered in the correct `day_*.js` list (see [file-organization.md](file-organization.md)) — otherwise it silently won't appear.
2. With `npm run start:prez` running, navigate to the module in the browser at `http://localhost:4242` and check the slide renders as intended (columns aligned, code sized correctly, images not overflowing).
3. Press `S` to open speaker view and confirm any `Notes:` content appears.

## PDF export

Standard reveal.js `?print-pdf` workflow, with theme-specific options (from `docs/web_modules/sfeir-school-theme/dist/README.md`):

| Configuration | Effect |
|---|---|
| `index.html?print-pdf&show-notes` | Show speaker notes in the export |
| `<div class="slides" data-show-notes/>` | Same, via HTML attribute |
| `<div class="slides" data-show-notes="separate-page"/>` | Notes on a separate page |
| `data-pdf-max-pages-per-slide="1"` / `?print-pdf&pdf-max-pages-per-slide=1` | Force exactly 1 page per slide |
| `data-pdf-dont-separate-fragments` / `?print-pdf&pdf-dont-separate-fragments` | Don't split fragments across pages |

## Other useful `index.html`/URL configuration

- `data-theme=institute|school|conf` — color theme
- `data-lang=EN` — loads `XX-slide.EN.md` overrides where present (see [file-organization.md](file-organization.md))
- `data-type-show` — controls the `on-stage`/`modern-2days`/`all` day-filtering system (see [file-organization.md](file-organization.md))
