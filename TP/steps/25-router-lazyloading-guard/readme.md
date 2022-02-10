# Exercice 25-router-lazyloading-guard (dossier steps/25-router-lazyloading-guard)

<br>

## Etape 1

Dans le fichier **app.module.ts**

-   retirez la route /secret du tableau de routes
-   retirez le composant SecretComponent des déclarations de votre module
-   supprimez l'import de ce composant de vos imports

<br><br>

## Etape 2

Dans le dossier secret, et particulièrement dans le fichier **secret.module.ts**

-   créez une route avec pour valeur comme path: '', et comme valeur pour component: SecretComponent
-   enregistrez vos routes grâce à la syntax RouterModule.forChild(ROUTE)

<br><br>

## Etape 3

Dans le fichier **app.module.ts**, créer une route lazyloader sur le path: 'secret'

<br><br>

## Etape 4

Dans le dossier access-secret-guard et particulièrement dans le fichier **access-secret.guard.ts**, analysez le fichier

<br></br>

## Etape 5

Dans la méthode canLoad, réaliser la logique permettant d'empêcher l'accès à la route secret

Astuce: utiliser la syntaxe suivante: window.location.hash.includes('who=me');

<br><br>

## Etape 6

Dans le fichier **app.module.ts**, utilisez votre guard sur la route 'secret', en le déclarant sur la propriété canLoad de la route

<br><br>

## Etape 7

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 25-router-lazyloading-guard
```
