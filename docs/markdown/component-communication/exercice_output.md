<!-- .slide: class="exercice" -->
# Exercice 11 : output
## Exercice

- Ajouter un évènement `(click)` sur le bouton suppression du CardComponent
- Le clic doit déclencher l'évènement `(personDelete)`
- Le composant parent PeopleComponent doit supprimer la personne lors de l'évènement `(personDelete)`
- Le composant parent HomeComponent doit sélectionner au hasard une autre personne lors de l'évènement `(personDelete)`
Notes:
- L'api à utiliser pour supprimer une personne est la suivante: http://localhost:3000/api/peoples/:id, cette api renvoie une liste de personne à jour
- penser à passer la personne lorsque vous émettez l'évent personDelete: this.personDelete.emit(person);

##==##

<!-- .slide: class="exercice full-center" -->
# Exercice 11 : output
## Solution
<b>steps/11-output-solution</b>
