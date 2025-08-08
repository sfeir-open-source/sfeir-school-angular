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

# Implicit variables of the for loop

| Variable | Meaning of the variable                                          |
| -------- | ---------------------------------------------------------------- |
| $count   | Number of items in the list                                      |
| $index   | Index of the item in the list                                    |
| $first   | First item in the list                                           |
| $last    | Last item in the list                                            |
| $even    | Even index                                                       |
| $odd     | Odd index                                                        |
| $track   | Tracking function or tracking value (mandatory with @for syntax) |

<br/>

Each variable can be aliased with the 'let' keyword

<!-- .element: class="important" -->

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

##==##

# Automatic migration using a simple command

<br/><br/><br/>

```shell
ng generate @angular/core:control-flow
```

<!-- .element: class="big-code center" -->

##==##

# Benefits of the new syntax

- **Clearer and more intuitive**: The syntax is closer to native JavaScript control flow.
- **No more microsyntax**: Eliminates the complex grammar of `let`, `as`, and `of`.
- **Improved type checking**: The compiler can better infer types within the blocks.
- **Built-in**: Control flow is part of the core framework, no need to import `CommonModule` for `@if`, `@for`, etc.
