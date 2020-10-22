<!-- .slide: class="with-code inconsolata" -->
# La directive *ngFor (rappel)

- Itère dans une collection et génère un template par élément <br><br>
- <b>index, odd, event, last</b> à utiliser en alias dans des variables <br><br>

```html
<ul>
   <li *ngFor="let fruit of fruits; let i=index">
       {{ i }} : {{ fruit.name }}
   </li>
</ul>
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# La directive *ngIf

- Change la structure du DOM de manière conditionnel (apparaît ou non dans le DOM)<br><br>

```html
<div *ngIf="errorCount > 0" class="error">
  {{ errorCount }} errors detected
</div>
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# La directive *ngSwitch

- Change la structure du DOM de manière conditionnel (à la manière d'un switch case)<br><br>

```html
<div [ngSwitch]="display">
  <p *ngSwitchCase="list">...</p>
  <p *ngSwitchCase="whenExpression1">...</p>
  <p *ngSwitchDefault>...</p>
</div>
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Mais c'est quoi ces étoiles

- Elle matérialise les directives structurelles (comme NgIF NgFor et NgSwith)
- Sucre syntaxique
- Indique que l'on utilise la balise 'ng-tempate'
- Attention à ne pas oublier les [] si vous utilisez les templates<br><br>

```html
<div *ngIf="errorCount > 0">toto</div>
<!-- same as -->
<ng-template [ngIf]="errorCount > 0">
    <div>toto</div>
</ng-template>
```
<!-- .element: class="big-code" -->
Notes:
- Live démonstration de la création d'une directive structurelle cas simple: afficher ou cacher un mot de passe au click sur un bouton

 
