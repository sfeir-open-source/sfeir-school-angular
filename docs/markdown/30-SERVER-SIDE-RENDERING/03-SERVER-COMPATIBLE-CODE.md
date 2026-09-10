<!-- .slide: class="with-code inconsolata" -->

# Server-Compatible Components

Some browser APIs are not available on the server:

❌ **Avoid these on the server**

- `window`, `document`, `navigator`, `location`
- DOM manipulation in constructors
- Browser-specific APIs

✅ **Use lifecycle hooks for browser-only code**

```typescript
import { Component, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-browser-feature',
  template: `<div #content>Content here</div>`,
})
export class BrowserFeature {
  constructor() {
    // ✅ Safe - only runs in the browser
    afterNextRender(() => {
      console.log('Window width:', window.innerWidth);
      document.title = 'Updated Title';
    });
  }
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Common pitfall: browser APIs in the constructor

```typescript
// DON'T DO THIS
@Component({ /* ... */ })
export class BadComponent {
  constructor() {
    localStorage.setItem('key', 'value'); // Error on server!
  }
}
```

<!-- .element: class="small-code" -->

```typescript
// DO THIS INSTEAD
@Component({ /* ... */ })
export class GoodComponent {
  constructor() {
    afterNextRender(() => {
      localStorage.setItem('key', 'value'); // Safe!
    });
  }
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Accessing Request and Response

Angular provides DI tokens for server-side information:

```typescript
import { Component, inject } from '@angular/core';
import { REQUEST, RESPONSE_INIT } from '@angular/core';

@Component({ selector: 'app-server-info', templateUrl: './server-info.html' })
export class ServerInfo {
  private request = inject(REQUEST);
  private responseInit = inject(RESPONSE_INIT);
  requestUrl = this.request?.url ?? 'Not available';
  userAgent = this.request?.headers.get('user-agent') ?? 'Unknown';

  constructor() {
    if (this.responseInit) {
      this.responseInit.headers = { ...this.responseInit.headers, 'X-Custom-Header': 'SSR-Rendered' };
    }
  }
}
```

<!-- .element: class="small-code" -->
