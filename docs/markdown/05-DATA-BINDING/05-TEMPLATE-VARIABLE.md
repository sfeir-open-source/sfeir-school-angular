<!-- .slide: class="with-code inconsolata" -->

# Template variables

- References:
  - Element (# or ref-XXX)
  - Available throughout the template<br/><br/>

```angular181html
<input #phone type="text" />
<button type="button" (click)="call(phone.value)">Click</button>
<!-- the following syntax is the same as above but not very used by the community -->
<input ref-phone type="text" />
<button type="button" (click)="call(phone.value)">Click</button>
<!-- the following syntax let you to declare a variable in the template -->
@let name = '1234567890';
```

<!-- .element: class="medium-code" -->

- Input variables in a loop<br/><br/>

```angular181html
@for (movie of movies(); track movie.id) {
  <movie-details [movie]="movie"/>
}
```

<!-- .element: class="medium-code" -->
