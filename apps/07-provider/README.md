# 07 — Provider

In `06-pipe` the `Home` component reached straight into `PEOPLE_MOCK` to pick a person and to pick a random one — all of that data-access logic sat inline in the component class. In this exercise you'll extract that logic into a proper **service**, and have `Home` ask for what it needs through **dependency injection** instead of importing the mock data itself.

## 🎯 Learning objectives

- Creating a service class and marking it injectable with Angular's `@Service` decorator (from `@angular/core`) — the modern, `inject()`-friendly alternative to `@Injectable({ providedIn: 'root' })`
- Understanding that `@Service` makes a class a tree-shakable singleton, provided at the root injector by default — no `providers` array entry needed to use it anywhere in the app
- Injecting a service into a component with the `inject()` function, rather than constructor parameters
- Moving data-access/business logic out of a component and into a dedicated class, so the component's job becomes coordinating UI state instead of also owning where the data comes from
- Designing a small service API (method names, return types) driven by how a component already calls it
- Overriding an injected dependency in a test with `TestBed.configureTestingModule({ providers: [...] })`, so a component can be tested against a fake/mock version of a service instead of the real one

## 📁 What you're working with

```
apps/07-provider/
└── src/app/
    ├── app.ts / app.html / app.scss / app.config.ts   ✅ complete — nothing to do here
    ├── core/
    │   └── provider/
    │       └── people.ts   🚧 to do — currently a plain class with no injectable decorator
    └── feature/
        └── home/
            ├── home.ts    🚧 to do — still builds the person signal from PEOPLE_MOCK directly
            ├── home.html  ✅ complete — nothing to do here
            └── home.scss  ✅ complete — nothing to do here
```

`core/provider/people.ts` already exists but isn't wired up as a service yet, and its two methods aren't implemented. `feature/home/home.ts` still contains the logic that should move there.

## 📝 Your tasks

### 1. `apps/07-provider/src/app/core/provider/people.ts` — make `People` injectable and implement it

- Import `Service` from `@angular/core` (in addition to whatever's already imported).
- Decorate the `People` class with `@Service()`. By default this provides the service at the root injector — singleton, tree-shakable, available anywhere in the app without touching `app.config.ts`.
- Implement two methods on the class:
  - `getFirstPerson(): Person` — returns the first entry of `PEOPLE_MOCK`.
  - `getRandomPerson(): Person` — returns a random entry of `PEOPLE_MOCK` (pick a random index within the array's bounds).
- Both methods already have signatures hinted by their names — look at what `Home` currently does with `PEOPLE_MOCK` in `home.ts` for the exact logic each one needs to reproduce, just moved here.
- `PEOPLE_MOCK` and the `Person` type both come from `@sfeir/types`, already imported in the file.

### 2. `apps/07-provider/src/app/feature/home/home.ts` — consume `People` via injection

- Import `inject` from `@angular/core` (alongside `Component` and `signal`, already imported).
- Import `People` from its relative path (`../../core/provider/people`).
- Inject it into `Home` with `inject(People)` — store it in a `private readonly` field, following the same convention you'll see used for injected dependencies elsewhere in this workspace (e.g. `libs/ui/card` if you've looked at it in earlier exercises).
- Replace the inline `PEOPLE_MOCK[0]` used to initialize the `person` signal with a call to the injected service's "first person" method.
- Replace the inline random-index logic inside `handleRefresh()` with a call to the injected service's "random person" method.
- `PEOPLE_MOCK` should no longer need to be imported into `home.ts` once both call sites go through `People` — the component shouldn't know where the data comes from anymore, only that it can ask `People` for a person.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 07-provider   # dev server → http://localhost:4200
npx nx test 07-provider    # run the app's unit tests with vitest
npx nx lint 07-provider    # lint the app with eslint
npx nx build 07-provider   # production build
```

## ✅ How to know it's working

Serve the app and open it in the browser:

- The profile card renders exactly as it did at the end of `06-pipe` — same photo, name, contact info, and date-of-birth formatting.
- Clicking the refresh FAB (or the card's delete icon) still swaps in a new random person, exactly as before — the visible behavior of the app shouldn't change at all in this exercise.
- Open devtools console: no `NullInjectorError` (a service that isn't reachable) and no error about `People` not being provided.

## 🛠️ Troubleshooting

- **`NullInjectorError: No provider for People!`**: `People` is missing its `@Service()` decorator, or the decorator is present but not imported from `@angular/core`.
- **`inject(People)` fails / is `undefined` at runtime**: make sure `inject(People)` is called as a class field initializer (or inside the constructor), not inside a method — `inject()` only works synchronously during construction, in an injection context.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 07-provider` explicitly.
- **Random person selection throws or returns `undefined`**: double check the random index stays within `PEOPLE_MOCK`'s bounds (`Math.random() * PEOPLE_MOCK.length`, then rounded down).

## 🙈 Stuck?

Try building the service and wiring up `Home` yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/07-provider-solution` has a complete, working version you can compare your code against. Use it to check your approach once you've made a real attempt, not as a starting point to copy from.
