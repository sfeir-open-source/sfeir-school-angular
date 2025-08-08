<!-- .slide: class="transition-bg-sfeir-2" -->

# Host Binding

##==##

# Host binding: Definition

- Allows setting a property on the directive's host element<br/><br/>
- **@HostBinding()** decorator<br/><br/>
- **host property** component | directive annotation + **property to bind** <br/><br/>
- Watches host properties and updates automatically

##==##

<!-- .slide: class="inconsolata with-code" -->

# Host binding Decorator: Example

```typescript
@Directive({ selector: '[ngModel]' })
class NgModelStatus {
  public readonly control = inject(NgModel);
  @HostBinding('class.valid') get valid() {
    return this.control.valid;
  }
  @HostBinding('class.invalid') get invalid() {
    return this.control.invalid;
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- here, it sets the class property to valid if the control is valid, or invalid if the control is invalid

##==##

<!-- .slide: class="with-code inconsolata" -->

# Host property + binding property: Example

```typescript
@Directive({
  selector: '[ngModel]',
  host: {
    '[class.invalid]': 'control.invalid',
    '[class.valid]': 'control.valid',
  },
})
class NgModelStatus {
  public readonly control = inject(NgModel);
}
```

<!-- .element: class="big-code" -->
