<!-- .slide: class="exercice" -->
# Exercice 17 : form
## Enoncé<br>

- Le composant PeopleComponent vient d'être complété
    - showDialog(): affiche une modal dialogue
    - hideDialog(): permet de cacher cette modal<br><br>
- Le template du composant PeopleComponent a été complété
    - un boutton pour ajouter une personne, affiche la modal
    - HTML de la modal

##==##

<!-- .slide: class="exercice" -->
# Exercice 17 : forms
## Exercice<br>

- A l'aide du CLI, créer dans le dossier shared, le composant FormComponent
- Copier le contenu des fichiers du dossier static
- Intégrer FormComponent dans AddDialogComponent
- Rendre le formulaire template driven form
- Faire communiquer FormComponent avec AddDialogComponent à l'aide des évènements cancel et personAdd

##==##
<!-- .slide: class="sfeir-bg-pink exercice" -->

# Exercice 17 : form
## Exercice
<br>

- Lors de l'évent cancel, la dialog se ferme
- Lors de l'évent personAdd, la dialogue se ferme en envoyant la personne au composant PeopleComponent
- Si lors de la fermeture de la modal PeopleComponent reçoit un personne, implémenter une méthode qui ajoute un contact
Notes:
- api à utiliser: POST http://localhost:9000/api/peoples retourne la personne créée

##==##

<!-- .slide: class="full-center exercice" -->
# Exercice 17 : form
## Solution
<b>steps/17-form-solution</b>
