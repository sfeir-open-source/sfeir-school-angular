<!-- .slide: class="tc-multiple-columns with-code insconsolata" -->

##++##

# Binding in Javascript

```html
<html>
  Hello
  <span id="name"></span>
  <input type="text" />
</html>
```

<!-- .element: class="big-code" -->

##++##
##++## class="with-code inconsolata"

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

##++##

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# Binding with Jquery

```html
<html>
  Hello
  <span id="name"></span>
  <input type="text" />
</html>
```

<!-- .element: class="big-code" -->

##++##
##++## class="with-code inconsolata"

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

##++##

##==##

<!-- .slide: class="with-code inconsolata" -->

# Binding in Angular

You declare the **intent** — Angular keeps the DOM in sync for you. No `querySelector`, no manual listeners:

```typescript
export class App {
  name = signal('');
}
```

<!-- .element: class="medium-code" -->

```html
<div>
  <input type="text" (input)="name.set($any($event.target).value)" />
  <span>Hello {{ name() }}</span>
</div>
```

<!-- .element: class="big-code" -->

Notes:

- We will see the shorter two-way `[(ngModel)]` and signal-based forms later. The point here: state lives in a signal, and the view follows it automatically.
