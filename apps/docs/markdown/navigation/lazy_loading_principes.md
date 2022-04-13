<!-- .slide-->
# Le principe du Lazyloading<br>

- Lazy Loading des modules<br><br>
- Evite de charger tout le code des modules dans un unique bundle<br><br>
- Permet de différer le chargement d'une partie de l'application<br><br>
- Angular a fait le choix de s’appuyer sur la notion de Modules (NgModules) et des routes afin de gérer cette problématique.

##==##

<!-- .slide-->
# Le principe du Lazyloading<br>

- Vouloir implémenter le lazy loading des modules dans votre application implique de bien organiser son projet au préalable<br><br>
- <b>Root Module</b> : module de chargement de votre application (app.module.ts)
- <b>Feature Module</b> : regroupement dans un module d’une fonctionnalité spécifique d’une application (composants pages)<br><br>
  ![full-center](assets/images/school/lazy-loading/module-architecture-level-1.png)

##==##

<!-- .slide-->
# Le principe du Lazyloading<br>
![full-center](assets/images/school/lazy-loading/module-architecture-level-2.png)

