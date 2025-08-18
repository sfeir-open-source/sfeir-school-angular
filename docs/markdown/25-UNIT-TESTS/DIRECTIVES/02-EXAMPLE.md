<!-- .slide: class="with-code inconsolata" -->

# A more telling example

```typescript
describe('myBadgeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponentForBadgeDirective, Badge],
    });
  });
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# A more telling example

```typescript
it('should set the content of the div to ^^', () => {
  let fixture = TestBed.overrideComponent(HostComponentForDirective, {
    set: {
      template: '<div badge></div>',
    },
  }).createComponent(HostComponentForDirective);
  fixture.detectChanges();
  const divElement = fixture.nativeElement.querySelector('div');
  expect(divElement.innerHTML).toBe('^^');
});
```

<!-- .element: class="big-code" -->
