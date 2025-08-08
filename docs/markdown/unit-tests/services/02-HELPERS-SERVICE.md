<!-- .slide: class="with-code inconsolata no-title-margin" -->

# Helper services

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  getName() {
    return 'Igor';
  }
}
```

<!-- .element: class="big-code" -->

<br/><br/>

```typescript
beforeEach(() => TestBed.configureTestingModule({ providers: [UserService] }));
it('should return a valid name', inject([UserService], service => {
  let name = service.getName();
  expect(name).toContain('Igor');
  expect(name.length).toEqual(4);
}));
```

<!-- .element: class="big-code" -->
