# Exercice: 05-events (dossier apps/05-events)

<br>

Un bouton random a été ajouté dans le fichier **home.component.html**.

L'objectif de ce workshop est de comprendre comment interagir avec les évènements du DOM.

<br><br>

## Etape 1

Dans le fichier **home.component.html**, sur le bouton **"ajouter"**, ajoutez un événement click qui appellera la fonction **getRandomPerson**
<br><br>

## Etape 2

Dans le fichier **home.component.ts** créez une fonction **getRandomPerson**

Cette fonction doit utiliser le tableau **PEOPLE** pour choisir une personne au hasard

La formule a utiliser pour choisir une personne au hasard est la suivante:

```javascript
Math.floor(Math.random() * PEOPLE.length);
```

<br><br>

## Etape 3

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 05-events
```
