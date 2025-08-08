<!-- .slide: class="with-code inconsolata" -->

# Managing dependencies as a pro

Dependencies of your library, need to be explicitly declared in your package.json file of the library in the section peerDependencies. <br/><br/>

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

# Dependencies specific to your library

For dependencies specific to your library, you can declare them in the dependencies section of your package.json.

```json
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

<!-- .element: class="small-code" -->

This can lead to version conflicts if your library is used in a project that already uses lodash, and will lead to a build error if this dependency is not explicitly allowed in ng-packagr

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

<!-- .element: class="small-code" -->
