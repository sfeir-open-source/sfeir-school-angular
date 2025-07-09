# Exercice 23-resolver (dossier apps/23-resolver)

L'objectif de ce workshop est de créer un resolver permettant de récupérer les details d'une personne avant d'arriver sur la vue de modification d'une personne

<br>

## Etape 1

Dans le dossier update-person/guards, générez à l'aide du CLI, le resolver person-details

<br><br>

## Etape 2

Dans le fichier **person-details.resolver.ts**, injectez le service PeopleService

<br><br>

## Etape 3

Dans le fichier **person-details.resolver.ts**, et particulièrement dans la méthode resolve,

- récupérez le paramètre de la route, grâce au paramètre route de votre fonction resolve
- retournez l'appel de la fonction getPersonDetails de peopleService

Astuce:

```javascript
const idPerson = route.paramMap.get('id');
```

<br><br>

## Etape 4

Dans le module UpdatePersonModule, dans la propriété providers, ajoutez le resolver PersonDetailsResolver

<br><br>

## Etape 5

Dans le fichier **update-person-routing.module.ts**, enregistrez votre resolver

Astuce: enregistrez votre resolver avec la syntax suivant

```json
resolve: { personDetails: PersonDetailsResolver }
```

## Etape 6

Dans le composant UpdateComponent, et particulièrement dans le Hook d'initialisation, récupérez l'utilisateur

Astuce:

```typescript
this.route.data.pipe(pluck('personDetails'));
```

## Etape 7

Vérifiez votre travail en lançant la commande

```shell
npm run client -- 23-resolver
```
