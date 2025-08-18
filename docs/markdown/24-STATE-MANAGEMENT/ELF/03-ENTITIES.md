<!-- .slide: class="with-code inconsolata" -->

# Entities in Elf

Entities are a separate package in Elf: **@ngneat/elf-entities**

<br/><br/>

```shell
npm install @ngneat/elf-entities
```

<!-- .element: class="big-code" -->

##==##

# What is an entity, really?

<br/><br/>

- For those coming from the NoSQL world, it's a **document** in a collection.

<br/><br/>

- For those coming from the SQL world, it's a **row** in a table.

##==##

<!-- .slide: class="with-code inconsolata" -->

# How do we use entities?

```typescript
import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

interface People {
  id: number;
  firstname: string;
  lastname: string;
}

const peopleStore = createStore({ name: 'people' }, withEntities<People>());
```

<!-- .element: class="big-code" -->

##==##

# Selectors and Mutations on Entities

<br/><br/>

There are many selectors for entities, and the same goes for mutations.

The following link provides the complete documentation: [link](https://ngneat.github.io/elf/docs/features/entities/entities)
