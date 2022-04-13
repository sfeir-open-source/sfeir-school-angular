<!-- .slide: class="transition-bg-grey-1 underline" -->

# Template Driven Form

##==##

<!-- .slide: class="with-code inconsolata" -->

# La Fondation du Template driven Form

Pour réaliser des formulaires avec le template driven forms, il est nécessaire d'importer le module <b>FormsModule</b> provenant du package <b>@angular/forms</b><br><br>

```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [],
    providers: [],
    bootstrap: []
})
export class AppModule {}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# La syntaxe dans le template driven forms

-   <b>#authenticationForm="ngForm"</b>: On déclare une référence sur un formulaire prenant comme valeur la directive ngForm<br><br>
-   <b>authentication.value</b> permet de récupérer en format JSON objet, toutes les valeurs des champs du formulaire <br><br>

```html
<form #authenticationForm="ngForm" (ngSubmit)="onSubmit(f.value)"></form>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Le binding dans le template driven form

- Deux composantes obligatoires:
  - **ngModel**: le binding d'un contrôle
  - **name**: associer un nom au contrôle du champ

<br><br>

- **Exemple 1**: binding View -> Model

```html
<input type="text" name="title" ngModel />
```

<!-- .element: class="big-code" -->
- **Exemple 2**: binding Model -> View

```html
<input type="text" name="title" [ngModel]="person.name" />
```

<!-- .element: class="big-code" -->
- **Exemple 3**: binding bidirectionnel

```html
<input [(ngModel)]="postalCode" name="postalCode" type="text" />
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Regrouper des champs dans un sous objet

<b>ngModelGroup</b> regroupe des contrôles dans un sous objet<br><br>

```html
<div ngModelGroup="address">
    <p><input ngModel name="city" /></p>
    <p><input ngModel name="postalCode" /></p>
</div>

```

<!-- .element: class="big-code" -->
