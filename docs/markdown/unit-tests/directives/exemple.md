<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant
<br><br>

```typescript
describe('myBadgeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponentForBadgeDirective, myBadgeDirective]
    });
  });
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant
<br><br>

```typescript
it('should ...', () => {
  let fixture = TestBed
    .overrideComponent(HostComponentForDirective, {
      set: {
        template: '<div my-badge></div>'
      }
    })
    .createComponent(HostComponentForDirective);
  fixture.detectChanges();
  const divElement = fixture.nativeElement.querySelector('div');
  expect(divElement.innerHTML).toBe('^^'); 
});
```
<!-- .element: class="big-code" -->
