# 11 · Services & Dependency Injection

> Move every HTTP call into an injectable `PeopleService` so components stop talking to the network directly.

**Folder** `apps/11-service` · **Solution** `apps/11-service-solution` · **Run** `npm run client -- 11-service`

## 🎯 Goal

Right now the Home and People components each build their own HTTP requests. Extract that logic into a single `PeopleService`, inject it, and let components focus on the UI — the single-responsibility principle in action.

## 📚 What you'll learn

- How to create an injectable service with `@Injectable({ providedIn: 'root' })`
- How to inject dependencies with `inject()`
- Why a service layer improves testability and reuse

## ✅ Before you start

- Completion of the outputs exercise (10-output)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the People service

Generate `PeopleService` in `core/providers` and centralize the three operations:

```typescript
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly httpClient = inject(HttpClient);

  getPeople(): Observable<Array<People>> {
    return this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`);
  }

  getRandomPeople(): HttpResourceRef<People> {
    return httpResource(() => `${environment.peopleEndpoint}/peoples/random`);
  }

  deletePeople(personId: string): Observable<Array<People>> {
    return this.httpClient.delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${personId}`);
  }
}
```

### Step 2 — Use the service in Home

Inject the service and get the random-person resource from it:

```typescript
export class HomeComponent {
  private readonly peopleService = inject(PeopleService);

  personResource = this.peopleService.getRandomPeople();

  getRandomPerson(): void {
    this.personResource.reload();
  }
}
```

### Step 3 — Use the service in People

Inject the service and replace the inline `httpClient` calls with `getPeople()` and `deletePeople(id)` in your RxJS flow.

## ▶️ Run & verify

```bash
npm run client -- 11-service
```

Open <http://localhost:4200> and check:

- [ ] Home still shows a random person and refreshes
- [ ] People still lists everyone and deletion still works
- [ ] The behaviour is identical — you only moved *where* the code lives

## 💡 Key concepts

- **`providedIn: 'root'`** — registers a tree-shakable **singleton**: one shared instance for the whole app, created only if something injects it.
- **`inject()`** — the modern functional way to grab a dependency, usable in field initializers.
- **Service layer** — components describe *what* they need; the service knows *how* to get it. Swapping the data source later touches one file.

## 🧯 Troubleshooting

- **`No provider for PeopleService`** — ensure the `@Injectable({ providedIn: 'root' })` decorator is present.
- **Circular/undefined at construction** — inject with `inject(PeopleService)` in a field, not before the class is set up.
- **No data** — verify the endpoint in `environment.ts` and that the API is running.
