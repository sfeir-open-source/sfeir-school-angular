<!-- .slide: class="transition-bg-sfeir-2" -->

# Putting it all together: `PersonDetails`

##==##

<!-- .slide: class="with-code inconsolata" -->

# A component that renders a child AND has a dependency

```typescript
const STUB_MOCK_PEOPLE_SERVICE = {
  updatePerson: vi.fn(() => of(void 0)),
} satisfies Partial<People>;

const { fixture, debugElement } = await render(PersonDetails, {
  inputs: { person: PERSON },
  providers: [provideRouter([]), { provide: People, useValue: STUB_MOCK_PEOPLE_SERVICE }],
});
const locationBackSpy = vi.spyOn(TestBed.inject(Location), 'back').mockImplementation(() => void 0);
```

<!-- .element: class="small-code" -->

`PersonDetails` injects `People` and `Location`, and hosts a real `<sfeir-signal-form>` child. `render()`'s `inputs`/`providers` options combine everything from this chapter: an input, a faked dependency, and a spied-on real one.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reaching into a rendered child with `By.directive`

```typescript
it('should pass the resolved person input to the sfeir-signal-form', () => {
  const signalFormElement = debugElement.query(By.directive(SignalForm));
  expect(signalFormElement.componentInstance.person()).toEqual(PERSON);
});

it('should call goBack on the location when the cancelForm event is emitted', async () => {
  debugElement.query(By.directive(SignalForm)).triggerEventHandler('cancelForm');
  await fixture.whenStable();
  expect(locationBackSpy).toHaveBeenCalledOnce();
});
```

<!-- .element: class="small-code" -->

`triggerEventHandler('cancelForm')` simulates the child emitting its output — you don't need to actually click a button inside `SignalForm` to test how `PersonDetails` *reacts* to it.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Asserting on ordering, not just "was it called"

```typescript
it('should update the person and navigate back when submitForm is emitted', async () => {
  debugElement.query(By.directive(SignalForm)).triggerEventHandler('submitForm', updatedBody);
  await fixture.whenStable();

  expect(STUB_MOCK_PEOPLE_SERVICE.updatePerson).toHaveBeenCalledExactlyOnceWith(PERSON.id, updatedBody);
  expect(locationBackSpy).toHaveBeenCalledOnce();
});
```

<!-- .element: class="medium-code" -->

Both assertions matter: the request must go out with the right id/body **and** the navigation-back must still happen — a passing test that only checked one of the two could hide a real bug (e.g. navigating back before the save request is even sent).

This is task 5 of the `apps/23-unit-tests` lab — `person-details.spec.ts`, the exercise's most complete example combining `render()`, faked and spied dependencies, and querying into a rendered child.
