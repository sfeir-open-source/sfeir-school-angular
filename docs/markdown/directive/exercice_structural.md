<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="center bold">steps/structural-directive</span>
<br>
- Un squelette de directive a été ajouté dans le dossier shared/display
- Vous allez recoder une partie de la directive *ngIf
- Dans le composant Card, afficher uniquement le nom et prénom des personnes qui sont manager

Notes
- Cette directive est assez simple a écrire, il vous faut appeler les services containerRef et templateRef pour cacher afficher un template
- afficher: containerRef.createEmbeddedView(template)
- cacher: containerRef.clear()

##==##

<!-- .slide: class="sfeir-bg-blue exercice" -->
## Solution
<span class="full-center bold">steps/structural-directive-solution</span>
