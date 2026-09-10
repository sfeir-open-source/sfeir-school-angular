<!-- .slide: class="with-code inconsolata" -->

# Submitting: the `submission` option

`form()` takes a third argument, `FormOptions`, whose `submission.action` runs when the form is submitted. `apps/14-signal-form`'s `person-form.ts` factory takes a callback and simply forwards the submitted value to it — the component doesn't need its own `(ngSubmit)` handler:

<br/>

```typescript
// libs/ui/signal-form/person-form.ts
export function buildPersonForm(
  model: WritableSignal<UpsertPersonBody>,
  onSubmit: (value: UpsertPersonBody) => void,
) {
  return form(model, (path) => {
    // ...validation rules...
  }, {
    submission: {
      action: async (fieldTree) => {
        onSubmit(fieldTree().value()); // 👈 forwarded straight to the component's callback
      },
    },
  });
}
```

<!-- .element: class="medium-code" -->

Notes:

- `submit()` will not run the action if the form is invalid; it marks fields touched so errors show. Concurrent submissions are ignored.
- `personForm().submitting()` is a signal you can use to disable the button / show a spinner.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `[formRoot]` directive

Bind the form tree to the `<form>` element to auto-handle native submit — no `(ngSubmit)` needed:

<br/>

```typescript
// libs/ui/signal-form/signal-form.ts
import { FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'sfeir-signal-form',
  imports: [FormField, FormRoot, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './signal-form.html',
})
export class SignalForm {
  readonly submitForm = output<UpsertPersonBody>();
  protected readonly personForm = buildPersonForm(this.personModel, (v) => this.submitForm.emit(v));
}
```

<!-- .element: class="medium-code" -->

```html
<form [formRoot]="personForm">
  <input [formField]="personForm.firstname" />
  <!-- ...other fields... -->
  <button type="submit" [disabled]="personForm().invalid()">Save</button>
</form>
```

<!-- .element: class="small-code" -->

Notes:

- `[formRoot]` sets `novalidate`, intercepts the native `submit` event, calls `preventDefault()`, and invokes `submit()` using the `submission` options declared at form creation.
- This is a genuine ergonomic win over Reactive Forms' `(ngSubmit)="submit(personForm.getRawValue())"` — the wiring lives once, next to the validation rules, not scattered between the class and the template.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Server-side errors

Return errors from the action to attach them to the right field — useful once `apps/14-signal-form`'s dialog needs to surface a backend rejection (e.g. "email already used") without a redesign:

<br/>

```typescript
submission: {
  action: async (fieldTree) => {
    const res = await this.api.register(fieldTree().value());
    if (res.error === 'EMAIL_TAKEN') {
      return [
        { fieldTree: fieldTree.email, kind: 'server', message: 'Email already registered' },
      ];
    }
    return undefined; // success
  },
},
```

<!-- .element: class="small-code" -->
