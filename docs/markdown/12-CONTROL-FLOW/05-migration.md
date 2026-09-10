<!-- .slide -->

# Coming from the old directives?

`apps/10-control-flow` was written straight with `@if`/`@for`/`@switch` — it never used the old directives. But you'll meet them constantly in existing Angular codebases, so it's worth knowing what they looked like.

<br/>

Before v17, control flow used **structural directives** from `CommonModule`: `*ngIf`, `*ngFor`, `*ngSwitch`. They are **deprecated since v20**.

- The `@`-block syntax replaces the `*` microsyntax (`let`, `of`, `trackBy`…) <br/><br/>
- It is built-in — no `CommonModule` import <br/><br/>
- The compiler infers types better inside blocks

##==##

<!-- .slide: class="with-code inconsolata" -->

# `*ngIf` → `@if`

**Before**

```html
<div *ngIf="people().length > 0; else empty">{{ people().length }} people</div>
<ng-template #empty>No one yet</ng-template>
```

<!-- .element: class="medium-code" -->

**After**

```html
@if (people().length > 0) {
  <div>{{ people().length }} people</div>
} @else {
  No one yet
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# `*ngFor` → `@for`

**Before**

```html
<li *ngFor="let person of people(); trackBy: trackById">{{ person.firstname }}</li>
```

<!-- .element: class="medium-code" -->

**After**

```html
@for (person of people(); track person.id) {
  <li>{{ person.firstname }}</li>
}
```

<!-- .element: class="medium-code" -->

Notes:

- `trackBy` (a function you wrote yourself) becomes `track` (an inline expression) and is now **mandatory**, not opt-in.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Automatic migration

Got an existing app full of `*ngIf`/`*ngFor`? Let the CLI rewrite it for you:

<br/>

```shell
ng generate @angular/core:control-flow
```

<!-- .element: class="big-code center" -->

##==##

<!-- .slide -->

# Benefits of the new syntax

- **Clearer and more intuitive** — closer to native JavaScript control flow <br/><br/>
- **No more microsyntax** — no `let`, `of`, or `trackBy` grammar to remember <br/><br/>
- **Better type checking** — the compiler infers types inside the blocks <br/><br/>
- **Built-in** — no need to import `CommonModule` for `@if`, `@for`, `@switch`
