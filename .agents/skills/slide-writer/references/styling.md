# Styling / Theming

## CSS pipeline

```
docs/scss/angular.scss  --(sass, compiled)-->  docs/css/angular.css
docs/scss/angular.scss  imports  docs/scss/custom-directive.scss
```

`docs/index.html` loads the vendored theme CSS first, then `css/angular.css` as an override layer:

```html
<link ... href="./web_modules/sfeir-school-theme/dist/sfeir-school-theme.css" id="theme" .../>
<link ... href="./css/angular.css" id="theme-custo" .../>
```

**Always edit the `.scss` sources, not the compiled `.css`** — `docs/css/*.css` is generated output (per `docs/AGENTS.md`). Run `npm run sass` (or `npm run sass-once` for a one-shot compile) to regenerate; `npm run start:prez` already runs `sass --watch` in parallel with the live-reload server, so during normal authoring you don't need to compile manually.

## Existing custom rules (`docs/scss/angular.scss`)

- Code sizing tiers: `.medium-code`, `.big-code` (see [code-blocks.md](code-blocks.md))
- Utility classes:
  - `.bold` — `font-weight: 600`
  - `.file-name` — `font-size: 12px`
  - `.half` — `width: 50%`
  - `.tiers` — `width: 30%`
  - `.fill-rest` — `flex: 2`
  - `.important` — `font-weight: bold; color: darkred;` — used as an ad-hoc callout/admonition
- Image alt-based hooks: `img[alt*='full-width-screen']`, `img[alt*='bottom']`
- Badge position fix for speaker slides: `.reveal .slides section[data-background].speaker-slide img[alt*=badge] { top: 800px }`

`docs/scss/custom-directive.scss` adds:

- `.container-practice` component with `.border-red`/`.border-orange`/`.border-green` modifiers and `.icon-satisfaction`/`.code` sub-elements
- Margin fixes for headings on `sfeir-basic-slide`
- Two-column list-style fix for `.sfeir-basic-slide ul/ol/dl`

## How to apply styling in a slide

Two mechanisms only — no others exist in this deck:

1. **Slide-level**: `<!-- .slide: class="..." -->` — see [slide-syntax.md](slide-syntax.md)
2. **Element-level**: `<!-- .element: class="..." -->` — always `class="..."`, never raw inline `style="..."` in this repo's own slide content (the theme supports inline `style` for icon sizing per its README, but no slide in this repo uses it — prefer a class).

## Adding a genuinely new visual treatment

If none of the existing utility classes fit, add a new rule to `docs/scss/angular.scss` (or `custom-directive.scss` for structural/component-like additions) rather than writing inline styles in markdown, so the deck's styling stays centralized and reusable.

Example of the `.important` callout in use, `docs/markdown/24-STATE-MANAGEMENT/01-INTRODUCTION.md`:

```md
We need to find a common communication method.

<!-- .element: class="important" -->
```
