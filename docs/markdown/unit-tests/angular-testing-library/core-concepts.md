# What is Angular Testing Library?

<br/><br/>

The main library, DOM Testing Library, is a lightweight solution for testing web pages by querying and interacting with DOM nodes.

The library's [documentation](https://testing-library.com/docs/) can be found here.

##==##

# What is Angular Testing Library for?

- Querying the DOM in a way that is closest to the user <br/><br/>
- Ensuring that tests are maintainable <br/><br/>
- Writing tests that are not tied to the implementation <br/><br/>
- Avoiding Angular boilerplate

##==##

# What Angular Testing Library is not

- A testing framework <br/><br/>
- A mocking tool <br/><br/>
- A performance testing tool <br/><br/>

##==##


<!-- .slide: class="with-code inconsolata" -->
# Installing Angular Testing Library

```shell
ng add @testing-library/angular
```
<!-- .element: class="big-code" -->

<br/><br/>

Nico's little extra :)

<br/>

```shell
npm install --save-dev @testing-library/jest-dom
```
<!-- .element: class="big-code" -->

This provides new DOM assertions. Don't forget to:
- import this library in the `setup-jest.ts` file
- add it to the types in `tsconfig.spec.json`
