# 04 — Events

In this exercise you'll pick up the profile card you built in `03-bindings` and make it interactive. Right now the card always shows the same person — there's a "refresh" button sitting in the corner, but it doesn't do anything yet. You'll wire it up to event binding so clicking it swaps in a random person from the mock data, and along the way you'll clean up the component's public surface so the rest of the app (and its tests) can talk to it properly.

## 🎯 Learning objectives

- Event binding with the `( )` syntax to call a component method from a template
- Writing a component method that mutates state by calling `.set(...)` on a `signal`
- Understanding why the value read in the template (`person()`) always reflects the signal's latest state after a `.set()` call, with no manual re-render logic
- Deciding a signal's exposed name/visibility on a component (`protected` vs `public`, and naming without a defensive underscore) based on what needs to consume it from outside the class
- Picking a random element from an array as a simple way to observe signal updates end-to-end

## 📁 What you're working with

```
apps/04-events/
└── src/app/
    ├── app.ts / app.html / app.scss / app.config.ts   ✅ complete — the app shell/toolbar, nothing to do here
    └── feature/home/
        ├── home.ts       🚧 to do — has the person signal, but no method backs the refresh button yet
        ├── home.html     🚧 to do — the card is fully bound, but the refresh button has no event binding
        └── home.scss     ✅ complete — nothing to change here in this exercise
```

`home.ts` currently exposes the signal as `protected readonly _person`, exactly as it was left at the end of `03-bindings`. `home.html` reads it as `_person()` throughout the card. Keep this in mind: renaming the signal is part of the exercise (see task 1 below), and if you rename it in the class you must update every reference in the template too.

## 📝 Your tasks

### 1. `home.ts` — rename the signal and add a refresh handler

- The signal currently exposing the displayed person is `protected readonly _person`. Rename it so it has no underscore prefix and is `public` (not `protected`) instead — something outside the component (a test, or a future parent component) will need to read it directly. Keep the type (`Signal<Person>`) and its initial value (`PEOPLE_MOCK[0]`) unchanged.
- Add a method to the class that, when called, picks a **random** entry from `PEOPLE_MOCK` and pushes it into the signal. You'll need:
  - A way to get a random, in-bounds index into `PEOPLE_MOCK` (think `Math.random()` combined with the array's `.length`, then round it down to an integer).
  - The signal's `.set(...)` method to replace its current value with the newly picked `Person`. Don't reassign the signal itself — mutate its value through the API `signal()` gives you.
- Name the method however reads naturally as an event handler (e.g. something that communicates "this refreshes/randomizes the displayed person").

### 2. `home.html` — bind every use of the signal to its new name, and wire the click

- Update every `_person()` read in the template (photo `[ngSrc]`, name, entity, email, phone, manager, and the three action links) to use the new signal name from task 1. Miss one and the template won't compile — the compiler will point you at the exact line.
- The FAB button at the bottom (`<button mat-fab color="accent">`) needs an **event binding** on its `click` event that calls the method you wrote in task 1. Angular's event binding syntax wraps the event name in parentheses, e.g. `(eventName)="expression"`.
- Since this button doesn't navigate anywhere, you don't need `$event` for this task — you're just invoking a method with no arguments.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 04-events      # dev server → http://localhost:4200
npx nx test 04-events       # run unit tests with vitest
npx nx lint 04-events       # lint with eslint
npx nx build 04-events      # production build
```

Note: this exercise ships with no `*.spec.ts` files, and the test runner is configured with `passWithNoTests: true`, so `nx test 04-events` will report success even though it isn't checking anything yet. Don't take a green `test` run as proof your implementation is correct — verify visually in the browser by clicking the button repeatedly.

## ✅ How to know it's working

Serve the app and open it in the browser. You should see the same profile card as `03-bindings`, plus:

- Clicking the round "refresh" (autorenew) button in the bottom-right swaps the card's photo, name, entity, email, phone, and manager for a **different, randomly picked person** from the mock data.
- Clicking repeatedly should occasionally show the same person again (it's random, not cycling through in order) — that's expected, since you're picking a random index each time rather than incrementing one.
- No console errors about `_person` — if you renamed the signal but missed updating a reference in the template, check the browser console and terminal output for a compile error naming the offending property.

## 🛠️ Troubleshooting

- **`NG0201`/template compile error mentioning `_person`**: you renamed the signal in `home.ts` but left one or more `_person()` reads in `home.html` unchanged — search the template for every remaining occurrence.
- **Clicking the button does nothing, no console error**: check the event binding syntax — `(click)="yourMethod()"` needs the parentheses around `click` and the method call needs its own parentheses `()`, even with no arguments. A missing `()` after the method name means Angular evaluates the method reference instead of calling it.
- **Clicking the button always shows the same person, or throws an "index out of bounds"-style issue (photo/name become `undefined`)**: double-check your random index calculation — `Math.random()` returns a float in `[0, 1)`, so you need to multiply by the array's length and round *down* (not to the nearest integer) to stay in bounds.
- **Card stops updating after the first click / stays frozen**: make sure you're calling `.set(...)` on the signal (not reassigning the `person` field itself, and not mutating a plain object) — Angular's change detection for signals relies on calling the signal's own update methods.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 04-events` explicitly.

## 🙈 Stuck?

Try to get the refresh button fully working with your own event binding and handler first — that's the whole point of the exercise. If you're genuinely stuck, `apps/04-events-solution` has a complete, working version (including a test suite in `home.spec.ts` that documents the expected behavior) you can compare your code against. Use it to check your approach once you've made a real attempt, not as a starting point to copy from.
