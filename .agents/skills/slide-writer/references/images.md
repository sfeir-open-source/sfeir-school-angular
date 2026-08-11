# Images

## Syntax

Standard markdown image syntax is repurposed: `![](path 'class-list')`. The string in the title-attribute position (single or double quotes both work) becomes a **space-separated CSS class list** applied to the resulting `<img>` — it is not a real tooltip title.

```md
![](assets/images/school/architecture/architecture.png 'h-900')
![](../../assets/images/school/dependency-injection/di_working.png 'center h-600')
![](./assets/images/speaker/anthony-pena/APE.jpg "speaker")
```

## Path conventions

Both are used in this deck — pick whichever resolves correctly from the file's location:

- Relative to `docs/` root: `assets/images/school/architecture/architecture.png`
- Relative to the markdown file's own folder: `../../assets/images/school/dependency-injection/di_working.png`

## Sizing / positioning classes

Observed in real slides, backed by `docs/scss/angular.scss`:

| Class | Effect |
|---|---|
| `h-300` … `h-900` (in steps of 50–100: 300, 350, 400, 450, 500, 600, 700, 800, 900) | fixed height |
| `w800`, `w1600` | fixed width |
| `center` | centers the image — usually combined, e.g. `'center h-500'` |
| `full-width` | full-bleed width |
| `full-center` | full-bleed, centered |
| `float-right` | floats the image right, e.g. `'h-300 float-right'` |

Semantic classes used specifically inside `speaker-slide` layout (see [special-slide-types.md](special-slide-types.md)):

- `speaker` — the speaker's photo
- `company` — company logo
- `badge` — small badge icons (GDE, MVP, etc.)

Additional alt-based CSS hooks in `docs/scss/angular.scss` (match by substring on the class list you provide):

```scss
img[alt*='full-width-screen'] { width: 100%; max-width: 100%; max-height: 100%; }
img[alt*='bottom'] { position: absolute; bottom: 0; left: 0; }
```

## Full example: speaker slide images

`docs/markdown/00-SPEAKER/00-nicolas-frizzarin.md`:

```md
<div class="speaker-slide">
![](assets/images/speaker/nicolas-frizzarin/nicolas-frizzarin.jpg 'speaker')
![](assets/images/speaker/logo-sfeir-blanc.png 'company')
![](assets/images/speaker/nicolas-frizzarin/GDE-2025-WEB.png 'badge badge')
![](assets/images/speaker/nicolas-frizzarin/GDE-2025-Angular.png 'badge badge')
![](assets/images/speaker/nicolas-frizzarin/MVP.png 'badge badge')
</div>
```

## Things to avoid

- **No `data-background` slide backgrounds.** Every image in this deck is an inline `<img>` inside slide content — never a reveal.js background image on the `<section>`. Don't introduce background images unless explicitly asked.
- Don't invent new height/width classes — pick the closest existing `h-NNN`/`w-NNN` value rather than a new one, to stay consistent with the CSS already defined.
