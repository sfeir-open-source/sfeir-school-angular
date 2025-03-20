<!-- .slide: class="with-code inconsolata" -->
# Un Exemple concret

```typescript
describe('HomeComponent', () => {
  let component: HomeComponent;
  let container: Element;
  let debugElement: DebugElement;
  let componentFixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const {fixture, container: renderedElement} = await render(HomeComponent, {
      imports: [CommonModule],
      declarations: [CardComponent, NaPipe],
      providers: [{provide: PeopleService, useValue: PEOPLE_SERVICE_STUB}],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    container = renderedElement;
    debugElement = fixture.debugElement;
    componentFixture = fixture;
  });
})
```
<!-- .element: class="big-code" -->
