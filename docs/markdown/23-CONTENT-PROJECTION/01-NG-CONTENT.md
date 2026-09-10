# A `Loader` that only knows how to be a spinner

`apps/20-ng-content` starts from a `Loader` component that is just a bare spinner:

```typescript
@Component({ selector: 'sfeir-loader', templateUrl: './loader.html' })
export class Loader {}
```

<!-- .element: class="medium-code" -->

- No inputs, no way to know whether it should actually be showing<br/><br/>
- No way to wrap anything — every screen that needs a loading state has to `@if`/`@else` branch between "the loader" and "the real content" by hand

##==##

# `<ng-content />`: transclusion

- Lets a component render markup its **caller** wrote, not just markup baked into its own template<br/><br/>
- Placed inside a component's template, wherever the projected content should end up<br/><br/>
- Must be used inside a component — it has no meaning on a plain element

##==##

<!-- .slide: class="with-code inconsolata" -->

# The simplest projection

```typescript
@Component({
  selector: 'app-wrapper',
  template: `
    <section>
      <ng-content />
    </section>
  `,
})
export class Wrapper {}
```

<!-- .element: class="medium-code" -->

```html
<app-wrapper>
  <div>Hello everyone</div>
</app-wrapper>
```

<!-- .element: class="medium-code" -->

- `<div>Hello everyone</div>` renders exactly where `<ng-content />` sits inside `Wrapper`'s own template<br/><br/>
- `Wrapper` never had to know what it was wrapping

##==##

# The `select` attribute

- Not mandatory — with no `select`, `<ng-content />` projects **everything** the caller put inside the tags<br/><br/>
- With `select`, you can target a specific CSS selector: a class (`select=".my-class"`), an attribute (`select="[type='submit']"`), an element (`select="button"`), or a combination<br/><br/>
- Multiple `<ng-content select="...">` slots let a component project different parts of its content to different places — not needed for `Loader`, which only ever projects "everything"
