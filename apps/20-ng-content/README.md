# 20 — ng-content

The Staff Directory already lists people (as cards or as a list, toggled with the fab button), lets you add one through `DialogPerson`, delete one, and the `/home` screen shows a random person you can refresh — `Card` (`libs/ui/card`) is already fully implemented from an earlier exercise, nothing to touch there. But the loading state is handled the clumsy way: `sfeir-loader` is either dropped inline inside an `@empty` block per view, or the whole template branches with `@if (...) { card } @else { loader }`. The `Loader` component itself is just a bare spinner — it has no inputs, no way to know whether it should actually be showing, and no way to wrap anything. In this exercise you turn `Loader` into a real reusable **overlay wrapper**: it gets a boolean input that controls whether the spinner shows, and — using **`ng-content` / content projection** — it projects whatever content its parent puts inside it, so the same component can wrap the whole staff directory, or just the home screen's card, and show a blocking spinner on top while data is in flight without ever hiding the content underneath.

## 🎯 Learning objectives

- Declaring a boolean **signal input** with `input()`, including a default value and a `transform` (`booleanAttribute`) so the input can be set either as `[isLoading]="expr"` or as a plain boolean HTML attribute
- Using **`<ng-content />`** to project a component's children (arbitrary markup written between its opening/closing tags) into a slot inside its own template, instead of hard-coding what the component renders
- Turning a component into a **transparent wrapper**: projected content always renders, while the component's own markup (here, a spinner overlay) is conditionally layered on top with `@if`
- Deriving a loading `computed()` signal from a resource's own status flags (`isLoading()`, `hasValue()`) instead of tracking loading state by hand
- Managing a manual loading flag around RxJS flows with `tap()` (start) and `finalize()` (always stop, success or error) when you're not working with a `resource`

## 📁 What you're working with

```
libs/ui/
├── loader/
│   ├── loader.ts                                           ← TO REWORK: no isLoading input yet
│   ├── loader.html                                          ← TO REWORK: spinner always renders, no projection
│   └── loader.scss                                          ← complete, nothing to do (`.loader-overlay` already styled)
└── card/                                                     ← complete, nothing to do (already implemented in an earlier exercise)

apps/20-ng-content/src/app/feature/
├── staff-directory/
│   ├── staff-directory.ts                                    ← TO REWORK: no loading signal yet
│   └── staff-directory.html                                  ← TO REWORK: inline <sfeir-loader /> per @empty block
└── home/
    ├── home.ts                                                ← TO REWORK: no derived loading signal yet
    └── home.html                                              ← TO REWORK: @if/@else branches between card and loader
```

`loader.ts` currently has no logic at all:

```ts
@Component({
  selector: 'sfeir-loader',
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {}
```

and `loader.html` is just the raw spinner, unconditional, with nothing projected:

```html
<div class="loader">
  <svg class="circular">...</svg>
</div>
```

`loader.scss` already defines a `.loader-overlay` class (`position: fixed; inset: 0;` with a semi-transparent backdrop) — it's there waiting to be used, you don't need to touch it.

## 📝 Your tasks

### 1. `libs/ui/loader/loader.ts` — add the `isLoading` input (the core signal-input concept)

Add a boolean `input()` named `isLoading`:

