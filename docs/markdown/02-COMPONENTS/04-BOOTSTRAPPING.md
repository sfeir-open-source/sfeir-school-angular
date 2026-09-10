<!-- .slide: class="transition-bg-sfeir-2"-->

# Bootstrapping

##==##

# What is bootstrapping?

- **Bootstrapping** is the process of initializing the application <br/><br/>
- 2 ways to boostrap an application: <br/><br/>
  - Boostrap an application on a **standalone component** <br/><br/>
  - Bootstrap an application on a **module** <br/><br/>

##==##

# Bootstrapping: standalone component

<br/><br/>

> This means that the application is bootstrapped directly on a standalone component. <br/><br/>

##==##

<!-- .slide: class="with-code" -->

# Bootstrapping: standalone component

- **Files impacted**: <br/><br/>
  - `app.ts | app.component.ts`: standalone component on which to boostrap <br/><br/>
  - `main.ts`: bootstrapping configuration <br/><br/>
  - `index.html`: first file loader in CSR application, standalone component need to be called here <br/><br/>

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata"  -->

##++##

## Bootstrapping: standalone component

```typescript
// app.ts file
@Component({
  selector: 'sfeir-root',
  template: `<div>My app</div>`,
})
export class App {}
```

<!-- .element: class="medium-code" -->

```typescript
// main.ts file
bootstrapApplication(App, appConfig).catch(err => console.error(err));
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

```html
<!-- index.html file -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My app</title>
  </head>
  <body>
    <sfeir-root></sfeir-root>
  </body>
</html>
```

<!-- .element: class="medium-code" -->

##++##

Notes:

- `appConfig` is an `ApplicationConfig` object (typically exported from `app.config.ts`) that declares the app's global providers — router, HTTP client, etc.
- Always chain a `.catch()`: `bootstrapApplication` returns a `Promise`, and without it a bootstrap error (e.g. a wrong selector) fails silently, leaving a blank page with nothing in the console.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `ApplicationConfig`: the app's global providers

`bootstrapApplication`'s second argument is an `ApplicationConfig` — a plain object listing the providers available to the **whole application** (there is no root module left to hold them).

<br/>

```typescript
// app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
```

<!-- .element: class="big-code" -->

Notes:

- This is exactly the `app.config.ts` you'll find already written for you in `01-hands-on` — your job there is only to pass it to `bootstrapApplication`, not to write it.
- As the app grows, this is where you'll add `provideHttpClient()`, `provideRouter(routes)`, etc. — one flat list of providers instead of a tree of modules.
