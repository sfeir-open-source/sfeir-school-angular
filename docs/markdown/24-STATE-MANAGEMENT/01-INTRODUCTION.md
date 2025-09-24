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

# 3 Ways to Communicate

There are two main families of communication:<br/><br/>

- **Parent-Child**: - Input / Output (e.g., `input()`, `output()` in an Angular application)
  <br/><br/>
- **Independent Elements**
  - Communication Bus (e.g., notification system, event emitter...)
  - Flux Architecture

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
- Requires installing a third-party library

##++##

##++##

<br/><br/><br/>

![](assets/images/school/state-management/redux_concepts.png 'h-500')
##++##
