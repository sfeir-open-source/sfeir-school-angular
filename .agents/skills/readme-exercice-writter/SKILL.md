---
name: readme-exercice-writter
description: Writes and updates the student-facing README.md for a hands-on exercise under apps/. Trigger when creating, reworking, fixing, or completing a README for an exercise folder in apps/ (e.g. apps/NN-*), or when a README needs to explain an exercise's concepts, tasks, commands, or troubleshooting. Never gives away the solution.
license: MIT
metadata:
  author: sfeir-school-angular
  version: '1.0'
---

# README Exercise Writer

This skill authors the student-facing `README.md` that lives inside an exercise folder under `apps/` (e.g. `apps/01-hands-on/README.md`). The README must teach and guide, never solve.

## Core convention

Every exercise folder `apps/NN-*` has a sibling solution folder `apps/NN-*-solution`. The README is always written **in the exercise folder**, and its content is derived entirely from the *difference* between the two folders — that diff is the syllabus of what the student must do.

## Required workflow

1. **Identify the pair.** Given an exercise folder (e.g. `apps/07-signals`), confirm its solution counterpart exists (`apps/07-signals-solution`). If it doesn't exist, stop and tell the user — this skill cannot write an accurate README without a solution to diff against.
2. **Delegate the diff to the `explorer` subagent.** Do not read every file yourself first — dispatch the custom `explorer` subagent with a self-contained prompt asking it to:
   - Walk the full file tree of both the exercise and solution `src/` (and any other relevant folders).
   - Report which files are empty/stub, contain `TODO`s, or are otherwise incomplete in the exercise.
   - Diff each such file against its solution counterpart and summarize *what concept/API* the missing code exercises (signals, standalone components, inputs/outputs, DI, HttpClient, control flow, forms, routing, RxJS, testing, etc.) — not the exact code to write.
   - Read `project.json` (both apps) for the Nx targets (`serve`, `build`, `test`, `lint`) and check `nx.json` for `defaultProject` and the package manager/scripts in the root `package.json`. Tests are for trainer use only — students never write tests during the training, so don't use `*.spec.ts` files as a source of tasks or hints for the README.
   - Flag any environment gotchas: missing theme/global styles, required ports, seed/mock data files under `public/`, config differences between exercise and solution `project.json` that aren't part of the exercise itself but could confuse a student (e.g. a missing stylesheet entry).
   - Check whether a README already exists in the exercise folder (read it) so an update preserves anything still accurate.
3. **Delegate the README write to the `trainer` subagent.** Do not draft or write the README yourself. Dispatch the custom `trainer` subagent with a self-contained prompt that includes: the exercise/solution folder paths, the full `explorer` report (diff summary, incomplete files, Nx targets, environment gotchas, existing README content), instructions to write `apps/NN-*/README.md` following the required structure below, and all non-negotiables — verify every file name/selector/command/port by reading it directly before stating it in the README, never include solution code or the exact final values/text the student must produce (e.g. don't reveal a literal string the solution hardcodes; describe the *shape* of what's needed instead), never use `*.spec.ts` content as task hints, and stay scoped to the target exercise folder.

## Required README structure

1. **Title + one-paragraph intro** — what the student will build/extend in this step, in plain language.
2. **🎯 Learning objectives** — bullet list of the concrete Angular/JS concepts this exercise exercises, derived from the diff (e.g. "Standalone components", "Signal inputs", "computed()"). Each bullet should be specific enough to be useful for review, not generic ("Angular basics").
3. **📁 What you're working with** — a file tree of the exercise's relevant `src/` scope, annotated per file: complete (nothing to do), stub/empty (to do), or partially complete (has a specific placeholder to fill). This is the map of the diff from step 2.
4. **📝 Your tasks** — one numbered subsection per file/unit of work that needs completion. For each: what the file/class/method needs to do and which APIs are involved, framed as instructions and hints (mention relevant Angular APIs, decorators, imports to use) — never as code to copy.
5. **▶️ How to run the application** — exact `nx`/`npm` commands to serve, test, lint, and build this specific app, taken from the real `project.json`/`nx.json`/root `package.json` (don't guess a port or script name — verify it).
6. **✅ How to know it's working** — a short observable checklist (what should render/pass) the student can self-check against, without giving away implementation details.
7. **🛠️ Troubleshooting** — a list of realistic failure modes for *this specific exercise* (not generic Angular advice) mapped to likely causes and fixes: e.g. "unknown element" errors from a missing standalone import, blank page from an unwired bootstrap call, a wrong relative path for `templateUrl`. Base these on the actual files and APIs involved, not boilerplate.
8. **🙈 A closing note pointing at the solution folder** — encourage attempting the exercise fully first, and using the solution folder only as a last resort to compare against, not to copy from.

## Non-negotiables

- **Never paste or paraphrase the solution's exact code, literal strings, or final output text.** Describe behavior and APIs, not answers.
- **Don't invent commands, ports, or paths.** Every command and path in the README must come from a file you (or the delegated Explore agent, then verified by you) actually read in this repo.
- **Stay scoped to the target exercise.** Don't edit unrelated apps, slides, or docs while writing a README.
- **Keep it well-structured**: use the heading structure and emoji markers above consistently across exercises so the training has a uniform README format.
