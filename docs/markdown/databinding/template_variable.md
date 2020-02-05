<!-- .slide: class="sfeir-basic-slide with-code" -->
# Les variables de template
<br>
- Variables: une valeur (let)
```html
<movie-details *ngFor="let movie of movies"></movie-details>
```
<!-- .element: class="big-code" -->
<br>
- Références:
<ul>
    <li>Élement (# ou ref-XXX)</li>
    <li>disponible dans tout le template et le composant (@ViewChild('reference', { static: false })</li>
</ul>
```html
<input #phone type="text" />
<button type="button" (click)="call(phone.value)">Click</button>
<input ref-fax type="text" />
<button type="button" (click)="fax(fax.value)">Click</button>
```
<!-- .element: class="big-code" -->
