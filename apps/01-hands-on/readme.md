# 01 · Bootstrapping an Angular Application

> Fix the broken startup so the app boots and renders your first component on screen.

**Folder** `apps/01-hands-on` · **Solution** `apps/01-hands-on-solution` · **Run** `npm run client -- 01-hands-on`

## 🎯 Goal

Right now the application does **not** start: open it and you'll see an error in the browser's DevTools console. The `main.ts` file never bootstraps a component. Your job is to create the root component and boot the app from it.

By the end, the page shows your name inside a Material card.

## 📚 What you'll learn

- What "bootstrapping" a standalone Angular application means
- How a component ties together a TypeScript class, an HTML template and a selector
- How to display a class property in the template with **interpolation** (`{{ }}`)

## 🛠️ Steps

### Step 1 — Create the root component

In `src/app`, create `app.component.ts`. The template (`app.component.html`) and styles already exist — you only need to wire up the class:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatCardModule, MatToolbarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'SFEIR'; // 👈 put your own first name here
}
```

> 💡 The `selector` **must** be `sfeir-app` — that's the tag `index.html` looks for (`<sfeir-app>`).

### Step 2 — Display the name with interpolation

In `app.component.html`, the `<mat-card>` currently holds a placeholder comment. Replace it so it renders the `name` property:

```html
<mat-card appearance="outlined">{{ name }}</mat-card>
```

`{{ name }}` is Angular's **interpolation** syntax: it evaluates the expression and prints the result as text.

### Step 3 — Bootstrap the component

Open `main.ts`. It's currently missing the bootstrap call. Replace its content with:

```typescript
import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
}).catch(console.error);
```

## ▶️ Run & verify

```bash
npm run client -- 01-hands-on
```

Then open <http://localhost:4200> and check:

- [ ] The SFEIR toolbar is displayed at the top
- [ ] A card shows your name
- [ ] **No error** remains in the DevTools console

## 💡 Key concepts

- **Standalone bootstrap** — Modern Angular boots directly from a component with `bootstrapApplication()`, no `AppModule` required.
- **Zoneless change detection** — This workshop runs without Zone.js (`provideZonelessChangeDetection()`); Angular reacts to **signals** instead. You'll use signals from the very next exercises.
- **`OnPush`** — Every component here uses `ChangeDetectionStrategy.OnPush` for predictable, efficient rendering.

## 🧯 Troubleshooting

- **Blank page / console error** — Make sure the `selector` is `sfeir-app` and that `main.ts` imports and bootstraps `AppComponent`.
- **`name` not displayed** — Check you used double curly braces `{{ name }}`, not a single set.
