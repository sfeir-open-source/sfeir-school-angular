# Exercice 23-ngrx (dossier steps/23-ngrx)

Un composant searcher a été ajouté à votre application, ce composant a pour but de faire une recherche sur votre liste de personnes

Une architecture ngrx a été également mis en place pour vous facilitez la mise en place d'un store

Le store est déjà enregistré dans votre application mais il est commenté (fichier **app.module.ts**)

<br>

## Etape 1

Dans le dossier store/state, analysez le fichier **state.ts**

## Etape 2

Dans le dossier store/actions, et particulièrement dans le fichier **people.actions.ts**, créez les actions suivantes

-   SET_PEOPLE --> cette actions prend comme props un objet avec une propriété people de type array de any
-   FILTER_PEOPLE --> cette action prend comme props un objet avec une propriété search de type string

<br><br>

## Etape 3

Dans le dossier store/reducers, et particulièrement dans le fichier **reducer.ts**

-   dé-commentez le code déjà présent
-   créez le reducer de votre store

Astuce: utilisez la fonction createReducer

```typescript
createReducer(initialState, on(action, logicOfYourAction), on(anotherAction, logicOfYourOtherAction));
```

<br><br>

## Etape 4

Dans le dossier store/selectors et particulièrement dans le fichier **selector.ts** créer deux sélecteurs

-   getFilteredPeople --> permet de récupérer la liste de personne filtré ou non
-   getSearch --> permet de récupérer la recherche de l'utilisateur

Astuce: utiliser la fonction createSelector de la manière suivante

```bash
createSelector(getPeopleState, () => ...)
```

getPeopleState est une méthode helper qui permet de récupérer le state people de votre application

<br><br>

## Etape 5

Dans le fichier **app.module.ts** dé-commentez le code d'enregistrement de votre store

<br><br>

## Etape 6

Dans le fichier **people.service.ts**, injecter votre store

Astuce: utilisez l'écriture suivante

```typescript
private readonly store: Store<PeopleFeature>
```

Dans le fichier **people.service.ts**, créez une méthode getPeople qui renvoie votre sélecteur getFilteredPeople

Dans le fichier **people.service.ts**, et particulièrement dans la méthode fetch(), dispatchez l'action setPeople

Astuce: pipez votre get avec l'opérateur rxjs tap qui permet de faire des effets secondaire à votre flux

<br><br>

## Etape 7

Dans le composant PeopleComponent, créez une propriété search\$ qui est une observable de type string

Dans le composant PeopleComponent, créez une propriété peoples\$ qui est un Observable de type any[]

Dans le composant PeopleComponent, et particulièrement dans le Hook d'initialisation de votre composant,

-   settez votre propriété search au sélecteur search de votre state
-   settez votre propriété peoples\$ à la fonction getPeople de votre service PeopleService

Dans le composant PeopleComponent, créez une méthode onSearch qui prend en paramètre la recherche de l'utilisateur. Cette fonction devra dispatcher votre action filterPeople

<br><br>

## Etape 8

Dans le fichier, **people.component.html**, appelez la méthode onSearch lorsque l'event emitter search du composant SearchComponent est émit

Dans le fichier \*\*people.component.html\*\*, setter la propriété 'initialValue' de contre composant SearchComponent à la valeur de la propriété search\$

Astuce: pensez à utiliser le pipe async

## Etape 9

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 23-ngrx
```
