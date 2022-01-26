# Exercice 06-http (steps/06-http)

<br>

## Etape 1

Importer le module HttpClientModule grâce à l'import suivant:

```javascript
import { HttpCLientModule } from '@angular/common/http';
```

Dans le fichier **app.module.ts** dans le tableau de la propriété imports imports, ajouter le module HttpClientModule
<br><br>

## Etape 2

Dans le fichier **home.component.ts**, injecter le provider HttpClient
<br><br>

## Etape 3

Dans la fonction ngOnInit, réaliser le call nécessaire pour récupérer la liste des peoples
L'Api à utiliser est la suivante: http://localhost:9000/api/peoples
<br><br>

## Etape 4

Dans la fonction random, réaliser le call nécessaire pour récupérer une personne de manière aléatoire
L'Api à utiliser est la suivante: http://localhost:9000/api/peoples/random
<br><br>

## Etape 5

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 06-http
```
