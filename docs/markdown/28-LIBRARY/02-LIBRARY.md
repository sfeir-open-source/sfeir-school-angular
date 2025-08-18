<!-- .slide: class="with-code inconsolata" -->
# Essential Commands

```shell
ng build sfeir-components
```
<!-- .element: class="big-code" -->

<br/><br/>

```shell
ng lint sfeir-components
```
<!-- .element: class="big-code" -->

<br/><br/>

```shell
ng test sfeir-components
```
<!-- .element: class="big-code" -->

##==##


<!-- .slide: class="with-code inconsolata" -->
# The public_api.ts file

This file is the entry point of your library; it allows you to define what your library will expose.

<br/><br/>

```typescript
export * from './user.service';
export * from './user.component';
```
<!-- .element: class="big-code" -->

<br/><br/>
Only export what should be accessible from outside the library.

##==##


<!-- .slide: class="with-code inconsolata" -->
## Best Practice

To follow development best practices and conventions, it is wise to create an index.ts file.<br/><br/>

It will export the public_api.ts file and other files from your library.

<br/><br/>

```typescript
export * from './public_api';
```
<!-- .element: class="big-code" -->
