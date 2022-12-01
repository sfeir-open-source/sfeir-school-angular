<!-- .slide: class="transition-bg-sfeir-2" -->
# NGRX

##==##

<!-- .slide: class="with-code inconsolata" -->
# NGRX : Installation
De même que la librairie NGXS, NGRX est une librairie externe à Angular.
<br/><br/>

__Installation__:
```sh
npm install --save-dev ngrx
```
<!-- .element: class="big-code" -->

<br/><br/>

__Import__:
```typescript
@NgModule({
  import: [ storeModule.forRoot({people: reducer}) ]
})
export class AppModule() { }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# NGRX : Concepts
4 concepts clés: <br/><br/>
- __actions__ : décrivent des évènements uniques qui sont distribués à partir du composant ou du service
- __state changes__ : gérés par de simples fonctions nommées `reducers`
- __selectors__ : simple fonction permettant d'avoir tout ou une partie du state
- __state__ : accessible avec le store (Observables d'action et d'état)

##==##

<!-- .slide -->
# NGRX : Architecture Global

![full-center h-800](assets/images/school/state-management/ngrx/state_management_lifecycle.png)

