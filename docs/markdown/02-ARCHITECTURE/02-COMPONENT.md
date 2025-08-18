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
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  name: string;

  constructor() {
    this.name = 'Angular';
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Components are Standalone

Standalone components are Angular components that do not require an NgModule to be declared. Introduced in Angular v14, they simplify the structure of Angular applications by allowing components, directives, and pipes to be self-contained and directly imported where needed.

Today (since Angular v19) standalone components are the default way to structure Angular applications. But before (Angular v14 - v18), they were optional.

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule], //imports module or standalone components, pipes and directives
})
export class AppComponent {}
```

<!-- .element: class="medium-code" -->

##==##

# Why do teams choose standalone components?

- **Simpler Architecture:** Eliminates the need for boilerplate NgModules, making projects easier to navigate and maintain.
- **Better Reusability:** Components can be shared and imported directly, improving modularity and code sharing across projects.
- **Faster Onboarding:** New developers can focus on components without learning module configuration.
- **Improved Tree-Shaking:** Smaller bundles, as only used components are included in the final build.
- **Modern Angular:** Aligns with the latest Angular best practices and ecosystem evolution.

> Standalone components empower teams to build modern, maintainable, and scalable Angular applications with less overhead.

##==##

# Properties of a standalone component

- **Self-contained:** Components are self-contained and do not require an NgModule to be declared. <br/> <br/>
- **Directly imported:** Components can be directly imported where needed, making them easy to reuse across projects. <br/> <br/>
- **Lazy loading:** Components can be loaded lazily, making them efficient for on-demand loading of features. <br/> <br/>
- **Virtual Module:** Application can be boostrap directly with a standalone component
