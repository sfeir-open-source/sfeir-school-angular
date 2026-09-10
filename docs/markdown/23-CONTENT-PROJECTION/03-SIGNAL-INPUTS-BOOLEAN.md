<!-- .slide: class="with-code inconsolata" -->

# A boolean signal input, with a default

```typescript
@Component({ selector: 'sfeir-loader', templateUrl: './loader.html' })
export class Loader {
  isLoading = input(true, { transform: booleanAttribute });
}
```

<!-- .element: class="big-code" -->

- Defaults to `true` — a `<sfeir-loader>` with no binding at all still shows its spinner, matching how it used to be used unconditionally inside an `@empty` block<br/><br/>
- `transform: booleanAttribute` (from `@angular/core`) lets the same input be set two ways

##==##

<!-- .slide: class="with-code inconsolata" -->

# Two ways to set the same input

```html
<!-- bound expression -->
<sfeir-loader [isLoading]="_isLoading()">...</sfeir-loader>

<!-- plain HTML attribute, no binding at all -->
<sfeir-loader isLoading>...</sfeir-loader>
```

<!-- .element: class="medium-code" -->

- Without `booleanAttribute`, the plain-attribute form would pass the **string** `"isLoading"`, which is truthy but not actually a `boolean`<br/><br/>
- `booleanAttribute` normalizes both forms to a real `boolean`, the same coercion Angular's own `disabled`/`required` DOM attributes use
