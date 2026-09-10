<!-- .slide: class="with-code inconsolata" -->

# Capturing the caller's template: `contentChild.required(TemplateRef)`

```typescript
@Component({ selector: 'sfeir-list', imports: [NgTemplateOutlet, MatListModule] })
export class List<T extends { id: unknown }> {
  data = input.required<T[]>();
  itemTemplate = contentChild.required(TemplateRef<{ $implicit: T }>);
}
```

<!-- .element: class="medium-code" -->

- `contentChild` reads a template written **inside** `<sfeir-list>...</sfeir-list>` by its caller — the same relationship as `<ng-content>`, but capturing a `TemplateRef` instead of rendering it directly<br/><br/>
- `.required(...)` throws instead of silently rendering nothing if the caller forgot the template — same contract as `input.required<T>()`

##==##

# Why generic: `class List<T extends { id: unknown }>`

- `List` doesn't know or care whether it's listing `Person`, `Product`, or anything else — only that each item has a stable `id` to `@for`-`track` by<br/><br/>
- The type parameter `T` flows into **both** `data = input.required<T[]>()` and the `TemplateRef<{ $implicit: T }>` context — so the caller's `let-person` variable is strongly typed to whatever `T` actually is, not `any`<br/><br/>
- Without the generic, `itemTemplate()`'s context type and `data()`'s element type could silently drift apart

##==##

<!-- .slide: class="with-code inconsolata" -->

# `list.html`: iterate, then outlet

```html
<mat-list>
  @for (item of data(); track item.id) {
  <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }" />
  }
</mat-list>
```

<!-- .element: class="big-code" -->

- `itemTemplate()` — the captured `TemplateRef`, called as a signal<br/><br/>
- One outlet instance per iteration, each with its **own** `item` in the context — the caller's row template is instantiated once per person, not once total
