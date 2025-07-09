<!-- .slide: class="transition-bg-sfeir-2" -->
# Testing your directives

##==##

<!-- .slide: class="with-code inconsolata" -->
# The Setup

- __Same API as for components__: TestBed, ComponentFixture..<br><br>
- Requires creating a test component to host the directive<br><br>

```typescript
@Component({
  selector: 'test-my-directive',
  template: ``
})
export class HostComponentForDirective {}
```
<!-- .element: class="big-code" -->
Notes:
- Since a component is a directive with a view, it's normal that it uses the same API as components.
- A directive is always placed on an HTML element present in the component's view. It is therefore necessary to create a "buffer" component that will host our directive for testing.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Initializing the HostComponent

```typescript
TestBed
  .overrideComponent(HostComponentForDirective, {
    set: {
      template: `<div my-directive></div>`
    }
  })
  .createComponent(HostComponentForDirective);
```
<!-- .element: class="big-code" -->
Notes:
- Once initialized, all that's left is to test our directive.
