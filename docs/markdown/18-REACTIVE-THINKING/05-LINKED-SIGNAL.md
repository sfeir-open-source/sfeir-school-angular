<!-- .slide: class="with-code inconsolata" -->

# The problem `SignalForm` now has

`SignalForm` (`14-signal-form`) only ever created a brand-new, empty person. `PersonDetails` needs the **same** component to also pre-fill for editing an existing one — via an optional `person` input.

<br/>

```typescript
readonly person = input<Person | undefined>();
```

<!-- .element: class="medium-code" -->

<br/>

The form's model signal has to: **start** from `person()` when editing (or empty defaults when creating), stay **writable** as the user types, and **reset** if a different `person` ever comes in. Neither a `signal()` nor a `computed()` can do all three.

##==##

<!-- .slide -->

# `signal()` vs `computed()` vs `linkedSignal()`

<br/>

- **`signal(initialValue)`** — writable, but set **once**; it never reacts if `person()` changes later.<br/><br/>
- **`computed(() => ...)`** — always in sync with its source, but **read-only**; the user's keystrokes couldn't write into it at all.<br/><br/>
- **`linkedSignal(() => ...)`** — starts in sync with its source **and stays writable** — the user can overwrite it locally, but it **resets** to the computation's result whenever the source signal changes.

<br/>

> `linkedSignal` is the one primitive that is both writable **and** re-derived. That combination is exactly what an edit form needs.

<!-- .element: class="important center" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Link 4: `linkedSignal()` in `SignalForm`

```typescript
// libs/ui/signal-form/signal-form.ts
readonly person = input<Person | undefined>();

private readonly personModel = linkedSignal<UpsertPersonBody>(() => {
  const current = this.person();
  return current ?? {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    photo: 'https://placeholder/avatar.png', // same default as 14-signal-form
  };
});

protected readonly personForm = buildPersonForm(this.personModel, (v) => this.submitForm.emit(v));
```

<!-- .element: class="medium-code" -->

Notes:

- Nothing else in `signal-form.html`/`person-form.ts` needs to change — `form()` still just wraps `personModel`, whatever kind of signal it is. `linkedSignal`'s whole appeal is that it's a drop-in replacement for `signal()` wherever the value needs to track an external source.
- `dialog-person.html` (the "add" flow) never passes a `person` — the computation's fallback branch produces the exact same empty state `14-signal-form` already had, so the create flow is unaffected.
- If `PersonDetails` is reused for two different people back to back (navigating from `/people/1` straight to `/people/2`), the `linkedSignal` resets to the new person automatically — a plain `signal()` seeded once wouldn't.
