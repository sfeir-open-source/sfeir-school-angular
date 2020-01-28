<!-- .slide: class="transition-white sfeir-bg-pink" -->
# Reactive forms

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La Fondation du Reactive forms
<br>
Pour réaliser des formulaires avec Reactive Forms, il est nécessaire d'importer le module <strong>ReactiveFormsModule</strong> provenant également du package <strong>@angular/forms</strong>
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

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Syntax Global dans les formulaires Reactive forms
<br>
```html
<form [formGroup]="editForm">
   <input type="text" formControlName="firstname">
   <div [hidden]="!editForm.controls.firstname.valid">Firstname est d'un format invalid</div> 
   <button type="submit" [disabled]="!editForm.valid">Modifier</button>
</form>
```
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

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La Syntax dans le template
<br>
<ul>
    <li>Référence au modèle de formulaire via <strong>formGroup</strong></li>
    <li>Mapping de controls via <strong>formControlName</strong></li>
</ul>
<br><br>
```html
<form [formGroup]="editForm">
   <input type="text" formControlName="firstname">
   <div [hidden]="!editForm.controls.firstname.valid">Firstname est d'un format invalid</div> 
   <button type="submit" [disabled]="!editForm.valid">Modifier</button>
</form>
```
<!-- .element: class="big-code" -->
Notes
- formGroup déclare comme pour le template driven form une référence sur le modèle editForm
- formControlName: effectue le binding d'un contrôle présent dans le modèle

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Regrouper les champs dans le template
<br>
<ul>
    <li>Regrouper les champs dans un sous object grâce à <strong>FormGroupName</strong></li>
</ul>
<br><br>
```html
<form [formGroup]="editForm" (ngSumit)="submitEditForm(editForm.value)">
    <div [formGroupName]="address">
        <input formControlName="zipCode" type="text" />
        <input formControlName="country" type="text" />
    </div>
</form>
```
<!-- .element: class="big-code" -->
Notes
- ngSubmit permet de soumettre le formulaire lors de la touche entrer
- editForm.valu renvoie un object de ce format: { address: { zipCode: 57000, country: FRANCE } }

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La syntax dans la classe
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
Notes
- firstname est de type AbstracteControl, si l'on souhaite update ça value lors d'un certain évènement comme le click d'un bouton, il existe la méthode patchValue
- coup de pouce: Réaliser des getters qui renvoie l'AbstractControl. Ca allégerera votre template => this.editForm.get('firstname')
