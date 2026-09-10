<!-- .slide: class="with-code inconsolata" -->

# A first look at the template: interpolation

A component's template can read the class's properties with **double curly braces** — this is **interpolation**.

<br/>

```typescript
// app.ts
export class App {
  name = 'Ada';
}
```

<!-- .element: class="medium-code" -->

```html
<!-- app.html -->
<mat-card>{{ name }}</mat-card>
```

<!-- .element: class="medium-code" -->

Notes:

- This is exactly what you'll do in `01-hands-on`: expose your name as a class property, then display it inside a `<mat-card>` with `{{ }}`.
- We're keeping this deliberately simple for now — a plain field. As soon as the app needs to *react* to change (a click, a timer, a server response), that field becomes a **signal**, which is the whole subject of the next module.

##==##

<!-- .slide -->

# Interpolation is not just for text

Anything between `{{ }}` is a TypeScript **expression**, evaluated in the component's context — not a full statement:

<br/>

- ✅ `{{ name }}`, `{{ user.email }}`, `{{ 1 + 1 }}`, `{{ isAdmin ? 'Admin' : 'User' }}`
- ❌ no assignment, no `new`, no access to `window`/`document`
- Angular automatically **escapes** the result — interpolation can never inject raw HTML, which is one of Angular's built-in protections against XSS

Notes:

- We'll come back to interpolation in much more depth in the next module (signals, property binding, attribute interpolation) once the app actually has state worth binding to.
