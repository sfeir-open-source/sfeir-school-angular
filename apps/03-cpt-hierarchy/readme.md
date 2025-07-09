# Exercice: 03-cpt-hierarchy (dossier apps/03-cpt-hierarchy)

L'objectif de ce workshop est de créer un arbre de composant.

L'idée est donc d'appeler le composant HomeComponent dans le composant AppComponent

<br>

## Etape 1

Dans le fichier **app.component.html** appelez la balise <sfeir-home> au lieu de la balise <mat-card>
<br><br>

## Etape 2

Dans le fichier **app.module.ts** remplacez dans le tableau de la propriété bootstrap: HomeComponent par AppComponent
<br><br>

## Etape 3

Dans le fichier **index.hml** remplacez la balise <sfeir-home> par la balise <sfeir-app>
<br><br>

## Etape 4

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```shell
npm run client -- 03-cpt-hierarchy
```
