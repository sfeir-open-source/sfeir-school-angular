<!-- .slide: class="transition bg-blue" -->

# Deferrable Views

Minimize the initial bundle

<!-- .slide: class="with-code inconsolata" -->

# Overview of Deferred Views :)

- Template-level code splitting with <code>@defer</code> <br/><br/>
- Load heavy UI on demand to improve LCP/TTFB and user-perceived speed <br/><br/>
- Triggers: on viewport, on interaction, on hover, on idle, on timer, on immediate, and when <br/><br/>
- Sub-blocks: <code>@placeholder</code>, <code>@loading</code>, <code>@error</code> with timing options <br/><br/>
- Prefetch to download early without rendering yet <br/><br/>
- Best practices and pitfalls with real-world examples

```angular181html
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

There are two conditions for a component to be deferred: <br/><br/>

- must be standalone <br/><br/>
- must not be directly referenced, for example using @ViewChild

##==##

<!-- .slide: class="with-code inconsolata" -->

# @defer and the @placeholder Sub-block

```angular181html
@defer {
  <todo-list />
}@placeholder(minimum 500ms) {
  <div>Placeholder content</div>
}
```

<!-- .element: class="medium-code" -->

<br/><br/>

By default, the defer block displays no content until it is triggered. The placeholder block is used to display replacement content. <br/><br/>
The **@placeholder** block takes an additional argument (minimum) which is the minimum display time of the placeholder.

##==##

<!-- .slide: class="with-code inconsolata" -->

# @defer and the @error Sub-block

```angular181html
@defer {
  <todo-list />
}@error {
  <div>An error occurred</div>
}
```

<!-- .element: class="big-code" -->

<br/><br/>

The error block is used to display alternative content in case of an error while loading the deferred component.

##==##

<!-- .slide: class="with-code inconsolata" -->

# @defer and the @loading Sub-block

```angular181html
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

- **on idle** : triggers loading when the browser is idle <br/><br/>
- **on viewport** : triggers loading when the component/element is visible in the viewport <br/><br/>
- **on interaction** : triggers loading when the user interacts with an element <br/><br/>
- **on hover** : triggers loading when the user hovers over an element <br/><br/>
- **on immediate**: triggers loading immediately <br/><br/>
- **on time** : triggers loading after a certain time <br/><br/>
- **when** : triggers loading when the condition is true

##==##

# Deferred Loading with Prefetching

- Works exactly like deferred loading, but the component is loaded in the background before being displayed <br/><br/>
- prefetch has the same triggers as deferred loading. <br/><br/>
- prefetch allows managing resource fetching and deferring the display when used together

##==##

# Best Practices

- Choose triggers that reflect user intent (viewport, interaction, hover) <br/><br/>
- Always provide a good placeholder/loading for perceived speed <br/><br/>
- Consider prefetching on idle or hover for faster reveal <br/><br/>
- Avoid overusing <code>on immediate</code> — it competes with initial boot <br/><br/>
- Defer truly heavy dependencies (charts, maps, editors) <br/><br/>
- Measure your changes (LCP, TTFB, chunk sizes) and iterate <br/><br/>

##==##

# Common Pitfalls and Solutions

- Eager references (e.g. <code>@ViewChild</code> or direct template usage elsewhere) prevent deferral → remove eager references <br/><br/>
- <code>@loading</code> never appears → set <code>after</code> low enough and <code>minimum</code> long enough <br/><br/>
- Expecting prefetch to render → prefetch only downloads; you still need a display trigger <br/><br/>
- Many defers firing together → combine with precise triggers or stagger with timers <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# A Complete Example (Advanced)

```angular181html
<!-- Combined triggers + prefetch -->
<button #open>Open details</button>
<div #sentry></div>

@defer(on interaction(open); on viewport(sentry); on timer(8s); prefetch on idle) {
  <heavy-details />
}@placeholder(minimum 600ms) {
  <app-skeleton kind="details" />
}@loading(after 150ms; minimum 800ms) {
  <div>Loading details…</div>
}@error {
  <div>Could not load details.</div>
}

<!-- Conditional defer -->
@defer(when isProUser(); prefetch on idle) {
  <pro-dashboard />
}@placeholder {
  <div>Upgrade to unlock Pro dashboard.</div>
}

<!-- Intent-driven prefetch -->
<button #menu>Reports</button>
@defer(on interaction(menu); prefetch on hover(menu)) {
  <report-preview />
}
```

<!-- .element: class="small-code" -->
