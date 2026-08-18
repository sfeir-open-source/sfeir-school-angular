# 06 — Pipe

In `05-input-output` you extracted the profile card into `sfeir-card`, living in the shared `@sfeir/ui` library, and wired it to `Home` with `input()`/`output()`. That card currently displays a person's raw data straight from the `Person` model — a manager field that can be empty, and a date of birth stored as a plain string. In this exercise you'll fix both, using two flavors of Angular pipe: Angular's **built-in `DatePipe`** to format a date for display, and your own **custom pipe**, `na`, to turn a missing value into a friendly fallback message — all from the template, without touching component logic.

## 🎯 Learning objectives

- Understanding what a pipe is: a template-transformation function invoked with the `|` syntax, as opposed to logic living in the component class
- Using a **built-in pipe** (`DatePipe` from `@angular/common`) to format a value for display, including passing it a format-string parameter
- Writing your own **standalone custom pipe** with the `@Pipe({ name: ... })` decorator and the `PipeTransform` interface
- Implementing the `transform()` method contract: the piped value arrives as the first parameter, and anything after the pipe's `:` in the template arrives as additional parameters, in order — the same contract whether the pipe ships with Angular or you wrote it yourself
- Passing a parameter to a pipe from the template (`value | pipeName : someArgument`)
- Registering pipes — built-in or custom — in a component's `imports` array, exactly like you already did for standalone components such as `Card`
- Recognizing that pipes are **pure by default**: Angular only re-runs `transform()` when the reference to its input (or its parameters) changes, which is why this app's habit of `.set()`-ing a brand-new `Person` object on every refresh (rather than mutating the existing one) matters for pipes just as much as it does for change detection
- Organizing a small, focused pipe as its own secondary entry point of the shared `@sfeir/ui` library (`@sfeir/ui/na`), the same pattern already used for `@sfeir/ui/card`

## 📁 What you're working with

This exercise spans the app (`apps/06-pipe`) and the shared UI library (`libs/ui`):

```
apps/06-pipe/
└── src/app/
    ├── app.ts / app.html / app.scss / app.config.ts   ✅ complete — nothing to do here
    └── feature/home/
        ├── home.ts    ✅ complete — same person signal + handleRefresh() as 05, using <sfeir-card>
        ├── home.html  ✅ complete — renders <sfeir-card [person]="person()" (delete)="handleRefresh()" />
        └── home.scss  ✅ complete — nothing to do here

libs/ui/
├── na/
│   ├── na.ts           🚧 to do — currently just a placeholder arrow function, not a pipe yet
│   ├── index.ts         ✅ complete — already re-exports whatever `na.ts` exports
│   └── ng-package.json  ✅ complete — declares this folder as a secondary entry point
└── card/
    ├── card.ts    🚧 to do — needs to import and register both pipes
    ├── card.html  🚧 to do — needs a new row for the date of birth, and the manager row needs a fallback
    └── card.scss  ✅ complete — nothing to do here
```

This exercise assumes `libs/ui/card` is already in the state you left it at the end of `05-input-output`: a `Card` component with a required `person` input, a `delete` output, and the profile card markup (photo, name, contact info, manager, action buttons). If your `Card` isn't there yet, finish `05-input-output` first — everything below builds directly on top of it.

## 📝 Your tasks

### 1. `libs/ui/card/card.html` — format the date of birth with `DatePipe`

- Add a new "contact info" row (following the same markup pattern as the existing manager/location rows) that displays the person's date of birth, read from `person().birthDate`.
- Pipe that value through Angular's built-in `date` pipe, passing it a format string parameter so it renders as a readable date rather than the raw stored value (check Angular's `DatePipe` documentation for the format-string syntax, e.g. how to get day/month/year ordering).
- `DatePipe` isn't a global — like every standalone pipe, it must be imported (`DatePipe` from `@angular/common`) and added to `Card`'s `imports` array before the template can use `| date`.

### 2. `libs/ui/na/na.ts` — write the `na` pipe

Replace the placeholder `na` export with a real Angular pipe:

