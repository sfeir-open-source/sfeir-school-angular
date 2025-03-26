<!-- .slide: class="with-code inconsolata" -->
# Managing dependencies as a pro

Depedencies of your library, need to be explicitly declared in your package.json file of the library in the section peerDependencies. <br/><br/>

```json
{
  "peerDependencies": {
    "@angular/common": "^15.0.0",
    "@angular/core": "^15.0.0",
    "rxjs": "^7.5.0"
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Dépendance propre à votre librairie

Pour les dépendances propres à votre librairie, vous pouvez les déclarer dans la section dependencies de votre package.json.

```json
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

Ceci peux engendrer des conflits de versions si votre librairie est utilisée dans un projet qui utilise déjà lodash, et conduira à une erreur de build si cette dépendance n'est pas explicitement autorisé dans ng-packagr

```json
{
   "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
   "dest": "../../dist/libs/sfeir-components",
   "lib": {
    "entryFile": "src/index.ts"
  },
  "allowedNonPeerDependencies": ["lodash"]
}
```
