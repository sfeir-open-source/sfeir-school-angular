<!-- .slide: class="sfeir-basic-slide" -->
# HTTP Services

You need to import Angular's HTTP client to execute your requests<br/><br/>
- __HttpClientModule__: which will make real calls<br/><br/>
- __HttpClientTestingModule__: which will not make real calls, so you will have to mock the response

##==##

<!-- .slide: class="with-code inconsolata" -->
# Testing with HttpClientModule

```typescript
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  
  getNameFromServer(){
    return this.http.get('api/users/123?info=username');
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Testing with HttpClientModule
```typescript
let service: UserService;
beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
    providers: [ UserService ]
  })
  service = TestBed.inject(UserService);
});
  
it('should return a valid name', () => {
  service.getNameFromServer().subscribe(name => { 
     expect(name).toContain('Igor');
     expect(name.length).toEqual(4);
  });
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Testing with HttpClientTestingModule
```typescript
let service: UserService;
let httpTestingController: HttpTestingController;
beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserService ]
    })
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
});
it('should return mocked username', () => {
  let response = 'Brad'; 
  service.getNameFromServer().subscribe(name => {
    expect(name).toContain('Brad');
    expect(name.length).toBe(4);
  });
  const req = httpTestingController.expectOne('api/users/123?info=username');
  req.flush(response);
  httpTestingController.verify(); // => afterEach verify pending request
});

```
<!-- .element: class="medium-code" -->

Notes:
- `HttpTestingController` and `HttpClientTestingModule` come from the `@angular/common/http/testing` package.
