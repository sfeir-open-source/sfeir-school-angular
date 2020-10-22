<!-- .slide: class="with-code inconsolata" -->
# Implémentation d'un lifecycle

```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'sfeir-user',
  templateUrl: './user.component.html'  
})
export class UserComponent implements OnInit {
  ngOnInit(): void {
    console.info('sfeir-user', 'init');  
  }  
}
```
<!-- .element: class="big-code" -->


##==##
<!-- .slide -->
# Les différents lifecycle

- <b>ngOnChanges(): </b>répond à chaque fois que les propriétés en entrée changent
- <b>ngOnInit(): </b>initialise le composant/la directive après sa création (1 fois)
- <b>ngDoCheck(): </b>permet d’agir sur la détection des modifications
- <b>ngAfterContentInit(): </b>répond après l’initialisation du contenu du composant (1 fois)
- <b>ngAfterContentChecked(): </b>répond après qu'Angular a vérifié le contenu du composant
- <b>ngAfterViewInit(): </b>répond après l’initialisation de la vue du composant (1 fois)
- <b>ngAfterViewChecked(): </b>répond après qu'Angular a vérifié le contenu de la vue
- <b>ngOnDestroy(): </b>permet de faire du nettoyage avant la destruction du composant (1 fois)
