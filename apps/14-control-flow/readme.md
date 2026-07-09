# 14 · Control Flow (`@if` / `@for` / `@switch`)

> Toggle the People page between a card view and a list view using the new control-flow blocks.

**Folder** `apps/14-control-flow` · **Solution** `apps/14-control-flow-solution` · **Run** `npm run client -- 14-control-flow`

## 🎯 Goal

Add a button that switches the People view between two layouts. A `view` signal drives a `@switch` that renders either the cards or a Material list — the modern, built-in way to branch templates.

## 📚 What you'll learn

- Angular's control-flow blocks: `@if`, `@for` (with `track` / `@empty`) and `@switch` / `@case`
- How to drive the template from a signal and flip it with `.update()`
- Why control-flow blocks replace the old structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`)

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Add a `view` signal and a toggle

In `people.component.ts`, hold the current view in a signal and flip it on demand:

```typescript
import { signal } from '@angular/core';

export class PeopleComponent {
  // …existing people flow…
  view = signal<'card' | 'list'>('card');

  changeView(): void {
    this.view.update(view => (view === 'card' ? 'list' : 'card'));
  }
}
```

Remember to import `MatListModule`, `NgOptimizedImage`, `MatButtonModule` and `MatIconModule` for the list view and button.

### Step 2 — Branch the template with `@switch`

In `people.component.html`, render one layout per case:

```html
<section>
  @switch (view()) {
    @case ('card') {
      @for (person of people(); track person.id) {
        <sfeir-card [person]="person" (personDelete)="deletePerson($event)" />
      } @empty {
        No Data Yet
      }
    }
    @case ('list') {
      <mat-list>
        @for (person of people(); track person.id) {
          <mat-list-item class="mat-whiteframe-2dp mat-card">
            <img alt="person-image" [ngSrc]="person.photo" matListItemAvatar height="40" width="40" />
            <h3 matListItemLine>{{ person.firstname }} {{ person.lastname }}</h3>
            <p matListItemLine><span>{{ person.entity }}</span> — <span>{{ person.email }}</span></p>
          </mat-list-item>
        }
      </mat-list>
    }
  }
</section>
```

### Step 3 — Add the toggle button

Show the icon that hints the *other* view:

```html
<section class="buttons-fab">
  <button mat-fab color="warn" (click)="changeView()">
    <i class="material-icons">{{ view() === 'card' ? 'list' : 'view_stream' }}</i>
  </button>
</section>
```

## ▶️ Run & verify

```bash
npm run client -- 14-control-flow
```

Open <http://localhost:4200> and check:

- [ ] The People page starts in card view
- [ ] The FAB toggles between card and list layouts
- [ ] The button icon reflects the view you'd switch to
- [ ] The empty state renders when there's no data

## 💡 Key concepts

- **Built-in control flow** — `@if`, `@for`, `@switch` are compiler features (no import needed), with better type-narrowing and performance than `*ngIf`/`*ngFor`/`*ngSwitch`, which are now legacy.
- **`@for … track`** — mandatory `track` keeps DOM reconciliation cheap; `@empty` handles the no-items case.
- **Signal-driven UI** — the template reads `view()`, so calling `.update()` re-renders exactly the affected block.

## 🧯 Troubleshooting

- **List view is unstyled/empty** — did you add `MatListModule` (and `NgOptimizedImage`) to the component `imports`?
- **Nothing toggles** — confirm the button calls `changeView()` and that `view` is a signal.
- **`@for` compile error** — every `@for` needs a `track` expression.
