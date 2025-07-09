# Exercice 20-reactive-form-custom-validator (dossier apps/20-reactive-form-custom-validator)

L'objectif de ce workshop est de vous faire créer un validateur de formulaire custom

<br>

## Etape 1

Dans le fichier **shared/components/form/form.ts**, créez une fonction static nommé 'sfeirEmailValidator'

Ce validator doit valider le pattern de votre adresse mail en matchant la regex suivante: /^\w+\.\w@sfeir\.com\$/

<br><br>

## Etape 3

Dans le fichier **form.ts** enregistrez votre custom validateur sur le control Email, celui doit être requis et respecter votre pattern de l'address mail

Astuce, appelez votre validator de la manière suivante:

```typescript
PersonForm.sfeirEmailValidator;
```

<br><br>

## Etape 5

Dans le fichier **form.component.html**, affichez un message d'erreur en cas de non matching à cette regex

## Etape 6

Vérifiez votre travail en lançant la commande suivante:

```shell
npm run client -- 20-reactive-form-custom-validator
```
