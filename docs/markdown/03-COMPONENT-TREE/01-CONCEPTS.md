<!-- .slide -->

# An application is a tree of components

![](assets/images/school/components/component_tree.png 'h-300 center')

<br/>

- Components are the **building blocks** of an Angular application
- Each one bundles its own **template**, **styles** and **logic**
- They **nest** to form a tree, rooted at a single component (bootstrapped in `main.ts`)
- Parents and children **communicate** through inputs, outputs and shared services

Notes:

- In `01-hands-on`, `App` did everything itself: toolbar _and_ page content in one template. That's a tree of exactly one node — it doesn't scale. `02-component-tree` is about recognizing when a chunk of a template deserves to become its own node.

##==##

<!-- .slide -->

# The `@Component` decorator

The decorator is the component's **identity card**. The most common options:

- **selector** — the HTML tag used to place the component
- **template / templateUrl** — the view _(one of them is mandatory)_
- **styles / styleUrl / styleUrls** — the component's styles
- **imports** — components, directives and pipes used in the template
- **providers** — dependency-injection providers scoped to this component
- **changeDetection** — the change-detection strategy (default or `Eager`)
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
})
export class Home {}
```

<!-- .element: class="big-code" -->

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
<mat-toolbar>...</mat-toolbar>
<sfeir-home />
```

<!-- .element: class="medium-code" -->

```typescript
// app.ts
import { Home } from './feature/home/home';

@Component({
  selector: 'sfeir-root',
  templateUrl: './app.html',
  imports: [MatToolbarModule, Home], // Home replaces the old, inlined <mat-card>
})
export class App {}
```

<!-- .element: class="medium-code" -->

Notes:

- This is exactly the shape of `02-component-tree`: `App` becomes purely structural (toolbar, then `<sfeir-home />`) and stops knowing what's inside `Home` — that's the point of composing a tree instead of one flat component.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Feature folder structure

As soon as a component stops being a one-off, give it a **home of its own** instead of dropping it flat into `app/`:

<br/>

```text
app/
├── app.ts / app.html / app.scss   ← the shell: toolbar + composition root
├── app.config.ts
└── feature/
    └── home/
        ├── home.ts
        ├── home.html
        └── home.scss
```

<!-- .element: class="big-code" -->

- `feature/<name>/` groups a component's class, template and styles **together**, one folder per feature
- `App` doesn't need to know `Home`'s internals — it only needs its selector and its `imports` entry
- This convention scales: as the app grows, each new screen gets its own `feature/` folder, side by side

Notes:

- Some exercises ship a `*.spec.ts` next to the component you have to build. Read it as a **contract**: it tells you exactly what the component must expose and render, without spelling out the implementation for you.
