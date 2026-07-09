# 13 · Creating a Custom Pipe

> Build an `na` pipe that shows `N/A` whenever a value is empty, and use it on the manager field.

**Folder** `apps/13-pipe-custom` · **Solution** `apps/13-pipe-custom-solution` · **Run** `npm run client -- 13-pipe-custom`

## 🎯 Goal

Some people have no manager, which currently renders as a blank. Create a reusable `NaPipe` that displays a fallback (`N/A` by default) for `null`/`undefined`/empty values.

## 📚 What you'll learn

- How to generate and implement a custom pipe (`@Pipe` + `PipeTransform`)
- How to accept a pipe **argument** with a default value
- How pipes keep transformation logic out of your components

## ✅ Before you start

- Completion of the built-in pipe exercise (12-pipe-using)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Prepare the structure

In `shared`, create a `pipes` folder to hold your custom pipes.

### Step 2 — Generate & register the pipe

Generate a pipe named `Na` in that folder, and add `NaPipe` to the `CardComponent` `imports`.

### Step 3 — Implement `transform`

A pipe's whole job lives in `transform`. Return the value when it's truthy, otherwise the fallback:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'na' })
export class NaPipe implements PipeTransform {
  transform(value: string, customNa = 'N/A'): string {
    return value || customNa;
  }
}
```

> 💡 `customNa = 'N/A'` is a default parameter — callers can override it: `{{ x | na:'—' }}`.

### Step 4 — Use it in the template

In `card.component.html`, apply the pipe to the manager field:

```html
<div class="contact-info">Manager {{ person().manager | na }}</div>
```

## ▶️ Run & verify

```bash
npm run client -- 13-pipe-custom
```

Open <http://localhost:4200> and check:

- [ ] People **with** a manager show the manager's name
- [ ] People **without** a manager show `N/A` instead of a blank

## 💡 Key concepts

- **`@Pipe` + `PipeTransform`** — the decorator names the pipe; `transform(value, …args)` returns the transformed value.
- **Pipe arguments** — everything after `value` maps to what you pass after the colons in the template.
- **Reusability & readability** — one small class, used anywhere, keeps templates declarative and logic-free.

## 🧯 Troubleshooting

- **`No pipe found with name 'na'`** — the `name` in `@Pipe` must match the template usage, and the pipe must be imported by the component.
- **Fallback never shows** — remember empty string, `null` and `undefined` are all falsy, so `value || customNa` covers them.
