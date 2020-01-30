<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="bold center">steps/ngrx</span>
<br><br>
- Une barre de recherche a été ajouté à votre application
- Lors de la recherche vous devez filtrer la liste des personnes
- Mettre en place une architecture NGRX afin de parvenir à ce resultat
Notes
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

<!-- .slide: class="sfeir-bg-blue exercice" -->
## Solution
<span class="bold full-center">steps/ngrx-solution</span>
