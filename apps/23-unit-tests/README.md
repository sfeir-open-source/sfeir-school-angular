# 23 — Unit Tests

Up to now every exercise has been about making the Staff Directory app _do_ something new. This one is different: the app doesn't change at all. Instead, you put on a different hat and write **unit tests** that prove the pieces you've already built keep working — the `SignalForm` used everywhere a person is created or edited, the route guards that gate `/people` behind a login, the `People` service that talks to the REST API, the `King` badge directive that marks managers in the list, and the `PersonDetails` view that wires the form to the service. Angular apps in this repo are tested with **Vitest** (not Jasmine/Karma) through `@analogjs/vitest-angular`, combined with `@testing-library/angular` for rendering components the way a user would interact with them. This exercise is your first real pass at that stack.

## 🎯 Learning objectives

- Structuring a spec file with Vitest's `describe`/`it`/`beforeEach`, and using its globals (`vi.fn()`, `vi.spyOn()`, `vi.waitFor()`) instead of Jasmine equivalents
- Rendering a standalone component under test with `render()` from `@testing-library/angular`, and querying what it produced through `screen` (`getByText`, `getByPlaceholderText`, `getByAltText`, …) instead of reaching into `ComponentFixture` internals
- Driving a component like a user would with `fireEvent` (`click`, `input`, `blur`) and asserting on the DOM state that results, rather than calling internal methods directly
- Feeding **inputs** and observing **outputs** on a component under test with `inputBinding()` / `outputBinding()`, the same signal-based binding API used by `ViewContainerRef.createComponent()` — no `@Input()`/`@Output()` decorators needed on the test side
- Unit testing a **functional guard** (`CanActivateFn`) in isolation with `TestBed.runInInjectionContext()`, without a real `Router` or a real `window`
- Unit testing an **HTTP-backed service** with `provideHttpClientTesting()` and `HttpTestingController` — asserting on the request that was made (`expectOne`, method, body) and controlling the response with `req.flush()`, all without a real backend
- Unit testing an **attribute directive** by mounting it through a tiny host component, since a directive has no template of its own to render in isolation
- Choosing between `TestBed`-level tests (services, guards — no rendering involved) and `render()`-level tests (components, directives — rendering and user interaction involved), and knowing why a given unit calls for one or the other

## 📁 What you're working with

```
apps/23-unit-tests/src/app/
├── core/
│   ├── guards/
│   │   ├── authenticated.ts                                  ← complete: authenticatedGuard, notAuthenticatedGuard
│   │   └── authenticated.spec.ts                              ← TO COMPLETE: task 2
│   ├── provider/
│   │   ├── people.ts                                          ← complete: the People service
│   │   ├── people.spec.ts                                     ← TO COMPLETE: task 3
│   ├── interceptors/
│   │   └── token-interceptor.ts / token-interceptor.spec.ts    ← complete, already tested — read it as a reference
│   └── ...
├── feature/
│   ├── home/, login/                                           ← complete, already tested — read them as references
│   └── staff-directory/
│       └── person-details/
│           ├── person-details.ts                                ← complete: the PersonDetails view
│           └── person-details.spec.ts                           ← TO COMPLETE: task 5

libs/ui/signal-form/
├── signal-form.ts                                               ← complete: the SignalForm component
└── signal-form.spec.ts                                          ← TO CREATE: task 1 (no spec file exists yet for this entry point)

libs/ui/king/
├── king.ts                                                      ← complete: the King badge directive ([sfeirKing])
└── king.spec.ts                                                 ← TO CREATE: task 4 (no spec file exists yet for this entry point)
```

Several spec files in `apps/23-unit-tests` are already fully written — `app.spec.ts`, `home.spec.ts`, `login.spec.ts`, `staff-directory.spec.ts`, `dialog-person.spec.ts`, `resolvers/index.spec.ts`, `user-service.spec.ts`, `token-interceptor.spec.ts`. Don't skip them: they're your reference material for every pattern below (rendering with `render()`, mocking `People` with a partial provider, driving the router with `RouterTestingHarness`, mocking HTTP with `HttpTestingController`, …). Your five tasks apply the same patterns to units that don't have tests yet.

## 📝 Your tasks

### 1. `libs/ui/signal-form/signal-form.spec.ts` — test the `SignalForm` component

`SignalForm` (selector `sfeir-signal-form`) is the form used both to create a new person (`DialogPerson`) and to edit an existing one (`PersonDetails`). It exposes an optional `person` input, and two outputs: `submitForm` (emits the built `UpsertPersonBody` when the form is valid and saved) and `cancelForm` (emits when cancelled). Since it has no dependencies to inject, this is a pure `render()`-based component test — no `TestBed.configureTestingModule` needed. Cover, at minimum:

