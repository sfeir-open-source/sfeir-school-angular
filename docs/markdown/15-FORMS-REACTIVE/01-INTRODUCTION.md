<!-- .slide: class="transition-bg-sfeir-1" -->

# Reactive Forms

##==##

# Same form, second attempt

`apps/13-reactive-form` rebuilds the exact same "Add / Edit person" form as `12-template-form` — but this time the form's shape, values and validation rules move **out of the template and into TypeScript**, as a typed, testable model: `ReactiveForm`, backed by a `FormGroup`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Getting started: `ReactiveFormsModule`

```typescript
// libs/ui/reactive-form/reactive-form.ts
@Component({
  selector: 'sfeir-reactive-form',
  imports: [ReactiveFormsModule], // 👈 swapped in for FormsModule
  templateUrl: './reactive-form.html',
})
export class ReactiveForm {}
```

<!-- .element: class="medium-code" -->

<br/><br/>

For module-based apps, add `ReactiveFormsModule` to the `NgModule`'s `imports` array instead.

##==##

# Base concept

<br/><br/>

> With reactive forms, the **component class is the source of truth**: you build an explicit, typed form model in code and the template maps onto it.

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# A typed `FormGroup`: `PersonForm`

```typescript
// libs/ui/reactive-form/person-form.ts
type Controls = {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  photo: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
};

export class PersonForm extends FormGroup<Controls> {
  constructor() {
    super({
      firstname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      lastname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      photo: new FormControl('https://placeholder/avatar.png', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
      }),
    });
  }
}
```

<!-- .element: class="small-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

```html
<!-- reactive-form.html -->
<form [formGroup]="personForm" (ngSubmit)="submit(personForm.getRawValue())">
  <input formControlName="firstname" />
  <input formControlName="lastname" />
  <input formControlName="email" />
  <input formControlName="phone" />
  <input type="hidden" formControlName="photo" />

  <button type="submit" [disabled]="personForm.invalid">Save</button>
</form>
```

<!-- .element: class="medium-code" -->

##++##

Notes:

- Extending `FormGroup` in its own class (rather than an inline object literal) gives `PersonForm` a name you can type elsewhere, and a natural place to add the custom email validator (next slides).
- `nonNullable: true` guarantees `.value`/`.getRawValue()` never hand back `null` for that control — important since `UpsertPersonBody`'s fields are plain `string`s, not `string | null`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Key directives & concepts

- **`[formGroup]`**: binds the top-level `FormGroup` instance to the `<form>` element. <br/><br/>
- **`formControlName`**: binds an individual `FormControl` to an input, by name. <br/><br/>
- **`formGroupName`**: binds a nested `FormGroup` to a container element. <br/><br/>
- **`ngSubmit`**: handles the form's submit event. <br/><br/>
- **`getRawValue()`**: returns **every** control's value, including disabled ones — `.value` alone skips disabled controls, which matters the moment any field becomes conditionally disabled.

<!-- .element: class="big-code" -->

Notes:

- `PersonForm` has no disabled controls today, but `getRawValue()` is the safer default to reach for — it behaves like `.value` when nothing is disabled, and doesn't silently drop data the moment something becomes disabled later.
