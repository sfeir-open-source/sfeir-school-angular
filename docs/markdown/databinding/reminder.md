<!-- .slide-->

# Attribut vs Propriétés

- Les attributs c'est du <b>HTML</b>, les propriétés c'est du <b>DOM</b>.
- La valeur d'une propriété peut changer, les attributs ne peuvent pas être changés.
- Le rôle des attributs est d'initialiser les propriétés du DOM, une fois effectué, le travail de l'attribut est terminé.
- Le binding Angular ne fonctionne qu'avec les propriétés et les événements et non pas avec les attributs.
- Une propriété peut avoir comme valeur une chaîne de caractères, un objet, une fonction... Un attribut est toujours une chaîne de caractères.<br><br>
```html
<!-- Attribute -->
<input id='inputId' type='text' value='My value'> 
```

```html
<!-- Property -->
<input id='inputId' type='text' [value]="value"> 
```

##==##

<!-- .slide: class="with-code inconsolata" -->

# Et si je veux agir sur un attribut ?
Certains éléments n'ont pas obligatoirement la propriété souhaitée (svg, colspan)
<br>

-   On peut cibler un attribut en précédent son nom par <b>attr</b>

```html
<td [attr.colspan]="1+1">a cell!!</td>
```

<!-- .element: class="big-code" -->

-   Pour les classes CSS, on précède le nom de la classe par: <b>class</b>

```html
<div [class.green]="isSpecial">special class</div>
```

```css
.green {
    color: green;
}
```

<!-- .element: class="big-code" -->

-   Pour le style, on précède le nom de la propriété par style

```html
<div [style.color]="isSpecial ? 'red' : 'green'">Special class</div>
```

<!-- .element: class="big-code" -->
