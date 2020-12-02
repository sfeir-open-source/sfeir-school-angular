# TP 1: Création d'une card réutilisable

## Introduction

Votre mission si vous l'acceptez est de créer un composant card générique et réutilisable
semblable à celui d'Angular Material ou Bootstrap

Votre card devra s'utiliser dans le fichier app.component.html de la manière suivante:

```html
<sfeir-card>
    <sfeir-card-title></sfeir-card-title>
    <sfeir-card-subtitle></sfeir-card-subtitle>
    <sfeir-card-content></sfeir-card-content>
    <sfeir-card-footer></sfeir-card-footer>
</sfeir-card>
```

## Consignes

-   Le titre de votre card doit posséder la classe: text-2xl
-   Le sous titre de votre card doit posséder la classe: text-xl
-   Le footer de votre card doit posséder la classe: text-sm
-   Le style et le structure html global de la card se trouve dans le dossier static (fichier à copier)
-   Le style se trouvant dans le dossier static **NE DOIT PAS ETRE MODIFIÉ**
-   La card doit être dynamique, c'est à dire que si aucun titre n'existe, aucune div contenant le titre doit être ajoutée dans le DOM

## Indication

Pour résussir à bien votre mission il vous faudra créer

-   1 composants
-   4 directives
-   Pensez à utiliser l'elementRef, le renderer, et l'annotation @ContentChild

## Petit mot pour la fin

**Bon courage** :)
