<!-- .slide: class="transition-bg-sfeir-1" -->

# Template-Driven Forms

##==##

# Where this fits in the app

`apps/12-template-form`'s `StaffDirectory` already has an "add person" button that opens a `DialogPerson` — and that dialog already hosts a `TemplateForm` component from `@sfeir/ui/template-form`. Today it's a static, dead form: no binding, no validation, no way to get the typed-in data back out.

<br/><br/>

This chapter brings it to life with `ngModel` and `ngForm`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Getting started: `FormsModule`

For standalone components, import `FormsModule` directly into the component's `imports` array.
<br/><br/>

```typescript
// libs/ui/template-form/template-form.ts
@Component({
  selector: 'sfeir-template-form',
  imports: [FormsModule],
  templateUrl: './template-form.html',
})
export class TemplateForm {}
```

<!-- .element: class="medium-code" -->

<br/><br/>

For module-based apps, add `FormsModule` to the `imports` array of your `NgModule` instead.

##==##

# Base concept

<br/><br/>

> With template-driven forms, the **template is the source of truth**: you declare the form in HTML and Angular builds the form model from it.

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Exposing what the form emits

```typescript
// libs/ui/template-form/template-form.ts
@Component({
  selector: 'sfeir-template-form',
  imports: [FormsModule],
  templateUrl: './template-form.html',
})
export class TemplateForm {
  readonly cancelForm = output<void>();
  readonly submitForm = output<UpsertPersonBody>();

  cancel(): void {
    this.cancelForm.emit();
  }

  submit(data: UpsertPersonBody): void {
    this.submitForm.emit(data);
  }
}
```

<!-- .element: class="small-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

```html
<!-- template-form.html -->
<form #personForm="ngForm" (ngSubmit)="submit(personForm.value)">
  <input name="firstname" ngModel required minlength="2" />
  <input name="lastname" ngModel required minlength="2" />
  <input name="email" ngModel required />
  <input name="phone" ngModel required pattern="\d{10}" />
  <input type="hidden" name="photo" ngModel="https://placeholder/avatar.png" />

  <button (click)="cancel()">Cancel</button>
  <button type="submit" [disabled]="!personForm.valid">Save</button>
</form>
```

<!-- .element: class="medium-code" -->

##++##

Notes:

- `TemplateForm` never talks to `HttpClient` or `MatDialogRef` directly — it only reports "cancelled" or "submitted with this data" through `output()`. `DialogPerson` is the one that turns those events into `closeDialog(...)` calls.
- Note there's no `[(ngModel)]` two-way binding here — the parent only needs the value **once**, on submit, so plain `ngModel` (registering the control) is enough; no component property needs to mirror each keystroke.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Key directives

- **`#personForm="ngForm"`**: a template reference variable for the `NgForm` directive — gives you `personForm.value`, `personForm.valid`... <br/><br/>
- **`ngModel`**: registers the control with the parent form (and, combined with `[()]`, gives two-way binding). <br/><br/>
- **`name`**: **required** on any input using `ngModel` inside a form — it's the key in the form's value object. <br/><br/>
- **`ngModelGroup`**: groups related controls into a nested object within the form's value (not needed for this flat person form, but useful for nested shapes like an address).

<!-- .element: class="big-code" -->
