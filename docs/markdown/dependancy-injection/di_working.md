<!-- .slide-->
# Principe de la DI en Angular

-   <b>L'Injector</> expose l'API pour céer des instances de dépendances
-   Le <b>Provider</b> indique à <b>l'Injector</b> comment créer la dépendance
-   La dépendance constitue l'objet à créer
    ![center h-600](assets/images/school/dependancy-injection/di_working.png)

##==##

<!-- .slide-->

# Types d'Injector

-   Il existe 2 hierarchies d'injector dans Angular :<br><br>
    -   <b>ModuleInjector</b>: confguré dans la configuration du @NgModule ou de l'annotation @Injectable (utliser si possible @Injectable pour profiter du Tree Shaking)<br><br>
    -   <b>ElementInjector</b>: créé implicitement pour chaque élément du DOM (composant)

##==##

<!-- .slide: class="two-column-layout"-->

# Types d'Injector: ModuleInjector

##--##

<!-- .slide: class="with-code inconsolata" -->

```typescript
@NgModule({
  imports: [
    ...
  ],
  declarations: [PeopleAppComponent],
  providers: [ItemService],
  bootstrap: [PeopleAppComponent]
})
export class ItemModule {}
```

<!-- .element: class="medium-code"-->

```typescript
import { Injectable } from '@angular/core';
@Injectable()
export class ItemService {
    name = 'telephone';
}
```

<!-- .element: class="medium-code"-->

##--##

<!-- .slide: class="with-code inconsolata" -->

```typescript
@NgModule({
  imports: [
    ...
  ],
  declarations: [PeopleAppComponent],
  bootstrap: [PeopleAppComponent]
})
export class ItemModule {}
```

<!-- .element: class="medium-code"-->

```typescript
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: ItemModule // <--provides this service in the ItemModule ModuleInjector
})
export class ItemService {
    name = 'telephone';
}
```

<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Types d'Injector: ModuleInjector

<br><br>

-   Il existe pour chaque application un ModuleInjector appelé <b>'root'</b> au sommet de la hierarchie
    <br><br>

```typescript
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root' // <--provides this service in the root ModuleInjector
})
export class ItemService {
    name = 'telephone';
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Hierarchy Injection

![center h-500](assets/images/school/dependancy-injection/DI-module.png)

```typescript
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: ItemModule // <--provides this service in the ItemModule ModuleInjector
})
export class ItemService {
    name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Hierarchy Injection

![center h-450](assets/images/school/dependancy-injection/DI-parent.png)

```typescript
@Component({
  selector: 'parent',
  templateUrl: 'parent.component.html',
  styleUrls: ['parent.component.css']
  providers: [SimpleService]
})
export class ParentComponent { ... }
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Hierarchy Injection

![center h-500](assets/images/school/dependancy-injection/DI-root.png)

```typescript
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root' // <--provides this service in the root ModuleInjector
})
export class ItemService {
    name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide -->

# Le rôle du Provider

-   Fait le lien entre <b>InjectionToken</b> (token) et une <b>Factory</b><br><br>
-   Permet de découpler la dépendance et son implémentation<br><br>
-   API pour lier une simple valeur
    -   Faire des alias de token
    -   Créer des factory synchrones ou pas (toFactory, toAsyncFactory)

##==##

<!-- .slide -->

# Les différents type de résolution

<br><br>

-   Valeur<br><br>
-   Classe alternative<br><br>
-   Classes aliasée<br><br>
-   Factory
