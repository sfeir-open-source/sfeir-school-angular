<!-- .slide: class="with-code inconsolata" -->
# La validation avec Template driven form

- La validation se fait à l'aide des attributs html classique de validation:<br><br>
    - required
    - minLength
    - maxLength
    - pattern
    - ...
<br><br>

Ok mais si un champ est requis en fonction d'un autre?
<!-- .element: class="important" -->
<br>
Et bien on utilise la propriété liée à l'attribut
<br>

```html
<input type="text" name="lastname" [(ngModel)]="person.lastname"
  [required]="person.firstname" />
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Les différents états d'un contrôle<br>

- <b>control.pristine</b> : l’utilisateur n’a pas interagi avec le contrôle
- <b>control.dirty</b> : l’utilisateur a déjà interagi avec le contrôle
- <b>control.valid</b> : le contrôle est valide
- <b>control.invalid</b> : le contrôle n’est pas valide
- <b>control.touched</b> : le contrôle a perdu le focus
- <b>control.untouched</b> : le contrôle n’a pas encore perdu le focus

##==##

<!-- .slide-->
# Les différentes classes disponibles pour le style<br>

- .ng-valid / .ng-invalid <br><br>
- .ng-pristine / .ng-dirty<br><br>
- .ng-pristine / .ng-dirty<br><br>
- .ng-touched / .ng-untouched

##==##

<!-- .slide: class="with-code inconsolata" -->
# Gérer les erreurs<br>

```html
<input type="text" name="user" ngModel #userRef="ngModel" required>    
<div *ngIf="userRef.errors?.required">
  <span class="help-block">Ce champ est obligatoire</span>
</div>
```
<!-- .element: class="big-code" -->
