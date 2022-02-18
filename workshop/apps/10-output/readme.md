# Exercice 11-output (apps/11-output)

L'objectif de ce workshop est de vous faire comprendre comment fonctionne la communication enfant --> parents en Angular

L'idée est de réagir à l'évènement 'personDelete' en fonction du context où se trouve la card

<br>

## Etape 1

Dans le fichier **card.component.ts**, créez un évènement personDelete

Cette évènement doit renvoyer la personne que l'on souhaite supprimer
<br><br>

## Etape 2

Dans le fichier **card.component.html**, sur l'icon poubelle, réaliser l'évènement click

<br><br>

## Etape 3

Dans le fichier **card.component.ts**, créez une fonction qui réagira à l'évènement click sur l'icon poubelle.
Cette fonction doit pouvoir émettre l'évènement personDelete avec en paramètre la personne
<br><br>

## Etape 4

Dans le composant **PeopleComponent** réagissez à l'émission de l'évènement personDelete en supprimant la personne concernée par cette évènement.

Astuce: l'api à utiliser pour supprimer une personne est la suivante: http://localhost:9000/api/peoples/:id
Attention cette api renvoie une liste de personnes à jour
<br><br>

## Etape 5

Dans le composant **HomeComponent**, réagissez à l'émission de l'évènement personDelete en sélectionnant au hasard une nouvelle personne.
Pensez à utiliser une nouvelle fois la fonction **random** pour éviter de dupliquer du code
<br><br>

## Etape 6

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 10-output
```
