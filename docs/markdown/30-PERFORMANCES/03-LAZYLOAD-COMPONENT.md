<!-- .slide: class="transition bg-blue" -->

# Lazy-loading Components

##==##

<!-- .slide: class="with-code inconsolata" -->

# Lazy-loading Components with async/await + NgComponentOutlet

- Dynamically import heavy components only when needed <br/><br/>
- Render them with the built-in `*ngComponentOutlet` directive <br/><br/>
- Great for charts, editors, maps, and feature panels that aren’t always used

Notes:

- This approach complements router lazy-loading and `@defer` by giving you full programmatic control.
- Official docs for `NgComponentOutlet` usage: https://angular.dev/api/common/NgComponentOutlet#usage-notes

##==##

# When to Use This Pattern

- You need to load a component after a user action (click/hover) <br/><br/>
- You want to pass inputs dynamically to the loaded component <br/><br/>
- You need custom DI context or content projection for the loaded component <br/><br/>

Compared to alternatives:

- Router lazy-loading → for pages/routes <br/>
- `@defer` → template-driven triggers <br/>
- async import + `NgComponentOutlet` → imperative control from your component class

##==##

<!-- .slide: class="with-code inconsolata" -->

# Requirements & Setup

- Prefer standalone components for the lazy piece
- Import `NgComponentOutlet` in the host component
- Use dynamic `import()` with `await` to split code

```typescript
import { Component, Type, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-host',
  imports: [NgComponentOutlet],
  templateUrl: './host.html',
})
export class Host {
  protected componentType = signal<Type<unknown> | null>(null);
  async load() {
    const { HeavyWidgetComponent } = await import('./heavy/heavy-widget.component');
    this.componentType.set(HeavyWidgetComponent);
  }
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Host Template (Basic)

```angular181html
<button type="button" (click)="load()">Load widget</button>

<!-- Renders nothing until componentType is set -->
<ng-container *ngComponentOutlet="componentType()" />
```

 <!-- .element: class="big-code" -->

Notes:

- `componentType` is a Type reference returned by the dynamic import.
- Angular creates and inserts the component instance at this location.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Passing Inputs to the Lazy Component

```typescript
// heavy/heavy-widget.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-widget',
  standalone: true,
  template: './heavy-widget.html',
})
export class HeavyWidget {
  title = signal('Heavy Widget');
  items = signal(['A', 'B', 'C']);
}
```

<!-- .element: class="small-code" -->

```angular181html
<!-- host.component.html -->
<button type="button" (click)="load()">Load widget</button>

<ng-container
  *ngComponentOutlet="componentType();
                      inputs: { title: 'Lazy loaded!', items: ['A','B','C'] }">
</ng-container>
```

 <!-- .element: class="small-code" -->

Notes:

- Syntax follows the official `NgComponentOutlet` usage notes: `inputs: { ... }`.
- You can bind variables from the host as well: `inputs: { items: itemsFromHost }`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# UX: Placeholder While Importing

- Show a lightweight placeholder while the chunk is being fetched <br/><br/>

```angular181html
<button type="button" (click)="load()">Open panel</button>

@if (!componentType()) {
  <app-skeleton kind="panel" />
}

<ng-container *ngComponentOutlet="componentType()" />
```

<!-- .element: class="big-code" -->

Notes:

- You control the exact moment of `import()` (click, hover, intersection observer, etc.).
- For template-level triggers, `@defer` can be a simpler alternative.

##==##

# Common Pitfalls and Tips

- Make the `import()` path a real file path so bundlers can split the code <br/><br/>
- Do not reference the lazy component eagerly elsewhere (keeps it out of the main chunk) <br/><br/>
- For SSR: trigger `import()` only in the browser (e.g., on user action) <br/><br/>
- Use `inputs` for data, `injector/environmentInjector` for DI scope, and `content` for projection <br/><br/>
- Measure! Verify that the heavy component moved to a separate lazy chunk

##==##

# Summary

- Use async/await + `NgComponentOutlet` to fully control when and how a component is loaded <br/><br/>
- Pass inputs, customize DI, and project content as needed <br/><br/>
- Combine with intent signals (hover/idle) to prefetch for instant UX
