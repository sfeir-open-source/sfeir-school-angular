# Exercice 14-directive-using (dossier apps/14-directive-using)

Nous venons d'ajouter un nouvelle affichage pour la liste des personnes dans la vue du composant PeopleComponent, ainsi qu'un bouton pour le choix d'affichage (card ou list)

L'objectif de ce workshop est d'alterner entre la vue card et la vue liste

Pour ce faire, la solution technique retenue est d'utiliser la directive ngSwitch :)

<br>

## Etape 1

Dans le fichier **people.component.ts**, créez une nouvelle propriété view qui aura pour valeur "card" ou "list"

Pensez à initialisez cette variable avec le style d'affichage que vous souhaitez avoir à l'initialisation
<br><br>

## Etape 2

Dans le ficher **people.component.html** a l'aide da la directive structurelle NgSwitch, affichez l'affichage card si la propriété view a pour valeur "card" et affichez l'affichage list si la propriété view a pour valuer list
<br><br>

## Etape 3

Sur le bouton d'affichage, créez un event click qui permettra de changer le type d'affichage souhaité (card ou list)

Astuce, si c'est card alors on change la valeur de la propriété view à "list" et inversement
<br><br>

## Etape 4

Modifiez l'icon présente sur le bouton d'affichage. Si la valeur de la propriété view est "card", alors on doit afficher l'icon list, et si la valeur de la propriété view est "list", alors on affiche l'icon view_stream

Astuce: utiliser la directive structurel \*ngIf
<br><br>

## Etape 5

Vérifier votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```shell
npm run client -- 14-directive-using
```
