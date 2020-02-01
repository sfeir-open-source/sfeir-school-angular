<!-- .slide: class="sfeir-basic-slide with-code" -->
# Les helpers services
<br>
```typescript
@Injectable()
export class UserService {
  constructor() { }
  getName(){
    return 'Igor';
  }
}
```
<br>
```typescript
// setup
beforeEach(() => TestBed.configureTestingModule({ providers:[ UserService ] }));
it('should return a valid name', inject([ UserService ], (service) => {
  let name = service.getName();
  expect(name).toContain('Igor');
  expect(name.length).toEqual(4);
}));
```
