# Exercice 19-form-validation (dossier steps/19=form-validation)

<br>

## Etape 1

Dans le composant FormComponent, et particulièrement dans le fichier **form.component.html** ajouter les règles de validations suivantes:

-   firstname --> required et minLength à deux caractères
-   lastname --> required et minLength à deux caractères
-   email --> required
-   phone --> required et pattern (\d{10})

<br><br>

## Etape 2

A l'aide de la balise mat-error de material, afficher les messages d'erreur adéquat

Astuce: voici un example

```html
<mat-form-field appearance="outline">
    <mat-label>First name</mat-label>
    <input
        type="text"
        matInput
        placeholder="First name"
        [(ngModel)]="person.firstname"
        name="firstname"
        #firstName="ngModel"
        required
        minlength="2"
    />
    <mat-error *ngIf="firstName.errors?.required">Ce champs est requis</mat-error>
</mat-form-field>
```

<br><br>

## Etape 3

Désactivez le bouton submit si le formulaire n'est pas valide

<br><br>

## Etape 4

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 18-form-b
```
