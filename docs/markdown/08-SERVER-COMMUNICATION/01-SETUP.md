<!-- .slide: class="with-code inconsolata" -->

# HttpClient

- Angular provides its own HTTP client for server communication.
- **provideHttpClient()**.
- come from the <b>@angular/common/http</b> package.
  <br/><br/>

```typescript
// For module-based applications
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [provideHttpClient()],
})
export class AppModule {}
```

<!-- .element: class="medium-code" -->

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
});
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->

# Injecting into a Component

- To use a service in a component, you need to inject it.<br/>
- Let's inject the HttpClient service provided by the `provideHttpClient()` function.<br/><br/>

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'sfeir-app',
  template: './app.html',
})
export class App {
  private readonly httpClient = inject(HttpClient);
}
```

<!-- .element: class="big-code"-->
