<!-- .slide: class="transition-bg-sfeir-2" -->
# Créer ses propres pipes

##==##

<!-- .slide -->
# Comment se compose un pipe

- D'une classe décorée par le décorateur <b>@Pipe</b> ayant comme propriété obligatoire `name`, propriété qui servira à appeler le pipe dans un template HTML. <br/><br/>
- Cette classe implémente la méthode <b>transform</b> qui prend en paramètre une valeur et éventuellement un tableau d'arguments <br/><br/>
- Cette méthode <b>transform</b> effectue des transformations (ou pas) mais retourne toujours une nouvelle valeur<br/><br/>
- Pensez à enregistrer votre Pipe dans le tableau déclaration de votre module (comme un composant)

##==##
<!-- .slide: class="two-column with-code inconsolata" -->
## Matérialisons cela par du code

```typescript
// multiply-by-two.pipe.ts
import {Pipe} from '@angular/core';
@Pipe({
   name: 'multiplyByTwo'
})
export class MultiplyByTwoPipe implements PipeTransform {
  transform(value: number, args: any[]) {
    return value * 2;
  }
}
```
<!-- .element: class="medium-code" -->

##--##
<!-- .slide: class="with-code inconsolata"> -->

<br/><br/><br/>

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { MultiplyByTwoPipe } from './shared/multiply-by-two.pipe';


@NgModule({
  declarations: [
    MultiplyByTwoPipe
  ],
})
export class AppModule {}
```
<!-- .element: class="medium-code" -->

<br/>

```html
<!-- app.component.html -->
<p>{{ value | multiplyByTwo }}</p>
```
<!-- .element: class="medium-code" -->

