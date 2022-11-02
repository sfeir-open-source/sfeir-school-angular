# Exercice 31-ngrx-store (dossier steps/31-ngrx-store)

L'objectif de ce workshop est de vous faire implémenter un store avec la technologie ngrx.

Dans la feature People, un composant de recherche a été réalisé. Cette recherche va vous permettre de filtrer votre liste de personne

<br>

## Etape 1

Dans le dossier **core** créez un dossier **store**

## Etape 2

Dans le dossier **store** créez un fichier **action** et créez deux actions :

-   **setPeople** --> cette action prend comme props un objet avec une propriété people de type array de People
-   **setSearch** --> cette action prend comme props un objet avec une propriété search de type string

<br><br>

## Etape 3

Dans le fichier **store/reducer** créez votre **reducer**

Astuce: utilisez la fonction **createReducer**

```typescript
createReducer(initialState, on(action, logicOfYourAction), on(anotherAction, logicOfYourOtherAction));
```

<br><br>

## Etape 4

Dans le fichier **store/selector** créez deux sélecteurs

-   **selectPeople** --> permet de récupérer la liste de personne filtrée ou non
-   **selectSearch** --> permet de récupérer la recherche de l'utilisateur

Astuce: utiliser la fonction **createSelector** de la manière suivante

```bash
createSelector(selectRootStore, () => ...)
```

**selectRootStore** est une méthode helper qui permet de récupérer le **state root** de votre application

```typescript
const selectRootStore = (rootStore: AppStore) => rootStore.store;
```

<br><br>

## Etape 5

Dans le fichier **core.module.ts** enregistrez votre **Store** grâce au module **StoreModule**

```typescript
StoreModule.forRoot({ store: reducer})
```

<br><br>

## Etape 6


Dans le service **PeopleService** injectez votre service store et réalisez les sides effects suivant à l'aide de l'opérateur **tap**
- lorsque vous récupérez la liste des personnes, settez votre entité people (dans son intégralité) de votre store
- lorsque vous supprimez une personne, settez votre entité people (dans son intégralité ) de votre store

<br><br>

## Etape 7

Dans le composant **PeopleComponent**, réalisez les transformations nécessaires pour implémenter votre store

<br><br>


## Etape 8

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 31-ngrx-store
```
