<!-- .slide: class="with-code inconsolata" -->

# Template variables

-   References:
    -   Element (# or ref-XXX)
    -   Available throughout the template<br/><br/>

```html
<input #phone type="text" /> <button type="button" (click)="call(phone.value)">Click</button>
<input ref-fax type="text" /> <button type="button" (click)="fax(fax.value)">Click</button>
```
<!-- .element: class="big-code" -->

<br/><br/>

-   Input variables in a loop<br/><br/>

```html
@for (movie of movies; track movie.id) {
  <movie-details [movie]="movie"></movie-details>
}
```
<!-- .element: class="big-code" -->
