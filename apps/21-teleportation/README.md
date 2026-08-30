# 21 — Teleportation

The Staff Directory can already switch between a card view (`sfeir-card`, fully built in an earlier exercise) and a list view — but the list view is currently just a raw Angular Material `<mat-list>` hard-coded straight into `staff-directory.html`, with the row markup for a person baked directly inside it. That's fine as long as only `staff-directory` ever needs a list, but it means `libs/ui` has no reusable "list" building block: any other feature that wants a Material list with custom row markup would have to copy-paste the same `@for` loop and item template again. In this exercise you build that reusable block: a generic `sfeir-list` component that owns the `<mat-list>` and the iteration, while letting its *caller* decide exactly what each row looks like — by writing that markup as an `<ng-template>` and having the caller's template get **teleported** into the list component and rendered there, once per item, with the right data available inside it.

## 🎯 Learning objectives

- Declaring a template inside a component's content with **`<ng-template>`** and a **template reference variable** (`#item`), instead of hard-coding markup in the child
- Reading a caller's projected `<ng-template>` from inside a component with **`contentChild.required(TemplateRef)`**
- Rendering a captured `TemplateRef` at a different location with **`NgTemplateOutlet`** (the structural directive form, `*ngTemplateOutlet`)
- Passing data into that outlet through its **context object** (`context: { $implicit: item }`) and reading it back in the caller's template with **`let-person`**
- Making a component **generic** (`class List<T extends { id: unknown }>`) so `data` and the template's implicit context stay strongly typed for whatever list of items is passed in
- Combining a **required signal input** (`input.required<T[]>()`) with a **required content query** to build a component that is unusable until both are correctly wired

## 📁 What you're working with

```
libs/ui/list/
├── list.ts                                                   ← TO REWORK: empty component, no logic
├── list.html                                                 ← TO REWORK: completely empty file
└── index.ts                                                   ← complete, nothing to do (already re-exports `./list`)

apps/21-teleportation/src/app/feature/staff-directory/
├── staff-directory.ts                                         ← TO REWORK: doesn't import/use `sfeir-list` yet
└── staff-directory.html                                       ← TO REWORK: 'list' case still uses a bare <mat-list>
```

Everything else in `apps/21-teleportation` (routing, `home`, `dialog-person`, `person-details`, the `core` folder, `Card`, `King`, `Loader`) is already complete from earlier exercises — nothing to touch there.

`libs/ui/list/list.ts` currently has no logic at all:

```ts
@Component({
  selector: 'sfeir-list',
  templateUrl: './list.html',
  imports: [],
})
export class List {}
```

and `list.html` is empty — an empty file, not even a placeholder element.

## 📝 Your tasks

### 1. `libs/ui/list/list.ts` — build the generic, content-driven `List` component

Turn `List` into a component that owns nothing about *how* an item should be rendered, only *that* each item in `data` gets one instance of whatever template the caller provided:

