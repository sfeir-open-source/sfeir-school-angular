<!-- .slide: class="with-code inconsolata" -->
# NGRX : Actions

- Seul moyen de modifier l'état
- Types (moyen unique de les identifier)
- Déclanchée par un dispatch<br><br>

```typescript
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
```
<!-- .element: class="big-code" -->
Notes:
- penser au namespace pour regrouper des actions agissant sur une meme entité ;)
