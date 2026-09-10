<!-- .slide: class="transition-bg-sfeir-1" -->

# Validation

##==##

<!-- .slide: class="with-code inconsolata" -->

# The schema function

Pass a **schema function** as the 2nd argument of `form()`. It runs **once** and binds rules to field paths:

<br/>

```typescript
personForm = form(this.personModel, (path) => {
  // `path` mirrors the model: path.firstname, path.email, path.phone ...
  required(path.firstname, { message: 'First name is required' });
  minLength(path.firstname, 2, { message: 'At least 2 characters' });

  required(path.email, { message: 'Email is required' });
  // the sfeirEmail shape check is a custom validator — next chapter

  required(path.phone, { message: 'Phone is required' });
  pattern(path.phone, /^\d{10}$/, { message: 'Exactly 10 digits' });
});
```

<!-- .element: class="medium-code" -->

Notes:

- The schema parameter is a `SchemaPathTree` — a structural representation of your model used **before** the form exists. You cannot read state from it; you attach rules to it.
- Rules are reactive: their conditions recompute whenever the signals they read change. The schema function itself runs only once at creation.
- You can name the parameter anything (`path`, `schemaPath`, `p`...).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Built-in validators

```typescript
form(model, (path) => {
  required(path.firstname, { message: 'Required' });
  minLength(path.firstname, 2);

  pattern(path.phone, /^\d{10}$/, { message: '10 digits, no spaces' });

  min(path.age, 18, { message: 'Must be 18+' });
  max(path.rating, 5);
  maxLength(path.bio, 500);
});
```

<!-- .element: class="medium-code" -->

- `min`/`max` → numbers · `minLength`/`maxLength` → strings **and** arrays · `pattern` → strings<br/>
- Each sets a `kind` (`'required'`, `'minLength'`, `'pattern'`...) and an optional `message`

Notes:

- `firstname` and `lastname` in `apps/14-signal-form` share the *exact same* two rules (`required` + `minLength(2)`) — writing them twice is exactly the duplication a reusable `schema<string>()` avoids (covered two slides from now).
- `required` treats `''` and `null` as empty, and `false` as missing (so it works for "accept terms" checkboxes). An empty array counts as present — use `minLength` to require items.

##==##

<!-- .slide: class="with-code inconsolata" -->

# How & when validation runs

- **1.** Synchronous rules run on every value change<br/><br/>
- **2.** Asynchronous rules run **only after** all sync rules pass<br/><br/>
- **3.** `valid()` / `invalid()` / `errors()` / `pending()` update reactively<br/><br/>
- Rules **don't short-circuit** — `required` + a shape check can both report at once<br/><br/>
- **Hidden** and **disabled** fields skip validation entirely

<br/>

```typescript
// All matching errors are exposed, not just the first one
personForm.phone().errors(); // [{ kind: 'pattern', message: '...' }, ...]
```

<!-- .element: class="medium-code" -->

Notes:

- This "run everything" behavior lets you show all problems with a field simultaneously, which is generally better UX than fixing errors one at a time.
- Conditional `when` on a rule (e.g. `required(path.promo, { when: ({ valueOf }) => valueOf(path.applyDiscount) })`) skips a single rule until the condition is true.
