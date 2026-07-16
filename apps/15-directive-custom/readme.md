# 15 · Custom Attribute Directive

> Build a `sfeirBadge` directive that stamps a manager icon next to managers in the list view.

**Folder** `apps/15-directive-custom` · **Solution** `apps/15-directive-custom-solution` · **Run** `npm run client -- 15-directive-custom`

## 🎯 Goal

Create your first custom directive. When a person is a manager, the directive injects a Material icon into its host element — and you'll alias its input so the template reads cleanly.

## 📚 What you'll learn

- How to generate and write an attribute directive
- How to read an aliased signal **input** inside a directive
- How to manipulate the host element safely with `ElementRef` + `Renderer2`, reacting to changes with `effect()`

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the directives folder & directive

In `shared`, create a `directives` folder and generate a `Badge` directive in it.

### Step 2 — Declare an aliased input

Add a required boolean input, exposed to templates under the alias `sfeirBadge`:

```typescript
isManager = input.required<boolean>({ alias: 'sfeirBadge' });
```

> 💡 Aliasing lets the selector and the input share one name — `[sfeirBadge]="…"` sets the value **and** matches the directive.

### Step 3 — Inject the host & renderer, then react

Inject `ElementRef` and `Renderer2`, and use an `effect()` to update the host whenever `isManager` changes:

```typescript
import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({ selector: '[sfeirBadge]' })
export class Badge {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer2 = inject(Renderer2);

  isManager = input.required<boolean>({ alias: 'sfeirBadge' });

  constructor() {
    effect(() => {
      this.renderer2.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        this.isManager() ? '<i class="material-icons">supervisor_account</i>' : '',
      );
    });
  }
}
```

### Step 4 — Use it in the list view

In `people.component.html`, apply the directive right after the person's name in the **list** view, and add `Badge` to the component `imports`:

```html
<span [sfeirBadge]="person.isManager"></span>
```

## ▶️ Run & verify

```bash
npm run client -- 15-directive-custom
```

Open <http://localhost:4200>, switch to the list view, and check:

- [ ] Managers show a `supervisor_account` icon next to their name
- [ ] Non-managers show nothing
- [ ] No error in the DevTools console

## 💡 Key concepts

- **Attribute directive** — attaches behaviour/appearance to an existing element via a `[selector]`, without its own template.
- **`Renderer2`** — the platform-safe way to touch the DOM (works with SSR and avoids direct `nativeElement` mutations).
- **`effect()`** — re-runs whenever any signal it reads changes; here it re-renders the badge each time `isManager` flips.

## 🧯 Troubleshooting

- **No icon appears** — make sure Material Icons is loaded (`index.html`) and you're on the list view.
- **`sfeirBadge` does nothing** — confirm the alias matches the selector and that `Badge` is in the component `imports`.
- **`Required input is not set`** — bind the value: `[sfeirBadge]="person.isManager"`.
