<!-- .slide: class="with-code inconsolata" -->

# `<ng-container>`: a template without an element

```html
<ng-container *ngIf="lessons.length > 0">
  <div class="lesson" *ngFor="let lesson of lessons">{{ lesson | json }}</div>
</ng-container>
```

<!-- .element: class="medium-code" -->

- Groups content under a structural directive **without** adding an extra DOM element (no wrapping `<div>`)<br/><br/>
- Useful for combining multiple structural directives, and — the relevant use here — for **outletting** a template

##==##

<!-- .slide: class="with-code inconsolata" -->

# `NgTemplateOutlet`: rendering a captured template elsewhere

```typescript
@Component({
  template: `
    <ng-template #estimateTemplate let-count>
      <div>Approximately {{ count }} lessons ...</div>
    </ng-template>
    <ng-container *ngTemplateOutlet="estimateTemplate; context: ctx" />
  `,
})
export class AppComponent {
  ctx = { $implicit: 10 };
}
```

<!-- .element: class="big-code" -->

- Takes two things: a **template**, and a **context** object<br/><br/>
- `let-count` reads the context's `$implicit` key — the "unnamed" slot every `let-x` variable defaults to reading from

##==##

# The implicit context, in one sentence

`context: { $implicit: value }` on the outlet side, `let-x` on the template side — `x` receives `value`. This is the exact mechanic `apps/21-teleportation`'s `List<T>` uses to hand each item to the caller's row template, one instance per item in the `@for`.
