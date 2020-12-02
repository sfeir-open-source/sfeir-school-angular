# TP 3: Création d'un input secret

## Introduction

Votre mission si toutefois vous l'acceptez est de créer une directive permettant de modifier le type d'un input. Cette
input doit alterner entre le type 'password' et 'text'

Votre directive devra s'utiliser de la manière suivante:

```angular2html
<input [type]="type" *sfeirSecret="let type" />
```

## Consignes

-   Votre directive doit créer un composant suivant votre input
-   Ce composant doit permettre d'alterner entre le type text et le type password
-   Appeler cette directive sur l'input présent dans le fichier app.component.html

## Indications

-   Pensez à utiliser le provider componentFactoryResolver
-   Pensez à utiliser le templateRef
-   Pensez à utiliser la notion de context implicit (\$implicit)
-   Pensez à alterner également l'icon permettant de changer le type

## Petit mot pour la fin

**Bon courage**