- Import `Pipe` and `PipeTransform` from `@angular/core`.
- Declare a class named `Na` that `implements PipeTransform`.
- Decorate it with `@Pipe({ name: 'na' })` — the `name` is what templates will use after the `|` (so `value | na`). It must be `'na'` to match the file's purpose and what the library already exports.
- Implement `transform(value, ...)`: the first parameter is whatever value is piped in (here, a `string` that can be `undefined` or empty). If it's falsy, return a fallback message instead; otherwise return the value unchanged.
- Give `transform` a second, optional parameter so the caller can override the fallback message from the template (`value | na : 'your custom message'`). Give it a sensible default so the pipe still works if no argument is passed (the pipe's name is a hint about what a good default looks like).

`libs/ui/na/index.ts` already does `export * from './na'`, so once `Na` is exported from `na.ts`, it's automatically part of the library's public API — nothing to change there.

### 3. `libs/ui/card/card.ts` — register both pipes

- Import `DatePipe` from `@angular/common` and `Na` from `@sfeir/ui/na` (a workspace path, exactly like `Card` imports things from `@sfeir/types`).
- Add both to `Card`'s `imports` array. Standalone pipes — built-in or custom — are declared exactly like standalone components/directives: no `NgModule`, no separate registration step.

### 4. `libs/ui/card/card.html` — apply the `na` pipe to the manager display

- Find the line that interpolates `person().manager` inside the "Manager" contact-info row.
- Pipe that value through `na`, passing a custom fallback message that makes sense for someone with no manager (don't just accept the pipe's default — show that you can override it from the template).
- Everything else on that line (the `<a>` linking to `person().managerId`) stays as it is.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 06-pipe   # dev server → http://localhost:4200
npx nx test 06-pipe    # run the app's unit tests with vitest
npx nx lint 06-pipe    # lint the app with eslint
npx nx build 06-pipe   # production build (also builds the "ui" library it depends on)

npx nx test ui         # run the ui library's unit tests with vitest (covers card/ and na/)
npx nx lint ui         # lint the ui library with eslint
```

## ✅ How to know it's working

Serve the app and open it in the browser:

- The profile card renders exactly as it did at the end of `05-input-output` (photo, name, entity, email, phone, manager, location, action icons), and the refresh FAB / card delete icon still swap in a new random person.
- A new row now shows the person's date of birth, formatted (not the raw stored string).
- For a person who **has** a manager, the "Manager" row still shows that manager's name, unchanged.
- Click "refresh" a few times until you land on the person with no manager (their manager field is empty in the mock data) — instead of a blank space, you should see your custom fallback message.
- Open devtools console: no errors about an unknown pipe (an `NG6100`-style "pipe not found" template error) or a template parse error around the `|` syntax.

## 🛠️ Troubleshooting

- **`The pipe 'date' could not be found` (or `'na' could not be found`)**: `Card` is missing that pipe in its component `imports` array — `DatePipe` comes from `@angular/common`, `Na` from `@sfeir/ui/na`.
- **Compiler/build error about `na.ts` not exporting anything usable**: check that your class is actually exported (`export class Na ...`) — `index.ts`'s `export * from './na'` only re-exports what `na.ts` itself exports.
- **The manager column is blank instead of showing your fallback message**: double-check the pipe syntax — it's `expression | na : argument`, with a single colon separating the pipe name from its parameter, not a comma or parentheses. Same syntax applies to `| date : 'yourFormat'`.
- **The fallback message shows even for people who do have a manager**: your `transform()` is likely always returning the fallback — check the falsy check is only triggered when the incoming value is actually empty/undefined, not for every call.
- **`NG8002`/unknown property `person` errors on `<sfeir-card>`**: this means `libs/ui/card` isn't yet in its post-`05-input-output` state — go finish that exercise's tasks on `Card` first, this one assumes they're done.
- **`nx build 06-pipe` fails referencing `@sfeir/ui`**: this app depends on the `ui` library at build time — an error inside `libs/ui/na` or `libs/ui/card` (a bad import, a typo in a `@Pipe` decorator) will surface here even though `nx serve`/`nx test` only targeted the app.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 06-pipe` explicitly.

## 🙈 Stuck?

Try writing the pipe and wiring both of them up yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/06-pipe-solution` (app side) and `libs/ui-solution/na` / `libs/ui-solution/card` (library side) together form a complete, working version that you can compare your code against. Use them to check your approach once you've made a real attempt, not as a starting point to copy from.
