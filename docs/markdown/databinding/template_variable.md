<!-- .slide: class="with-code inconsolata" -->
# Les variables de template
<br><br>

- Variables: une valeur (let)
```html
<movie-details *ngFor="let movie of movies"></movie-details>
```
<!-- .element: class="big-code" -->
<br>

- Références:
    - Élement (# our ref-XXX)
    - disponible dans tout le template et le composant (@ViewChild('reference', { static: false })<br><br>
```html
<input #phone type="text" />
<button type="button" (click)="call(phone.value)">Click</button>
<input ref-fax type="text" />
<button type="button" (click)="fax(fax.value)">Click</button>
```
<!-- .element: class="big-code" -->
