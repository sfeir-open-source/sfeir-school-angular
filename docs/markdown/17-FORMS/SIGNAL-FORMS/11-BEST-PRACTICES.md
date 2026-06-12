<!-- .slide: class="transition-bg-sfeir-1 underline" -->

# Best practices & recap

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# Do

<br/>

- Model first: type your `interface`, keep the `signal` the **single source of truth**<br/><br/>
- Keep **all logic in the schema** (validation, disabled, hidden)<br/><br/>
- Extract shared rules into `schema()` and reusable validator functions<br/><br/>
- Gate errors with `touched() && invalid()`<br/><br/>
- Debounce async validators; rely on `pending()` for UX

##++##
##++##

# Avoid

<br/>

- Duplicating state outside the model signal<br/><br/>
- Validation logic inside custom controls<br/><br/>
- Setting `disabled` / `required` manually on inputs bound with `[formField]`<br/><br/>
- Rendering `hidden()` fields without an `@if` guard<br/><br/>
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
const model = signal({ email: '', age: 0 });

// 2. form() wraps it + a schema declares the rules (once)
const f = form(model, (path) => {
  required(path.email);
  email(path.email);
  min(path.age, 18);
});

// 3. Bind in the template with [formField]; read everything as signals
//    f.email().value()  f.email().errors()  f().valid()  f().submitting()

// 4. submit() runs your action when valid & maps server errors back
```

<!-- .element: class="medium-code" -->

<br/>

> Model in. Field tree out. Logic in the schema. Everything is a signal.

<!-- .element: class="important center" -->
