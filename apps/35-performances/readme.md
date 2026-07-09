# 35 · Performance Patterns

> Defer heavy UI, split templates into small standalone components, and lazy-load a dialog.

**Folder** `apps/35-performances` · **Solution** `apps/35-performances-solution` · **Run** `npm run client -- 35-performances`

## 🎯 Goal

Make the People feature leaner: render the list view only when it's actually shown, extract it into a small `OnPush` component, and load the "Add person" dialog on demand — reducing the initial bundle and the change-detection workload.

## 📚 What you'll learn

- Deferrable views (`@defer`) to delay heavy template instantiation
- Splitting large templates into standalone, presentational, `OnPush` components
- Lazy-loading a component with a dynamic `import()`

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Extract a `PreviewList` component

Create a standalone, presentational component that receives the people via an input signal and renders a Material list with an efficient `@for … track`:

```typescript
@Component({
  selector: 'sfeir-people-preview-list',
  template: `
    <mat-list>
      @for (person of people(); track person.id) {
        <mat-list-item class="mat-whiteframe-2dp mat-card">
          <img alt="person-image" [ngSrc]="person.photo" matListItemAvatar height="40" width="40" />
          <h3 matListItemLine>
            {{ person.firstname }} {{ person.lastname }}
            <span class="sfeir-badge" [sfeirBadge]="person.isManager"></span>
          </h3>
          <p matListItemLine><span>{{ person.entity }}</span> — <span>{{ person.email }}</span></p>
        </mat-list-item>
      }
    </mat-list>
  `,
  imports: [MatListModule, Badge, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewList {
  people = input.required<People[]>();
}
```

Keep `[ngSrc]` with `width`/`height` to benefit from `NgOptimizedImage`, and keep it a dumb component (no logic in the template).

### Step 2 — Defer the list view

In `people.component.html`, only instantiate the list when the list view is selected:

```html
@case ('list') {
  @defer (when view() === 'list') {
    <sfeir-people-preview-list [people]="people()" />
  }
}
```

### Step 3 — Swap the imports in PeopleComponent

In `people.component.ts`, replace `MatListModule`, `NgOptimizedImage` and `Badge` with just `PreviewList` (keep `CardComponent`, `MatButtonModule`, `MatIconModule` for the card view and buttons).

### Step 4 — Lazy-load the dialog

Load the dialog component only when the user opens it, via a dynamic `import()`:

```typescript
import { defer, filter, merge, Subject, switchMap } from 'rxjs';

private readonly addPeople$ = this.triggerAddPeople$.pipe(
  switchMap(() => defer(async () => (await import('./components/add-person-dialog/add-person-dialog.component')).AddPersonDialogComponent)),
  switchMap(component => this.matDialog.open(component, { width: '50%', height: 'fit-content' }).afterClosed()),
  filter(Boolean),
  switchMap(personForm => this.peopleService.addNewPerson(personForm)),
  switchMap(() => this.retrievePeople$),
);
```

### Step 5 — Keep lists & images efficient

- Every `@for` uses `track person.id`
- Avoid expensive pipes/computations in templates
- Keep images on `[ngSrc]` with explicit `width`/`height`
- Keep the feature on Signals + `ChangeDetectionStrategy.OnPush`

## ▶️ Run & verify

```bash
npm run client -- 35-performances
```

Open the People page, open DevTools → **Network**, and check:

- [ ] Only the card view renders initially
- [ ] Switching to **List** instantiates the deferred list (and fetches its chunk)
- [ ] Clicking **+** downloads the dialog chunk on demand, then refreshes the list after adding

## 💡 Key concepts

- **`@defer`** — delays template instantiation until a trigger/condition (`when`, `on idle`, `on viewport`…). Ideal for heavy or off-screen UI.
- **Dynamic `import()`** — code-splits a component so its code ships only when needed.
- **Standalone `OnPush` components** — smaller render units mean less change-detection work and better readability.

## 🧯 Troubleshooting

- **List renders immediately** — check the `@defer (when view() === 'list')` condition.
- **Dialog still in the main bundle** — make sure it's referenced only through `import()`, not a top-level import.
- **Image warnings** — `NgOptimizedImage` requires `width` and `height` on every `[ngSrc]`.
