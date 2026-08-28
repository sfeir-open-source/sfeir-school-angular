---
name: augmented-students-exercice
description: Realizes a workshop exercise with AI end-to-end — dispatches the developer subagent to implement the exercise from its README, then dispatches the examiner subagent to verify the student's understanding of the produced code and concepts. Trigger every time the user asks to develop, do, complete, realize, or work on an exercise/workshop (e.g. "do the exercise in apps/07-signals", "develop apps/19-interceptors", "let's do the resolver workshop").
license: MIT
metadata:
  author: sfeir-school-angular
  version: '1.0'
---

# Augmented Students Exercise

This skill runs a workshop exercise end-to-end with AI, in two mandatory, sequential steps. It must be used every time the user asks to develop, do, complete, realize, or otherwise work through an `apps/NN-*` exercise.

## Required flow (always both steps, always in order)

1. **Implement — dispatch the `developer` subagent.**
   - Identify the exact exercise folder in scope (e.g. `apps/07-signals`). If the user only gives a topic/name and not a path, resolve it to the right `apps/NN-*` folder first (list `apps/` if needed) before dispatching.
   - The `developer` subagent **must read the exercise's `README.md`** (`apps/NN-*/README.md`) before writing any code — its tasks, learning objectives, and "how to know it's working" checklist are the spec. Make this explicit in the dispatch prompt: give it the exercise folder path and instruct it to read the README first, then implement every task listed there.
   - Do not draft or write any code yourself — this step is fully delegated to `developer`.
   - Wait for `developer` to finish (code written, and — per its own workflow — build/lint/test targets run) before moving to step 2. Do not start step 2 in parallel.

2. **Verify — dispatch the `examiner` subagent.**
   - Only start this step after `developer` has reported completion.
   - Give `examiner` the same exercise folder path (e.g. `apps/07-signals`) so it examines the code that was just produced and the concepts it covers, per its own exam workflow (5-6 questions, one at a time, verified against documentation, ending in a scored report).
   - Do not shortcut, summarize, or pre-answer the exam yourself — let `examiner` run its own loop directly with the student.

## Non-negotiables

- **Never skip step 2.** Producing the solution without the examiner's verification pass is an incomplete run of this skill — the point is confirming the student understands what the AI built, not just that it builds.
- **Never run the steps out of order or in parallel.** The examiner must quiz on code that already exists; dispatching it before `developer` finishes means it has nothing real to examine.
- **Never write the exercise code yourself.** Implementation is `developer`'s job; examination is `examiner`'s job. This skill's role is orchestration, not authorship.
- **Ground both steps in the real exercise folder.** Don't let either subagent work from assumptions about what the exercise wants — `developer` must read the actual README, and `examiner` must read the actual code produced, not a description of it.
- **Stay scoped to the target exercise.** Don't let `developer` touch unrelated `apps/` folders or `libs/` beyond what the exercise's README requires.
