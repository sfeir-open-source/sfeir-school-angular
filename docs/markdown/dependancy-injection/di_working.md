<!-- .slide: class="sfeir-basic-slide" -->
# Principe de la DI en Angular
<ul>
    <li><strong>L'Injector</strong> expose l'API pour créer des instances de dépendances</li>
    <li>Le <strong>Provider</strong> indique à <strong>l’Injector</strong> comment créer la dépendance</li>
    <li>La dépendance est le type d’objet à créer</li>
</ul>
<br><br>
<img alt="center h-600" src="assets/images/school/dependancy-injection/di_working.png" />

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le rôle du Provider
<br><br>
- Fait le lien entre un <strong>InjectionToken</strong> (token) et une <strong>Factory</strong><br><br>
- Permet de découpler la dépendance et son implémentation<br><br>
- Api pour lier une simple valeur
<ul>
    <li>faire des alias de token</li>
    <li>créer des factory synchrones ou pas ( toFactory, toAsyncFactory)</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les différents type de résolution
<br><br>
- Valeur<br><br>
- Classe alternative<br><br>
- Classes aliasée<br><br>
- Factory

