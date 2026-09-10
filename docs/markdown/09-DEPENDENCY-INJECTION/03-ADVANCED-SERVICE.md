<!-- .slide: class="with-code inconsolata" -->

# `@Service`: custom factory

Pass a **factory** function to control how the singleton is created. It runs in an injection context, so you can call `inject()` inside it:

<br/>

```typescript
import { inject, Service } from '@angular/core';
import { ANALYTICS_ENABLED } from './token';

@Service({
  factory: () => (inject(ANALYTICS_ENABLED) ? new GoogleAnalytics() : new Analytics()),
})
export class Analytics {
  track(event: string, payload?: Record<string, unknown>) {
    // No-op by default
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- The `factory` option replaces `useClass`, `useValue`, `useExisting`, and `useFactory` from `@Injectable`. If you need those advanced provider options, keep using `@Injectable`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `@Service`: manual provisioning

By default, `@Service` provides the class at the **root injector**. Set `autoProvided: false` to scope it manually instead (route, component, etc.):

<br/>

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

# `injectAsync`: lazy-loading a service

Returns a function that resolves the service instance only when actually needed — the bundler splits it into a separate JS chunk. The service must still be auto-provided.

<br/>

```typescript
import { Component, injectAsync } from '@angular/core';

@Component({
  selector: 'app-report',
  template: `<button (click)="export()">Export</button>`,
})
export class Report {
  private exporter = injectAsync(() => import('./report-exporter').then(m => m.ReportExporter));

  async export() {
    const exporter = await this.exporter();
    exporter.export();
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- Available since Angular v22. The first call triggers the dynamic import; subsequent calls reuse the same promise.
- Use the `prefetch` option (e.g. `{ prefetch: onIdle }`) to start downloading the chunk before it's actually invoked, opportunistically, when the browser becomes idle.
