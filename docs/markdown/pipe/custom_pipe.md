<!-- .slide: class=" transition-white sfeir-bg-pink" -->
# Créer ses propres pipes

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les différents types de pipe
<br><br><br>
- Pure: le pipe est appelé uniquement si la valeur sur laquel il agit a changé (mode par défaut)
<br><br>
- Impure: le pipe est appelé à chaque changement de détection que la valeur sur laquelle il agit a changé ou non

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Comment se compose un pipe
<br><br>
- Un pipe est une classe décorée avec l'annotation <strong>@Pipe</strong><br> et implémente l'interface <strong>PipeTransform</strong>
- L'annotation <strong>@Pipe</strong> possède la propriété <strong>name</strong> avec laquelle vous pourrez utiliser votre pipe dans les templates  <br><br>
- Cette classe implémente une méthode <strong>transform</strong> qui prend en paramètre une valeur et éventuellement un tableau d'arguments <br>
- Cette méthode tranform retourne une nouvelle valeur transformée.<br>
- Penser à enregistrer votre Pipe dans le tableau déclaration de votre module

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
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
<br><br>

