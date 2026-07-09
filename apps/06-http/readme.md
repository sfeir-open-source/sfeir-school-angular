# 06 · HTTP Client

> Fetch a random person from a REST API using `httpResource`, and refresh it on demand.

**Folder** `apps/06-http` · **Solution** `apps/06-http-solution` · **Run** `npm run client -- 06-http`

## 🎯 Goal

Replace the local `PEOPLE` mock with **live data**. You'll enable Angular's HTTP client, point it at an environment-configured endpoint, and load a random person with the signal-based `httpResource`.

## 📚 What you'll learn

- How to provide `HttpClient` in a standalone app
- How to keep API URLs in environment files
- How `httpResource` turns an HTTP request into signals (`value()`, `isLoading()`, `error()`) and how to `reload()` it

## ✅ Before you start

- Start the mock API in a separate terminal (it serves the `/peoples` endpoints on port 9000):

  ```bash
  npm run server:start
  ```

## 🛠️ Steps

### Step 1 — Provide the HTTP client

In `main.ts`, register the client in the bootstrap providers:

```typescript
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideHttpClient(withFetch())],
}).catch(console.error);
```

### Step 2 — Configure the API endpoint

In `src/environments/environment.ts`, add the base URL:

```typescript
export const environment = {
  production: false,
  peopleEndpoint: 'http://localhost:9000/api',
};
```

### Step 3 — Create the resource

In `home.component.ts`, declare an `httpResource` that fetches a random person, and a method to reload it:

```typescript
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';

export class HomeComponent {
  personResource = httpResource<People>(() => `${environment.peopleEndpoint}/peoples/random`);

  getRandomPerson(): void {
    this.personResource.reload();
  }
}
```

### Step 4 — Render the resource state

In `home.component.html`, only render the card once the resource has a value:

```html
@if (personResource.hasValue()) {
  @let person = personResource.value();
  <mat-card>
    <mat-card-header>
      <img mat-card-avatar [ngSrc]="person.photo" [alt]="person.firstname + ' ' + person.lastname" width="40" height="40" />
      <mat-card-title>{{ person.firstname }} {{ person.lastname }}</mat-card-title>
      <mat-card-subtitle>{{ person.email }}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>Phone: {{ person.phone }}</p>
      <p>Company: {{ person.entity }}</p>
    </mat-card-content>
  </mat-card>

  <button mat-fab color="primary" (click)="getRandomPerson()">
    <mat-icon>refresh</mat-icon>
  </button>
}
```

## ▶️ Run & verify

```bash
npm run client -- 06-http   # (with `npm run server:start` already running)
```

Open <http://localhost:4200> and check:

- [ ] A person loads automatically on page load
- [ ] The refresh button fetches and displays a **new** random person
- [ ] The card updates on its own — you never touch the DOM

## 💡 Key concepts

- **`httpResource`** — a reactive wrapper around an HTTP GET. It exposes `value()`, `hasValue()`, `isLoading()` and `error()` as signals, and re-fetches whenever its URL (a reactive expression) changes.
- **`reload()`** — forces a re-fetch of the same request, perfect for a "refresh" button.
- **`withFetch()`** — uses the browser Fetch API under the hood (recommended, SSR-friendly).
- **Environment files** — keep endpoints out of your components so builds can swap them per environment.

## 🧯 Troubleshooting

- **CORS / connection errors** — the API isn't running. Start it with `npm run server:start`.
- **Data never appears** — check the Network tab: is the request hitting `http://localhost:9000/api/peoples/random`?
- **`NullInjectorError: No provider for HttpClient`** — you skipped `provideHttpClient()` in `main.ts`.
