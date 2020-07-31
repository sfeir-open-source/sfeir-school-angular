<!-- .slide: class="transition-bg-grey-1 underline" -->
# Le composant

##==##

<!-- .slide -->
# Le composant
<br><br>
Le composant est composé de trois concepts de base.
<br><br>

![center h-600](assets/images/school/architecture/components.png)

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le component: sa logique
<br><br>
La logique du composant utilise la syntax de classe de ES2015
<br><br>

```typescript
export class AppComponent {
  name: string;
  constructor(){
    this.name = 'Angular';
   }
}
```
<!-- .element: class="big-code" -->
<br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le composant: son affichage
<br><br>
L'affichage du composant dans la page se fait à l'aide des annotations
<br><br>
```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
```
<!-- .element: class="big-code" -->
<br>

```html
<sfeir-app></sfeir-app>
```
<!-- .element: class="big-code" -->
<br>
Notes:
- Une annotation de type @Component se fait toujours au dessus d'une classe. Sans cette classe, le build et le linter affiche une erreur

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le composant: sa globalité
<br>
L'écriture d'un composant dans sa totalité est donc la suivante
<br><br>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  name: string;
  constructor(){
    this.name = 'Angular';
   }
}
```
<!-- .element: class="big-code" -->
