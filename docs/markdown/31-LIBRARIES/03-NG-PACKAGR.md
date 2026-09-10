# Ng Packagr: The Build Solution

Ng Packagr is a build tool for Angular libraries.

It allows you to create Angular packages that can be published to npm and used in other Angular projects. Ng Packagr handles the compilation, bundling, and creation of declaration files for Angular libraries. <br/><br/>

- Building Angular libraries based on esbuild, webpack in FESM2022 format <br/><br/>
- Scoped and non-scoped packages<br/><br/>
- Support Css Feature

##==##

<!-- .slide: class="with-code inconsolata" -->

# ng-package.json: The Configuration File for Your Lib

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

The advantage of using Ng-Packagr is that it does almost everything for you; it allows you to copy your assets to your build directory with a simple configuration.

<br/>

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/libs/sfeir-components",
  "lib": {
    "entryFile": "src/index.ts"
  },
  "assets": ["src/assets", { "glob": "**/*.scss", "input": "src/styles", "output": "./styles" }]
}
```

<!-- .element: class="big-code" -->
