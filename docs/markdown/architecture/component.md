<!-- .slide: class="transition-bg-sfeir-2" -->

# The component

##==##

<!-- .slide -->

# The component

The component is made up of three basic concepts.
<br/><br/>

![center h-600](assets/images/school/architecture/components.png)

##==##

<!-- .slide: class="with-code inconsolata" -->

# The component: its logic

The component's logic uses the ES2015 class syntax
<br/><br/>

```typescript
export class AppComponent {
  name: string;

  constructor() {
    this.name = 'Angular';
  }
}
```

<!-- .element: class="big-code" -->
<br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# The component: its template

The component is displayed on the page using a decorator
<br/><br/>

```typescript
// app.component.ts
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
```

<!-- .element: class="big-code" -->
<br/>

```html
<!-- index.html -->
<sfeir-app></sfeir-app>
```

<!-- .element: class="big-code" -->
<br/>
Notes:
- A @Component decorator is always placed above a class. Without this class, the build and the linter will show an error

##==##

<!-- .slide: class="with-code inconsolata" -->

# The component: as a whole

Writing a component in its entirety is therefore as follows
<br/><br/>

```typescript
// app.component.ts
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  name: string;

  constructor() {
    this.name = 'Angular';
  }
}
```

<!-- .element: class="big-code" -->
