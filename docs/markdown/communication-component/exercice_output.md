<!-- .slide: class="exercice" -->
# Exercice: output
## Exercice
<br><br>

- Ajouter un évènement click sur le bouton suppression du CardComponent
- Cet évènement clcik émet l'évènement personDelete
- Le composant parent PeopleComponent doit supprimer la personne lors de cette évènement
- Le composant parent HomeComponent doit sélectionner au hasard une autre personne lors de cet évènement
Notes:
- L'api à utiliser pour delete une personne est la suivante: http://localhost:9000/api/peoples/:id, cette api renvoie une liste de personne à jour
- penser à passer la personne lorsque vous émettez l'évent personDelete: this.personDelete.emit(person);

##==##

<!-- .slide: class="exercice full-center" -->
# Exercice: output
## Solution
<b>steps/output-solution</b>
