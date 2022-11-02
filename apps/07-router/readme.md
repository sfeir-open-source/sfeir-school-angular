# Exercice 07-router (dossier apps/07-router)

L'objectif de ce workshop est d'introduire la notion de routeur et de single page application


<br>

## Etape 1

A la racine du dossier app, à l'aide du CLI ou à la main, créez un module **app-routing.module.ts**

<br><br>

## Etape 2

Dans le fichier **app-routing.module.ts** créez les routes nécessaires afin que les conditions suivantes soient respectées :

-  sur l'url **/** l'utilisateur doit être redirigé vers l'url **/home**
-  sur l'url **/home** le composant **HomeComponent** doit être affiché

<br><br>

## Etape 3

Dans le fichier **app-routing.module.ts** créez votre module de la manière suivante:

```typescript
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

La variable **APP_ROUTES** déclare les routes

On importe le **RouterModule.forRoot()** pour enregistrer les routes

On exporte le **RouterModule** pour exporter les routes enregistrées et les rendre disponibles dans toute l'application 

## Etape 4

Dans le fichier **app.module.ts** importez le module **AppRoutingModule** grâce à l'import suivant:

```javascript
import { AppRoutingModule } from './app-routing.module';
```

<br><br>

## Etape 5

Dans le fichier **app.component.html** indiquez où doivent s'afficher vos vues grâce à la balise **\<router-outlet>**

Astuces: pensez à supprimer la balise **\<sfeir-home>**, désormais c'est à votre router d'afficher cette vue
<br><br>

## Etape 6

Dans le fichier **app.component.html** remplacez **href="/home"** par la directive routerLink

```html
<a [routerLink]="['home']">...</a>
```

## Etape 7

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 07-router
```
