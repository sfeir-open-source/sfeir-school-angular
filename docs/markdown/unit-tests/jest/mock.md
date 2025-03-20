<!-- .slide: class="with-code inconsolata" -->
# Mock avec Jest

Jest permet de facilement mocker:

- jest.fn
- jest.spyOn

<br/><br/>

```typescript
const PEOPLE_SERVICE_STUB = {
  getPeople: jest.fn(() => of(PEOPLE)),
  getRandomPeople: jest.fn(() => of(PERSON)),
};
const spy = jest.spyOn(component, 'getPeople');
```
<!-- .element: class="big-code" -->

<br/><br/>

Ces deux méthodes renvoit le type Jest.Mock

##==##

<!-- .slide: class="with-code inconsolata" -->

# What to test with a spy

<br/><br/>

```typescript
it('What to expect with a spy', () => {
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(PEOPLE_SERVICE_STUB).toHaveBeenCalledWith({ name: 'SFEIR'})
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# How to mock the returns of a mock function
<br/><br/>

```typescript
const PEOPLE_SERVICE_STUB = {
  getPeople: jest.fn(() => of(PEOPLE)),
  getRandomPeople: jest.fn(() => of(PERSON)),
};

jest.spyOn(component, 'getPeople').mockReturnValue({ name: 'SFEIR' });
```
<!-- .element: class="big-code" -->
