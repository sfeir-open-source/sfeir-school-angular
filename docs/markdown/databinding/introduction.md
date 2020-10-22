<!-- .slide: class="two-column-layout" -->

# Le binding en Javascript

##--##
<br><br><br>

![h-600](assets/images/school/databinding/template_pure_js.png)

##--##
<br><br><br>

![h-600](assets/images/school/databinding/pure_js.png)

##==##

<!-- .slide: class="two-column-layout" -->

# Le binding avec Jquery

##--##
<br><br><br>

![h-600](assets/images/school/databinding/template_pure_js.png)

##--##
<br><br><br>

![h-600](assets/images/school/databinding/jquery.png)

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le binding en Angular

```html
<div><input type="text" name="myName" [(ngModel)]="myName" /> <span>Bonjour {{ myName }}</span></div>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Syntax binding

<b>Events</b>

```html
<button type="button" (click)="changeName()">Refresh</button>
```

<!-- .element: class="medium-code"-->

<b>Properties</b>

```html
<button type="submit" [disabled]="myForm.invalid">Submit</button>
```

<!-- .element: class="medium-code"-->

<b>Reference</b>

```html
<input #myName type="text" /> <span>{{ myName.value }}</span>
```

<!-- .element: class="medium-code"-->

<b>Interpolation</b>

```html
<span>{{ name }}</span>
```

<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide full-center" -->

# Zoom sur un binding

<b>Target = "expression"</b>
