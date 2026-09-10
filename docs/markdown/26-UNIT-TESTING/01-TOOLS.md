<!-- .slide: class="transition-bg-sfeir-2" -->

# Tooling

##==##

<!-- .slide: class="sfeir-basic-slide no-title-margin" -->

# Our stack

<br/><br/>

![](assets/images/school/unit-tests/vitest.png 'h-400')
![](assets/images/school/unit-tests/angular-testing-library.png 'h-400')
![](assets/images/school/unit-tests/typescript.png 'h-400')

<br/><br/>

**No Jasmine, no Karma, no Jest.** This app is tested with **Vitest** through `@analogjs/vitest-angular`, combined with **`@testing-library/angular`**.

Notes:

- Vitest is a Vite-native test runner: fast, ESM-first, Jest-compatible API (`describe`/`it`/`expect`/`vi`), no browser launch needed to run in Node mode.
- `@analogjs/vitest-angular` wires Vitest to Angular's TestBed/compiler so `.spec.ts` files can use `TestBed`, `fixture.detectChanges()`, `inject()`, etc. exactly like with Karma before.

##==##

# A quick word on TDD

- **TDD**: test-driven development<br><br>
- Red: write a failing test first<br><br>
- Green: make it pass, the simplest way<br><br>
- Refactor: improve without breaking the test<br><br>
- Costly upfront, but it's what lets you refactor `StaffDirectory` into a `signalStore` next chapter **without fear**

##==##

<!-- .slide: class="with-code inconsolata" -->

# Zero configuration, one command

Every exercise app in this training already ships a working Vitest setup (`vite.config.mts`, `project.json` `test` target) — nothing to install.

```bash
npm run test -- 23-unit-tests   # run the app-level specs
npm run test -- ui               # run libs/ui's specs (shared components/directives)
```

<!-- .element: class="big-code" -->

`passWithNoTests: true` is set — a suite with 0 tests still reports success, so a typo in a filename (missing `.spec.ts`) fails silently. Always check the test count, not just the green checkmark.

<!-- .element: class="important" -->
