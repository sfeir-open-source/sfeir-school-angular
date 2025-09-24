<!-- .slide -->

# Angular: a component tree

![](assets/images/school/components/component_tree.png 'h-300 center')

## Key Concepts

- Components are the building blocks of Angular applications
- Each component is a self-contained UI element with its own template, styles, and logic
- Components can be nested to create complex UI hierarchies
- The root component (AppComponent) serves as the entry point of the application
- Components communicate through input properties and output events
- Each component has its own lifecycle hooks for managing its state

##==##

# The @Component decorator

A component's identity card<br/>

- selector: Defines the HTML tag name to use this component (**mandatory**)
- template/templateUrl: Defines the view structure (**mandatory**)
- styles/styleUrls: Defines the component's styles
- changeDetection: Controls how often the component checks for changes
- providers: Defines dependency injection providers
- animations: Defines animations for the component
- viewProviders: Defines providers for the component's view
- exportAs: Makes the component referenceable in templates

##==##

<!-- .slide: class="with-code inconsolata" -->

# The @Component decorator

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('fadeInOut', [transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))])])],
})
export class App {}
```

<!-- .element: class="big-code" -->

##==##

# Nesting components

When a parent component wants to use child components<br/>

- child components must be referenced using their selectors <br/><br/>
- child components must be declared in the "imports" of the <b>@Components()</b> <br/><br/>
- Components can communicate through:
  - Input properties (input function)
  - Output events (output function)
  - Template reference variables (#)
  - viewChild/contentChild function
  - Services (shared state)

##==##

<!-- .slide: class="with-code inconsolata" -->

# Nesting Components

```html
<!-- app.html -->
<sfeir-home [title]="pageTitle" (onSubmit)="handleSubmit($event)">
  <sfeir-header />
  <sfeir-footer />
</sfeir-home>
```

<!-- .element: class="medium-code" -->

```typescript
// app.ts
import { Home } from './app/home';
import { Header } from './app/header';
import { Footer } from './app/footer';

@Component({
  import: [Home, Header, Footer],
})
export class App {}
```

<!-- .element: class="medium-code" -->
