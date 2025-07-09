# 29-elf-store (dossier apps/29-efl-store)

L'objectif de ce workshop est de vous faire implémenter un store avec la technologie elf.

Elf est une libraire, framework agnostic, basé sur Rxjs pour mettre en place facilement un store au sein de votre application

Dans la feature People, un composant de recherche a été réalisé. Cette recherche va vous permettre de filter votre liste de personne

<br>

## Etape 1

Dans le dossier core, créez un dossier store (ce dossier va contenir le store global de notre application).

<br><br>

## Etape 2

Dans le dossier store, générer à l'aide du CLI un service AppStore

Pensez à enregistrer ce service dans le module CoreModule

## Etape 3

Dans votre service, créez

- un store, qui prend en propriété un objet avec une props search et une entité people
- une méthode setSearch qui va setter la recherche de l'utilisateur
- une méthode setPeopleEntities qui permet de setter votre entité people dans son intégralité
- une méthode selectSearch qui permet de vous retourner la recherche de l'utilisateur
- une méthode selectPeople qui permet de vous retourner la liste de personne

<br><br>

## Etape 4

Dans le service PeopleService, injectez votre service store et réalisez les sides effects suivant à l'aide de l'opérateur tap

- lorsque vous récupérez la liste des personnes, settez votre entité people (dans son intégralité) de votre store (setPeopleEntities)
- lorsque vous supprimez une personne, settez votre entité people (dans son intégralité ) de votre store (setPeopleEntities)

<br><br>

## Etape 5

Dans le composant PeopleComponent, réalisez les transformations nécessaires pour implémentez votre store
<br><br>

## Etape 6

Vérifiez votre travail en lançant la commande

```shell
npm run client -- 29-elf-store
```
