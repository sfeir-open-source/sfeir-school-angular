<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: Actions
<br>
<ul>
    <li>Seul moyen de modifier l'état</li><br>
    <li>Types (moyen unique de les identifier)</li><br>
    <li>déclanchée par un dispatch</li><br>
</ul>
```typescript
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
```
<!-- .element: class="big-code" -->
Notes:
- penser au namespace pour regrouper des actions agissant sur une meme entité ;)
