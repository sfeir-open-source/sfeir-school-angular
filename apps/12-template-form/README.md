# 12 — Template-Driven Forms

Since `11-http`, the staff directory can list, refresh and delete people over a real REST API — but there's still no way to _add_ someone. The "add" button on `StaffDirectory` already opens a `DialogPerson`, and that dialog already hosts a `TemplateForm` component from the shared `@sfeir/ui/template-form` library — but today it's just a static, dead form: no binding, no validation, no way to get the typed-in data back out. In this exercise you'll bring that form to life with Angular's **template-driven forms** (`ngModel`, `ngForm`), have it emit the captured data as a typed output event, wire the dialog to relay that event back to `StaffDirectory`, and finish the loop by implementing `People.addPerson()` so a submitted form actually reaches the API.

## 🎯 Learning objectives

- Building a form with the **template-driven** approach: `FormsModule`, `[(ngModel)]`/`ngModel` on native and Material inputs, and `#ref="ngForm"` to get a handle on the whole form from the template
- Reading per-field validation state through a **local template reference variable** on each control (`#field="ngModel"`) instead of a component-side `FormGroup`
- Declaring validation with directives — `required`, `[minlength]`, `[pattern]` — and rendering field-specific error messages from `field.errors?.['ruleName']` with `@if`
- Driving submit/cancel affordances from form state: disabling the submit button with `[disabled]="!form.valid"`, and reacting to `(ngSubmit)` with the form's current `.value`
- Exposing a reusable form component's outcome to its parent through Angular's **`output()`** signal-based event API, instead of reaching into the DOM or duplicating state
- Closing a `MatDialogRef` with a typed payload so the component that opened the dialog receives exactly what the form produced
- Sending a `POST` request with `HttpClient` to create a resource, completing the CRUD story started with `GET`/`DELETE` in `11-http`

## 📁 What you're working with

