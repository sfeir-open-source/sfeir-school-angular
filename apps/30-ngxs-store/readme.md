# 30-ngxs-store (dossier apps/30-ngxs-store)

L'objectif de ce workshop est de vous faire implémenter un store avec la technologie ngxs.

Dans la feature People, un composant de recherche a été réalisé. Cette recherche va vous permettre de filter votre liste de personne

<br>

## Etape 1

Dans le dossier core, créez un dossier store (ce dossier va contenir le store global de notre application).

<br><br>

## Etape 2

Dans le dossier store, générer à l'aide du CLI un service AppStore

Pensez à enregistrer ce service dans le module CoreModule

<br><br>

## Etape 3

Dans le fichier app.store.ts, créez deux classes qui seront les déclencheur de vos actions

- SetPeople (cette classe prend un payload dans son constructor qui sera la recherche de l'utilisateur)
- SetSearch (cette classe prend un payload dans son constructor qui sera la liste des personnes)

<br><br>

## Etape 4

Dans votre service, créez

- un state avec l'annotation @State
- une action setSearch qui va setter la recherche de l'utilisateur
- une action setPeople qui permet de setter votre entité people dans son intégralité
- un sélecteur search qui permet de vous retourner la recherche de l'utilisateur
- une sélecteur people qui permet de vous retourner la liste de personne filtrée ou non

<br><br>

## Etape 5

Dans le service PeopleService, injectez votre service store et réalisez les sides effects suivant à l'aide de l'opérateur tap

- lorsque vous récupérez la liste des personnes, settez votre entité people (dans son intégralité) de votre store
- lorsque vous supprimez une personne, settez votre entité people (dans son intégralité ) de votre store

<br><br>

## Etape 6

Dans le composant PeopleComponent, réalisez les transformations nécessaires pour implémentez votre store
<br><br>

## Etape 7

Vérifiez votre travail en lançant la commande

```shell
npm run client -- 30-ngxs-store
```
