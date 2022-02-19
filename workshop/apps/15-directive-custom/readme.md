# Exercice 15-directive-custom (dossier apps/15-directive-custom)

L'objectif de ce workshop est de créer votre propre directive

Nous introduirons également le concepts d'input aliasé afin d'éviter du boilerplating dans le template au moment de l'utilisation de cette directive

<br>

## Etape 1

Dans le dossier shared, créez un dossier directives

<br><br>

## Etape 2

A l'aide du CLI dans le dossier directives, créez une directive Badge, pensez bien à exporter cette directive dans la propriété exports de votre module SharedModule
<br><br>

## Etape 3

A l'aide de la notation **@Input**, passez en input de cette directive une propriété isManager

Pensez à aliasé cet Input avec l'alias **sfeirBadge**

Indices: @Input('sfeirBadge') isManager: boolean
<br><br>

## Etape 4

Dans le constructor de la directive SfeirBadge, injectez les services suivants:

-   elementRef: ElementRef
-   renderer: Renderer2

## Etape 5

A l'aide du lifecycle OnInit, affichez une icon si la personne est un manager

```javascript
this.renderer.setProperty(
    this.elementRef.nativeElement,
    'innerHTML',
    '<i class="material-icons">supervisor_account</material-icons>'
);
```

## Etape 6

Dans le ficher, **people.component.html** et en mode d'affichage list, appelez la directive SfeirBadge

```html
<span [sfeirBadge]="person.isManager"></span>
```

Astuce: ce morceau de code doit être placé juste après la balise h3

## Etape 7

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 15-directive-custom
```
