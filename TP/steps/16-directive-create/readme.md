# Exercice 16-directive-create (dossier steps/16-directive-create)

<br>

## Etape 1

A l'aide du cli dans le dossier shared, créez une directive SfeirBadge
<br><br>

## Etape 2

A l'aide de la notation **@Input**, passez en input de cette directive une propriété isManager

## Etape 3

Dans le constructor de la directive SfeirBadge, injectez les services suivants:

-   elementRef: ElementRef
-   renderer: Renderer2

## Etape 4

A l'aide du lifecycle OnInit, afficher une icon si la personne est un manager

```javascript
this.renderer.setProperty(
    this.elementRef.nativeElement,
    'innerHTML',
    '<i class="material-icons">supervisor_account</material-icons>'
);
```

## Etape 5

Dans le ficher, **people.component.html** et en mode d'affichage list, appelez la directive SfeirBadge

```html
<span sfeirBadge [isManager]="person.isManager"></span>
```

Astuce: ce morceau de code doit être placé juste après la balise h3

## Etape 6

Vérifier votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 16-directive-create
```
