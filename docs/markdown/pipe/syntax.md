<!-- .slide: class="sfeir-basic-slide with-code" -->
# Syntax
<br>
- A la suite d'une expression d'interpolation
```html
<span> {{ expression |filter1 }}</span>
```
<br>
- On peut chaînes les pipes
```html
<span> {{ expression |filter1 |filter2 }}</span>
```
<br>
- On peut passer des paramètres aux pipes
```html
<span>{{ expression |filter1 :param1 :param2 }}</span>
```
##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Syntax du pipe currency
<br><br>
```typescript
this.amount = 1234.56
```
<!-- .element: class="big-code" -->
```html
<span>{{ amount }}</span>
<!-- 1234.56 -->
<span> {{ amount |currency }}</span>
<!-- USD1,234.56 -->
<span>{{ amount |currency:"USD$" }}</span>
<!-- USD$1,234.56 -->
```
<!-- .element: class="big-code" -->
Notes
- https://angular.io/api/common/CurrencyPipe

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Syntax du pipe date
<br><br>
- Formate une date selon un certain format et selon une locale
```html
{{ myDate |date :format }}
```
<!-- .element: class="big-code" -->
<br><br>
- Ce filtre accepte un format (string) en argument
