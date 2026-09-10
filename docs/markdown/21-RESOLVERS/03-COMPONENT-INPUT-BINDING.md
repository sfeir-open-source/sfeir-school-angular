<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Before: fetching its own data

```typescript
export class PersonDetails {
  id = input.required<string>();
  private people = inject(People);

  resource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.people.getPerson(params),
  });
}
```

<!-- .element: class="medium-code" -->

```html
@if (resource.hasValue()) {
<sfeir-signal-form [person]="resource.value()" />
} @else {
<sfeir-loader />
}
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

# After: consuming resolved data

```typescript
export class PersonDetails {
  person = input.required<Person>();
}
```

<!-- .element: class="medium-code" -->

```html
<sfeir-signal-form [person]="person()" />
```

<!-- .element: class="medium-code" -->

<br/>

No `rxResource`, no `People` injection, no `Loader` import — the `@if`/`@else` branch is simply gone.

##++##

##==##

# `withComponentInputBinding()` does the wiring

- Already enabled in `app.config.ts`: `provideRouter(APP_ROUTES, withComponentInputBinding())`<br/><br/>
- The router auto-binds a resolved value to a **same-named** `input()` on the activated component — the key you chose in `resolve: { person: ... }` must match the input's name exactly<br/><br/>
- Same mechanism that already binds route params (`:id` → `input.required<string>()`) from the previous module — resolved data rides the same rail
