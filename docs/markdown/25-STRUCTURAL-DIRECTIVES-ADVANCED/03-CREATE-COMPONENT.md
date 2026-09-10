# Delegating rendering to a component

`Secret` has no template of its own — it delegates rendering to `SecretContainer`, a small component whose whole job is to outlet the captured template *and* draw the toggle button around it.

<br/><br/>

The problem: `viewContainer.createComponent(SecretContainer)` has **no `[ ]` template syntax** to bind through — there's no template at the call site at all, just TypeScript. How do you get the captured `TemplateRef` into `SecretContainer`?

##==##

<!-- .slide: class="with-code inconsolata" -->

# `createComponent()` + `inputBinding()`

```typescript
@Directive({ selector: '[sfeirSecret]' })
export class Secret {
  private templateRef = inject<TemplateRef<{ $implicit: 'text' | 'password' }>>(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    this.viewContainer.createComponent(SecretContainer, {
      bindings: [inputBinding('template', () => this.templateRef)],
    });
  }
}
```

<!-- .element: class="big-code" -->

- `inputBinding('template', () => this.templateRef)` wires an **imperative** binding: it matches the string `'template'` to an `input()` declared on `SecretContainer`, evaluating the callback to get the current value<br/><br/>
- This is the programmatic equivalent of writing `[template]="templateRef"` in a template that doesn't exist here

Notes:

- A typo in the input's name (`'tempalte'`) fails to bind silently or throws, depending on strictness — there's no compiler checking a string against a component's inputs the way there is for `[template]` in an actual template.

##==##

# Step by step: what `createComponent()` actually does

1. Angular instantiates `SecretContainer` — runs its constructor, its field initializers, its `input()` declarations<br/><br/>
2. The `bindings` you pass are applied **before** Angular's own change detection first runs on the new instance — `SecretContainer`'s `template` input already has a value on its very first render<br/><br/>
3. The new component instance is inserted into the DOM at the `ViewContainerRef`'s location — exactly where `<input *sfeirSecret="let type">` used to sit<br/><br/>
4. `SecretContainer`'s own template renders, using `[ngTemplateOutlet]="template()"` to render the caller's captured field markup **inside itself**, wrapped by whatever else `SecretContainer` draws (the toggle button)

##==##

<!-- .slide: class="with-code inconsolata" -->

# `SecretContainer`: outletting the field, passing the mode back out

```typescript
@Component({
  selector: 'sfeir-secret-container',
  imports: [NgTemplateOutlet, MatIconButton, MatIcon],
  template: `
    <ng-template [ngTemplateOutlet]="template()" [ngTemplateOutletContext]="{ $implicit: type() }" />
    <button mat-icon-button (click)="toggle()"><mat-icon>{{ type() === 'password' ? 'visibility' : 'visibility_off' }}</mat-icon></button>
  `,
})
export class SecretContainer {
  template = input.required<TemplateRef<{ $implicit: 'text' | 'password' }>>();
  private _revealed = signal(false);
  type = computed(() => (this._revealed() ? 'text' : 'password'));
  toggle = () => this._revealed.update(revealed => !revealed);
}
```

<!-- .element: class="small-code" -->

- `type()` is the value flowing back **out**, through the outlet's `$implicit` context — read on the caller's side as `let type`<br/><br/>
- The caller's `<sfeir-input [type]="type">` never knows a component was created dynamically; it just sees a template variable change value

##==##

# The full round trip, in one picture

```
*sfeirSecret="let type"  →  Secret (TemplateRef + ViewContainerRef)
        │                              │
        │                createComponent(SecretContainer,
        │                  bindings: [inputBinding('template', () => templateRef)])
        │                              │
        ▼                              ▼
  <ng-template>                SecretContainer
  captured, never                - outlets the template via NgTemplateOutlet
  rendered directly                - draws the toggle button around it
        │                          - exposes `type` through the outlet's context
        └──────────── rendered here, with the button ─────────────┘
                    back out as `let type` on the caller's side
```

<!-- .element: class="important" -->

<br/>

Three moving pieces, one mental model: a directive that *captures* a template, a component that *renders* it (plus extra UI), and a context object that carries data across that boundary in both directions.
