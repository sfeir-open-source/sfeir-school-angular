<!-- .slide: class="transition-bg-sfeir-2" -->
# Concepts

##==##

<!-- .slide-->

# General TDD Concepts

-   **describe(string, function)**: a scenario of specs to execute<br/><br/>
-   **it(string, function)**: a spec contains one or more checks<br/><br/>
-   **toXXXX(expected) ⇒ toBe(expected)**: a matcher compares the obtained result with an expected result<br/><br/>
-   **beforeAll/afterAll, beforeEach/afterEach**: allows executing code before/after each scenario/test<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->
# TDD Concepts (example)

```typescript
describe('scenario description...', () => {
  // setup
  beforeEach(() => {}));

  // test
  it('should return some value', () => {
    expect(service.getSomeValue()).toContain('some value');
  });
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# A complete example

![full-center h-900](assets/images/school/unit-tests/exemple_concepts.png)

##==##

<!-- .slide: class="with-code inconsolata" -->
# The Angular API for TDD

**TestBed**: test configuration module (similar to NgModule)

```typescript
TestBed.configureTestingModule({
  declarations: [UserComponent],
  providers: [UserService]
});
```
<!-- .element: class="big-code" -->

<br/><br/>

**Inject**: dependency injection

```typescript
inject([UserService], userService => {
    // sync test
});
```
<!-- .element: class="big-code" -->
