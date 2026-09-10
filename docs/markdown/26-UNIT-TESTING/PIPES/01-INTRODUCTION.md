<!-- .slide: class="transition-bg-sfeir-2" -->

# Testing pipes

##==##

<!-- .slide: class="with-code inconsolata" -->

# A pipe is just a pure function in a wrapper

```typescript
@Pipe({ name: 'capitalise' })
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

No `TestBed`, no `render()` needed — `new UpPipe()` gives you a real instance, because a pipe has no dependencies to inject in the general case.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Testing the `transform()` method directly

```typescript
it('should capitalise', () => {
  const pipe = new UpPipe();
  expect(pipe.transform('sfEiR')).toEqual('SFEIR');
});

it('should throw on invalid input', () => {
  expect(() => pipe.transform(123 as never)).toThrow();
  expect(() => pipe.transform(null as never)).toThrowError('Requires a String as input');
});
```

<!-- .element: class="medium-code" -->

The Staff Directory app doesn't ship a custom pipe today, but if one appears (formatting a phone number, an entity name, a date), this is the whole recipe: instantiate directly, assert on `transform()`, including the edge/error cases.
