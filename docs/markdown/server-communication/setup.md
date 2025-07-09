<!-- .slide: class="with-code inconsolata" -->
# HttpClient

-   Angular provides its own HTTP client for server communication.
-   For module-based apps, you import <b>HttpClientModule</b>. For standalone apps, you use <b>provideHttpClient()</b>.
-   Both come from the <b>@angular/common/http</b> package.
<br/><br/>

```typescript
// For module-based applications
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [/*...,*/ HttpClientModule]
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column with-code inconsolata"-->
# Injecting into a Component

-   To use a service in a component, you need to inject it.<br/>
-   Let's inject the HttpClient service provided by `HttpClientModule` or `provideHttpClient()`.<br/><br/>

```typescript
import { HttpClient } from '@angular/common/http';

@Component({...})
export class AppComponent {
  constructor(private readonly httpClient: HttpClient) { }
}
```
<!-- .element: class="medium-code"-->

##--##
<!-- .slide: class="with-code inconsolata"-->

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

```typescript
import { HttpClient } from '@angular/common/http';

@Component({...})
export class AppComponent {
  constructor(private readonly httpClient: HttpClient) { }
}
```
<!-- .element: class="medium-code"-->
