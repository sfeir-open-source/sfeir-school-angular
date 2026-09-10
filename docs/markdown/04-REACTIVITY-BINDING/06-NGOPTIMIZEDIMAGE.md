<!-- .slide: class="with-code inconsolata" -->

# Binding an image: `NgOptimizedImage`

For images, prefer Angular's built-in `NgOptimizedImage` directive over a plain `[src]` — it's a **directive**, so its selector is an attribute (`[ngSrc]`), not a real DOM property.

<br/>

```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sfeir-home',
  imports: [NgOptimizedImage /* ... */],
})
export class Home {}
```

<!-- .element: class="medium-code" -->

```html
<img [ngSrc]="_person().photo" height="120" width="120" alt="" />
```

<!-- .element: class="medium-code" -->

Notes:

- `NgOptimizedImage` requires explicit `height`/`width` (or `fill`) to prevent layout shift while the image loads, and adds `loading="lazy"` and priority hints under the hood for images below/above the fold.
- Like every standalone directive, it must be imported into the component's `imports` array — same rule as for `MatIconModule` or any Material module.

##==##

<!-- .slide -->

# Why not just `[src]`?

- `[src]="url()"` still works — it's a plain **property binding** on the native `<img>` element
- `[ngSrc]` opts into Angular's performance best-practices for images **for free**: lazy loading, explicit dimensions enforced at compile time, automatic `fetchpriority` for LCP images
- Trade-off: `[ngSrc]` **requires** `height`/`width` — Angular throws a dev-mode warning if you forget them, precisely so you don't ship a page that jumps around while photos load

> Rule of thumb: reach for `NgOptimizedImage` any time an `<img>`'s source is dynamic, as it is for every person's photo in this app.
