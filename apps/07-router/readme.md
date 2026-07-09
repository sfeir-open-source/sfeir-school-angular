# 07 · Routing

> Turn the app into a single-page application with client-side navigation via the Angular Router.

**Folder** `apps/07-router` · **Solution** `apps/07-router-solution` · **Run** `npm run client -- 07-router`

## 🎯 Goal

Introduce the router so views are swapped in a `<router-outlet>` based on the URL — no full page reloads. You'll define routes, add a `routerLink`, and render the active route.

## 📚 What you'll learn

- How to provide and configure the router in a standalone app
- How to declare routes (including a default redirect)
- The difference between `routerLink` and a plain `href`, plus `<router-outlet>`

## ✅ Before you start

- Completion of the HTTP exercise (06-http)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Provide the router with routes

In `main.ts`, define a `Routes` array and register it. Redirect the empty path to `home`:

```typescript
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/feature/home/home.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideRouter(ROUTES), provideHttpClient(withFetch())],
}).catch(console.error);
```

### Step 2 — Import the router directives in the shell

In `app.component.ts`, add `RouterOutlet` and `RouterLink` to the `imports`:

```typescript
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
```

### Step 3 — Add navigation and the outlet

In `app.component.html`, use `routerLink` for internal navigation and render the active route with `<router-outlet />`:

```html
<mat-toolbar class="extend-toolbar">
  <span>
    <a [routerLink]="['home']">
      <img src="assets/images/logo-sfeir.svg" aria-label="sfeir" alt="Sfeir" />
    </a>
  </span>

  <span class="flex"></span>

  <span>
    <a href="/locator">Maps</a>
    <a href="/people">List</a>
  </span>
</mat-toolbar>

<router-outlet />
```

## ▶️ Run & verify

```bash
npm run client -- 07-router
```

Open <http://localhost:4200> and check:

- [ ] Visiting `/` redirects to `/home`
- [ ] The home view renders inside the outlet with its refresh button working
- [ ] Clicking the logo (a `routerLink`) navigates **without** a full page reload

## 💡 Key concepts

- **`provideRouter(ROUTES)`** — the standalone way to enable routing (replaces `RouterModule.forRoot`).
- **`routerLink` vs `href`** — `routerLink` navigates client-side (no reload, preserves app state); `href` triggers a full browser navigation. The `Maps`/`List` links still use `href` on purpose — you'll wire them up in later exercises.
- **`<router-outlet>`** — the placeholder where the router renders the component matching the current URL.

## 🧯 Troubleshooting

- **`'router-outlet' is not a known element`** — add `RouterOutlet` to the component's `imports`.
- **Links do a full reload** — you used `href` where you meant `[routerLink]`.
- **Blank page at `/`** — check the redirect route uses `pathMatch: 'full'`.
