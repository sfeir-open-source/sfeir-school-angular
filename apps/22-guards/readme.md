# Exercice 22-guards (dossier apps/22-guards)

L'objectif de ce workshop est de vous faire écrire un guard qui vérifie que l'id de l'utilisateur est bien formaté

<br>

## Etape 1

Dans le dossier update-person, créez un dossier guards

<br><br>

## Etape 2

Dans le dossier guards créez un guard update à l'aide du CLI qui va implémenter l'interface canActivate

Astuce: passez l'option --implements [canActivate]

<br><br>

## Etape 3

Implémentez votre guard qui doit respectez les condition suivante:

- si l'id de la personne ne respecte pas le pattern: [a-z0-9]{24} alors il faut retourner sur la page home

<br><br>

## Etape 4

Dans le module UpdatePerson module, dans la propriété providers, ajoutez votre guard

<br><br>

## Etape 5

Dans le module UpdatePersonRoutingModule, protégez votre route avec votre guard

```javascript
{ path: '', component: UpdatePersonComponent, canActivate: [UpdateGuard] }
```

<br><br>

## Etape 6

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 22-guards
```

