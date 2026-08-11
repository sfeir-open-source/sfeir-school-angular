---
name: slide-writer
description: Writes and edits training slides for the docs/ reveal.js deck (sfeir-school-theme). Trigger when creating or modifying markdown slide files in docs/markdown, adding a slide to a training module, building multi-column layouts, adding images, code blocks, speaker notes, transitions, or lab/exercise slides, or registering new slide files in the day_*.js build scripts.
license: MIT
metadata:
  author: sfeir-school-angular
  version: '1.0'
---

# Slide Writer Guidelines

This skill teaches precise authoring of slides for the `docs/` deck, built on **reveal.js** skinned by the vendored **`sfeir-school-theme`** package (with TalkControl reveal.js extensions). Slides are plain markdown files under `docs/markdown/`, rendered at runtime — there is no static build step for local preview.

Always read the specific reference file(s) below for the task at hand before writing markdown — the syntax is non-standard reveal.js-markdown (custom separators, directive comments) and small mistakes (wrong separator, missing `with-code` class) silently break rendering.

## Core facts (always true)

- One `.md` file = one "sub-topic", not one slide. A file contains **one or more slides** separated by a literal line `##==##`.
- A new `.md` file has **zero effect** until referenced by path in the matching `docs/scripts/day_one.js` … `day_four.js` file. See [file-organization.md](references/file-organization.md).
- No YAML/TOML front-matter exists. Per-slide config is a `<!-- .slide: class="..." ... -->` HTML comment as the **first line** of a slide. Per-element config is a `<!-- .element: class="..." -->` comment placed **immediately after** the element it targets.
- To preview locally: `npm run start:prez` from repo root (serves at `http://localhost:4242`, live-reloads on changes under `markdown/` and `scripts/`).

## Task → reference map

- **Creating a new slide file, registering it in the day scripts, module/file naming conventions (00-TRANSITION-SLIDE.md, 100-LAB.md, numeric prefixes)**: Read [file-organization.md](references/file-organization.md)
- **Basic slide syntax**: horizontal slide separator `##==##`, the `<!-- .slide: -->` and `<!-- .element: -->` directive comments, combining classes**: Read [slide-syntax.md](references/slide-syntax.md)
- **Multi-column layouts** (`tc-multiple-columns`, `##++##` column markers, sizing helper classes `half`/`tiers`/`fill-rest`)**: Read [multi-column-layouts.md](references/multi-column-layouts.md)
- **Images**: path conventions, the `![]() 'class-list'` sizing/position syntax (`h-500`, `center`, `float-right`, `full-width`...), speaker-slide image roles (`speaker`, `company`, `badge`)**: Read [images.md](references/images.md)
- **Code blocks**: required `with-code inconsolata` slide classes, `small-code`/`medium-code`/`big-code` sizing, language tags, inline-comment emphasis convention (no line-highlighting exists)**: Read [code-blocks.md](references/code-blocks.md)
- **Speaker notes**: the `Notes:` block convention**: Read [speaker-notes.md](references/speaker-notes.md)
- **Special slide types**: first-slide, transition slides, speaker-slide, exercise/lab slides, `sfeir-basic-slide`**: Read [special-slide-types.md](references/special-slide-types.md)
- **Styling**: scss layering (`scss/angular.scss` → `css/angular.css`), where to add custom classes, utility classes (`important`, `bold`, `half`, `tiers`, `fill-rest`)**: Read [styling.md](references/styling.md)
- **Build/preview/PDF export workflow**: Read [build-and-preview.md](references/build-and-preview.md)

## Non-conventions (do not invent these)

- **No fragments / click-to-reveal**: `class="fragment"` is never used in this deck. Vertical whitespace between bullets is done with literal `<br/><br/>`, not step-reveal. Do not add `fragment` classes unless explicitly asked for genuine click-through reveal.
- **No vertical slide stacks**: only `##==##` (horizontal) is used; no vertical-slide separator has precedent here.
- **No line-highlighting in code blocks**: don't use `data-line-numbers` or bracket ranges; emphasize code with an inline `//` comment inside the snippet instead.
- **No `data-background` images**: all images in this deck are inline `<img>`, never slide backgrounds.
