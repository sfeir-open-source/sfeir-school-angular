# 03 · Component Hierarchy

> Nest the `HomeComponent` inside the `AppComponent` to build your first parent → child relationship.

**Folder** `apps/03-cpt-hierarchy` · **Solution** `apps/03-cpt-hierarchy-solution` · **Run** `npm run client -- 03-cpt-hierarchy`

## 🎯 Goal

So far each app booted from a single component. Real applications are trees of components. Here you'll make `AppComponent` (the shell, with the toolbar) render `HomeComponent` (the content) inside it.

## 📚 What you'll learn

- How components compose into a hierarchy
- How a parent renders a child by importing it and using its selector
- Which component should be the application's entry point

## 🛠️ Steps

### Step 1 — Render the child in the parent template

In `app.component.html`, replace the `<mat-card>…</mat-card>` block with the home component's selector:

```html
<sfeir-home />
```

Then declare `HomeComponent` in the parent's `imports` so Angular knows the `sfeir-home` tag:

```typescript
// app.component.ts
import { HomeComponent } from './feature/home/home.component';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbarModule, HomeComponent], // 👈 add HomeComponent
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
```

> 💡 With standalone components there's no module to register the child in — you import it **directly** into the component that uses it.

### Step 2 — Bootstrap the shell, not the child

In `main.ts`, boot from `AppComponent` (the top of the tree) instead of `HomeComponent`:

```typescript
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
}).catch(console.error);
```

### Step 3 — Match the root selector in `index.html`

Update the mounted tag to the shell's selector:

```html
<sfeir-app></sfeir-app>
```

## ▶️ Run & verify

```bash
npm run client -- 03-cpt-hierarchy
```

Open <http://localhost:4200> and check:

- [ ] The toolbar (from `AppComponent`) and the card (from `HomeComponent`) both appear
- [ ] The home content is rendered **inside** the app shell
- [ ] No error in the DevTools console

## 💡 Key concepts

- **Composition** — a template can reference any component listed in its `imports`, forming a parent/child tree.
- **Smart shell + feature components** — `AppComponent` provides the layout; feature components fill it in. This separation scales as the app grows.
- **One entry point** — bootstrap the root of the tree; everything else is rendered through it.

## 🧯 Troubleshooting

- **`sfeir-home` is not a known element** — you forgot to add `HomeComponent` to `AppComponent`'s `imports`.
- **Only the card shows (no toolbar)** — you're still bootstrapping `HomeComponent`; switch to `AppComponent` in `main.ts`.
