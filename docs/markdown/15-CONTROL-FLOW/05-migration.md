<!-- .slide -->

# Coming from the old directives?

Before v17, control flow used **structural directives** from `CommonModule`: `*ngIf`, `*ngFor`, `*ngSwitch`. They are **deprecated since v20** — you will still meet them in existing code.

<br/>

- The `@`-block syntax replaces the `*` microsyntax (`let`, `of`, `trackBy`…) <br/><br/>
- It is built-in — no `CommonModule` import <br/><br/>
- The compiler infers types better inside blocks

##==##

<!-- .slide: class="with-code inconsolata" -->

# `*ngIf` → `@if`

**Before**

```html
<div *ngIf="user() as user; else guest">{{ user.name }}</div>
<ng-template #guest>Guest</ng-template>
```

<!-- .element: class="medium-code" -->

**After**

```html
@if (user(); as user) {
  <div>{{ user.name }}</div>
} @else {
  Guest
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# `*ngFor` → `@for`

**Before**

```html
<li *ngFor="let user of users(); trackBy: trackById">{{ user.name }}</li>
```

<!-- .element: class="medium-code" -->

**After**

```html
@for (user of users(); track user.id) {
  <li>{{ user.name }}</li>
}
```

<!-- .element: class="medium-code" -->

Notes:

- `trackBy` (a function) becomes `track` (an expression) and is now mandatory.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Automatic migration

Let the CLI rewrite your whole codebase for you:

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
