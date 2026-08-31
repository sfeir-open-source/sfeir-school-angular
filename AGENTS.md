# agents.md — repo guide

This file is the source of truth for any agent/subagent working in this repository. Read it before making changes. Subfolders may have their own `AGENTS.md` (currently `docs/AGENTS.md`) with more specific rules — those take precedence for their folder.

## What this repo is

"Sfeir School Angular" — an Nx monorepo that powers an Angular training. It has two halves:

- **`apps/`** — a progressive series of numbered hands-on exercises (`NN-topic`), each teaching one Angular concept, plus a matching `NN-topic-solution` app. Together the exercises build the same running application step by step (staff directory / "king" app).
- **`docs/`** — the reveal.js slide deck (`sfeir-school-theme`) that delivers the training content and links back to each exercise. See `docs/AGENTS.md` for its structure and mechanics — it is a separate Nx project, not "documentation about the repo".

## Repo structure

| Path                                               | Purpose                                                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/NN-topic/`                                   | Student-facing exercise app with a `README.md` describing the task (never contains the solution).                                                 |
| `apps/NN-topic-solution/`                          | Fully implemented reference solution for that same exercise, no `README.md`.                                                                      |
| `apps/server/`                                     | Fastify REST API backing the exercises (`server-rest` Nx project).                                                                                |
| `libs/types/`                                      | Shared TypeScript types (e.g. `Person`) used across apps.                                                                                         |
| `libs/ui/`                                         | Shared standalone Angular components used by the exercise apps (`card`, `king`, `loader`, `na`, `reactive-form`, `signal-form`, `template-form`). |
| `libs/ui-solution/`                                | Same shared components, wired for the `-solution` apps.                                                                                           |
| `docs/`                                            | Slide deck project (reveal.js + `sfeir-school-theme`). See `docs/AGENTS.md`.                                                                      |
| `tools/`                                           | Workspace tooling/scripts.                                                                                                                        |
| `migrations.json`, `nx.json`, `tsconfig.base.json` | Nx workspace configuration.                                                                                                                       |
| `.claude/agents/`                                  | Subagent definitions (see below).                                                                                                                 |
| `.claude/skills/`                                  | Skill definitions (see below).                                                                                                                    |
| `.mcp.json`                                        | MCP servers available to agents: `eslint`, `nx-mcp`, `angular-cli`.                                                                               |

Numbered exercises currently span `01-hands-on` through `19-interceptors` (each with a `-solution` twin), covering: hands-on basics, component tree, bindings, events, input/output, pipes, providers/DI, directives, router, control flow, HTTP, template/reactive/signal forms, reactive thinking, advanced routing, guards, resolvers, and interceptors.

## Principal commands

Run from the workspace root (npm scripts wrap Nx targets):

| Command                                                    | What it does                                                                                                                                        |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run serve -- <project>` (or `npx nx serve <project>`) | Serve a specific app, e.g. `npx nx serve 07-provider`.                                                                                              |
| `npm run start:prez`                                       | Serve the slide deck (`nx serve docs`) at `http://localhost:4242`.                                                                                  |
| `npm run test -- <project>`                                | Run tests for one project (Vitest).                                                                                                                 |
| `npm run lint -- <project>`                                | Lint one project.                                                                                                                                   |
| `npm run build -- <project>`                               | Build one project.                                                                                                                                  |
| `npm run test:all` / `lint:all` / `build:all`              | Run the target across all projects except plain (non-solution) exercise apps and excluding `server-rest` is included — see script for exact filter. |
| `npm run test:ci` / `lint:ci` / `build:ci`                 | Same, but only on projects affected by the current change set (`nx affected`), for CI.                                                              |
| `npm run nx -- <args>`                                     | Run any raw Nx CLI command.                                                                                                                         |
| `npm run migrate-nx` / `run-migration`                     | Update Nx and apply pending migrations.                                                                                                             |

Prefer the `mcp__angular-cli__*` and `mcp__nx-mcp__*` MCP tools over raw shell Angular CLI/Nx invocations when available — they give safer, structured access to the same operations (`list_projects`, `get_best_practices`, `run_target`, `devserver_start`, workspace graph, docs, etc.).

## Subagents (`.claude/agents/`)

| Agent       | Model                             | Use for                                                                                                                                                                                                                                                                                                                  |
| ----------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `developer` | Sonnet 5, thinking, medium effort | Writing/changing code in `apps/` or `libs/`: new features, tests, refactors, bug fixes. Has Angular CLI MCP tools + devserver control. **Mandatory — no exceptions, including trivial/one-line fixes**: the top-level agent must never edit files under `apps/` or `libs/` itself; always dispatch to `developer` first. |
| `trainer`   | Sonnet 5, thinking, medium effort | Anything under `docs/` (slides), and student-facing `README.md` files under `apps/NN-*`.                                                                                                                                                                                                                                 |
| `examiner`  | Haiku 4.5, no thinking            | Quizzes the user on an exercise they just completed, to verify real understanding (not a tutor — an exam).                                                                                                                                                                                                               |
| `explorer`  | Haiku 4.5, no thinking, read-only | Fast codebase lookups: where something lives, how it works, diffing an exercise against its `-solution`. Used standalone or by other subagents needing context.                                                                                                                                                          |

## Skills (`.claude/skills/`)

| Skill                         | Purpose                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `angular-developer`           | Reference/guidance for generating Angular code — reactivity (signals, `linkedSignal`, `resource`, `httpResource`), forms, DI, routing, SSR, a11y, animations, styling, testing, CLI. |
| `augmented-students-exercice` | End-to-end "do this exercise with AI": dispatches `developer` to implement it from the README, then `examiner` to verify understanding.                                              |
| `readme-exercice-writter`     | Writes/updates the student-facing `README.md` of an `apps/NN-*` exercise. Never reveals the solution.                                                                                |
| `slide-writer`                | Writes/edits training slides in `docs/markdown`, including multi-column layouts, images, code blocks, speaker notes, and registering new slides in `docs/scripts/day_*.js`.          |

## Working conventions

- **Never edit code under `apps/` or `libs/` directly from the top-level session, even for a seemingly trivial one-line fix.** Always dispatch to the correct subagent first — see the Subagents table above.
- Match an exercise's existing pattern in its `-solution` sibling before inventing a new approach — the whole training is meant to read as one continuous, consistent app.
- Never put solution code or answers inside a plain `apps/NN-topic/README.md`.
- Edit `docs/scss/*.scss` sources, not the generated `docs/css/*.css`.
- A new slide file must be referenced in the relevant `docs/scripts/day_*.js` to actually appear in the deck.
