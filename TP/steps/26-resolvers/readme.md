# Exercice 26-resolvers (dossier steps/26-resolvers)

<br>

## Etape 1

Dans le dossier shared/resolver, analysez le fichier **user.resolver.ts**,

Passez en paramètre de la méthode resolve, le paramètre route: ActivatedRouteSnapshot

<br><br>

## Etape 2

Dans le fichier **user.resolver.ts**, injecter le service PeopleService

<br><br>

## Etape 3

Dans le fichier **user.resolver.ts**, et particulièrement dans la méthode resolve,

-   récupérez le paramètre de la route, grâce au paramètre route de votre fonction resolve
-   retournez l'appel de la fonction fetchOne de peopleService

<br><br>

## Etape 4

Dans le fichier **app.module.ts**, enregistrez le resolver sur la route /edit/:id

Astuce: enregistrez votre resolver avec la syntax suivant

```json
resolve: { user: UserDetailsResolver }
```

## Etape 5

Dans le composant UpdateComponent, et particulièrement dans le Hook d'initialisation, récupérez l'utilisateur

Astuce:

```typescript
this.route.data.subscribe(votre code)
```

## Etape 6

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 26-resolvers
```
