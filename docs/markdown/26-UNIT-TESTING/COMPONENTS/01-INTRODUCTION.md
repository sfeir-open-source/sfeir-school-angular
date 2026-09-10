<!-- .slide: class="transition-bg-sfeir-2" -->

# Testing components

##==##

# What testing a component really involves

- Angular's "magic" instantiation isn't automatic in a test — you decide what gets rendered and what gets faked<br/><br/>
- You mock the services/data the component depends on, not the component itself<br/><br/>
- 100% coverage doesn't mean the tests are correct — a test that can't fail isn't testing anything<br/><br/>
- Testing isn't about doubting your code, it's about being confident enough to refactor it later (exactly what the next chapter does to `StaffDirectory`)

##==##

<!-- .slide: class="with-code inconsolata" -->

# `render()` replaces manual `TestBed.createComponent`

```typescript
const { fixture, debugElement } = await render(SignalForm, {
  bindings: [outputBinding('submitForm', submitEvent), outputBinding('cancelForm', cancelEvent)],
});
const component = fixture.componentInstance;
```

<!-- .element: class="big-code" -->

`render()` runs `TestBed.configureTestingModule(...)`, creates the fixture **and** calls `detectChanges()` for you — one call instead of the classic four-line setup.

##==##

# What if my component uses other components?

`SignalForm` is standalone and self-contained — no child components to fake. But when a component under test does render children (like `PersonDetails` rendering `<sfeir-signal-form>`), you have two options:

- Let the real child render too, and query into it with `By.directive(ChildComponent)` — this is what `person-details.spec.ts` does<br/><br/>
- Or provide a fake for whatever the child *depends on*, so nothing throws during rendering

There's no `NO_ERRORS_SCHEMA` shortcut needed here — standalone components with signal inputs/outputs render cleanly as long as their own dependencies are satisfied.
