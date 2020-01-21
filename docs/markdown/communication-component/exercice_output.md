<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="bold center">steps/output</span>
<ul>
    <li>Ajouter un évènement click sur le bouton suppression dans CardComponent</li>
    <li>Cet évènement click emet l'évènement personDelete</li>
    <li>Le composant parent PeopleComponent doit supprimer la personne lors de cette évènement</li>
    <li>Le composant parent HomeComponent doit séléctionner une autre personne lors de cette évènement</li>
</ul>
Notes
- L'api à utiliser pour delete une personne est la suivante: http://localhost:9000/api/peoples/:id, cette api renvoie une liste de personne à jour
- penser à passer la personne lorsque vous émettez l'évent personDelete: this.personDelete.emit(person);

##==##

<!-- .slide: class="sfeir-bg-blue exercice" -->
## Solution
<span class="full-center bold">steps/output-solution</span>
