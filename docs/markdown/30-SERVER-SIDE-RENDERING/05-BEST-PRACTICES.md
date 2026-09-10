<!-- .slide: class="with-code inconsolata" -->

# Performance best practices

## Use the appropriate rendering mode per route

```typescript
export default [
  { path: '/', renderMode: RenderMode.Prerender }, // Static homepage
  { path: '/products', renderMode: RenderMode.Server }, // Dynamic catalog
  { path: '/dashboard', renderMode: RenderMode.Client }, // User-specific
] satisfies ServerRoute[];
```

<!-- .element: class="big-code" -->

##==##

# Summary: what SSR changes and doesn't

- Doesn't change how you write components/signals/templates — the same code runs on server and client<br/><br/>
- Does require care around anything reaching for `window`/`document`/browser storage directly — push that into `afterNextRender`<br/><br/>
- Rendering mode is a **routing-level decision** (`RenderMode.Server`/`Client`/`Prerender`), not something sprinkled through component code<br/><br/>
- Hydration is what makes the server's HTML reusable instead of thrown away and re-rendered

<!-- .element: class="important" -->
