# Exercice 19-reactive-form (dossier apps/19-reactive-form)

<br>

## Etape 1

Dans le fichier **shared.module.ts**, remplacez le module FormsModule par le module ReactiveFormsModule

<br><br>

## Etape 2

Dans le composant FormComponent, réalisez les changement nécessaire pour transformer votre formulaire en ReactiveForms (pensez bien à typer votre formulaire)

Créer une propriété personForm: FormGroup<PersonForm>

Astuce: Utiliser les validators suivants pour réaliser vos validations

-   required --> Validator.require
-   minLength --> Validator.minLength(2)
-   pattern --> Validator.pattern(/\d{10}/)

Pensez à bien prendre en compte le mode Update

<br><br>

## Etape 3

Dans la méthode onSave, et particulièrement lorsque vous appelez votre event emitter remplacez le paramètre this.person par this.personForm.value

<br><br>

## Etape 4

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 18-form-b
```
