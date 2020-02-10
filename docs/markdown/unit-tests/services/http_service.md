<!-- .slide: class="sfeir-basic-slide" -->
# Les services http
<br><br>
Il faut importer le client Http d'Angular pour exécuter nos requêtes<br><br>
- __HttpModule__: qui va réaliser de vrais calls<br><br>
- __HttpClientTestModule__: qui ne vas pas réaliser de vrais call, il faudra donc mocker la réponse

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Test avec HttpModule
<br><br>
```typescript
@Injectable()
export class UserService {
  constructor(private http:Http) { }
  
  getNameFromServer(){
    return this.http.get('api/users/123?info=username')
      .map(response => response.json());
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Test avec HttpModule
```typescript
let service: UserService;
beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ HttpModule ],
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

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Test avec HttpClientTestModule
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
  const req = httpTestingController.expectOne('/service-url');
  req.flush(response);
  httpTestingController.verify();
});

```
<!-- .element: class="big-code" -->

Notes
- HttpTestingController et HttpClientTestingModule proviennent du package @angular/common/http/testing'
