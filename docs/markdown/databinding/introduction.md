<!-- .slide: class="two-column with-code insconsolata" -->

# Le binding en Javascript

```html
<html>
    Bonjour <span id="name"></span>
    <input type="text" />
</html>
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```javascript
window.onload = function() {
  var span= document.querySelector('name');
  var input = document.getElementsByTagName('input')[0];
  
  input.onkeyup = function() {
    if (span.textContent || span.textContent === "") {
      span.textContent = input.value;
    }else if (span.innerText || span.innerText === "") {
      span.innerText = input.value;
    }
  }
}
```
<!-- .element: class="big-code" --> 

##==##

<!-- .slide: class="two-column" -->

# Le binding avec Jquery

```html
<html>
    Bonjour <span id="name"></span>
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
# Le binding en Angular

```html
<div>
    <input type="text" name="myName" [(ngModel)]="myName" /> 
    <span>Bonjour {{ myName }}</span>
</div>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Syntax binding

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

# Zoom sur un binding

<b>Target = "expression"</b>
<!-- .element: class="important" -->
