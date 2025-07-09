<!-- .slide: class="with-code inconsolata" -->
# Template References

- Created in the template using a hash symbol (`#`).
- Provides a direct reference to a DOM element, component, or directive.
- Can be accessed within the component class using the `@ViewChild` and `@ViewChildren` decorators.
<br/><br/>

```html
<input #searchInput type="text" />
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# @ViewChild and @ViewChildren Decorators

- `@ViewChild`: Gets a reference to a single element from the template.
- `@ViewChildren`: Gets a `QueryList` of all elements matching the selector.
- The reference is only available after the view has been initialized, in the `ngAfterViewInit` lifecycle hook.

```html
<my-component #myComp></my-component>
```
<!-- .element: class="small-code" -->

```typescript
export class AppComponent implements AfterViewInit {
  // The { static: ... } option is no longer needed in modern Angular
  @ViewChild('myComp') private myComponentRef: ElementRef;

  ngOnInit(): void {
    // Returns undefined because the view is not yet initialized
    console.log(this.myComponentRef);
  }

  ngAfterViewInit(): void {
    // The reference is available here
    console.log(this.myComponentRef);
  }
}
```
<!-- .element: class="small-code" -->

Notes:
- The `read` option is useful for getting a specific token from an element. For example, if an element has a directive applied (e.g., `#myForm="ngForm"`), you can use `read: NgForm` to get an instance of the directive instead of the default `ElementRef`.
