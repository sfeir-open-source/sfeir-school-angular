<!-- .slide: class="transition bg-white" -->

# Control flow

##==##

<!-- .slide: class="with-code inconsolata" -->

# The @for feature template

- Iterates through a collection and generates a template for each item <br/><br/>
- Provides implicit variables like <b>$index, $odd, $even, $last</b> <br/><br/>

```angular181html
<ul>
  @for (fruit of fruits(); track fruit.id; let i = $index) {
  <li>{{ i }} : {{ fruit.name }}</li>
  }
</ul>
```

<!-- .element: class="medium-code" -->

- Deprecated way of using NgFor structural directive

```angular2html
<ul>
  <li *ngFor="let fruit of fruits(); let i = index">{{ i }} : {{ fruit.name }}</li>
</ul>
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The @if feature template

- Conditionally renders content in the DOM<br/><br/>

```angular181html
@if (errorCount() > 0) {
<div class="error">{{ errorCount() }} errors detected</div>
}
```

<!-- .element: class="medium-code" -->

- Deprecated way of using NgIf structural directive

```angular2html
<div class="error" *ngIf="errorCount() > 0">{{ errorCount() }} errors detected</div>
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The @switch feature template

- Conditionally renders content based on a switch-case pattern<br/><br/>

```angular181html
@switch (display()) { @case ('list') {
<p>...</p>
} @case ('whenExpression1') {
<p>...</p>
} @default {
<p>...</p>
} }
```

<!-- .element: class="medium-code" -->

- Deprecated way of using NgSwitch and NgSwitchCase structural directive

```angular2html
<div [ngSwitch]="display()">
  <p *ngSwitchCase="'list'"></p>
  <p *ngSwitchDefault></p>
</div>
```

<!-- .element: class="medium-code" -->
