<!-- .slide-->
# Principe de la DI en Angular

-   Les <b>3 principales notions</b> <br><br>
    -   L'Injector <br><br>
    -   Le DI Token (DI: Dependency Injection) <br><br>
    -   Le Provider <br><br>
    

##==##
<!-- .slide-->
# Principe de la DI en Angular


![center h-600](assets/images/school/dependancy-injection/di_working.png)


##==##

<!-- .slide-->

# L'Injector

-   Responsabilité :<br><br> 
    -   <b>Créer les instances</b> de dépendances. (avec l'aide des <b>Providers</b>)<br><br>
    -   Garder les instances de dépendances dans son <b>"cache"</b> <br><br>
    -   <b>Mettre à disposition</b> les dépendances aux classes qui les demandent.

##==##

<!-- .slide-->

# L'Injector

-   Vous n'avez pas à créer d'injector par vous même<br><br>
-   Il existe <b>2 hiérarchies d'injector</b> dans votre application:<br><br>
    -  les <b>ModuleInjector</b>: créés implicitement pour chaque module + 1 injector appelé "root"<br><br>
    -  les <b>ElementInjector</b>: créés implicitement pour chaque élément du DOM (composant)<br><br>
- Chaque Injector contient (ou non) un singleton d'une dépendance, et peut injecter cette instance dans plusieurs composants ou services. 

##==##

<!-- .slide-->

# Le DI Token

-   Responsabilité :<br><br>
    -   Permet <b>d’identifier</b> une dépendance. (KEY)<br><br>
    -   Lors d’une demande d’injection de dépendance, l’injector va chercher à l’aide du token si une dépendance est disponible et s'il peut la créer. (<KEY/VALUE>)

##==##

# Le Provider

-   Responsabilité :<br><br>
    -   Permet de définir <b>comment</b> obtenir une dépendance associée à un DI Token.<br><br>
    -   un provider est défini pour <b>un</b> injector et il sera utilisé par ce dernier pour créer les dépendances.

##==##

<!-- .slide -->

# Comment paramétrer ces 3 notions

- Injector & Provider:<br><br>
  - propriété <b>providedIn</b> de l'annotation <b>@Injectable</b><br><br>
  - propriété <b>providers: []</b> des annotations <b>@NgModule, @Component, @Directive, @Pipe</b><br><br>
- Token:<br><br>
  - implicite (la plupart du temps)<br><br>
  - ou via l'annotation <b>@Inject</b><br><br>
##==##

<!-- slide: class="two-column-layout"-->
## Types d'Injector: ModuleInjector


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
<!-- .slide: class="two-column-layout"-->
# Hierarchy Injection

##--##

<br>

![center h-500](assets/images/school/dependancy-injection/DI-module.png)

##--##
<!-- .slide: class="with-code inconsolata" -->

<br>

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
<!-- .slide: class="two-column-layout"-->
# Hierarchy Injection

##--##

<br>

![center h-450](assets/images/school/dependancy-injection/DI-parent.png)

##--##
<!-- .slide: class="with-code inconsolata" -->

<br>

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
<!-- .slide: class="two-column-layout"-->
# Hierarchy Injection

##--##

<br>

![center h-500](assets/images/school/dependancy-injection/DI-root.png)

##--##
<!-- .slide: class="with-code inconsolata" -->

<br>

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

# Zoom sur provider = []

-   Fait le lien entre <b>InjectionToken</b> (token) et une <b>Factory</b><br><br>
-   Permet de découpler la dépendance et son implémentation<br><br>
-   API pour lier une simple valeur
    -   Faire des alias de token
    -   Créer des factory synchrones ou pas (toFactory, toAsyncFactory)

##==##

<!-- .slide: class="with-code inconsolata" -->

# Zoom sur provider = []

- Cette expression est un raccourci :

```typescript
providers: [MyService]
```

<!-- .element: class="big-code" -->

- elle revient à écrire :

```typescript
providers: [ { provide: MyService, useClass: MyService }]
```

<!-- .element: class="big-code" -->

##==##



<!-- .slide -->

# Les différents type de résolution

<br><br>
<!-- .element: class="big-code" -->

-   Valeur<br><br>
-   Classe alternative<br><br>
-   Classes aliasée<br><br>
-   Factory
