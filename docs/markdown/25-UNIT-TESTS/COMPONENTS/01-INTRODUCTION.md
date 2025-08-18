<!-- .slide: class="transition-bg-sfeir-2" -->

# Testing your components

##==##

# What do tests really involve?

- The "magic" of Angular's instance creation is not fully automatic anymore <br/><br/>
- You have to mock the services and data that your components use <br/><br/>
- Having 100% code coverage doesn't mean your tests are correct <br/><br/>
- Keep in mind that testing is not about doubting, but about delivering a quality project/application

##==##

<!-- .slide: class="with-code inconsolata" -->

# Setting up component tests

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [UserProfile],
  });
  const fixture = TestBed.createComponent(UserProfile);
  const instance = fixture.componentInstance;
  const element = fixture.nativeElement;
  const debug = fixture.debugElement;
  fixture.detectChanges();
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Details on the functions used

- **TestBed**
  - **TestBed.createComponent**: creates an instance of the component (fixture)
  - **TestBed.overrideComponent**: overrides a component instance<br/><br/>
- **ComponentFixture**
  - **fixture.componentInstance**: access to the component instance
  - **fixture.nativeElement**: access to the component's DOM
  - **fixture.debugElement**: helper function
  - **fixture.detectChanges**: triggers change detection

##==##

<!-- .slide: class="with-code" -->

# What if my component uses other components?

But if I have to mock everything, **it could take a long time** if my component uses a dozen child components!!<br/><br/>

Well no, there's a trick: hide errors related to nested components! :) thanks to **NO_ERRORS_SCHEMA** <br/><br/>

<!-- .element: class="important" -->

```typescript
import { NO_ERRORS_SCHEMA } from '@angular/core';
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [UserProfile],
    schemas: [NO_ERRORS_SCHEMA],
  });
});
```

<!-- .element: class="medium-code" -->
