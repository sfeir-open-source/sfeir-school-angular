<!-- .slide: class="with-code inconsolata" -->

# Interpolation inside an attribute

`{{ }}` isn't limited to an element's visible text — it can sit **inside an attribute string**, mixed with literal characters. Angular concatenates the pieces into the final attribute value.

<br/>

```html
<a href="mailto:{{ _person().email }}" [title]="'Email ' + _person().firstname">
  {{ _person().email }}
</a>
```

<!-- .element: class="big-code" -->

Notes:

- `href="mailto:{{ ... }}"` is interpolation: the attribute is a composed string (`mailto:` + the email), so it must use `{{ }}`, not a property binding `[href]="_person().email"` (which would replace the whole attribute with just the email, losing the `mailto:` prefix).
- This is the exact technique `03-bindings` asks for on the email (`mailto:`), phone (`tel:`) and "Locate"/"Edit" action links (built from `_person().id`).

##==##

<!-- .slide -->

# Interpolation vs. property binding: which one?

| You're building...                              | Use                              |
| ------------------------------------------------ | --------------------------------- |
| A composed **string** (`mailto:` + email, a sentence for `title`) | Interpolation `attr="{{ expr }}"` |
| The **raw value** itself, of any type              | Property binding `[attr]="expr"`  |

<br/>

- `<img [ngSrc]="photoUrl()" />` — the value **is** the URL, nothing to compose → property binding
- `<a href="tel:{{ phone() }}">` — the value is a **prefix + the phone number** → interpolation

Notes:

- Mixing them up is a very common source of `NG0` template errors or of an attribute literally showing `{{ _person().email }}` on screen (missing `{{ }}` where interpolation was needed).
