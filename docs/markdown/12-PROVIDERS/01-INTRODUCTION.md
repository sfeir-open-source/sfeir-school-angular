<!-- .slide: class="with-code inconsolata" -->

# What is a Service?

- An exported class
- An <b>@Injectable</b> decorator

```typescript
// The modern way to create a singleton service
@Injectable({
  providedIn: 'root', // Registers the service at the application root
})
export class TodoService {
  private name = 'Hello';

  getName() {
    return this.name;
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- Using `providedIn: 'root'` makes the service available throughout the application and allows it to be tree-shakable, meaning it will be removed from the final bundle if not used.
- This is the recommended way to provide singleton services since Angular 6.

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Using Your Service Globally

```typescript
// todo.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private name = 'Hello';

  getName() {
    return this.name;
  }
}
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

```typescript
// app.module.ts
import { TodoService, AppComponent } from './shared/';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  providers: [], // No need to provide the service here, it's already provided in the root
})
export class AppModule {}
```

<!-- .element: class="medium-code" -->

<br>

```typescript
// main.ts
// No need to provide the service here, it's already provided in the root;
bootstrapApplication(AppComponent, { providers: [] });
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Using a Service Locally

```typescript
// todo.service.ts
@Injectable()
export class TodoService {
  get name(): string {
    return 'SFEIR';
  }
}
```

<!-- .element: class="big-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

```typescript
// app.component.ts
@Component({
  providers: [TodoService], // Provides a new instance for this component and its children
})
export class AppComponent {
  private readonly todoService = inject(TodoService);

  constructor() {
    console.log(this.todoService.name); // SFEIR;
  }
}
```

<!-- .element: class="big-code" -->

##++##

##==##

<!-- .slide: class="with-code inconsolata" -->

# The @Service Decorator

- A more ergonomic alternative to <b>@Injectable({ providedIn: 'root' })</b> <br/><br/>
- Same behavior: singleton, available everywhere, tree-shakable <br/><br/>
- Designed for services that use the <b>inject()</b> function

```typescript
import { Service } from '@angular/core';

@Service()
export class TodoService {
  private name = 'Hello';

  getName() {
    return this.name;
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- Available since Angular v22. See [Creating and using services](https://angular.dev/guide/di/creating-and-using-services).
- @Service only supports `inject()` for dependencies — not constructor-based DI.

##==##

<!-- .slide: class="with-code inconsolata" -->

# @Service: Custom Factory

- Pass a <b>factory</b> function to control how the singleton is created <br/><br/>
- The factory runs in an injection context — you can call <b>inject()</b> inside it <br/><br/>

```typescript
import { inject, Service } from '@angular/core';
import { ANALYTICS_ENABLED } from './token';

@Service({
  factory: () =>
    inject(ANALYTICS_ENABLED) ? new GoogleAnalytics() : new Analytics(),
})
export class Analytics {
  track(event: string, payload?: Record<string, unknown>) {
    // No-op by default
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- The `factory` option replaces `useClass`, `useValue`, `useExisting`, and `useFactory` from @Injectable.
- If you need those advanced provider options, keep using @Injectable.

##==##

<!-- .slide: class="with-code inconsolata" -->

# @Service vs @Injectable

**Use @Service when:**

- Creating a singleton with <b>inject()</b> for dependencies <br/><br/>
- You want concise root provisioning

**Keep @Injectable when:**

- Using <b>constructor-based</b> DI <br/><br/>
- You need <b>useClass</b>, <b>useValue</b>, <b>useExisting</b>, or <b>useFactory</b> <br/><br/>
- Scoping with <b>providedIn: 'platform'</b>

##==##

<!-- .slide: class="with-code inconsolata" -->

# @Service: Manual Provisioning

- By default, @Service provides the class at the <b>root injector</b> <br/><br/>
- Set <b>autoProvided: false</b> to scope it manually (route, component, etc.)

```typescript
@Service({ autoProvided: false })
export class AnalyticsLogger {
  trackEvent(name: string) {
    console.log('event:', name);
  }
}
```

<!-- .element: class="big-code" -->

```typescript
@Component({
  providers: [AnalyticsLogger],
})
export class Dashboard {}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# injectAsync

- Lazy-load a service only when it's actually needed <br/><br/>
- Returns a function that resolves to the service instance <br/><br/>
- The bundler splits the service into a <b>separate JavaScript chunk</b> <br/><br/>
- The service must be <b>auto-provided</b> (@Service or @Injectable({ providedIn: 'root' }))

```typescript
import { Component, injectAsync } from '@angular/core';

@Component({
  selector: 'app-report',
  template: `<button (click)="export()">Export</button>`,
})
export class Report {
  private exporter = injectAsync(() =>
    import('./report-exporter').then((m) => m.ReportExporter),
  );

  async export() {
    const exporter = await this.exporter();
    exporter.export();
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- Available since Angular v22. See [injectAsync API](https://angular.dev/api/core/injectAsync).
- The first call triggers the dynamic import; subsequent calls reuse the same promise.

##==##

<!-- .slide: class="with-code inconsolata tc-multiple-columns" -->

##++##

# injectAsync: The Lazy Service

```typescript
@Service()
export class ReportExporter {
  export() {
    // Uses a heavy spreadsheet library
  }
}
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

# injectAsync: Prefetching

- By default, the chunk is fetched when you invoke the returned function <br/><br/>
- Use the <b>prefetch</b> option to start downloading earlier <br/><br/>
- Angular ships with <b>onIdle</b> — waits until the browser becomes idle

```typescript
private exporter = injectAsync(
  () => import('./report-exporter').then((m) => m.ReportExporter),
  { prefetch: onIdle },
);
```

<!-- .element: class="medium-code" -->

Notes:

- Prefetching is opportunistic: if the user triggers the feature before prefetch completes, Angular loads immediately.
- You can configure `onIdle({ timeout: 1_000 })` to cap the maximum wait time.

##++##