- Make the class generic over `T`, constrained to `T extends { id: unknown }` (the list needs a stable identity per item to track by).
- Add a **required signal input** named `data` typed `T[]`, using `input.required<T[]>()`.
- Add a **required content query** named `itemTemplate` using `contentChild.required(TemplateRef)`, typed so the `TemplateRef`'s context shape matches what you'll pass to it in task 2 (an object exposing the item as the outlet's implicit value).
- Import `TemplateRef`, `input`, and `contentChild` from `@angular/core`, and register whatever directive you use for the outlet (see task 2) in the component's `imports` array — plus Angular Material's list module for the `<mat-list>` you'll render in the template.

### 2. `libs/ui/list/list.html` — iterate and outlet the projected template

Write the template from scratch:

- Wrap everything in a `<mat-list>`.
- `@for` over `data()`, tracking by `item.id`.
- For each item, render the captured `itemTemplate()` at that point using `NgTemplateOutlet` (`*ngTemplateOutlet="..."`), passing the current `item` through the outlet's `context`, under the key that `let-person` expects on the caller's side (i.e. the outlet's implicit value).

### 3. `apps/21-teleportation/src/app/feature/staff-directory/staff-directory.ts` — import `List`

Import `List` from `@sfeir/ui/list` and add it to the component's `imports` array so `<sfeir-list>` can be used in the template.

### 4. `apps/21-teleportation/src/app/feature/staff-directory/staff-directory.html` — replace the raw `<mat-list>` with `<sfeir-list>`

In the `@case ('list')` branch:

- Replace `<mat-list>` and its `@for` loop with `<sfeir-list [data]="_people()">`.
- Move the existing `<mat-list-item>` row markup (photo, name, king badge, entity/email line) inside an `<ng-template>` written as a direct child of `<sfeir-list>`, giving that template a reference variable (e.g. `#item`) and destructuring the projected item with `let-person` so the row markup can keep referencing `person.firstname`, `person.photo`, etc. exactly as before.
- The reference variable's name on `<ng-template #item>` and the query in task 1 don't need to match by name — `contentChild.required(TemplateRef)` grabs *the* template child regardless of what you call it — but keep it descriptive.

## ▶️ How to run the application

From the workspace root:

```bash
npm run serve -- 21-teleportation
```

(equivalent to `npx nx serve 21-teleportation`). This also starts the `server-rest` mock API the app depends on — leave it running, no need to start it separately. `21-teleportation` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
npm run build -- 21-teleportation   # production build
```

## ✅ How to know it's working

- On `/people`, toggling to the list view (the fab button that swaps the icon between grid/list) renders the same rows as before — photo, name, king badge, entity, email — but now through `sfeir-list` instead of a bare `<mat-list>`.
- Adding, deleting, and switching views still work exactly as before; the loader overlay still wraps everything.
- `staff-directory.html`'s `'list'` case no longer contains a `<mat-list>` element or a `@for` loop directly — it only contains `<sfeir-list [data]="...">` with an `<ng-template>` inside it.
- `libs/ui/list/list.html` is no longer empty, and `List` renders correctly for any array of items that have an `id` (it isn't hard-coded to `Person`).
- If you temporarily use `<sfeir-list>` without an `<ng-template>` child, or without a `[data]` binding, Angular should complain loudly (thanks to the `.required` variants) instead of silently rendering nothing.

## 🛠️ Troubleshooting

- **"NG0304: 'sfeir-list' is not a known element" (or the reverse for `ng-template`/outlet)** — check the component's `imports` array in `staff-directory.ts` includes `List`, and `List`'s own `imports` in `list.ts` includes whatever directive renders the outlet.
- **Rows render blank, or `person` is `undefined` inside the `<ng-template>`** — the context object passed to the outlet and the `let-person` on the caller's `<ng-template>` must line up: `let-person` always reads the outlet context's *implicit* value, so the context object needs the item under that specific key, not a custom name.
- **TypeScript complains that `contentChild.required(TemplateRef)` doesn't match `itemTemplate()`'s expected context type** — the generic type parameter you declared on `class List<T>` needs to flow into both the `input.required<T[]>()` type and the `TemplateRef<...>` context type; if one of them is left as `unknown`/`any` implicitly, the two won't line up.
- **Nothing renders and there's no console error at all** — `contentChild.required(...)` throws only if the query genuinely finds nothing; double-check the `<ng-template>` is a *direct* child of `<sfeir-list>` in `staff-directory.html`, not nested inside another element.
- **The list view looks fine but items don't re-render correctly when the underlying array changes** — check the `track item.id` on the `@for` in `list.html`; without it (or with the wrong key) Angular may reuse view state incorrectly across items.

## 🙈 Stuck?

Try building `List` and wiring it into `staff-directory` on your own first — understanding *why* a template can be defined in one component and rendered in another (and how the data gets from the outer scope into the inner one via `let-person`) is the actual point of this exercise. If you want a reference, `apps/21-teleportation-solution` (and its `libs/ui-solution/list`) has a working implementation. Use it to check your approach once your own version works, not as a shortcut to copy from.
