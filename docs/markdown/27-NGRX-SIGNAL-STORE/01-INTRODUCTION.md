<!-- .slide: class="transition-bg-sfeir-2" -->

# The Problem

##==##

# `StaffDirectory` today: a small monolith

Right now `StaffDirectory` injects `People` and `MatDialog` itself, wires up three RxJS flows (`_getPersonsFlow`, `_deletePersonFlow`, `_upsertPersonFlow`) merged into one `toSignal(...)`, tracks its own `_isLoading` signal, and exposes `handleDelete`/`handleChangeView`/`handleOpenAddDialog` pushing into `Subject`s.<br/><br/>

It works — but every bit of that state and behavior lives and dies with **this one component**. Nothing about "the list of people" or "is it loading" can be reused, unit-tested in isolation, or shared with a sibling route without dragging the whole component along.

<!-- .element: class="important" -->

##==##

# Ways to share state

Two main families of communication:<br/><br/>

- **Parent-Child**: `input()` / `output()` / `model()` — great locally, painful across a large tree<br/><br/>
- **Independent Elements**:
  - a **shared service** exposing signals — the modern default, fine up to moderate complexity
  - a dedicated **state-management library** — once the state and its transitions (loading flags, optimistic updates, cache invalidation, undo…) become numerous enough that hand-rolling them gets messy

##==##

# Where `@ngrx/signals` fits

`StaffDirectory`'s three flows, its loading flag, and its dialog-opening logic are exactly that "numerous enough" case. In this chapter you extract all of it into a **`signalStore`** — a reactive, signal-based state container built the same way you already build components: composed from small pieces (`withState`, `withComputed`, `withMethods`, `withHooks`) rather than one big class.<br/><br/>

Once it's built, `StaffDirectory` becomes a thin shell that just injects the store and reads/calls it from the template — no local signals, no `Subject`s, no RxJS flows of its own.

Notes:
- This is the exact transformation asked for in apps/24-ngrx-signal: staff-directory.ts shrinks to one line of logic, everything else moves into a new staff-directory-store.ts.
