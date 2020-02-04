<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="bold center">steps/router-lazyloading-guard</span>
<br>
- Dans le dossier secret créer un secret Module
- Dans le fichier app.route lazy loader ce module, lorsque vous naviguez vers /secret
- Compléter le guards access-secret.guards.ts pour autoriser la navigation vers secret seulement si le hash who=me est présent dans l'url de navigations vers secret
Notes
- pour le hash pensez à utiliser window.location.hash.includes('who=me')

##==##

<!-- .slide: class="transition-white sfeir-bg-blue exercice" -->
## Solution
<span class="bold full-center">steps/router-lazyloading-guard-solution</span>
