<!-- .slide: class="with-code inconsolata" -->

# Binding Syntax

<br/>

## Events

```html
<button type="button" (click)="changeName()">Refresh</button>
```

<!-- .element: class="medium-code"-->

## Properties

```html
<button type="submit" [disabled]="myForm.invalid">Submit</button>
```

<!-- .element: class="medium-code"-->

## Reference

```html
<input #myName type="text" /> <span>{{ myName.value }}</span>
```

<!-- .element: class="medium-code"-->

## Interpolation

```html
<span>{{ name }}</span>
```

<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="full-center" -->

# Zoom on a binding

<b>Target = "expression"</b>

<!-- .element: class="important" -->

##==##

# The different types of binding

| Direction                     | Syntax                                           | Type                                                           |
| ----------------------------- | ------------------------------------------------ | -------------------------------------------------------------- |
| Unidirectional: model to view | {{ expression }}<br/>[targetFooBar] = expression | Interpolation<br/>Properties<br/>Class<br/>Attribute<br/>Style |

##==##

<!-- .slide -->

# The different types of binding

| Direction                     | Syntax                      | Type   |
| ----------------------------- | --------------------------- | ------ |
| Unidirectional: view to model | (targetFooBar) = expression | Events |

##==##

<!-- .slide: class="with-code inconsolata" -->

# Interpolation and expression

## Interpolation:

```html
<div>Hello {{ name() }}</div>
<img alt="a specific image" src="{{ myUrl() }}" />
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

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Properties binding

| Type     | Target                                                            |
| -------- | ----------------------------------------------------------------- |
| Property | Element attribute<br/>Component attribute<br/>Directive attribute |

```html
<!-- app.component.html -->
<img [src]="url()" />
<sfeir-people [person]="person()" />
```

<!-- .element: class="big-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

- Constant

```html
<show-title [title]="'My title'" />

<show-title title="My title" />
```

<!-- .element: class="big-code" -->

##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Event Binding

| Type  | Target                                                |
| ----- | ----------------------------------------------------- |
| Event | Element event<br/>Component event<br/>Directive event |

```html
<!-- app.component.html -->
<button (click)="onSave()"></button>
<hero-detail (deleted)="onDeleted($event)" />
<input (change)="firstname.set($event.target.value)" />
```

<!-- .element: class="big-code" -->

##++##
##++##

<br/><br/><br/>

- Reference to the event with $event
  ##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# 2 way binding

| Type          | Target                         |
| ------------- | ------------------------------ |
| bidirectional | Properties<br/>Directive event |

```html
<!-- app.component.html -->
<input name="firstName" [(ngModel)]="firstName" />
```

<!-- .element: class="big-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

- Equivalent to

```html
<input [ngModel]="firstName" (ngModelChange)="firstName = $event" />
```

<!-- .element: class="big-code" -->

<br/>

- `ngModel` comes from the **@angular/forms** library <br/><br/>
- `firstName` don't need to be a signal for reactivity, ngModel handles it
  ##++##
