# Exercice 21-form-custom-validator (dossier steps/21-form-custom-validator)

<br>

## Etape 1

Dans le dossier shared/form, créer une class abstraite CustomValidators

<br><br>

## Etape 2

Dans cette class, créer une fonction static nommé sfeirEmail

Ce validator doit valider le pattern de votre adresse mail en matchant la regex suivante: /^\w+\.\w@sfeir\.com\$/

<br><br>

## Etape 3

Dans le composant FormComponent, associez ce nouveau validator au control email

Astuce, appelez votre validator de la manière suivante:

```typescript
CustomValidators.sfeirEmail;
```

<br><br>

## Etape 5

Dans le fichier **form.component.html**, affichez un message d'erreur en cas de non matching à cette regex

## Etape 6

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 18-form-b
```
