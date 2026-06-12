<!-- .slide: class="with-code inconsolata" -->

# Submitting with `submit()`

`submit()` marks the form touched, runs the action when valid, and tracks progress:

<br/>

```typescript
import { submit } from '@angular/forms/signals';

protected async save(event: Event) {
  event.preventDefault();
  await submit(this.loginForm, {
    action: async (form) => {
      await this.auth.login(form().value());
      // return nothing => success
    },
  });
}
```

<!-- .element: class="medium-code" -->

```angular181html
<form (submit)="save($event)">
  <!-- fields … -->
  <button type="submit" [disabled]="loginForm().invalid() || loginForm().submitting()">
    Sign in
  </button>
</form>
```

<!-- .element: class="small-code" -->

Notes:

- `submit()` will not run the action if the form is invalid; it marks fields touched so errors show. Concurrent submissions are ignored.
- `loginForm().submitting()` is a signal you can use to disable the button / show a spinner.
- Options include `onInvalid` (called instead of `action` when invalid) and `ignoreValidators` (`'pending' | 'none' | 'all'`).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Server-side errors

Return errors from the action to attach them to the right field:

<br/>

```typescript
await submit(this.registrationForm, {
  action: async (form) => {
    const res = await this.api.register(form().value());
    if (res.error === 'USERNAME_TAKEN') {
      return [
        {
          fieldTree: this.registrationForm.username, // 👈 target field
          kind: 'server',
          message: 'Username already taken',
        },
      ];
    }
    return undefined; // success
  },
});

// The error now lives on the field:
this.registrationForm.username().errors(); // [{ kind: 'server', ... }]
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `[formRoot]` directive

Bind the form tree to the `<form>` element to auto-handle native submit:

<br/>

```typescript
import { form, FormField, FormRoot, submit } from '@angular/forms/signals';

@Component({
  imports: [FormField, FormRoot],
  templateUrl: './checkout.html',
})
export class Checkout {
  protected readonly checkoutForm = form(this.model, schemaFn, {
    submission: { action: async (f) => this.api.save(f().value()) },
  });
}
```

<!-- .element: class="medium-code" -->

```angular181html
<form [formRoot]="checkoutForm">
  <!-- fields … -->
  <button type="submit">Place order</button>
</form>
```

<!-- .element: class="small-code" -->

Notes:

- `[formRoot]` sets `novalidate`, intercepts the native `submit` event, calls `preventDefault()`, and invokes `submit()` using the `submission` options declared at form creation.
