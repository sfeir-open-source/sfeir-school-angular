<!-- .slide: class="sfeir-bg-pink exercice" -->
## Informations
<span class="center bold">steps/form</span>
<br>
<ul>
  <li>Le composant PeopleComponent vient d'être compléter par deux méthodes:
    - showDialog(): affiche une modal
    - hideDialog(): permet de cacher la modal
  </li>
  <li>Le template du composant PeopleComponent a été complété:
    - un bouton pour ajouter une personne, affiche la modal
    - HTML de la modal
  </li>
</ul>

##==##

<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="center bold">steps/form</span>
<br>
- A l'aide du CLI, créer dans le dossir shared, le composant FormComponent
- Intégrer FormComponent dans AddDialogComponent
- Rendre le formulaire template driven form
- Faire communiquer FormComponent avec AddDialogComponent à l'aide des évènements cancel et personAdd

##==##

<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="center bold">steps/form</span>
<br>
- Lors de l'event cancel, la dialog se ferme
- Lors de l'event personAdd, la dialog se ferme en envoyant la persone au composant PeopleComponent
- Si lors de la fermeture de la modal PeopleComponent reçoit une personne, implémenter une méthode qui ajoute un contact

Notes:
- api à utiliser: POST http://localhost:9000/api/peoples retourne la personne créée

##==##

<!-- .slide: class="sfeir-bg-blue exercice" -->
## Solution
<span class="full-center bold">steps/form-solution</span>
