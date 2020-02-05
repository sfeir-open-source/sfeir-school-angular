<!-- .slide: class="sfeir-basic-slide with-code" -->
# Un exemple est plus parlant
<br><br>
```typescript
@Component({
  selector: 'user-profile',
  template: `<h1>Hi {{name}}!</h1>`
})
export class UserComponent { 
  @Input() name;
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Un exemple est plus parlant
<br><br>
```typescript
// setup
beforeEach(() => ... );

it('should render `Hi Igor!`', inject(() => {
   instance.name = 'Igor';

   fixture.detectChanges();
   expect(element.querySelector('h1').innerText).toBe('Hi Igor!');
}));
```
<!-- .element: class="big-code" -->
