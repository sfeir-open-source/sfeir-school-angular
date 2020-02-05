<!-- .slide: class="sfeir-basic-slide" -->
# Les différents types de binding
<table>
    <thead>
        <tr>
            <td>Direction</td>
            <td>Syntax</td>
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

<!-- .slide: class="sfeir-basic-slide" -->
# Interpolation et expression
<br><br>
- Interpolation
<br>
```html
<div>Hello {{ name }}</div>
<img src="{{ myUrl }}" />
```
<br>
- Expression
<ul>
    <li>Dans le context du composant</li>
    <li>Du Javascript mais !!<br>
        - pas d'affectation (sauf pour les events comme le click sur un boutton)<br>
        - pas d'accès aux variables globals (window, document, ...)<br>
        - Pour les opérateurs logiques, tout est évalué<br>
        - Pas de new, ++, --
    </li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Properties binding
<div class="flex-row">
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
    <img alt="center h-400" src="assets/images/school/databinding/properties_binding.png"/>
</div>
<br>
- Forme canonique: bindCapitalAttr (ex: bindDisabled)<br><br>
- Constant
```html
<show-title [title]="'My title'"></show-title>
<show-title title="My title"></show-title>
```

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Event Binding
<br>
<div class="flex-row">
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
    <img alt="center h-400" src="assets/images/school/databinding/event_binding.png"/>
</div>
<br><br>
- Forme canonique: onCapitalAttr (ex: onClick)
- Référence à l'évent grâce à $event

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# 2 way binding
<br>
<div class="flex-row">
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
    <img alt="center h-350" src="assets/images/school/databinding/two_way_binding.png"/>
</div>
<br><br>
- Equivalent à
```html
<input [ngModel]="firstname" (ngModelChange)="firstname = $event" />
```
<br>
- <strong>ngModel</strong> provient de la librairie <strong>@angular/forms</strong>



