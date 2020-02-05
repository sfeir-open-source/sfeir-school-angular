<!-- .slide: class="sfeir-basic-slide" -->
# Le binding en Javascript
<br><br>
<div class="flex-row">
    <img alt="h-600" src="assets/images/school/databinding/template_pure_js.png" />
    <img alt="h-600" src="assets/images/school/databinding/pure_js.png" />
</div>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le binding avec Jquery
<br><br>
<div class="flex-row">
    <img alt="h-600" src="assets/images/school/databinding/template_pure_js.png" />
    <img alt="h-600" src="assets/images/school/databinding/jquery.png" />
</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Le binding en Angular
<br><br><br>
```html
<div>
  <input type="text" name="myName" [(ngModel)]="myName" />
  <span>Bonjour {{ myName }}</span>
</div>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Syntax binding
<span class="bold">Events</span>
```html
<button type="button" (click)="changeName()">Refresh</button>
```
<!-- .element: class="big-code"-->
<br>
<span class="bold">Properties</span>
```html
<button type="submit" [disabled]="myForm.invalid">Submit</button>
```
<!-- .element: class="big-code"-->
<br>
<span class="bold">Reference</span>
```html
<input #myName type="text" />
<span>{{ myName.value }}</span>
```
<!-- .element: class="big-code"-->
<br>
<span class="bold">Interpolation</span>
```html
<span>{{ name }}</span>
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Zoom sur un binding
<div class="full-center">
    <span class="bold">Target = "expression"</span>
</div>
