<!-- .slide: class="with-code inconsolata" -->
# NGRX: Actions

- The only way to modify the state.
- Actions have types (a unique way to identify them).
- Triggered by a `dispatch` call.<br/><br/>

```typescript
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
```
<!-- .element: class="big-code" -->
Notes:
- Remember to use a namespace (e.g., `[Counter Component]`) to group actions that operate on the same entity.
