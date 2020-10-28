<!-- .slide: class="transition-bg-grey-1 underline" -->

# NGXS

##==##

<!-- .slide: class="with-code inconsolata" -->

# Premier pas

**NGXS** est une librairie externe à Angular, il faut donc l'installer en dépendance de notre projet

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

Notes:

-   ZooState correspond au state de notre application

##==##

<!-- .slide: class="two-column-layout" -->

# Concepts clé de NGXS

##--##
<br><br>

-   Store <br><br>
-   Actions <br><br>
-   State <br><br>
-   Selects <br><br>
    ##--##
    <br><br>

![h-550](assets/images/school/state-management/ngxs/ngxs_concepts.png)
Notes:

-   store contient le state, les actions et les sélécteurs, on peut associer cela à un magasin
-   state: état de la vue
-   actions: ce sont des classes qui décrivent les évolutions de notre état
-   sélecteur: sélectionne le state dans son entiereté ou partiellement
