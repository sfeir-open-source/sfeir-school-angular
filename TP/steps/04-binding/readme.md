# Exercice 04-binding (dossier steps/04-binding)

<br>

Dans le dossier src/app/\_static, vous trouverez les mocks, template et style nécessaire à la réalisation de l'exercice

## Etape 1

Dans le ficher \_home.component.html** copiez le contenue du template dans le dossier static
Dans le fichier \_home.component.css** copiez le contenue du style dans le dossier static
<br><br>

## Etape 2

Dans le fichier **home.component.ts** importer le le fichier de mock people grâce à l'import suivant:

```typescript
import { PEOPLE } from '../_static/people';
```

Déclarez une variable person initialisé à un objet vide

Dans la fonction ngOnInit, récupérez la première personne du tableau de people que vous venez d'importer et settez la variable people à cette personne
<br><br>

## Etape 3

Dans le fichier **home.component.html** réaliser le binding
<br><br>

## Etape 4

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 04-binding
```
