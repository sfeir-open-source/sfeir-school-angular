<!-- .slide: class="transition-bg-sfeir-2" -->
# The Problem
##==##

<!-- .slide: class="sfeir-basic-slide" -->
# A Concrete Example
Consider a classic web application with three components (A, B, C) and a variable named 'toto'.<br/><br/>

- Component A can create and modify the 'toto' variable.
- Component B can modify the 'toto' variable.
- Component C can only modify a property of the 'toto' variable.
<br/><br/>

__Problem__: The data access and modification flow resembles a spiderweb, where each case depends on the context!<br/><br/>
__Consequence__: The logic becomes complicated to follow and difficult to debug.<br/><br/>

We need to find a common communication method.
<!-- .element: class="important" -->

##==##

<!-- .slide -->
# 3 Ways to Communicate

There are two main families of communication:<br/><br/>
- __Parent-Child__:
    - Input / Output (e.g., `@Input()`, `@Output()` in an Angular application)
<br/><br/>
- __Independent Elements__
    - Communication Bus (e.g., notification system, event emitter...)
    - Flux Architecture

##==##

<!-- .slide -->
# Notifications via a Communication Bus

- Notification via an `EventEmitter`
- Can be global or within services
- Uses these methods:
  - `subscribe` and `emit`
<br/><br/>

![h-500](assets/images/school/state-management/bus_methods.png)
![h-500](assets/images/school/state-management/bus_import.png)

##==##

<!-- .slide: class="two-column" -->
# State Management
- Dataflow architecture: like Redux :)<br/><br/>
- Requires installing a third-party library

##--##
<br/><br/><br/>

![h-500](assets/images/school/state-management/redux_concepts.png)
