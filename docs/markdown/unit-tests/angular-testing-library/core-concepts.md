# Qu'est ce qu'Angular Testing Library ?

<br/><br/>

La bibliothèque principale, DOM Testing Library, est une solution légère pour tester les pages web en interrogeant et en interagissant avec les nœuds DOM

Ici se trouve la [documentation](https://testing-library.com/docs/) de la libraire

##==##

# A quoi sert Angular Testing Library ?

- Interroger le DOM de la manière la plus proche de l'utilisateur <br/><br/>
- S'assurer que les tests sont maintenables <br/><br/>
- Écrire des tests qui ne sont pas liés à l'implémentation <br/><br/>
- Eviter le boilerplating d'Angular

##==##

# Ce que n'est pas Angular Testing Library

- Un framework de test <br/><br/>
- Un outil de simulation <br/><br/>
- Un outil de test de performance <br/><br/>

##==##


<!-- .slide: class="with-code inconsolata" -->
# Installer Angular Testing Library

```shell
ng add @testing-library/angular
```
<!-- .element: class="big-code" -->

<br/><br/>

Le petit plus Nico :)

<br/>

```shell
npm install --save-dev @testing-library/jest-dom
```
<!-- .element: class="big-code" -->

permet d'avoir de nouvelles assertions sur le DOM, ne pas oublier 
- d'import cette librairie dans le fichier setup-jest.ts
- l'ajouter dans les types dans le tsconfig.spec.json



