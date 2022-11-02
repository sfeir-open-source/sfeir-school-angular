# Exercice 25-teleportation (dossier apps/25-teleportation)

L'objectif de ce workshop est de téléporter le template du header dans le composant sfeir-header

Ce Workshop vous permettra aussi de vous familiariser avec la directive structurelle *ngTemplateOutlet

<br>

## Etape 1

Dans le dossier **core**, créez un dossier **components**

<br><br>

## Etape 2

Dans le dossier **core/components**, à l'aide du CLI, générez un composant **Header**

Pensez à enregistrer ce composant dans les **declarations** et **exports** de votre **CoreModule**

## Etape 3

Dans le module **CoreModule**, ajoutez le module **SharedModule** aux **imports**

<br><br>

## Etape 4

-   Dans le fichier **header.component.ts** créez un **Input** (grâce à l'annotation **@Input**) **headerTemplate** de type **TemplateRef\<MatToolbar>**


-   Dans le fichier **header.component.html** affichez le **templateRef** de la variable **headerTemplate** grâce à la directive structurelle ***ngTemplateOutlet**

<br><br>

## Etape 5

Dans le ficher **app.component.html** :

-   wrappez la balise **\<mat-toolbar>** dans une balise **\<ng-template>** ayant pour référence **header**
-   appelez le composant **HeaderComponent** en prenant soin d'affecter l'input de ce composant à la référence de votre **ngTemplate**


Astuce:

```html
<sfeir-header [headerTemplate]="votre_reference_ng_template"></sfeir-header>
```

<br><br>

## Etape 6

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 25-teleportation
```
