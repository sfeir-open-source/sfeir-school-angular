<!-- .slide: class="with-code inconsolata" -->

# The `@Service` decorator

A more ergonomic alternative to `@Injectable({ providedIn: 'root' })`, designed for services that use `inject()`:

<br/>

```typescript
import { Service } from '@angular/core';
import { PEOPLE_MOCK, Person } from '@sfeir/types';

@Service()
export class People {
  getFirstPerson(): Person {
    return PEOPLE_MOCK[0];
  }

  getRandomPerson(): Person {
    const index = Math.floor(Math.random() * PEOPLE_MOCK.length);
    return PEOPLE_MOCK[index];
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- Available since Angular v22. Same behavior as `providedIn: 'root'`: singleton, available everywhere, tree-shakable — nothing to add to `app.config.ts` to use it anywhere in the app.
- This is exactly `apps/07-provider/src/app/core/provider/people.ts`: the two methods `Home` used to compute inline (`PEOPLE_MOCK[0]`, a random index) move here, unchanged in logic, just relocated.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Injecting with `inject()`, not the constructor

```typescript
// feature/home/home.ts
import { inject, signal } from '@angular/core';
import { People } from '../../core/provider/people';

export class Home {
  private readonly people = inject(People);

  person = signal(this.people.getFirstPerson());

  refresh(): void {
    this.person.set(this.people.getRandomPerson());
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- `PEOPLE_MOCK` no longer needs to be imported into `home.ts` at all once both call sites go through `People` — `Home` shouldn't know or care where the data comes from, only that it can ask `People` for a person.
- `inject()` must run in an **injection context**: a field initializer or the constructor body. Calling it lazily inside a method throws — this is the #1 `inject()` mistake beginners hit.

##==##

<!-- .slide -->

# `@Service` vs `@Injectable`

**Use `@Service` when:**

- Creating a singleton with `inject()` for its own dependencies <br/><br/>
- You want the most concise root provisioning — this is what `People` does <br/><br/>

**Keep `@Injectable` when:**

- Using **constructor-based** DI (older codebases, or a library you don't control) <br/><br/>
- You need `useClass`, `useValue`, `useExisting`, or `useFactory` <br/><br/>
- Scoping with `providedIn: 'platform'`

Notes:

- `@Service` only supports `inject()` for dependencies — not constructor parameters. If a class genuinely needs constructor injection, reach for `@Injectable`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The historical way: constructor injection

Before `inject()` (and still valid today), dependencies were declared as **constructor parameters**:

<br/>

```typescript
import { People } from './core/provider/people';

@Component({ selector: 'sfeir-home' })
export class Home {
  constructor(private readonly people: People) {}
}
```

<!-- .element: class="big-code" -->

Notes:

- Functionally equivalent to `private readonly people = inject(People)` for this simple case — Angular resolves `People` from the injector tree the same way either way.
- `inject()` wins as soon as logic needs to run *before* assignment (a computed default, a conditional dependency), or inside a base class without forcing every subclass to repeat the same constructor signature. That flexibility is why this training leads with it.
