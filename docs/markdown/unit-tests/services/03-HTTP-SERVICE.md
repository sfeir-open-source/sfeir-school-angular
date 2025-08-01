# HTTP Services

You need to import Angular's HTTP client to execute your requests<br/><br/>

- **provideHttpClient()**: which will make real calls <br/><br/>
- **provideHttpClient() and provideHttpClientTesting()**: which will not make real calls, so you will have to mock the response

##==##

<!-- .slide: class="with-code inconsolata" -->

# Testing with HttpClientModule

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly httpClient = inject(HttpClient);

  getNameFromServer() {
    return this.http.get('api/users/123?info=username');
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Testing with provideHttpClient()

```typescript
let service: UserService;
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [provideHttpClient()],
    providers: [UserService],
  });
  service = TestBed.inject(UserService);
});

it('should return a valid name', done => {
  service.getNameFromServer().subscribe(name => {
    expect(name).toContain('Igor');
    expect(name.length).toEqual(4);
    done();
  });
});
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Testing with provideHttpClient() and provideHttpClientTesting()

```typescript
let service: UserService;
let httpTestingController: HttpTestingController;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [provideHttpClient(), provideHttpClientTesting()],
    providers: [UserService],
  });
  service = TestBed.inject(UserService);
  httpTestingController = TestBed.inject(HttpTestingController);
});
it('should return mocked username', done => {
  service.getNameFromServer().subscribe(name => {
    expect(name).toContain('Brad');
    expect(name.length).toBe(4);
    done();
  });
  const req = httpTestingController.expectOne('api/users/123?info=username');
  req.flush(response);
});

afterEach(() => {
  httpTestingController.verify(); // => afterEach verify pending request
});
```

<!-- .element: class="small-code" -->
