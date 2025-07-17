<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: input signal function

- Child - Component <br/>

```typescript
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  name = input('');
  age = input.required('');
}
```

<!-- .element: class="big-code" -->
<br/>

- Parent - template <br/>

```html
<section>
  <app-child [name]="name()" [age]="age()" />
</section>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: @Input decorator

- Child - Component <br/>

```typescript
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  @Input() name: string = '';
  @Input({ required: true }) age!: number;
}
```

<!-- .element: class="big-code" -->
<br/>

- Parent - template <br/>

```html
<section>
  <app-child [name]="name" [age]="age" />
</section>
```

<!-- .element: class="big-code" -->

##==##

# Keep in mind

<br/><br/>

- **By using input signal**, you can use all the hook based on signals and component lifecycle <br/><br/>
- **By using @Input decorator**, you have to use lifecycle hook of component to make the same logic <br/><br/>
