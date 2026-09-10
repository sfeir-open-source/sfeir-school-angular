<!-- .slide: class="with-code inconsolata" -->

# Before: reading `ActivatedRoute` by hand

The traditional way to read a route parameter — you'll still see this constantly in existing code:

<br/>

```typescript
@Component({ selector: 'sfeir-person-details', templateUrl: './person-details.html' })
export class PersonDetails {
  private readonly route = inject(ActivatedRoute);

  protected readonly id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
}
```

<!-- .element: class="medium-code" -->

<br/>

Works, but every component that needs a route parameter repeats this same `inject` + `pipe` + `map` dance.

Notes:

- This pattern was the standard way to read route params before `withComponentInputBinding()` existed, and remains valid — but it's boilerplate that a router feature function can now remove entirely.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Link 2: `withComponentInputBinding()`

Turn a route **parameter** straight into a component **input** — no `ActivatedRoute`, no manual mapping:

<br/>

```typescript
// app.config.ts
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES, withComponentInputBinding())],
};
```

<!-- .element: class="medium-code" -->

```typescript
// feature/person-details/person-details.ts
@Component({ selector: 'sfeir-person-details', templateUrl: './person-details.html' })
export class PersonDetails {
  readonly id = input.required<string>(); // 👈 populated straight from the :id route segment
}
```

<!-- .element: class="medium-code" -->

<br/>

> The `input()`'s property name must match the route's `:id` segment **exactly** — that's the entire contract.

<!-- .element: class="important center" -->

Notes:

- Without `withComponentInputBinding()`, this silently no-ops instead of erroring — `id` would just always be `undefined`, which is exactly the first troubleshooting item students hit in `apps/15-reactive-thinking`.
- This also works for query params and route `data`, not just path segments — same mechanism.
