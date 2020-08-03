<!-- .slide: class="with-code inconsolata" -->
# NGRX : Effects (Installation)
<br>
Les effects sont dans un package différent , il faut donc les installer également (si on souhaite les utiliser)
<br><br>

```sh
npm install --save @ngrx/effects // ng add @ngrx/effects
```
<!-- .element: class="big-code" -->
<br><br>

```typescript
@NgModule({
  imports: [
    EffectsModule.forRoot([MovieEffects])
  ],
})
```
<!--.element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# NGRX : Ecrire un effet

- Créer une action (mais ne pas l'enregistrer dans le reducer)
- Créer un service classique Angular
- Utiliser la méthode createEffect ou l'annotation __@Effect__
<br>

```typescript
@Injectable()
export class MovieEffects {
  constructor(private readonly actions$: Actions, private readonly moviesService: MoviesService) {}
 
  // avec la méthode createEffect 
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    mergeMap(() => this.moviesService.getAll()
      .pipe(
        map(movies => movieLoadSucces({ movies })),
        catchError(() => EMPTY)
      ))
    )
  );

  // avec l'annotation
  @Effect
  loadMovies = this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    mergeMap(() => this.moviesService.getAll()
      .pipe(
        map(movies => movieLoadSuccess({ movies })),
        catchError(() => EMPTY)
      ))
    )
}
```
<!-- .element: class="medium-code" -->
Notes:
- en utilisant l'annotation les erreurs dans l'ide (au niveau du checking type) est bien plus claire
