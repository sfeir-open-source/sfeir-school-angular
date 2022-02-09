# Exercice: 08-ngFor (dossier steps/08-ngFor)

<br>

## Etape 1

Dans le dossier src/app et à l'aide du CLI, créez le composant PeopleComponent
<br><br>

## Etape 2

Copiez le template du composant HomeComponent dans le template du composant PeopleComponent
Copiez le style du composant PHomeComponent dans le style du composant PeopleComponent
<br><br>

## Etape 3

Dans le fichier, **people.components.ts**, déclarez une propriété people et initialisez là à un tableau vide

Dans la fonction ngOnInit, réaliser l'appel au serveur nécessaire pour récupérer la liste des personnes
<br><br>

## Etape 4

Dans le fichier **people.component.html** utiliser la directive \*ngFor pour dupliquer la card autant de fois qu'il y a de personnes
<br><br>

## Etape 5

Dans le fichier **app.module.ts** ajouter une nouvelle route qui affiche le composant PeopleCOmponent quand l'utilisateur navigue vers /people

## Etape 6

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 08-ngfor
```
