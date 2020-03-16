<!-- .slide: class="sfeir-basic-slide" -->
# Principe de la DI en Angular
<ul>
    <li><strong>L'Injector</strong> expose l'API pour créer des instances de dépendances</li>
    <li>Le <strong>Provider</strong> indique à <strong>l’Injector</strong> comment créer la dépendance</li>
    <li>La dépendance est le type d’objet à créer</li>
</ul>
<br><br>
<img alt="center h-600" src="assets/images/school/dependancy-injection/di_working.png" />

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Types d'Injector
<br>
- Il existe 2 hierarchies d'injector dans Angular :
<ul>
    <br>
    <li><strong>ModuleInjector</strong>: configuré dans la configuration du @NgModule ou de l'annotation @Injectable (utiliser si possible @Injectable pour profiter du Tree Shaking)</li>
    <br>
    <li><strong>ElementInjector</strong>: créé implicitement pour chaque élément du DOM (composants) </li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Types d'Injector: ModuleInjector
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
```typescript
import { Injectable } from '@angular/core';
@Injectable()
export class ItemService {
  name = 'telephone';
}
```
<strong>ou</strong>
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
```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: ItemModule  // <--provides this service in the ItemModule ModuleInjector
})
export class ItemService {
  name = 'telephone';
}
```

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Types d'Injector: ModuleInjector
<br>
- Il existe pour chaque application un ModuleInjector appelé <strong>'root'</strong> au sommet de la hierarchie
<br>

```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'  // <--provides this service in the root ModuleInjector
})
export class ItemService {
  name = 'telephone';
}
```

##==##
<!-- .slide: class="sfeir-basic-slide" -->
# Hierarchy Injection
<img alt="center h-600" src="assets/images/school/dependancy-injection/DI-module.png" />

```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: ItemModule  // <--provides this service in the ItemModule ModuleInjector
})
export class ItemService {
  name = 'telephone';
}
```

##==##
<!-- .slide: class="sfeir-basic-slide" -->
# Hierarchy Injection
<img alt="center h-600" src="assets/images/school/dependancy-injection/DI-parent.png" />
```typescript
@Component({
  selector: 'parent',
  templateUrl: 'parent.component.html',
  styleUrls: ['parent.component.css']
  providers: [SimpleService]
})
export class ParentComponent {
  ...
}
```

##==##
<!-- .slide: class="sfeir-basic-slide" -->
# Hierarchy Injection
<img alt="center h-600" src="assets/images/school/dependancy-injection/DI-root.png" />

```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'  // <--provides this service in the root ModuleInjector
})
export class ItemService {
  name = 'telephone';
}
```

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le rôle du Provider
<br><br>
- Fait le lien entre un <strong>InjectionToken</strong> (token) et une <strong>Factory</strong><br><br>
- Permet de découpler la dépendance et son implémentation<br><br>
- Api pour lier une simple valeur
<ul>
    <li>faire des alias de token</li>
    <li>créer des factory synchrones ou pas ( toFactory, toAsyncFactory)</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les différents type de résolution
<br><br>
- Valeur<br><br>
- Classe alternative<br><br>
- Classes aliasée<br><br>
- Factory

