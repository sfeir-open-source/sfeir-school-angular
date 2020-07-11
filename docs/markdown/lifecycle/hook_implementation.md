<!-- .slide: class="with-code inconsolata" -->
# Implémentation d'un lifecycle
<br><br>

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
<br><br>

- <b>ngOnChanges(): </b>répond à chaque fois que les propriétés en entrée changent
- <b>ngOnInit(): </b>initialise le composant/la directive après sa création (1 fois)
- <b>ngDoCheck(): </b>permet d’agir sur la détection des modifications
- <b>ngAfterContentInit(): </b>répond après l’initialisation du contenu du composant (1 fois)
- <b>ngAfterContentChecked(): </b>répond après que Angular est vérifier le contenu du composant
- <b>ngAfterViewInit(): </b>répond après l’initialisation de la vue du composant (1 fois)
- <b>ngAfterViewChecked(): </b>répond après que Angular est vérifier le contenu de la vue
- <b>ngOnDestroy(): </b>permet de faire du nettoyage avant destruction du composant (1 fois)
