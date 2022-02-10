# Exercice 28-templating (dossier steps/28-templating)

<br>

## Etape 1

Dans le dossier shared/header, analysez le fichier **header.component.ts**

<br><br>

## Etape 2

Dans le fichier **header.component.ts**,

-   crées un Input grâce à l'annotation @Input headerTemplate de type TemplateRef<any>

Dans le fichier **header.component.html**,

-   afficher le templateRef de la variable headerTemplate grÂce à la directive structurel \*ngTemplateOutlet

<br><br>

## Etape 3

Dans le ficher **app.component.html**,

-   wrappez, la balise <mat-toolbar> dans une balise <ng-template> ayant pour reference header
-   appeler le composant HeaderComponent en prenant soin d'affectez l'input de ce composant à la référence header

<br><br>

## Etape 4

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 28-templating
```
