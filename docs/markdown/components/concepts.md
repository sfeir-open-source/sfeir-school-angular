<!-- .slide" -->
# Les deux types de composants

- La <b>Directive</b> permet d'enrichir un élément HTML<br><br>
- Le <b>Component</b> est une directive avec une vue et des styles CSS

##==##
<!-- .slide: class="two-column-layout" -->
# Angular: un arbre de composant

##--##
<br><br>
- Les enfants sont ajoutés au parent s'ils apparaissent dans son template<br><br>
- Un composant doit être obligatoirement déclaré dans un module

##--##
<br><br>

![h-400](assets/images/school/components/component_tree.png)

##==##
<!-- .slide: class="with-code inconsolata" -->
# L'annotation @Component
Carte d'identité d'un composant<br>

- selector
- template et templateUrl
- providers
- viewEncapsulation
- ChangeDetection <br><br>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './home.component.html'
  ...
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Imbrication des composants
Lorsqu'un composant parent souhaite utiliser des composants enfants<br>

- les composants enfants doivent tous être référencés
- les composants enfants doivent être déclarés dans les "déclarations" du <b>@NgModule()</b><br><br>

```typescript
import { HomeComponent } from './app/home';
import { FooDirective } from './app/shared/foo.directive';

@NgModule({
  declarations: [HomeComponent, FooDirective]  
})
export class AppModule { }
```
<!-- .element: class="big-code" -->
