<!-- .slide: class="sfeir-basic-slide" -->
# Les variables de template
<br>
- Variables: une valeur (let)
```html
<movie-details *ngFor="let movies of movies"></movie-details>
```
<br><br>
- Références:
<ul>
    <li>Élement (# ou ref-XXX)</li><br>
    <li>disponible dans tous le template et le composant (@ViewChild('reference', { static: false })</li>
</ul>
```html
<input #phone type="text" />
<button type="button" (click)="call(phone.value)">Click</button>
<input ref-fax type="text" />
<button type="button" (click)="fax(fax.value)">Click</button>
```
