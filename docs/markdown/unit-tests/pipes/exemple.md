<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant
<br><br>

```typescript
@Pipe({
  name: 'capitalise'
})
export class UpPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new Error('Requires a String as input');
    }
    return value.toUpperCase();
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant
<br><br>

```typescript
it('should capitalise', () => {
  const pipe = new UpPipe();
  expect( pipe.transform('sfEiR') ).toEqual('SFEIR');
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant
<br><br>

```typescript
it('should capitalise', () => {
  const pipe = new UpPipe();
  expect(()=> pipe.transform(123) ).toThrow();
  expect(()=> pipe.transform(null) ).toThrow();
  expect(()=> pipe.transform() ).toThrowError('Requires a String as input');
});
```
<!-- .element: class="big-code" -->
