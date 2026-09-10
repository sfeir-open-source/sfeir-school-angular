<!-- .slide: class="transition-bg-sfeir-2" -->

# Testing directives

##==##

<!-- .slide: class="with-code inconsolata" -->

# The setup: a directive needs a host

- Same testing API as components: `TestBed`, `ComponentFixture`, `render()`<br/><br/>
- A directive has **no template of its own** — you can't `render(King)` directly<br/><br/>
- You mount it through a tiny **host component**, declared inline in the spec, with the directive applied to one of its elements

```typescript
@Component({
  selector: 'sfeir-king',
  template: `<span [sfeirKing]="isManager()"></span>`,
  imports: [King],
})
class HostKing {
  public readonly isManager = signal<boolean>(false);
  public readonly sfeirKingDirective = viewChild.required(King);
}
```

<!-- .element: class="medium-code" -->

Notes:

- Since a component is a directive with a view, it's natural that they share the same testing API.
- `viewChild.required(King)` gives a signal handle on the directive instance itself, useful when you need to assert on internal state directly (like the icon color) rather than only on rendered DOM.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Rendering the host, not the directive

```typescript
describe('King', () => {
  let fixture: ComponentFixture<HostKing>;
  let component: HostKing;

  beforeEach(async () => {
    const { fixture: fixtureFromRender } = await render(HostKing);
    fixture = fixtureFromRender;
    component = fixture.componentInstance;
  });
});
```

<!-- .element: class="big-code" -->

`King`'s selector `[sfeirKing]` is imported through `HostKing`'s own `imports: [King]` — `render()` doesn't need to know the directive exists, it's just part of the host's template.
