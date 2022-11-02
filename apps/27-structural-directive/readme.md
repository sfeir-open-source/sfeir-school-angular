# Exercice 27-structural-directive (dossier apps/27-structural-directive)

L'objectif de ce workshop est de vous permettre d'écrire votre première directive structurelle.

Cette directive permlettra d'afficher des éléments du template en fonction d'une certaine condition.

Comme vous avez pu le comprendre c'est la directive *ngIf en simplifiée.

On peut uniquement éditer et supprimer les personnes qui ne sont pas manager. 

<br>

## Etape 1

Dans le dossier **shared/directives** créez à l'aide du CLI la directive **display**

Pensez à l'ajouter dans la propriété **imports** de votre **SharedModule**

<br><br>

## Etape 2

Dans le fichier **display.directive.ts** créez un input aliasé (sfeirDisplay) **condition** qui sera utilisé pour évaluer votre condition


Astuce: 
```javascript
@Input('sfeirDisplay') set condition(condition: boolean) {
    // Your logic od display
}
```
<br><br>

## Etape 3

Dans le ficher **display.directive.ts** injectez dans le constructor de la directive les services suivants :

-   **templateRef** de type **TemplateRef\<any>**
-   **viewContainerRef** de type **ViewContainerRef**

<br><br>

## Etape 4

Dans le fichier **display.directive.ts**, et dans votre setter de l'input **condition**, implémentez votre logique


```typescript
this.viewContainer.createEmbeddedView(this.templateRef);
```

SI la condition n'est pas respectée, alors supprimez le template où se trouve la directive

```typescript
this.viewContainer.clear();
```

<br><br>

## Etape 5

Dans le composant **CardComponent**:
- wrappez à l'aide d'une balise **\<ng-container>** les liens d'édition et de suppression
- appliquez votre directive **ngDisplay** sur cette balise

<br><br>

## Etape 5

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 27-structural-directive
```
