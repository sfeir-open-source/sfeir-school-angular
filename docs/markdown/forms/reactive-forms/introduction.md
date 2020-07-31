<!-- .slide: class="transition-bg-grey-1 underline" -->
# Reactive forms

##==##

<!-- .slide: class="with-code inconsolata" -->
# La Fondation du Reactive forms
<br>
Pour réaliser des formulaires avec Reactive Forms, il est nécessaire d'importer le module <b>ReactiveFormsModule</b> provenant également du package <b>@angular/forms</b>
<br><br>

```typescript
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [ ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column-layout" -->
# Syntaxe Global dans les formulaires Reactive forms
##--##
<!-- .slide: class="with-code inconsolata" -->
<br><br>
```html
<form [formGroup]="editForm">
   <input type="text" formControlName="firstname">
   <div [hidden]="!editForm.controls.firstname.valid">
      Firstname est d'un format invalid
   </div> 
   <button type="submit" [disabled]="!editForm.valid">
     Modifier
   </button>
</form>
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->
<br><br>

```typescript
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({...})
export class FormComponent {
  editForm: FormGroup;
   constructor() {
    this.editForm = new FormGroup({
        firstname: new FormControl('', 
          [Validators.required, Validators.minLength(2)]
        )
    });
   }
}
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# La Syntaxe dans le template
<br><br>

- Référence au modèle du formulaire via <b>formGroup</b>
- Mapping de controls via <b>formControlName</b><br><br>

```html
<form [formGroup]="editForm">
   <input type="text" formControlName="firstname">
   <div [hidden]="!editForm.controls.firstname.valid">Firstname est d'un format invalid</div> 
   <button type="submit" [disabled]="!editForm.valid">Modifier</button>
</form>
```
<!-- .element: class="big-code" -->
Notes:
- formGroup déclare comme pour le template driven form une référence sur le modèle editForm
- formControlName: effectue le binding d'un contrôle présent dans le modèle

##==##

<!-- .slide: class="with-code inconsolata" -->
# Regrouper les champs dans le template
<br><br>

- Regrouper les champs dans un sous objet grâce à <b>FormGroupName</b> <br><br>

```html
<form [formGroup]="editForm" (ngSumit)="submitEditForm(editForm.value)">
    <div [formGroupName]="address">
        <input formControlName="zipCode" type="text" />
        <input formControlName="country" type="text" />
    </div>
</form>
```
<!-- .element: class="big-code" -->
Notes:
- ngSubmit permet de soumettre le formulaire lors de la touche entrer
- editForm.valu renvoie un object de ce format: { address: { zipCode: 57000, country: FRANCE } }

##==##

<!-- .slide: class="with-code inconsolata" -->
# La syntaxe dans la classe
<br><br>

```typescript
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({...})
export class FormComponent {
  editForm: FormGroup;
   constructor() {
    this.editForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
   }
}
```
<!-- .element: class="big-code" -->
Notes:
- firstname est de type AbstracteControl, si l'on souhaite update sa valeur lors d'un certain évènement comme le click d'un bouton, il existe la méthode patchValue
- coup de pouce: Réaliser des getters qui renvoie l'AbstractControl. Ca allégerera votre template => this.editForm.get('firstname')
