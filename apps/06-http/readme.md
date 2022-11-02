# Exercice 06-http (steps/06-http)

Le premier objectif de ce workshop est de comprendre comment utiliser le module HttpClient d'Angular

Le second est de présenter les fichiers d'environnement d'Angular

<br>

## Etape 1

Importez le module **HttpClientModule** grâce à l'import suivant:

```javascript
import { HttpCLientModule } from '@angular/common/http';
```

Dans le fichier **app.module.ts**, dans la propriété **imports**, ajoutez le module **HttpClientModule**
<br><br>

## Etape 2 

Dans le fichier **environment/environment.ts** ajoutez une propriété **peopleEndpoint** avec pour valeur: http://localhost:9000/api


## Etape 3

Dans le fichier **home.component.ts** injectez le provider **HttpClient**

Dans le fichier **src/main.ts** importez votre fichier d'environnement grâce à l'import suivant:

```javascript
import { environment } from '../../../environments/environment';
```

<br><br>

## Etape 4

Dans la fonction **ngOnInit** réalisez le call nécessaire pour récupérer la liste des peoples

L'API à utiliser est la suivante: http://localhost:9000/api/peoples

Astuce: Pensez à utiliser votre fichier d'environnement pour éviter d'écrire tout l'url
<br><br>

## Etape 5

Dans la fonction **random** réalisez le call nécessaire pour récupérer une personne de manière aléatoire

L'API à utiliser est la suivante: http://localhost:9000/api/peoples/random

Astuce: Pensez à utiliser votre fichier d'environnement pour éviter d'écrire tout l'url
<br><br>

## Etape 6

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 06-http
```
