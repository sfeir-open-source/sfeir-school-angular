<!-- .slide: class="transition-bg-sfeir-2" -->

# Creating your own pipes

##==##

# How a pipe is composed

- From a class decorated with the <b>@Pipe</b> decorator, which has a mandatory `name` property that will be used to call the pipe in an HTML template. <br/><br/>
- This class implements the <b>transform</b> method, which takes a value as a parameter and optionally an array of arguments. <br/><br/>
- This <b>transform</b> method performs transformations (or not) but always returns a new value.<br/><br/>
- Pipes are **standalone** by default: import them in a component's `imports` array (no NgModule).

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

## Let's materialize this with code

```typescript
// multiply-by-two.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplyByTwo',
})
export class MultiplyByTwoPipe implements PipeTransform {
  transform(value: number): number {
    return value * 2;
  }
}
```

<!-- .element: class="medium-code" -->

##++##

##++##

<br/><br/><br/>

```typescript
// app.ts — import the pipe like any standalone dependency
import { MultiplyByTwoPipe } from './shared/multiply-by-two.pipe';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
  imports: [MultiplyByTwoPipe],
})
export class App {}
```

<!-- .element: class="medium-code" -->

<br/>

```html
<!-- app.html -->
<p>{{ 2 | multiplyByTwo }}</p>
<!-- displays 4 -->
```

<!-- .element: class="medium-code" -->

##++##
