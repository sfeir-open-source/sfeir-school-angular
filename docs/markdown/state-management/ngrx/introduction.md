<!-- .slide: class="transition-bg-grey-1 underline" -->
# NGRX

##==##

<!-- .slide: class="with-code inconsolata" -->
# NGRX: Installation
<br>
De même que la librairies NGXS, NGRX est une librairie externe à Angular.
<br><br>

__Installation__:
```sh
npm install --save-dev ngrx
```
<!-- .element: class="big-code" -->
<br><br>

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
# NGRX: Concepts
<br><br>
4 concepts clés: <br><br>
- __actions__: dévrivent des évènements uniques qui sont distribués à partir du composant ou du service
- __state__ géré par de simple fonction nommées reducers
- __selectors__: simple fonction permettant d'avoir tout ou une partie du state
- __state__: accessible avec le store (observables d'action et d'état)

##==##

<!-- .slide -->
# NGRX: Architecture Global
<br>

![full-center h-800](assets/images/school/state-management/ngrx/state_management_lifecycle.png)

