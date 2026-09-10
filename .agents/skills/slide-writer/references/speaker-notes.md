# Speaker Notes

## Syntax

A literal line `Notes:` followed by a markdown bullet list, placed after the slide's visible content and before the next `##==##` separator (or end of file). This is reveal.js's native speaker-notes convention — the theme's preprocessor turns the block into an `<aside class="notes">`.

```md
```typescript
@Directive({ selector: '[ngModel]' })
class NgModelStatus {
  ...
}
```

<!-- .element: class="big-code" -->

Notes:

- here, it sets the class property to valid if the control is valid, or invalid if the control is invalid

##==##
```

## Multi-bullet example

`docs/markdown/19-ADVANCED-ROUTING/02-LAZY-LOADING-ROUTE-DEFINITION.md`:

```md
Notes:

- Destructuring `import()`'s return value directly (e.g. `then(({ staffDirectoryRoutes }) => staffDirectoryRoutes)`) works exactly the same as `.then(m => m.staffDirectoryRoutes)` — both just read the named export off the resolved module object.
- A dynamic `import()` always resolves to a **module namespace object** — you must pick the named export off it, `loadChildren` never accepts the module itself as the routes array.
```

## Single-line example

`docs/markdown/11-COMPONENT-COMMUNICATION/02-OUTPUT.md`:

```md
Notes:

- Inside the child, update it like any signal: `this.value.set(4)`. The parent's `rating` stays in sync automatically.
```

## Rules

- Always use a bullet list under `Notes:`, even for a single note — never a plain paragraph.
- Place the `Notes:` block as the last thing on the slide, right before the `##==##` separator.
- Notes are viewable in the live deck by pressing `S`, or exported to PDF with `?print-pdf&show-notes` (see [build-and-preview.md](build-and-preview.md)).
