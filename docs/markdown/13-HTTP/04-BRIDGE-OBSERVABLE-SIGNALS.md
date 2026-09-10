# Signal or Observable?

<br/><br/>

> STOP — it's not one _or_ the other! Signals and Observables solve different problems, and in `StaffDirectory` they work **together**.

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

## Signal

<br/><br/>

- **synchronous** <br/><br/>
- has **an initial value** <br/><br/>
- represents the **current state** of your view

##++##
##++##

## Observable

<br/><br/>

- **asynchronous** <br/><br/>
- doesn't necessarily have an **initial value** <br/><br/>
- represents a **flow** of events over time
##++##

##==##

# `StaffDirectory`'s problem

The people list must reflect **two** different asynchronous sources at once:

<br/><br/>

- the **initial fetch** (`getPeople()`) when the component loads<br/><br/>
- every **delete** afterwards, which should refresh what's displayed

<br/>

> Both need to feed the *same* signal the template reads with `@for`.

<!-- .element: class="important center" -->

##==##

<!-- .slide: class="with-code inconsolata"-->

# `Subject` + `switchMap` + `merge`

```typescript
// feature/staff-directory/staff-directory.ts
export class StaffDirectory {
  private readonly peopleService = inject(People);
  private readonly delete$ = new Subject<string>();

  protected readonly view = signal<UiView>('card');

  private readonly people$ = merge(
    this.peopleService.getPeople(),               // 1. initial fetch
    this.delete$.pipe(switchMap(id => this.peopleService.removePerson(id))), // 2. every delete
  );

  protected readonly people = toSignal(this.people$, { initialValue: [] });

  handleDelete(id: string): void {
    this.delete$.next(id); // 👈 pushes into the trigger, doesn't touch a signal directly
  }
}
```

<!-- .element: class="small-code"-->

Notes:

- `switchMap` turns each emitted `id` into a `removePerson(id)` HTTP call, and (as always with `switchMap`) cancels any in-flight previous call if a new delete comes in before the first resolves.
- `merge` combines both Observables into a single stream that emits whenever *either* source emits — exactly what the template needs to always show the latest list, whichever path produced it.

##==##

<!-- .slide: class="with-code inconsolata"-->

# `toSignal()` — bridge back to signals

```typescript
readonly people = toSignal(this.people$, { initialValue: [] });
```

<!-- .element: class="big-code"-->

- Converts an Observable to a **signal** that refreshes whenever the Observable emits.<br/><br/>
- Unsubscribes automatically when the component/view is destroyed.<br/><br/>
- The template (`@switch`, `@for`) never needs to know RxJS is involved at all — it just reads `people()` like any other signal.

Notes:

- This is the payoff of the whole composition: `StaffDirectory`'s template from `10-control-flow` doesn't change at all — only how `people` gets its data changes, from a plain array literal to a merged, HTTP-backed stream.
