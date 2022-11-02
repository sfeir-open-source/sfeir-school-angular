# Exercice 21-lazyloading (dossier apps/21-lazyloading)

L'objectif de ce workshop est de lazyloader nos trois grandes fonctionnalités :
- Home
- Liste de personnes
- L'édition d'une personne

<br>

## Etape 1

Dans le dossier home générez un module **HomeModule** à l'aide du CLI

Pensez à passer les options suivantes:
- **--flat**
- **--routing**
- **--routing-scope Child**

Cette commande va vous créer dans le dossier **home** un fichier **home.module.ts** et un fichier **home-routing.module.ts**

<br><br>

## Etape 2

Analysez le fichier **home.module.ts**

Dans ce fichier
- supprimez dans la propriété **imports** le module **CommonModule**
- ajoutez dans la propriété **imports** le module **SharedModule**
- ajoutez dans la propriété **declarations** le composant **HomeComponent**

<br><br>

## Etape 3

Dans le fichier **home-routing.module.ts** ajoutez la route suivante au tableau des routes :
```javascript
{ path: '', component: HomeComponent}
```

<br><br>

## Etape 4

Dans le fichier **app-routing.module** lazyloadez la route **/home**

<br><br>

## Etape 5

Dans le module **AppModule**, dans la propriété **declarations**, supprimez le composant **HomeComponent**

<br><br>

## Etape 6

Réitérez les précédentes étapes avec les features **People** et **Update-Person** 

<br><br>

## Etape 7

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 21-lazyloading
```

