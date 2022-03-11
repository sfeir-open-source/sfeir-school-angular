# Exercice 09-input (dossier apps/09-input)

Ce workshop a plusieurs buts:
- comprendre le fonctionnement d'une application modulaire
- comprendre le fonctionnement des inputs en Angular et à quoi peut servir la création de composant

<br>

## Etape 1

Dans le dossier src/app:
- créez un dossier shared
<br><br>

## Etape 2

Dans ce dossier shared et à l'aide du CLI
- créez un module shared
<br><br>

## Etape 3

Déplacez le fichier **material-design-module.ts** dans le dossier shared

Dans le ficher **shared.module.ts**
- dans la propriété imports ajoutez votre MaterialDesignModule
- dans la propriété exports, ajoutez votre MaterialDesignModule

Dans le fichiez **app.module.ts**
- dans la propriété imports retirez le module MaterialDesignModule
- dans la propriété imports ajoutez le module SharedModule

<br><br>

## Etape 4

Lancez l'application à l'aide de la commande suivante, pour vérifier que tout fonctionne comme avant:
```bash
npm run client -- 09-input
```

<br><br>

## Etape 5

Dans le dossier shared. créez un dossier components

Dans ce dossier components, et à l'aide du CLI, créer le composant card

Astuce: pensez bien à importer et exporter votre composant dans le SharedModule

<br><br> 

## Etape 6

A l'aide du ficher **home.component.html**, copiez le contenue de la card dans le fichier **card.component.html**
A l'aide du fichier **card.component.css**, copiez le contenue du style de la card dans le fichier **card.component.css**
<br><pr>

## Etape 7

Dans le fichiez **card.component.ts** créez un input person à l'aide de l'annotation **@Input()**
<br><br>

## Etape 8

Dans le fichier **home.component.html** remplacez le contenue du fichier **home.component.html** par votre nouveau composant CardComponent en appelant la balise <sfeir-card> et en passant la person en input
<br><br>

## Etape 9

Dans le fichier **people.component.html**, remplacez le contenue de la card par le composant CardComponent en appelant la balise <sfeir-card>

Indice:  pensez à utiliser la directive *ngFor sur cette balise pour afficher une card par person

## Etape 6

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 09-input
```
