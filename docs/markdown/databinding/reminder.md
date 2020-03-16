<!-- .slide: class="sfeir-basic-slide" -->
# Attribut vs Propriétés
<br>
- Les attributs c'est du <strong>HTML</strong>, les propriétés c'est du <strong>DOM</strong><br>
<ul>
    <li>mapping strict (id)</li>
    <li>attribut sans propriété (colspan)</li>
    <li>propriété sans attribut (textContent)</li>
    <li>les 2 mais ...</li>
</ul>
<br>
- L'attribut permet d'initialiser la propriété la plupart du temps
<br><br>
- il existe des attributs sans valeurs (ex: disabled sur un boutton)
<br><br>
- un attribut: une chaîne de caractères

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Angular et les propriétés
<br><br>
- Un monde sans attributs
<br><br>
- Avec le binding, nous travaillons uniquement sur les propriétés
```html
<button type="submit" [disabled]="form.invalid">Submit</button>
```
<!-- .element: class="big-code" -->
<br>
- Permet de passer des objets

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Et si je veux agir sur un attribut ?
<br>
Certains éléments n'ont pas obligatoirement la propriété (svg, colspan)
<br><br>
- On peut cibler un attribut en précédent son nom par <strong>attr</strong>
```html
<td [attr.colspan]="1+1">a cell!!</td>
```
<!-- .element: class="big-code" -->
<br>
- Pour les classes, on précède le nom de la classe par: <strong>class</strong>
```html
<div [class.isSpecial]="isSpecial">special class</div>
```
<!-- .element: class="big-code" -->
<br>
- Pour le style, on précède le nom de la propriété par style
```html
<div [style.color]="isSpecial ? 'red' : 'green'">Special class</div>
```
<!-- .element: class="big-code" -->
