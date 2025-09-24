<!-- .slide: class="with-code inconsolata" -->

# Template References

- Created in the template using a hash symbol (`#`). <br/><br/>
- Provides a direct reference to a DOM element, component, or directive. <br/><br/>
- Can be accessed within the component class using the `@ViewChild` and `@ViewChildren` decorators (before v18).<br/><br/>
- Can be accessed within the component class using the `viewChild` and `viewChildren` signal function (after v18).<br/><br/>

```html
<input #searchInput type="text" />
```

<!-- .element: class="big-code" -->

##==##

# **viewChild** and **viewChildren** signals functions

- **viewChild**: Gets a reference to a single element from the template. <br/><br/>
- **viewChildren**: Gets an `Array` of all elements matching the selector. <br/><br/>
- The reference is only available after the view has been initialized, in the `afterNextRender` hook. <br/><br/>
- The reference could be also defined in the `effect` hook but will be first undefined

##==##

<!-- .slide: class="with-code inconsolata" -->

# **viewChild** and **viewChildren** signals functions example

```html
<my-component />
```

<!-- .element: class="medium-code" -->

```typescript
@Component({ selector: 'sfeir-app', templateUrl: './app.component.html' })
export class AppComponent {
  private componentRef = viewChild.required(MyComponent);

  constructor() {
    effect(() => {
      console.log(this.componentRef()); // first undefined and then the component instance
    });
    afterNextRender({
      read: () => {
        console.log(this.componentRef()); // show the component instance
      },
    });
  }
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# @ViewChild and @ViewChildren Decorators

- **@ViewChild**: Gets a reference to a single element from the template. <br/><br/>
- **@ViewChildren**: Gets a `QueryList` of all elements matching the selector. <br/><br/>
- The reference is only available after the view has been initialized, in the `ngAfterViewInit` lifecycle hook

##==##

<!-- .slide: class="with-code inconsolata" -->

# @ViewChild and @ViewChildren Decorators example

```html
<my-component #myComp />
```

<!-- .element: class="medium-code" -->

```typescript
@Component({ selector: 'sfeir-app', templateUrl: './app.component.html' })
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('myComp') private myComponentRef!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    console.log(this.myComponentRef); // Returns undefined because the view is not yet initialized
  }
  ngAfterViewInit(): void {
    console.log(this.myComponentRef); // The ElementRef<HTMLElement> is available here
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- The `read` option is useful for getting a specific token from an element. For example, if an element has a directive applied (e.g., `#myForm="ngForm"`), you can use `read: NgForm` to get an instance of the directive instead of the default `ElementRef`.
