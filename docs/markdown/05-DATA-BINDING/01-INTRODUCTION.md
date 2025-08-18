<!-- .slide: class="two-column with-code insconsolata" -->

# Binding in Javascript

```html
<html>
  Hello
  <span id="name"></span>
  <input type="text" />
</html>
```

<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```javascript
window.onload = function () {
  const span = document.querySelector('#name');
  const input = document.querySelector('input');

  input.addEventListener('keyup', () => {
    span.textContent = input.value;
  });
};
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column" -->

# Binding with Jquery

```html
<html>
  Hello
  <span id="name"></span>
  <input type="text" />
</html>
```

<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```javascript
$(document).ready(function () {
  var $input = $('input');
  var $span = $('#name');

  $input.keyup(function (event) {
    $span.text(event.target.value);
  });
});
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
