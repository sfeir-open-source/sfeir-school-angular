# 21 · Lazy Loading Routes

> Load feature components only when their route is visited, shrinking the initial bundle.

**Folder** `apps/21-lazyloading` · **Solution** `apps/21-lazyloading-solution` · **Run** `npm run client -- 21-lazyloading`

## 🎯 Goal

Today every component is imported eagerly in `main.ts`, so it all ships in the first bundle. Switch the People and UpdatePerson routes to **lazy loading** so their code is fetched on demand.

## 📚 What you'll learn

- The difference between eager and lazy route loading
- How to lazy-load a standalone component with `loadComponent` + dynamic `import()`
- How to confirm code-splitting in the Network tab

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Notice the eager imports

`main.ts` currently imports each feature component at the top and references it via `component:`. Everything loads at startup, even routes the user never visits.

### Step 2 — Lazy-load People

Remove the top-level `PeopleComponent` import and switch the route to `loadComponent`:

```typescript
{
  path: 'people',
  loadComponent: async () => (await import('./app/feature/people/people.component')).PeopleComponent,
},
```

### Step 3 — Lazy-load UpdatePerson

Do the same for the parameterized route:

```typescript
{
  path: 'people/:id',
  loadComponent: async () => (await import('./app/feature/update-person/update-person')).UpdatePerson,
},
```

## ▶️ Run & verify

```bash
npm run client -- 21-lazyloading
```

Open <http://localhost:4200>, open DevTools → **Network**, filter by JS, and check:

- [ ] On first load, only the main + Home code is fetched
- [ ] Navigating to **People** downloads a **new** chunk
- [ ] Editing a person downloads the UpdatePerson chunk on demand

## 💡 Key concepts

- **`loadComponent`** — the standalone way to lazy-load a single component; `import()` creates a separate bundle the router fetches when the route activates.
- **Bundle splitting** — deferring rarely-used features improves first paint and time-to-interactive.
- **Preloading (going further)** — `withPreloading(PreloadAllModules)` can warm lazy chunks in the background after the app boots.

## 🧯 Troubleshooting

- **`Cannot find module`** — check the import path and that the export name (`PeopleComponent`) matches.
- **No extra chunk appears** — you likely left the eager `import` at the top of `main.ts`; remove it.
