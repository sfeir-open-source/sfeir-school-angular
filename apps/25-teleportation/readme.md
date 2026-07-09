# 25 · Template Teleportation

> Define a template in one component and render it inside another with `TemplateRef` + `ngTemplateOutlet`.

**Folder** `apps/25-teleportation` · **Solution** `apps/25-teleportation-solution` · **Run** `npm run client -- 25-teleportation`

## 🎯 Goal

Move the toolbar markup out of `AppComponent`'s inline layout and into a reusable `Header` component — but keep *defining* the template in the app. The header just renders whatever template it's handed.

## 📚 What you'll learn

- How `ng-template`, `TemplateRef` and `ngTemplateOutlet` work together
- How to pass a template to a child as an input
- Why this decouples "what to render" from "where to render it"

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the Header component

Under `core/components/header`, create a component that accepts a `TemplateRef` input and renders it:

```typescript
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sfeir-header',
  imports: [NgTemplateOutlet],
  template: `<ng-template [ngTemplateOutlet]="headerTemplate()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  headerTemplate = input.required<TemplateRef<undefined>>();
}
```

### Step 2 — Provide the template from the app

In `app.component.html`, wrap the toolbar in an `ng-template` with a reference, then hand that reference to the header:

```html
<ng-template #headerTemplate>
  <mat-toolbar class="extend-toolbar">
    <!-- logo + nav links -->
  </mat-toolbar>
</ng-template>

<sfeir-header [headerTemplate]="headerTemplate" />

<router-outlet />
```

Import `Header` in `app.component.ts`.

## ▶️ Run & verify

```bash
npm run client -- 25-teleportation
```

Open <http://localhost:4200> and check:

- [ ] The header renders at the top, identical to before
- [ ] Navigation still works
- [ ] The toolbar markup now lives in a template that `Header` renders

## 💡 Key concepts

- **`#ref` on `ng-template`** — captures a `TemplateRef` you can pass around like any value.
- **`ngTemplateOutlet`** — stamps a `TemplateRef` into the DOM at that spot, optionally with a context object.
- **Separation of concerns** — `Header` owns *rendering*; the app owns *content*. The same header can display different templates in different screens.

## 🧯 Troubleshooting

- **Nothing renders** — confirm you pass the template reference (`[headerTemplate]="headerTemplate"`), not a string.
- **`headerTemplate` required error** — the `#headerTemplate` `ng-template` must exist before `<sfeir-header>` uses it.

## 🚀 Going further

Add a context so the template can receive data:

```typescript
headerTemplate = input.required<TemplateRef<{ $implicit: string }>>();
```

```html
<ng-template [ngTemplateOutlet]="headerTemplate()" [ngTemplateOutletContext]="{ $implicit: 'Hello' }" />
<ng-template #headerTemplate let-message><mat-toolbar>{{ message }}</mat-toolbar></ng-template>
```
