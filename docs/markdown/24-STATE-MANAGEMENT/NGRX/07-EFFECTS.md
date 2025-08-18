<!-- .slide: class="with-code inconsolata" -->

# NGRX: Effects (Installation)

Effects are in a separate package, so you need to install them if you want to use them.
<br/><br/>

```sh
npm install @ngrx/effects --save
# or use the Angular CLI
ng add @ngrx/effects
```

<!-- .element: class="small-code" -->

<br/><br/>

```typescript
// For standalone applications

bootstrapApplication(AppComponent, {
  providers: [provideEffects(MovieEffects)],
});

// For module-based applications
@NgModule({
  imports: [EffectsModule.forRoot([MovieEffects])],
})
export class AppModule {}
```

<!--.element: class="small-code" -->

##==##

# NGRX: Writing an Effect

- An effect listens for an action, performs a task (like an API call), and dispatches a new action. <br/><br/>
- Effects are created in standard Angular services. <br/><br/>
- Use the `createEffect` function to define an effect.

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to write an Effect

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MoviesService } from './movies.service';
import { movieLoadSuccess } from './movie.actions';

@Injectable()
export class MovieEffects {
  private readonly actions$ = inject(Actions);
  private readonly moviesService = inject(MoviesService);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Movies Page] Load Movies'),
      mergeMap(() =>
        this.moviesService.getAll().pipe(
          map(movies => movieLoadSuccess({ movies })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
```

<!-- .element: class="small-code" -->

Notes:

The `@Effect` decorator is deprecated. `createEffect` is the modern, recommended way to create effects as it provides better type safety and a more explicit API.
