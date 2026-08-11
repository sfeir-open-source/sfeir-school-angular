# agents.md — `docs/` folder guide

This file is the source of truth for any agent/subagent working inside this folder. Read it before making changes here.

## What this folder is

`docs` is the Nx project that hosts the **slide deck for the Angular training** ("Sfeir School Angular"), built on [reveal.js](https://revealjs.com/) via the `sfeir-school-theme` package. It is not documentation about the repo — it _is_ the training content itself (slides, assets, styles, and the JS glue that assembles them).

## How to run it

From the workspace root:

```bash
npm run start:prez
```

This is an alias for `npx nx serve docs`, which resolves to the `serve` target in `docs/project.json`. That target runs the `docs` package's own `start` script (`docs/package.json`), which in parallel:

- serves `index.html` with `live-server` on port 4242, watching `markdown/` and `scripts/`
- compiles `scss/angular.scss` → `css/angular.css` in watch mode

There is no build step required beyond this for local viewing — the deck is served live.

## Folder structure

| Path                                                              | Purpose                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                                                      | Entry point. Loads the theme CSS/JS and mounts the reveal.js container.                                                                                                                                               |
| `markdown/`                                                       | All slide content, one subfolder per module (e.g. `04-COMPONENTS/`, `17-FORMS/`). Numeric prefixes on both folders and files set reading/ordering conventions.                                                        |
| `scripts/slides.js`                                               | Composes the final deck by concatenating day 1–4 slide lists and initializing `SfeirThemeInitializer`.                                                                                                                |
| `scripts/day_one.js`, `day_two.js`, `day_three.js`, `day_four.js` | Each defines which markdown files appear on that training day, in what order, and with which visibility flag (see below).                                                                                             |
| `scripts/utils.js`                                                | Helpers `showByDefault` / `showOnModern2days` that tag a slide with a `typeShow` value.                                                                                                                               |
| `scripts/dont-touch/`                                             | Contains `prepare-script.js`, run via the `prepare` npm hook. Treat as infrastructure, not content — as the name implies, don't modify without a clear reason.                                                        |
| `css/`, `scss/`                                                   | Custom styling layered on top of the `sfeir-school-theme` package (`angular.scss`/`.css`, `custom-directive.scss`/`.css`). `css/*.css` is generated from `scss/` — edit the `.scss` sources, not the compiled `.css`. |
| `assets/images/`                                                  | Images referenced by slides.                                                                                                                                                                                          |
| `web_modules/`                                                    | Vendored/installed theme package (`sfeir-school-theme`) consumed by `index.html` and `slides.js`.                                                                                                                     |
| `project.json`                                                    | Nx project definition exposing the `serve` target used by `npm run start:prez`.                                                                                                                                       |
| `package.json`                                                    | The `docs` package's own scripts (`serve`, `sass`, `start`, `prepare`) — this is a nested package, distinct from the workspace root `package.json`.                                                                   |

## Slide selection / visibility model

Slides are plain paths (relative to `markdown/`) collected per day in `scripts/day_*.js`, then flattened and filtered in `scripts/slides.js` based on a `typeShow` passed at init time:

- `all` — ignore filtering, show everything
- `on-stage` (default) — full in-person formation, all modules
- `modern-2days` — reduced slide set for the 2-day "Modern Angular" format

A slide is either a bare string path (always shown) or tagged with `showByDefault(...)` / `showOnModern2days(...)` from `utils.js` to control which `typeShow` variants include it. When adding or moving a slide, it must be referenced in the relevant `day_*.js` file to actually appear in the deck — dropping a file into `markdown/` alone has no effect.

## Numbering conventions

- Module folders under `markdown/` are prefixed `NN-NAME` (e.g. `13-DEPENDENCY-INJECTION`) and are ordered by that prefix across the whole training.
- Files inside a module follow their own `NN-NAME.md` sequence (e.g. `00-TRANSITION-SLIDE.md`, `01-CONCEPTS.md`, ...). `100-LAB.md` is a recurring convention for a module's hands-on lab, deliberately numbered high to sort last.

## Out of scope for this file

This file does not cover how to author slide content (markdown/reveal.js syntax, theme directives, etc.). It is purely about the structure and mechanics of this folder.
