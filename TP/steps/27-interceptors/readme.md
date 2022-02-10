# Exercice 27-interceptors (dossier steps/27-interceptors)

<br>

## Partie 1 (intercepteur d'authorization)

<br>

### Etape 1

Dans le dossier shared/interceptors, analysez le fichier **authorization.interceptor.ts**

<br><br>

### Etape 2

Dans la méthode intercept, réalisez un clone de la requête d'entrée afin de setter le header Authorization à la valeur sfeir

<br><br>

## Etape 3

Dans le fichier **app.module.ts**, enregistrez votre interceptor dans la propriété providers de votre module

<br><br>

## Partie 2

### Etape 1

Dans le dossier shared/interceptors, analysez le fichier **cachable.interceptor.ts**

<br><br>

### Etape 2

Dans le fichier créez une constante CACHABLE qui aura pour valeur une instance de HttpContextToken

Pensez à exportez cette variable

<br><br>

### Etape 3

Dans le fichier **cachable.interceptor.ts** ,dé-commentez, le user de mock

Dans le fichier **cachable.interceptor.ts**, dans la méthode intercept:

-   récupérez le context CACHABLE de votre requête
-   si le context CACHABLE est true, alors renvoyer une réponse mockée, (of(new HttpResponse({ status: 200, body: MOCK_PERSON })))
-   si le context CACHABLE est à false, alors envoyer le requête

<br><br>

### Etape 4

Dans le fichier **people.service.ts**, et particulièrement dans la méthode fetchRandom

-   settez le context CACHABLE à true

Astuce:

```javascript
{
    context: new HttpContext().set(CACHABLE, true);
}
```

<br><br>

### Etape 5

Dans le fichier **app.module.ts**, enregistrez votre interceptor dans la propriété providers de votre module

<br><br>

## Etape 6

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 27-interceptors
```
