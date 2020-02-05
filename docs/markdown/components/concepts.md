<!-- .slide: class="sfeir-basic-slide" -->
# Les deux types de composants
<br><br>
- La <strong>Directive</strong> permet d'enrichir un élément HTML
<br><br>
- Le <strong>Component</strong> est une directive avec une vue et des styles CSS

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Angular: un arbre de composant
<br>
<div class="flex-row">
    <ul>
        <li>Les enfants sont ajoutés au parent s'ils apparaissent dans son template</li><br>
        <li>Un composant doit être obligatoirement déclaré dans un module</li><br>
    </ul>
    <img alt="h-600" src="assets/images/school/components/component_tree.png" />
</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# L'annotation @Component
<br>
Carte d'identité d'un composant<br>
<ul>
    <li>selector</li>
    <li>template et templateUrl</li>
    <li>providers</li>
    <li>viewEncapsulation</li>
</ul>
<br><br>
```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './home.component.html'
  ...
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Imbrication des composants
<br>
Lorsqu'un composant parent souhaite utiliser des composants enfants<br>
<ul>
    <li>les composants enfants doivent être tous référencés</li><br>
    <li>les composants enfants doivent être déclarés dans les "déclarations" du <strong>@NgModule()</strong></li>
</ul>
<br><br>
```typescript
import { HomeComponent } from './app/home';
import { FooDirective } from './app/shared/foo.directive';

@NgModule({
  declarations: [HomeComponent, FooDirective]  
})
```
<!-- .element: class="big-code" -->
