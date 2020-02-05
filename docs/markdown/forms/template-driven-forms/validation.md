<!-- .slide: class="sfeir-basic-slide with-code" -->
# La validation avec Template driven form
<br>
La validation se fait à l'aide des attributs html classique de validations:<br><br>
- required
- minLength
- maxLength
<br><br>
<span class="important">Ok mais si un champs est requis en fonction d'un autre?</span>
<br><br>
Et bien on utilise la propriété lié à l'attribut
<br>
```html
<input type="text" name="lastname" [(ngModel)]="person.lastname"
  [required]="person.firstname" />
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les différents états d'un contrôle
<br><br><br>
- <strong>control.pristine</strong>: l’utilisateur n’a pas interagi avec le contrôle
- <strong>control.dirty</strong>: l’utilisateur a déjà interagi avec le contrôle
- <strong>control.valid</strong>: le contrôle est valide
- <strong>control.invalid</strong>: le contrôle n’est pas valide
- <strong>control.touched</strong>: le contrôle a perdu le focus
- <strong>control.untouched</strong>: le contrôle n’a pas encore perdu le focus

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les difféntes classes disponibles pour le style
<br><br><br>
- .ng-valid / .ng-invalid
- .ng-pristine / .ng-dirty
- .ng-touched / .ng-untouched

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Gérer les erreurs
<br><br><br>
```html
<input type="text" name="user" ngModel #userRef="ngModel" required>    
<div [hidden]="!userRef.errors?.required">
  <span class="help-block">Ce champ est obligatoire</span>
</div>
```
<!-- .element: class="big-code" -->
