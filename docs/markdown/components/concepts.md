<!-- .slide -->
# Angular: un arbre de composant

![h-600 center](assets/images/school/components/component_tree.png)

##==##
<!-- .slide: class="with-code inconsolata" -->
# Le décorateur @Component
Carte d'identité d'un composant<br/>

- selector
- template et templateUrl
- styles et styleUrls
- ...<br/><br/>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css'],
  ...
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Imbrication des composants
Lorsqu'un composant parent souhaite utiliser des composants enfants<br/>

- les composants enfants doivent tous être référencés en utilisant leurs selectors
- les composants enfants doivent être déclarés dans les "déclarations" du <b>@NgModule()</b><br/><br/>

```html
<!-- app.component.html -->
<sfeir-home></sfeir-home>
```
<!-- .element: class="big-code" -->

```typescript
// app.module.ts
import { HomeComponent } from './app/home';
import { FooDirective } from './app/shared/foo.directive';

@NgModule({
  declarations: [HomeComponent, FooDirective]  
})
export class AppModule { }
```
<!-- .element: class="big-code" -->
