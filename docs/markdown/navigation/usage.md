<!-- .slide: class="with-code inconsolata" -->
# Usage in the component

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
- The navigate method returns a promise.
- We are not required to use the `params` property of the router; the `paramsMap` property also exists.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Usage in the template

```html
<a class="btn btn-info" routerLink="/people">Movies List</a>
<a class="btn btn-info" [routerLink]="['/people']">Movies List</a>
<a class="btn btn-info" [routerLink]="['/people/edit/', person.id]">Edit</a>
```
<!-- .element: class="big-code" -->
