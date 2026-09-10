<!-- .slide: class="with-code inconsolata" -->

# Case study: `King`, an attribute directive

`[sfeirKing]` (selector, applied as `<span class="sfeir-badge" [sfeirKing]="person.isManager">`) toggles a badge icon and reacts to `mouseover`/`mouseout` by changing its own color — all through `host: {...}` bindings, no template.

```typescript
it('should alternate between showing the icon or not', async () => {
  expect(screen.queryByText('supervised_user_circle')).toBeNull();
  component.isManager.set(true);
  await fixture.whenStable();
  expect(screen.getByText('supervised_user_circle')).toBeVisible();
});
```

<!-- .element: class="medium-code" -->

`fixture.whenStable()` matters here: the directive reacts to `isManager()` through an `effect()`, which runs **asynchronously** relative to the signal write.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Dispatching real events at the native element

```typescript
it('should turn the icon color red on mouseover', async () => {
  component.isManager.set(true);
  await fixture.whenStable();
  const hostElement = fixture.debugElement.query(By.directive(King)).nativeElement as HTMLElement;

  hostElement.dispatchEvent(new MouseEvent('mouseover'));
  await fixture.whenStable();

  expect(hostElement.style.color).toBe('red');
});
```

<!-- .element: class="medium-code" -->

`By.directive(King)` finds the element the directive is attached to — not a component selector, an attribute. Dispatching a real `MouseEvent` exercises the directive's `host: { '(mouseover)': '...' }` binding exactly like a real hover would.

##==##

# What this example covers, end to end

- Toggling the host's `isManager` signal shows/hides the badge icon<br/><br/>
- The icon's color starts at its default (`inherit`)<br/><br/>
- A real `mouseover` turns it red, a real `mouseout` reverts it<br/><br/>

This is exactly task 4 of the `apps/23-unit-tests` lab — and the only spec file in this exercise that needs a hand-written host component.
