<!-- .slide: class="exercice" -->
# Exercice : sturtural-directive
## Exercice
<br><br><br>
- Un squelette de directive a été ajouté dans le dossier shared/display<br><br>
- Vous allez recoder une partie de la directive *ngIf<br><br>
- Dans le composant Card, afficher uniquement le nom et prénom des personnes qui sont manager

Notes:
- Cette directive est assez simple a écrire, il vous faut appeler les services containerRef et templateRef pour afficher ou détruire une vue
- afficher: containerRef.createEmbeddedView(template)
- cacher: containerRef.clear()

##==##

<!-- .slide: class="full-center exercice" -->
# Exercice : structural-directive
## Solution
__steps/structural-directive-solution__