- Default it to `true` (so a loader with no binding at all still shows its spinner — useful for the `@empty` style usage you're replacing).
- Give it a `transform: booleanAttribute` option, imported from `@angular/core`, so the input accepts both a bound expression (`[isLoading]="_isLoading()"`) and a plain boolean HTML attribute form.

### 2. `libs/ui/loader/loader.html` — project content and layer the spinner on top (the core `ng-content` concept)

Restructure the template so the component behaves like a transparent wrapper around whatever the parent puts inside `<sfeir-loader>...</sfeir-loader>`:

- Add `<ng-content />` somewhere in the template so the projected content always renders — this is the actual content the caller wants shown (a card, a whole section, a list, anything).
- Wrap the existing spinner markup in an `@if (isLoading())` block, and put the `loader-overlay` class (already styled in `loader.scss`) on the element that wraps that block, so the spinner sits fixed on top of the page as a backdrop only while `isLoading()` is `true`.
- Think of the end result as: projected content underneath, always rendered; spinner overlay above it, conditionally rendered.

### 3. `apps/20-ng-content/src/app/feature/staff-directory/staff-directory.ts` — track loading with RxJS operators

`StaffDirectory` already composes its people list from three merged flows (`_getPersonsFlow`, `_deletePersonFlow`, `_upsertPersonFlow`). Add a private loading `signal<boolean>` (e.g. `_isLoading`) and drive it around each of these operations:

- Use the `tap()` operator to flip it to `true` when a flow starts.
- Use the `finalize()` operator to flip it back to `false` once the flow completes or errors — `finalize()` runs in both cases, unlike a plain `tap()` on the success channel.
- Expose the signal (read-only) so the template can bind to it.

### 4. `apps/20-ng-content/src/app/feature/staff-directory/staff-directory.html` — wrap everything in one loader

Replace the two inline, self-closed `<sfeir-loader />` usages currently sitting inside the `@empty` blocks of the `@switch (view())`. Instead:

- Wrap the *entire* main content — the `<section>` containing the `@switch`, and the `<section class="buttons-fab">` with the add/toggle-view buttons — inside a single `<sfeir-loader [isLoading]="...">...</sfeir-loader>`, binding it to the signal from task 3.
- Remove the old per-case `<sfeir-loader />` self-closing tags entirely; the loader is now one container around everything, using content projection, not a per-branch placeholder.

### 5. `apps/20-ng-content/src/app/feature/home/home.ts` — derive loading from the resource

`Home` already holds `_personResource = this._peopleService.getRandomPerson()` (an `httpResource`). Add a `computed()` signal (e.g. `_isLoading`) that's `true` only while the resource is loading *and* has no value yet — combine `_personResource.isLoading()` with `_personResource.hasValue()`. This avoids showing the overlay again on every refresh once a person is already displayed underneath it.

### 6. `apps/20-ng-content/src/app/feature/home/home.html` — replace the `@if/@else` branch with the loader wrapper

Currently the template branches between rendering `<sfeir-card>` or `<sfeir-loader>` depending on the resource's state. Replace that with a single `<sfeir-loader [isLoading]="_isLoading()">` wrapping the section and the refresh button, rendered unconditionally inside — let the loader's own internal `@if` handle showing/hiding the overlay instead of branching in this template.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 20-ng-content
```

This also starts the `server-rest` mock API the app depends on (`environments/environment.ts` points to `http://localhost:9000/api`) — leave it running, no need to start it separately. `20-ng-content` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
nx build 20-ng-content   # production build
```

## ✅ How to know it's working

- On `/people`, refreshing the page shows a brief spinner overlay on top of the fab buttons and list area, and it disappears once the people have loaded — the buttons and layout stay in the DOM the whole time (no flash of an empty screen, since content is projected, not conditionally rendered).
- Deleting a person, adding a person, and toggling between card/list view all briefly show the overlay again while their request is in flight, then hide it.
- On `/home`, the first load shows the spinner overlay over the button; once the random person loads, the card appears underneath.
- Clicking the refresh button on `/home` again shows the spinner overlay on top of the *existing* card (the card doesn't disappear while the new one loads), then swaps to the new person once loaded.
- `staff-directory.html` and `home.html` no longer contain any self-closed `<sfeir-loader />` tag or `@if (...) { } @else { }` branch between a card/list and a loader — every `<sfeir-loader>` usage now wraps content between an opening and closing tag.
- `Loader` renders correctly even with nothing bound to `isLoading` at all (defaults to showing the spinner) and also accepts a plain `isLoading` attribute without a binding.

## 🛠️ Troubleshooting

- **Projected content never shows, only the spinner (or nothing) appears** — check that `<ng-content />` is actually present in `loader.html`, outside the `@if (isLoading())` block; content placed *inside* the `@if` only renders while loading, which defeats the point.
- **The spinner never appears at all** — confirm you're reading the input as a function call, `isLoading()`, not `isLoading` (it's a signal); and confirm the parent is actually binding a value that becomes `true` at some point (check the `tap()`/`computed()` wiring in tasks 3/5).
- **The spinner appears but nothing is layered on top of the page (e.g. it scrolls with the content instead of staying fixed)** — the wrapping element around the spinner markup needs the `loader-overlay` class from `loader.scss`; if that class is missing or misplaced, the fixed/backdrop styling won't apply.
- **`isLoading` binding shows a template type error** — `input()` with `transform: booleanAttribute` still expects the underlying type to resolve to `boolean`; double check the transform is imported from `@angular/core` and passed as the second argument to `input(true, { transform: booleanAttribute })` (or equivalent), not as a third positional argument.
- **The overlay never turns back off after an error (e.g. a failed delete)** — this is exactly why `finalize()` exists instead of a second `tap()` chained after the success path; a `tap()` on the success channel alone won't run if the Observable errors.
- **Home's card flickers to the loader on every refresh, even though a person is already showing** — the `computed()` needs to check `hasValue()` too; `isLoading()` alone is `true` on every refresh, including refreshes that already have a previous value to keep showing.

## 🙈 Stuck?

Try getting the loader to wrap and project real content on your own first — reasoning through *why* `ng-content` lets a component stay agnostic about what it wraps, and how that's different from the `@if/@else` branching you replaced, is the actual point of this exercise. If you want a reference, `apps/20-ng-content-solution` has a working implementation. Use it to check your approach once your own version works, not as a shortcut to copy from.
