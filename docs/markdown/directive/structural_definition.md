<!-- .slide -->
# Definition and use cases

- Responsible for the layout
- Manipulates DOM elements (add, remove, etc.)
- Applies to a 'host' element
- Easily recognizable by the `@` symbol (e.g., @if)
- Control flow blocks can be nested and combined logically

##==##

<!-- .slide-->
# The new @-block syntax

- Replaces the old `*` microsyntax for structural directives.
- Provides a cleaner, more intuitive, and powerful way to manage control flow.
- The `let` keyword and implicit context variables (`$implicit`) are no longer needed in the same way.

##==##

<!-- .slide: class="with-code inconsolata" -->
# @for in depth

```html
@for (hero of heroes; track hero.id; let i = $index, o = $odd) {
  <div>{{ i }}: {{ hero.name }} (Odd: {{ o }})</div>
}
```
<!-- .element: class="big-code" -->
<br/><br/>

- The `track` expression is mandatory for performance.
- Provides several built-in variables like `$index`, `$odd`, `$even`, `$first`, `$last`, and `$count`.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Benefits of the new syntax

- **Clearer and more intuitive**: The syntax is closer to native JavaScript control flow.
- **No more microsyntax**: Eliminates the complex grammar of `let`, `as`, and `of`.
- **Improved type checking**: The compiler can better infer types within the blocks.
- **Built-in**: Control flow is part of the core framework, no need to import `CommonModule` for `@if`, `@for`, etc.
