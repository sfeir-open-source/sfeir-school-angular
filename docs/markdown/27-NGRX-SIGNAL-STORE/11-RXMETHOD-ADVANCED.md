<!-- .slide: class="with-code inconsolata" -->

# Manual cleanup and cross-injector calls

Calling a reactive method returns a handle with its own `.destroy()`, for stopping one specific call without waiting for the whole injector to go away:

```typescript
const num1Ref = logDoubledNumber(num1$);
const num2Ref = logDoubledNumber(num2$);

setTimeout(() => num1Ref.destroy(), 2_000); // only stops the first call
```

<!-- .element: class="medium-code" -->

If a reactive method is **created** in one injector (e.g. a root-provided service) but **called** with a signal from a shorter-lived one (e.g. a component), pass `{ injector }` explicitly so cleanup happens at the right time — otherwise it outlives the caller and leaks.

##==##

# `signalMethod`: `rxMethod` without RxJS

For side effects that don't need RxJS operators at all, `@ngrx/signals` also exports `signalMethod` — same calling convention (static value, signal, or computation function), built on `effect()` instead of an RxJS pipeline.

<br/>

| | `signalMethod` | `rxMethod` |
|---|---|---|
| Bundle size | smaller (no RxJS) | includes RxJS operators |
| Input types | value, signal, computation fn | + `Observable` |
| Cancellation / race conditions | none built-in (glitch-free effect: only the latest sync value propagates) | full RxJS operator toolbox (`switchMap`, `debounceTime`, …) |

<!-- .element: class="medium-code" -->

**Rule of thumb**: reach for `signalMethod` for simple signal-driven side effects with no concurrency concerns; reach for `rxMethod` — as `StaffDirectoryStore` does throughout — the moment cancellation, debouncing, or combining multiple async sources matters.

<!-- .element: class="important" -->
