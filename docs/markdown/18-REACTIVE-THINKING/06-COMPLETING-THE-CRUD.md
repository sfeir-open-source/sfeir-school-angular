<!-- .slide: class="with-code inconsolata" -->

# Completing `People`'s CRUD surface

`People` already has `getPeople()`, `getRandomPerson()`, `removePerson()` and `addPerson()`. The detail page needs the last two:

<br/>

```typescript
// core/provider/people.ts
getPerson(id: string): Observable<Person> {
  return this.http.get<Person>(`${People.baseUrl}/${id}`);
}

updatePerson(id: string, body: UpsertPersonBody): Observable<void> {
  return this.http.put<void>(`${People.baseUrl}/${id}`, body);
}
```

<!-- .element: class="medium-code" -->

<br/>

Read → `GET`, Write → `PUT` — same `People.baseUrl` convention as every other method in the service.

##==##

# `Observable` or resource? Depends on *where* the call starts

<br/><br/>

- **Triggered by a signal that changes over time** (a route param, a search box) → a **resource** (`httpResource`/`rxResource`) — it owns the refetch-on-change lifecycle for you.<br/><br/>
- **Triggered once, imperatively, by a user action** (submit, delete) → a plain **`Observable`** you `.subscribe()` to when the action happens — there's no "reactive source" to derive from, just an event.

<br/>

> `getPerson(id)` reacts to a signal → `rxResource`. `updatePerson(id, body)` reacts to a click → `Observable` + `.subscribe()`. Same service, two different consumption patterns, chosen deliberately.

<!-- .element: class="important center" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Link 5: saving and navigating back

```typescript
// feature/person-details/person-details.ts
import { Location } from '@angular/common';

export class PersonDetails {
  private readonly location = inject(Location);
  private readonly peopleService = inject(People);
  readonly id = input.required<string>();

  goBack(): void {
    this.location.back();
  }

  savePerson(update: UpsertPersonBody): void {
    this.peopleService.updatePerson(this.id(), update).subscribe(() => this.goBack());
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- `Location.back()` (not `Router.navigate`) returns the user to wherever they came from — the staff list, `/home`, or anywhere else that linked here — without hardcoding a destination.
- Notice `savePerson` navigates back **inside** the `subscribe` callback, after the HTTP call actually completes — not before. Navigating first would make the "save" look instant while the request could still fail silently in the background.

##==##

# A preview: resolvers

`PersonDetails` fetches its data **after** the route already activated — you briefly see the loader. An alternative exists: a **resolver**, which fetches data **before** the route activates, so the component only ever renders with data already in hand.

<br/><br/>

```typescript
{ path: 'people/:id', component: PersonDetails, resolve: { person: personResolver } }
```

<!-- .element: class="medium-code center" -->

<br/>

> Resolvers are covered in full depth later in the training, alongside guards — for now, know they exist and what trade-off they make (a blocked navigation vs. a visible loading state).

<!-- .element: class="important center" -->
