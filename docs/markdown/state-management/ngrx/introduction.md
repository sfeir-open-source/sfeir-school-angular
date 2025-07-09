<!-- .slide: class="transition-bg-sfeir-2" -->
# NGRX

##==##

<!-- .slide: class="with-code inconsolata" -->
# NGRX: Installation
Like NGXS, NGRX is an external library for Angular.
<br/><br/>

__Installation__:
```sh
npm install @ngrx/store --save
```
<!-- .element: class="big-code" -->

<br/><br/>

__Import__:
```typescript
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

@NgModule({
  imports: [ StoreModule.forRoot(reducers) ]
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# NGRX: Concepts
4 key concepts: <br/><br/>
- __Actions__: Describe unique events that are dispatched from components or services.
- __Reducers__: Handle state changes by taking the current state and the latest action to produce a new state.
- __Selectors__: Pure functions used to select, derive, and compose pieces of state.
- __Store__: A global, observable state container, accessible to all components.

##==##

<!-- .slide -->
# NGRX: Global Architecture

![full-center h-800](assets/images/school/state-management/ngrx/state_management_lifecycle.png)
