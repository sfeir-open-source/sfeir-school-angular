# 10 — Control Flow

The toolbar's "List" link (`/people`) has been dead since `09-router` — clicking it changes the URL but nothing renders, exactly like `/locator` still does today. In this exercise you'll bring it to life: a new `StaffDirectory` feature that lists **every** person from the mock data, not just one at a time like `Home` does, and can switch between a card grid and a Material list on demand. You'll build this template using Angular's built-in **control flow blocks** (`@switch`/`@case` and `@for`) instead of the old structural directives (`*ngSwitch`, `*ngFor`) — they're now part of the template syntax itself, not something you import.

## 🎯 Learning objectives

- Understanding Angular's built-in control flow blocks (`@if`, `@for`, `@switch`) as first-class template syntax compiled directly by Angular, replacing the structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`) from older Angular — no import needed, no `CommonModule` dependency
- Using **`@switch` / `@case`** to branch a template on a signal's current value, rendering exactly one of several mutually-exclusive blocks — the same job `*ngSwitch`/`*ngSwitchCase` used to do, now with clearer, non-directive syntax
- Using **`@for`** with its **mandatory `track` expression** — unlike the old `*ngFor`, you cannot omit tracking; Angular forces you to tell it how to identify each item across re-renders, which is central to how it reuses/reorders DOM nodes efficiently instead of destroying and recreating everything
- Choosing a **stable identity** for `track` (a person's `id`) instead of array index — and understanding why index-based tracking silently breaks identity when the underlying array is reordered or an item is removed from the middle
- Driving two structurally different templates (a card grid, a Material list) off of **one signal** holding UI state (`'card' | 'list'`), and toggling it with `signal.update()`
- Reusing components you already built in earlier exercises (`Card` from `libs/ui/card`, the `King` directive from `libs/ui/king`) in a brand-new context, proving they were built generically enough to work outside `Home`
- Extending a provider (`People`) with new read/write-shaped methods that return **new arrays** rather than mutating the mock data in place — keeping data flow through signals predictable

## 📁 What you're working with

This exercise assumes `libs/ui/card` and `libs/ui/king` are already in the state you left them at the end of `08-directive` (full profile card markup, the crown directive working) — nothing in `libs/ui` needs to change here.

```
apps/10-control-flow/
├── src/app/
│   ├── app.config.ts   ✅ complete — provideRouter(APP_ROUTES) already wired in
│   ├── app.route.ts    🚧 to do — has routes for '' and 'home', missing the 'people' route
│   ├── app.ts           ✅ complete — nothing to do here
│   ├── app.html          ✅ complete — the "List" link already points at /people
│   ├── app.scss          ✅ complete — nothing to do here
│   ├── core/provider/
│   │   └── people.ts    🚧 to do — has getFirstPerson()/getRandomPerson(), missing two methods
│   └── feature/
│       ├── home/         ✅ complete — same Home you already know, unchanged
│       └── staff-directory/  🚧 to create — this folder doesn't exist yet
├── static/
│   ├── people.html      📋 reference sketch — plain HTML you'll turn into a real Angular template
│   └── people.scss      📋 reference styling — close to what the final component needs
```

The `static/` folder is not part of the Angular build — it's a plain HTML/SCSS sketch of what the two views (card and list) should roughly look like, so you have a visual target without having to invent markup from scratch. It intentionally has no Angular syntax at all (no bindings, no control flow, both views hardcoded to render at once) — turning it into a working, data-driven component is your job.

## 📝 Your tasks

### 1. `core/provider/people.ts` — give the service what the directory needs

`Home` only ever needed one person at a time. `StaffDirectory` needs the whole list, and a way to remove someone from it. Add two methods to the `People` class:

- One that returns the **entire** list of people as an array — think about what you already have available on the mock data import used by the existing methods.
- One that takes a person's `id` and returns a **new array** with that person removed, leaving the original data untouched. Look for an array method that returns a new array with elements removed at a given index, rather than mutating in place (there's a fairly recent addition to `Array.prototype` for exactly this — the same idea as `slice`, but pruning instead of extracting).

### 2. `feature/staff-directory/` — build the new feature component

Create `staff-directory.ts`, `staff-directory.html` and `staff-directory.scss`.

**`staff-directory.ts`**

