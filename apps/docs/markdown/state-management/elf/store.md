<!-- .slide: class="with-code inconsolata" -->
# Créer un store: Une simplicité déconcertante

**Important** Il est judicieux de créer son store dans un service Angular

<br>

```typescript
import { createStore, withProps } from '@ngneat/elf';

interface AppProps {
  search: string;
}

const appStore = createStore(
  { name: 'APP_STORE' },
  withProps<AppProps>({ search: ''})
);
```
<!-- .element: class="big-code" -->

##==##

<!--.slide: class="with-code inconsolata" -->
# C'est vrai que c'est simple mais je fais comment pour update ?

La méthode **update** est ton ami

<br>

```typescript
appStore.update((state) => ({ ...state, search: 'Nicolas'}))
```
<!-- .element: class="medium-code" -->

<br>

Ohhhh on a pas de helper ?? :(

**setProps** à la rescousse

<br>

```typescript
appStore.update(setProps('search', 'Nicolas'))
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Et si je veux récupérer mon state à un instant T ?

Un store est en réalité un simple BehaviorSubject, ce qui signifie qu'une simple subscription à notre store nous garantie un state toujours à jour

<br>

```typescript
appStore.subscribe(state => {
  console.log(state);
})
```
<!-- .element: class="medium-code" -->

<br>

L'opérateur **select**, vous permet de récupérer une partie de votre state si celui-ci change (ie: changement de référence)

<br>

```typescript
const search$ = appStore.pipe(select(state => state.search))
```
<!-- .element: class="medium-code" -->
