# 22 · Route Guards

> Block navigation to `/people/:id` unless the id looks like a real identifier.

**Folder** `apps/22-guards` · **Solution** `apps/22-guards-solution` · **Run** `npm run client -- 22-guards`

## 🎯 Goal

Protect the edit route: only allow it when the id matches the expected format (24 alphanumeric chars). Otherwise, redirect home — before the component ever loads.

## 📚 What you'll learn

- What route guards are and the guard types Angular offers
- How to write a functional `CanMatchFn` guard
- How to redirect with a `UrlTree`

## ✅ Before you start

- Completion of lazy loading (21) — guards pair naturally with `CanMatch`
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the guard

In `core/guards`, create `main-routing-guard.ts`. A `CanMatchFn` returns `true` to allow, or a `UrlTree` to redirect:

```typescript
import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';

const regexId = /[a-z0-9]{24}/;

export const updatePersonGuard: CanMatchFn = (route, segments) => {
  const id = segments[1].path;
  return regexId.test(id) ? true : inject(Router).createUrlTree(['/home']);
};
```

### Step 2 — Apply it to the route

In `main.ts`, guard the `people/:id` route:

```typescript
{
  path: 'people/:id',
  canMatch: [updatePersonGuard],
  loadComponent: async () => (await import('./app/feature/update-person/update-person')).UpdatePerson,
},
```

## ▶️ Run & verify

```bash
npm run client -- 22-guards
```

Try both URLs:

- [ ] `/people/abc123456789012345678901` (24 chars) → the edit page opens
- [ ] `/people/123` → redirected to `/home`

## 💡 Key concepts

- **Guard types** — `CanMatch` (should the route even match?), `CanActivate`, `CanActivateChild`, `CanDeactivate`, `Resolve`.
- **`CanMatch` + lazy loading** — because it runs *before* matching, a failed `CanMatch` skips downloading the lazy chunk entirely — cheaper than `CanActivate`.
- **Functional guards** — plain functions using `inject()`; preferred over class guards for simplicity and tree-shaking.

## 🧯 Troubleshooting

- **Guard never blocks** — confirm it's listed in `canMatch: [...]` and the regex is correct.
- **Redirect loops** — make sure you redirect to a route that isn't itself guarded away.
- **`segments[1]` undefined** — the id is the second segment of `people/:id`; adjust if your path differs.
