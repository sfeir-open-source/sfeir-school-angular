<!-- .slide: class="with-code inconsolata" -->
# Creating a Store: Deceptively Simple

**Important**: It is wise to create your store within an Angular service.

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
# It's simple, but how do I update it?

The **update** method is your friend.

<br>

```typescript
appStore.update((state) => ({ ...state, search: 'Nicolas'}))
```
<!-- .element: class="medium-code" -->

<br>

Ohhh, don't we have any helpers? :(

**setProps** to the rescue!

<br>

```typescript
import { setProps } from '@ngneat/elf';

appStore.update(setProps({ search: 'Nicolas' }))
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# How do I get the state at a given time?

A store is actually just a `BehaviorSubject`, which means a simple subscription guarantees an always up-to-date state.

<br>

```typescript
appStore.subscribe(state => {
  console.log(state);
})
```
<!-- .element: class="medium-code" -->

<br>

The **select** operator allows you to retrieve a part of your state only when it changes (i.e., reference change).

<br>

```typescript
import { select } from '@ngneat/elf';

const search$ = appStore.pipe(select(state => state.search));
```
<!-- .element: class="medium-code" -->
