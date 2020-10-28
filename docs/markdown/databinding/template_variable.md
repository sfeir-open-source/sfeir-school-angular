<!-- .slide: class="with-code inconsolata" -->

# Les variables de template

-   Variables: une valeur (let)

```html
<movie-details *ngFor="let movie of movies"></movie-details>
```

<!-- .element: class="big-code" -->

-   Références:
    -   Élement (# our ref-XXX)
    -   disponible dans tout le template et le composant (@ViewChild('reference', { static: false })<br>

```html
<input #phone type="text" /> <button type="button" (click)="call(phone.value)">Click</button>
<input ref-fax type="text" /> <button type="button" (click)="fax(fax.value)">Click</button>
```

<!-- .element: class="big-code" -->
