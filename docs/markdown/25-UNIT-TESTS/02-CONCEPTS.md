<!-- .slide: class="transition-bg-sfeir-2" -->

# Concepts

##==##

# General TDD Concepts

- **describe(string, function)**: a scenario of specs to execute<br/><br/>
- **it(string, function)**: a spec contains one or more checks<br/><br/>
- **toXXXX(expected) ⇒ toBe(expected)**: a matcher compares the obtained result with an expected result<br/><br/>
- **beforeAll/afterAll, beforeEach/afterEach**: allows executing code before/after each scenario/test<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# TDD Concepts (example)

```typescript
describe('scenario description...', () => {
  // setup
  beforeEach(() => {});

  // test
  it('should return some value', () => {
    expect(service.getSomeValue()).toContain('some value');
  });
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# A complete example

```typescript
const SEARCH = jest.fn();

describe('SearchBar', () => {
  let fixture: ComponentFixture<SearchBar>;
  let component: SearchBar;

  beforeEach(async () => {
    const { fixture: componentFixture } = await render(SearchBar, {
      inputs: { initialSearch: 'sfeir' },
      on: {
        search: SEARCH,
      },
    });
    fixture = componentFixture;
    component = fixture.componentInstance;
  });

  test('should create an instance of SearchBar', () => {
    expect(component).toBeInstanceOf(SearchBar);
  });
});
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The Angular API for TDD

**TestBed**: test configuration module (similar to NgModule)

```typescript
TestBed.configureTestingModule({
  declarations: [UserComponent],
  providers: [UserService],
});
```

<!-- .element: class="medium-code" -->

<br/><br/>

**Inject**: dependency injection

```typescript
it('should correctly inject UserService', inject([UserService], userService => {
  expect(userService).toBeTruthy();
}));
```

<!-- .element: class="medium-code" -->
