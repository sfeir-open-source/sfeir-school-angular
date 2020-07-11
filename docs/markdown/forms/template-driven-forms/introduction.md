<!-- .slide: class="transition-bg-grey-1 underline" -->
# Template Driven Form

##==##

<!-- .slide: class="with-code inconsolata" -->
# La Fondation du Template driven Form
<br>
Pour réaliser des formulaires avec le template driven forms, il est nécessaire d'importer le module <b>FormsModule</b> provenant du package <b>@angular/forms</b><br><br>

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
<!-- .slide: class="with-code inconsolata" -->
# La syntaxe dans le template driven forms
<br><br>

- <b>#authentificationForm="ngForm"</b>: On déclare une référence sur un formulaire prenant comme valeur la directive ngForm<br><br>
- <b>authentification.value</b> permnet de récupérer en format JSON objet, toutes les valeurs des champs du formulaire <br><br>

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
</form>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le binding dans le template driven form
<br>

- Deux composantes obligatoires:
    - <b>ngModel</b>: le binding d'un contrôle
    - <b>name</b>: associer unn nom au contrôle du champs
<br><br>

- <b>Exemple 1</b>: binding View -> Model</li>
```html
<input type="text" name="title" ngModel />
```
<!-- .element: class="big-code" -->
- <b>Exemple 2</b>: binding Model -> View</li>
```html
<input type="text" name="title" [ngModel]="person.name" />
```
<!-- .element: class="big-code" -->
- <b>Exemple 3</b>: binding bidirectionnel</li>
```html
<input [(ngModel)]="postalCode" name="postalCode" type="text" />
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Regrouper des champs dans un sous objet
<br><br>

<b>ngModelGroup</b> regroupe des contrôles dans un sous objet<br><br>

```html
<p ngModelGroup="address">
  <input ngModel name="city" />
</p>
<p ngModelGroup="address">
  <input ngModel name="postalCode" />
</p>
```
<!-- .element: class="big-code" -->
