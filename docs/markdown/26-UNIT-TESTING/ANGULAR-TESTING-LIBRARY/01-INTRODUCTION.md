<!-- .slide: class="transition-bg-sfeir-2" -->

# Angular Testing Library

##==##

# What is Angular Testing Library?

The main library, **DOM Testing Library**, is a lightweight solution for testing web pages by querying and interacting with DOM nodes the way a real user would.<br/><br/>

`@testing-library/angular` wraps it with an Angular-flavored `render()` that boots a `TestBed`, creates the component, and returns query helpers.<br/><br/>

The library's [documentation](https://testing-library.com/docs/) can be found here.

##==##

# What Angular Testing Library is for

- Querying the DOM the way a user perceives it (by text, label, placeholder, alt text — not by CSS class or component internals)<br/><br/>
- Writing tests that survive a refactor of the component's internals, as long as the rendered behavior stays the same<br/><br/>
- Avoiding Angular boilerplate (`fixture.detectChanges()` after every interaction, manual `TestBed.createComponent`)

##==##

# What Angular Testing Library is not

- A test runner — **Vitest** still provides `describe`/`it`/`expect`<br/><br/>
- A mocking tool — **`vi.fn()`/`vi.spyOn()`** still create your test doubles<br/><br/>
- A replacement for `TestBed` — `render()` is built on top of `TestBed`, it doesn't hide it entirely (you'll still reach for `TestBed.inject(...)` to grab a spy on an injected service)

##==##

<!-- .slide: class="with-code inconsolata" -->

# Already installed, nothing to add

Unlike the classic training flow (`ng add @testing-library/angular`), every exercise app in this repo already has it wired — `render`, `screen` and `fireEvent` are importable straight from `@testing-library/angular`.

```typescript
import { render, screen, fireEvent } from '@testing-library/angular';
```

<!-- .element: class="big-code" -->

`@testing-library/jest-dom` is also available, giving richer matchers: `toBeInTheDocument()`, `toBeDisabled()`, `toHaveValue()`, `toHaveAttribute()`…
