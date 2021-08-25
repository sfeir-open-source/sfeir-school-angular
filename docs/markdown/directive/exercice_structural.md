<!-- .slide: class="exercice" -->
# Exercice 31 : structural-directive
## Exercice<br>
- Un squelette de directive a été ajouté dans le dossier shared/display<br><br>
- Vous allez recoder une partie de la directive *ngIf<br><br>
- Dans le composant Card, afficher uniquement le nom et prénom des personnes qui sont manager

Notes:
- Cette directive est assez simple a écrire, il vous faut appeler les services containerRef et templateRef pour afficher ou détruire une vue
- afficher: containerRef.createEmbeddedView(template)
- cacher: containerRef.clear()

##==##

<!-- .slide: class="full-center exercice" -->
# Exercice 31 : structural-directive
## Solution
__steps/31-structural-directive-solution__
