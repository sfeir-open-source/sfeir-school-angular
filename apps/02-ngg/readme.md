# Exercice 2: 02-ngg (dossier apps/02-ngg)

L'objectif de ce workshop est de vous entraîner à créer des composant à l'aide du CLI d'Angular

En général pour être plus productif on utilise son IDE, ce workshop a également pour objectif de vous entraîner à utiliser les fonctionnalités que vous offre votre IDE

VOus aurez aussi l'occasion d'appliquer les connaissances précédentes acquises.

<br>

## Etape 1

Dans le dossier src/app/feature, créez le composant HomeComponent grâce au CLI d'Angular.

<br><br>

## Etape 2

Analysez les fichiers que le cli vous a générés.
<br><br>

## Etape 3

Dans le fichier **home.component.ts** créez une propriété **name** avec comme valeur d'initialisation votre prénom
<br><br>

## Etape 4

Dans le fichier **home.component.html** affichez la valeur de la variable **name** grâce à la syntaxe {{ name}}
<br><br>

## Etape 5

Dans le fichier **app.module.ts** dans le tableau de la propriété bootstrap remplacez AppComponent par HomeComponent
<br><br>

## Etape 6

Dans le fichier **index.html** remplacez la baise <sfeir-app> par la balise <sfeir-home>
<br><br>

## Etape 7

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 02-ngg
```
