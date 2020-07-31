<!-- .slide: class="with-code inconsolata" -->
# Context
<br><br>

Imaginons que je souhaite créer un composant dropdown, et souhaite avoir la puissance de la validation des formulaires Angular.
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

Est que les contrôles sur agency vont s'opérer? 
<!-- .element: class="important center" -->
<br>

Notes:
- La réponse est NON! Le contrôle de validité d'un champ d'un formulaire en Angular ne fonctionne que sur les composants et directives implémentant l'interface ControlValueAccessor. Angular fournit 'value accessor' pour tous les élements basiques de formulaire HTML .
- Alors on pourrait se dire que pour réaliser cette dropdown, nous allons réaliser un simple select que l'on customisera à chaque fois mais cela signifie que
 - il faut dupliquer le css à moins de le sortir dans un fichier bien à part avec le risque que certaines classe s'override avec d'autre (possible même avec la méthode BEM)
 - On duplique du code html
- La solution reste quand même de créer un composant qui va implémenter ControlValueAccessor
