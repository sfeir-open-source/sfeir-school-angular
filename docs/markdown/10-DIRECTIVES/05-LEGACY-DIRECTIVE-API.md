<!-- .slide: class="with-code inconsolata" -->

# Events, before and after signals

`output()` (or `host` with an event binding, as seen with `King`) replaces the older `@Output()` + `@HostListener()` pair:

<br/>

```typescript
// Legacy
import { EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[myDirective]' })
export class MyDirective {
  @Output() somethingChange = new EventEmitter<{ event: MouseEvent; data: unknown }>();

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    this.somethingChange.emit({ event, data: 'some data' });
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- `@HostListener('click', ['$event'])` and `host: { '(click)': 'handleClick($event)' }` do exactly the same thing — the `host` object is the newer, more declarative spelling, keeping all host wiring in one place in the decorator instead of scattering decorators across methods.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Host properties, before and after signals

The `host` object's `[key]` bindings have a decorator-era equivalent too: `@HostBinding()`, applied directly on a class member:

<br/>

```typescript
// Legacy
import { HostBinding } from '@angular/core';

@Directive({ selector: '[myDirective]' })
export class MyDirective {
  @HostBinding('class.isActive') isActive = false;

  activate(): void {
    this.isActive = true;
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- `@HostBinding('class.isActive')` binds the decorated member to the `class.isActive` property of the **host element** — the same `class.<name>` micro-syntax used in `[class.isActive]` template bindings, just aimed at the directive's own host instead of a child element.
- This is pre-signals machinery: `isActive` is a **plain field**. Angular re-reads it on every change detection pass and patches the DOM if it changed — there's no fine-grained tracking, `computed()`, or `linkedSignal()` involved, because none of that existed yet when `@HostBinding` was designed.
- `@HostBinding` also works on a **getter**, not just a field — including one that reads a signal (`get isActive() { return this.active(); }`). The decorator itself doesn't know or care about signals; it just re-evaluates whatever member it's attached to.
- Modern equivalent, same result: `host: { '[class.isActive]': 'isActive()' }` with `isActive` as a `signal(false)` — see `04-HOST-BINDINGS.md`. Same DOM outcome, but the binding lives in the decorator's `host` object instead of being scattered as a member-level annotation.

##==##

<!-- .slide -->

# The legacy trio, side by side

Everything a directive can do to its host — read a value in, emit a value out, listen to an event, push a property — had a dedicated decorator before `host` unified them all:

<br/>

| Concern                  | Legacy decorator      | Modern equivalent                    |
| ------------------------- | ---------------------- | -------------------------------------- |
| Value in                 | `@Input()`            | `input()`                             |
| Value out                | `@Output()`           | `output()`                            |
| Listen to a host event   | `@HostListener('...')` | `host: { '(event)': '...' }`         |
| Push a host property     | `@HostBinding('...')`  | `host: { '[property]': '...' }`      |

Notes:

- Same four concerns, same four capabilities — only the spelling changed. Nothing about what a directive can express is different; `host` just replaces four separate decorator kinds with one declarative object in `@Directive`.
- You'll still meet all four in older libraries and legacy codebases. Being able to read `@HostBinding`/`@HostListener` at a glance — and know they translate 1-for-1 into `host` entries — matters more than memorizing their exact argument syntax.
- In this training, `King` (the upcoming exercise) is written with the modern `host` object throughout — but its behavior is identical to what these four decorators would produce.
