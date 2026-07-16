# 18 · Edit Mode (Reusing the Form)

> Reuse the person form to **edit** an existing person, pre-filled from a route parameter.

**Folder** `apps/18-template-driven-form-update-mode` · **Solution** `apps/18-template-driven-form-update-mode-solution` · **Run** `npm run client -- 18-template-driven-form-update-mode`

## 🎯 Goal

Add an update flow: clicking a card's edit icon navigates to `/people/:id`, loads that person, pre-fills the form, and saves changes with `PUT`. The same `Form` component now serves both create and edit.

## 📚 What you'll learn

- Route parameters bound straight to a component input (`withComponentInputBinding`)
- Loading data reactively with `rxResource`
- Giving the form component an optional `person` input so it works in both modes

## ✅ Before you start

- Completion of the form-validation exercise (17)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the UpdatePerson component & route

Create `UpdatePerson` under `feature/update-person`, then register the parameterized route. Enable input binding so `:id` maps to an input:

```typescript
// main.ts
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';

const ROUTES: Routes = [
  // …existing routes…
  { path: 'people/:id', component: UpdatePerson },
];

providers: [
  provideRouter(ROUTES, withComponentInputBinding()),
  // …
];
```

### Step 2 — Link the edit button

In `card.component.html`, make the edit icon navigate with `routerLink`:

```html
<a mat-button title="Edit" [routerLink]="['/people', person().id]">
  <mat-icon>create</mat-icon>
</a>
```

### Step 3 — Add the service methods

In `people.service.ts`:

```typescript
getPersonDetails(personId: string): Observable<People> {
  return this.httpClient.get<People>(`${environment.peopleEndpoint}/peoples/${personId}`);
}

updatePerson(person: PeopleForm): Observable<void> {
  return this.httpClient.put<void>(`${environment.peopleEndpoint}/peoples/${person.id}`, person);
}
```

### Step 4 — Load the person in UpdatePerson

`withComponentInputBinding` feeds the `:id` param into a matching input. Load the details with `rxResource`, and add save/back handlers:

```typescript
export class UpdatePerson {
  private readonly peopleService = inject(PeopleService);
  private readonly location = inject(Location);

  id = input.required<string>();
  peopleResource = rxResource({
    params: this.id,
    stream: ({ params: personId }) => this.peopleService.getPersonDetails(personId),
  });

  updatePerson(person: PeopleForm): void {
    this.peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
```

### Step 5 — Make the form accept a person

In `form.ts`, add an optional `person` input (with a default photo) and emit it on submit:

```typescript
person = input<PeopleForm>({ photo: 'https://randomuser.me/api/portraits/lego/6.jpg' } as PeopleForm);

submit(): void {
  this.save.emit(this.person());
}
```

Bind `[(ngModel)]` in the template to the `person()` fields so the form is pre-filled in edit mode.

### Step 6 — Render the form in edit mode

In `update-person.html`, show the form once the resource has a value, feeding it the loaded person and wiring `(save)` / `(cancel)` to `updatePerson` / `goBack`.

## ▶️ Run & verify

```bash
npm run client -- 18-template-driven-form-update-mode
```

Open <http://localhost:4200> → People, and check:

- [ ] The edit icon opens `/people/:id`
- [ ] The form is pre-filled with that person's data
- [ ] Saving persists the change (`PUT`) and navigates back to the list

## 💡 Key concepts

- **`withComponentInputBinding()`** — the router assigns route params, query params and data to inputs of the same name — no `ActivatedRoute` boilerplate.
- **`rxResource`** — like `httpResource`, but you supply the stream. It re-runs whenever its `params` signal changes.
- **One form, two modes** — an optional `person` input makes the component reusable for both create and edit.

## 🧯 Troubleshooting

- **`id` is undefined** — you forgot `withComponentInputBinding()`, or the input name doesn't match the route param.
- **Form not pre-filled** — ensure the template binds to `person()` and the resource resolved before rendering.
- **Save does nothing** — verify `updatePerson` PUTs to `/peoples/:id` and you subscribed to the observable.
