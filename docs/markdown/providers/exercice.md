<!-- .slide: class="exercice" -->
# Exercice 12 : service
## Exercice

<br>

- Créer un service PeopleService dans le répertoire shared/people-service (CLI: `npx ng g s src/app/shared/people-service/people`)
- Regrouper tous les appels au backend dans ce service
- Utiliser ce service à la place des actuels appels au backend
- Tester d'enregistrer votre service de manière globale ou locale
Notes:
- Remplacer dans le composant le http.get par peopleService.fetch qui contiendra votre Http.get
- Replacer tous les http. par votre nouveau service peopleService

##==##
<!-- .slide: class="exercice full-center" -->
# Exercice 12 : service
## Solution
<b>steps/12-service-solution</b>