- With no `person` input: the photo falls back to a default placeholder, and the Save button starts disabled because the form starts invalid.
- Filling in every field with valid values enables Save; clicking it emits `submitForm` with the values you typed, captured with an `outputBinding()` you assert on via a `vi.fn()`.
- Each required field surfaces a validation error when left empty and touched (e.g. blurred) — you don't need to assert the exact wording, just that _some_ error becomes visible, and that it disappears once the field is corrected.
- The email field only accepts the company's email pattern, and the phone field only accepts a specific format — trigger both the invalid and the valid case.
- Clicking Cancel emits `cancelForm` and never `submitForm`.
- The phone field is masked by default (behind the structural directive from the previous exercise) and can be revealed by clicking its toggle.
- With a `person` input supplied via `inputBinding()`: the fields pre-fill from that person, the photo shows the person's actual photo instead of the placeholder, and editing one field while saving still submits the _other_, untouched fields with their original values.

### 2. `apps/23-unit-tests/src/app/core/guards/authenticated.spec.ts` — test the route guards

`authenticated.ts` exports two functional guards, `authenticatedGuard` and `notAuthenticatedGuard`, both built on the same private helper that reads an `'Authorization'` key from `sessionStorage` (via the `WINDOW` token) and, depending on what it finds, either allows navigation or returns a redirect built with `Router.createUrlTree()`. A functional guard is just a function — you invoke it directly inside `TestBed.runInInjectionContext()`, no component or real router needed. Provide fakes for `WINDOW` (an object exposing a stubbed `sessionStorage.getItem`) and for `Router` (an object exposing a stubbed `createUrlTree`) through `TestBed.configureTestingModule({ providers: [...] })`. Cover, for each guard:

