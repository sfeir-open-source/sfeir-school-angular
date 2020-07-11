<!-- .slide: class="exercice" -->
# Exercice: directive-create
## Exercice
<br><br><br>

- Créer à l'aide du CLI dans le répertoire shared une directive SfeirBadge
- Cette directive doit afficher une icon si la personne est un manager
- Cette directive doit s'utiliser dans la vue list du template du composant PeopleComponent
Notes:
- dans la répertoir steps/directive-create la commande pour créer la directive est la suivante ng g d shared/badge/badge
- icon à afficher est la suivante: <i class="material-icons">supervisor_account</i>
- la direcitve doit s'utiliser de la façon suivante: <span sfeirBadge [person]="person"></span>

##==##
 
<!-- .slide: class="full-center exercice" -->
# Exercice: directive-create
## Solution
<b>steps/directive-create-solution</b>
