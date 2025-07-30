<!-- .slide: class="with-code inconsolata" -->

# The ng-container directive

- Creates a template without creating an additional element<br/><br/>
- Useful when you need to use multiple structural directives on the same element <br/><br/>
- Useful for teleporting content from an ng-template tag <br/><br/>

```html
<ng-container *ngIf="lessons.length > 0">
  <div class="lesson" *ngFor="let lesson of lessons">
    <div class="lesson-detail">{{lesson | json}}</div>
  </div>
</ng-container>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The ngTemplateOutlet structural directive

- Takes two parameters, a template and a context
- The context must be an object <br/><br/>

```typescript
@Component({
  selector: 'app-root',
  template: `
    <ng-template #estimateTemplate let-lessonsCounter="estimate">
      <div>Approximately {{ lessonsCounter }} lessons ...</div>
    </ng-template>
    <ng-container *ngTemplateOutlet="estimateTemplate; context: ctx"> </ng-container>
  `,
})
export class AppComponent {
  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
}
```

<!-- .element: class="medium-code" -->

Notes:

- Here, `let-lessonsCounter` must be equal to `estimate`, since that is how the variable is named in the context.
- If you want to use a variable other than `estimate` with a random name, you must use `$implicit` => `ctx = { $implicit: this.totalEstimate }`

##==##

<!-- .slide: class="inconsolata with-code"-->

# The concept of implicit context

- Allows defining a template variable without assigning it <br/><br/>

```typescript
@Component({
  selector: 'app-root',
  template: `
    <ng-template #estimateTemplate let-lessonsCounter>
      <div>Approximately {{ lessonsCounter }} lessons ...</div>
    </ng-template>
    <ng-container *ngTemplateOutlet="estimateTemplate; context: ctx"> </ng-container>
  `,
})
export class AppComponent {
  totalEstimate = 10;
  ctx = { $implicit: this.totalEstimate };
}
```

<!-- .element: class="medium-code" -->
