<!-- .slide: class="with-code inconsolata" -->

# Syntax

- Following an interpolation expression

```html
<span> {{ expression | filter1 }}</span>
```

<!-- .element: class="big-code" -->
<br/>

- Pipes can be chained

```html
<span> {{ expression | filter1 | filter2 }}</span>
```

<!-- .element: class="big-code" -->
<br/>

- Parameters can be passed to pipes

```html
<span>{{ expression | filter1:param1:param2 }}</span>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Currency pipe syntax

```typescript
this.amount = 1234.56;
```

<!-- .element: class="big-code" -->

```html
<span>{{ amount }}</span>
<!-- 1234.56 -->
<span> {{ amount | currency }}</span>
<!-- $1,234.56 -->
<span>{{ amount | currency:"EUR":"symbol":"4.2-2":"fr" }}</span>
<!-- 1 234,56 € -->
```

<!-- .element: class="big-code" -->

Notes:

- https://angular.io/api/common/CurrencyPipe

##==##

<!-- .slide: class="with-code inconsolata" -->

# Date pipe syntax

- Formats a date according to a certain format and locale

```html
{{ myDate | date:format }}
```

<!-- .element: class="big-code" -->

<br/><br/>

- This filter accepts a format (string) as an argument
