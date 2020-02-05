<!-- .slide: class="transition-white sfeir-bg-blue" -->
# Le composant

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le composant
<br><br>
Le composant est composé de trois concepts de base.
<br><br>
<img alt="center h-600" src="assets/images/school/architecture/components.png" />

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Le component: sa logique
<br><br>
La Logique du composant utilise la syntax de classe de ES2015
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

<!-- .slide: class="sfeir-basic-slide with-code" -->
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
Notes
- Une annotation de type @Component se fait toujours au dessus d'une classe. Sans cette classe, le build et le linter affiche une erreur

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
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
