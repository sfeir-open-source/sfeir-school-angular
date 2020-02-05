<!-- .slide: class="sfeir-basic-slide with-code" -->
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

<!-- .slide: class="sfeir-basic-slide" -->
# Les différents lifecycle
<br><br>
- <strong>ngOnChanges(): </strong>Répond à chaque fois que les propriétés en entrée changent
- <strong>ngOnInit(): </strong>initialise le composant/la directive après sa création (1 fois)
- <strong>ngDoCheck(): </strong>permet d’agir sur la détection des modifications
- <strong>ngAfterContentInit(): </strong>répond après l’initialisation du contenu du composant (1 fois)
- <strong>ngAfterContentChecked(): </strong>répond après que Angular est vérifier le contenu du composant
- <strong>ngAfterViewInit(): </strong>répond après l’initialisation de la vue du composant (1 fois)
- <strong>ngAfterViewChecked(): </strong>répond après que Angular est vérifier le contenu de la vue
- <strong>ngOnDestroy(): </strong>permet de faire du nettoyage avant destruction du composant (1 fois)
