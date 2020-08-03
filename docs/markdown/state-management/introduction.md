<!-- .slide: class="transition-bg-grey-1 underline" -->
# Problématique

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Cas concret
<br><br>
Soit une application web classique avec trois composants A, B, C et une variable ‘toto’.<br><br>

- Composant A peut créer et modifier la variable toto
- Composant B peut modifier la variable toto
- Composant C peut modifier uniquement une propriété de la variable toto
<br><br>

__Problème__ : schématisation d’accès et de modification à la donnée semblable à une toile d'araignée dont chaque cas est dépendant du contexte! <br><br>
__Répercussion__ : Complication à suivre de la logique, difficile à débugger<br><br>

Trouver un moyen de communication commun
<!-- .element: class="important" -->

##==##

<!-- .slide -->
# 3 façon de communiquer
<br><br>

Il existe deux grandes familles de communication<br><br>
- __Parent - Enfant__ :
    - Input / Output [ exemple => @Input() , @Output dans un application Angular ]
<br><br>
- __Éléments indépendants les uns des autres__
    - Bus de communication [ système de notification, event emitter … ]
    - Architecture flux

##==##

<!-- .slide -->
# Notification dans un bus de communication
<br>

- Notification via un EventEmitter
- Global ou dans des services
- Utiliser ces méthodes
    - subscribe et emit
<br><br>

![h-500](assets/images/school/state-management/bus_methods.png)
![h-500](assets/images/school/state-management/bus_import.png)

##==##

<!-- .slide: class="two-column-layout" -->
# State Management
##--##
<br><br>

- Architecture dataflow : like Redux :) <br><br>
- Librairie tiers à installer
##--##
<br><br>

![h-500](assets/images/school/state-management/redux_concepts.png)
