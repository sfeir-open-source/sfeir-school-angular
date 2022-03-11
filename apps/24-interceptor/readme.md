# Exercice 24-interceptor (dossier app/24-interceptor)

L'objectif de ce tp est de vous permettre d'écrire un interceptor. L'objectif est d'envoyer pour au serveur pour chaque requête le header Authorization: Sfeir 

<br>

## Etape 1

Dans le dossier core/interceptors, générez à l'aide du CLI, l'intercepteur authorization

<br><br>

## Etape 2

Dans la méthode intercept, réalisez un clone de la requête d'entrée afin de setter le header Authorization à la valeur sfeir

<br><br>

## Etape 3

Dans le fichier **core.module.ts**, enregistrez votre interceptor dans la propriété providers de votre module

<br><br>

## Etape 4

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 23-resolver
```

