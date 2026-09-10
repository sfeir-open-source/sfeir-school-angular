# apps/AGENTS.md — exercises guide

This file documents the `apps/` folder specifically: the technologies it uses, how it's structured, and the exercise/solution convention. See the root `AGENTS.md` for the whole-repo picture (subagents, skills, principal commands).

**Keep this file up to date.** The `developer` subagent must update this file whenever it makes a significant change under `apps/` or `libs/` — a new exercise/solution pair, a new shared `libs/ui` component consumed here, a change in tech stack/tooling, or a structural convention change. Small in-exercise edits (a single component, a bugfix, a test) don't require an update.

## Technologies

- **Angular 22** — standalone components only, signals-based reactivity (`signal()`, `computed()`, `linkedSignal()`, `resource()`/`httpResource()`), `input()`/`output()`/`model()`, the new control-flow syntax (`@if`/`@for`/`@switch`). No `NgModule`, no `*ngIf`/`*ngFor`, no `@Input()`/`@Output()` decorators — unless a specific exercise folder is intentionally written in an older style for pedagogical reasons (e.g. to contrast with the newer API taught next).
- **Angular Material** — UI components (`MatToolbarModule`, `MatCardModule`, etc.), indigo-pink prebuilt theme.
- **Angular Router** — routing, guards, resolvers (exercises 09, 16–18).
- **RxJS** — reactive streams, interceptors (exercise 19).
- **State management libraries**, one per relevant exercise: `@ngrx/signals` (24-ngrx-signal), `@ngrx/store`, `@ngxs/store`, `@ngneat/elf` / `@ngneat/elf-entities` — used to compare different state-management approaches on the same app.
- **Fastify** — the REST API in `apps/server` (`server-rest` Nx project) that backs the exercises' HTTP calls.
- **Vitest** (`@analogjs/vitest-angular`, `@testing-library/angular`, `@testing-library/jest-dom`) — the test runner for both apps and libs (exercise 23-unit-tests focuses on this).
- **Nx 23** — monorepo orchestration; each app/lib is its own Nx project with its own `project.json` targets (`build`, `serve`, `test`, `lint`).
- **SCSS** — component and global styling.
- **TypeScript** (strict), **ESLint** + **Prettier** — linting/formatting, project-scoped `eslint.config.mjs` per app.

## Folder structure

```
apps/
├── NN-topic/                  exercise app the student completes
│   ├── README.md              task description — NEVER contains the solution
│   ├── project.json           Nx targets (build/serve/test/lint)
│   ├── src/app/                component tree, partially implemented (❌ TO DO markers in README)
│   ├── public/                 static assets
│   └── eslint.config.mjs, tsconfig*.json, vite.config.mts
├── NN-topic-solution/         fully implemented reference twin of NN-topic
│   └── (same layout, no README.md)
└── server/                    Fastify REST API (server-rest), shared by every exercise
```

Each exercise app and its solution are separate Nx projects/directories (not branches or git tags) so a student can run either the exercise or the solution standalone, and the training deck (`docs/`) can link directly to either.

### Current exercises (`NN-topic`)

`01-hands-on` · `02-component-tree` · `03-bindings` · `04-events` · `05-input-output` · `06-pipe` · `07-provider` · `08-directive` · `09-router` · `10-control-flow` · `11-http` · `12-template-form` · `13-reactive-form` · `14-signal-form` · `15-reactive-thinking` · `16-advanced-routing` · `17-guards` · `18-resolver` · `19-interceptors` · `20-ng-content` · `21-teleportation` · `22-structural-directive` · `23-unit-tests` · `24-ngrx-signal`

Every one of these has a matching `NN-topic-solution` app. They build the same running application ("staff directory" / "king" app) progressively — each step assumes the concepts taught in the previous ones.

## Exercise vs. solution convention

- **`apps/NN-topic`** is what the student opens. Its `src/` is intentionally incomplete: files/methods marked as TO DO in its `README.md`. The README explains the learning objectives and the task, but must never reveal the implementation.
- **`apps/NN-topic-solution`** is the complete, reference-quality implementation of the same exercise. No `README.md` — it's meant to be read as finished code, or served side-by-side for comparison/unblocking.
- The two are structurally identical (same Nx project shape, same component/file layout) except for what's filled in. When modifying one, check the other via the `explorer` subagent to keep them consistent — a change to the exercise's target shape (e.g. a renamed file, a new required output) should be mirrored in the solution, and vice versa.
- Shared building blocks used by both live in `libs/ui` (consumed by `NN-topic` apps) and `libs/ui-solution` (consumed by `NN-topic-solution` apps) — same components, wired differently per side. Shared types live in `libs/types`.

## Shared libraries consumed here

- `libs/types` — shared TypeScript types (e.g. `Person`).
- `libs/ui` — standalone components used by exercise apps: `card`, `king`, `list`, `loader`, `na`, `password`, `reactive-form`, `signal-form`, `template-form`.
- `libs/ui-solution` — the same set of components, wired for the `-solution` apps.
