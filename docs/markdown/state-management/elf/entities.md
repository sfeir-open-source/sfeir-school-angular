<!-- .slide: class="with-code inconsolata" -->
# Les entités dans elf

Les entités sont un package à part dans Elf: **@ngneat/elf-entities**

<br/><br/>

```typescript
npm install @ngneat/elf-entities
```
<!-- .element: class="big-code" -->

##==##

# Qu'est ce qu'une entité réellement ?

<br/><br/>

- Pour les personnes qui viennent du monde NoSql, il s'agit d'un **document** dans une collection

<br/><br/>

- Pour les personnes qui viennent du monde Sql, il s'agit d'une **ligne** dans une table

##==##

<!-- .slide: class="with-code inconsolata" -->
# Comment utilise t-on les entités ?

```typescript
import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

interface People {
  id: number;
  firstname: string;
  lastname: string;
}

const appStore = createStore({ name: 'APP_STORE' }, withEntities<People>());
```
<!-- .element: class="big-code" -->

##==##

# Sélecteurs et mutations sur les entités

<br/><br/>

Il existe de nombreux sélecteurs sur les entités et il en est de même pour les mutations

Le lien suivant vous donnera la documentation complète: [lien](https://ngneat.github.io/elf/docs/features/entities/entities)
