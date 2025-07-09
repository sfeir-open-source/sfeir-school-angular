<!-- .slide: class="two-column with-code insconsolata" -->

# Binding in Javascript

```html
<html>
    Hello <span id="name"></span>
    <input type="text" />
</html>
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```javascript
window.onload = function() {
  const span = document.querySelector('#name');
  const input = document.querySelector('input');
  
  input.addEventListener('keyup', () => {
    span.textContent = input.value;
  });
}
```
<!-- .element: class="big-code" --> 

##==##

<!-- .slide: class="two-column" -->

# Binding with Jquery

```html
<html>
    Hello <span id="name"></span>
    <input type="text" />
</html>
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->
<br/><br/><br/>

```javascript
$(document).ready(function() {
  var $input = $('input');
  var $span = $('#name');
  
  $input.keyup(function(event) {
    $span.text(event.target.value);
  });
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Binding in Angular

```html
<div>
    <input type="text" name="myName" [(ngModel)]="myName" /> 
    <span>Hello {{ myName }}</span>
</div>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Binding Syntax

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
