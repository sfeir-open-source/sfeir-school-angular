# 32 · Unit Testing

> Write unit tests for a pipe, a directive, a component and a service with Jest.

**Folder** `apps/32-unit-tests` · **Solution** `apps/32-unit-tests-solution` · **Run tests** `npm run test -- 32-unit-tests`

## 🎯 Goal

Cover the building blocks you've created throughout the workshop with focused unit tests — from the simplest (a pure pipe) to the trickiest (a service that makes HTTP calls).

## 📚 What you'll learn

- How to test pipes, directives, components and services
- How to mock HTTP and assert requests
- How to test `httpResource` with `TestBed` in a zoneless app

## ✅ Before you start

- The mock API isn't needed — tests mock their own HTTP.

## 🛠️ Steps

### Step 1 — Test the pipe

Pipes are pure functions, so they're the easiest to test. In `na.pipe.spec.ts`, verify:

- it's created
- it returns the input when defined
- it returns `N/A` when the input is empty and no default is given
- it returns the provided default when the input is empty

### Step 2 — Test the directive

Directives need a host component. In `badge.spec.ts`, create a tiny host that applies `sfeirBadge`, then verify:

- it's created
- it adds the icon when the input is `true`
- it adds nothing when `false`
- the color changes on `mouseover` / `mouseout`

### Step 3 — Test the component

In `form.spec.ts`, verify:

- it's created
- it renders the expected fields
- it emits the correct events on submit
- validation behaves as expected

### Step 4 — Test the service

Services usually hit HTTP, so mock it. In `people.service.spec.ts`, verify the endpoints, success handling and errors. For `httpResource` in a zoneless app:

- create the resource inside `TestBed.runInInjectionContext`
- call `TestBed.tick()` to flush effects
- `await TestBed.inject(ApplicationRef).whenStable()` before asserting
- exercise error handling via the resource's `error()` signal

## ▶️ Run & verify

```bash
npm run test -- 32-unit-tests
```

Check:

- [ ] All four suites pass
- [ ] Each suite isolates its subject (mocks HTTP, hosts the directive, etc.)

## 💡 Key concepts

- **Test pyramid** — many fast unit tests (pipes, services) under fewer integration/UI tests.
- **`TestBed`** — Angular's testing harness for configuring and creating things under test.
- **Mocking HTTP** — `HttpTestingController` (or `provideHttpClientTesting`) lets you assert requests and flush fake responses.
- **Zoneless testing** — drive change detection explicitly with `TestBed.tick()` / `whenStable()`.

## 🧯 Troubleshooting

- **Directive test sees nothing** — you need a host component that actually applies the directive.
- **`httpResource` value is stale** — you forgot `TestBed.tick()` / `whenStable()`.
- **Unexpected open request** — every mocked request must be flushed and `verify()`-ed.

## 🚀 Going further

- Test components with inputs/outputs, child components and routing.
- Try Angular Testing Library for more user-centric assertions.
