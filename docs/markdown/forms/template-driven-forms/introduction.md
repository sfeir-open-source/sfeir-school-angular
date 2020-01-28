<!-- .slide: class="transition-white sfeir-bg-pink" -->
# Template Driven Form

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La Fondation du Template driven Form
<br>
Pour réaliser des formulaires avec le template driven forms, il est nécessaire d'importer le module <strong>FormsModule</strong> provenant du package <strong>@angular/forms</strong>
<br><br>
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [ ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La syntax dans le template driven forms
<br><br>
<ul>
    <li><strong>#authentificationForm="ngForm"</strong>: On déclare une référence sur un formulaire</li><br>
    <li><strong>authentificationForm.value</strong> permet de récupérer en format JSON object, toutes les valeurs des champs du formulaire</li>
</ul>
<br><br>
```html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
</form>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Le binding dans le template driven form
Deux composantes obligatoires:
<ul>
    <li><strong>ngModel</strong>: le binding d'un contrôle</li>
    <li><strong>name</strong>: associer un nom au contrôle du champs</li>
</ul>
<br><br>
- <strong>Exemple 1</strong>: binding View -> Model
```html
<input type="text" name="title" ngModel />
```
<br>
- <strong>Exemple 2</strong>: binding Model -> View
```html
<input type="text" name="title" [ngModel]="person.name" />
```
<br>
- <strong>Exemple 2</strong>: binding bidirectionnel
```html
<input [(ngModel)]="postalCode" name="postalCode" type="text" />
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Regrouper des champs dans un sous object
<br><br>
<strong>ngModelGroup</strong> regroupe des contrôles dans un sous object
<br><br>
```html
<p ngModelGroup="address">
  <input ngModel name="city" />
</p>
<p ngModelGroup="address">
  <input ngModel name="postalCode" />
</p>
```
<!-- .element: class="big-code" -->
