<!-- .slide -->

# The different types of binding

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
            <td>Unidirectional: model to view</td>
            <td>
                <p>{{ expression }}</p>
                <p>[targetFooBar] = expression</p>
            </td>
            <td>
                <p>Interpolation</p>
                <p>Properties</p>
                <p>Class</p>
                <p>Attribute</p>
                <p>Style</p>
            </td>
        </tr>       
    </tbody>
</table>

##==##

<!-- .slide -->

# The different types of binding

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
            <td>Unidirectional: view to model</td>
            <td>
                <p>(targetFooBar) = expression</p>
            </td>
            <td>Events</td>
        </tr>
        <tr>
            <td>Bidirectional (2-way data binding)</td>
            <td>
                <p>[(targetFooBar)] = expression</p>
            </td>
            <td>Bidirectional</td>
        </tr>
    </tbody>
</table>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Interpolation and expression
## Interpolation:

```html
<div>Hello {{ name }}</div>
<img alt="a specific image" src="{{ myUrl }}" />
```
<!-- .element: class="big-code" -->

<br/><br/>

## Expression:
- In the component's context
- TypeScript, **but**
    - no assignment (except for events like a button click)
    - no access to global variables (window, document, ...)
    - For logical operators, everything is evaluated
    - No new, ++, --

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

# Properties binding

<table>
    <thead>
        <tr>
            <td>Type</td>
            <td>Target</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Property</td>
            <td>
                <p>Element attribute</p>
                <p>Component attribute</p>
                <p>Directive attribute</p>
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

<br/><br/><br/>

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
            <td>Target</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Event</td>
            <td>
                <p>Element event</p>
                <p>Component event</p>
                <p>Directive event</p>
            </td>
        </tr>
    </tbody>
</table>

```html
<!-- app.component.html -->
<button (click)="onSave()"></button>
<hero-detail (deleted)="onDeleted($event)"></hero-detail>
<input (change)="firstName = $event"/>
```
<!-- .element: class="big-code" -->


##--##
<br/><br/><br/>

-   Reference to the event with $event

##==##

<!-- .slide: class="two-column with-code inconsolata" -->
# 2 way binding

<table>
    <thead>
        <tr>
            <td>Type</td>
            <td>Target</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>bidirectional</td>
            <td>
                <p>Properties</p>
                <p>Directive event</p>
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

<br/><br/><br/>

-   Equivalent to

```html
<input
    [ngModel]="firstName"
    (ngModelChange)="firstName = $event" />
```
<!-- .element: class="big-code" -->

<br/>

-   <bg>ngModel</bg> comes from the <strong>@angular/forms</strong> library
