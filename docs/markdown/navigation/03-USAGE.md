<!-- .slide: class="with-code inconsolata" -->

# Usage in the component

```typescript
@Component({
  selector: 'sfeir-foo',
  templateUrl: './foo.component.html',
})
export class FooComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected id = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

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
