<!-- .slide: class="tc-multiple-columns" -->

##++##

# NGRX: Reducers

- Reducers are pure functions that handle state transitions. <br/><br/>
- They contain the logic for how the state changes in response to actions. <br/><br/>
- They are the only place where the state is modified. <br/><br/>
- A state mutation is always synchronous.

##++##

##++## class="with-code inconsolata"

<br/><br/><br/>

```typescript
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, state => 0),
);
```

<!-- .element: class="big-code" -->

##++##
