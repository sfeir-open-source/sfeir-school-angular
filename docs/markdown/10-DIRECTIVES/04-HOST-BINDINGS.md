<!-- .slide: class="with-code inconsolata" -->

# The declarative alternative: `host`

Not everything needs `Renderer2` and imperative code. The `@Directive` decorator's own `host` metadata option lets you declare bindings and listeners **in the decorator itself** — no imperative DOM code at all.

<br/>

```typescript
@Directive({
  selector: '[myDirective]',
  host: {
    '[class.active]': 'isActive()',
    '(click)': 'onClick()',
  },
})
export class MyDirective {
  protected readonly isActive = signal(false);

  onClick(): void {
    this.isActive.set(true);
  }
}
```

<!-- .element: class="small-code" -->

Notes:

- `[key]` inside `host` is a **property binding** on the host element (here, a CSS class) — its value is a string expression evaluated on the directive instance, exactly like a template binding.
- `(key)` inside `host` is a **listener** on a native DOM event — its value is a method call, exactly like `(click)="..."` in a template.
- A signal is a natural single source of truth here: a listener only `.set()`s it, and the `host` binding is what actually pushes the value to the DOM — no `Renderer2`, no `ElementRef` needed for this kind of behavior.

##==##

<!-- .slide -->

# `host` vs `Renderer2`: which one, when?

| Situation                                                              | Reach for                     |
| ------------------------------------------------------------------------ | -------------------------------- |
| A direct mapping: one event → update one host property/style/class      | `host` metadata                 |
| Imperative control: injecting markup, conditional multi-step DOM work   | `Renderer2` inside `effect()`  |

<br/>

A directive can use **both**, for two independent behaviors — one imperative (content-shaped, e.g. injecting markup), one a one-to-one event → style mapping. `King`, in the upcoming exercise, is exactly that kind of directive.
