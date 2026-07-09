# 23 · Route Resolvers

> Pre-fetch a person's details during navigation, so the edit form has data the instant it renders.

**Folder** `apps/23-resolver` · **Solution** `apps/23-resolver-solution` · **Run** `npm run client -- 23-resolver`

## 🎯 Goal

The UpdatePerson component currently fetches its data *after* it loads, causing a brief loading state. Move that fetch into a **resolver** that runs during routing, and read the result straight from an input.

## 📚 What you'll learn

- What resolvers are and when they beat in-component fetching
- How to write a functional `ResolveFn`
- How resolved data reaches the component (via `withComponentInputBinding`)

## ✅ Before you start

- Completion of guards (22) — you'll extend the same guards file
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Add the resolver

In `core/guards/main-routing-guard.ts`, add a `ResolveFn` that returns the person for the route's `id`:

```typescript
import { type ResolveFn } from '@angular/router';
import type { Observable } from 'rxjs';
import type { People } from '../../shared/models/people.model';
import { PeopleService } from '../providers/people.service';

export const personDetailsResolver: ResolveFn<Observable<People>> = route => {
  const id = route.paramMap.get('id');
  return inject(PeopleService).getPersonDetails(id);
};
```

### Step 2 — Attach it to the route

In `main.ts`, add the resolver under a key (`person`):

```typescript
{
  path: 'people/:id',
  canMatch: [updatePersonGuard],
  resolve: { person: personDetailsResolver },
  loadComponent: async () => (await import('./app/feature/update-person/update-person')).UpdatePerson,
},
```

### Step 3 — Consume the resolved data

In `update-person.ts`, drop the `rxResource` fetch and read the resolved value from a required input named after the resolve key. With `withComponentInputBinding()`, `resolve: { person }` becomes:

```typescript
person = input.required<People>();
```

Update `update-person.html` to use `person()` directly.

## ▶️ Run & verify

```bash
npm run client -- 23-resolver
```

Open an edit page and check:

- [ ] The form is populated **immediately** — no loading flash
- [ ] The data matches the selected person
- [ ] Navigation waits for the resolver before rendering the component

## 💡 Key concepts

- **Resolver** — data-fetching that runs *before* activation, so the component mounts with data ready.
- **Resolve key → input** — the key in `resolve: { … }` maps to an input of the same name via `withComponentInputBinding()`.
- **Trade-off** — resolvers delay navigation until data arrives; keep them fast (or add a global loading indicator).

## 🧯 Troubleshooting

- **`person` is undefined** — the input name must match the resolve key, and `withComponentInputBinding()` must be enabled.
- **Navigation hangs** — the resolver's observable must complete/emit; check the API is reachable.
- **Still see a loading flash** — make sure you removed the in-component `rxResource` fetch.
