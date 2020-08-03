<!-- .slide class="inconsolata with-code" -->
# La directive ng-template
<br>

- Permet de définir un template
<br><br>

```html
<div *ngIf="lessons.length > 0">
    ...
</div>
<ng-template>
    <div>Loading ...</div>
</ng-template>
```
<!-- .element: class="big-code" -->
<br>

- Loading ici ne s'affichera jamais
<br><br>

- On vient de définir le template mais on ne l'utilise pas
Notes:
- ng-template revient à déclarer une simple variable, dans ce cas si la variable est un template

##==##

<!-- .slide: class="inconsolata with-code" -->
# Utilisation de la directive ng-template
<br>

- S'utilise principalement avec les directives structurelles (*ngIf, *ngFor, ...)
<br><br>

```html
<div *ngIf="lessons.length > 0; else loadingTemplate">
    ...
</div>
<ng-template #loadingTemplate>
    <div>Loading ...</div>
</ng-template>
```
<!-- .element: class="big-code" -->


##==##

<!-- .slide: class="with-code inconsolata" -->
# Utilisation de la directive ng-template
<br>

- En fait, les directives structurelles (*ngIf, *ngFor, ...) sont elle-même des 'ng-template' !
<br><br>
Par exemple :

```html
<div *ngIf="condition">
    ...
</div>
```
<!-- .element: class="big-code" -->
est un raccourci pour :

```html
<ng-template [ngIf]="condition">
    <div>...</div>
</ng-template>
```
<!-- .element: class="big-code" -->
