<!-- .slide: class="transition-bg-sfeir-2" -->

# Reactive store methods: `rxMethod`

##==##

<!-- .slide: class="with-code inconsolata" -->

# The store-level replacement for `Subject` + operators

`rxMethod<T>` (from `@ngrx/signals/rxjs-interop`) is a standalone factory that turns an RxJS pipeline into a **callable method** — the same job `StaffDirectory`'s `Subject`s used to do, without hand-declaring the `Subject`.

```typescript
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, map } from 'rxjs';

readonly logDoubledNumber = rxMethod<number>(
  pipe(
    map(num => num * 2),
    tap(console.log),
  ),
);

logDoubledNumber(1);   // -> 2
logDoubledNumber(2);   // -> 4
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# One method, four ways to call it

`rxMethod<T>`'s returned function accepts **a static value, a `Signal<T>`, a computation function, or an `Observable<T>`** — the pipeline runs once per static call, and re-runs every time a signal/observable input changes.

```typescript
const num = signal(10);
logDoubledNumber(num);      // runs once now, and again every time num changes
num.set(20);                 // -> 40

logDoubledNumber(() => a() + b());   // combine multiple signals

logDoubledNumber(interval(2_000));   // re-runs on every observable emission
```

<!-- .element: class="medium-code" -->

This flexibility is exactly why `withHooks` can call `store.getPeople()` with **no argument at all** later on — `rxMethod<void>` supports that too.

##==##

# Injection context and automatic cleanup

By default, `rxMethod` must be created within an **injection context**, and it's tied to that injector's lifecycle: when the store is destroyed, every `rxMethod` on it unsubscribes automatically — no manual `takeUntilDestroyed()` needed, unlike raw RxJS in a component.<br/><br/>

This is the same guarantee `StaffDirectory`'s current `Subject`-based flows get implicitly by being component fields — `rxMethod` gives you that for free at the store level too.

<!-- .element: class="important" -->
