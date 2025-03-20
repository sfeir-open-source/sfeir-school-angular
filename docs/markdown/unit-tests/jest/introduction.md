<!-- .slide: class="transition-bg-sfeir-2" -->
# Jest

##==##

# Qu'est ce que Jest ?

![h-250 center](assets/images/school/unit-tests/jest-logo.png)


<br/><br/>

Jest est un framework de test JavaScript agréable qui met l'accent sur la simplicité.

<br/><br/>

Contrairement à Karma, Jest est un node test runner, c'est à dire qu'il n'aura pas besoin de lancer un chrome standalone pour lancer les tests


##==##

<!-- .slide: class="with-code inconsolata" -->
# Comment configurer Angular pour utiliser Jest

3 packages à installer: 
- jest -> framework de test
- jest-preset-angular -> configuration out of the box pour utiliser jest dans Angular
- types/jest -> la définition de type de Jest

<br/><br/><br/>

```shell
npm install --save-dev jest-preset-angular jest @types/jest
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Comment configurer Angular pour utiliser Jest

Deux fichiers à créer: 

- jest.config.js -> fichier à créer  à la racine du projet
- setup-jest.ts -> fichier à créer à la racine du dossier src

<br/><br/>

Un fichier à modifier
- tsconfig.spec.json -> importer la definition de types de jest

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

```javascript
// jest.config.js

const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('./tsconfig.json').compilerOptions;

// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig.spec.json',
};

module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  modulePathIgnorePatterns: ['<rootDir>/src/ng1'],
};
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import '@testing-library/jest-dom';

setupZoneTestEnv({
  errorOnUnknownElements: false,
  errorOnUnknownProperties: true,
});
```
<!-- .element: class="big-code" -->






