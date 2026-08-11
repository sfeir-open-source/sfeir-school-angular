# Code Blocks

## Required slide classes

Any slide containing code **must** carry `with-code` (plus `inconsolata`, the code font) on its `<!-- .slide: class="..." -->` directive:

```md
<!-- .slide: class="with-code inconsolata" -->
```

Without `with-code`, the sizing classes below (`small-code`/`medium-code`/`big-code`) have no effect and code may overflow the slide.

In a multi-column slide, put `with-code inconsolata` on the specific column marker that contains the code (see [multi-column-layouts.md](multi-column-layouts.md)), not necessarily on the whole slide, e.g. `##++## class="with-code inconsolata"`.

## Fenced code blocks

Standard markdown fences with a language tag, highlighted by reveal.js's bundled highlight plugin: ` ```typescript `, ` ```html `, ` ```json `, ` ```bash `, etc.

## Sizing the code block

Right after the closing fence, add `<!-- .element: class="..." -->` with one of three tiers (defined in `docs/scss/angular.scss`):

- `small-code`
- `medium-code` — `font-size: 1.1em; line-height: 2em;`
- `big-code` — `font-size: 1.3em; line-height: 2em;`

Pick the tier based on how much code is on the slide — more/longer snippets need `small-code`, a single short snippet can use `big-code`.

```md
```typescript
providers: [MyService];
```

<!-- .element: class="big-code" -->
```

## Multiple code blocks per slide

`docs/markdown/30-PERFORMANCES/03-LAZYLOAD-COMPONENT.md`:

```md
```typescript
// heavy/heavy-widget.component.ts
...
```

<!-- .element: class="small-code" -->

```html
<!-- host.component.html -->
...
```

<!-- .element: class="small-code" -->
```

Each block gets its own `<!-- .element: -->` sizing comment right after it.

## Emphasizing specific lines

**There is no line-highlighting / step-annotation syntax in this deck** (`data-line-numbers`, bracket ranges like `[1-3]`, etc. — none used, do not introduce them). Instead, emphasize a specific line with an inline comment inside the code itself:

```typescript
providedIn: 'root', // <--provides this service in the root ModuleInjector
```

## Overflow

A CSS safety net caps code block height (`max-height: 800px !important; overflow: auto !important;` in `docs/scss/angular.scss`) — but prefer trimming the snippet or using a smaller sizing tier over relying on scroll.
