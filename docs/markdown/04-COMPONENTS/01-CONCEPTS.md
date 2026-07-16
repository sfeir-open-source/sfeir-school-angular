<!-- .slide -->

# An application is a tree of components

![](assets/images/school/components/component_tree.png 'h-300 center')

<br/>

- Components are the **building blocks** of an Angular application
- Each one bundles its own **template**, **styles** and **logic**
- They **nest** to form a tree, rooted at a single component (bootstrapped in `main.ts`)
- Parents and children **communicate** through inputs, outputs and shared services

##==##

<!-- .slide -->

# The `@Component` decorator

The decorator is the component's **identity card**. The most common options:

- **selector** — the HTML tag used to place the component _(mandatory)_
- **template / templateUrl** — the view _(one of them is mandatory)_
- **styles / styleUrl / styleUrls** — the component's styles
- **imports** — components, directives and pipes used in the template
- **providers** — dependency-injection providers scoped to this component
- **changeDetection** — the change-detection strategy (default or `OnPush`)
- **host** — bindings and listeners applied to the component's own element

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `@Component` decorator

```typescript
@Component({
  selector: 'sfeir-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [UserCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
```

<!-- .element: class="big-code" -->

Notes:

- `ChangeDetectionStrategy.OnPush` is a good default for signal-based components; it tells Angular to check the component only when its inputs or signals change.

##==##

<!-- .slide -->

# Nesting components

When a parent renders a child component:

- the child is placed via its **selector** <br/><br/>
- the child must be listed in the parent's **`imports`** (standalone) <br/><br/>
- parent and child communicate through:
  - **`input()`** — data flowing down (parent → child)
  - **`output()`** — events flowing up (child → parent)
  - **template reference variables** (`#ref`)
  - **`viewChild()` / `contentChild()`** — querying children
  - **services** — shared state across the tree

##==##

<!-- .slide: class="with-code inconsolata" -->

# Nesting components

```html
<!-- app.html -->
<sfeir-home [title]="pageTitle()" (saved)="handleSave($event)">
  <sfeir-header />
  <sfeir-footer />
</sfeir-home>
```

<!-- .element: class="medium-code" -->

```typescript
// app.ts
import { Home } from './home';
import { Header } from './header';
import { Footer } from './footer';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
  imports: [Home, Header, Footer],
})
export class App {
  pageTitle = signal('Dashboard');
}
```

<!-- .element: class="medium-code" -->
