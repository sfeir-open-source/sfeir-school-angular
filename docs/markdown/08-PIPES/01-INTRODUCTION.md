<!-- .slide: class="with-code inconsolata" -->

# `Card` shows raw data. Not for long.

Right now `Card` (from `05-input-output`) prints a person's fields exactly as they come out of the model: a `manager` string that's sometimes empty, a `birthDate` stored as a raw value. A **pipe** transforms a value **in the template**, right where it's displayed — without touching the component's logic.

<br/>

```html
<span>{{ expression | pipeName }}</span>
```

<!-- .element: class="big-code" -->

Notes:

- The `|` character is the pipe operator — think of it as "take what's on the left, and feed it into what's on the right".

##==##

# Angular's existing pipes

<br/>

- `date`, `currency`, `percent`, `decimal` <br/><br/>
- `lowercase`, `uppercase`, `titlecase` <br/><br/>
- `json`, `async`

Notes:

- `async` resolves an Observable/Promise/signal directly in the template (useful once we talk to a server).
- `json` pretty-prints an object/array — handy for debugging a template without leaving it.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Syntax: chaining and parameters

```html
<!-- one pipe -->
<span>{{ expression | filter1 }}</span>

<!-- chained -->
<span>{{ expression | filter1 | filter2 }}</span>

<!-- with parameters, separated by : -->
<span>{{ expression | filter1 : param1 : param2 }}</span>
```

<!-- .element: class="big-code" -->

Notes:

- Pipes read left to right: `expression | filter1 | filter2` first pipes `expression` through `filter1`, then feeds the result into `filter2`.
- Everything after a pipe's `:` becomes a positional argument to its `transform()` method, in order — this holds whether the pipe ships with Angular or you wrote it yourself, as you'll see with the `na` pipe.

##==##

<!-- .slide -->

# Pipes are standalone — and pure

- Standalone by default: import a pipe — built-in or custom — into a component's `imports` array, exactly like a component or a directive. No `NgModule` step. <br/><br/>
- **Pure by default**: Angular only re-runs `transform()` when the **reference** to its input (or its parameters) changes, not on every change-detection cycle.

> This is why `04-events`'s habit of `.set()`-ing a brand-new `Person` object on every refresh — rather than mutating the existing one — matters for pipes just as much as it does for change detection: a pure pipe watching a mutated-in-place object wouldn't notice the change at all.
