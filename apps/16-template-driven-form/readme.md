# Exercice 16-template-driven-form (dossier apps/16-template-driven-form)

Le composant PeopleComponent vient d'être complété par un bouton permettant d'ouvrir une modale.

La méthode permettant d'ouvrir cette modal est déjà réalisée dans le composant, vous n'avez donc pas a vous soucier de créer cette méthode

La composant de la modale est également créé, dans le fichier **add-person-dialog.component.ts**, vous pourrez y trouver une méthode

- closeDialog

<br>

## Etape 1

Dans le dossier shared/components, et à l'aide du CLI, créez un composant FormComponent en pensant bien à l'exporter dans la propriété exports de votre module SharedModule

Dans le ficher **form.component.html**, copiez le contenue du fichier assets/static/form.component.html

Dans le fichier **form.component.scss**, copiez le contenue du fichier assets/static/form.component.css
<br><br>

## Etape 2

Dans le composant AddPersonDialogComponent, appelez le composant FormComponent
<br><br>

## Etape 3

Dans le fichier **shared.module.ts**, importez le module FormsModule

<br><br>

## Etape 4

Dans le fichier **form.component.html**, rendre le formulaire 'template driven form'

<br><br>

## Etape 5

Dans le fichier **form.component.ts**, créez deux Event Emitter:

- cancel qui émet aucune valeur
- save qui émet la valeur de formulaire

Dans le fichier **form.component.ts** créez deux méthodes:

- onCancel: qui répond a l'évent click du bouton cancel présent dans le template
- onSave: qui répond à l'évent click du bouton save présent dans le template

Ces deux méthodes doivent émettre respectivement les event emitter cancel et save

<br><br>

## Etape 6

Dans le composant AddPersonDialogComponent, catcher les event emitter save et cancel de votre composant FormComponent

- personAdd doit appeler la méthode closeDialog avec la personne en paramètre
- cancel doit appeler la méthode onCancel sans paramètre

<br><br>

## Etape 7

Dans le fichier peopleService créez une méthode addNewPerson qui créera une personne

Endpoint: POST http://localhost:9000/api/people

<br><br>

## Etape 8

Dans le fichier PeopleComponent, si le formulaire n'est pas null, alors créez la personne en faisant appel à votre nouvelle méthode addNewPerson

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
    }),
  )
  .subscribe();
```

<br><br>

## Etape 9

```shell
npm run client -- 16-template-driven-form
```
