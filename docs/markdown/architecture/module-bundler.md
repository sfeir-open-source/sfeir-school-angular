<!-- .slide: class="two-column" -->

## Webpack

Sous le capot, Angular utilise Webpack pour builder notre application

<br/><br/>

- Qu'est ce que Webpack ?
  - Bundle en Javascript
  - Hot Reload / webpack-dev-server
  - Actuellement le choix par défaut d'Angular

![h-300](assets/images/school/architecture/webpack_logo.png)

##--##

<br/><br/>

![h-700](assets/images/school/architecture/build_exemple.png)

Notes:

- Angular version 9 apporte son lot de nouveautés avec Ivy nouveau renderer et Bazel pour un build plus léger
- Attention Bazel ne remplacera pas webpack, mais webpack utilisera bazel

##==##

<!-- .slide: class="two-column" -->

## Vite

Suite à la version 16, Angular a introduit la possibilité d'utiliser Vite au lieu de Webpack
<br/><br/>

- Pourquoi Vite ?
  - plus performant que Webpack
  - Server ready
  - Se base sur les EsModules

##--##

![h-700](assets/images/school/architecture/vite-logo.png)

