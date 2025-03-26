# Ng Packagr la solution pour le build

Ng Packagr est un outil de construction pour les bibliothèques Angular.

Il permet de créer des packages Angular qui peuvent être publiés sur npm et utilisés dans d'autres projets Angular. Ng Packagr gère la compilation, le bundling et la création de fichiers de déclaration pour les bibliothèques Angular. <br/><br/>

- Building Angular libraries based on esbuild, webpack in FESM2022 format <br/><br/>
- Scoped and non-scoped packages<br/><br/>
- Support Css Feature


##==##


<!-- .slide: class="with-code inconsolata" -->
# ng-package.json: le fichier de configuration de votre lib

<br/><br/>

```json
{
   "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
   "dest": "../../dist/libs/sfeir-components",
   "lib": {
    "entryFile": "src/index.ts"
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Managing assets with ng-packagr

L'avantage d'utiliser Ng-Packagr c'est qu'il fait un peu tout pour vous, il permet à l'aide d'une simple configuration de copier vos assets dans votre répertoire de build

<br/>

```json
{
    "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
    "dest": "../../dist/libs/sfeir-components",
    "lib": {
        "entryFile": "src/index.ts"
    },
    "assets": [
      "src/assets",
      { "glob": "**/*.scss", "input": "src/styles", "output": "./styles" }
    ]
}
```
<!-- .element: class="big-code" -->
