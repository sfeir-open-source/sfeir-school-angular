# Exercice 04-binding (dossier apps/04-binding)

L'objectif de ce workshop est d'afficher le détail d'un utilisateur à travers une card

Vous allez dont utiliser la syntaxe des bindings pour afficher nom prénom photo etc

Dans le dossier src/assets/static, vous trouverez les mocks, template et style nécessaire à la réalisation de l'exercice

<br>

## Etape 1

Dans le ficher **home.component.html** copiez le contenue du fichier **home.component.html** du dossier static
Dans le fichier **home.component.css** copiez le contenue du fichier **home.component.css** du dossier static
<br><br>

## Etape 2

Dans le fichier **home.component.ts** importer le le fichier de mock people grâce à l'import suivant:

```typescript
import { PEOPLE } from '../../mocks/people.mock';
```

Déclarez une variable person de type People

Dans la fonction ngOnInit, récupérez la première personne du tableau de people que vous venez d'importer et settez la variable person à cette personne
<br><br>

## Etape 3

Dans le fichier **home.component.html** réalisez le binding
<br><br>

## Etape 4

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```shell
npm run client -- 04-binding
```
