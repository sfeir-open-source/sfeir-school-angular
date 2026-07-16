# 02 · Generating a Component with the CLI

> Scaffold a `HomeComponent` with the Nx/Angular generator and boot the app from it.

**Folder** `apps/02-ngg` · **Solution** `apps/02-ngg-solution` · **Run** `npm run client -- 02-ngg`

## 🎯 Goal

Instead of writing a component by hand (like in exercise 01), you'll let the CLI generate one for you, then render it as the application root.

## 📚 What you'll learn

- How to generate a component with `nx generate`
- What files a component is made of and how they fit together
- How the `--dry-run` flag lets you preview a generator before touching the disk

## 🛠️ Steps

### Step 1 — Generate the Home component

From the workshop root, preview the generation first with `--dry-run`:

```bash
npx nx generate @nx/angular:component apps/02-ngg/src/app/feature/home --dry-run
```

`--dry-run` prints the files that **would** be created without writing anything — a safe way to check the path and options. When the output looks right, run the same command **without** `--dry-run` to actually create the component.

### Step 2 — Implement the component

In `home.component.ts`, add a `name` property and import Angular Material's card module:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  name = 'Sfeir';
}
```

In `home.component.html`, render the name inside a card:

```html
<mat-card appearance="outlined">{{ name }}</mat-card>
```

### Step 3 — Bootstrap on the Home component

In `main.ts`, bootstrap `HomeComponent`:

```typescript
bootstrapApplication(HomeComponent, {
  providers: [provideZonelessChangeDetection()],
}).catch(console.error);
```

### Step 4 — Match the selector in `index.html`

The app mounts the tag declared in `index.html`. Update the root element so it matches the component's selector (`sfeir-home`):

```html
<body class="mat-typography">
  <sfeir-home></sfeir-home>
</body>
```

## ▶️ Run & verify

```bash
npm run client -- 02-ngg
```

Open <http://localhost:4200> and check:

- [ ] The home component is rendered (a card showing the name)
- [ ] No error in the DevTools console

## 💡 Key concepts

- **A component = 4 files** — a `.ts` class, an `.html` template, a `.scss` stylesheet and a `.spec.ts` test, generated together and co-located in one folder.
- **`selector`** — the custom HTML tag the component answers to. The bootstrapped component's selector must exist in `index.html`.
- **Feature folders** — components that represent a page/screen live under `feature/`. You'll follow this convention throughout the workshop.

## 🧯 Troubleshooting

- **Generator writes to the wrong place** — double-check the path (`apps/02-ngg/src/app/feature/home`) and re-run with `--dry-run` first.
- **Nothing renders** — confirm the `index.html` tag matches the `sfeir-home` selector and that `main.ts` bootstraps `HomeComponent`.
