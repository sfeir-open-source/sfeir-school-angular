# `Secret` lives in `libs/ui`, not in the app

`apps/22-structural-directive` touches nothing under `src/` — the whole exercise lives inside the shared `libs/ui` library, as a new secondary entry point (`libs/ui/password/`, alongside `card`, `list`, `loader`...), so any app using `sfeir-signal-form` gets the masking behavior for free.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Registering the directive on the form

```typescript
// libs/ui/signal-form/signal-form.ts
@Component({
  selector: 'sfeir-signal-form',
  imports: [SignalInput, Secret /* + everything already there */],
})
export class SignalForm { ... }
```

<!-- .element: class="medium-code" -->

```html
<!-- signal-form.html -->
<sfeir-input [formField]="_form.firstname" [type]="'text'" [placeholder]="'First name'" />
<sfeir-input [formField]="_form.lastname" [type]="'text'" [placeholder]="'Last name'" />
<sfeir-input [formField]="_form.email" [type]="'text'" [placeholder]="'Email'" />
<sfeir-input *sfeirSecret="let type" [formField]="_form.phone" [type]="type" [placeholder]="'Phone'" />
```

<!-- .element: class="medium-code" -->

- Every field the same shape, except the phone line — one directive, one line changed, nothing else in the form touched<br/><br/>
- Exporting a directive from its own file isn't enough — the **consuming** component's `imports` array needs it too, exactly like importing a component

##==##

# `*sfeirSecret`, never `<sfeir-secret>`

`libs/ui/password/password.ts` exports a `@Directive`, not a `@Component` with an element selector — it's attached to an existing host element with `*`, never written as its own tag.

<br/><br/>

If you ever see `<sfeir-secret>` in a template, something has gone wrong — `Secret`'s `selector: '[sfeirSecret]'` only matches an **attribute**, and the `*` sugar only exists for structural directives applied that way.

##==##

# What makes this "the most advanced directive in the training"

- An ordinary `@Component`/`@Directive` declares a template once, at compile time, and Angular renders it<br/><br/>
- `Secret` decides, **imperatively, at runtime**, whether anything renders at all (`ViewContainerRef`), what actually gets instantiated (`createComponent`), and how data flows back out to the caller (an outlet context) — none of that is declarative template syntax<br/><br/>
- It's the same toolbox Angular's own framework code uses to implement `*ngIf`/`*ngFor`/`@if`/`@for` — you've just used it directly, once, on a much smaller problem
