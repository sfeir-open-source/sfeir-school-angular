# Exercice: 05-events (dossier steps/05-events)

<br>

Un bouton random a été ajouté dans le fichier **home.component.html**
<br><br>

## Etape 1

Dans le fichier **home.component.html** sur le bouton ajoutez un évènement click qui appellera la fonction getRandomUser
<br><br>

## Etape 2

Dans le fichier **home.component.ts** créez une fonction getRandomUser.

Cette fonction doit exploiter le tableau PEOPLE pour choisir une personne au hasard.

La formule a utiliser pour choisir une personne au hasard est la suivante:

```javascript
Math.floor(Math.random() * PEOPLE.length);
```

<br><br>

## Etape 3

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 04-events
```
