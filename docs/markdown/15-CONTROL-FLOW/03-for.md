<!-- .slide: class="with-code inconsolata" data-type-show="on-stage" -->

# Migrating from ngFor to @for block

**Before**

```angular2html
<ul *ngFor="let user of users$ | async trackBy: trackByFn">
  <li>{{ user.name }}</li>
</ul>
```

<!-- .element: class="big-code" -->

<br/>

**After**

```angular18html
<ul>
@for(user of users$ | async; track user.id) {
  <li>{{ user.name }}</li>
}
</ul>
```

<!-- .element: class="big-code" -->


##==##
<!-- .slide: class="with-code inconsolata" data-type-show="modern-2days" -->

# @for block

```angular18html
<ul>
@for(user of users$ | async; track user.id) {
  <li>{{ user.name }}</li>
}
</ul>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

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

