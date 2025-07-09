<!-- .slide: class="transition-bg-sfeir-2" -->
# Host Binding

##==##

<!-- .slide -->
# Host binding: Definition

- Allows setting a property on the directive's host element<br/><br/>
- @HostBinding() decorator<br/><br/>
- Watches host properties and updates automatically

##==##

<!-- .slide: class="inconsolata with-code" -->
# Host binding: Example

```typescript
@Directive({selector: '[ngModel]'})
class NgModelStatus {
  constructor(public control: NgModel) {}
  @HostBinding('class.valid') get valid() { return this.control.valid; }
  @HostBinding('class.invalid') get invalid() { return this.control.invalid; }
}
```
<!-- .element: class="big-code" -->
Notes:
- here, it sets the class property to valid if the control is valid, or invalid if the control is invalid
