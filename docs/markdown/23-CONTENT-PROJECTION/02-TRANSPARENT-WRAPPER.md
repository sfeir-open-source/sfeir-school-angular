# Turning `Loader` into a transparent wrapper

The goal: the same `Loader` wraps the whole Staff Directory, or just the `Home` screen's card — and it shows a blocking spinner **on top** of whatever it wraps, without ever hiding the content underneath.

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Before

```html
<!-- loader.html -->
<div class="loader">
  <svg class="circular">...</svg>
</div>
```

<!-- .element: class="medium-code" -->

<br/>

Nothing projected. The spinner is all there is — every caller has to `@if`/`@else` between the loader and the real content themselves.

##++##
##++## class="with-code inconsolata"

# After

```html
<!-- loader.html -->
<ng-content />
@if (isLoading()) {
<div class="loader-overlay">
  <svg class="circular">...</svg>
</div>
}
```

<!-- .element: class="medium-code" -->

<br/>

Projected content **always** renders. The spinner overlay is **conditionally** layered on top with `@if`.

##++##

##==##

# The "transparent wrapper" pattern

- Projected content underneath, **always rendered** — the caller's markup never disappears from the DOM<br/><br/>
- The component's own markup — here, a fixed-position `.loader-overlay` backdrop — layered **on top**, conditionally<br/><br/>
- The result: no flash of an empty screen. Toggling `isLoading` shows/hides a spinner *over* content that was already there — very different from swapping between two branches of an `@if/@else`
