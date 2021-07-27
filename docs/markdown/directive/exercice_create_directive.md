<!-- .slide: class="exercice" -->
# Exercice 16 : directive-create
## Exercice<br>

- Créer, à l'aide du CLI, une directive SfeirBadge dans le répertoire shared 
- Cette directive doit afficher une icône si la personne est un manager
- Cette directive doit s'utiliser dans la vue list du template du composant PeopleComponent
Notes:
- dans le répertoire steps/directive-create la commande pour créer la directive est la suivante ng g d shared/badge/badge
- icône à afficher est la suivante: <i class="material-icons">supervisor_account</i>
- la directive doit s'utiliser de la façon suivante: <span sfeirBadge [person]="person"></span>

##==##
 
<!-- .slide: class="full-center exercice" -->
# Exercice 16 : directive-create
## Solution
<b>steps/16-directive-create-solution</b>
