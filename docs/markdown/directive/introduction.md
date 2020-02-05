<!-- .slide: class="sfeir-basic-slide with-code" -->
# La directive *ngFor (rappel)
<ul>
    <li>Itère dans une collection et génère un template par élément</li><br>
    <li><strong>index, odd, event, last</strong> à utiliser en alias dans des variables</li>
</ul>
<br><br>
```typescript
<ul>
   <li *ngFor="let fruit of fruits; let i=index">
       {{ i }} : {{ fruit.name }}
   </li>
</ul>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La directive *ngIf
<br><br>
- Change la structure du DOM de manière conditionnel (apparaît ou non dans le DOM)
<br><br>
```html
<div *ngIf="errorCount > 0" class="errpr">
  {{ errorCount }} errors detected
</div>
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="sfeir-basic-slide with-code" -->
# La directive *ngSwitch
<br><br>
- Change la structure du DOM de manière conditionnel (à la manière d'un switch case)
<br><br>
```html
<div [ngSwitch]="display">
  <p *ngSwitchCase="list">...</p>
  <p *ngSwitchCase="whenExpression1">...</p>
  <p *ngSwitchDefault>...</p>
</div>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Mais c'est quoi ces étoiles
<br>
- elle matérialise les directives structurelles (comme NgIF NgFor et NgSwith)
- sucre syntaxique
- indique que l'on utilise la balise <ng-template></ng-template>
- Attention à ne pas oublier les [] si vous utilisez les templates
<br><br>
```html
<div *ngIf="errorCount > 0">toto</div>
<!-- same as -->
<ng-template [ngIf]="errorCount > 0">
    <div>toto</div>
</ng-template>
```
<!-- .element: class="big-code" -->
Notes
- Live démonstration de la création d'une directives structurel cas simple: afficher ou cacher un mot de passe au click sur un bouton

 
