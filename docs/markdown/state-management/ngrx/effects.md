<!-- .slide: class="with-code inconsolata" -->
# NGRX: Effects (Installation)
Effects are in a separate package, so you need to install them if you want to use them.
<br/><br/>

```sh
npm install @ngrx/effects --save
# or use the Angular CLI
ng add @ngrx/effects
```
<!-- .element: class="big-code" -->

<br/><br/>

```typescript
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './movie.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([MovieEffects])
  ],
})
export class AppModule {}
```
<!--.element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# NGRX: Writing an Effect

- An effect listens for an action, performs a task (like an API call), and dispatches a new action.
- Effects are created in standard Angular services.
- Use the `createEffect` function to define an effect.

<br/>

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MoviesService } from './movies.service';
import { movieLoadSuccess } from './movie.actions';

@Injectable()
export class MovieEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    mergeMap(() => this.moviesService.getAll()
      .pipe(
        map(movies => movieLoadSuccess({ movies })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly moviesService: MoviesService
  ) {}
}
```
<!-- .element: class="medium-code" -->
**Note:** The `@Effect` decorator is deprecated. `createEffect` is the modern, recommended way to create effects as it provides better type safety and a more explicit API.
