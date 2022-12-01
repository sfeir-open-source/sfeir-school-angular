<!-- .slide: class="with-code inconsolata" -->
# Un exemple est plus parlant

```typescript
@Component({
  selector: 'user-profile',
  template: `
    <h1>Hi {{ name }}!</h1>
  `
})
export class UserComponent {
  @Input() name;
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple est plus parlant

```typescript
// setup
beforeEach(() => ... );

it('should render `Hi Igor!`', () => {
  instance.name = 'Igor';

  fixture.detectChanges(); // refresh the view
  expect(element.querySelector('h1').innerText).toBe('Hi Igor!');
  expect(debugElement.query(By.css('h1')).nativeElement.innerText).toBe('Hi Igor!');
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# DebugElement: outil bien pratique pour chercher des éléments

```typescript
debugElement.query(By.css('button')); // renvoit un DebugElement du button
debugElement.queryAll(By.css('dnl-line')); // renvoit un tableau de DebugElement
debugElement.query(By.css('#id-component')); // renvoit le debugElement du composant portant l’id 'id-component'
debugElement.query(By.css('[test-id=button-1]')); // renvoit le debugElement du premier composant ayant un attribut css test-id avec la valeur 'button-1'
debugElement.query(By.css('button[type=submit]')); // renvoit le debugElement du premier button ayant l’attribut 'type' avec la valeur 'submit'
debugElement.query(By.css('.class-name')); // renvoit le debugElement du premier element ayant la classe css 'class-name'

const nameDiv = debugElement.query(By.css('.name-container'));
expect(nameDiv).toBeTruthy();
expect(nameDiv).nativeElement.textContent.toEqual('Durand');
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# DebugElement: aussi pour déclencher des événements !

```typescript
debugElement.query(By.css('button')).triggerEventHandler('click', null);
debugElement.query(By.css('my-form')).triggerEventHandler('cancel', null);
const mockSubmitData = {name: 'titi' , … , … }
debugElement.query(By.css('my-form')).triggerEventHandler('submit', mockSubmitData);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Mocker via l’Injector dans les providers

-   Permet de changer une classe injectée (par exemple un service) par une autre (mock class)<br/><br/>
-   Pratique si tous les tests doivent utiliser les mêmes mocks

##==##

<!-- .slide: class="with-code inconsolata" -->

# Mocker (exemple)

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ UserProfileComponent ]
    providers: [ UserService ]
  });

  const fixture = TestBed.createComponent(UserProfileComponent);
  const instance = fixture.componentInstance;
  const debug   = fixture.debugElement;
  const userService = TestBed.inject(UserService);
  // déclenche le changement, execute ngOnInit au premier appel
  fixture.detectChanges();
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Mocker (exemple)

```typescript
export class MockUserService {
  isLoggedIn: boolean = true;
  user = { name: 'Test User' };
  disconnect() {
    this.isLoggedIn = false;
    this.user = null;
  }
  connect(user: User) {
    this.isLoggedIn = true;
    this.user = { name: 'Test User' };
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Mocker (exemple)

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ UserProfileComponent ]
    providers: [ { provide: UserService, useClass: MockUserService}]
  });
  const userService = TestBed.inject(UserService);
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Mocker (exemple)

```typescript
let userServiceStub: Partial<UserService>;

beforeEach(() => {
  userServiceStub = {
    isLoggedIn = true,
    user = { name: 'Test User'},
	disconnect() => { userServiceStub.isLoggedIn = false}
  };
  TestBed.configureTestingModule({
    declarations: [ UserProfileComponent ]
    providers: [ {provide: UserService, useValue: userServiceStub}]
  });
  const userService = TestBed.inject(UserService);
});
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Mocker spyOn (Jasmine)

-   Permet de tester le nombre d’appels d’une méthode<br/><br/>
-   Permet de tester les paramètres d’appel d’une méthode.<br/><br/>
-   ! Permet de mocker le retour des méthodes !

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Mocker spyOn (Jasmine)

```typescript
let userService: UserService;

beforeEach(() => {
  userService = TestBed.inject(UserService);
});

it('test', () => {
  const spy = spyOn(userService, 'connect');
  debugElement
    .query(By.css('button[type=submit]'))
    .triggerEventHandler('click', null);
  expect(spy).toHaveBeenCalled();
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Mocker spyOn (Jasmine)

```typescript
let spy = spyOn(userService, 'getUsers').and.returnValues(fakeUsers);
let otherSpy = spyOn(userService, 'createUser')
           .withArgs({name:'Martin', firstname:'Jo'} … , … )
           .and.returnValue(fakeMartin);

expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(...params);
expect(spy).toHaveBeenCalledTimes(number);
expect(spy).toHaveBeenCalledBefore(otherSpy);

```
<!-- .element: class="big-code" -->
