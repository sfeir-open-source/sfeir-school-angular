<!-- .slide: class="with-code inconsolata" -->

# `render()`: mounting a component

```typescript
const { fixture, debugElement } = await render(SignalForm, {
  bindings: [outputBinding('submitForm', submitEvent), outputBinding('cancelForm', cancelEvent)],
});
```

<!-- .element: class="big-code" -->

`render()` returns a `fixture` (the usual `ComponentFixture`) plus convenience handles — you can mix `screen` queries with `fixture.debugElement` freely.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `screen`: querying like a user

```typescript
screen.getByText('Save');                     // throws if not found — use for "must exist"
screen.queryByText('Save');                    // returns null if not found — use for "must NOT exist"
screen.getByPlaceholderText('First Name');
screen.getByAltText('person-photo');
await screen.findByText('Save');               // async: waits for it to appear
```

<!-- .element: class="big-code" -->

`screen` queries the whole document, not just your component's root — no need to hold onto `fixture.nativeElement`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `fireEvent`: interacting like a user

```typescript
fireEvent.input(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
fireEvent.blur(screen.getByPlaceholderText('First Name'));
fireEvent.click(screen.getByText('Save').closest('button') as HTMLButtonElement);
```

<!-- .element: class="big-code" -->

Each call dispatches a real DOM event — the component's `(input)`/`(blur)`/`(click)` bindings fire exactly as they would in the browser. Follow with `await fixture.whenStable()` when the reaction involves signals/async work before asserting.

##==##

# `inputBinding()` / `outputBinding()`: the signal-based binding API

The same API `ViewContainerRef.createComponent()` uses to bind inputs/outputs imperatively — no `@Input()`/`@Output()` decorators needed on the test side, and it works with **signal inputs/outputs** (`input()`, `output()`) directly.<br/><br/>

- `inputBinding('person', signal(PEOPLE_MOCK[0]))` — feeds a signal input<br/><br/>
- `outputBinding('submitForm', vi.fn())` — captures what a signal output emits<br/><br/>

Both are passed through `render(Component, { bindings: [...] })`.

Notes:

- Before signal-based inputs/outputs, testing-library exposed a simpler `{ inputs: {...}, on: {...} }` shorthand — you'll still see `inputs: { person }` used in person-details.spec.ts because PersonDetails's `person` input is populated via the resolver/route data, which testing-library's `inputs` option also supports for plain values.
