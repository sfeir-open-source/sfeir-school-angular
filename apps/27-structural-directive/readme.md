# 27 · Structural Directive

> Build a `*sfeirPhoneSecret` directive that adds a show/hide toggle to a phone input.

**Folder** `apps/27-structural-directive` · **Solution** `apps/27-structural-directive-solution` · **Run** `npm run client -- 27-structural-directive`

## 🎯 Goal

Create a structural directive that wraps an input, renders it through a helper component, and adds a visibility button to switch the field between `text` and `password`.

## 📚 What you'll learn

- What structural directives are and how the `*` syntax desugars
- How `TemplateRef` and `ViewContainerRef` let a directive render content dynamically
- How to create a component at runtime with `createComponent` + `inputBinding`

## ✅ Before you start

- Completion of the custom directive exercises (15, 26)
- Start the mock API: `npm run server:start`

## ℹ️ How the `*` syntax works

`*sfeirPhoneSecret="let type"` is sugar for:

```html
<ng-template [sfeirPhoneSecret]="">
  <input [type]="type" … />
</ng-template>
```

That's why a structural directive receives a `TemplateRef` — it's the content Angular wraps in the generated `ng-template`. The `let type` variable binds to the context's `$implicit` value.

## 🛠️ Steps

### Step 1 — Create the helper component

The directive renders this component, which shows the original input (via `ngTemplateOutlet`) plus a toggle button:

```typescript
@Component({
  imports: [MatIconModule, NgTemplateOutlet, MatButtonModule],
  template: `
    <div class="container-field-icon">
      <ng-container *ngTemplateOutlet="templateRef(); context: { $implicit: type() }" />
      <button type="button" matIconButton (click)="changeVisibility($event)" name="change-visibility">
        <mat-icon>{{ type() === 'text' ? 'visibility' : 'disabled_visible' }}</mat-icon>
      </button>
    </div>
  `,
  styles: `.container-field-icon { display: flex; gap: 1rem; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class Phone {
  templateRef = input.required<TemplateRef<{ $implicit: string }>>();
  type = signal('text');

  changeVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.type.update(type => (type === 'text' ? 'password' : 'text'));
  }
}
```

### Step 2 — Implement the directive

Inject the host `TemplateRef` and a `ViewContainerRef`, then create the `Phone` component and hand it the template:

```typescript
@Directive({ selector: '[sfeirPhoneSecret]' })
export class PhoneSecret {
  private readonly templateRef = inject(TemplateRef<{ $implicit: string }>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    this.viewContainerRef.createComponent(Phone, {
      bindings: [inputBinding('templateRef', () => this.templateRef)],
    });
  }
}
```

### Step 3 — Use it on the phone field

```html
<mat-form-field appearance="outline">
  <mat-label>Phone</mat-label>
  <input *sfeirPhoneSecret="let type" [type]="type" matInput placeholder="phone" formControlName="phone" />
</mat-form-field>
```

## ▶️ Run & verify

```bash
npm run client -- 27-structural-directive
```

Open the person form and check:

- [ ] The phone field shows a visibility toggle button
- [ ] Clicking it switches the field between visible text and masked password
- [ ] The field still participates in the form

## 💡 Key concepts

- **`TemplateRef` + `ViewContainerRef`** — the building blocks of dynamic rendering: the template to stamp, and the place to stamp it.
- **`$implicit` context** — the value bound to `let type`; the directive feeds the current `type` back into the input.
- **`createComponent` vs `createEmbeddedView`** — creating a *component* lets you wrap the projected input in extra UI (the button) and hold state (the current type).

## 🧯 Troubleshooting

- **Input doesn't render** — ensure the helper uses `ngTemplateOutlet` with the `$implicit` context and the directive passes `templateRef`.
- **Toggle doesn't switch** — the button must `stopPropagation()` and `update` the `type` signal.
- **Legacy note** — `*ngIf`/`*ngFor`/`*ngSwitch` are the old structural directives; prefer `@if`/`@for`/`@switch` for control flow. Custom structural directives like this one are still the right tool for DOM-shaping behaviour.
