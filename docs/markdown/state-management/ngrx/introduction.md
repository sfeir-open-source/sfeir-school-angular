<!-- .slide: class="sfeir-bg-white-5" -->
# NGRX

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: Installation
<br>
De même que la librairies NGXS, NGRX est une librairie externe à Angular.
<br><br>
__Installation__:
```sh
npm run install --save-dev ngrx
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

<!-- .slide: class="sfeir-basic-slide" -->
# NGRX: Concepts
<br><br>
4 concepts clés: <br><br>
- __actions__: dévrivent des évènements uniques qui sont distribués à partir du composant ou du service
- __state__ géré par de simple fonction nommées reducers
- __selectors__: simple fonction permettant d'avoir tout ou une partie du state
- __state__: accessible avec le store (observables d'action et d'état)

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# NGRX: Architecture Global
<br>
<img alt="full-center h-800" src="assets/images/school/state-management/ngrx/state_management_lifecycle.png" />

