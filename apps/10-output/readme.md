# 10 · Component Outputs

> Emit a delete event from the card and let each parent handle it differently.

**Folder** `apps/10-output` · **Solution** `apps/10-output-solution` · **Run** `npm run client -- 10-output`

## 🎯 Goal

Add a delete button to the reusable card. The card doesn't decide *what* deleting means — it just **emits** an event. The People view removes the person from the list; the Home view loads a new random person. Same child, two behaviours.

## 📚 What you'll learn

- How to define a component **output** with `output()` and emit events
- How a child notifies a parent (the mirror image of inputs)
- How to model a delete-and-refresh flow with RxJS (`Subject`, `merge`, `switchMap`)

## ✅ Before you start

- Completion of the inputs exercise (09-input)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Emit from the Card component

Add a `personDelete` output and a method that emits the current person:

```typescript
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { People } from '../../models/people.model';

export class CardComponent {
  person = input.required<People>();
  personDelete = output<People>();

  deletePerson(person: People): void {
    this.personDelete.emit(person);
  }
}
```

In `card.component.html`, wire the delete button to `deletePerson(person())`.

### Step 2 — Handle deletion in the People view

Delete on the server, then keep the list in sync. Model it as a reactive flow that **merges** the initial fetch with the delete stream:

```typescript
import { merge, Subject, switchMap } from 'rxjs';

export class PeopleComponent {
  private readonly httpClient = inject(HttpClient);

  private readonly triggerDeletePeople$ = new Subject<string>();
  private readonly retrievePeople$ = this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`);
  private readonly deletePeople$ = this.triggerDeletePeople$.pipe(
    switchMap(id => this.httpClient.delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${id}`)),
  );
  private readonly peopleFlow$ = merge(this.retrievePeople$, this.deletePeople$);

  people = toSignal(this.peopleFlow$, { initialValue: [] });

  deletePerson({ id }: People): void {
    this.triggerDeletePeople$.next(id);
  }
}
```

In the template, bind the output: `<sfeir-card [person]="person" (personDelete)="deletePerson($event)" />`.

### Step 3 — Handle deletion in the Home view

On Home, deleting simply means "give me another one". Bind the same output to the existing refresh logic:

```html
<sfeir-card [person]="person()" (personDelete)="getRandomPerson()" />
```

## ▶️ Run & verify

```bash
npm run client -- 10-output
```

Open <http://localhost:4200> and check:

- [ ] On **People**, deleting a card removes that person from the list
- [ ] On **Home**, deleting loads a new random person
- [ ] The delete request is visible in the Network tab (`DELETE /peoples/:id`)

## 💡 Key concepts

- **`output<T>()`** — declares an event stream a child emits with `.emit(value)`; the parent listens with `(outputName)="handler($event)"`.
- **Inputs down, outputs up** — data flows into a component through inputs; notifications flow out through outputs. The child stays reusable because it never hard-codes the reaction.
- **`switchMap`** — maps the delete trigger to an HTTP call; the returned (updated) list flows back through `toSignal`. **`merge`** combines the initial load and the delete responses into one stream.

## 🧯 Troubleshooting

- **Event never received** — the binding name must match the output: `(personDelete)`.
- **Nothing emitted** — check you call `this.personDelete.emit(person)` in the click handler.
- **List doesn't refresh** — confirm the delete endpoint returns the updated list and that both streams are `merge`d.

## 🚀 Going further

- Add a confirmation dialog before deleting.
- Show a loading indicator while the delete request is in flight.
