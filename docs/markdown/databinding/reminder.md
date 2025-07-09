<!-- .slide: class="with-code" -->

# Attribute vs Properties

- Attributes are <b>HTML</b>, properties are <b>DOM</b>.
- The value of a property can change, attributes cannot be changed.
- The role of attributes is to initialize the DOM properties, once done, the attribute's job is finished.
- Angular binding only works with properties and events, not with attributes.
- A property can have a string, an object, a function as its value... An attribute is always a string.<br/><br/>

```html
<!-- Attribute -->
<input id='inputId' type='text' value='My value'> 
```
<!-- .element: class="medium-code" -->

```html
<!-- Property -->
<input id='inputId' type='text' [value]="value"> 
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# What if I want to act on an attribute?
Some elements do not necessarily have the desired property (svg, colspan)
<br/><br/>

-   You can target an attribute by prefixing its name with <b>attr</b>

```html
<td [attr.colspan]="1+1">a cell!!</td>
```
<!-- .element: class="medium-code" -->

<br/>

-   For CSS classes, we prefix the class name with: <b>class</b>

```html
<div [class.green]="isSpecial">special class</div>
```
<!-- .element: class="medium-code" -->

<br/>

-   For style, we prefix the property name with style

```html
<div [style.color]="isSpecial ? 'red' : 'green'">Special class</div>
```
<!-- .element: class="medium-code" -->
