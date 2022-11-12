<!-- .slide: class="with-code inconsolata" -->
# Utilisation dans le composant

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'sfeir-foo',
  templateUrl: './foo.component.html'  
})
export class FooComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
    });
  }
  async go(): Promise<void> {
    await this.router.navigate(['/people/']);
  }
}
```
<!-- .element: class="medium-code" -->
Notes:
- La méthode navigate renvoie une promesse
- Nous ne sommes pas obligés d'utiliser la propriété params du router, il existe également le props paramsMap

##==##

<!-- .slide: class="with-code inconsolata" -->
# Utilisation dans le template

```html
<a class="btn btn-info" routerLink="/people">Movies Liste</a>
<a class="btn btn-info" [routerLink]="['/people']">Movies Liste</a>
<a class="btn btn-info" [routerLink]="['/people/edit/', person.id]">Edit</a>
```
<!-- .element: class="big-code" -->
