# Exercice 16-template-driven-form (dossier apps/16-template-driven-form)

Le composant PeopleComponent vient d'être complété par un bouton permettant d'ouvrir une modale.

La méthode permettant d'ouvrir cette modale est déjà réalisée dans le composant, vous n'avez donc pas a vous soucier de créer cette méthode

La composant de la modale est également créé, dans le fichier **add-person-dialog.component.ts**, vous pourrez y trouver une méthode closeDialog

<br>

## Etape 1

Dans le dossier **shared/components**, et à l'aide du CLI, créez un composant **FormComponent** en pensant bien à l'exporter dans la propriété **exports** de votre module **SharedModule**

Dans le ficher **form.component.html** copiez le contenu du fichier **assets/static/form.component.html**

Dans le fichier **form.component.scss** copiez le contenu du fichier **assets/static/form.component.css**
<br><br>

## Etape 2

Dans le composant **AddPersonDialogComponent** appelez le composant **FormComponent**
<br><br>

## Etape 3

Dans le fichier **shared.module.ts** importez le module **FormsModule**

<br><br>

## Etape 4

Dans le fichier **form.component.html**, rendre le formulaire **'template driven'**

<br><br>

## Etape 5

Dans le fichier **form.component.ts** créez deux **EventEmitter**:

-   **cancel** qui n'émet aucune valeur
-   **save** qui émet la valeur du formulaire

Dans le fichier **form.component.ts** créez deux méthodes:

-   **onCancel**: qui répond a l'event **click** du bouton cancel présent dans le template
-   **onSave**: qui répond à l'event **click** du bouton save présent dans le template

Ces deux méthodes doivent émettre respectivement les **EventEmitter** **cancel** et **save**

<br><br>

## Etape 6

Dans le composant **AddPersonDialogComponent** catchez les **EventEmitter** **save** et **cancel** de votre composant **FormComponent**

-   **personAdd** doit appeler la méthode **closeDialog** avec la personne en paramètre
-   **cancel** doit appeler la méthode **onCancel** sans paramètre

<br><br>

## Etape 7

Dans le fichier **peopleService** créez une méthode **addNewPerson** qui ajoutera une personne

Endpoint: POST http://localhost:9000/api/people

<br><br>

## Etape 8

Dans le composant **PeopleComponent**, si le formulaire n'est pas **null**, créez la personne en faisant appel à votre nouvelle méthode **addNewPerson**

```javascript
 this.matDialogService
      .open(AddPersonDialogComponent, { width: '30%', height: 'fit-content' })
      .afterClosed()
      .pipe(
        filter(personForm => !!personForm),
        switchMap(personForm => this.peopleService.addNewPerson(personForm)),
        switchMap(() => {
          this.people$ = this.peopleService.getPeople().pipe(shareReplay(1));
          return this.people$;
        })
      )
      .subscribe();
```

<br><br>

## Etape 9

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 16-template-driven-form
```
