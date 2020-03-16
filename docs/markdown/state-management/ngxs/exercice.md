<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="center bold">steps/ngxs</span>
<br><br>
- Une barre de recherche a été ajoutée à votre application
- Lors de la recherche vous devez filtrer la liste des personnes
- Mettre en place une architecture NGXS afin de parvenir à ce resultat
Notes
- vous devez modifier uniquement les fichiers people.component.ts / people.component.html / app.state.ts
- créer trois actions
    - LoadPeople permet de récupérer uniquement la liste des peoples
    - SetPeople permet de setter la liste des people
    - SetSearch permet de setter la valeur de votre recherche
- créer trois Memoized selectors
    - search permet de retourner la valeur de la recherche
    - people permet de retourner la liste des peoples
    - filterPeople permet de retourner la liste des personnes filtrées par la recherche
- Votre state sera de type AppStateModel

##==##

<!-- .slide: class="sfeir-bg-blue exercice" -->
## Solution
<span class="full-center bold">steps/ngxs-solution</span>
