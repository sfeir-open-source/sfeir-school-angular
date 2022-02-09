# Exercice 07-router

<br>

## Etape 1

Dans le fichier **app.module.ts**, importer le module RouterModule grâce à l'import suivant:

```javascript
import { RouterModule } from '@angular/router';
```

<br><br>

## Etape 2

Dans le fichier **app.module.ts**, créez les routes nécessaires afin que les conditions suivante soient respectées

-   sur l'url / l'utilisateur doit être redirigé vers l'url /home
-   sur l'url /home. le composant HomeComponent doit être affiché
    <br><br>

## Etape 3

Dans le fichier **app.module.ts** dans le tableau des imports, enregistrez vos routes grâce a la syntax

```javascript
RouterModule.forRoot(routes);
```

<br><br>

## Etape 4

Dans le fichier **app.component.html**, indiquez où doit s'afficher vos vue grâce à la balise <router-outlet>

Astuces: pensez à supprimer la balise <sfeir-home>, c'est à votre router maintenant d'afficher cette vue
<br><br>

## Etape 5

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 07-router
```
