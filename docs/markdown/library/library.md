<!-- .slide: class="with-code inconsolata" -->
# Les commandes à connaître absolument

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
# Le fichier public_api.ts

Ce fichier est le point d'entrée de votre librairie, il permet d'expliter ce que votre librairie va exposer.

<br/><br/>

```typescript
export * from 'user.servcice';
export * from 'user.component'
```
<!-- .element: class="big-code" -->

<br/><br/>
N'exporter uniquement ce qui doit être accéssible depuis l'extérieur de la librairie.

##==##


<!-- .slide: class="with-code inconsolata" -->
## Best Practice

Pour respecter les bonnes pratiques de développement et les conventions, il est judicieux de créer un fichier index.ts <br/><br/>

Celui exportera le fichier public_api.ts et les autres fichiers de votre librairie.

<br/><br/>

```typescript
export * from './public_api';
```
<!-- .element: class="big-code" -->


