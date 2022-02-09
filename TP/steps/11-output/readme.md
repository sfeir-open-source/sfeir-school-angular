# Exercice 11-output (dossier/steps/11-output)

<br>

## Etape 1

Dans le fichier **card.component.ts**, créez un évènement personDelete
<br><br>

## Etape 2

Dans le fichier **card.component.html**, sur l'icon poubelle, réaliser l'évènement click
<br><br>

## Etape 3

Dans le fichier **card.component.ts**, créez une fonction qui réagira à l'évènement click sur l'icon poubelle.
Cette fonction doit pouvoir émettre l'évènement personDelete avec en paramètre la personne
<br><br>

## Etape 4

Dans le composant **PeopleComponent** réagissez à l'émission de l'évènement personDelete en supprimant la personne concernée concernée par cette évènement.

l'api à utiliser pour supprimer une personne est la suivante: http://localhost:9000/api/peoples/:id
Attention cette api renvoie une liste de personnes à jour
<br><br>

## Etape 5

Dans le composant **HomeComponent**, réagissez à l'émission de l'évènement personDelete en sélectionnant au hasard une nouvelle personne.
Pensez à utiliser une nouvelle fois la fonction **random** pour éviter de dupliquer du code
<br><br>

## Etape 6

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 11-output
```
