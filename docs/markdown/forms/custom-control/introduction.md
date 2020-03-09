<!-- .slide: class="sfeir-basic-slide with-code" -->
# Context
<br><br>
Imaginons je souhaite créer un composant dropdown, et souhaite avoir la puissance de la validation des formulaires Angular.
<br>
On pourrait imaginer quelque chose dans ce genre là.
<br><br>
```html
<form [formGroup]="sfeir-form">
    <sfeir-dropdown formControlName="agency"></sfeir-dropdown>
</form>
```
<!-- .element: class="big-code" -->
<br><br>
<span class="important center">Est que les contrôles sur agency vont s'opérer? </span>
Notes
- La réponse est NON! Le contrôle de validité d'un champs de formulaire en Angular ne fontionne que sur des balises formulaires connues par HTML (input, select, text-area)
- Alors on pourrait se dire que pour réaliser cette dropdown, nous allons réaliser un simple select que l'on customisera à chaque fois mais cela signifie que
 - il faut dupliquer le css à moins de le sortir dans un fichier bien à part avec le risque que certaines classe s'override avec d'autre (possible même avec la méthode BEM)
 - On duplique du code html
- La solution reste quand même de créer un composant qui va implémenter ControlValueAccessor