- Inject `People` the same way `Home` does.
- Hold the list of people in a signal, initialized from the service method you just wrote.
- Hold the current view mode in a second signal, typed with the `UiView` type exported from `@sfeir/types` (`'card' | 'list'`), starting on whichever mode makes sense as a default.
- A method that handles deletion: given a person's `id`, ask the service for the updated list and write it back into the people signal.
- A method that toggles the view signal between its two possible values — `signal.update()` with a small conditional is the idiomatic way to flip between two known states.
- Import and register whatever this component's template ends up needing in its `imports` array: `Card` (from `@sfeir/ui/card`), `King` (from `@sfeir/ui/king`), and the Angular Material list module for the list view, plus anything else your template requires (an image directive, a button module) — same pattern as `Home` and the `Card` component itself.

**`staff-directory.html`**

Use `static/people.html` as your visual reference, but rebuild it with real Angular:

- Wrap the two views in an `@switch` on your view signal, with one `@case` per mode.
- In the card-view case, loop over the people signal with `@for` and render one `<sfeir-card>` per person — same inputs/outputs `Home` already uses (`person`, and the delete event), wired to your new delete handler instead of `Home`'s refresh.
- In the list-view case, loop over the same people signal with `@for` and render one Material list item per person, showing at least their name, entity and email — check `static/people.html` for the exact structure to model, including where the `King`-directive `<span>` goes next to the name.
- Every `@for` needs a `track` expression — track by the person's `id`, not by index.
- Wire a button (see the reference markup for its role) to your view-toggle method, and make its icon reflect the _other_ mode you'd switch to — an interpolated ternary reading your view signal is enough for that, no control-flow block needed for a single icon swap.

**`staff-directory.scss`**

Start from `static/people.scss` — it's already close to what you need. You're free to refine it (e.g. making the list view read better on wider screens) once the structure works.

### 3. `app.route.ts` — wire the feature into the router

- Import `StaffDirectory` from `./feature/staff-directory/staff-directory`, the same way `Home` is already imported.
- Add a new entry to `APP_ROUTES` mapping the `people` path to it, following the exact shape of the existing `home` route entry.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 10-control-flow   # dev server → http://localhost:4200
npx nx test 10-control-flow    # run the app's unit tests with vitest
npx nx lint 10-control-flow    # lint the app with eslint
npx nx build 10-control-flow   # production build
```

## ✅ How to know it's working

Serve the app and open it in the browser:

- Clicking "List" in the toolbar navigates to `/people` and now actually renders something — a grid of profile cards for **every** person in the mock data, not just one.
- Clicking the floating action button switches the whole screen to a Material list of the same people, and its icon flips to reflect the mode you'd switch back to.
- Deleting a card (or, in list view, whatever removal affordance you wired) removes exactly that one person and the count of rendered items drops by one — the rest stay untouched.
- Managers show the crown icon next to their name in **both** views — proof that `King` works outside of `Card`'s own template too.
- `/home` still behaves exactly as before — this exercise doesn't touch it.
- No console errors about unknown elements (`mat-list`, `mat-list-item`) or unregistered directives/attributes.

## 🛠️ Troubleshooting

- **`@for` gives a compiler error about a missing "track" expression**: unlike the old `*ngFor`, `@for` requires `track` — add `track person.id` (or your loop variable's `.id`) right after the `of` expression.
- **A `@case` never renders even though the view signal has that value**: `@switch`/`@case` compare with strict equality — make sure the string literal in `@case (...)` matches your `UiView` values exactly (case-sensitive, no extra whitespace).
- **The crown never appears in list view, even for a manager**: `King` needs to be in `StaffDirectory`'s own `imports` array — importing it on `Card` doesn't make it available to a different component's template.
- **`NG8001` about `mat-list`/`mat-list-item` not being known elements**: the Material list module isn't in `StaffDirectory`'s `imports` array.
- **Deleting never shrinks the list, or throws about a missing method**: check `removePerson`/`getPeople` actually exist on `People` and are being called — and that your delete handler `set`s the people signal with the array the service _returns_, rather than trying to mutate the existing array in place.
- **Visiting `/people` shows a blank page or a "cannot match any routes" error**: `app.route.ts` is missing the new route entry, or the `StaffDirectory` import path/name has a typo.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 10-control-flow` explicitly.

## 🙈 Stuck?

Try building the service methods, the component and the route yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/10-control-flow-solution` is a complete, working version — including `people.spec.ts`, `staff-directory.spec.ts`, `home.spec.ts` and `app.spec.ts`, which document the exact expected behavior of every piece. Use it to check your approach once you've made a real attempt, not as a starting point to copy from.
