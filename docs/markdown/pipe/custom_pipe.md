<!-- .slide: class="transition-bg-grey-1 underline" -->
# Créer ses propres pipes

##==##
<!-- .slide -->
# Les différents types de pipe<br>

- Pure: le pipe est appelé uniquement si la valeur sur laquelle il agit a changé (mode par défaut)<br><br>
- Impure: le pipe est appelé à chaque changement de détection que la valeur sur laquelle il agit a changé ou non

##==##

<!-- .slide -->
# Comment se compose un pipe

- Du décorateur <b>@Pipe</b> qui prend comme propriété name qui sera appelé dans le template <br><br>
- D'une classe qui est déclenchée par le décorateur <b>@Pipe</b> <br><br>
- Cette classe implémente la méthode <b>transform</b> qui prend en paramètre une valeur et éventuellement un tableau d'arguments <br><br>
- Cette méthode <b>transform</b> effectue des transformations (ou pas) mais retourne toujours une nouvelle valeur<br><br>
- Pensez à enregistrer votre Pipe dans le tableau déclaration de votre module (comme un composant)

##==##
<!-- .slide: class="with-code inconsolata" -->
# Matérialisons cela par du code

```typescript
import {Pipe} from '@angular/core';
@Pipe({
   name: 'mypipe'
})
export class MyPipe implements PipeTransform {
  transform(value: number, args: any[]) {
    return newValue;
  }
}
```
<!-- .element: class="big-code" -->

