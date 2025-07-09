<!-- .slide: class="with-code inconsolata" -->
# Overview of Deferred Views :)

- new compiler feature <br/><br/>
- solution for lazy-loading components and their dependencies <br/><br/>
- performance improvement <br/><br/>
- several blocks to manage the lazy-load state <br/><br/>
- triggers, and prefetching

<br/>

```angular17html
@defer {
  <todo-list />
}
```
<!-- .element: class="big-code" -->

##==##

# Why Deferred Views?

- lighten the initial bundle <br/><br/>
- on-demand loading of heavy components that will not be used immediately, or not at all <br/><br/>
- improve LCP and TTFB metrics <br/><br/>

##==##

# Which Dependencies Can Be Deferred?

There are two conditions for a component to be deferred:

- must be standalone <br/><br/>
- must not be directly referenced, for example using @ViewChild

##==##

<!-- .slide: class="with-code inconsolata" -->
# @defer and the @placeholder Sub-block

```angular17html
@defer {
  <todo-list />
}@placeholder(minimum 500ms) {
  <div>Placeholder content</div>
}
```
<!-- .element: class="medium-code" -->

<br/><br/>

By default, the defer block displays no content until it is triggered. The placeholder block is used to display replacement content. <br/><br/>
The @placeholder block takes an additional argument (minimum) which is the minimum display time of the placeholder.

##==##

<!-- .slide: class="with-code inconsolata" -->
# @defer and the @error Sub-block

```angular17html
@defer {
  <todo-list />
}@error {
  <div>An error occurred</div>
}
```
<!-- .slide: class="big-code" -->

<br/><br/>

The error block is used to display alternative content in case of an error while loading the deferred component.

##==##

<!-- .slide: class="with-code inconsolata" -->
# @defer and the @loading Sub-block

```angular17html
@defer {
  <todo-list />
}@loading(after 100ms; minimum 1s) {
  <div>Loading in progress</div>
}
```
<!-- .element: class="big-code" -->

<br/><br/>

The loading block is used to display alternative content while the deferred component is loading. <br/><br/>
It takes two additional arguments: after and minimum:
- after: the waiting time before displaying the loading content <br/><br/>
- minimum: the minimum display time of the loading content

##==## 

# The Different Types of Triggers for Deferred Views

- __on idle__ : triggers loading when the browser is idle <br/><br/>
- __on viewport__ : triggers loading when the component/element is visible in the viewport <br/><br/>
- __on interaction__ : triggers loading when the user interacts with an element <br/><br/>
- __on hover__ : triggers loading when the user hovers over an element <br/><br/>
- __on immediate__: triggers loading immediately <br/><br/>
- __on time__ : triggers loading after a certain time
- __when__ : triggers loading when the condition is true

##==##


# Deferred Loading with Prefetching

- Works exactly like deferred loading, but the component is loaded in the background before being displayed <br/><br/>
- prefetch has the same triggers as deferred loading. <br/><br/>
- prefetch allows managing resource fetching and deferring the display when used together

##==##

<!-- .slide: class="with-code inconsolata" -->
# A Complete Example


```angular17html
<button #trigger>Display</button>
@defer(on interaction(trigger); on timer(10s); prefetch on viewport(trigger)) {
  <todo-list />
}@placeholder(minimum 500ms) {
  <div>Placeholder content</div>
}@loading(after 100ms; minimum 1s) {
  <div>Loading in progress</div>
}@error {
  <div>An error occurred</div>
}
```
<!-- .element: class="big-code" -->
