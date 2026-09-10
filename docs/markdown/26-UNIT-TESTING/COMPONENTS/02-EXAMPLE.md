<!-- .slide: class="with-code inconsolata" -->

# Case study: `SignalForm`

`sfeir-signal-form` is used both to create a person (`DialogPerson`) and edit one (`PersonDetails`). It has an optional `person` input and two outputs, `submitForm`/`cancelForm` — and **no dependencies to inject**, so it's a pure `render()` test.

```typescript
const submitEvent = vi.fn();
const cancelEvent = vi.fn();

beforeEach(async () => {
  const { fixture } = await render(SignalForm, {
    bindings: [outputBinding('submitForm', submitEvent), outputBinding('cancelForm', cancelEvent)],
  });
});
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Asserting on rendered state, not internals

```typescript
it('should disable the Save button when the form is invalid', async () => {
  await fixture.whenStable();
  expect(screen.getByText('Save').closest('button')).toBeDisabled();
});

it('should emit submitForm with the form value when filled correctly', async () => {
  fireEvent.input(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
  fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'john.d@sfeir.com' } });
  // ...
  fireEvent.click(screen.getByText('Save').closest('button') as HTMLButtonElement);
  await fixture.whenStable();

  expect(submitEvent).toHaveBeenCalledExactlyOnceWith({ firstname: 'John', email: 'john.d@sfeir.com', /* ... */ });
});
```

<!-- .element: class="small-code" -->

Never `component.form.setValue(...)` then assert `component.form.valid` — that tests the reactive form, not what the user experiences.

<!-- .element: class="important" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Feeding an input with `inputBinding()`

```typescript
const person = PEOPLE_MOCK[0];

const { fixture } = await render(SignalForm, {
  bindings: [inputBinding('person', signal(person)), outputBinding('submitForm', submitEvent)],
});

it('should pre-fill the form fields with the given person data', () => {
  expect(screen.getByPlaceholderText('First Name')).toHaveValue(person.firstname);
});
```

<!-- .element: class="medium-code" -->

Same binding-based API `ViewContainerRef.createComponent()` uses at runtime — because `person` is a signal input (`input<Person>()`), `inputBinding` is how you drive it without a decorator.

##==##

# What this example covers, end to end

- **Empty state**: default photo placeholder, Save disabled<br/><br/>
- **Validation**: required/minLength/pattern errors appear on blur, disappear once corrected<br/><br/>
- **Happy path**: filling every field enables Save and emits the exact `UpsertPersonBody`<br/><br/>
- **Cancel path**: emits `cancelForm`, never `submitForm`<br/><br/>
- **Pre-filled state**: an existing `person` input pre-fills the form, and editing one field still submits the *other*, untouched fields with their original values

This is exactly task 1 of the `apps/23-unit-tests` lab.
