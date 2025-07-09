<!-- .slide: class="with-code inconsolata" -->
# An example is more telling

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
# An example is more telling

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
# DebugElement: a handy tool for finding elements

```typescript
debugElement.query(By.css('button')); // returns a DebugElement of the button
debugElement.queryAll(By.css('dnl-line')); // returns an array of DebugElement
debugElement.query(By.css('#id-component')); // returns the debugElement of the component with the id 'id-component'
debugElement.query(By.css('[test-id=button-1]')); // returns the debugElement of the first component with a css attribute test-id with the value 'button-1'
debugElement.query(By.css('button[type=submit]')); // returns the debugElement of the first button with the attribute 'type' with the value 'submit'
debugElement.query(By.css('.class-name')); // returns the debugElement of the first element with the css class 'class-name'

const nameDiv = debugElement.query(By.css('.name-container'));
expect(nameDiv).toBeTruthy();
expect(nameDiv.nativeElement.textContent).toEqual('Durand');
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# DebugElement: also for triggering events!

```typescript
debugElement.query(By.css('button')).triggerEventHandler('click', null);
debugElement.query(By.css('my-form')).triggerEventHandler('cancel', null);
const mockSubmitData = {name: 'titi'};
debugElement.query(By.css('my-form')).triggerEventHandler('submit', mockSubmitData);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Mocking via the Injector in providers

-   Allows changing an injected class (e.g., a service) with another (mock class)<br/><br/>
-   Convenient if all tests should use the same mocks

##==##

<!-- .slide: class="with-code inconsolata" -->

# Mocking (example)

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ UserProfileComponent ],
    providers: [ UserService ]
  });

  const fixture = TestBed.createComponent(UserProfileComponent);
  const instance = fixture.componentInstance;
  const debug   = fixture.debugElement;
  const userService = TestBed.inject(UserService);
  // triggers change detection, executes ngOnInit on first call
  fixture.detectChanges();
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Mocking (example)

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

# Mocking (example)

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ UserProfileComponent ],
    providers: [ { provide: UserService, useClass: MockUserService } ]
  });
  const userService = TestBed.inject(UserService);
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Mocking (example)

```typescript
let userServiceStub: Partial<UserService>;

beforeEach(() => {
  userServiceStub = {
    isLoggedIn: true,
    user: { name: 'Test User'},
	disconnect: () => { userServiceStub.isLoggedIn = false }
  };
  TestBed.configureTestingModule({
    declarations: [ UserProfileComponent ],
    providers: [ { provide: UserService, useValue: userServiceStub } ]
  });
  const userService = TestBed.inject(UserService);
});
```
<!-- .element: class="medium-code" -->
