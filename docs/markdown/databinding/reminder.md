<!-- .slide-->

# Attribut vs Propriétés

-   Les attributs c'est du <b>HTML</b>, les propriétés c'est du <b>DOM</b><br>
    -   mapping strict (id)
    -   attribut sans propriété (colspan)
    -   propriété sans attribut (text-content)
    -   les 2 mais ... <br><br>
-   L'attribut permet d'initialiser les propriétés la plupart du temps <br><br>
-   Il existe des attributs sans valeur (ex: disabled sur un boutton)<br><br>
-   un attribut: une chaîne de caractères

##==##

<!-- .slide: class="with-code inconsolata" -->

# Angular et les propriétés

-   Un monde sans attribut<br><br>
-   Avec le binding, nous travaillons uniquement sur les propriétés<br><br>

```html
<button type="submit" [disabled]="form.invalid">Submit</button>
```

<!-- .element: class="big-code" -->

<br><br>

-   Permet de passer des objets

##==##

<!-- .slide: class="with-code inconsolata" -->

# Et si je veux agir sur un attribut ?
Certains éléments n'ont pas obligatoirement la propriété (svg, colspan)
<br>

-   On peut cibler un attribut en précédent son nom par <b>attr</b>

```html
<td [attr.colspan]="1+1">a cell!!</td>
```

<!-- .element: class="big-code" -->

-   Pour les classes, on précède le nom de la classe par: <b>class</b>

```html
<div [class.isSpecial]="isSpecial">special class</div>
```

<!-- .element: class="big-code" -->

-   Pour le style, on précède le nom de la propriété par style

```html
<div [style.color]="isSpecial ? 'red' : 'green'">Special class</div>
```

<!-- .element: class="big-code" -->
