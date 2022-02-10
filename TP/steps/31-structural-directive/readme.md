# Exercice 31-structural-directive

<br>

## Etape 1

Dans le dossier shared/display, et plus particulièrement dans le fichier **display.directive.ts**, créez

-   un input aliasé (ngDisplay) condition qui sera utilisé pour évaluer votre condition

<br><br>

## Etape 2

Dans le ficher **display.directive.ts**, injectez dans le constructor de la directive les service suivant

-   templateRef de type TemplateRef<any>
-   viewContainerRef de type ViewContainerRef

<br><br>

## Etape 3

Dans le fichier **display.directive.ts**, implémentez le hook OnChange

Dans la fonction ngOnChanges, si la condition est respecté alors afficher le template ou se trouve la directive

```typescript
this.viewContainer.createEmbeddedView(this.templateRef);
```

SI la condition n'est pas respecté, alors supprimer le template ou se trouve la directive

```typescript
this.viewContainer.clear();
```

<br><br>

## Etape 4

Dans le composant CardComponent, utiliser votre directive sur le nom et prénom de la personne qui doit s'afficher si cette personne est manager

<br><br>

## Etape 5

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 31-structural-directive
```
