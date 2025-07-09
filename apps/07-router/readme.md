# Exercice 07-router (dossier apps/07-router)

L'objectif de workshop est d'introduire la notion de routeur et de single page application au sein de votre application web.

<br>

## Etape 1

A la racine du dossier app, créez un module **app-routing.module.ts** à l'aide du CLI ou à la main comme vous le souhaitez

<br><br>

## Etape 2

Dans le fichier **app-routing.module.ts**, créez les routes nécessaires afin que les conditions suivantes soient respectées

- sur l'url /l'utilisateur doit être redirigé vers l'url /home
- sur l'url /home. le composant HomeComponent doit être affiché

<br><br>

## Etape 3

Dans le fichier **app-routing,module.ts**, créez votre module de la manière suivante:

```typescript
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

la variable APP_ROUTES est la déclaration de vos routes

Nous importons le RouterModule.forRoot() pour enregistrer nos routes

Nous exportons le RouterModule pour exporter nos routes enregistrés et les rendre disponibles dans toute notre application

## Etape 4

Dans le fichier **app.module.ts**, importez le module AppRoutingModule grâce à l'import suivant:

```javascript
import { AppRoutingModule } from './app-routing.module';
```

<br><br>

## Etape 5

Dans le fichier **app.component.html**, indiquez où doit s'afficher vos vue grâce à la balise <router-outlet>

Astuces: pensez à supprimer la balise <sfeir-home>, c'est à votre router maintenant d'afficher cette vue
<br><br>

## Etape 6

Dans le fichier **app.component.html**, remplacez href="/home" par la directive routerLink

```html
<a [routerLink]="['home']">...</a>
```

## Etape 7

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```shell
npm run client -- 07-router
```
