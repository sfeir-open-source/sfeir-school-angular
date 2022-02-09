# Exercice 17-form

Le composant PeopleComponent vient d'être complété par un bouton permettant d'ouvrir une modale.

La méthode permettant d'ouvrir cette modal est déjà réalisée dans le composant, vous n'avez donc pas a vous soucier de créer cette méthode

La composant de la modale est également créé, dans le fichier **add-dialog.component.ts**, vous pourrez y trouver deux méthodes

-   onSave
-   onCancel

<br>

## Etape 1

Dans le dossier shared, et à l'aide du CLI, créez un composant FormComponent

Dans le ficher **form.component.html**, copiez le contenue du fichier \_static/form.component.html

Dans le fichier **form.component.css**, copiez le contenue du fichier \_static/form.component.css
<br><br>

## Etape 2

Dans le composant AddDialogComponent, appelez le composant FormComponent
<br><br>

## Etape 3

Dans le fichier **app.module.ts**, importer le module FormsModule

<br><br>

## Etape 4

Dans le fichier **form.component.html**, rendre le formulaire 'template driven form'

<br><br>

## Etape 5

Dans le fichier **form.component.ts**, créez deux Event Emitter:

-   cancel qui émet aucune valeur
-   personAdd qui émet la valeur de formulaire

Dans le fichier **form.component.ts** créez deux méthodes:

-   cancel: qui répond a l'évent click du bouton cancel présent dans le template
-   save: qui répond à l'évent click du bouton save présent dans le template

Ces deux méthodes doivent émettre respectivement les event emitter cancel et personAdd

<br><br>

## Etape 6

Dans le composant AddDialogComponent, catcher les event emitter personAdd et cancel de votre composant FormComponent

-   personAdd doit appeler la méthode onSave
-   cancel doit appeler la méthode onCancel

<br><br>

## Etape 7

Dans le fichier peopleService créez une méthode createPerson qui créera une personne

Endpoint: POST http://localhost:9000/api/people

<br><br>

## Etape 8

Dans le fichier PeopleComponent, si le formulaire n'est pas null, alors créer la personne en faisant appel à votre nouvelle méthode createPerson

```javascript
this.addDialog.afterClosed().subscribe(person => {});
```

Votre code doit se placer dans la partie subscribe

<br><br>

## Etape 9

```bash
npm run client -- 17-form
```
