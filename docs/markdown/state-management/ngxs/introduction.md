<!-- .slide: class="sfeir-bg-white-5" -->
# NGXS

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Premier pas
<br>
__NGXS__ est une librairie externe à Angular, il faut donc l'installer en dépendance de notre projet
<br><br>
```sh
npm install --save @ngxs/store // ng add @ngxs/store
```
<!-- .element: class="big-code" -->
<br>
Et l'importer dans notre projet
<br>
```typescript
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ZooState } from './store';

@NgModule({
  imports: [NgxsModule.forRoot([ZooState])]
})
export class AppModule {}
```
<!-- .element: class="big-code" -->
Notes
- ZooState correspond au state de notre application

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Concepts clé de NGXS
<br><br>
<div class="flex-row">
    <ul>
        <li>Store</li>
        <li>Actions</li>
        <li>State</li>
        <li>Selects</li>
    </ul>
    <img alt="h-550" src="assets/images/school/state-management/ngxs/ngxs_concepts.png">
</div>
Notes
- store contient le state, les actions et les sélécteurs, on peut associer cela à un magasin
- state: état de la vue
- actions: ce sont des classes qui décrivent les évolutions de notre état
- sélecteur: sélectionne le state dans son entiereté ou partiellement

