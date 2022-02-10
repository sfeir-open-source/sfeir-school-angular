# Exercice 22-ngxs (dossier steps/22.ngxs)

Un composant searcher a été ajouté à votre application, ce composant a pour but de faire une recherche sur votre liste de personnes

Une architecture ngxs a été également mis en place pour vous facilitez la mise en place d'un store

Le store est déjà enregistré dans votre application

<br>

## Etape 1

Dans le fichier **app.state.ts**, créez trois actions:

-   LoadPeople --> type = '[APP] LoadPeople'
-   SetPeople -> type = '[APP] SetPeople' (cette action prend un paramètre qui est le tableau de people)
-   FilterPeople -> type = '[APP] FilterPeople' (cette action prend un paramètre qui la recherche de la personne)

<br><br>

## Etape 2

Dans le fichier **app.state.ts** et plus précisément dans la classe AppState, créez trois selectors grâce à l'annotation @Selector

-   search --> ce sélecteur renvoie une la recherche de la personne;
-   people --> ce sélecteur renvoie la liste des personnes;
-   filterPeople --> ce sélecteur renvoie la liste des personnes filtrées par votre recherche

Dans le fichier **app.state.ts** et plus précisément dans la classe AppState, créez deux actions grÂce à l'annotation @Action

-   setPeople --> cette action doit pouvoir setter la liste de personnes
-   setSearch --> cette action doit pouvoir setter la recherche de l'utilisateur

<br><br>

## Etape 3

Dans le fichier **people.service.ts** et particulièrement dans la méthode fetch, appelez l'action setPeople

Astuce: pensez à utiliser le l'opérateur rxjs mergeMap pour piper :)

Attention à bien renvoyer la liste des peoples, dispatch renvoie un observable, il sera donc judicieux de le piper avec l'opérateur rxjs map pour renvoyer correctement la liste des peoples

<br><br>

## Etape 4

Dans le composant PeopleComponent, créez une propriété search\$ qui est une observable de type string

Dans le composant PeopleComponent, injectez votre store

```typescript
private readonly store: Store
```

Dans le composant PeopleComponent, et particulièrement dans le Hook d'initialisation de votre composant,

-   setter votre propriété search au sélecteur search de votre state
-   appelez votre sélecteur filteredPeople (pensez à subscribe dessus pour récupérer la liste des personnes filtrées)

Dans le composant PeopleComponent, créez une méthode onSearch qui prend en paramètre la recherche de l'utilisateur. Cette Fonction devra appeler votre action FilterPeople

<br><br>

## Etape 5

Dans le fichier, **people.component.html**, appelez la méthode onSearch lorsque l'event emitter search du composant SearchComponent est émit

Dans le fichier \*\*people.component.html\*\*, setter la propriété 'initialValue' de contre composant SearchComponent à la valeur de la propriété search\$

Astuce: pensez à utiliser le pipe async

<br><br>

## Etape 6

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 22-ngxs
```