This exercise touches two libraries plus the app itself: `libs/ui/template-form` (the exercise's own copy of the shared form component — build it here, not in `-solution`) and `apps/12-template-form` (the app that hosts it). `libs/ui/card`, `libs/ui/king` and `libs/ui/loader` are untouched — keep using them exactly as they were in `11-http`.

```
libs/ui/template-form/
├── template-form.ts     🚧 to do — component class has no outputs, no logic
├── template-form.html   🚧 to do — a plain, unbound <form> with no ngModel/validation
└── template-form.scss   ✅ complete — nothing to do here

apps/12-template-form/
└── src/app/
    ├── app.ts / app.html / app.route.ts / app.config.ts / app.scss  ✅ complete — nothing to do here
    ├── core/provider/
    │   └── people.ts   🚧 to do — addPerson() currently returns an empty observable, no request is sent
    └── feature/
        ├── home/                          ✅ complete — untouched since 11-http
        └── staff-directory/
            ├── staff-directory.ts         ✅ complete — dialog open/close plumbing is already there
            ├── staff-directory.html        ✅ complete — open the dialo to create a new person already there
            └── dialog-person/
                ├── dialog-person.ts       ✅ complete — closeDialog(formValue?) already closes the MatDialogRef correctly
                └── dialog-person.html     🚧 to do — <sfeir-template-form /> isn't listening to any of its events yet
```

Note that `dialog-person.ts` in this exercise imports `TemplateForm` from `@sfeir/ui/template-form` — your own implementation

## 📝 Your tasks

### 1. `libs/ui/template-form/template-form.ts` — expose the form's outcome as outputs

`TemplateForm` currently has an empty class body. It needs to tell its parent two things: that the user cancelled, and that the user submitted (with the captured data).

- Add two fields created with `output()` (from `@angular/core`): one for cancelling (no payload) and one for submitting (payload typed `UpsertPersonBody`, from `@sfeir/types`).
- Add a `cancel()` method that emits the cancel output, and a `submit(data: UpsertPersonBody)` method that emits the submit output with that data. You'll call these from the template in the next task.

### 2. `libs/ui/template-form/template-form.html` — turn it into a real, validated form

The template currently has four plain Material inputs (first name, last name, email, phone) and a hidden `<input>` for the photo URL, none of them bound to anything.

- Get a handle on the whole form with a local template reference variable of type `ngForm` on the `<form>` element, and bind `(ngSubmit)` to call `submit(...)` with that form's current `.value`.
- Add `name` and `ngModel` to every input that should be part of the form data (including the hidden photo input — give it a sensible default value straight in the template via `ngModel="..."`, matching the URL already used elsewhere in this app for a placeholder photo).
- Give each visible input its own local template reference variable of type `ngModel` (e.g. `#somethingField="ngModel"`) so you can read that specific field's validation state in the template.
- Apply validation directives per field: first and last name need `required` and a `[minlength]` of 2; email needs `required`; phone needs `required` and a `[pattern]` that only accepts exactly 10 digits.
- Inside each `<mat-form-field>`, add a `<mat-error>` that conditionally shows a message per failing rule, using `@if` against that field's `errors?.['ruleName']` (`required`, `minlength`, `pattern`).
- Wire the Cancel button's `(click)` to your `cancel()` method, and bind the Save button's `[disabled]` to the form being invalid (via the same `ngForm` reference you created above).

### 3. `dialog-person.html` — relay the form's outputs to the dialog

`DialogPerson` already has a `closeDialog(formValue?: UpsertPersonBody)` method that closes the `MatDialogRef` with whatever it's given (or `undefined`).

- Bind `<sfeir-template-form />`'s two outputs (from task 1) to `closeDialog(...)`: the submit event should pass its emitted payload through, the cancel event should call `closeDialog()` with nothing.

### 4. `core/provider/people.ts` — send the new person to the API

`addPerson(body: UpsertPersonBody)` currently just returns an empty observable — nothing is sent anywhere.

- Issue a `POST` request with the injected `HttpClient`, to the same people collection endpoint `getPeople()`/`removePerson()` already build off `People.baseUrl`, sending `body` as the request payload. Return what `HttpClient.post()` gives you directly, same convention as the other methods in this provider.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 12-template-form   # dev server → http://localhost:4200
npx nx test 12-template-form    # run the app's unit tests with vitest
npx nx lint 12-template-form    # lint the app with eslint
npx nx build 12-template-form   # production build
```

The `libs/ui` library (which hosts `template-form`) has its own inferred `test`/`lint` targets too:

```bash
npx nx test ui   # run the library's unit tests
npx nx lint ui   # lint the library
```

## ✅ How to know it's working

Serve the app (with the backend running) and open it in the browser:

- On `/people`, clicking the add button opens a dialog with a photo, first name, last name, email and phone field.
- Leaving a required field empty, or typing fewer than 2 characters into first/last name, or an invalid phone number, shows an inline error message under that specific field — and the Save button stays disabled until every rule passes.
- Clicking Cancel closes the dialog without adding anyone to the list.
- Filling the form correctly and clicking Save closes the dialog, and the new person shows up in the staff list shortly after (the list should reflect the same "refresh after mutation" behavior you built for delete in `11-http`).
- Open the Network tab: submitting the form fires a real `POST` request to the people endpoint with your form's data as the JSON body.
- No console errors, and the add button's look/feel is consistent with the rest of the action buttons in the staff directory.

## 🛠️ Troubleshooting

- **The Save button never becomes enabled, even with valid data**: check that every input meant to participate in the form actually has both a `name` attribute _and_ `ngModel` — a control without `name` inside a template-driven `<form>` isn't tracked by `ngForm` at all, so it silently doesn't count toward `.valid`.
- **`ngModel` on a Material input throws `NG01203: No value accessor for form control`**: happens on inputs `FormsModule` can't see — double check `FormsModule` is in the component's `imports` array (it already is in `template-form.ts`) and that the directive is spelled `ngModel`, not `[ngModel]` alone without `name` in a template-driven context (both are needed together here, not `[(ngModel)]`, since the parent only needs the value on submit).
- **`#field="ngModel"` in the template throws a "there is no directive with exportAs ngModel" style error**: make sure `ngModel` (not just `[ngModel]`) is actually present as a directive on that exact `<input>`, and that the reference variable name doesn't collide with another variable already declared in the template.
- **Errors show up before the user has even touched a field**: this exercise doesn't require touch-based error suppression — showing errors as soon as a rule fails is an acceptable simplification here, so don't over-engineer this with `dirty`/`touched` checks.
- **Submitting does nothing visible / dialog never closes**: check that `(ngSubmit)` calls your `submit()` method with `personForm.value` (or whatever you named the `ngForm` reference) — a plain `(click)` on the submit button without `(ngSubmit)` on the `<form>` won't get you the aggregated form value.
- **The new person never appears in the list after closing the dialog**: `StaffDirectory` already listens to what `MatDialogRef.closed`/`afterClosed()` emits and is expected to call `addPerson()` with it — if `closeDialog()` in `dialog-person.ts` isn't actually receiving your submitted data (task 3), nothing downstream can happen.
- **The POST request never appears in the Network tab**: confirm `addPerson()` in `people.ts` is issuing the request itself (via `this._http.post(...)`) rather than just returning `of()`/an already-completed observable — and remember an `Observable` from `HttpClient` does nothing until something subscribes to it.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 12-template-form` explicitly.

## 🙈 Stuck?

Try building the form, wiring the outputs, and finishing `addPerson()` yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/12-template-form-solution` (and its counterpart library at `libs/ui-solution/template-form`) is a complete, working version — including `people.spec.ts`, `dialog-person.spec.ts`, `staff-directory.spec.ts`, `home.spec.ts` and `app.spec.ts`, which document the exact expected behavior of every piece. Use it to check your approach once you've made a real attempt, not as a starting point to copy from.
