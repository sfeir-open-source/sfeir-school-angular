# Exercice 21-lazyloading (dossier apps/21-lazyloading)

L'objectif de ce workshop est de lazyloader nos trois grande fonctionnalité
- Home
- Liste de personne
- L'édition d'une personne

<br>

## Etape 1

Dans le dossier home, générez un module **HomeModule** à l'aide du CLI

Pensez à passer les options suivante:
- --flat
- --routing
- --routing-scope Child

Cette commande va vous créez dans le dossier Home, un fichier **home.module.ts** et un fichier **home-routing.module.ts**

<br><br>

## Etape 2

Analyser le fichier **home.module.ts**

Dans ce fichier
- supprimez dans la propriété imports le module CommonModule
- ajoutez dans la propriété imports le module SharedModule
- ajoutez dans la propriété declarations le composant HomeComponent

<br><br>

## Etape 3

Dans le fichier **home-routing.module.ts** , ajoutez dans le tableau des routes la route suivante
```javascript
{ path: '', component: HomeComponent}
```

<br><br>

## Etape 4

Dans le fichier **app-routing.module**m lazyloadez la route home

<br><br>

## Etape 5

Dans le module AppModule dans la propriété declarations, supprimez le composant HomeComponent

<br><br>

## Etape 6

Réitérez les précédentes étapes avec les features People et Update-Person 

<br><br>

## Etape 7

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 21-lazyloading
```

