<!-- .slide: class="transition-bg-sfeir-1" -->
# Reactive forms

##==##

<!-- .slide: class="with-code inconsolata" -->
# La Fondation du Reactive forms
Pour réaliser des formulaires avec Reactive Forms, il est nécessaire d'importer le module <b>ReactiveFormsModule</b> provenant également du package <b>@angular/forms</b>
<br/><br/>

```typescript
// app.module.ts
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

<!-- .slide: class="two-column with-code inconsolata" -->
# Syntaxe Reactive forms


```typescript
// form.component.ts
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { EditForm } from './edit-form.model';
@Component({...})
export class FormComponent {
    editForm: FormGroup<EditForm>;
    constructor() {
        this.editForm = new FormGroup({
            firstname: new FormControl('',
                [Validators.required, Validators.minLength(2)]
            )
        });
    }
}
```
<!-- .element: class="medium-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```html
<!-- form.component.html -->
<form [formGroup]="editForm">
    <input type="text" formControlName="firstname">
    <div *ngIf="!editForm.controls.firstname.valid">
        Firstname est d'un format invalid
    </div>
    <button type="submit" [disabled]="!editForm.valid">
        Modifier
    </button>
</form>
```
<!-- .element: class="medium-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# La Syntaxe dans le template

- Référence au modèle du formulaire via <b>formGroup</b>
- Mapping de controls via <b>formControlName</b><br/><br/>

```html
<form [formGroup]="editForm">
    <input type="text" formControlName="firstname">
    <div *ngIf="!editForm.controls.firstname.valid">Firstname est d'un format invalid</div>
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

- Regrouper les champs dans un sous objet grâce à <b>FormGroupName</b> <br/><br/>

```html
<form [formGroup]="editForm" (ngSumit)="submitEditForm(editForm.value)">
    <div formGroupName="address">
        <input formControlName="zipCode" type="text" />
        <input formControlName="country" type="text" />
    </div>
</form>
```
<!-- .element: class="big-code" -->
Notes:
- ngSubmit permet de soumettre le formulaire lors de la touche entrer
- `editForm.value` renvoie un objet de ce format: { address: { zipCode: 57000, country: FRANCE } }

##==##

<!-- .slide: class="with-code inconsolata" -->
# La syntaxe dans la classe

```typescript
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { EditForm } from './edit-form.model';
@Component({...})
export class FormComponent {
    editForm: FormGroup<EditForm>;
    constructor() {
        this.editForm = new FormGroup({
            address: new FormGroup({
                zipCode: new FormControl('', Validators.required),
                country: new FormControl('', Validators.required),
            })
        })
    }
}
```
<!-- .element: class="big-code" -->
Notes:
- firstname est de type AbstractControl, si l'on souhaite update sa valeur lors d'un certain évènement comme le click d'un bouton, il existe la méthode patchValue
- coup de pouce: Réaliser des getters qui renvoie l'AbstractControl. Ca allégerera votre template => this.editForm.get('firstname')
