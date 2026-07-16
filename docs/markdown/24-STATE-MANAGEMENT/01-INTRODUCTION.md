<!-- .slide: class="transition-bg-sfeir-2" -->

# The Problem

##==##

# A Concrete Example

Consider a classic web application with three components (A, B, C) and a variable named 'toto'.<br/><br/>

- Component A can create and modify the 'toto' variable.
- Component B can modify the 'toto' variable.
- Component C can only modify a property of the 'toto' variable.
  <br/><br/>

**Problem**: The data access and modification flow resembles a spiderweb, where each case depends on the context!<br/><br/>
**Consequence**: The logic becomes complicated to follow and difficult to debug.<br/><br/>

We need to find a common communication method.

<!-- .element: class="important" -->

##==##

# Ways to share state

Two main families of communication:<br/><br/>

- **Parent-Child**: `input()` / `output()` / `model()` — great locally, painful across a large tree
  <br/><br/>
- **Independent Elements**
  - a **shared service** (the modern default: a service exposing **signals**)
  - a Communication Bus (notification system, event emitter…)
  - a Flux/Redux architecture (a dedicated state-management library)

##==##

# Notifications via a Communication Bus

- Notification via an `EventEmitter`
- Can be global or within services
- Uses these methods:
  - `subscribe` and `emit`
    <br/><br/>

![](assets/images/school/state-management/bus_methods.png 'h-500')
![](assets/images/school/state-management/bus_import.png 'h-500')

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# State Management

- Dataflow architecture: like Redux :)<br/><br/>
- Requires a third-party library (ELF, NgRx, NgXS…)<br/><br/>
- For simple to medium apps, a **service exposing signals** (`signal` + `computed`) is often enough — reach for a library when the state and its transitions become complex

##++##

##++##

<br/><br/><br/>

![](assets/images/school/state-management/redux_concepts.png 'h-500')
##++##
