<!-- .slide: class="transition-bg-sfeir-1 underline" -->

# Best practices & recap

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# Do

<br/>

- Model first: type your `interface` (`UpsertPersonBody`), keep the `signal` the **single source of truth**
- Keep **all logic in the schema** (validation, disabled, hidden)
- Extract shared rules into `schema()` and reusable validator functions (`nameRules`, `sfeirEmail`)
- Gate errors with `touched() && invalid()`
- Debounce async validators; rely on `pending()` for UX

##++##
##++##

# Avoid

<br/>

- Duplicating state outside the model signal
- Validation logic inside custom controls
- Setting `disabled` / `required` manually on inputs bound with `[formField]`
- Rendering `hidden()` fields without an `@if` guard
- Subscribing to values — read signals directly

##++##

##==##

<!-- .slide: class="with-code" -->

# When to choose Signal Forms

- ✅ New apps on **Angular v22+** that are already signal-based<br/><br/>
- ✅ You want **type safety inferred** from the model and schema-based validation<br/><br/>
- ✅ Forms that benefit from fine-grained reactivity (live previews, computed limits)<br/><br/>
- ↔️ **Interoperable & incremental**: adopt it next to Reactive/Template forms, migrate field by field<br/><br/>
- 🧩 Complex/dynamic legacy forms? Reactive Forms remain perfectly valid

Notes:

- Signal Forms are stable in v22, but the ecosystem (libraries, Material integration) is still catching up — validate your component library's support when adopting.
- Reactive and Template-driven forms are not deprecated; Signal Forms are an additional, signal-native option.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The whole mental model on one slide

```typescript
// 1. Model = a signal (source of truth)
const model = signal<UpsertPersonBody>({ firstname: '', email: '' /* ... */ });

// 2. form() wraps it + a schema declares the rules (once)
const personForm = form(
  model,
  path => {
    apply(path.firstname, nameRules);
    required(path.email);
    validate(path.email, sfeirEmailValidator);
  },
  { submission: { action: async f => onSubmit(f().value()) } },
);

// 3. Bind in the template with [formRoot] / [formField]; read everything as signals
//    personForm.email().value()  personForm.email().errors()  personForm().invalid()

// 4. Any component implementing FormValueControl can replace a native <input> — <sfeir-input>
```

<!-- .element: class="medium-code" -->

<br/>

> Model in. Field tree out. Logic in the schema. Everything is a signal.

<!-- .element: class="important center" -->
