<!-- .slide: class="transition-bg-grey-1 underline" -->
# Créer ses propres pipes

##==##
<!-- .slide -->
# Les différents types de pipe
<br><br><br>

- Pure: le pipe est appelé uniquement si la valeur sur laquel il agit a changé (mode par défaut)<br><br>
- Impure: le pipe est appelé à chaque changement de détection que la valeur sur laquelle il agit a changé ou non

##==##

<!-- .slide -->
# Comment se compose un pipe
<br><br>

- De l'annotation <b>@Pipe</b> qui prend comme propriété name qui sera appelé dans le template  <br><br>
- D'une classe qui est déclenchée par l'annotation <b>@Pipe</b> <br><br>
- Cette classe implémente la une méthode transform qui prend en paramètre une valeur et éventuellement un tableau d'arguments <br><br>
- Cette méthode tranform retourn une nouvelle valeur<br><br>
- Penser à enregistrer votre Pipe dans le tableau déclaration de votre module

##==##
<!-- .slide: class="with-code inconsolata" -->
# Matérialisons cela par du code
<br><br>

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

