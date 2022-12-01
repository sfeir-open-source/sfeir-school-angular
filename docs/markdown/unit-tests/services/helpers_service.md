<!-- .slide: class="with-code inconsolata no-title-margin" -->
# Les helpers services

```typescript
@Injectable()
export class UserService {
    constructor() {}
    getName() {
      return 'Igor';
    }
}
```

<!-- .element: class="big-code" -->

```typescript
// setup
beforeEach(() => TestBed.configureTestingModule({ providers: [UserService] }));
it('should return a valid name', inject([UserService], service => {
    let name = service.getName();
    expect(name).toContain('Igor');
    expect(name.length).toEqual(4);
}));
```
<!-- .element: class="big-code" -->
