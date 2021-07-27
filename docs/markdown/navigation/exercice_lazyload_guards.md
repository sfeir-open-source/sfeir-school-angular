<!-- .slide: class="exercice" -->
# Exercice 25 : router-lazyloading-guard
## Exercice<br>

- Dans le dossier secret créer un secret Module
- Dans le fichier app.route lazy loader ce module, lorsque vous naviguez vers /secret
- Compléter le guard access-secret.guards.ts pour autoriser la navigation vers secret seulement si le hash who=me est présent dans l'url de navigation vers secret
Notes:
- pour le hash pensez à utiliser window.location.hash.includes('who=me')

##==##

<!-- .slide: class="full-center exercice" -->
# Exercice 25 : router-lazyloading-guard
## Solution
__steps/25-router-lazyloading-guard-solution__
