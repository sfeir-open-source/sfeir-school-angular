# A phone number that needs masking

`sfeir-signal-form`'s phone field is, today, a `<sfeir-input>` no different from `firstname`, `lastname`, or `email`. Product wants it masked by default, with an eye icon to reveal it — like a password field.

<br/><br/>

You *could* hard-code that toggle into `signal-form.html`, but it would only ever work for this one field, in this one form. `apps/22-structural-directive` builds it instead as a **custom structural directive** — the exact mechanism `*ngIf` and `*ngFor` are themselves built on.

##==##

# Definition and use cases

- A directive responsible for **layout**: it manipulates DOM elements — adds them, removes them, replaces them<br/><br/>
- Applied to a "host" element via the `*` prefix<br/><br/>
- Unlike an attribute directive (which decorates an element that's already there), a structural directive decides **whether and how** that element exists at all

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `*` is sugar

```html
<input *sfeirSecret="let type" [type]="type" />
```

<!-- .element: class="big-code" -->

desugars to:

```html
<ng-template sfeirSecret let-type>
  <input [type]="type" />
</ng-template>
```

<!-- .element: class="big-code" -->

- The `*` prefix wraps the host element in an implicit `<ng-template>`, and moves the directive itself onto that template<br/><br/>
- `let type` becomes `let-type` — the exact same `let-x` context binding used by `NgTemplateOutlet` in the previous module

##==##

# Grammar summary

<span class="inconsolata">:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )\*"

<!-- .element: class="important" -->

<br/><br/>

| Term       | Description                                             |
| ---------- | ------------------------------------------------------- |
| prefix     | HTML attribute key (`sfeirSecret`)                       |
| local      | Local variable used in the template (`type`)             |
| export     | Variable exported by the directive under a given name    |
| expression | Standard Angular expression                              |

<br/>

Notes:

- This is the same grammar `*ngFor="let item of items; trackBy: trackFn"` and `*ngIf="cond as value"` are parsed with — `*sfeirSecret="let type"` is a much simpler instance of it, using only the `let` form.
