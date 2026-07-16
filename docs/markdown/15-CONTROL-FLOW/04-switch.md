<!-- .slide: class="with-code inconsolata" -->

# `@switch` — one of many

Pick a single branch based on a value, like a JavaScript `switch`. Matching uses strict equality (`===`), with an optional `@default`:

<br/>

```html
@switch (user().role) {
  @case ('admin') {
    <admin-panel />
  }
  @case ('member') {
    <member-area />
  }
  @default {
    <guest-view />
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- There is no fall-through: only the first matching `@case` renders.
- `@default` is optional; if no case matches and there is no default, nothing renders.
