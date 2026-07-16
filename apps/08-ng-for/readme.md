# 08 · Rendering Lists with `@for`

> Fetch the full list of people and render it with Angular's `@for` control-flow block.

**Folder** `apps/08-ng-for` · **Solution** `apps/08-ng-for-solution` · **Run** `npm run client -- 08-ng-for`

## 🎯 Goal

Build a **People** page that lists every person returned by the API. You'll fetch the collection, convert the resulting observable into a signal, and loop over it in the template with `@for`.

## 📚 What you'll learn

- The modern `@for` control-flow block (the successor to `*ngFor`) and its `track` and `@empty`
- How to bridge RxJS and signals with `toSignal`
- How to register a second route/view

## ✅ Before you start

- Completion of the routing exercise (07-router)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the People component

Create `PeopleComponent` under `feature/people`. Fetch the list with `HttpClient` and expose it as a signal via `toSignal`:

```typescript
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';

export class PeopleComponent {
  private readonly httpClient = inject(HttpClient);

  people = toSignal(
    this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`),
    { initialValue: [] },
  );
}
```

### Step 2 — Loop with `@for`

In `people.component.html`, iterate over `people()`. **Always** provide a `track` expression, and handle the empty case with `@empty`:

```html
<section>
  @for (person of people(); track person.id) {
    <mat-card appearance="outlined">
      <mat-card-title>{{ person.firstname }} {{ person.lastname }}</mat-card-title>
      <mat-card-subtitle>{{ person.email }}</mat-card-subtitle>
      <!-- …the rest of the card… -->
    </mat-card>
  } @empty {
    No people for the moment
  }
</section>
```

### Step 3 — Register the `people` route

In `main.ts`, add a route so the view is reachable:

```typescript
{ path: 'people', component: PeopleComponent },
```

## ▶️ Run & verify

```bash
npm run client -- 08-ng-for
```

Open <http://localhost:4200> and check:

- [ ] The **List** link navigates to the people page
- [ ] Every person from the API is rendered as a card
- [ ] The home page still shows a random person with a working refresh button

## 💡 Key concepts

- **`@for … track`** — `track` gives each item a stable identity so Angular can move DOM nodes instead of re-creating them. Use a unique id (`person.id`), never the index for dynamic lists.
- **`@empty`** — a first-class "no results" block, no extra `@if` needed.
- **`toSignal`** — subscribes to an observable and exposes its latest value as a signal. Pass `{ initialValue: [] }` so the template has data to render before the first HTTP response arrives.

## 🧯 Troubleshooting

- **Blank list** — is the API running (`npm run server:start`) and reachable at `/api/peoples`?
- **`track` error** — every `@for` must declare a `track` expression.
- **Type errors in template** — the properties you read must exist on the `People` model.
