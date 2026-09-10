<!-- .slide: class="transition-bg-sfeir-2" -->

# Why doesn't OnPush solve everything?

##==##

# OnPush: waiting for an event

![](assets/images/school/change-detection/cd_on-push_OP.png)

<!-- .element: class="full-center" -->

##==##

# OnPush: dirty checking

![](assets/images/school/change-detection/cd_on-push_OP_dirty.png)

<!-- .element: class="full-center" -->

##==##

# OnPush: change detection

![](assets/images/school/change-detection/cd_on-push_OP_cd.png)

<!-- .element: class="full-center" -->

##==##

<!-- .slide: class="transition-bg-sfeir-2" -->

# Zoneless Angular — the v22 default

##==##

# Zoneless is now the default

Since **Angular v21**, new applications are **zoneless**: there is nothing to enable. Zone.js is gone.

<br/>

- **Smaller bundle** — Zone.js (~40 KB) is no longer shipped <br/><br/>
- **Faster & more predictable** — no more app-wide checks on every async event <br/><br/>
- **Signal-driven** — Angular re-renders exactly the components whose signals changed <br/><br/>

Notes:

- On v20 you opted in with `provideZonelessChangeDetection()`. On v21+ it is the default, so you do nothing.

##==##

<!-- .slide: class="with-code inconsolata" -->

# How a component notifies Angular

Without Zone.js, Angular schedules change detection when it is **told** something changed. In practice that means:

- reading a **signal** in the template (the normal case) <br/><br/>
- an event listener fires, or `AsyncPipe` emits <br/><br/>
- a manual `ChangeDetectorRef.markForCheck()` (rarely needed)

<br/>

```typescript
@Component({
  template: `<button (click)="increment()">Count: {{ count() }}</button>`,
})
export class Counter {
  count = signal(0);
  increment() {
    this.count.update(c => c + 1); // signal change -> view updates, no Zone.js
  }
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Plain property — won't update

```typescript
@Component({
  template: `<div>{{ count }}</div>`,
})
export class Counter {
  count = 0;

  increment() {
    this.count++; // zoneless: nothing notifies Angular
  }
}
```

<!-- .element: class="medium-code" -->

##++##
##++##

# Signal — updates automatically

```typescript
@Component({
  template: `<div>{{ count() }}</div>`,
})
export class Counter {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1); // view updates
  }
}
```

<!-- .element: class="medium-code" -->

##++##

Notes:

- The lesson: in a zoneless app, hold rendered state in **signals**. This is exactly what we learned on day 1.

##==##

# Migrating an older app to zoneless

- Enable it explicitly on v20 with `provideZonelessChangeDetection()` (default on v21+) <br/><br/>
- Move rendered state to **signals**; use `computed()` for derived values <br/><br/>
- Keep `OnPush` on any remaining non-signal components <br/><br/>
- Bridge Observables with `toSignal()` / `AsyncPipe` <br/><br/>
- Remove `zone.js` from `polyfills` in `angular.json` and uninstall the dependency

> Signals are the reactivity model that makes zoneless work — learn them once, use them everywhere.
