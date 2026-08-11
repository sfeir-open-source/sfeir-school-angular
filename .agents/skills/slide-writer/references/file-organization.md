# File Organization

## Where slides live

`docs/markdown/` contains one subfolder per training module, numerically prefixed, e.g.:

```
docs/markdown/04-COMPONENTS/
docs/markdown/13-DEPENDENCY-INJECTION/
docs/markdown/17-FORMS/
docs/markdown/17-FORMS/REACTIVE-FORMS/
docs/markdown/24-STATE-MANAGEMENT/NGRX/
docs/markdown/25-UNIT-TESTS/JEST/
```

Inside a module folder, files are numerically-prefixed `.md` files. **One file = one sub-topic**, which itself typically contains multiple slides (see [slide-syntax.md](slide-syntax.md) for the `##==##` separator).

### File-naming conventions

- `00-TRANSITION-SLIDE.md` — the module's opening transition slide (see [special-slide-types.md](special-slide-types.md)).
- `NN-TOPIC-NAME.md` — regular content, numbered in teaching order (`01-CONCEPTS.md`, `02-DI-WORKING.md`, ...).
- `100-LAB.md`, `101-LAB.md`, `102-LAB.md`, ... — hands-on lab/exercise slides, deliberately numbered high (100+) so they sort after all regular content in the folder.
- Nested subfolders group large modules by sub-framework/approach (e.g. `REACTIVE-FORMS/`, `NGRX/`, `JEST/`).

## Registering a file so it actually renders

Dropping a new `.md` file into `markdown/` has **zero effect** on the deck until it is also referenced by relative path in the appropriate `docs/scripts/day_one.js` … `day_four.js` file.

`docs/scripts/slides.js` concatenates the output of `dayOneSlides()` … `dayFourSlides()` (one function per day file) and hands the combined list to `SfeirThemeInitializer.init(...)`.

Example from `docs/scripts/day_one.js`:

```js
function componentsSlides() {
  const COMPONENTS = '04-COMPONENTS';
  return [
    `${COMPONENTS}/00-TRANSITION-SLIDE.md`,
    `${COMPONENTS}/01-CONCEPTS.md`,
    `${COMPONENTS}/100-LAB.md`,
  ];
}
```

**When adding a new slide file**: find the matching module's list function in the correct `day_*.js` file, and insert the new file's relative path (relative to `docs/markdown/`) in teaching order.

## Filtering slides by audience (`typeShow`)

`docs/scripts/utils.js` exposes helpers to tag a slide path with a `typeShow` value:

```js
showByDefault(slide);       // typeShow: 'on-stage'
showOnModern2days(slide);   // typeShow: 'modern-2days'
```

`docs/scripts/slides.js` filters the combined list at render time:

```js
.filter(slide => slide.typeShow == undefined || slide.typeShow.includes(typeShow));
```

Use these wrappers around a file path in the day-list array when a slide should only render for a specific audience/format. If omitted, the slide always shows.

## Localization

A markdown file `XX-slide.EN.md` overrides the default-language `XX-slide.md` when `data-lang=EN` is set (in `index.html` or via URL query). French is the default with no filename suffix.
