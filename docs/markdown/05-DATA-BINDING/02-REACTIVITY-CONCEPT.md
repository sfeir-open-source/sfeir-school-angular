<!-- .slide -->

# Reactivity: keeping the view in sync

**Reactivity** is the framework's ability to update the UI **automatically** when your data changes — no manual DOM manipulation, no `refresh()`.

<br/>

- The view should always reflect the **current state** of the application
- You change the state; Angular updates only what depends on it
- In modern Angular, that state lives in **signals**

Notes:

- Signals were introduced in v17 and are the stable, recommended reactivity primitive in v22. They also power zoneless change detection.

##==##

<!-- .slide: class="with-code inconsolata" -->

# A signal: a reactive value

A **signal** is a container around a value that knows who reads it. Read it by **calling it** like a function.

<br/>

```typescript
import { signal } from '@angular/core';

const count = signal(0); // create with an initial value

count(); // read  -> 0
count.set(1); // replace the value
count.update(n => n + 1); // derive from the previous value  -> 2
```

<!-- .element: class="big-code" -->

Notes:

- Reading a signal inside a template or a `computed`/`effect` **registers a dependency**. That is how Angular knows what to update.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `computed`: derived state

A **computed** signal derives a new value from other signals. It is **lazy** and **memoized** — recomputed only when a dependency changes.

<br/>

```typescript
const price = signal(100);
const quantity = signal(2);

const total = computed(() => price() * quantity()); // read-only signal

total(); // 200
quantity.set(3);
total(); // 300  (recomputed automatically)
```

<!-- .element: class="big-code" -->

Notes:

- Never store derived data in a plain signal you update by hand — use `computed` so it can never fall out of sync.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `effect`: reacting to changes

An **effect** runs a side effect whenever any signal it reads changes. Use it for logging, syncing to `localStorage`, integrating non-reactive APIs…

<br/>

```typescript
const theme = signal('dark');

effect(() => {
  document.body.dataset['theme'] = theme(); // re-runs whenever theme() changes
});

theme.set('light'); // effect runs again
```

<!-- .element: class="big-code" -->

Notes:

- Effects run in an injection context (e.g. a constructor or a field initializer) and are cleaned up automatically when the component is destroyed.
- Prefer `computed` for deriving values; reserve `effect` for true side effects.

##==##

<!-- .slide -->

# Signals vs RxJS — not a competition

- **Signals** model **synchronous state**: "what is the current value?" — perfect for the view <br/><br/>
- **RxJS (Observables)** model **asynchronous streams of events over time** — perfect for user flows and complex async <br/><br/>
- They **interoperate**: `toSignal()` and `rxResource()` bridge the two worlds <br/><br/>

> Rule of thumb: **signals for state, observables for streams.** We come back to this when we talk to a server.
