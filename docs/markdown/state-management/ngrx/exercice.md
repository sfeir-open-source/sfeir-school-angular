<!-- .slide: class="exercice" -->
# Exercice 23 : ngrx
## Exercice<br>
- Une barre de recherche a été ajoutée à votre application<br><br>
- Lors de la recherche vous devez filtrer la liste des personnes<br><br>
- Mettre en place une architecture NGRX afin de parvenir à ce résultat
Notes:
- vous devez modifier uniquement les fichiers:
    - people.component.ts
    - people.component.html
    - people.action.ts
    - people.reducer.ts
    - people.service.ts
    - selectors.ts
- créer trois actions
    - SetPeople permet de setter la liste des people
    - SetSearch permet de setter la valeur de votre recherche
- créer trois selectors
    - search permet de retourner la valeur de la recherche
    - people permet de retourner la liste des peoples
    - filterPeople permet de retourner la liste des personnes filtrées par la recherche

##==##

<!-- .slide: class="full-center exercice" -->
# Exercice 23 : ngrx
## Solution
__steps/23-ngrx-solution__