- The authenticated case: activation is allowed, and no redirect is ever built.
- The unauthenticated case: activation is denied, and the guard asks the router for a redirect to the correct route (`authenticatedGuard` → the login page, `notAuthenticatedGuard` → the people list) — assert on what `createUrlTree` was called with, and on what the guard actually returns.
- That the guard reads its key from `sessionStorage` under the exact key the app writes to when logging in (check `UserService`/`login.ts` if you're unsure which key that is).

### 3. `apps/23-unit-tests/src/app/core/provider/people.spec.ts` — test the `People` service

`People` wraps every REST call the Staff Directory makes: `getPeople()`, `getPerson(id)`, `getRandomPerson()` (an `httpResource`, not an `Observable` — different assertion strategy), `addPerson()`, `updatePerson()`, `removePerson()`. Configure a `TestBed` with `People` itself plus `provideHttpClient()` and `provideHttpClientTesting()`, and inject `HttpTestingController` to intercept requests instead of hitting a real server. Cover, for each method:

- It calls the right URL (built from `People.baseUrl`) with the right HTTP verb.
- For the write methods (`addPerson`, `updatePerson`), the request body matches what you passed in.
- Flushing a mocked response (`req.flush(...)`) produces the value your subscriber (or, for `getRandomPerson()`, the resource's `.value()`) actually receives — `getRandomPerson()` needs `TestBed.runInInjectionContext()` around the call (it uses `httpResource`, which requires an injection context) and `vi.waitFor(...)` to await the resource settling.
- Call `httpMock.verify()` in an `afterEach` so a forgotten/duplicate request fails the suite instead of passing silently.

### 4. `libs/ui/king/king.spec.ts` — test the `King` badge directive

`King` (selector `[sfeirKing]`) is an attribute directive, applied in the Staff Directory list as `<span class="sfeir-badge" [sfeirKing]="person.isManager">`. It has no template of its own, so you can't render it standalone — mount it through a tiny **host component** you declare inline in the spec, with the directive applied to one of its elements and a signal input you control from the test (see `signal-form.spec.ts`'s neighbours in `libs/ui-solution` for how other directives in this app get host-wrapped, if you want a second example beyond this task). Use `viewChild()` on the host to get a handle on the directive instance if you need to assert on its internal state directly. Cover:

- When the bound value is falsy, no badge icon is rendered; when it becomes truthy, the icon appears — toggle a signal on the host and re-check after `fixture.whenStable()`.
- The badge's color starts in its default state.
- A `mouseover` on the host element changes that color, and `mouseout` reverts it — dispatch real `MouseEvent`s at the native element and re-check state after `fixture.whenStable()`.

### 5. `apps/23-unit-tests/src/app/feature/staff-directory/person-details/person-details.spec.ts` — test the `PersonDetails` view

`PersonDetails` takes a required `person` input (populated by a route resolver in the real app, but you provide it directly with `inputs: { person }` in `render()`), injects `People` and `Location`, and hosts a `<sfeir-signal-form>`. It has two responsibilities: forward the `person` input into the form, and react to the form's outputs — `cancelForm` calls `Location.back()`, `submitForm` calls `People.updatePerson()` and then also navigates back. Since `People` does real HTTP work, provide a **fake** `People` (a plain object with a mocked `updatePerson`) through `render()`'s `providers`, not the real service. Cover:

- The `person` you passed as input ends up on the `SignalForm` child — find it with `debugElement.query(By.directive(SignalForm))` and check its `person` input value.
- Triggering the child's `cancelForm` output (`triggerEventHandler('cancelForm')`) calls `Location.back()` — spy on `Location` (injected via `TestBed.inject(Location)`) rather than relying on real browser navigation.
- Triggering the child's `submitForm` output with an updated body calls `People.updatePerson()` with the right id and body, and _then_ also calls `Location.back()` — get the ordering/args right, not just that both were called.

## ▶️ How to run the application

From the workspace root:

```bash
npm run serve -- 23-unit-tests
```

(equivalent to `npx nx serve 23-unit-tests`). This also starts the `server-rest` mock API the app depends on — leave it running, no need to start it separately. `23-unit-tests` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
npm run test -- 23-unit-tests   # run the app-level specs (tasks 2, 3, 5, plus every already-written spec)
npm run test -- ui               # run libs/ui's specs (tasks 1 and 4 live in this project, not in 23-unit-tests)
npm run build -- 23-unit-tests   # production build
npm run lint -- 23-unit-tests    # lint this app
npm run lint -- ui                # lint the shared library you're editing for tasks 1 and 4
```

## ✅ How to know it's working

- `npm run test -- 23-unit-tests` and `npm run test -- ui` both finish green, with no `describe`/`it` blocks left empty and no `.skip`/`.todo`.
- Every test you wrote fails first if you temporarily break the thing it's testing (comment out a line in `authenticated.ts`, `people.ts`, `king.ts`, `signal-form.ts` or `person-details.ts`) — a test that can't fail isn't testing anything. Try this on at least one of your tests before considering it done.
- `httpMock.verify()` doesn't throw in `people.spec.ts` — every HTTP request you triggered was actually asserted on.
- Guard tests never import or provide the real `Router`/`window` — everything is a stub you control.
- Component/directive tests query through `screen`/`debugElement`, not by calling private methods on the component instance directly.

## 🛠️ Troubleshooting

- **"No provider for HttpClient" / "No provider for HttpTestingController"** in `people.spec.ts` — `TestBed.configureTestingModule` needs _both_ `provideHttpClient()` and `provideHttpClientTesting()`; the testing provider replaces the real backend, it doesn't add itself automatically.
- **`getRandomPerson()` throws "must be called in an injection context"** — `httpResource()` requires one; wrap the call in `TestBed.runInInjectionContext(() => ...)`.
- **Guard test always redirects, even when you stubbed `sessionStorage.getItem` to return a value** — double-check you're providing your stub under the `WINDOW` token (imported from `core/provider/window`), not a raw `window` override; the guard only ever reads through `inject(WINDOW)`.
- **`screen.getByText(...)` throws "Unable to find an element"** for the King badge — confirm you toggled the host's signal _and_ awaited `fixture.whenStable()` before querying; the directive's effect runs asynchronously relative to the signal write.
- **`triggerEventHandler('submitForm', ...)` in `person-details.spec.ts` does nothing** — the event name has to match `SignalForm`'s output property name exactly (`submitForm`, not `submit` or `onSubmit`), and the element you queried has to be the `SignalForm` debug element, not `PersonDetails`'s own root.
- **Directive test can't find the directive instance** — a directive needs a _host_ component with `imports: [King]` and the selector applied on some element in that host's inline template; you can't `render(King)` directly, there's no template to render.
- **Tests pass locally but the suite reports 0 tests run** — `passWithNoTests: true` in `vite.config.mts` means a typo in a filename (missing `.spec.ts`) or in the `describe`/`it` block silently produces an empty, "successful" run; double-check the file is actually picked up.

## 🙈 Stuck?

Try writing each spec from the task list on your own first, using the already-complete spec files in this same app as your pattern library — `people.spec.ts`'s neighbour `user-service.spec.ts`, `authenticated.spec.ts`'s neighbour `token-interceptor.spec.ts`, and `person-details.spec.ts`'s neighbour `dialog-person.spec.ts` are all testing the same _kind_ of unit you're about to test. If you want a full reference, `apps/23-unit-tests-solution` (and `libs/ui-solution`) has a working implementation. Use it to check your approach once your own version passes, not as a shortcut to copy from.
