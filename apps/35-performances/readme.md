# 35-performances (dossier apps/35-performances)

In this exercise, you'll improve an Angular feature by applying practical performance patterns. You'll learn how to defer heavy UI, split templates into lightweight, standalone components, and lazy‑load parts of the UI to reduce the initial bundle and change detection work.

## Why Performance Matters in Angular?

Optimizing rendering and loading in Angular makes your app feel faster and more responsive, especially on slower devices. In this workshop, you will:

- Defer rendering of heavy views until they are actually needed
- Extract large templates into small standalone components with OnPush change detection
- Lazy‑load secondary UI (like dialogs) to shrink the main bundle
- Keep lists efficient using `trackBy` and optimized images

These patterns help reduce the amount of work Angular does at startup and during change detection.

## What You'll Build

- A `PreviewList` standalone component displaying people in a Material list
- A list view that is rendered lazily using Angular deferrable views (`@defer`)
- A dialog that is opened via dynamic import (lazy‑loaded component)

By the end, your app will only render the card view initially, render the list view on demand, and load the dialog code only when the user asks to open it.

## Step 1: Create a PreviewList standalone component

Create `feature/people/components/preview-list/preview-list.ts` as a standalone component receiving the list of people via an input signal.

This component should:

- Import `MatListModule`, `NgOptimizedImage`, and your `Badge` directive
- Use `ChangeDetectionStrategy.OnPush` implicitly via standalone pattern
- Accept an `input.required<People[]>()` called `people`
- Render a Material list with an efficient `@for` loop and `track person.id`

Example shape (not full code):

Notes:

- Keep `<img [ngSrc] ...>` with `width` and `height` to benefit from `NgOptimizedImage`.
- Avoid logic in the template; this should remain a dumb/presentational component.

## Step 2: Defer the list view with `@defer`

Open `feature/people/people.component.html` and replace the existing inline list markup with a deferrable view that renders the list only when the list view is selected.

Replace the `@case('list')` block content with something like:

This ensures the heavy list DOM is not created until the user switches to the list view.

## Step 3: Use the new component in PeopleComponent

Open `feature/people/people.component.ts` and update the component `imports` to use `PreviewList` instead of directly importing `MatListModule`, `NgOptimizedImage`, and `Badge` here.

- Remove: `MatListModule`, `NgOptimizedImage`, `Badge` from the `imports` array
- Add: `PreviewList`

Keep `CardComponent`, `MatButtonModule`, and `MatIconModule` as they are used by the card view and action buttons.

## Step 4: Lazy‑load the dialog component

Still in `people.component.ts`, change the way you open the "Add person" dialog so that the dialog component is loaded only when the user opens it.

- Replace the direct reference to `AddPersonDialogComponent` with a dynamic import
- Use `defer` + `import()` to get the component type, then pass it to `MatDialog.open`

This removes the dialog code from the initial bundle and loads it only on demand.

## Step 5: Keep lists efficient

- Ensure every `@for` uses `track person.id`
- Prefer simple bindings and avoid expensive pipes/computations in template
- Keep images optimized with `[ngSrc]` and explicit `width/height`

## Step 6: Verify change detection strategy

The feature already uses Signals and `ChangeDetectionStrategy.OnPush`. Keep it that way for minimal change detection work.

## Step 7: Run the app

Verify your work by running the application:

```bash
npm run client -- 35-performances
```

Then:

1. Open the People page
2. Switch between Card and List views
3. Observe that the List view renders only when selected
4. Click the “+” button to open the dialog; the dialog component should load on demand and refresh the list after adding a person

## Advanced Concepts

### Deferrable Views (`@defer`)

Deferrable views let you delay template instantiation until a condition is met. Use them for heavy or off‑screen UI. Here, the entire list view is deferred until the user switches to it.

### Lazy‑loading Components with `import()`

Using dynamic `import()` lets you load components on demand (e.g., dialogs, modals, editors). This keeps the main bundle smaller and improves first‑load performance.

### Standalone Presentational Components

Splitting large templates into small, standalone, OnPush components reduces re‑rendering and improves readability. The `PreviewList` component is a good example of a dumb component that just renders inputs.

By completing this exercise, you've learned practical techniques to make Angular apps more responsive by deferring work, splitting UI, and lazy‑loading only what users need.
