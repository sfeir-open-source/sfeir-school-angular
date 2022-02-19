# Exercice 13-pipe (dossier apps/3-pipe)

Nous venous de rajouter la date de naissance d'une personne sur la card.

Ce workshop comporte plusieurs objectifs:
- comprendre d'ou proviennent les "build-in" pipe d'Angular
- comment utiliser les "build-in" pipe d'Angular
- la syntax des pipes

<br>


## Etape 1

Dans le fichier **share.module.ts**, dans la propriété imports ajouter le module CommonModule du package @angular/common

Compréhension: Le module CommonModule exporte tous les Build-in Pipes, comme le composant CardComponent appartient au module SharedModule, si le module CommonModule n'est pas importé dans ce module, alors le composant CardComponent n'aura pas accès aux différents pipe que propose le CommonModule

## Etape 1

Dans le fichier **card.component.html**, à l'aide du pipe date d'Angular, affichez la date de naissance sous le format suivant: 'dd/MM/yyyy'
<br><br>

## Etape 2

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 12-pipe-using
```
