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
            </td>
            <td>Evènements</td>
        </tr>
        <tr>
            <td>Bidirectionnel (2-way data binding)</td>
            <td>
                <p>[(targetFooBar)] = expression</p>
            </td>
            <td>Bidirectionnel</td>
        </tr>
    </tbody>
</table>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Interpolation et expression
## Interpolation:

```html
<div>Hello {{ name }}</div>
<img alt="a specific image" src="{{ myUrl }}" />
```
<!-- .element: class="big-code" -->

<br/><br/>

## Expression:
- Dans le contexte du composant
- Du TypeScript, **mais**
    - pas d'affectation (sauf pour les events comme le clic sur un bouton)
    - pas d'accès aux variables globales (window, document, ...)
    - Pour les opérateurs logiques, tout est évalué
    - Pas de new, ++, --

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

# Properties binding

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
                <p>Attribut de l'élément</p>
                <p>Attribut de composant</p>
                <p>Attribut de directive</p>
            </td>
        </tr>
    </tbody>
</table>

```html
<!-- app.component.html -->
<img [src]="url" />
<sfeir-people [person]="person" ></sfeir-people>
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

<br/><br/>

-   Constant

```html
<show-title [title]="'My title'"></show-title> 
<show-title title="My title"></show-title>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

# Event Binding

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
                <p>Évènement d'éléments</p>
                <p>Évènement de composants</p>
                <p>Évènement de directives</p>
            </td>
        </tr>
    </tbody>
</table>

```html
<!-- app.component.html -->
<button (click)="onSave()"></button>
<hero-detail (deleted)="onDeleted($event)"></hero-detail>
<input (change)="firstName = $event"
```
<!-- .element: class="big-code" -->


##--##
<br/><br/>

-   Référence à l'event grâce à $event

##==##

<!-- .slide: class="two-column with-code inconsolata" -->
# 2 way binding

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

```html
<!-- app.component.html -->
<input name="firstName" [(ngModel)]="firstName" />
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

<br/><br/>

-   Equivalent à

```html
<input
    [ngModel]="firstname"
    (ngModelChange)="firstname = $event" />
```
<!-- .element: class="big-code" -->

<br/>

-   <bg>ngModel</bg> provient de la librairie <strong>@angular/forms</strong>
