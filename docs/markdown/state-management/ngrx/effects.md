<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: Effects (Installation)
<br>
Les effects sont dans un package différent , il faut donc les installer égalements (si on souhaite les utiliser)
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

<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: Ecrire un effet
<ul>
    <li>Créer une action (mais ne pas l'enregistrer dans le reducers)</li>
    <li>Créer un service classique Angular</li>
    <li>Utiliser la méthode createEffect ou l'annotation __@Effect__</li>
</ul>
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
        map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
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
        map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
        catchError(() => EMPTY)
      ))
    )
}
```
<!-- .element: class="big-code" -->
Notes:
- en utilisant l'annotation les erreurs dans l'ide (au niveau du checking type) est bien plus claire
