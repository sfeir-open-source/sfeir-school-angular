# The directive never sees the host element

Because `*sfeirSecret` desugars onto an `<ng-template>`, `Secret` never receives the `<sfeir-input>` element directly — it only ever gets the **template** wrapping it.

<br/><br/>

To make anything render from that, a structural directive needs exactly two things injected: `TemplateRef` and `ViewContainerRef`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `TemplateRef`: what to render

```typescript
@Directive({ selector: '[sfeirSecret]' })
export class Secret {
  private templateRef = inject<TemplateRef<{ $implicit: 'text' | 'password' }>>(TemplateRef);
}
```

<!-- .element: class="big-code" -->

- Represents the embedded template Angular created from `*sfeirSecret`'s implicit `<ng-template>`<br/><br/>
- Typed to the context object the directive plans to hand back — here, an object exposing `$implicit` as one of two literal states, so `let type` on the caller's side is `'text' | 'password'`, not `any`

##==##

# `ViewContainerRef`: whether and how to render it

- A container where views can be attached — the directive's actual handle to the DOM<br/><br/>
- A structural directive that injects `ViewContainerRef` but never calls anything on it renders **nothing**, exactly like `*ngIf` with a `false` condition<br/><br/>
- Key methods: `createEmbeddedView(templateRef, context)` — instantiate a `TemplateRef` directly — and `createComponent(componentType, options)` — instantiate a whole component

##==##

# Two ways to render, one directive's choice

| Method | Renders | Fits `Secret`? |
| --- | --- | --- |
| `viewContainer.createEmbeddedView(templateRef)` | Just the captured template, nothing else | No extra markup possible around it |
| `viewContainer.createComponent(SomeComponent)` | A whole component, with its own template | Can wrap the projected template with **extra UI** — the toggle button |

<br/>

`Secret` needs to inject a toggle button *around* the field it wraps — a plain `createEmbeddedView` can't add markup that wasn't in the caller's template. That's why it delegates to a small component instead.
