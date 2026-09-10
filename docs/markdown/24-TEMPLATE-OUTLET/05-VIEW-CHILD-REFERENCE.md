# Template references aren't only for `<ng-template>`

`#item` on an `<ng-template>` and `#searchInput` on an `<input>` are the **same** mechanic: a template reference variable, created with `#`, giving a direct handle to an element, component, or directive.

```html
<input #searchInput type="text" />
```

<!-- .element: class="important" -->

<br/>

`contentChild`/`contentChild.required` read a reference **projected by the caller** (task of the previous slides). `viewChild`/`@ViewChild` read a reference declared **inside the component's own template** — a different query, same underlying idea.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `viewChild` (signal function, v18+)

```typescript
@Component({ selector: 'sfeir-app', templateUrl: './app.html' })
export class AppComponent {
  private componentRef = viewChild.required(MyComponent);

  constructor() {
    effect(() => console.log(this.componentRef())); // undefined, then the instance
    afterNextRender({ read: () => console.log(this.componentRef()) }); // always the instance
  }
}
```

<!-- .element: class="medium-code" -->

- Available only after the view has initialized — inside `effect()` it's `undefined` at first, inside `afterNextRender`'s `read` phase it's guaranteed set

##==##

<!-- .slide: class="with-code inconsolata" -->

# `@ViewChild` (decorator, before v18)

```typescript
@Component({ selector: 'sfeir-app', templateUrl: './app.html' })
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('myComp') private myComponentRef!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    console.log(this.myComponentRef); // undefined — view not initialized yet
  }
  ngAfterViewInit(): void {
    console.log(this.myComponentRef); // available here
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- The `read` option (on both `viewChild`/`contentChild` and their decorator equivalents) is useful when an element has a directive applied and you want an instance of that directive instead of the default `ElementRef` — e.g. `read: NgForm` on a `#myForm="ngForm"` reference.
