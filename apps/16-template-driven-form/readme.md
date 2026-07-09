# 16 · Template-Driven Forms

> Build an "Add person" form with `ngModel`, then wire its submission into an RxJS flow that creates the person and refreshes the list.

**Folder** `apps/16-template-driven-form` · **Solution** `apps/16-template-driven-form-solution` · **Run** `npm run client -- 16-template-driven-form`

## 🎯 Goal

The People page already has a "+" button that opens a dialog. Fill that dialog with a form component, make it template-driven, emit the submitted value, and hook it up to a `POST /peoples` request.

## 📚 What you'll learn

- How template-driven forms work with `FormsModule`, `ngModel` and `#form="ngForm"`
- How to emit form results through component outputs
- How to compose a dialog + HTTP create + list refresh with `Subject`, `filter` and `switchMap`

## ✅ Before you start

- Completion of the outputs (10) and control-flow (14) exercises
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the Form component

In `shared/components`, create a `Form` component. Seed its template and styles from the provided assets:

- Copy `assets/static/form.component.html` into `form.html`
- Copy `assets/static/form.scss` into `form.scss`

### Step 2 — Show the form inside the dialog

In `add-person-dialog.component.ts`, add `Form` to the `imports`, then render `<sfeir-form />` in `add-person-dialog.component.html`.

### Step 3 — Enable template-driven forms

`FormsModule` is a **standalone** import — add it to the `Form` component's own `imports` array (there's no `NgModule`/`SharedModule` here):

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [NgOptimizedImage, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class Form { /* … */ }
```

### Step 4 — Make the template a form

In `form.html`, expose the form as a template reference, and register each field with `name` + `ngModel`:

```html
<form #personForm="ngForm" (ngSubmit)="submit(personForm.value)">
  <input type="text" matInput name="firstname" ngModel />
  <input type="text" matInput name="lastname" ngModel />
  <input type="email" matInput name="email" ngModel />
  <input type="phone" matInput name="phone" ngModel />
  <!-- hidden photo field, cancel/save buttons… -->
</form>
```

> 💡 `name` + `ngModel` together register a control on the `ngForm`; `personForm.value` is then an object keyed by those `name`s.

### Step 5 — Emit save & cancel

In `form.ts`, declare two outputs and emit from the handlers:

```typescript
cancel = output<void>();
save = output<PeopleForm>();

submit(personForm: PeopleForm): void {
  this.save.emit(personForm);
}

onCancel(): void {
  this.cancel.emit();
}
```

### Step 6 — Create the person & refresh the list

Add the create endpoint to `people.service.ts`:

```typescript
addNewPerson(person: PeopleForm): Observable<void> {
  return this.httpClient.post<void>(`${environment.peopleEndpoint}/peoples`, person);
}
```

Then, in `people.component.ts`, model the "add" flow and merge it with the existing streams:

```typescript
private readonly triggerAddPeople$ = new Subject<void>();

private readonly addPeople$ = this.triggerAddPeople$.pipe(
  switchMap(() =>
    this.matDialog.open(AddPersonDialogComponent, { width: '50%', height: 'fit-content' })
      .afterClosed()
      .pipe(
        filter(Boolean),                                    // ignore a cancelled dialog
        switchMap(personForm => this.peopleService.addNewPerson(personForm)),
        switchMap(() => this.retrievePeople$),              // reload the fresh list
      ),
  ),
);

private peopleFlow$ = merge(this.retrievePeople$, this.deletePeople$, this.addPeople$);
```

## ▶️ Run & verify

```bash
npm run client -- 16-template-driven-form
```

Open <http://localhost:4200> → People, and check:

- [ ] The "+" button opens the dialog with the form
- [ ] Submitting adds the person and the list refreshes
- [ ] Cancelling closes the dialog and changes nothing

## 💡 Key concepts

- **Template-driven forms** — the form's shape and state live in the **template**; `ngModel` + `name` build the model implicitly. Great for simple forms.
- **`filter(Boolean)`** — a concise guard: only proceed when the dialog returns a truthy value (i.e. the user saved).
- **`switchMap` chaining** — dialog → create → reload, each step cancelling any stale previous one.

## 🧯 Troubleshooting

- **`personForm.value` is empty** — every field needs both `name` and `ngModel`.
- **`Can't bind to 'ngModel'`** — `FormsModule` isn't in the `Form` component's `imports`.
- **List doesn't update after save** — make sure the flow ends with `switchMap(() => this.retrievePeople$)` and is `merge`d in.
