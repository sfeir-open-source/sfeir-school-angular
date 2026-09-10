<!-- .slide -->

# The third building block

You already know two of Angular's three building blocks: **components** (own a template) and **pipes** (transform a value in an expression).

`08-directive` introduces the third, and least visible: the **directive** — a class that attaches **behavior** to an existing DOM element, without creating any of its own.

![](assets/images/school/directive/directive_schema.png 'h-300 center')

<br/>

- **Structural directives**: change the DOM's shape
- **Attribute directives**: change the appearance or behavior of an element they're attached to
- **Components**: directives with their own template

##==##

<!-- .slide: class="with-code inconsolata" -->

# Directive definition

An attribute directive's selector uses **square brackets** — it matches an HTML attribute, not a tag name:

<br/>

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[myDirective]',
})
export class MyDirective {}
```

<!-- .element: class="big-code" -->

Notes:

- `King`'s selector will be `[sfeirKing]` — attached to a plain `<span>` next to a person's name, not to a component of its own.

##==##

<!-- .slide -->

# How to invoke a directive

- `element-name` — restrict to a tag <br/><br/>
- `[attribute]` — restrict to an attribute <br/><br/>
- `.class` — restrict to a CSS class <br/><br/>
- `[attribute=value]` — restrict to an attribute with a specific value <br/><br/>
- `:not(sub_selector)` — if the element does not match the sub-selector

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

## Some examples

```typescript
@Directive({
  selector: '[sfeirButton]',
})
export class SfeirButtonDirective {}
```

<!-- .element: class="big-code" -->

<br/><br/>

```typescript
@Directive({
  selector: '.error',
})
export class ErrorDirective {}
```

<!-- .element: class="big-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

```typescript
@Directive({
  selector: 'input[onlyNumber]',
})
export class OnlyNumberDirective {}
```

<!-- .element: class="big-code" -->

##++##

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reaching into the DOM: `ElementRef`

A directive has no template of its own — but it can still touch the DOM element it's attached to, via `ElementRef`:

<br/>

```typescript
import { Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[myDirective]' })
export class MyDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
```

<!-- .element: class="big-code" -->

Notes:

- `ElementRef` is a thin wrapper around the host element — the element the directive is attached to. Its `.nativeElement` property gives you the real DOM node.
- Injected with plain `inject()`, exactly like a service.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Mutating it safely: `Renderer2`

Angular provides `Renderer2` as a safe abstraction over DOM manipulation, instead of writing to `nativeElement` directly:

<br/>

```typescript
import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({ selector: '[myDirective]' })
export class MyDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);

  someMethod(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'blue');
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- `Renderer2` works across rendering environments where there's no real DOM API to call — server-side rendering, web workers — because it goes through Angular's own rendering abstraction instead of assuming a browser `document`.
- Prefer it over touching `nativeElement` directly: no hard dependency on a concrete DOM API, so the same directive keeps working outside the browser.
- Common methods: `setStyle`, `setProperty`, `setAttribute`, `addClass`, `removeClass`, `appendChild`, `createElement`...

##==##

<!-- .slide: class="with-code inconsolata" -->

# Passing props to a directive: same API as components

Directive inputs use `input()`, exactly like components — no separate API to learn:

<br/>

```typescript
@Directive({ selector: '[foobar]' })
export class MyDirective {
  myProp = input('');
}
```

<!-- .element: class="big-code" -->

Notes:

- Before Angular 16, this required the `@Input()` decorator instead — same idea, different syntax. You'll mostly see `@Input()` in older codebases now.
- `input()` also takes an `alias` option, letting the template-facing name differ from (or match) the class property name — next up, `03-INPUT-ALIAS.md`.
