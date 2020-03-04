<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<span class="center bold">steps/resolvers</span><br>
<ul>
    <li>Compléter le fichier user-details.resolver.ts</li>
    <li>Modifier le fichier app.route.ts pour importer le résolver sur la route edit/:id</li>
    <li>Modifier le fichier update.component.ts de manière à récupérer les data de votre résolver</li>
</ul>
Notes
- le fichier user-details.resolver.ts se trouve dans le dossier shared/resolver
- le fichier update.component.ts se trouve dans le dossier shared/update
- Le resolver doit récupérer l'id et utiliser la méthode fetchOne du peopleService
- le params _route du resolver vous permettra de récupérer l'id

##==##

<!-- .slide: class="sfeir-bg-blue exercice" -->
## Solution
<span class="full-center bold">steps/resolvers-solution</span>
