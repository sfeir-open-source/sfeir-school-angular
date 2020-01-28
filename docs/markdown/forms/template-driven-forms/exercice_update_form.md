<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="bold center">steps/form-b</span>
<br>
- A l'aide du CLI, créer un composant UpdateComponant
- Rendre accéssible ce composant via l'url: /edit/:id (modifier la définition des routes)
- Récupérer le paramètre id de l'url (ActivatedRoute)
- A l'aide de cet id récupérer le détail de la personne
Notes
- api à appeler: GET /api/peoples/:id

##==##

<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="center bold">steps/form-b</span>
- Utiliser FormComponent dans UpdateComponent
- Ajouter une propriété person au FormComponent
- Modifier le binding pour le rendre bidirectionnel
- Changer le titre du form, "Modification" si la personne n'est pas nulle
- Modifier la personne lors de l'event personAdd 
Notes
- api à appeler: PUT /api/peoples/:id
- Dans un vrai projet il est tout de même déconseiller d'utiliser le même formulaire pour la création et la modification

##==##

<!-- .slide: class="sfeir-bg-blue exercice" -->
## Solution
<span class="full-center bold">steps/form-b-solution</span>
