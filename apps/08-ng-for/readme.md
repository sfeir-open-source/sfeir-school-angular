# Exercice 08-ng-for (dossier apps/08-ng-for)

L'objectif de ce workshop est:

- d'utiliser la directive ngFor
- appliquer les connaissances précédemment acquises avec le routing

<br/><br/>

## Etape 1

Dans le dossier app/feature, créer le composant people

<br/><br/>

## Etape 2

Dans le fichier **app-routing.module.ts**, ajoutez la nouvelle route /people qui permettra d'afficher la liste des personnes

<br/><br/>

## Etape 3

Copier le contenue du fichier **home.component.html** dans le fichier **people.component.html** et le contenu du fichier **home.component.scss**
dans le fichier **people.component.scss**

<br/><br/>

## Etape 4

Dans le fichier **people.component.ts**, récupérer la liste des personnes à l'aide de l'endpoint: http://localhost:9000/api/peoples

<br/><br/>

## Etape 5

Dans le fichier **people.component.html**, à l'aide de la directive \*ngFor, dupliquez la card de la personne

Astuce:

```html
<mat-card *ngFor="let person of people"></mat-card>
```

## Etape 6

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```shell
npm run client -- 08-ng-for
```
