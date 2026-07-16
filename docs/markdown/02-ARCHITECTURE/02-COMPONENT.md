<!-- .slide: class="transition-bg-sfeir-2" -->

# The component

##==##

<!-- .slide -->

# The component

A component is the **building block** of any Angular application. It is made up of three parts:

<br/>

![](assets/images/school/architecture/components.png 'center h-500')

<br/>

- a **template** (the HTML view), some **styles**, and a **class** (the logic)

##==##

<!-- .slide: class="with-code inconsolata" -->

# The component: its logic

The logic lives in a plain TypeScript **class**. State is held in **signals**:

<br/>

```typescript
export class App {
  name = signal('Angular');

  rename() {
    this.name.set('Angular 22');
  }
}
```

<!-- .element: class="big-code" -->

<br/>

Notes:

- `signal()` creates a reactive value. You read it with `name()` and write it with `.set()` / `.update()`.
- The template re-renders automatically whenever a signal it reads changes — no manual refresh.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The component: its metadata

A class becomes a component through the `@Component` **decorator**, which links it to a template and styles:

<br/>

```typescript
// app.ts
@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
```

<!-- .element: class="big-code" -->

<br/>

```html
<!-- index.html -->
<sfeir-app></sfeir-app>
```

<!-- .element: class="big-code" -->

Notes:

- The `@Component` decorator always sits directly above the class. Without it, Angular does not know the class is a component.
- `selector` is the custom HTML tag you use to place the component in a template.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The component: as a whole

Putting it together, a full component looks like this:

<br/>

```typescript
// app.ts
@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  name = signal('Angular');
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Components are standalone

Since **Angular 19**, components are **standalone by default**: they no longer need to be declared in an `NgModule`. A component declares its own dependencies through `imports`.

<br/>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [UserCard, UpperCasePipe], // components, directives and pipes used in the template
})
export class App {}
```

<!-- .element: class="medium-code" -->

Notes:

- Standalone was introduced in v14 (optional), became the recommended approach in v17, and the default in v19.
- The `standalone: true` flag is now implicit — you only write `standalone: false` for the rare legacy component that still belongs to an NgModule.

##==##

<!-- .slide -->

# Why standalone?

- **Simpler architecture** — no `NgModule` boilerplate to navigate or maintain <br/><br/>
- **Explicit dependencies** — a component's `imports` show exactly what it uses <br/><br/>
- **Better tree-shaking** — the bundler keeps only what is actually imported <br/><br/>
- **Easier lazy loading** — any standalone component can be loaded on demand <br/><br/>
- **Faster onboarding** — new developers focus on components, not module wiring

> Standalone components let teams build modern, maintainable, and scalable Angular applications with far less overhead.
