# Exercice: 01:hands-on (dossier apps/01-hands-on)

Le but de cet exercice est de comprendre comment fonctionne le bootstrapping d'une application angular

Actuellement si vous lancez l'application une erreur va s'afficher dans l'inspecteur de votre navigateur.

Cet exercice a pour but de corriger cette erreur :) 

<br>

## Etape 1

Dans le dossier **src/app** créez le composant **AppComponent**, ce composant doit posséder une properties **name** avec pour valeur votre prénom
<br><br>

## Etape 2

Dans le fichier **app.module.ts**, et particulièrement dans les propriétés **declarations** et **bootstrap**, ajoutez le composant **AppComponent**
<br><br>

## Etape 3

Dans le fichier **app.component.html** affichez la valeur de la variable **name**, grâce à la syntax **{{ name }}** qui est la syntax de l'interpolation en Angular
<br><br>

## Etape 4

Vérifiez votre travail en vous plaçant à la racine du dossier workshop et en lançant la commande:

```bash
npm run client -- 01-hands-on
```
