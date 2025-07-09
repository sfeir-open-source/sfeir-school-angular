<!-- .slide: class="with-code inconsolata" -->
# The @for directive

- Iterates through a collection and generates a template for each item <br/><br/>
- Provides implicit variables like <b>$index, $odd, $even, $last</b> <br/><br/>

```html
<ul>
    @for (fruit of fruits; track fruit.id; let i = $index) {
        <li>{{ i }} : {{ fruit.name }}</li>
    }
</ul>
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# The @if directive

- Conditionally renders content in the DOM<br/><br/>

```html
@if (errorCount > 0) {
  <div class="error">
    {{ errorCount }} errors detected
  </div>
}
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# The @switch directive

- Conditionally renders content based on a switch-case pattern<br/><br/>

```html
@switch (display) {
  @case ('list') { <p>...</p> }
  @case ('whenExpression1') { <p>...</p> }
  @default { <p>...</p> }
}
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# What happened to the asterisks?

- The asterisk `*` syntax was for the old structural directives (like *ngIf, *ngFor)
- It was syntactic sugar for the `<ng-template>` tag
- The new `@-block` syntax is now the preferred way for control flow

```html
<!-- old syntax -->
<div *ngIf="errorCount > 0">toto</div>

<!-- new syntax -->
@if (errorCount > 0) {
    <div>toto</div>
}
```
<!-- .element: class="big-code" -->
Notes:
- Live demonstration of creating a simple structural directive: show or hide a password on a button click
