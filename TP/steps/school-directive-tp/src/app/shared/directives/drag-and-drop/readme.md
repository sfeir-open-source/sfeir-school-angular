# TP 2: Création d'une directive de drag and drop réutilisable

## Introduction

Votre mission si toutefois vous l'acceptez est de créer une directive générique permettant de réaliser un drag and drop

Votre directive devra s'utiliser de la mainère suivante:

```angular2html
<div sfeirDragAndDrop (ondrop)="dropFile($event)"></div>
```

## Consignes

-   Votre directive devra automatiquement ajouter la classe: drop-zone sur l'élément host où elle est appliquée
-   Votre directive devra automatiquement ajouter la classe: drag-over en fonction de si on survole ou non la zone délimitée
    par votre directive
-   Votre directive doit émettre l'évènement ondrop avec comme paramètre une variable de type `<Array<File>>`
-   Appelez votre directive dans le composant AppComponent
-   Affichez le nom des fichiers que vous venez de drag and dropper

## Indications

Pour réussir à bien votre mission il vous faudra

-   créer 1 directive
-   utiliser HostListener et HostBinding

## Petit mot pour la fin

**Bon courage** :)
