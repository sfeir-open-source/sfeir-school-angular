<!-- .slide -->

# Les différents types de binding

<table>
    <thead>
        <tr>
            <td>Direction</td>
            <td>Syntaxe</td>
            <td>Type</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Unidirectionnel: modèle vers vue</td>
            <td>
                <p>{{ expression }}</p>
                <p>[targetFooBar] = expression</p>
                <p>bindTargetFooBar = expression</p>
            </td>
            <td>
                <p>Interpolation</p>
                <p>Propriétés</p>
                <p>Classe</p>
                <p>Attribut</p>
                <p>Style</p>
            </td>
        </tr>       
    </tbody>
</table>

##==##

<!-- .slide -->

# Les différents types de binding

<table>
    <thead>
        <tr>
            <td>Direction</td>
            <td>Syntaxe</td>
            <td>Type</td>
        </tr>
    </thead>
    <tbody>        
        <tr>
            <td>Unidirectionnel: vue vers modèle</td>
            <td>
                <p>(targetFooBar) = expression</p>
                <p>onTargetFooBar = expression</p>
            </td>
            <td>Evènements</td>
        </tr>
        <tr>
            <td>Bidirectionnel</td>
            <td>
                <p>[(targetFooBar)] = expression</p>
                <p>bindonTargetFooBar = expression</p>
            </td>
            <td>Bidirectionnel</td>
        </tr>
    </tbody>
</table>

##==##

<!-- .slide: class="with-code inconsolata" -->

# Interpolation et expression

Interpolation: <br>

```html
<div>Hello {{ name }}</div>
<img src="{{ myUrl }}" />
```

<!-- .element: class="medium-code" -->

Expression: <br>

-   Dans le context du composant
-   Du Javascript mais !!
    -   pas d'affectation (sauf pour les events comme le click sur un boutton)
    -   pas d'accès aux variables globales (window, document, ...)
    -   Pour les opérateurs logiques, tout est évalué
    -   Pas de new, ++, --

##==##

<!-- .slide: class="two-column-layout" -->

# Properties binding

##--##
<br><br>

<table>
    <thead>
        <tr>
            <td>Type</td>
            <td>Cible</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Propriété</td>
            <td>
                <p>Attribut de l'élement</p>
                <p>Attribut de component</p>
                <p>Attribut de directive</p>
            </td>
        </tr>
    </tbody>
</table>

![center h-400](assets/images/school/databinding/properties_binding.png)

##--##

<!-- .slide: class="with-code inconsolata" -->

<br><br>

-   Forme canonique: bindCapitalAttr (ex: bindDisabled)<br><br>
-   Constant

```html
<show-title [title]="'My title'"></show-title> <show-title title="My title"></show-title>
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="two-column-layout" -->

# Event Binding

##--##
<br><br>

<table>
    <thead>
        <tr>
            <td>Type</td>
            <td>Cible</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Évènement</td>
            <td>
                <p>Évènement d'élements</p>
                <p>Évènement de composants</p>
                <p>Évènement de directives</p>
            </td>
        </tr>
    </tbody>
</table>

![center h-400](assets/images/school/databinding/event_binding.png)

##--##
<br><br>

-   Forme canonique: onCapitalAttr (ex: onClick)
-   Référence à l'évent grâce à \$event

##==##

<!-- .slide: class="two-column-layout" -->

# 2 way binding

##--##
<br><br>

<table>
    <thead>
        <tr>
            <td>Type</td>
            <td>Cible</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>bidirectionnel</td>
            <td>
                <p>Propriétés</p>
                <p>Évènement de directives</p>
            </td>
        </tr>
    </tbody>
</table>

![center h-500](assets/images/school/databinding/two_way_binding.png)

##--##

<!-- .slide: class="with-code inconsolata" -->

<br><br>

-   Equivalent à

```html
<input [ngModel]="firstname" (ngModelChange)="firstname = $event" />
```

<!-- .element: class="big-code" -->
<br>

-   <bg>ngModel</bg> provient de la librairie <strong>@angular/forms</strong>
