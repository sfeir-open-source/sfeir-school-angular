<!-- .slide: class="transition-bg-sfeir-2" -->
# Jest

##==##

# What is Jest?

![h-250 center](assets/images/school/unit-tests/jest-logo.png)


<br/><br/>

Jest is a delightful JavaScript testing framework with a focus on simplicity.

<br/><br/>

Unlike Karma, Jest is a Node test runner, which means it doesn't need to launch a standalone Chrome to run tests.


##==##

<!-- .slide: class="with-code inconsolata" -->
# How to configure Angular to use Jest

3 packages to install:
- jest -> test framework
- jest-preset-angular -> out-of-the-box configuration to use Jest in Angular
- @types/jest -> Jest type definitions

<br/><br/><br/>

```shell
npm install --save-dev jest-preset-angular jest @types/jest
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# How to configure Angular to use Jest

Two files to create:

- jest.config.js -> file to create at the project root
- setup-jest.ts -> file to create at the root of the src folder

<br/><br/>

One file to modify:
- tsconfig.spec.json -> import Jest type definitions

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
