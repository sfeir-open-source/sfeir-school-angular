<!-- .slide: class="transition-bg-sfeir-2 underline" -->

# Bootstrapping

##==##

<!-- .slide: class="with-code inconsolata" -->

# Bootstrapping: main.ts

In an Angular application, the __main.ts__ file is loaded first
<br/><br/>

```typescript
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Bootstrapping in its entirety

```typescript
// main.ts
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

<!-- .element: class="big-code" -->

<br/>

```typescript
// app.module.ts
@NgModule({
  imports: [browserModule],
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

<!-- .element: class="medium-code" -->

<br/>

```html
<!-- index.html -->
<sfeir-app></sfeir-app>
```

<!-- .element: class="big-code" -->
