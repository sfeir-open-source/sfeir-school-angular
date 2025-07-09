<!-- .slide: class="two-column" -->

## Webpack

Under the hood, Angular uses Webpack to build our application

<br/><br/>

- What is Webpack?
  - Javascript bundler
  - Hot Reload / webpack-dev-server
  - Currently the default choice for Angular

![h-300](assets/images/school/architecture/webpack_logo.png)

##--##

<br/><br/>

![h-700](assets/images/school/architecture/build_exemple.png)

Notes:

- Angular version 9 brings its share of new features with Ivy, the new renderer, and Bazel for a lighter build
- Be aware that Bazel will not replace webpack, but webpack will use bazel

##==##

<!-- .slide: class="two-column" -->

## Vite

Following version 16, Angular introduced the ability to use Vite instead of Webpack
<br/><br/>

- Why Vite?
  - more performant than Webpack
  - Server ready
  - Based on EsModules

##--##

![h-700](assets/images/school/architecture/vite-logo.png)
